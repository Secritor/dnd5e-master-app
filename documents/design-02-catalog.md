# Экран «Каталог кампаний» — спецификация для реализации

Артборд макета: **Каталог кампаний**, 1440×1900. Роут: `/company`. Слайс: `src/pages/company`.

Эта спецификация самодостаточна. Не открывать остальные `design-*.md`. Общая оболочка и токены описаны здесь ещё раз: если их уже сделали по главной и они совпадают — не дублировать файлы, только использовать.

## Контракт идентичности

При ширине 1440px покоящийся экран совпадает с макетом по палитре, шрифтам, размерам, отступам, радиусам, сетке, порядку блоков и русскому тексту.

Ниже 1440px только `flex-wrap` и `repeat(auto-fill, minmax(320px, 1fr))`. Отдельный мобильный макет не придумывать. Горизонтального скролла страницы нет. Горизонтальный скролл есть только у выпадающего списка, если он не влезает по высоте: у списка `max-height: 320px; overflow-y: auto`.

`min-height: 1900px` артборда на страницу не ставить. Фон документа `#1C1915`.

Ховер ссылок: цвет покоя, заданный блоку, при наведении становится `#E6B676`. Других ховеров макет не задаёт. `:focus-visible` — `outline: 2px solid #D9A35B; outline-offset: 2px`.

## Стек и границы

- CSS Modules. Значения копировать, не подменять старыми oklch-токенами.
- Строки в `ru.ts` и `en.ts`. В JSX только `t(...)`.
- Страница не импортирует другие страницы. Слой `widgets` не создавать.
- Примитивы — из `@/shared/ui`. Если кнопок с размерами ниже нет, добавить варианты, не перекрашивая старые `primary | secondary | outline | ghost | danger`:
  - `accent` — фон `#D9A35B`, текст `#1C1915`, высота 48px, radius 8px, weight 600.
  - `quiet` — прозрачный фон, рамка `1px solid #3D362C`, текст `#EDE4D6`, высота 48px, radius 8px, weight 500.
- Фильтры каталога — это ряд своих кнопок, не вариант `accent`/`quiet`. Их размеры ниже.
- `documents/Design System.md` не менять. Старые CSS-переменные не удалять.

## Токены

Если блока ещё нет в `src/app/styles/tokens.css`, добавить, не затирая `--background` и остальные старые имена:

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

В `index.html` шрифты, если ещё Montserrat:

`https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap`

`<html class="dark">` не трогать.

Для этого экрана: фон `#1C1915`, текст `#EDE4D6`, Inter 16px / 24px, ссылки `#D9A35B` без подчёркивания, ховер `#E6B676`, плейсхолдер инпута `#A89C8A`.

## Куда класть код

Оболочка `/` и `/company`: `src/app/public-layout.tsx` и `public-layout.module.css`. Если файл уже есть и шапка совпадает с блоком ниже — не переписывать.

Страница каталога рисует только `main` и не повторяет шапку. Подвал каталога отличается от подвала главной и живёт в слайсе страницы, не в layout. Layout на `/company` рисует шапку и не рисует подвал. На `/` подвал рисует страница главной. Чтобы layout не путал подвалы: layout содержит только шапку. Подвал каждой страницы — в самой странице.

`AppShell` не рисует фиксированный `LanguageSwitcher` на `/company`. Переключатель стоит в шапке.

Данные: модель, массив, fetch и query-ключ официальных кампаний — в `entities/campaign` (публичный `index.ts`). Если перенос уже сделан — использовать его. Фильтры и поиск остаются в `pages/company` (`campaign-filters-store` или замена его полей под новый набор фильтров). Старые фильтры по настроению и min/max уровню с экрана убрать: в макете их нет. Стор настроения не показывать.

Новый слайс или layout — обновить `documents/project-structure.md`.

## Публичная шапка

`header`: фон `#1C1915`, `border-bottom: 1px solid #3D362C`.

Ряд: `max-width: 1200px`, `margin: 0 auto`, `padding: 0 24px`, `min-height: 72px`, flex, wrap, `align-items: center`, `justify-content: space-between`, `gap: 16px`.

Логотип-ссылка на `/`: flex, `gap: 12px`, цвет `#EDE4D6`. Иконка 28×28, `viewBox="0 0 28 28"`, fill none, stroke `#D9A35B`, `stroke-width="1.5"`, `aria-hidden`:

```svg
<path d="M14 2 25 8.5v11L14 26 3 19.5v-11z" />
<path d="M14 7 20 18H8z" />
<path d="M14 2v5M25 8.5 20 18M3 8.5 8 18M14 26l-6-8M14 26l6-8" />
```

Слово **Свиток**: Cormorant Garamond, 700, 24px, `letter-spacing: 0.02em`.

`nav`, aria-label «Основная навигация»: flex, wrap, `gap: 32px`, 15px, weight 500.

- Персонаж → `/character`, цвет `#EDE4D6`
- Кампании → `/company`, `aria-current="page"`, цвет `#D9A35B` (это текущий пункт)
- Мастер: flex, `gap: 6px`, цвет `#EDE4D6`. Замок 14×14, `viewBox="0 0 16 16"`, stroke `#A89C8A`, `stroke-width="1.5"`:

```svg
<rect x="3" y="7" width="10" height="7" rx="1.5" />
<path d="M5 7V5a3 3 0 0 1 6 0v2" />
```

Перед кнопкой входа — `LanguageSwitcher` `placement="inline"`, текст `#A89C8A`, 15px, не fixed.

Кнопка: высота 40px, `padding: 0 20px`, radius 8px, рамка `1px solid #3D362C`, текст `#EDE4D6`, weight 500, 15px.

Без сессии «Мастер» и «Войти» открывают `MasterAuthModal` (шаг почты). С сессией оба ведут на `/master`, подпись кнопки — «Мастерская», размеры кнопки те же.

## Main

`main`: `max-width: 1200px`, `margin: 0 auto`, `padding: 56px 24px 96px`, column, `gap: 32px`.

Заголовок, column, `gap: 8px`:

- `h1` «Кампании»: margin 0, Cormorant Garamond, weight 600, 56px / 64px, цвет `#EDE4D6`
- подпись «Официальные приключения и кампании, созданные сообществом»: margin 0, `#A89C8A`, 18px / 28px

### Вкладки

`div role="tablist"`, aria-label «Источник кампаний»: flex, wrap, `gap: 4px`, `border-bottom: 1px solid #3D362C`.

Три вкладки: «Все», «Официальные», «Сообщество». `role="tab"`.

Активная: высота 48px, `padding: 0 20px`, фон прозрачный, border none, `border-bottom: 2px solid #D9A35B`, `margin-bottom: -1px`, цвет `#EDE4D6`, `font: 600 15px Inter`, `aria-selected="true"`.

Неактивная: то же, но `border-bottom-color: transparent`, цвет `#A89C8A`, weight 500, `aria-selected="false"`.

Стартовая вкладка — «Все». Одна активна. Клик меняет вкладку и сбрасывает порцию «Показать ещё» к первым 6.

Все текущие записи — официальные. Вкладка «Сообщество» даёт пустой список и пустое состояние. Вкладку не прятать.

### Поиск

Блок фильтров: column, `gap: 16px`.

Поле поиска — `label` на всю ширину. Видимой подписи нет. Скрытый текст для доступности: «Поиск по названию» (`position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)`).

Иконка лупы: `position: absolute; left: 16px; top: 14px`, 20×20, `viewBox="0 0 20 20"`, stroke `#A89C8A`, `stroke-width="1.75"`:

```svg
<circle cx="9" cy="9" r="6" />
<path d="m13.5 13.5 4 4" />
```

`input type="search"`: ширина 100%, `box-sizing: border-box`, высота 48px, `padding: 0 16px 0 48px`, radius 8px, рамка `1px solid #3D362C`, фон `#302A22`, цвет `#EDE4D6`, `font: 400 16px Inter`. Placeholder: «Найти кампанию».

Поиск в макете нарисован, но в скрипте макета не фильтрует. Здесь он фильтрует: подстрока без учёта регистра в `cardTitle` и `description`. Иначе строка «Найдено» и пустое состояние врут. Сброс фильтров поиск не очищает (так в скрипте макета). Отдельная кнопка очистки поля не нужна.

### Ряд фильтров

Ряд: flex, wrap, `align-items: center`, `justify-content: space-between`, `gap: 12px`.

Слева группа: flex, wrap, `gap: 8px`.

**Популярные.** Высота 40px, `padding: 0 14px`, radius 999px, inline-flex, `gap: 8px`. Стартовое состояние — выключено.

Выключено: рамка `#3D362C`, фон `#26221C`, текст `#EDE4D6`, weight 500, 14px, `aria-pressed="false"`. Звезда `fill="none"`, stroke `#A89C8A`.

Включено: рамка `#D9A35B`, фон `#3A3022`, текст `#EDE4D6`, weight 600, `aria-pressed="true"`. Звезда `fill="#D9A35B"` и stroke `#D9A35B`.

Звезда 16×16, `viewBox="0 0 16 16"`, `stroke-width="1.25"`, `stroke-linejoin="round"`:

```svg
<path d="M8 1.5l1.9 4 4.3.5-3.2 3 .9 4.3L8 11.2l-3.9 2.1.9-4.3-3.2-3 4.3-.5z" />
```

Клик переключает сортировку. Включено — карточки по убыванию звёзд (локальный счётчик, см. ниже). Выключено — исходный порядок массива.

Разделитель: `width: 1px; height: 24px; background: #3D362C; align-self: center; margin: 0 4px`.

**Три выпадающих списка**, слева направо:

1. «Игроки». Варианты: `1`, `2`, `3`, `4`, `5`, `6`, `Больше 6`.
2. «Рекомендуемый уровень». `1` … `12`, затем «Больше 12».
3. «Время». `60 мин`, `80 мин`, `120 мин`, `5 ч`, `10 ч`, `20 ч`, `40 ч`, `80 ч`, `Больше 80 ч`.

Кнопка закрытого и невыбранного списка: высота 40px, `padding: 0 14px`, radius 999px, рамка `#3D362C`, фон `#26221C`, текст `#EDE4D6`, weight 500, 14px, inline-flex, `gap: 8px`, `aria-haspopup="listbox"`, `aria-expanded="false"`. Текст — только название фильтра. Шеврон 12×12, `viewBox="0 0 12 12"`, stroke `#A89C8A`, `stroke-width="1.5"`: `<path d="m3 4.5 3 3 3-3" />`.

Выбранный: рамка `#D9A35B`, фон `#3A3022`, weight 600, шеврон stroke `#D9A35B`. Подпись: «{название}: {значение}». Для времени, кроме «Больше 80 ч», перед значением префикс «до »: «Время: до 5 ч». Для «Больше 80 ч» префикса нет: «Время: Больше 80 ч».

Открыт только один список. Повторный клик по кнопке закрывает. Выбор пункта закрывает список. Повторный выбор уже выбранного пункта снимает значение (`null`) и закрывает список.

Панель: `position: absolute; top: 48px; left: 0; z-index: 5; min-width: 200px; max-height: 320px; overflow-y: auto; box-sizing: border-box; padding: 6px; border-radius: 10px; background: #302A22; border: 1px solid #3D362C`, column, `gap: 2px`, `role="listbox"`.

Пункт не выбран: `min-height: 40px`, `padding: 0 12px`, radius 6px, без рамки, фон прозрачный, цвет `#EDE4D6`, `font: 400 14px Inter`, текст слева, `role="option"`, `aria-selected="false"`.

Пункт выбран: фон `#3A3022`, цвет `#D9A35B`, weight 600, справа галочка 14×14, `viewBox="0 0 20 20"`, stroke `#D9A35B`, `stroke-width="2"`: `<path d="M4 10.5 8 14.5 16 6" />`.

Клик снаружи список не закрывает: в макете этого нет. Закрытие — повторный клик по кнопке, выбор пункта, «Сбросить».

Поля игроков и часов в `OfficialCampaign` нет.

- Фильтр «Игроки» рисуется и выбирается, но записи не отсекает. Иначе каталог опустеет при любом выборе.
- Фильтр «Время» так же не отсекает записи.
- Фильтр уровня отсекает. Рекомендуемый уровень записи — `playerLevelCount[0]`. Совпадение: выбранное число равно этому уровню. «Больше 12» оставляет записи с уровнем больше 12. Снятый фильтр (`null`) не режет.

Когда в данных появятся `playersMin`, `playersMax` и `hours`, включить правила макета, не меняя вёрстку:

- игроки: значение 1–6 попадает в `[playersMin, playersMax]`; «Больше 6» оставляет `playersMax > 6`
- время хранится в минутах порога: 60, 80, 120, 300, 600, 1200, 2400, 4800. Запись проходит, если `hours * 60 <= порог`. «Больше 80 ч» оставляет `hours > 80`

Второй разделитель — такой же штрих 1×24.

**Сложность**, три кнопки: «Легко», «Нормально», «Сложно». Одна или ни одной. Повторный клик по активной снимает фильтр.

Выключена: высота 40px, `padding: 0 14px`, radius 999px, рамка `#3D362C`, фон `#26221C`, текст `#A89C8A`, weight 500, 14px, `aria-pressed="false"`.

Включена: рамка `#D9A35B`, фон `#3A3022`, текст `#EDE4D6`, weight 600, `aria-pressed="true"`.

Сложность записи — та же функция, что на главной, только для отображения и этого фильтра. Первое совпадение:

- легко: настроение содержит «Для новичков» или «Немного экшена», либо `playerLevelCount[1] <= 5`
- сложно: настроение содержит «Опасное», «Хоррор» или «Жуткая», либо `playerLevelCount[1] >= 15`
- иначе нормально

Справа в ряду: «Сбросить», `background: transparent; border: none; color: #D9A35B; font: 500 14px Inter; padding: 8px 0`. Сбрасывает вкладку на «Все», сложность, три списка, флаг «Популярные» и открытый список. Поиск не очищает. Порцию «Показать ещё» возвращает к 6.

### Счётчик

«Найдено: {n}»: margin 0, 14px / 20px, цвет `#A89C8A`. `n` — число записей после фильтров, до усечения «Показать ещё».

### Пусто

Если `n = 0`, сетку не рисовать. Блок: `padding: 64px 24px`, radius 12px, `border: 1px dashed #3D362C`, column, `align-items: center`, `gap: 16px`, `text-align: center`.

- «Ничего не найдено»: 20px / 28px, weight 600, цвет `#EDE4D6`
- «Попробуйте изменить фильтры или поисковый запрос»: цвет `#A89C8A`
- кнопка «Сбросить фильтры»: высота 44px, `padding: 0 24px`, radius 8px, рамка `#3D362C`, фон прозрачный, цвет `#EDE4D6`, `font: 500 15px Inter`. Действие то же, что «Сбросить», и ещё очищает поиск.

Кнопку «Показать ещё» при пустом списке не показывать.

### Сетка карточек

`repeat(auto-fill, minmax(320px, 1fr))`, `gap: 24px`.

Показать первые 6 отфильтрованных. Если записей больше 6 — под сеткой по центру, `padding-top: 16px`, кнопка «Показать ещё»: высота 48px, `padding: 0 32px`, radius 8px, рамка `#3D362C`, фон прозрачный, цвет `#EDE4D6`, `font: 500 16px Inter`. Клик добавляет ещё 6. Когда показаны все — кнопку убрать.

Загрузка: 6 скелетонов той же геометрии (обложка 16/9 `#302A22`, тело `#26221C`, radius 12, рамка `#3D362C`). Ошибка: существующий текст `campaignBoard.loadError` и повтор запроса. Фильтры при ошибке остаются на экране.

### Карточка

`article`: column, radius 12px, фон `#26221C`, рамка `1px solid #3D362C`, `overflow: hidden`, цвет `#EDE4D6`.

Обложка: relative, `aspect-ratio: 16 / 9`, фон `#302A22`, flex по центру.

Картинка `thumbnailImage` на весь блок, `object-fit: cover`, `alt=""`. Если пути нет — SVG 120×64, stroke `#5A5043`, `stroke-width="1.5"`, `viewBox="0 0 120 64"`:

```svg
<path d="M2 62 38 18l20 24 16-14 44 34z" />
<circle cx="92" cy="14" r="8" />
```

Подпись «Обложка кампании» только без картинки: absolute, `bottom: 12px`, `right: 12px`, 12px / 16px, `#A89C8A`.

Звезда поверх обложки: `position: absolute; top: 8px; right: 8px`, высота 36px, `padding: 0 12px`, radius 999px, inline-flex, `gap: 6px`. Та же геометрия звезды, что у фильтра «Популярные».

Не нажата: рамка `#3D362C`, фон `#1C1915`, текст `#EDE4D6`, weight 500, 13px, `aria-pressed="false"`, `aria-label` «Поставить звезду». Звезда контуром, stroke `#A89C8A`.

Нажата: рамка `#D9A35B`, текст `#D9A35B`, weight 600, `aria-pressed="true"`, `aria-label` «Убрать звезду». Звезда залита `#D9A35B`.

Число рядом со звездой — локальный счётчик. У всех записей старт 0. Клик прибавляет или убирает 1 только в состоянии экрана, без `localStorage` и без записи в массив кампаний. Формат `ru-RU` (`toLocaleString('ru-RU')`). Клик по звезде не ведёт на другую страницу.

Бейдж слева сверху, `top: 12px`, `left: 12px`, 12px / 16px, weight 600, `padding: 4px 10px`, radius 999px, фон `#1C1915`. Для текущих данных всегда «Официальная»: рамка и текст `#D9A35B`. «Сообщество» (рамка и текст `#C47A4E`) не показывать, пока нет таких записей. Оба бейджа сразу не ставить.

Тело: column, `gap: 12px`, `padding: 24px`, `flex-grow: 1`.

Название: 20px / 28px, weight 600, цвет `#EDE4D6`. Это текст, не ссылка. Страницы кампании нет.

Источник: 14px / 20px, `#A89C8A`, всегда «5-е издание».

Описание: 15px / 22px, `#A89C8A`, три строки через `-webkit-line-clamp: 3`.

Чипы: flex, wrap, `gap: 8px`, `margin-top: auto`, `padding-top: 8px`, 13px / 18px.

Обычный чип: inline-flex, `gap: 6px`, `padding: 4px 10px`, radius 6px, фон `#302A22`, текст `#EDE4D6`.

1. Игроки, иконка 14×14, `viewBox="0 0 16 16"`, stroke `#A89C8A`, `stroke-width="1.5"`:

```svg
<circle cx="6" cy="5" r="2.5" />
<path d="M1.5 14c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" />
<path d="M11 3a2.5 2.5 0 0 1 0 5M13 9.8c1 .7 1.5 2 1.5 4.2" />
```

Текст всегда «4–6 игроков».

2. «Рек. ур. {playerLevelCount[0]}» без иконки.

3. Один чип сложности по функции выше. Легко: фон `#2C3024`, текст `#8FA876`. Нормально: фон `#3A3022`, текст `#D9A35B`. Сложно: фон `#3A2620`, текст `#D27560`. Weight 500.

4. Время, иконка часов 14×14:

```svg
<circle cx="8" cy="8" r="6.5" />
<path d="M8 4.5V8l2.5 1.5" />
```

Текст «—». Чип не скрывать.

## Подвал каталога

Не путать с подвалом главной. Здесь есть верхняя граница и нет слова «Свиток».

`footer`: `border-top: 1px solid #3D362C`.

Внутри: `max-width: 1200px`, `margin: 0 auto`, `padding: 40px 24px 48px`, flex, wrap, `justify-content: space-between`, `gap: 24px`, 14px / 20px, цвет `#A89C8A`.

Слева: «Фанатский проект. Dungeons & Dragons — товарный знак Wizards of the Coast.»

Справа `nav`, aria-label «Ссылки в подвале», `gap: 24px`, ссылки `#A89C8A`: Персонаж → `/character`, Кампании → `/company`, Мастер — как пункт шапки. Пункта «[Контакты]» в подвале каталога нет.

## Ключи локалей

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
| `catalog.title` | Кампании | Campaigns |
| `catalog.lead` | Официальные приключения и кампании, созданные сообществом | Official adventures and campaigns made by the community |
| `catalog.tabs` | Источник кампаний | Campaign source |
| `catalog.tabAll` | Все | All |
| `catalog.tabOfficial` | Официальные | Official |
| `catalog.tabCommunity` | Сообщество | Community |
| `catalog.searchLabel` | Поиск по названию | Search by title |
| `catalog.searchPlaceholder` | Найти кампанию | Find a campaign |
| `catalog.popular` | Популярные | Popular |
| `catalog.players` | Игроки | Players |
| `catalog.levelFilter` | Рекомендуемый уровень | Recommended level |
| `catalog.timeFilter` | Время | Time |
| `catalog.moreThan6` | Больше 6 | More than 6 |
| `catalog.moreThan12` | Больше 12 | More than 12 |
| `catalog.time60` | 60 мин | 60 min |
| `catalog.time80` | 80 мин | 80 min |
| `catalog.time120` | 120 мин | 120 min |
| `catalog.time5h` | 5 ч | 5 h |
| `catalog.time10h` | 10 ч | 10 h |
| `catalog.time20h` | 20 ч | 20 h |
| `catalog.time40h` | 40 ч | 40 h |
| `catalog.time80h` | 80 ч | 80 h |
| `catalog.timeOver80` | Больше 80 ч | More than 80 h |
| `catalog.timePrefix` | до {{value}} | up to {{value}} |
| `catalog.reset` | Сбросить | Reset |
| `catalog.found` | Найдено: {{count}} | Found: {{count}} |
| `catalog.emptyTitle` | Ничего не найдено | Nothing found |
| `catalog.emptyText` | Попробуйте изменить фильтры или поисковый запрос | Try different filters or another search |
| `catalog.resetFilters` | Сбросить фильтры | Reset filters |
| `catalog.showMore` | Показать ещё | Show more |
| `catalog.coverPlaceholder` | Обложка кампании | Campaign cover |
| `catalog.star` | Поставить звезду | Star |
| `catalog.unstar` | Убрать звезду | Remove star |
| `catalog.official` | Официальная | Official |
| `catalog.community` | Сообщество | Community |
| `catalog.edition` | 5-е издание | 5th edition |
| `catalog.playersFallback` | 4–6 игроков | 4–6 players |
| `catalog.level` | Рек. ур. {{level}} | Rec. lvl {{level}} |
| `catalog.easy` | Легко | Easy |
| `catalog.normal` | Нормально | Normal |
| `catalog.hard` | Сложно | Hard |
| `catalog.timeUnknown` | — | — |

Если ключ `chrome.*` уже добавлен главной — не плодить второй.

Старый заголовок экрана «DnD: Официальные компании» этим экраном не показывать.

## Чего не делать

- Не оставлять фильтр настроения, диапазон уровней двумя полями и старую сетку карточек.
- Не выдумывать кампании сообщества и не показывать строки «[Название кампании]» / «@[автор]».
- Не писать звёзды в `localStorage`.
- Не делать страницу одной кампании.
- Не отсекать каталог фильтрами «Игроки» и «Время», пока в данных нет этих полей.

## Приёмка

При 1440px, язык ru:

- Шапка как на главной, пункт «Кампании» золотой и `aria-current="page"`.
- Заголовок 56px и подзаголовок.
- Вкладки «Все / Официальные / Сообщество», под активной золотая линия 2px.
- Поиск высотой 48px с лупой.
- Пилюли: Популярные, три списка, Легко / Нормально / Сложно, справа «Сбросить».
- «Найдено» равно числу отфильтрованных, не числу показанных карточек.
- Карточки: обложка, звезда с числом, бейдж «Официальная», название, «5-е издание», три строки описания, четыре чипа.
- «Показать ещё» добавляет 6, пока записи есть.
- «Сообщество» показывает пустое состояние, не пустую страницу без текста.
- «Сбросить» возвращает «Все» и снимает пилюли, текст поиска остаётся.
- Выбор уровня прячет кампании с другим `playerLevelCount[0]`.
- Выбор «Игроки» или «Время» список не опустошает.

Проверка: `npm run build:check`. Показать вывод. `docs/` вне ветки `develop` убрать через `npm run clean`.
