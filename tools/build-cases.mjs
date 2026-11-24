// Генерує сторінки кейсів у папці /cases з даних нижче.
// Додати новий кейс: допишіть об'єкт у CASES, покладіть скріншоти в assets/shots/
// (<slug>-desktop.webp і <slug>-mobile.webp) і запустіть:  node tools/build-cases.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://studio-portfolio-xwlc.onrender.com"; // замініть на свій домен
const V = "10"; // версія CSS/JS — збільшуйте після змін, щоб скинути кеш

const CASES = [
  {
    slug: "barber",
    title: "Barber Concept",
    name: "barber concept",
    word: "barber",
    tint: "#1a1612",
    wordColor: "#c8a165",
    kind: "Лендинг з онлайн-записом",
    niche: "барбершоп",
    quizType: "landing",
    lead: "Приклад преміального сайту для барбершопу, де клієнт за хвилину бачить послуги й ціни, обирає майстра та записується на зручний час.",
    task: "Створити сайт, який передає преміальний рівень закладу й прибирає зайві дзвінки: клієнт має сам дізнатися ціну, обрати майстра і записатися — з телефону, за кілька дотиків.",
    solution: "Темний стриманий дизайн із золотим акцентом і атмосферними фото, прайс у два стовпці, картки майстрів і запис у 4 кроки: послуга → майстер → дата і час → контакти. Зайняті та минулі слоти недоступні для вибору, щоб клієнт не натрапив на помилку.",
    features: [
      ["Прайс послуг з тривалістю", "works"],
      ["Картки майстрів", "works"],
      ["Покроковий запис з вибором майстра і часу", "works"],
      ["Блокування зайнятих і минулих слотів", "works"],
      ["Перевірка імені та телефону", "works"],
      ["Відправка запису в CRM / Telegram адміністратора", "demo"],
      ["SMS-нагадування клієнту", "demo"],
    ],
    process: [
      ["Прототип", "Структура: оффер → прайс → майстри → запис → контакти."],
      ["Дизайн", "Темна палітра, класична шрифтова пара, акцентний колір для дій."],
      ["Розробка", "Адаптивна верстка, логіка запису без перезавантаження сторінки."],
      ["Перевірка", "Тест на телефонах і ПК, клавіатурна навігація, валідація форм."],
    ],
    stack: "HTML, CSS, JavaScript",
    time: "7 робочих днів",
    fits: "Барбершопи, салони краси, тату-студії",
  },
  {
    slug: "coffee",
    title: "Coffee Point",
    name: "coffee point",
    word: "coffee",
    tint: "#e9dac6",
    wordColor: "#6a3d20",
    kind: "Лендинг з меню та передзамовленням",
    niche: "кав'ярня",
    quizType: "landing",
    lead: "Сайт кав'ярні, де гість переглядає меню, збирає замовлення й обирає час, коли забере напій без черги.",
    task: "Показати меню так, щоб його було зручно гортати з телефону, і дати можливість зробити замовлення «з собою» заздалегідь — щоб зменшити черги в години пік.",
    solution: "Теплий світлий дизайн, меню з фото та фільтрами категорій, кошик зі зміною кількості та вибором часу видачі (крок 15 хвилин, з урахуванням графіка роботи). На мобільному кошик доступний з плаваючої кнопки.",
    features: [
      ["Меню з фото та фільтрами категорій", "works"],
      ["Кошик: додавання, зміна кількості, підсумок", "works"],
      ["Вибір часу видачі з урахуванням графіка", "works"],
      ["Підтвердження з номером замовлення", "works"],
      ["Надходження замовлення бариста (Telegram / планшет)", "demo"],
      ["Онлайн-оплата", "demo"],
    ],
    process: [
      ["Прототип", "Меню і кошик на одному екрані — щоб не загубити замовлення."],
      ["Дизайн", "Теплі кавові відтінки, великі кнопки під палець."],
      ["Розробка", "Фільтри, кошик і слоти часу на чистому JavaScript."],
      ["Перевірка", "Сценарій «замовити за 30 секунд» на смартфоні."],
    ],
    stack: "HTML, CSS, JavaScript",
    time: "7–10 робочих днів",
    fits: "Кав'ярні, пекарні, кондитерські",
  },
  {
    slug: "dental",
    title: "Smile Clinic",
    name: "smile clinic",
    word: "smile",
    tint: "#cde6e5",
    wordColor: "#0e8a8c",
    kind: "Сайт послуг з калькулятором і записом",
    niche: "стоматологія",
    quizType: "services",
    lead: "Сайт стоматології, що знімає головні страхи пацієнта: біль, невідома ціна, незрозуміло до кого йти.",
    task: "Побудувати довіру до клініки ще до першого візиту: показати послуги з цінами «від», лікарів, дати оцінити бюджет і записатися на безкоштовну консультацію.",
    solution: "Світлий «медичний» дизайн, блок гарантій на першому екрані, калькулятор орієнтовної вартості з кількістю зубів і коротка форма запису з вибором напряму та бажаної дати.",
    features: [
      ["Каталог послуг із цінами «від»", "works"],
      ["Калькулятор орієнтовної вартості", "works"],
      ["Картки лікарів", "works"],
      ["Форма запису з перевіркою полів", "works"],
      ["Передача заявки в CRM клініки", "demo"],
      ["Онлайн-розклад лікарів", "demo"],
    ],
    process: [
      ["Прототип", "Перший екран відповідає на «чи буде боляче» і «скільки коштує»."],
      ["Дизайн", "Чиста палітра, багато повітря, акценти на діях."],
      ["Розробка", "Калькулятор і форма без перезавантаження, адаптивна сітка."],
      ["Перевірка", "Контраст, підписи полів, сценарій запису з телефону."],
    ],
    stack: "HTML, CSS, JavaScript",
    time: "2–3 тижні",
    fits: "Стоматології, медцентри, косметологія",
  },
];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const icon = (id) => `<svg class="i"><use href="#${id}"/></svg>`;
const dot = `<span class="dot">${icon("i-arrow")}</span>`;

function page(c) {
  const others = CASES.filter((x) => x.slug !== c.slug);
  const demo = `../demos/${c.slug}/index.html`;
  const contact = `../index.html?type=${c.quizType}#contact`;
  return `<!doctype html>
<html lang="uk">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(c.title)} — кейс | YOUR STUDIO</title>
  <meta name="description" content="${esc(c.lead)}">
  <link rel="canonical" href="${SITE}/cases/${c.slug}.html">
  <meta property="og:title" content="${esc(c.title)} — кейс YOUR STUDIO">
  <meta property="og:description" content="${esc(c.lead)}">
  <meta property="og:image" content="${SITE}/assets/shots/${c.slug}-desktop.webp">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='9' fill='%23111'/><circle cx='14' cy='16' r='6' fill='%23ffd21f'/><circle cx='21' cy='16' r='2.5' fill='white'/></svg>">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap">
  <link rel="stylesheet" href="../assets/styles.css?v=${V}">
</head>
<body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
  <symbol id="i-out" viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9"/></symbol>
</svg>
<a class="skip" href="#main">Перейти до змісту</a>

<header class="site-header">
  <div class="container">
    <a href="../index.html" class="brand" aria-label="YOUR STUDIO — на головну">
      <span class="brand-logo"><span class="brand-mark" aria-hidden="true"></span><span class="brand-name">Your<br>Studio</span></span>
      <span class="brand-sub">Вебстудія<br>для малого<br>бізнесу</span>
    </a>
    <div class="header-right">
      <a href="${contact}" class="header-link" data-track="cta_case_header">Хочу такий сайт</a>
      <span class="menu-spacer" aria-hidden="true"></span>
    </div>
  </div>
</header>

<button class="menu-btn" aria-expanded="false" aria-controls="menu-panel" aria-label="Відкрити меню"><span></span></button>
<div class="menu-panel" id="menu-panel" aria-hidden="true">
  <nav aria-label="Головне меню">
    <ol>
      <li><a href="../index.html#works">Роботи</a></li>
      <li><a href="../index.html#services">Послуги та ціни</a></li>
      <li><a href="../index.html#process">Як ми працюємо</a></li>
      <li><a href="../index.html#team">Команда</a></li>
      <li><a href="../index.html#faq">Питання</a></li>
      <li><a href="../index.html#contact">Контакти</a></li>
    </ol>
  </nav>
  <div class="menu-contacts">
    <div><small>Telegram</small><a href="https://t.me/Nice_sh0t" target="_blank" rel="noopener">@Nice_sh0t</a></div>
    <div><small>Email</small><a href="mailto:danilo.formos@gmail.com">danilo.formos@gmail.com</a></div>
    <div><small>Графік</small>Пн–Пт, 10:00–19:00</div>
  </div>
</div>

<main id="main">
  <section class="case-hero">
    <div class="container">
      <div class="crumbs"><a href="../index.html">головна</a><span>/</span><a href="../index.html#works">роботи</a><span>/</span><span>${esc(c.name)}</span></div>
      <div class="case-hero-grid">
        <div>
          <span class="h-pre">${esc(c.niche)} · демопроєкт</span>
          <h1 class="display">${esc(c.name)}</h1>
        </div>
        <div>
          <p class="lead">${esc(c.lead)}</p>
          <div class="hero-actions">
            <a href="${demo}" target="_blank" rel="noopener" class="btn" data-track="demo_open">Відкрити сайт <span class="dot">${icon("i-out")}</span></a>
            <a href="${contact}" class="link-u" data-track="cta_case_hero">Хочу схожий</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="stage" style="--tint:${c.tint};--word:${c.wordColor}" aria-label="Інтерактивне прев'ю сайту">
    <span class="word" aria-hidden="true">${esc(c.word)}</span>
    <div class="browser">
      <div class="browser-bar"><i></i><i></i><i></i><span>${c.slug}.demo — інтерактивне прев'ю, можна гортати й натискати</span></div>
      <div class="frame"><iframe src="${demo}" width="1280" height="720" loading="eager" title="Демосайт ${esc(c.title)}"></iframe></div>
    </div>
  </div>

  <div class="container">
    <dl class="facts">
      <div><dt>Тип</dt><dd>${esc(c.kind)}</dd></div>
      <div><dt>Статус</dt><dd>Демопроєкт</dd></div>
      <div><dt>Строк для реального проєкту</dt><dd>${esc(c.time)}</dd></div>
      <div><dt>Підійде для</dt><dd>${esc(c.fits)}</dd></div>
    </dl>

    <section class="case-sec">
      <h2><span class="h-pre">01</span><span class="h-main">завдання</span></h2>
      <div class="body"><p>${esc(c.task)}</p></div>
    </section>

    <section class="case-sec">
      <h2><span class="h-pre">02</span><span class="h-main">рішення</span></h2>
      <div class="body"><p>${esc(c.solution)}</p></div>
    </section>

    <section class="case-sec">
      <h2><span class="h-pre">03</span><span class="h-main">функції</span></h2>
      <div class="body">
        <p class="muted" style="font-size:1rem;margin-bottom:24px">Чесно позначаємо, що працює в демо, а що підключається в реальному проєкті.</p>
        <ul class="feature-list">
${c.features.map(([f, s]) => `          <li><span>${esc(f)}</span><span class="status ${s}">${s === "works" ? "працює в демо" : "у реальному проєкті"}</span></li>`).join("\n")}
        </ul>
      </div>
    </section>

    <section class="case-sec">
      <h2><span class="h-pre">04</span><span class="h-main">мобільна версія</span></h2>
      <div class="body">
        <div class="mobile-stage" style="--tint:${c.tint}">
          <div class="phone-s"><img src="../assets/shots/${c.slug}-mobile.webp" alt="${esc(c.title)} — перший екран на телефоні" width="585" height="1185" loading="lazy"></div>
          <div class="phone-s live"><iframe src="${demo}" width="390" height="760" loading="lazy" title="Мобільна версія ${esc(c.title)} — інтерактивна"></iframe></div>
        </div>
        <p class="mobile-note">Жива мобільна версія — її можна прокручувати й натискати.</p>
      </div>
    </section>

    <section class="case-sec">
      <h2><span class="h-pre">05</span><span class="h-main">процес</span></h2>
      <div class="body">
        <div class="process-grid">
${c.process.map(([t, d], k) => `          <div><small>0${k + 1}</small><b>${esc(t)}</b><span>${esc(d)}</span></div>`).join("\n")}
        </div>
        <p class="muted" style="font-size:1rem;margin-top:24px">Технології: ${esc(c.stack)}.</p>
      </div>
    </section>

    <section class="case-sec">
      <h2><span class="h-pre">06</span><span class="h-main">результат</span></h2>
      <div class="body"><p class="result-note">Це демонстраційний проєкт, тому бізнес-показників (кількість заявок, конверсія) тут немає. Для реальних замовлень ми публікуємо результати лише з дозволу клієнта.</p></div>
    </section>
  </div>

  <section class="dark-block cta-block">
    <div class="container">
      <div>
        <h2><span class="h-pre">потрібен схожий сайт?</span><span class="h-main">обговоримо</span></h2>
        <p>Розкажемо, скільки це коштуватиме саме для вас, — безкоштовно та без зобов'язань.</p>
      </div>
      <a href="${contact}" class="btn light" data-track="cta_case_band">Обговорити проєкт ${dot}</a>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="sec-head" style="margin-bottom:48px">
        <h2><span class="h-pre">інші</span><span class="h-main">проєкти</span></h2>
      </div>
      <div class="next-grid">
${others.map((o) => `        <article class="work">
          <a href="${o.slug}.html" class="shot" style="--tint:${o.tint};--word:${o.wordColor}" aria-label="Кейс ${esc(o.title)}"><span class="word">${esc(o.word)}</span><span class="screen"><img src="../assets/shots/${o.slug}-desktop.webp" alt="" width="1440" height="870" loading="lazy"></span></a>
          <div class="work-meta"><h3><a href="${o.slug}.html">${esc(o.name)}</a><span class="tag-demo">демо</span></h3><span>${esc(o.niche)}</span></div>
        </article>`).join("\n")}
      </div>
    </div>
  </section>
</main>

<footer class="site-footer dark-block">
  <div class="container">
    <div class="wordmark" aria-hidden="true"><span>YOUR</span><i></i><span>STUDIO</span></div>
    <div class="footer-bottom" style="border-top:0">
      <span>© <span data-year></span> YOUR STUDIO</span>
      <span><a href="https://t.me/Nice_sh0t" target="_blank" rel="noopener">Telegram</a> · <a href="mailto:danilo.formos@gmail.com">danilo.formos@gmail.com</a></span>
    </div>
  </div>
</footer>
<script src="../assets/main.js?v=${V}" defer></script>
</body>
</html>
`;
}

mkdirSync(join(ROOT, "cases"), { recursive: true });
CASES.forEach((c) => writeFileSync(join(ROOT, "cases", `${c.slug}.html`), page(c)));

// sitemap.xml
const urls = ["/", ...CASES.map((c) => `/cases/${c.slug}.html`)];
writeFileSync(
  join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${SITE}${u}</loc></url>`)
    .join("\n")}\n</urlset>\n`
);
console.log(`Згенеровано ${CASES.length} кейси + sitemap.xml`);
