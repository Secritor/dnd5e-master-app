# Экран «Лист персонажа 5e» — спецификация для реализации

Артборд макета: **Лист персонажа 5e**, 1440×2400. Новый роут: `/character`. Заглушку `/player` не занимать и не удалять.

Эта спецификация самодостаточна. Остальные `design-*.md` не читать. Публичную шапку «Свиток» и сайдбар мастерской этот экран не использует.

## Контракт идентичности

При ширине 1440px и открытой вкладке «Основное» покоящийся лист совпадает с макетом: липкая шапка, блок имени, вкладки, три колонки полей.

Вкладки «Биография» и «Заклинания» в том же артборде скрыты condition-блоками. Их вёрстка ниже снята с тех же стилей. При переключении видна ровно одна вкладка. Шапка листа и блок «Основные данные» остаются на всех трёх.

`min-height: 2400px` артборда не копировать. Фон страницы `#1C1915`. Ниже 1440px только `flex-wrap` и `auto-fit` / `minmax`, уже указанные в сетках. Отдельный мобильный макет не придумывать. Таблица заклинаний при нехватке ширины скроллится внутри себя (`overflow-x: auto`, внутренний `min-width: 760px`), страница целиком — нет.

Ховер ссылок `#E6B676`. `:focus-visible` — `outline: 2px solid #D9A35B; outline-offset: 2px`. У полей, которым ниже задана своя рамка фокуса, второй outline не добавлять.

Плейсхолдеры инпутов и textarea: цвет `#A89C8A`.

## Стек и границы

- Новый слайс `src/pages/character`: `index.ts`, `ui/character-page.tsx`, `ui/character-page.module.css`. Роут в `src/app/router.tsx` через `lazy` и существующий `withSuspense`.
- CSS Modules. Числа ниже не округлять.
- Строки в `ru.ts` и `en.ts`. Подписи полей, плейсхолдеры, aria-label — тоже ключи.
- Страница не импортирует другие страницы. `widgets` не создавать. Стор персонажа не заводить. `localStorage` не писать.
- Поля неконтролируемые, кроме того, что ниже названо состоянием: вкладка и массив ячеек заклинаний. Добавление строки оружия и строки заклинания — тоже состояние списков, иначе кнопки «добавить» нечего рендерить.
- `documents/Design System.md` не менять. Старые токены не удалять.
- Обновить `documents/project-structure.md`: роут `/character`, слайс `pages/character`. `/player` остаётся заглушкой режима игрока.

Кнопки шапки — локальные классы или уже существующие варианты, если они пиксель в пиксель совпадают. Старые `primary | secondary | outline | ghost | danger` не перекрашивать. Если нужен новый вариант в `@/shared/ui/button`:

- `accent` — высота 44px, `padding: 0 24px`, radius 8px, без рамки, фон `#D9A35B`, текст `#1C1915`, `font: 600 15px Inter`
- `quiet` — высота 44px, `padding: 0 20px`, radius 8px, рамка `1px solid #3D362C`, фон прозрачный, текст `#EDE4D6`, `font: 500 15px Inter`

«Сохранить черновик» и «Создать и сохранить» видимы и ничего не делают: ни тост, ни переход, ни запись. Так в макете.

Фиксированный `LanguageSwitcher` из `AppShell` на `/character` убрать. В макете переключателя нет. Ставить его в липкую шапку слева от кнопок, `placement="inline"`, текст `#A89C8A`, 15px, чтобы язык по-прежнему менялся и не ломал ряд.

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

Страница: фон `#1C1915`, текст `#EDE4D6`, Inter 16px / 24px.

Общий вид текстового поля, если у конкретного поля нет своей высоты: рамка `1px solid #3D362C`, фон `#302A22`, цвет текста `#EDE4D6`, radius 8px. Чекбокс 18×18, `accent-color` задан у каждого места отдельно.

## Липкая шапка

Обёртка: `position: sticky; top: 0; z-index: 2`, фон `#1C1915`, `border-bottom: 1px solid #3D362C`.

Ряд: `max-width: 1200px`, `margin: 0 auto`, `padding: 12px 24px`, `min-height: 72px`, `box-sizing: border-box`, flex, wrap, `align-items: center`, `justify-content: space-between`, `gap: 16px`.

Слева: flex, `align-items: center`, `gap: 16px`.

«← Назад»: inline-flex, `gap: 6px`, `min-height: 44px`, 15px, weight 500, цвет `#A89C8A`. Стрелка — символ в тексте, не иконка. Клик: `history` назад, если перешли с другого экрана приложения; иначе на `/`. Отдельный роут не создавать.

Рядом «Новый персонаж»: Cormorant Garamond, weight 600, 28px / 36px, цвет `#EDE4D6`. Это не поле имени.

Справа: flex, wrap, `gap: 12px`, затем переключатель языка, затем «Сохранить черновик» (`quiet`), затем «Создать и сохранить» (`accent`).

## Main

`main`: `max-width: 1200px`, `margin: 0 auto`, `padding: 32px 24px 96px`, column, `gap: 28px`.

### Основные данные

`section`, aria-label «Основные данные»: `padding: 24px`, radius 12px, фон `#26221C`, рамка `1px solid #3D362C`, flex, wrap, `gap: 24px`.

Имя: `label`, `flex: 1 1 320px`, column, `gap: 8px`. Подпись: 12px / 16px, weight 500, `letter-spacing: 0.06em`, uppercase, цвет `#A89C8A`. Текст: «Имя персонажа».

Инпут placeholder «Как зовут героя?»: высота 64px, `padding: 0 16px`, radius 8px, рамка `1px solid #3D362C`, фон `#302A22`, цвет `#EDE4D6`, `font: 600 28px 'Cormorant Garamond', Georgia, serif`, `letter-spacing: 0`, без uppercase (uppercase только у подписи).

Справа сетка: `flex: 2 1 520px`, `repeat(auto-fit, minmax(160px, 1fr))`, `gap: 12px 16px`. Шесть полей. Подпись: column, `gap: 6px`, 12px / 16px, weight 500, цвет `#A89C8A`, без uppercase и без tracking (в отличие от имени). Инпут: высота 40px, `padding: 0 12px`, radius 8px, рамка `#3D362C`, фон `#302A22`, цвет `#EDE4D6`, `font: 400 15px Inter`.

| Подпись | Placeholder |
| --- | --- |
| Класс и уровень | Воин 1 |
| Предыстория | Солдат |
| Имя игрока | пустой |
| Раса | Человек |
| Мировоззрение | Законно-доброе |
| Опыт | 0 |

### Вкладки листа

`role="tablist"`, aria-label «Разделы листа»: flex, wrap, `gap: 4px`, `border-bottom: 1px solid #3D362C`.

Пункты: «Основное», «Биография», «Заклинания». Старт — «Основное».

Активная: высота 48px, `padding: 0 20px`, фон прозрачный, border none, `border-bottom: 2px solid #D9A35B`, `margin-bottom: -1px`, цвет `#EDE4D6`, `font: 600 15px Inter`, `aria-selected="true"`.

Неактивная: нижняя граница прозрачная, цвет `#A89C8A`, weight 500, `aria-selected="false"`.

Панели ниже не размонтировать с потерей введённого: неконтролируемые инпуты при размонтировании сотрутся. Держать все три панели в DOM и прятать неактивные через `hidden`, не через условный рендер. Вкладки только переключают видимость.

## Вкладка «Основное»

Grid: `repeat(auto-fit, minmax(340px, 1fr))`, `gap: 24px`, `align-items: start`. Три колонки. На 1440px они стоят в ряд: левая характеристики, средняя бой, правая черты. `minmax(340px, 1fr)` при контенте 1152px (1200 − 48) даёт три колонки.

### Левая колонка

Column, `gap: 16px`.

Верхняя пара, grid 2 колонки, `gap: 12px`.

«Вдохновение»: `label`, flex, `align-items: center`, `gap: 10px`, `min-height: 48px`, `padding: 0 14px`, radius 10px, фон `#26221C`, рамка `#3D362C`, 14px, weight 500. Чекбокс 18×18, `accent-color: #D9A35B`.

«Бонус мастерства»: тот же блок, но `justify-content: space-between`, `padding: 0 8px 0 14px`. Инпут placeholder «+2»: ширина 48px, высота 32px, по центру текста, radius 6px, рамка `#3D362C`, фон `#302A22`, цвет `#EDE4D6`, `font: 600 14px Inter`.

Дальше шесть карточек характеристик, в этом порядке. Карточка: radius 12px, фон `#26221C`, рамка `#3D362C`, `overflow: hidden`. `aria-label` — полное имя.

Шапка карточки: flex, `align-items: center`, `gap: 12px`, `padding: 12px 14px`, фон `#2B261F`, `border-bottom: 1px solid #3D362C`.

Текст: column, `flex-grow: 1`, `min-width: 0`. Полное имя 16px / 22px, weight 600, цвет `#EDE4D6`. Аббревиатура 11px / 16px, weight 600, `letter-spacing: 0.08em`, цвет `#A89C8A`.

Значение: ширина 56px, высота 44px, по центру, radius 8px, рамка `#3D362C`, фон `#302A22`, цвет `#EDE4D6`, `font: 600 22px Inter`, `inputmode="numeric"`, placeholder «10». `aria-label` «{полное имя} — значение».

Модификатор: ширина 52px, высота 32px, по центру, radius 999px, рамка `1px solid #D9A35B`, фон `#1C1915`, цвет `#D9A35B`, `font: 600 14px Inter`, placeholder «+0». `aria-label` «{полное имя} — модификатор». Модификатор не считать из значения: оба поля независимы, как в макете.

Тело: `padding: 8px 14px 10px`, column, `gap: 2px`.

Строка спасброска и каждый навык: flex, `align-items: center`, `gap: 10px`, `min-height: 34px`. Инпут placeholder «+0»: ширина 44px, высота 28px, по центру, radius 6px, рамка `#3D362C`, фон `#302A22`, цвет `#EDE4D6`, `font: 500 13px Inter`.

Подпись спасброска: 14px, weight 600, цвет `#EDE4D6`, текст «Спасбросок». `aria-label` инпута: «Спасбросок {полное имя}».

Навык: подпись 14px, обычный вес, цвет `#EDE4D6`. `aria-label` инпута: «{навык} — значение».

| Полное имя | Код | Навыки |
| --- | --- | --- |
| Сила | СИЛ | Атлетика |
| Ловкость | ЛОВ | Акробатика, Ловкость рук, Скрытность |
| Телосложение | ТЕЛ | нет строк навыков, только спасбросок |
| Интеллект | ИНТ | Анализ, История, Магия, Природа, Религия |
| Мудрость | МДР | Внимательность, Выживание, Медицина, Проницательность, Уход за животными |
| Харизма | ХАР | Выступление, Запугивание, Обман, Убеждение |

Под карточками строка «Пассивная мудрость (внимательность)»: как «Бонус мастерства», инпут placeholder «10», ширина 48px, высота 32px, те же цвета, `font: 600 14px Inter`.

Ниже блок «Прочие владения и языки»: `label`, column, `gap: 8px`, `padding: 16px`, radius 12px, фон `#26221C`, рамка `#3D362C`. Подпись 13px, weight 600, tracking `0.06em`, uppercase, `#A89C8A`. Textarea `rows={4}`, `resize: vertical`, `padding: 10px 12px`, radius 8px, рамка `#3D362C`, фон `#302A22`, цвет `#EDE4D6`, `font: 400 14px/20px Inter`, без uppercase и без tracking (это только у подписи). Placeholder: «Языки, доспехи, оружие, инструменты».

### Средняя колонка

Column, `gap: 20px`.

Три плитки, grid 3 колонки, `gap: 12px`. Плитка: `label`, column, `align-items: center`, `justify-content: space-between`, `gap: 6px`, `padding: 14px 8px`, radius 12px, фон `#26221C`, рамка `#3D362C`. Подпись: 11px, weight 600, tracking `0.08em`, uppercase, `#A89C8A`, `min-height: 32px`, flex по центру, `text-align: center`.

| Подпись | Placeholder | Инпут |
| --- | --- | --- |
| Класс доспеха | 10 | ширина 64px, высота 48px, `font: 600 24px Inter` |
| Инициатива | +0 | то же, 24px |
| Скорость | 30 фт | то же, но `font: 600 18px Inter` |

Общие свойства инпута: по центру, radius 8px, рамка `#3D362C`, фон `#302A22`, цвет `#EDE4D6`.

Хиты. `fieldset`: margin 0, `padding: 16px`, radius 12px, фон `#26221C`, рамка `#3D362C`, grid 3 колонки, `gap: 12px`. `legend`: `padding: 0 6px`, 13px, weight 600, tracking `0.06em`, uppercase, `#A89C8A`. Текст: «Хиты».

Три поля, подпись 12px, цвет `#A89C8A`, column, `gap: 6px`. Инпут placeholder «0», высота 44px, текст по центру, radius 8px, фон `#302A22`, цвет `#EDE4D6`, `font: 600 18px Inter`.

- Максимум — рамка `#3D362C`
- Текущие — рамка `1px solid #D9A35B`
- Временные — рамка `#3D362C`

Пара ниже, grid 2 колонки, `gap: 12px`.

«Кость хитов»: `label`, column, `gap: 8px`, `padding: 16px`, radius 12px, фон `#26221C`, рамка `#3D362C`. Подпись как у legend (13px, 600, tracking `0.06em`, uppercase, `#A89C8A`). Инпут placeholder «1к8»: высота 44px, текст по центру, radius 8px, рамка `#3D362C`, фон `#302A22`, `font: 600 18px Inter`, без uppercase.

«От смерти»: `fieldset`, margin 0, `padding: 16px`, radius 12px, те же фон и рамка, column, `gap: 10px`, 13px. Legend «От смерти» теми же стилями подписи.

Строка: flex, `align-items: center`, `justify-content: space-between`, `gap: 8px`.

- «Успехи» и три чекбокса, `gap: 8px`, 18×18, `accent-color: #8FA876`. aria-label: «Успех 1», «Успех 2», «Успех 3».
- «Провалы» и три чекбокса, `accent-color: #D27560`. aria-label: «Провал 1», «Провал 2», «Провал 3».

Оружие. `fieldset`: margin 0, `padding: 16px`, radius 12px, фон `#26221C`, рамка `#3D362C`, column, `gap: 8px`. Legend «Оружие и боевые заговоры».

Шапка таблицы: grid `2fr 1fr 1.6fr`, `gap: 8px`, 12px, цвет `#A89C8A`. Колонки: «Название», «Бонус атаки», «Урон / вид».

Стартовые три пустые строки. Та же сетка. Инпут: `min-width: 0`, высота 36px, `padding: 0 10px`, radius 6px, рамка `#3D362C`, фон `#302A22`, цвет `#EDE4D6`, `font: 400 14px Inter`. aria-label: «Атака {n} — название», «Атака {n} — бонус», «Атака {n} — урон». `n` с 1.

Кнопка «+ Добавить оружие или заговор»: `align-self: flex-start`, `min-height: 44px`, без фона и рамки, padding 0, цвет `#D9A35B`, `font: 500 14px Inter`. Клик добавляет четвёртую и следующие пустые строки. Удаления строки в макете нет — не добавлять.

Снаряжение. `fieldset` теми же отступами и рамкой, column, `gap: 12px`. Legend «Снаряжение».

Монеты: grid 5 колонок, `gap: 8px`. Подпись по центру, 12px, weight 600, `#A89C8A`. Инпут placeholder «0»: ширина 100%, `min-width: 0`, `box-sizing: border-box`, высота 36px, текст по центру, radius 6px, рамка `#3D362C`, фон `#302A22`, `font: 500 14px Inter`.

Порядок: ММ, СМ, ЭМ, ЗМ, ПМ.

Textarea снаряжения: `rows={8}`, `resize: vertical`, `padding: 10px 12px`, radius 8px, рамка `#3D362C`, фон `#302A22`, `font: 400 14px/20px Inter`. Placeholder: «Оружие, доспехи, рюкзак, припасы…». aria-label «Снаряжение».

### Правая колонка

Column, `gap: 20px`. Пять блоков. Каждый: `label`, column, `gap: 8px`, `padding: 16px`, radius 12px, фон `#26221C`, рамка `#3D362C`. Подпись 13px, weight 600, tracking `0.06em`, uppercase, `#A89C8A`. Textarea: `resize: vertical`, `padding: 10px 12px`, radius 8px, рамка `#3D362C`, фон `#302A22`, цвет `#EDE4D6`, `font: 400 14px/20px Inter`, без uppercase.

| Подпись | rows |
| --- | --- |
| Черты характера | 3 |
| Идеалы | 2 |
| Привязанности | 2 |
| Слабости | 2 |
| Умения и особенности | 18 |

Плейсхолдеров у этих textarea нет.

## Вкладка «Биография»

Та же сетка `minmax(340px, 1fr)`, `gap: 24px`, `align-items: start`.

Левая колонка, column, `gap: 16px`.

Кнопка «Загрузить портрет»: `aspect-ratio: 1 / 1`, radius 12px, `border: 1px dashed #3D362C`, фон `#26221C`, цвет `#A89C8A`, `font: 500 15px Inter`, column, по центру, `gap: 10px`. Иконка 32×32, `viewBox="0 0 24 24"`, fill none, stroke `#D9A35B`, `stroke-width="1.5"`:

```svg
<rect x="3" y="4" width="18" height="16" rx="2" />
<circle cx="9" cy="10" r="2" />
<path d="m21 17-5-5-9 8" />
```

Клик не открывает файловый диалог и не читает файл.

Под ней сетка 3 колонки, `gap: 12px`. Шесть полей: Возраст, Рост, Вес, Глаза, Кожа, Волосы. Подпись 12px, weight 500, `#A89C8A`. Инпут без placeholder: `min-width: 0`, высота 40px, `padding: 0 10px`, radius 8px, рамка `#3D362C`, фон `#302A22`, `font: 400 14px Inter`.

Правая зона: `grid-column: span 2`, column, `gap: 20px`, `min-width: 0`. На одной колонке сетки (`auto-fit` сложил всё в столбец) `span 2` не должен вылезать: если контейнер уже не тянет две колонки, у блока `grid-column: auto`. Проверка: при 1440px блок биографии занимает две доли, портрет — одну.

Пять textarea тем же стилем, что правая колонка «Основного»:

| Подпись | rows |
| --- | --- |
| Внешность | 4 |
| Предыстория персонажа | 8 |
| Союзники и организации | 4 |
| Дополнительные особенности | 4 |
| Сокровища | 3 |

## Вкладка «Заклинания»

Column, `gap: 24px`.

### Заклинательные характеристики

`fieldset`: margin 0, `padding: 20px`, radius 12px, фон `#26221C`, рамка `#3D362C`, grid `repeat(auto-fit, minmax(200px, 1fr))`, `gap: 16px`. Legend «Заклинательные характеристики»: `padding: 0 6px`, 13px, weight 600, tracking `0.06em`, uppercase, `#A89C8A`.

Четыре `label`: column, `gap: 6px`, подпись 12px / 16px, weight 500, `#A89C8A`.

1. «Характеристика». `select` (нативный, не кастомный список): высота 48px, `padding: 0 12px`, radius 8px, рамка `#3D362C`, фон `#302A22`, цвет `#EDE4D6`, `font: 500 15px Inter`. Варианты по порядку: Интеллект, Мудрость, Харизма. Старт — Интеллект, первый option.
2. «Заклинательный модификатор». Инпут placeholder «+3»: высота 48px, текст по центру, radius 8px, рамка `1px solid #D9A35B`, фон `#1C1915`, цвет `#D9A35B`, `font: 600 20px Inter`.
3. «Сложность спасброска». Placeholder «13»: высота 48px, по центру, radius 8px, рамка `#3D362C`, фон `#302A22`, цвет `#EDE4D6`, `font: 600 20px Inter`.
4. «Бонус атаки заклинанием». Placeholder «+5», те же размеры и цвета, что у сложности спасброска.

Значения не считать друг из друга.

### Ячейки заклинаний

`fieldset` теми же padding, radius, фоном и рамкой, column, `gap: 12px`. Legend «Ячейки заклинаний».

Пояснение: margin 0, 13px / 18px, `#A89C8A`. Текст: «Задайте количество ячеек кнопками − и +, отмечайте потраченные.»

Сетка: `repeat(auto-fit, minmax(112px, 1fr))`, `gap: 10px`. Девять уровней, подписи «1 уровень» … «9 уровень».

Стартовые количества: 4, 3, 2, 1, 0, 0, 0, 0, 0. Минимум 0, максимум 9. «−» и «+» меняют число. Ниже нуля и выше девяти не уходить.

Карточка уровня: `padding: 12px 10px`, radius 10px, фон `#302A22`, рамка `#3D362C`, column, `align-items: center`, `gap: 10px`.

Подпись уровня: 13px, weight 600, цвет `#D9A35B`.

Ряд: flex, `gap: 4px`. Кнопки 32×32, radius 6px, рамка `#3D362C`, фон `#26221C`, цвет `#EDE4D6`, `font: 600 16px Inter`. Текст кнопок «−» и «+». aria-label: «Убрать ячейку: {уровень}» и «Добавить ячейку: {уровень}». Между ними число: `min-width: 28px`, по центру, 18px, weight 600.

Под рядом чекбоксы потраченных ячеек: flex, wrap, `justify-content: center`, `gap: 6px`, `min-height: 18px`. Число чекбоксов равно текущему количеству. При нуле ряд пустой, но `min-height: 18px` остаётся. Чекбокс 18×18, `accent-color: #D9A35B`. aria-label: «{уровень}: ячейка {k} потрачена», `k` с 1. Состояние галочек неконтролируемое. Уменьшение числа убирает лишние чекбоксы с конца.

### Заклинания

`fieldset` теми же внешними стилями, column, `gap: 10px`, `min-width: 0`. Legend «Заклинания».

Обёртка `overflow-x: auto`. Внутри `min-width: 760px`, column, `gap: 8px`.

Шапка grid: `64px minmax(0, 2.2fr) minmax(0, 1.2fr) minmax(0, 1fr) 40px 40px 40px`, `gap: 8px`, `align-items: end`, 12px / 16px, weight 500, `#A89C8A`.

Колонки: «Уровень», «Название», «Время сотворения», «Дистанция», затем `abbr` без подчёркивания, по центру: «К» title «Концентрация», «Р» title «Ритуал», «М» title «Материальный компонент».

Строка — та же сетка, `align-items: center`. Инпут: ширина 100%, `min-width: 0`, `box-sizing: border-box`, высота 36px, `padding: 0 10px`, radius 6px, рамка `#3D362C`, фон `#302A22`, `font: 400 14px Inter`. Колонка уровня ещё `text-align: center`.

Чекбоксы К, Р, М: `justify-self: center`, 18×18, `accent-color: #D9A35B`.

Стартовые шесть строк. Пустые клетки остаются пустыми инпутами. Галочки — начальный `defaultChecked`, дальше неконтролируемые.

| Уровень | Название | Время | Дистанция | К | Р | М |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | Огненный снаряд | 1 действие | 120 фт | нет | нет | нет |
| 1 | Обнаружение магии | 1 действие | На себя | да | да | нет |
| 1 | Щит | 1 реакция | На себя | нет | нет | нет |
| 3 | Огненный шар | 1 действие | 150 фт | нет | нет | да |
| пусто | пусто | пусто | пусто | нет | нет | нет |
| пусто | пусто | пусто | пусто | нет | нет | нет |

Placeholder пустых: уровень «0», название «Название», время «1 действие», дистанция «30 фт». У заполненных строк placeholder тот же, value — из таблицы.

aria-label инпутов: «Уровень заклинания {n}», «Название заклинания {n}», «Время сотворения {n}», «Дистанция {n}», «Концентрация {n}», «Ритуал {n}», «Материальный компонент {n}». `n` с 1.

Под таблицей: margin 0, 12px / 16px, `#A89C8A`. Текст: «К — концентрация · Р — ритуал · М — материальный компонент. Уровень 0 — заговор.»

Кнопка «+ Добавить заклинание»: те же стили, что «добавить оружие». Клик добавляет пустую строку с теми же placeholder. Удаления нет.

### Заметки

`label`: column, `gap: 8px`, `padding: 20px`, radius 12px, фон `#26221C`, рамка `#3D362C`. Подпись «Заметки»: 13px, weight 600, tracking `0.06em`, uppercase, `#A89C8A`. Textarea `rows={6}`, `resize: vertical`, `padding: 10px 12px`, radius 8px, рамка `#3D362C`, фон `#302A22`, `font: 400 14px/20px Inter`, без uppercase. Placeholder: «Подготовленные заклинания на день, компоненты, условия…».

## Ключи локалей

Имена заклинаний и примеры в таблице — ключи. Английский перевод смысла, русский посимвольно как в таблицах выше.

| Ключ | ru | en |
| --- | --- | --- |
| `sheet.back` | ← Назад | ← Back |
| `sheet.new` | Новый персонаж | New character |
| `sheet.saveDraft` | Сохранить черновик | Save draft |
| `sheet.create` | Создать и сохранить | Create and save |
| `sheet.basics` | Основные данные | Basics |
| `sheet.name` | Имя персонажа | Character name |
| `sheet.namePh` | Как зовут героя? | What is the hero called? |
| `sheet.classLevel` | Класс и уровень | Class and level |
| `sheet.classLevelPh` | Воин 1 | Fighter 1 |
| `sheet.background` | Предыстория | Background |
| `sheet.backgroundPh` | Солдат | Soldier |
| `sheet.player` | Имя игрока | Player name |
| `sheet.ancestry` | Раса | Ancestry |
| `sheet.ancestryPh` | Человек | Human |
| `sheet.alignment` | Мировоззрение | Alignment |
| `sheet.alignmentPh` | Законно-доброе | Lawful good |
| `sheet.xp` | Опыт | Experience |
| `sheet.xpPh` | 0 | 0 |
| `sheet.tabs` | Разделы листа | Sheet sections |
| `sheet.tabMain` | Основное | Main |
| `sheet.tabBio` | Биография | Biography |
| `sheet.tabSpells` | Заклинания | Spells |
| `sheet.inspiration` | Вдохновение | Inspiration |
| `sheet.proficiency` | Бонус мастерства | Proficiency bonus |
| `sheet.plusZero` | +0 | +0 |
| `sheet.scorePh` | 10 | 10 |
| `sheet.score` | {{name}} — значение | {{name}} — score |
| `sheet.modifier` | {{name}} — модификатор | {{name}} — modifier |
| `sheet.save` | Спасбросок | Saving throw |
| `sheet.saveOf` | Спасбросок {{name}} | {{name}} saving throw |
| `sheet.skillValue` | {{name}} — значение | {{name}} — value |
| `sheet.passive` | Пассивная мудрость (внимательность) | Passive Wisdom (Perception) |
| `sheet.other` | Прочие владения и языки | Other proficiencies and languages |
| `sheet.otherPh` | Языки, доспехи, оружие, инструменты | Languages, armor, weapons, tools |
| `sheet.ac` | Класс доспеха | Armor class |
| `sheet.init` | Инициатива | Initiative |
| `sheet.speed` | Скорость | Speed |
| `sheet.speedPh` | 30 фт | 30 ft |
| `sheet.hp` | Хиты | Hit points |
| `sheet.hpMax` | Максимум | Maximum |
| `sheet.hpCur` | Текущие | Current |
| `sheet.hpTemp` | Временные | Temporary |
| `sheet.zero` | 0 | 0 |
| `sheet.hitDie` | Кость хитов | Hit die |
| `sheet.hitDiePh` | 1к8 | 1d8 |
| `sheet.death` | От смерти | Death saves |
| `sheet.successes` | Успехи | Successes |
| `sheet.failures` | Провалы | Failures |
| `sheet.successN` | Успех {{n}} | Success {{n}} |
| `sheet.failureN` | Провал {{n}} | Failure {{n}} |
| `sheet.attacks` | Оружие и боевые заговоры | Attacks and cantrips |
| `sheet.atkName` | Название | Name |
| `sheet.atkBonus` | Бонус атаки | Attack bonus |
| `sheet.atkDamage` | Урон / вид | Damage / type |
| `sheet.atkNameN` | Атака {{n}} — название | Attack {{n}} — name |
| `sheet.atkBonusN` | Атака {{n}} — бонус | Attack {{n}} — bonus |
| `sheet.atkDamageN` | Атака {{n}} — урон | Attack {{n}} — damage |
| `sheet.addAttack` | + Добавить оружие или заговор | + Add a weapon or cantrip |
| `sheet.gear` | Снаряжение | Equipment |
| `sheet.gearPh` | Оружие, доспехи, рюкзак, припасы… | Weapons, armor, pack, supplies… |
| `sheet.cp` | ММ | CP |
| `sheet.sp` | СМ | SP |
| `sheet.ep` | ЭМ | EP |
| `sheet.gp` | ЗМ | GP |
| `sheet.pp` | ПМ | PP |
| `sheet.traits` | Черты характера | Personality traits |
| `sheet.ideals` | Идеалы | Ideals |
| `sheet.bonds` | Привязанности | Bonds |
| `sheet.flaws` | Слабости | Flaws |
| `sheet.features` | Умения и особенности | Features and traits |
| `sheet.portrait` | Загрузить портрет | Upload a portrait |
| `sheet.age` | Возраст | Age |
| `sheet.height` | Рост | Height |
| `sheet.weight` | Вес | Weight |
| `sheet.eyes` | Глаза | Eyes |
| `sheet.skin` | Кожа | Skin |
| `sheet.hair` | Волосы | Hair |
| `sheet.looks` | Внешность | Appearance |
| `sheet.story` | Предыстория персонажа | Character backstory |
| `sheet.allies` | Союзники и организации | Allies and organizations |
| `sheet.extra` | Дополнительные особенности | Additional features |
| `sheet.treasure` | Сокровища | Treasure |
| `sheet.spellcasting` | Заклинательные характеристики | Spellcasting |
| `sheet.spellAbility` | Характеристика | Ability |
| `sheet.int` | Интеллект | Intelligence |
| `sheet.wis` | Мудрость | Wisdom |
| `sheet.cha` | Харизма | Charisma |
| `sheet.spellMod` | Заклинательный модификатор | Spellcasting modifier |
| `sheet.spellModPh` | +3 | +3 |
| `sheet.spellDc` | Сложность спасброска | Save DC |
| `sheet.spellDcPh` | 13 | 13 |
| `sheet.spellAttack` | Бонус атаки заклинанием | Spell attack bonus |
| `sheet.spellAttackPh` | +5 | +5 |
| `sheet.slots` | Ячейки заклинаний | Spell slots |
| `sheet.slotsHelp` | Задайте количество ячеек кнопками − и +, отмечайте потраченные. | Set the number of slots with − and +, and mark the spent ones. |
| `sheet.slotLevel` | {{n}} уровень | Level {{n}} |
| `sheet.slotDec` | Убрать ячейку: {{level}} | Remove a slot: {{level}} |
| `sheet.slotInc` | Добавить ячейку: {{level}} | Add a slot: {{level}} |
| `sheet.slotSpent` | {{level}}: ячейка {{n}} потрачена | {{level}}: slot {{n}} spent |
| `sheet.spellList` | Заклинания | Spells |
| `sheet.colLevel` | Уровень | Level |
| `sheet.colName` | Название | Name |
| `sheet.colTime` | Время сотворения | Casting time |
| `sheet.colRange` | Дистанция | Range |
| `sheet.abbrC` | К | C |
| `sheet.abbrR` | Р | R |
| `sheet.abbrM` | М | M |
| `sheet.conc` | Концентрация | Concentration |
| `sheet.ritual` | Ритуал | Ritual |
| `sheet.material` | Материальный компонент | Material component |
| `sheet.spellLevelN` | Уровень заклинания {{n}} | Spell {{n}} level |
| `sheet.spellNameN` | Название заклинания {{n}} | Spell {{n}} name |
| `sheet.spellTimeN` | Время сотворения {{n}} | Spell {{n}} casting time |
| `sheet.spellRangeN` | Дистанция {{n}} | Spell {{n}} range |
| `sheet.levelPh` | 0 | 0 |
| `sheet.nameSpellPh` | Название | Name |
| `sheet.timePh` | 1 действие | 1 action |
| `sheet.rangePh` | 30 фт | 30 ft |
| `sheet.legend` | К — концентрация · Р — ритуал · М — материальный компонент. Уровень 0 — заговор. | C — concentration · R — ritual · M — material. Level 0 is a cantrip. |
| `sheet.addSpell` | + Добавить заклинание | + Add a spell |
| `sheet.notes` | Заметки | Notes |
| `sheet.notesPh` | Подготовленные заклинания на день, компоненты, условия… | Spells prepared for the day, components, conditions… |
| `sheet.str` | Сила | Strength |
| `sheet.strCode` | СИЛ | STR |
| `sheet.dex` | Ловкость | Dexterity |
| `sheet.dexCode` | ЛОВ | DEX |
| `sheet.con` | Телосложение | Constitution |
| `sheet.conCode` | ТЕЛ | CON |
| `sheet.intFull` | Интеллект | Intelligence |
| `sheet.intCode` | ИНТ | INT |
| `sheet.wisFull` | Мудрость | Wisdom |
| `sheet.wisCode` | МДР | WIS |
| `sheet.chaFull` | Харизма | Charisma |
| `sheet.chaCode` | ХАР | CHA |
| `sheet.athletics` | Атлетика | Athletics |
| `sheet.acrobatics` | Акробатика | Acrobatics |
| `sheet.sleight` | Ловкость рук | Sleight of Hand |
| `sheet.stealth` | Скрытность | Stealth |
| `sheet.investigation` | Анализ | Investigation |
| `sheet.history` | История | History |
| `sheet.arcana` | Магия | Arcana |
| `sheet.nature` | Природа | Nature |
| `sheet.religion` | Религия | Religion |
| `sheet.perception` | Внимательность | Perception |
| `sheet.survival` | Выживание | Survival |
| `sheet.medicine` | Медицина | Medicine |
| `sheet.insight` | Проницательность | Insight |
| `sheet.animals` | Уход за животными | Animal Handling |
| `sheet.performance` | Выступление | Performance |
| `sheet.intimidation` | Запугивание | Intimidation |
| `sheet.deception` | Обман | Deception |
| `sheet.persuasion` | Убеждение | Persuasion |
| `sheet.fireBolt` | Огненный снаряд | Fire Bolt |
| `sheet.detectMagic` | Обнаружение магии | Detect Magic |
| `sheet.shieldSpell` | Щит | Shield |
| `sheet.fireball` | Огненный шар | Fireball |
| `sheet.oneAction` | 1 действие | 1 action |
| `sheet.oneReaction` | 1 реакция | 1 reaction |
| `sheet.ft120` | 120 фт | 120 ft |
| `sheet.ft150` | 150 фт | 150 ft |
| `sheet.self` | На себя | Self |

Коды СИЛ, ЛОВ, ТЕЛ, ИНТ, МДР, ХАР на русском экране именно такие, капсом, без точек.

## Чего не делать

- Не считать модификатор, бонус атаки, КД, пассивную внимательность и сложность спасброска.
- Не открывать диалог файла на портрете.
- Не писать лист в storage и не показывать тост по кнопкам шапки.
- Не заменять `/player` этим экраном.
- Не ставить шапку «Свиток» и сайдбар мастерской.
- Не прятать вкладки размонтированием: ввод на «Основном» должен остаться после захода в «Биографию» и обратно.
- Не добавлять удаление строк оружия и заклинаний.
- Не запускать предзаполненные цифры `4` и `7` — их на этом экране нет. Они были только в превью входа.

## Приёмка

При 1440px, язык ru, вкладка «Основное»:

- Липкая шапка: «← Назад», «Новый персонаж» 28px, «Сохранить черновик», золотая «Создать и сохранить». Обе кнопки не уводят со страницы и не пишут в storage.
- «← Назад» с главной возвращает на `/`. Прямой заход на `/character` по «Назад» тоже ведёт на `/`.
- Блок имени высотой 64px шрифтом Cormorant и шесть коротких полей.
- Вкладки, под «Основное» золотая линия 2px.
- Шесть характеристик в порядке Сила → Харизма, у каждой значение, золотая пилюля модификатора, спасбросок и навыки из таблицы. У Телосложения навыков нет.
- Три плитки КД / инициатива / скорость, хиты с золотой рамкой у «Текущие», кость хитов, успехи зелёным accent и провалы красным.
- Три пустые строки оружия, «+» добавляет четвёртую.
- Пять монет ММ СМ ЭМ ЗМ ПМ и textarea снаряжения.
- Справа пять блоков, у «Умения и особенности» 18 строк.
- «Биография»: квадрат портрета, шесть полей внешности, пять textarea. Портрет не открывает файл.
- «Заклинания»: select из трёх характеристик, золотой модификатор, ячейки 4 3 2 1 0 0 0 0 0, «+» на 1 уровне делает 5 чекбоксов и не превышает 9, «−» с нуля остаётся 0.
- В таблице шесть строк, у «Обнаружение магии» включены К и Р, у «Огненный шар» включено М. «+ Добавить заклинание» добавляет пустую строку.
- После ввода имени переход на «Биографию» и обратно имя на месте.
- Узкое окно не даёт горизонтальный скролл страницы. Таблица заклинаний скроллится внутри.

Проверка: `npm run build:check`. Показать вывод. `docs/` вне ветки `develop` убрать `npm run clean`.
