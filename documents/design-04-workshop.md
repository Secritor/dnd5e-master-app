# Экран «Мастерская — Обзор» — спецификация для реализации

Артборд макета: **Мастерская — Обзор**, 1440×1400. Роут: `/master`. Слайс: `src/pages/master-home`.

Эта спецификация самодостаточна. Остальные `design-*.md` не читать. Публичную шапку «Свиток» этот экран не использует.

## Контракт идентичности

При ширине 1440px покоящийся обзор совпадает с макетом: сайдбар слева, контент справа, палитра, шрифты, отступы, радиусы, текст, иконки.

Ниже 1440px только то, что уже есть: внешний flex с `flex-wrap`, сетки `auto-fit` / `auto-fill`. Отдельный мобильный макет не придумывать. Когда сайдбар переносится вниз из-за wrap, это допустимо: у макета `flex: 1 1 240px` и `max-width: 100%`.

`min-height: 1400px` артборда не копировать. Фон страницы `#1C1915`. Сайдбар тянется по высоте ряда, не короче контента: у оболочки `align-items: stretch` (дефолт flex), сайдбар без фиксированной высоты.

Ховер ссылок — `#E6B676` поверх их покоя. `:focus-visible` — `outline: 2px solid #D9A35B; outline-offset: 2px`.

## Стек и границы

- CSS Modules. Значения ниже не заменять старыми oklch-токенами.
- Строки в `ru.ts` и `en.ts`.
- Страница не импортирует другие страницы. `widgets` не создавать.
- Кнопка «Создать» и «Продолжить» — локальные классы или новый вариант `accent` в `@/shared/ui/button`, если его ещё нет. Старые варианты `primary | secondary | outline | ghost | danger` не перекрашивать.
  - `accent` здесь: высота 48px, `padding: 0 20px 0 24px`, radius 8px, без рамки, фон `#D9A35B`, текст `#1C1915`, `font: 600 16px Inter`, inline-flex, `gap: 10px`.
- `documents/Design System.md` не менять. Старые токены не удалять.
- `useMasterCampaignStore` на этом экране не читать и не писать. Стор не удалять: обзор показывает демо-набор из этой спецификации, не список из localStorage.
- Полные каталоги НПС, предметов и заклинаний не проектировать. В макете их нет.

## Токены

Если `--scroll-*` ещё нет в `tokens.css`, добавить, не затирая старые имена:

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

Шрифты в `index.html`, если ещё Montserrat:

`https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap`

`<html class="dark">` не трогать.

Страница: фон `#1C1915`, текст `#EDE4D6`, Inter 16px / 24px. Ссылки без подчёркивания, цвет `#D9A35B`, ховер `#E6B676`.

## Куда класть код

Заменить разметку `master-home-page` на оболочку из двух колонок. Форму создания кампании и старый список из стора с этого экрана убрать. Файлы формы и стора не удалять, если на них больше нет импорта с экрана — тогда удалить только неиспользуемые модули экрана, стор оставить.

Фиксированный `LanguageSwitcher` из `AppShell` на `/master` не показывать. Его место — в блоке пользователя сайдбара, `placement="inline"`, текст `#A89C8A`, 13px. На других роутах, кроме `/`, `/company` и `/master`, фиксированный переключатель не трогать. `/character` задаёт своя спецификация; этот файл его не меняет.

Роут `/master` по-прежнему доступен без сессии: отдельного редиректа макет не задаёт. Блок «Выйти» при отсутствии сессии всё равно виден и ведёт на `/` через `signOut()` (он и так сбрасывает флаг).

Пункты сайдбара, для которых экран уже есть:

- Обзор → `/master`, `aria-current="page"`
- Кампании → `/company`
- НПС → `/master/npcs`
- Предметы → `/master/items`
- Заклинания → `/master/spells`

Две активные кампании в сайдбаре («Проклятие Страда», «[Своя кампания]») никуда не ведут: страницы кампании нет. Это кнопки без перехода или ссылки без `href`.

Обновить `documents/project-structure.md`: `/master` — обзор мастерской с сайдбаром, не список из стора.

## Оболочка

Корень: ширина 100%, фон `#1C1915`, цвет `#EDE4D6`, Inter 16px / 24px, flex, `flex-wrap: wrap`, `align-items: stretch`.

### Сайдбар

`aside`: `flex: 1 1 240px`, `max-width: 100%`, `box-sizing: border-box`, фон `#26221C`, `border-right: 1px solid #3D362C`, `padding: 24px 16px`, column, `gap: 24px`.

Верх — ссылка на `/`: flex, `align-items: center`, `gap: 10px`, цвет `#EDE4D6`, `padding: 0 8px`.

Иконка 24×24, `viewBox="0 0 28 28"`, fill none, stroke `#D9A35B`, `stroke-width="1.5"`, `aria-hidden`:

```svg
<path d="M14 2 25 8.5v11L14 26 3 19.5v-11z" />
<path d="M14 7 20 18H8z" />
<path d="M14 2v5M25 8.5 20 18M3 8.5 8 18M14 26l-6-8M14 26l6-8" />
```

Рядом слово **Мастерская**: Cormorant Garamond, weight 700, 22px, цвет `#EDE4D6`. Это не слово «Свиток».

`nav`, aria-label «Разделы мастера»: column, `gap: 4px`, 15px, weight 500.

Пункт-ссылка: flex, `align-items: center`, `gap: 12px`, `min-height: 44px`, `padding: 0 12px`, radius 8px.

Текущий «Обзор»: фон `#3A3022`, цвет `#D9A35B`, иконка `stroke="currentColor"`. Остальные пункты: фон прозрачный, текст `#EDE4D6`, иконка stroke `#A89C8A`.

Иконка «Обзор» 18×18, `viewBox="0 0 18 18"`, fill none, `stroke-width="1.5"`:

```svg
<rect x="2" y="2" width="6" height="6" rx="1.5" />
<rect x="10" y="2" width="6" height="6" rx="1.5" />
<rect x="2" y="10" width="6" height="6" rx="1.5" />
<rect x="10" y="10" width="6" height="6" rx="1.5" />
```

Под ним подпись группы, не ссылка: `padding: 16px 12px 6px`, 12px / 16px, `letter-spacing: 0.08em`, uppercase, цвет `#A89C8A`. Текст: «Активные кампании».

Две строки кампаний. Слева вместо иконки пустой квадрат 24×24, radius 6px, фон `#302A22`, рамка `1px solid #3D362C`, `flex-shrink: 0`, `aria-hidden`. Подписи: «Проклятие Страда» и «[Своя кампания]» — скобки часть текста.

Разделитель: высота 1px, фон `#3D362C`, `margin: 12px 0`.

Дальше четыре ссылки. Иконки 18×18, `viewBox="0 0 18 18"`, fill none, stroke `#A89C8A`, `stroke-width="1.5"`.

Кампании:

```svg
<path d="M2 4.5 6.5 2.5l5 2 4.5-2v11l-4.5 2-5-2L2 15.5z" />
<path d="M6.5 2.5v11M11.5 4.5v11" />
```

НПС:

```svg
<circle cx="9" cy="6" r="3" />
<path d="M3 16c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
```

Предметы:

```svg
<path d="M3 7h12v8H3z" />
<path d="M6 7V5a3 3 0 0 1 6 0v2" />
```

Заклинания:

```svg
<path d="M9 2l1.8 4.2L15 8l-4.2 1.8L9 14l-1.8-4.2L3 8l4.2-1.8z" />
```

Низ сайдбара: `margin-top: auto`, flex, `align-items: center`, `gap: 12px`, `padding: 12px`, radius 10px, рамка `1px solid #3D362C`.

Аватар: 36×36, круг, фон `#3A3022`, цвет `#D9A35B`, weight 600, flex по центру, `flex-shrink: 0`, `aria-hidden`. Буква «А». Имя из сессии не подставлять: в сессии имени нет.

Колонка текста, `min-width: 0`, `flex-grow: 1`:

- «[Имя мастера]»: 14px / 20px, weight 600, цвет `#EDE4D6`. Скобки оставить.
- «Выйти»: 13px / 18px, цвет `#A89C8A`. Клик: `signOut()` и переход на `/`.

Рядом `LanguageSwitcher`, как сказано выше, до кнопки настроек.

Кнопка настроек: 44×44, без рамки и фона, flex по центру, `aria-label` «Настройки». Клик ничего не открывает: экрана настроек в макете нет. Иконка 18×18, `viewBox="0 0 18 18"`, stroke `#A89C8A`, `stroke-width="1.5"`:

```svg
<circle cx="9" cy="9" r="2.5" />
<path d="M9 1.5v2.5M9 14v2.5M1.5 9H4M14 9h2.5M3.7 3.7l1.8 1.8M12.5 12.5l1.8 1.8M3.7 14.3l1.8-1.8M12.5 5.5l1.8-1.8" />
```

### Main

`main`: `flex: 999 1 560px`, `min-width: 0`, `padding: 40px 48px 80px`, `box-sizing: border-box`, column, `gap: 48px`.

Шапка main: flex, wrap, `align-items: center`, `justify-content: space-between`, `gap: 16px`.

Слева column, `gap: 4px`:

- `h1` «Добрый вечер, мастер»: margin 0, Cormorant Garamond, weight 600, 44px / 52px. Время суток не вычислять. Строка всегда такая.
- подпись margin 0, цвет `#A89C8A`: «2 активные кампании · 14 НПС · 23 предмета · 9 заклинаний». Числа не считать по спискам ниже. В списках по 5 строк, в подписи другие числа — так в макете. Разделитель — символ `·`.

Справа кнопка «Создать» варианта `accent` с шевроном 14×14, `viewBox="0 0 12 12"`, stroke `#1C1915`, `stroke-width="1.75"`: `<path d="m3 4.5 3 3 3-3" />`. Меню по клику не открывать и пункты не придумывать. Кнопка видима, действия нет.

## Секция «Активные кампании»

`section`, `aria-labelledby` на `h2`. Column, `gap: 20px`.

Шапка: flex, `justify-content: space-between`, `align-items: baseline`, `gap: 16px`.

`h2` «Активные кампании»: margin 0, Inter (не Cormorant), 20px / 28px, weight 600.

Ссылка «Все кампании →»: 14px, weight 500, на `/company`.

Сетка: `repeat(auto-fit, minmax(340px, 1fr))`, `gap: 24px`. Две карточки.

`article`: flex, radius 12px, фон `#26221C`, рамка `1px solid #3D362C`, `overflow: hidden`, `min-height: 180px`.

Слева рисунок, `aria-hidden`: ширина 160px, `flex-shrink: 0`, фон `#302A22`, flex по центру. SVG 72×40, `viewBox="0 0 120 64"`, stroke `#5A5043`, `stroke-width="2"`:

```svg
<path d="M2 62 38 18l20 24 16-14 44 34z" />
<circle cx="92" cy="14" r="8" />
```

Справа: `flex-grow: 1`, `min-width: 0`, `padding: 20px 24px`, column, `gap: 8px`.

Название: 18px / 26px, weight 600. Мета и дата: 14px / 20px, `#A89C8A`.

Кнопка «Продолжить»: `margin-top: auto`, `align-self: flex-start`, высота 40px, `padding: 0 18px`, radius 8px, фон `#D9A35B`, текст `#1C1915`, weight 600, 14px. Страницы сессии нет — клик без перехода.

Данные дословно:

| Название | Мета | Дата |
| --- | --- | --- |
| Проклятие Страда | 5 игроков · сессия 12 | Последняя игра: 28 октября |
| [Своя кампания] | 4 игрока · сессия 3 | Последняя игра: [дата] |

## Секция «Библиотека»

`section`, `aria-label` «Библиотека» (видимого заголовка секции нет). Grid `repeat(auto-fit, minmax(280px, 1fr))`, `gap: 24px`. Три колонки.

Карточка: radius 12px, фон `#26221C`, рамка `1px solid #3D362C`, `padding: 20px 20px 12px`, column, `gap: 8px`.

Шапка карточки: flex, `justify-content: space-between`, `align-items: baseline`, `padding-bottom: 8px`.

`h2`: margin 0, 18px / 26px, weight 600. Ссылка «Все →»: 14px, weight 500.

Куда ведёт «Все →»:

- НПС → `/master/npcs`
- Предметы → `/master/items`
- Заклинания → `/master/spells`

Строка: flex, `align-items: center`, `gap: 12px`, `min-height: 48px`, `padding: 0 8px`, radius 8px, `border-top: 1px solid #3D362C`, цвет `#EDE4D6`. Ссылка на тот же роут, что «Все →» этой колонки. Отдельной страницы записи нет.

Слева пустой квадрат 32×32, radius 8px, фон `#302A22`, `flex-shrink: 0`, `aria-hidden`.

Имя: 14px / 20px, weight 500. Подпись: 13px / 18px, `#A89C8A`.

НПС:

- Исмарк Колянович — Человек · союзник · Проклятие Страда
- Мадам Ева — Вистани · провидица · Проклятие Страда
- [Имя НПС] — [Раса · роль · кампания]
- [Имя НПС] — [Раса · роль · кампания]
- [Имя НПС] — [Раса · роль · кампания]

Предметы:

- Солнечный меч — Оружие · легендарный
- Зелье лечения — Зелье · обычный
- [Предмет] — [Тип · редкость]
- [Предмет] — [Тип · редкость]
- [Предмет] — [Тип · редкость]

Заклинания:

- Огненный шар — 3 уровень · воплощение
- Щит — 1 уровень · ограждение
- [Заклинание] — [Уровень · школа]
- [Заклинание] — [Уровень · школа]
- [Заклинание] — [Уровень · школа]

Скобки в плейсхолдерах — часть видимого текста.

## Секция «Мои кампании»

Column, `gap: 20px`. `h2` «Мои кампании»: margin 0, Inter, 20px / 28px, weight 600.

Сетка: `repeat(auto-fill, minmax(240px, 1fr))`, `gap: 20px`. Четыре карточки и пятая ячейка — кнопка.

Карточка-ссылка без перехода (страницы нет): column, radius 12px, фон `#26221C`, рамка `1px solid #3D362C`, `overflow: hidden`, цвет `#EDE4D6`.

Верх, `aria-hidden`: `aspect-ratio: 16 / 9`, фон `#302A22`. Пустой, без гор и без фото.

Низ: `padding: 16px`, column, `gap: 8px`. Название 16px / 22px, weight 600.

Чипы: flex, wrap, `gap: 6px`, 12px / 16px. Обычный чип: `padding: 3px 8px`, radius 999px, фон `#302A22`, текст `#EDE4D6`.

Статус, один на карточку:

- Активна: фон `#3A3022`, текст `#D9A35B`, weight 600
- Черновик: фон прозрачный, рамка `1px solid #3D362C`, текст `#A89C8A`, weight 600
- Завершена: фон `#2C3024`, текст `#8FA876`, weight 600

Дальше чип игроков и чип уровня.

| Название | Статус | Игроки | Уровень |
| --- | --- | --- | --- |
| Проклятие Страда | Активна | 5 игроков | Рек. ур. 3 |
| [Своя кампания] | Активна | 4 игрока | Рек. ур. 1 |
| [Черновик кампании] | Черновик | 3–5 игроков | Рек. ур. 5 |
| Затерянные рудники Фанделвера | Завершена | 4 игрока | Рек. ур. 1 |

Кнопка «Новая кампания»: `min-height: 200px`, radius 12px, `border: 1px dashed #3D362C`, фон прозрачный, цвет `#A89C8A`, `font: 500 15px Inter`, column, по центру, `gap: 8px`. Плюс 24×24, stroke `#D9A35B`, `stroke-width="1.75"`, `viewBox="0 0 24 24"`: `<path d="M12 5v14M5 12h14" />`. Форму создания не открывать. Клик без эффекта.

## Ключи локалей

Демо-строки со скобками тоже ключи, не захардкоженный русский в JSX.

| Ключ | ru | en |
| --- | --- | --- |
| `workshop.brand` | Мастерская | Workshop |
| `workshop.nav` | Разделы мастера | Master sections |
| `workshop.overview` | Обзор | Overview |
| `workshop.activeGroup` | Активные кампании | Active campaigns |
| `workshop.campaigns` | Кампании | Campaigns |
| `workshop.npcs` | НПС | NPCs |
| `workshop.items` | Предметы | Items |
| `workshop.spells` | Заклинания | Spells |
| `workshop.masterName` | [Имя мастера] | [Master name] |
| `workshop.avatarLetter` | А | A |
| `workshop.signOut` | Выйти | Sign out |
| `workshop.settings` | Настройки | Settings |
| `workshop.greeting` | Добрый вечер, мастер | Good evening, master |
| `workshop.stats` | 2 активные кампании · 14 НПС · 23 предмета · 9 заклинаний | 2 active campaigns · 14 NPCs · 23 items · 9 spells |
| `workshop.create` | Создать | Create |
| `workshop.allCampaigns` | Все кампании → | All campaigns → |
| `workshop.continue` | Продолжить | Continue |
| `workshop.active1Title` | Проклятие Страда | Curse of Strahd |
| `workshop.active1Meta` | 5 игроков · сессия 12 | 5 players · session 12 |
| `workshop.active1Last` | Последняя игра: 28 октября | Last session: 28 October |
| `workshop.active2Title` | [Своя кампания] | [Your campaign] |
| `workshop.active2Meta` | 4 игрока · сессия 3 | 4 players · session 3 |
| `workshop.active2Last` | Последняя игра: [дата] | Last session: [date] |
| `workshop.library` | Библиотека | Library |
| `workshop.all` | Все → | All → |
| `workshop.npc1` | Исмарк Колянович | Ismark Kolyanovich |
| `workshop.npc1sub` | Человек · союзник · Проклятие Страда | Human · ally · Curse of Strahd |
| `workshop.npc2` | Мадам Ева | Madam Eva |
| `workshop.npc2sub` | Вистани · провидица · Проклятие Страда | Vistani · seer · Curse of Strahd |
| `workshop.npcPh` | [Имя НПС] | [NPC name] |
| `workshop.npcPhSub` | [Раса · роль · кампания] | [Ancestry · role · campaign] |
| `workshop.item1` | Солнечный меч | Sunsword |
| `workshop.item1sub` | Оружие · легендарный | Weapon · legendary |
| `workshop.item2` | Зелье лечения | Potion of healing |
| `workshop.item2sub` | Зелье · обычный | Potion · common |
| `workshop.itemPh` | [Предмет] | [Item] |
| `workshop.itemPhSub` | [Тип · редкость] | [Type · rarity] |
| `workshop.spell1` | Огненный шар | Fireball |
| `workshop.spell1sub` | 3 уровень · воплощение | 3rd level · evocation |
| `workshop.spell2` | Щит | Shield |
| `workshop.spell2sub` | 1 уровень · ограждение | 1st level · abjuration |
| `workshop.spellPh` | [Заклинание] | [Spell] |
| `workshop.spellPhSub` | [Уровень · школа] | [Level · school] |
| `workshop.mineTitle` | Мои кампании | My campaigns |
| `workshop.statusActive` | Активна | Active |
| `workshop.statusDraft` | Черновик | Draft |
| `workshop.statusDone` | Завершена | Finished |
| `workshop.mine2` | [Своя кампания] | [Your campaign] |
| `workshop.mine3` | [Черновик кампании] | [Campaign draft] |
| `workshop.mine4` | Затерянные рудники Фанделвера | Lost Mine of Phandelver |
| `workshop.players5` | 5 игроков | 5 players |
| `workshop.players4` | 4 игрока | 4 players |
| `workshop.players35` | 3–5 игроков | 3–5 players |
| `workshop.lvl3` | Рек. ур. 3 | Rec. lvl 3 |
| `workshop.lvl1` | Рек. ур. 1 | Rec. lvl 1 |
| `workshop.lvl5` | Рек. ур. 5 | Rec. lvl 5 |
| `workshop.newCampaign` | Новая кампания | New campaign |

Три одинаковые строки-плейсхолдера в колонке используют один ключ, не три копипасты строки в JSX.

## Чего не делать

- Не подставлять кампании из `dnd-campaign-store`.
- Не считать «14 НПС» по пяти строкам.
- Не менять «Добрый вечер» на «Доброе утро».
- Не открывать меню у «Создать» и форму у «Новая кампания».
- Не рисовать страницы НПС, предмета и заклинания. Ссылки ведут на уже существующие роуты-заглушки.
- Не ставить публичную шапку «Свиток» над сайдбаром.

## Приёмка

При 1440px, язык ru:

- Слева сайдбар `#26221C` с «Мастерская», золотым «Обзор», группой «АКТИВНЫЕ КАМПАНИИ», двумя именами, чертой, четырьмя разделами.
- Внизу круг «А», «[Имя мастера]», «Выйти», шестерёнка 44×44. «Выйти» возвращает на `/` и снимает сессию.
- Справа заголовок 44px «Добрый вечер, мастер» и золотая «Создать» с шевроном, без меню.
- Две широкие активные карточки с пустой обложкой-горами и «Продолжить».
- Три колонки библиотеки по 5 строк, у строки верхняя граница.
- Четыре свои кампании со статусами Активна / Активна / Черновик / Завершена и пунктирная «Новая кампания».
- НПС, Предметы, Заклинания и их «Все →» открывают `/master/npcs`, `/master/items`, `/master/spells`.
- «Кампании» в сайдбаре и «Все кампании →» открывают `/company`.

Проверка: `npm run build:check`. Показать вывод. `docs/` вне `develop` убрать `npm run clean`.
