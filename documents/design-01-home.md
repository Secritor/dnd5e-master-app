# Экран «Главная» — спецификация для реализации

Артборд макета: **Главная**, 1440×2560. Роут: `/`. Слайс: `src/pages/mode-select`.

Эта спецификация самодостаточна. Реализовать только этот экран и общую публичную оболочку, если её ещё нет. Не открывать остальные `design-*.md`, чтобы не смешать экраны.

Источник правды по внешнему виду — этот файл, снятый с макета. Значения ниже копировать, не округлять и не заменять «близким» токеном проекта.

## Контракт идентичности

При ширине окна 1440px покоящийся экран совпадает с макетом: палитра, шрифты, размеры, отступы, радиусы, сетка, порядок блоков, русский текст, иконки.

Ниже 1440px действует только то, что уже заложено: `flex-wrap` и `grid-template-columns: repeat(auto-fit, minmax(...))`. Отдельный мобильный макет не придумывать. Горизонтального скролла страницы нет.

`min-height: 2560px` с артборда на страницу не ставить. Высота складывается из блоков. Фон документа — `#1C1915` на всю высоту.

Покой важнее ховера. Единственный ховер из макета: ссылка без собственного цвета становится `#E6B676`. У ссылок, которым ниже задан свой цвет, в покое остаётся он, при наведении — `#E6B676`. Кнопки в покое как в спецификации. Не добавлять тени, градиенты, анимации появления, параллакс.

`:focus-visible` — `outline: 2px solid #D9A35B; outline-offset: 2px`. В покое обводки фокуса нет.

## Стек и границы

- React, CSS Modules, токены из `src/app/styles/tokens.css`. Инлайн-стили не писать: каждый блок ниже — класс модуля, свойства те же.
- Строки сразу в `src/shared/config/locales/ru.ts` и `en.ts`. В JSX только `t(...)`.
- FSD: страница не импортирует другую страницу и не импортирует `features` соседнего слайса напрямую, кроме уже существующего импорта. Новый слой `widgets` не создавать.
- Экраны по-прежнему берут примитивы из `@/shared/ui`. Если текущие варианты `Button` не совпадают с размерами ниже, добавить варианты, не перекрашивая старые `primary | secondary | outline | ghost | danger`:
  - `accent` — фон `#D9A35B`, текст `#1C1915`, высота 48px, padding `0 28px`, radius 8px, font-weight 600, размер 16px, без рамки.
  - `quiet` — фон прозрачный, рамка `1px solid #3D362C`, текст `#EDE4D6`, высота 48px, padding `0 28px`, radius 8px, font-weight 500, размер 16px.
- Шапка «Войти» ниже ростом (40px) — это не вариант `quiet`, а отдельный класс шапки.
- Не менять `documents/Design System.md`. Не удалять старые CSS-переменные: незакрытые экраны на них живут.

## Токены

Добавить в `tokens.css`, не затирая существующие `--background`, `--accent` и остальные. Экраны нового дизайна читают только `--scroll-*`.

```css
--scroll-bg: #1c1915;
--scroll-section: #211e19;
--scroll-card: #26221c;
--scroll-field: #302a22;
--scroll-ability-head: #2b261f;
--scroll-border: #3d362c;
--scroll-text: #ede4d6;
--scroll-muted: #a89c8a;
--scroll-accent: #d9a35b;
--scroll-accent-hover: #e6b676;
--scroll-accent-soft: #3a3022;
--scroll-community: #c47a4e;
--scroll-easy-bg: #2c3024;
--scroll-easy-text: #8fa876;
--scroll-hard-bg: #3a2620;
--scroll-hard-text: #d27560;
--scroll-placeholder-stroke: #5a5043;
--scroll-overlay: rgba(12, 10, 8, 0.72);
--scroll-font-display: "Cormorant Garamond", Georgia, serif;
--scroll-font-ui: Inter, system-ui, sans-serif;
--scroll-content: 1200px;
--scroll-pad: 24px;
```

В `index.html` заменить ссылку Montserrat на:

`https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap`

`preconnect` на `fonts.googleapis.com` и `fonts.gstatic.com` оставить. `<html class="dark">` не трогать. Светлой темы нет.

База для страниц нового дизайна (в модуле оболочки, не глобально на все старые экраны):

- фон `#1C1915`, цвет текста `#EDE4D6`, шрифт Inter, 16px / 24px
- `a { color: #D9A35B; text-decoration: none; }` и `a:hover { color: #E6B676; }`
- `input::placeholder, textarea::placeholder { color: #A89C8A; }`

## Куда класть код

Публичная шапка и подвал общие для `/` и `/company`. Страницы друг друга импортировать не могут, поэтому оболочка живёт в `app`:

- `src/app/public-layout.tsx`
- `src/app/public-layout.module.css`

Роутер: layout-роут без пути оборачивает только `/` и `/company`. Остальные роуты (`/master`, `/player`, архивы, будущий `/character`) оболочку не получают.

Если `public-layout.tsx` уже есть и совпадает с этой спецификацией — не переписывать.

`AppShell` больше не рисует фиксированный `LanguageSwitcher` на `/` и `/company`. На остальных путях фиксированный переключатель остаётся.

Страница `mode-select` рисует только четыре секции main: герой, «С чего начать», «Кампании», «Мастерская». Шапка и подвал — в layout.

Данные кампаний сейчас лежат в `pages/company`, а главная не может их импортировать. Перенести модель, статический массив, fetch и query-ключ в `entities/campaign` с публичным `index.ts`. Обе страницы импортируют только оттуда. Фильтры каталога остаются в `pages/company`. Если `entities/campaign` уже создан — использовать его. Это новый слайс: обновить `documents/project-structure.md` (роут оболочки, entities, что `/` больше не «выбор режима»).

Сессию по-прежнему даёт `useSessionStore` из `features/master-auth`. Layout в `app` может его импортировать.

## Публичная шапка

`header`, фон `#1C1915`, `border-bottom: 1px solid #3D362C`.

Внутренний ряд: `max-width: 1200px`, `margin: 0 auto`, `padding: 0 24px`, `min-height: 72px`, flex, `flex-wrap: wrap`, `align-items: center`, `justify-content: space-between`, `gap: 16px`.

Слева логотип-ссылка на `/`: flex, `align-items: center`, `gap: 12px`, цвет `#EDE4D6`.

Иконка 28×28, `viewBox="0 0 28 28"`, `fill="none"`, `stroke="#D9A35B"`, `stroke-width="1.5"`, `aria-hidden`:

```svg
<path d="M14 2 25 8.5v11L14 26 3 19.5v-11z" />
<path d="M14 7 20 18H8z" />
<path d="M14 2v5M25 8.5 20 18M3 8.5 8 18M14 26l-6-8M14 26l6-8" />
```

Рядом слово **Свиток**: Cormorant Garamond, weight 700, 24px, `letter-spacing: 0.02em`, цвет `#EDE4D6`.

Навигация, `aria-label` = ключ `chrome.nav` («Основная навигация»): flex, `flex-wrap: wrap`, `gap: 32px`, 15px, weight 500.

- **Персонаж** → `/character`, цвет `#EDE4D6`. Роут появится по `design-05`. Пока страница не существует, ссылка всё равно ведёт на `/character`.
- **Кампании** → `/company`, цвет `#EDE4D6`. На главной пункт не текущий.
- **Мастер**: flex, `align-items: center`, `gap: 6px`, цвет `#EDE4D6`. Иконка замка 14×14, `viewBox="0 0 16 16"`, stroke `#A89C8A`, `stroke-width="1.5"`:

```svg
<rect x="3" y="7" width="10" height="7" rx="1.5" />
<path d="M5 7V5a3 3 0 0 1 6 0v2" />
```

Справа от навигации, перед кнопкой входа: `LanguageSwitcher` с `placement="inline"`. Цвет текста `#A89C8A`, 15px. Не `position: fixed`.

Кнопка входа: высота 40px, `padding: 0 20px`, radius 8px, рамка `1px solid #3D362C`, цвет `#EDE4D6`, weight 500, 15px, inline-flex, по центру.

Поведение шапки:

- Нет сессии: «Мастер» и «Войти» открывают модалку входа (`MasterAuthModal`), не уводят со страницы. Стартовый шаг модалки — экран почты из `design-03`, не старая форма пароля.
- Есть сессия: «Войти» заменяется ссылкой **Мастерская** на `/master` с теми же размерами кнопки. «Мастер» в навигации тоже ведёт на `/master` и модалку не открывает. Остальная шапка не меняется. Имя пользователя в шапку не добавлять.

## Подвал главной

У главной подвал без верхней границы (у каталога граница есть — это другой файл).

Контейнер: `max-width: 1200px`, `margin: 0 auto`, `padding: 48px 24px 56px`, flex, `flex-wrap: wrap`, `justify-content: space-between`, `gap: 32px`, 14px / 20px, цвет `#A89C8A`.

Слева колонка, `gap: 8px`, `max-width: 420px`:

- **Свиток** — Cormorant Garamond, weight 700, 22px, цвет `#EDE4D6`
- «Фанатский проект. Dungeons & Dragons — товарный знак Wizards of the Coast.»

Справа `nav`, `aria-label` «Ссылки в подвале»: flex, `flex-wrap`, `gap: 24px`. Ссылки цветом `#A89C8A`: Персонаж → `/character`, Кампании → `/company`, Мастер → та же логика, что пункт «Мастер» в шапке. **[Контакты]** — текст вместе со скобками, никуда не ведёт (кнопка без перехода). Страницу контактов не создавать.

## Секция 1. Герой

`section`: `max-width: 1200px`, `margin: 0 auto`, `padding: 96px 24px 112px`, flex, `flex-wrap: wrap`, `align-items: center`, `gap: 48px`.

Левая колонка: `flex: 1 1 560px`, `min-width: 0`, column, `gap: 24px`.

Надзаголовок: margin 0, 12px / 16px, weight 500, `letter-spacing: 0.12em`, uppercase, цвет `#D9A35B`. Текст: «База данных для D&D 5e».

`h1`: margin 0, Cormorant Garamond, weight 600, 64px / 68px, `letter-spacing: -0.01em`, цвет `#EDE4D6`. Текст: «Персонажи, кампании и записи мастера в одном месте».

Абзац: margin 0, `max-width: 520px`, 18px / 28px, цвет `#A89C8A`. Текст: «Заполните лист персонажа, подберите кампанию по уровню и сложности или соберите свою библиотеку НПС, предметов и заклинаний.»

Ряд кнопок: flex, `flex-wrap`, `gap: 16px`, `padding-top: 8px`.

- «Создать персонажа» — вариант `accent`, ссылка на `/character`.
- «Смотреть кампании» — вариант `quiet`, ссылка на `/company`.

Правая колонка: `flex: 1 1 360px`, `min-width: 0`, flex, `justify-content: center`.

SVG 380×380, `viewBox="0 0 400 400"`, `fill="none"`, `aria-hidden`, `max-width: 100%`, `height: auto`:

```svg
<circle cx="200" cy="200" r="190" stroke="#3D362C" stroke-width="1" />
<circle cx="200" cy="200" r="150" stroke="#302A22" stroke-width="1" />
<g stroke="#D9A35B" stroke-width="1.5" stroke-linejoin="round">
  <path d="M200 40 339 120v160L200 360 61 280V120z" />
  <path d="M200 112 287 262H113z" />
  <path d="M200 40v72M339 120l-52 142M61 120l52 142M200 360l-87-98M200 360l87-98M339 280l-52-18M61 280l52-18M61 120l139-8M339 120l-139-8" />
</g>
<text x="200" y="222" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-size="56" font-weight="600" fill="#D9A35B">20</text>
```

Число 20 — часть рисунка, не данные.

## Секция 2. «С чего начать»

`section`, `aria-labelledby` на `h2`. Фон `#211E19`, рамки сверху и снизу `1px solid #3D362C`.

Внутри: `max-width: 1200px`, `margin: 0 auto`, `padding: 80px 24px`, column, `gap: 40px`.

`h2`: margin 0, Cormorant Garamond, weight 600, 40px / 48px, цвет `#EDE4D6`. Текст: «С чего начать».

Сетка: `repeat(auto-fit, minmax(300px, 1fr))`, `gap: 24px`.

Три карточки-ссылки. Общие стили: column, `gap: 16px`, `padding: 32px`, radius 12px, фон `#26221C`, рамка `1px solid #3D362C`, цвет текста `#EDE4D6`.

Заголовок карточки: 20px / 28px, weight 600. Описание: цвет `#A89C8A`. Ссылка внизу: `margin-top: auto`, цвет `#D9A35B`, weight 500.

Иконки 40×40, `viewBox="0 0 40 40"`, `fill="none"`, stroke `#D9A35B`, `stroke-width="1.5"`, `aria-hidden`.

1. Персонаж → `/character`.

```svg
<rect x="8" y="5" width="24" height="30" rx="3" />
<path d="M14 13h12M14 19h12M14 25h7" />
```

Заголовок «Персонаж». Текст: «Заполните лист персонажа и сохраните его, чтобы вернуться к нему в любой момент.» Низ: «Создать персонажа →».

2. Кампании → `/company`.

```svg
<path d="M5 9l10-4 10 4 10-4v26l-10 4-10-4-10 4z" />
<path d="M15 5v26M25 9v26" />
```

Заголовок «Кампании». Текст: «Официальные приключения и кампании сообщества с фильтрами по уровню, сложности и времени прохождения.» Низ: «Смотреть кампании →».

3. Мастер — то же действие, что пункт «Мастер» в шапке (модалка или `/master`).

Верх карточки: flex, `justify-content: space-between`, `align-items: flex-start`. Слева иконка:

```svg
<path d="M6 30l3-17 7 7 4-11 4 11 7-7 3 17z" />
<path d="M6 34h28" />
```

Справа бейдж «Нужен вход»: 12px / 16px, weight 500, `padding: 4px 10px`, radius 999px, рамка `1px solid #3D362C`, цвет `#A89C8A`. Бейдж показывать и при активной сессии: в макете он часть карточки. Куда ведёт карточка — по сессии, бейдж не прятать.

Заголовок «Мастер». Текст: «Личное пространство: НПС, предметы, заклинания, ваши кампании.» Низ: «Войти как мастер →».

## Секция 3. «Кампании»

`section`: `max-width: 1200px`, `margin: 0 auto`, `padding: 96px 24px`, column, `gap: 40px`.

Шапка секции: flex, `flex-wrap`, `justify-content: space-between`, `align-items: flex-end`, `gap: 16px`.

Слева column, `gap: 8px`:

- `h2` «Кампании»: Cormorant Garamond, weight 600, 40px / 48px, margin 0
- подпись «Классика издания и находки сообщества»: margin 0, цвет `#A89C8A`

Справа ссылка «Все кампании →» на `/company`, weight 500, цвет акцента.

Сетка карточек: `repeat(auto-fit, minmax(320px, 1fr))`, `gap: 24px`. Показать первые 3 кампании из `entities/campaign` в порядке массива. Звёзд на главной нет.

Пока запрос грузится — 3 скелетона той же карточки: блок обложки `aspect-ratio: 16 / 9`, фон `#302A22`, ниже полоса высотой 120px, фон `#26221C`, radius 12px, рамка `#3D362C`. Существующий `Skeleton`.

Ошибка запроса — текст уже есть в `campaignBoard.loadError`, плюс кнопка повтора. Отдельную страницу ошибки не рисовать.

### Карточка кампании на главной

Корень — ссылка на `/company` (страницы одной кампании в макете нет, `href="#"` не оставлять). Column, radius 12px, фон `#26221C`, рамка `1px solid #3D362C`, `overflow: hidden`, цвет `#EDE4D6`.

Обложка: `position: relative`, `aspect-ratio: 16 / 9`, фон `#302A22`, flex по центру.

Если у записи есть `thumbnailImage` — `img` на весь блок, `object-fit: cover`, `alt=""` (название уже в заголовке). Иначе плейсхолдер: SVG 120×64, `viewBox="0 0 120 64"`, stroke `#5A5043`, `stroke-width="1.5"`:

```svg
<path d="M2 62 38 18l20 24 16-14 44 34z" />
<circle cx="92" cy="14" r="8" />
```

Подпись «Обложка кампании» только когда картинки нет: `position: absolute`, `bottom: 12px`, `right: 12px`, 12px / 16px, цвет `#A89C8A`.

Бейдж сверху слева, `top: 12px`, `left: 12px`, 12px / 16px, weight 600, `padding: 4px 10px`, radius 999px, фон `#1C1915`.

Все текущие записи официальные: рамка и текст `#D9A35B`, подпись «Официальная». Бейдж «Сообщество» (рамка и текст `#C47A4E`) на главной не показывать: таких записей нет.

Тело: column, `gap: 12px`, `padding: 24px`, `flex-grow: 1`.

Название: 20px / 28px, weight 600, цвет `#EDE4D6`. Это `cardTitle`.

Источник: 14px / 20px, цвет `#A89C8A`. Поля книги в данных нет. Строка всегда «5-е издание».

Описание: margin 0, 15px / 22px, цвет `#A89C8A`, три строки:

`display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden`.

Текст — `description`.

Чипы: flex, `flex-wrap`, `gap: 8px`, `margin-top: auto`, `padding-top: 8px`, 13px / 18px.

Обычный чип: inline-flex, `align-items: center`, `gap: 6px`, `padding: 4px 10px`, radius 6px, фон `#302A22`, цвет `#EDE4D6`.

Порядок чипов:

1. Игроки. Иконка 14×14, `viewBox="0 0 16 16"`, stroke `#A89C8A`, `stroke-width="1.5"`:

```svg
<circle cx="6" cy="5" r="2.5" />
<path d="M1.5 14c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" />
<path d="M11 3a2.5 2.5 0 0 1 0 5M13 9.8c1 .7 1.5 2 1.5 4.2" />
```

Поля числа игроков нет. Текст чипа всегда «4–6 игроков».

2. Уровень без иконки: «Рек. ур. {playerLevelCount[0]}». Пример: кортеж `[1, 5]` → «Рек. ур. 1».

3. Сложность, один чип. Вычисление только для отображения, в данные не писать. Проверять сверху вниз, остановиться на первом совпадении:

- легко, если в `campaignMood` есть «Для новичков» или «Немного экшена», либо `playerLevelCount[1] <= 5`. Фон `#2C3024`, текст `#8FA876`, weight 500. Подпись «Легко».
- иначе сложно, если в настроении есть «Опасное», «Хоррор» или «Жуткая», либо `playerLevelCount[1] >= 15`. Фон `#3A2620`, текст `#D27560`, weight 500. Подпись «Сложно».
- иначе нормально. Фон `#3A3022`, текст `#D9A35B`, weight 500. Подпись «Нормально».

4. Время. Иконка часов 14×14, `viewBox="0 0 16 16"`, stroke `#A89C8A`, `stroke-width="1.5"`:

```svg
<circle cx="8" cy="8" r="6.5" />
<path d="M8 4.5V8l2.5 1.5" />
```

Поля длительности нет. Текст чипа «—». Чип не скрывать.

## Секция 4. «Мастерская»

`section`, фон `#211E19`, рамки сверху и снизу `1px solid #3D362C`.

Внутри: `max-width: 1200px`, `margin: 0 auto`, `padding: 96px 24px`, flex, `flex-wrap`, `align-items: center`, `gap: 64px`.

Левая колонка: `flex: 1 1 420px`, `min-width: 0`, column, `gap: 24px`.

Надзаголовок «Для мастеров»: те же 12px / 16px, weight 500, tracking `0.12em`, uppercase, `#D9A35B`.

`h2`: Cormorant Garamond, weight 600, 40px / 48px, margin 0. Текст: «Мастерская: всё для подготовки к игре».

Список без маркеров, margin 0, padding 0, column, `gap: 14px`. Каждый пункт: flex, `gap: 12px`, `align-items: flex-start`. Иконка галочки 20×20, `viewBox="0 0 20 20"`, stroke `#D9A35B`, `stroke-width="1.75"`, `flex-shrink: 0`, `margin-top: 2px`:

```svg
<path d="M4 10.5 8 14.5 16 6" />
```

Пункты дословно:

- Свои НПС с портретами и привязкой к кампаниям
- Библиотека предметов и заклинаний
- Собственные кампании: черновики, активные, завершённые
- Быстрый переход в активные кампании

Ниже `padding-top: 8px` и кнопка `accent` «Войти как мастер» — то же действие, что «Мастер» в шапке.

Правая колонка, `aria-hidden="true"` (это рисунок, не навигация): `flex: 1 1 480px`, `min-width: 0`, высота 360px, radius 16px, фон `#1C1915`, рамка `1px solid #3D362C`, flex, `overflow: hidden`.

Узкая колонка 150px, `flex-shrink: 0`, фон `#26221C`, `border-right: 1px solid #3D362C`, `padding: 20px 16px`, column, `gap: 10px`, 12px / 16px, цвет `#A89C8A`.

«Мастерская» в рисунке: Cormorant Garamond, 18px, weight 700, цвет `#EDE4D6`, `padding-bottom: 8px`.

Пункт «Обзор»: `padding: 6px 8px`, radius 6px, фон `#3A3022`, цвет `#D9A35B`. Остальные пункты только `padding: 6px 8px`: Активные, Кампании, НПС, Предметы, Заклинания.

Правая часть рисунка: `flex-grow: 1`, `padding: 20px`, column, `gap: 14px`, `min-width: 0`.

Подпись «Активные кампании»: 13px, weight 600, `#EDE4D6`.

Сетка 2 колонки, `gap: 12px`: два пустых блока, высота 110px, radius 10px, фон `#302A22`, рамка `#3D362C`.

Ниже сетка 3 колонки, `gap: 12px`, `flex-grow: 1`. Три карточки: radius 10px, фон `#26221C`, рамка `#3D362C`, `padding: 10px`, column, `gap: 6px`. Подписи 11px `#A89C8A`: НПС, Предметы, Заклинания. Под каждой две полоски высотой 6px, radius 3px, фон `#3D362C`. Вторая полоска шириной 70%, 60% и 80% соответственно.

## Ключи локалей

Добавить, старые ключи `home.*` не удалять, если они ещё читаются. Новые:

| Ключ | ru | en |
| --- | --- | --- |
| `chrome.brand` | Свиток | Scroll |
| `chrome.nav` | Основная навигация | Main |
| `chrome.character` | Персонаж | Character |
| `chrome.campaigns` | Кампании | Campaigns |
| `chrome.master` | Мастер | Master |
| `chrome.signIn` | Войти | Sign in |
| `chrome.workshop` | Мастерская | Workshop |
| `chrome.footerNav` | Ссылки в подвале | Footer |
| `chrome.disclaimer` | Фанатский проект. Dungeons & Dragons — товарный знак Wizards of the Coast. | A fan project. Dungeons & Dragons is a trademark of Wizards of the Coast. |
| `chrome.contacts` | [Контакты] | [Contact] |
| `home.kicker` | База данных для D&D 5e | A database for D&D 5e |
| `home.heroTitle` | Персонажи, кампании и записи мастера в одном месте | Characters, campaigns, and the master's notes in one place |
| `home.heroText` | Заполните лист персонажа, подберите кампанию по уровню и сложности или соберите свою библиотеку НПС, предметов и заклинаний. | Fill in a character sheet, pick a campaign by level and difficulty, or build your own library of NPCs, items, and spells. |
| `home.createCharacter` | Создать персонажа | Create a character |
| `home.browseCampaigns` | Смотреть кампании | Browse campaigns |
| `home.pathsTitle` | С чего начать | Where to start |
| `home.pathCharacterText` | Заполните лист персонажа и сохраните его, чтобы вернуться к нему в любой момент. | Fill in a character sheet and keep it, so you can come back to it any time. |
| `home.pathCharacterLink` | Создать персонажа → | Create a character → |
| `home.pathCampaignsText` | Официальные приключения и кампании сообщества с фильтрами по уровню, сложности и времени прохождения. | Official adventures and community campaigns, with filters for level, difficulty, and play time. |
| `home.pathCampaignsLink` | Смотреть кампании → | Browse campaigns → |
| `home.signInNeeded` | Нужен вход | Sign-in required |
| `home.pathMasterText` | Личное пространство: НПС, предметы, заклинания, ваши кампании. | A private space: NPCs, items, spells, your campaigns. |
| `home.pathMasterLink` | Войти как мастер → | Sign in as master → |
| `home.campaignsLead` | Классика издания и находки сообщества | Classics of the edition and finds from the community |
| `home.allCampaigns` | Все кампании → | All campaigns → |
| `home.coverPlaceholder` | Обложка кампании | Campaign cover |
| `home.official` | Официальная | Official |
| `home.edition` | 5-е издание | 5th edition |
| `home.playersFallback` | 4–6 игроков | 4–6 players |
| `home.level` | Рек. ур. {{level}} | Rec. lvl {{level}} |
| `home.easy` | Легко | Easy |
| `home.normal` | Нормально | Normal |
| `home.hard` | Сложно | Hard |
| `home.timeUnknown` | — | — |
| `home.forMasters` | Для мастеров | For masters |
| `home.workshopTitle` | Мастерская: всё для подготовки к игре | The workshop: everything for session prep |
| `home.workshopPoint1` | Свои НПС с портретами и привязкой к кампаниям | Your own NPCs, with portraits and links to campaigns |
| `home.workshopPoint2` | Библиотека предметов и заклинаний | A library of items and spells |
| `home.workshopPoint3` | Собственные кампании: черновики, активные, завершённые | Campaigns of your own: drafts, active, finished |
| `home.workshopPoint4` | Быстрый переход в активные кампании | A quick jump into active campaigns |
| `home.signInMaster` | Войти как мастер | Sign in as master |

Английский — перевод смысла, не дословная калька сверх этой таблицы. Русский на экране при языке `ru` совпадает с макетом посимвольно, включая стрелку «→» и скобки в «[Контакты]».

## Чего не делать

- Не возвращать три кнопки «Игрок / Мастер / Компании» и старый абзац выбора режима.
- Не показывать на главной звёзды, фильтры, вкладки каталога, сайдбар мастерской.
- Не рисовать карточки сообщества с текстом «[Название кампании]»: на главной только реальные официальные записи.
- Не выдумывать часы прохождения и точное число игроков.
- Не делать страницу одной кампании.
- Не подключать реальный OAuth.

## Приёмка

При 1440px и языке ru, без сессии:

- Шапка 72px: Свиток, Персонаж, Кампании, Мастер с замком, переключатель языка, «Войти».
- Герой: золотой надзаголовок, заголовок 64px, две кнопки, знак с числом 20.
- Три карточки «С чего начать», у мастера бейдж «Нужен вход».
- Три карточки кампаний с обложками из `thumbnailImage`, бейджем «Официальная», четырьмя чипами.
- Тёмный блок мастерской: список с галочками и рисунок интерфейса, который не кликается.
- Подвал со словом Свиток и «[Контакты]».
- «Войти», «Мастер», «Войти как мастер» открывают модалку.
- «Создать персонажа» ведёт на `/character`, «Смотреть кампании» и «Все кампании →» — на `/company`.
- С сессией кнопка шапки читается «Мастерская» и ведёт на `/master`.
- Клавиатура: виден только `:focus-visible` цветом `#D9A35B`.

Проверка: `npm run build:check`. Показать вывод. Если появился `docs/` не в ветке `develop` — `npm run clean`.
