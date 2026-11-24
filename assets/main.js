/* ==== НАЛАШТУВАННЯ ====
   Заявки з квізу надсилаються на пошту через FormSubmit (formsubmit.co) — без сервера й реєстрації.
   Перша заявка надсилає на CONTACT_EMAIL лист «Activate Form»: після підтвердження заявки
   приходять на пошту. Після активації FormSubmit дає секретний код — його можна вставити
   замість адреси в FORM_ENDPOINT, щоб пошта не світилась у коді.
   Якщо FORM_ENDPOINT порожній — форма відкриває поштовий клієнт із готовим листом. */
const CONTACT_EMAIL = "danilo.formos@gmail.com";
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

/* Аналітика: підключіть GA4 або Plausible — події підуть туди. */
function track(name, data = {}) {
  if (window.gtag) window.gtag("event", name, data);
  if (window.plausible) window.plausible(name, { props: data });
}
document.querySelectorAll("[data-track]").forEach((el) =>
  el.addEventListener("click", () => track(el.dataset.track, { href: el.getAttribute("href") }))
);

/* Масштабування живих прев'ю (iframe) на сторінках кейсів */
function scaleFrames() {
  document.querySelectorAll(".frame, .phone-s.live").forEach((box) => {
    const f = box.querySelector("iframe");
    if (!f) return;
    const base = parseInt(f.getAttribute("width"), 10) || 1280;
    f.style.transform = `scale(${box.clientWidth / base})`;
  });
}
window.addEventListener("resize", scaleFrames);
window.addEventListener("load", scaleFrames);
scaleFrames();

/* Повноекранне меню */
const menuBtn = document.querySelector(".menu-btn");
const menuPanel = document.querySelector(".menu-panel");
function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Закрити меню" : "Відкрити меню");
  menuPanel.setAttribute("aria-hidden", !open);
  if (open) menuPanel.querySelector("a")?.focus();
}
if (menuBtn && menuPanel) {
  menuBtn.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  menuPanel.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) { setMenu(false); menuBtn.focus(); }
  });
}

/* Акордеон «інструмент продажів» + зміна зображення */
document.querySelectorAll("[data-acc]").forEach((acc) => {
  const items = [...acc.querySelectorAll(".acc-item")];
  const media = [...(acc.closest(".features-grid")?.querySelectorAll(".features-media .shot") || [])];
  let timer;
  function open(n) {
    items.forEach((it, k) => {
      it.classList.toggle("on", k === n);
      it.querySelector(".acc-btn").setAttribute("aria-expanded", k === n);
    });
    media.forEach((m, k) => m.classList.toggle("on", k === n));
  }
  function auto() {
    clearInterval(timer);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setInterval(() => {
      const cur = items.findIndex((it) => it.classList.contains("on"));
      open((cur + 1) % items.length);
    }, 6000);
  }
  items.forEach((it, k) => it.querySelector(".acc-btn").addEventListener("click", () => { open(k); clearInterval(timer); }));
  // автоперемикання лише коли блок на екрані
  new IntersectionObserver(([e]) => (e.isIntersecting ? auto() : clearInterval(timer)), { threshold: 0.4 }).observe(acc);
});

/* Квіз */
const quiz = document.querySelector("#quiz");
if (quiz) {
  const steps = [...quiz.querySelectorAll("[data-step]")];
  const bars = [...quiz.querySelectorAll(".quiz-bars span")];
  const label = quiz.querySelector("[data-step-label]");
  const back = quiz.querySelector("[data-back]");
  const next = quiz.querySelector("[data-next]");
  const nextLabel = quiz.querySelector("[data-next-label]");
  const err = quiz.querySelector(".quiz-error");
  const done = document.querySelector("#quiz-done");
  let i = 0;

  // Персональне посилання: ?type=landing | services | shop
  const pre = new URLSearchParams(location.search).get("type");
  if (pre) {
    const r = quiz.querySelector(`input[name="type"][value="${CSS.escape(pre)}"]`);
    if (r) r.checked = true;
  }

  function problem() {
    const s = steps[i];
    if (s.querySelector('input[type="radio"]') && !s.querySelector('input[type="radio"]:checked')) return "Оберіть один варіант.";
    if (s.querySelector('input[type="checkbox"]') && !s.querySelector('input[type="checkbox"]:checked')) return "Оберіть хоча б одну функцію.";
    for (const f of s.querySelectorAll("input[required]")) if (!f.value.trim()) return "Вкажіть ім'я та спосіб зв'язку.";
    return "";
  }
  function refresh() { next.disabled = !!problem(); }
  function render() {
    steps.forEach((s, n) => s.classList.toggle("hidden", n !== i));
    bars.forEach((b, n) => b.classList.toggle("on", n <= i));
    label.textContent = `Питання ${i + 1} з ${steps.length}`;
    back.classList.toggle("hidden", i === 0);
    nextLabel.textContent = i === steps.length - 1 ? "Надіслати заявку" : "Далі";
    err.textContent = "";
    refresh();
  }
  quiz.addEventListener("input", () => { err.textContent = ""; refresh(); });
  quiz.addEventListener("change", refresh);
  back.addEventListener("click", () => { i--; render(); });

  next.addEventListener("click", async () => {
    const p = problem();
    if (p) { err.textContent = p; return; }
    if (i < steps.length - 1) { i++; render(); steps[i].querySelector("input")?.focus(); return; }

    const fd = new FormData(quiz);
    const TYPES = { landing: "Лендинг", services: "Сайт послуг", shop: "Інтернет-магазин", unknown: "Ще не знає — потрібна консультація" };
    const data = {
      type: TYPES[fd.get("type")] || fd.get("type"), features: fd.getAll("features").join(", "), when: fd.get("when"),
      name: fd.get("name").trim(), contact: fd.get("contact").trim(), comment: (fd.get("comment") || "").trim(), source: location.href,
    };
    // Пастка для ботів: людина це поле не бачить і не заповнює
    if (fd.get("_honey")) return;
    next.disabled = true;
    nextLabel.textContent = "Надсилаємо…";
    const doneText = done.querySelector("[data-done-text]");
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            "Ім'я": data.name,
            "Контакт": data.contact,
            "Тип сайту": data.type,
            "Функції": data.features,
            "Запуск": data.when,
            "Коментар": data.comment || "—",
            "Сторінка": data.source,
            _subject: `Нова заявка з сайту: ${data.name} — ${data.type}`,
            _template: "table",
            _captcha: "false",
            _honey: "",
          }),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !(json.success === true || json.success === "true")) throw new Error(json.message || res.status);
        doneText.textContent = "Заявку отримано. Ми напишемо вам протягом одного робочого дня, щоб узгодити час консультації.";
      } else {
        const body = `Тип сайту: ${data.type}\nФункції: ${data.features}\nЗапуск: ${data.when}\nІм'я: ${data.name}\nКонтакт: ${data.contact}\nКоментар: ${data.comment}`;
        location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Заявка з сайту")}&body=${encodeURIComponent(body)}`;
        doneText.textContent = "Ми відкрили ваш поштовий клієнт із готовим листом — залишилось натиснути «Надіслати». Якщо лист не відкрився, напишіть нам у Telegram.";
      }
      track("lead_submit", { type: data.type });
      quiz.classList.add("hidden");
      done.classList.remove("hidden");
      done.focus();
    } catch (ex) {
      console.warn("Form submit failed:", ex);
      err.innerHTML = `Не вдалося надіслати заявку. Спробуйте ще раз або напишіть нам у <a href="https://t.me/Nice_sh0t" target="_blank" rel="noopener">Telegram</a> чи на <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`;
      next.disabled = false;
      nextLabel.textContent = "Надіслати заявку";
    }
  });
  render();
}

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
