# Структура проекта `dnd-game-tool`

> Навигационная карта репозитория: где что лежит, как связано и куда идти, чтобы что-то поменять.
> Обновлять при изменении слоёв, роутов, стора или UI-кита (правило зафиксировано в [../CLAUDE.md](../CLAUDE.md)).

---

## 1. Что это

SPA-инструмент для D&D (пространство мастера, просмотр официальных кампаний, архивы заклинаний/NPC, режим игрока).
Бэкенда нет — все данные mock-овые (статические массивы + искусственная задержка). Деплой — статика на GitHub Pages.

**Стек:**

| Область      | Технология                                                    |
| ------------ | ------------------------------------------------------------- |
| UI           | React 19, TypeScript 5.9 (strict)                             |
| Сборка       | Vite 7 (`@vitejs/plugin-react`)                               |
| Архитектура  | Feature-Sliced Design (FSD v2.1), линтер — Steiger            |
| Роутинг      | `react-router-dom` 7, **hash-роутер** (`createHashRouter`)    |
| Server state | TanStack Query 5                                              |
| Таблицы      | TanStack Table 8                                              |
| Client state | Zustand 5 (+ `persist` для кампаний мастера)                  |
| Формы        | react-hook-form 7 + `@hookform/resolvers` + Zod 3             |
| i18n         | i18next + react-i18next (`ru` дефолт, `en` fallback)          |
| UI-кит       | Свой, в `shared/ui`; поведение/a11y — `react-aria-components` |
| Стили        | Только CSS Modules + CSS-переменные (`app/styles/tokens.css`) |
| Прочее       | `@vercel/speed-insights`, `react-error-boundary`, `clsx`      |

---

## 2. Слои FSD

Направление импортов — только вниз: `app → pages → (widgets) → (features) → (entities) → shared`.

```
app/        инициализация, провайдеры, роутер, глобальные стили, тема
pages/      экраны по роутам, вся композиция и логика экрана
features/   переиспользуемые пользовательские действия — сейчас 2: master-auth, language-switcher
widgets/    НЕ используется
entities/   campaign — официальные кампании: модель, mock-массив, fetch, query-ключ
shared/     инфраструктура: UI-кит, утилиты, конфиг (i18n), без бизнес-логики
```

Правила:

- Внешние импорты слайса — только через его `index.ts` (public API).
- `shared/` организован по сегментам: `shared/ui/index.ts`, `shared/lib/index.ts`, `shared/config/index.ts`.
- Исключение в `steiger.config.ts`: для `src/app/**` отключено правило `fsd/segments-by-purpose` (разрешён сегмент `providers/`).
- Проверка: `npm run lint:fsd`.

---

## 3. Дерево файлов

```
dnd-game-tool/
├── index.html                     точка входа Vite; <html class="dark"> (тема жёстко тёмная),
│                                   шрифты Cormorant Garamond и Inter (Google Fonts)
├── vite.config.ts                 alias @ → src; base './'; build.outDir = 'docs'  (см. §9)
├── tsconfig.json / .app.json / .node.json   project references; paths @/* → ./src/*
├── eslint.config.js               js + typescript-eslint + react-hooks@7 + jsx-a11y + simple-import-sort + @stylistic (пустые строки) + eslint-config-prettier
├── steiger.config.ts              FSD-линтер: recommended + послабление для app/**
├── components.json                конфиг shadcn — ЛЕГАСИ (shadcn удалён, файл не используется)
├── .prettierrc / .prettierignore  singleQuote, semi, printWidth 100, trailingComma es5, endOfLine lf
├── .gitattributes                 eol=lf для всех текстовых файлов
├── .mcp.json                      MCP-серверы: playwright, browser-tools, context7
├── .github/workflows/deploy.yml   GitHub Pages: push в main → npm ci → npm run build → publish ./dist
├── public/
│   ├── compaign-images/*.{webp,jpg,jpeg,png}   обложки официальных кампаний (см. §7)
│   └── vite.svg
├── dist/                          УСТАРЕВШИЙ билд (от прошлой структуры, до FSD-рефакторинга); в .gitignore
├── documents/                     ← эта папка (проектная документация)
│
└── src/
    ├── vite-env.d.ts
    │
    ├── app/                       ─────────── слой APP ───────────
    │   ├── main.tsx               createRoot + <StrictMode><App/></StrictMode>; import './styles/index.css'
    │   ├── App.tsx                <AppProviders> → <ScrollArea> [ <RouterProvider/> ] + <SpeedInsights/>
    │   ├── App.module.css         .root { height: 100% }
    │   ├── public-layout.tsx      шапка и подвал для `/` и `/company` (логотип, навигация, вход, язык)
    │   ├── public-layout.module.css
    │   ├── router.tsx             createHashRouter; публичная оболочка только на `/` и `/company`
    │   ├── router.module.css      стили .loader / .loaderText
    │   ├── route-error.tsx        RouteError — фолбэк ErrorBoundary (кнопка «перезагрузить»)
    │   ├── route-error.module.css
    │   ├── providers/
    │   │   ├── app-providers.tsx  I18nextProvider → QueryProvider
    │   │   └── query-provider.tsx QueryClient (staleTime 60s, retry 1)
    │   └── styles/
    │       ├── index.css          точка входа: @import tokens.css + base.css
    │       ├── tokens.css         дизайн-токены: палитра D&D (золото/эмбер) + алиасы (--primary, --card, …),
    │       │                      типографика, отступы, радиусы, тени, длительности
    │       └── base.css           reset (замена Tailwind preflight) + стили html/body/#root, :focus-visible
    │
    ├── pages/                     ─────────── слой PAGES ───────────
    │   ├── mode-select/           «/» — главная «Свиток»: герой, «С чего начать», превью кампаний, мастерская
    │   │   ├── index.ts
    │   │   ├── lib/campaign-difficulty.ts   лёгко / нормально / сложно только для чипа на карточке
    │   │   └── ui/
    │   │       ├── mode-select-page.tsx
    │   │       ├── home-hero.tsx
    │   │       ├── home-paths.tsx
    │   │       ├── home-campaigns.tsx
    │   │       ├── home-campaign-card.tsx
    │   │       └── home-workshop.tsx
    │   │
    │   ├── master-home/           «/master» — пространство мастера
    │   │   ├── index.ts
    │   │   ├── model/master-campaign-store.ts   Zustand + persist('dnd-campaign-store'),
    │   │   │                                    persist только campaigns; addCampaign / selectCampaign
    │   │   └── ui/
    │   │       ├── master-home-page.{tsx,module.css}   PageTitle + сетка [список | сайдбар с архивами]
    │   │       ├── master-campaign-list.{tsx,module.css}   список кампаний из стора + форма создания
    │   │       └── create-campaign-form.{tsx,module.css}   локальный useState + addCampaign
    │   │
    │   ├── company/               «/company» — каталог официальных кампаний (фильтры остаются здесь)
    │   │   ├── index.ts
    │   │   ├── lib/filter-campaigns.ts           фильтрация по названию / настроению / уровням
    │   │   ├── model/
    │   │   │   └── campaign-filters-store.ts     Zustand (без persist): поиск, moods, min/maxLevel + clamp
    │   │   └── ui/
    │   │       ├── company-page.{tsx,module.css}          PageTitle + CampaignFilters + CampaignBoard
    │   │       ├── campaign-filters.{tsx,module.css}      читает/пишет campaign-filters-store
    │   │       ├── campaign-board.{tsx,module.css}        useOfficialCampaigns + filter → грид карточек / скелетоны / ошибка / пусто
    │   │       ├── campaign-card.{tsx,module.css}         презентационная карточка (img + Chip + ScrollArea)
    │   │       └── campaign-card-skeleton.{tsx,module.css}
    │   │
    │   ├── archive/               «/master/spells», «/master/npcs», «/master/items»
    │   │   ├── index.ts
    │   │   ├── api/fetch-spells.ts               mock MOCK_SPELLS + zod + задержка 200мс
    │   │   ├── model/spell.ts                    zod-схема Spell (level 0–9)
    │   │   ├── model/spell-keys.ts               фабрика queryKey
    │   │   └── ui/
    │   │       ├── spells-archive-page.{tsx,module.css}   PageTitle + SpellsTable
    │   │       ├── spells-table.{tsx,module.css}          TanStack Table + inline useQuery(fetchSpells)
    │   │       └── archive-placeholder-page.{tsx,module.css}  «в разработке», принимает titleKey (NPC, предметы)
    │   │
    │   ├── player/                «/player» — заглушка «в разработке»
    │   │   ├── index.ts
    │   │   └── ui/player-page.{tsx,module.css}
    │   │
    │   └── master-auth/           ЛЕГАСИ — НЕ подключён к роутеру (вход идёт через модалку, см. §5)
    │       ├── index.ts
    │       └── ui/master-auth-page.{tsx,module.css}   отдельная страница-версия логина/регистрации
    │
    ├── features/                  ─────────── слой FEATURES ───────────
    │   ├── master-auth/           вход/регистрация мастера (мок, без реального бэкенда)
    │   │   ├── index.ts           MasterAuthModal, useSessionStore, OpenAuthProvider; LoginForm/RegisterForm — легаси
    │   │   ├── model/auth.ts      zod-схемы loginSchema / registerSchema (легаси-формы)
    │   │   ├── model/auth-code.ts ввод и вставка цифр кода
    │   │   ├── model/session.ts   Zustand + persist('dnd-session'): isAuthenticated, signIn, signOut
    │   │   └── ui/
    │   │       ├── master-auth-modal.{tsx,module.css}   шаг почты, затем код
    │   │       ├── auth-email-step.tsx
    │   │       ├── auth-code-step.tsx
    │   │       ├── open-auth.tsx                          контекст «открыть модалку» для главной
    │   │       ├── login-form.tsx                         легаси, пароль; читает pages/master-auth
    │   │       ├── register-form.tsx                      легаси
    │   │       └── auth-form.module.css
    │   │
    │   └── language-switcher/     переключатель Ру/En
    │       ├── index.ts
    │       └── ui/language-switcher.{tsx,module.css}     placement fixed | inline; i18n.changeLanguage
    │
    ├── entities/                  ─────────── слой ENTITIES ───────────
    │   └── campaign/              официальные кампании
    │       ├── index.ts           public API
    │       ├── api/fetch-official-campaigns.ts   mock: slugify(id) + zod + задержка 300мс
    │       └── model/
    │           ├── official-campaign.ts          zod-схема + CAMPAIGN_MOOD_TAGS
    │           ├── official-campaigns-data.ts    OFFICIAL_CAMPAIGNS (20 шт.)
    │           ├── campaign-keys.ts              фабрика queryKey
    │           └── use-official-campaigns.ts     useQuery-обёртка
    │
    └── shared/                    ─────────── слой SHARED ───────────
        ├── ui/
        │   ├── index.ts           public API: реэкспорт всех компонентов (каждый — папка <name>/{tsx,module.css,index.ts})
        │   ├── button/            RAC Button: primary|secondary|outline|ghost|danger|accent|quiet, size sm|md|lg,
        │   │                      fullWidth, isIconOnly; события — onPress
        │   ├── text-field/        RAC TextField + Label / Input / FieldError
        │   ├── modal/             RAC ModalOverlay+Modal+Dialog; части Modal.Header/Heading/Body/CloseTrigger
        │   ├── card/              div-поверхность; части Card.Header/Title/Content
        │   ├── chip/              метка: variant solid|soft|accent, size sm|md|lg
        │   ├── skeleton/          плейсхолдер загрузки (pulse), размеры через className
        │   ├── controlled/        обвязка react-hook-form ⇄ поля
        │   │   ├── index.ts       реэкспорт
        │   │   └── text-field.tsx ControlledTextField: Controller + TextField/Label/Input/FieldError по props
        │   ├── page-title/        заголовок экрана + кнопка «Назад» (history-aware, fallback backTo)
        │   └── scroll-area/       кастомный скроллбар: drag thumb, стрелки, клавиатура, ARIA role="scrollbar",
        │                          render-пропсы, ResizeObserver
        ├── lib/
        │   ├── index.ts           экспорт cn
        │   └── cn.ts              обёртка над clsx
        └── config/
            ├── index.ts           экспорт i18n
            ├── i18n.ts            init i18next (lng 'ru', fallback 'en')
            └── locales/
                ├── ru.ts          все строки (as const — типобезопасные ключи)
                └── en.ts          зеркало ru.ts
```

---

## 4. Роутинг (`src/app/router.tsx`)

Хеш-роутер (URL вида `/#/master`). Каждый роут — `lazy()` + `withSuspense()` (обёртка `ErrorBoundary` + `Suspense` c `PageLoader`).

| Путь             | Компонент                                                | Экран                        |
| ---------------- | -------------------------------------------------------- | ---------------------------- |
| `/`              | `PublicLayout` → `ModeSelectPage`                        | главная «Свиток»             |
| `/master`        | `MasterHomePage`                                         | пространство мастера         |
| `/master/spells` | `SpellsArchivePage`                                      | архив заклинаний (таблица)   |
| `/master/npcs`   | `ArchivePlaceholderPage` (`titleKey="archive.npcTitle"`) | заглушка персонажей          |
| `/master/items`  | `ArchivePlaceholderPage` (`titleKey="archive.itemsTitle"`) | заглушка предметов         |
| `/player`        | `PlayerPage`                                             | заглушка                     |
| `/company`       | `PublicLayout` → `CompanyPage`                           | каталог официальных кампаний |

Корень роутера — `AppShell`: фиксированный `LanguageSwitcher` на всех путях, кроме `/` и `/company` (там переключатель в публичной шапке). `PublicLayout` без своего пути оборачивает только эти два маршрута. Отдельного роута для логина нет. Вход из шапки — модалка: шаг почты, затем код; `signIn()` и переход на `/master`.

---

## 5. Провайдеры и дерево композиции

```
main.tsx
└─ <StrictMode>
   └─ <App>                              app/App.tsx
      └─ <AppProviders>                  app/providers/app-providers.tsx
         └─ <I18nextProvider i18n>       shared/config
            └─ <QueryProvider>           app/providers/query-provider.tsx (QueryClient)
               ├─ <ScrollArea>           shared/ui — кастомный скролл всего приложения
               │  └─ <RouterProvider router={router}/>   → AppShell → страницы
               └─ <SpeedInsights/>       @vercel/speed-insights
```

**Вход мастера:** `PublicLayout` держит модалку. Без сессии «Войти» и «Мастер» открывают её на шаге почты. «Получить код» переключает на шаг кода без проверки. «Войти» вызывает `signIn()` и уводит на `/master`. Сессия — `useSessionStore` (`dnd-session`). Пока она есть, кнопка шапки — ссылка «Мастерская» на `/master`. Страница `pages/master-auth` — ранняя нероутовая версия, легаси; старые формы с паролем остаются только там.

---

## 6. Состояние

| Тип                             | Где                                                                           | Детали                                                                                                                                                                      |
| ------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Server state                    | TanStack Query                                                                | `useOfficialCampaigns()` (`entities/campaign`), inline `useQuery` в `spells-table.tsx`. QueryKey-фабрики: `campaignKeys`, `spellKeys`. Клиент: `staleTime 60s`, `retry 1` |
| Client state (кампании мастера) | `useMasterCampaignStore` — `pages/master-home/model/master-campaign-store.ts` | Zustand + `persist`, ключ localStorage **`dnd-campaign-store`**, `partialize` → только `campaigns` (не `selectedCampaignId`)                                                |
| Client state (сессия)           | `useSessionStore` — `features/master-auth/model/session.ts`                   | Zustand + `persist`, ключ localStorage **`dnd-session`**: `isAuthenticated`, `signIn`, `signOut`                                                                          |
| Client state (фильтры каталога) | `useCampaignFiltersStore` — `pages/company/model/campaign-filters-store.ts`   | Zustand без persist; `setMinLevel/setMaxLevel` делают clamp 1–20 и держат min ≤ max                                                                                         |
| Form state                      | react-hook-form + `zodResolver`                                               | `features/master-auth` (login/register). В `create-campaign-form.tsx` — простой `useState`                                                                                  |
| i18n                            | инстанс i18next                                                               | `shared/config/i18n.ts`, смена языка — `i18n.changeLanguage()`                                                                                                              |
| UI-состояние экранов            | локальный `useState`                                                          | `authOpen` в `PublicLayout`, шаг почта/код в `MasterAuthModal`, `registered` в `MasterAuthPage`                                                                              |

---

## 7. Данные (mock)

- **Официальные кампании:** `entities/campaign/model/official-campaigns-data.ts` — массив `OFFICIAL_CAMPAIGNS` (20 записей без `id`).
  `fetchOfficialCampaigns()` добавляет `id = slugify(cardTitle)`, валидирует `officialCampaignSchema`, эмулирует задержку 300 мс.
  Обложки: `public/compaign-images/…` — путь `thumbnailImage` относительный, резолвится от `base`.
- **Заклинания:** `pages/archive/api/fetch-spells.ts` — `MOCK_SPELLS` (4 шт.), задержка 200 мс, схема `spellSchema`.
- **NPC:** данных нет — `ArchivePlaceholderPage`.

Добавить бэкенд → менять только файлы в `*/api/*` (и, при необходимости, `queryKey`-фабрики); UI и модели не трогаются.

---

## 8. Стили и тема

**Основной способ — CSS Modules** (`*.module.css` рядом с компонентом) во всех слоях `app / features / pages`.

- **Токены:** `app/styles/tokens.css` — палитра и алиасы (`--primary`, `--card`, `--muted-foreground`, `--dnd-gold`, `--dnd-ember`, …), типографика, отступы (`--space-*`), радиусы, тени, длительности.
- **Reset:** `app/styles/base.css` (Tailwind и его preflight удалены). Нативная вложенность CSS (`&:hover`) допустима.
- **Тема жёстко тёмная:** `<html class="dark">` в `index.html`, переключателя светлой темы нет. Палитра — D&D (золотой акцент).
- **UI-кит — свой** (`shared/ui`), поведение и доступность — `react-aria-components`; состояния стилизуются через data-атрибуты RAC (`[data-hovered]`, `[data-pressed]`, `[data-focus-visible]`, `[data-invalid]`). Экраны импортируют только из `@/shared/ui`.
- `components.json` (shadcn) — мёртвый файл, shadcn удалён (коммит `DNDAPP-6`/`DNDAPP-7`).

---

## 9. Сборка и деплой

**Скрипты (`package.json`):**

| Команда                           | Действие                                                                                |
| --------------------------------- | --------------------------------------------------------------------------------------- |
| `npm run dev`                     | Vite dev-сервер (`--host 0.0.0.0`)                                                      |
| `npm run build`                   | `tsc -b` (project references) затем `vite build`; `docs/` держим только в `develop`     |
| `npm run build:check`             | build + `clean` — проверка сборки без следов в `docs/` (для всех веток кроме `develop`) |
| `npm run preview`                 | предпросмотр билда                                                                      |
| `npm run lint`                    | ESLint по всему проекту                                                                 |
| `npm run lint:fsd`                | Steiger — проверка границ FSD                                                           |
| `npm run lint:fix`                | ESLint с автофиксом                                                                     |
| `npm run format` / `format:check` | Prettier: отформатировать / проверить                                                   |
| `npm run clean`                   | удалить `docs/` и `tsconfig.tsbuildinfo`                                                |

**⚠️ Несоответствия сборки/деплоя (учитывать при работе с CI):**

1. `vite.config.ts` → `build.outDir: 'docs'`, а `.github/workflows/deploy.yml` публикует `./dist`. То есть workflow в текущем виде выкладывает **устаревшую** папку `dist/`, а не свежий билд в `docs/`.
2. `.gitignore` игнорирует `dist`, но **не** `docs`.
3. Папка `dist/` в репозитории — артефакт прошлой (до-FSD) структуры (там есть `MasterAuthPage`, `NpcsArchivePage`, которых в текущем роутере нет).

Если трогаете деплой — это первое, что стоит привести в согласованность (единый выходной каталог + актуализировать/удалить `dist/`).

---

## 10. Шпаргалка «где что менять»

| Задача                                | Файлы                                                                                               |
| ------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Добавить/изменить роут                | `src/app/router.tsx`                                                                                |
| Новый экран                           | новый слайс в `src/pages/<name>/` (`index.ts` + `ui/` + при необходимости `model/`, `api/`, `lib/`) |
| Текст интерфейса                      | `src/shared/config/locales/ru.ts` **и** `en.ts` (ключи типизированы — оба файла синхронно)          |
| Тема / цвета                          | `src/app/styles/index.css` (`:root.dark`)                                                           |
| Отступы / шрифты / радиусы            | `src/app/styles/tokens.css`                                                                         |
| Общий UI-компонент                    | `src/shared/ui/` + добавить в `src/shared/ui/index.ts`                                              |
| Поле формы (rhf + TextField)          | `src/shared/ui/controlled/` (`ControlledTextField`)                                                 |
| Кнопка «назад» / заголовок экрана     | `src/shared/ui/page-title/`                                                                         |
| Поведение скролла приложения          | `src/shared/ui/scroll-area/`                                                                        |
| Логика входа/регистрации              | `src/features/master-auth/` (`model/auth.ts` — валидация, `model/session.ts` — мок-сессия, `ui/*` — формы) |
| Список кампаний мастера, persist      | `src/pages/master-home/model/master-campaign-store.ts`                                              |
| Каталог официальных кампаний (данные) | `src/entities/campaign/`                                                                            |
| Логика фильтрации каталога            | `src/pages/company/lib/filter-campaigns.ts` + `model/campaign-filters-store.ts`                     |
| Замена mock на реальный API           | `src/pages/*/api/*` (+ `model/*-keys.ts` при смене ключей)                                          |
| Провайдеры / QueryClient              | `src/app/providers/`                                                                                |
| Настройка i18n (языки, дефолт)        | `src/shared/config/i18n.ts`                                                                         |

---

## 11. Граф зависимостей слайсов (кто кого импортирует)

```
app/App.tsx
  → app/providers, app/router, shared/ui

app/router.tsx  → pages/{mode-select, master-home, company, player, archive}, app/public-layout, features/language-switcher

app/public-layout → features/master-auth, features/language-switcher

pages/mode-select    → entities/campaign, features/master-auth, shared/ui
pages/master-home    → shared/ui  (+ внутренний model/master-campaign-store)
pages/company        → entities/campaign, shared/ui, shared/lib (cn)  (+ фильтры каталога)
pages/archive        → shared/ui  (+ внутренние model/api)
pages/player         → shared/ui

features/master-auth      → shared/ui (ControlledTextField), react-hook-form, zod, zustand
features/language-switcher → shared/lib (cn), shared/config (i18n)

shared/ui      → react-aria-components, react-hook-form (controlled/), shared/lib (cn), react-i18next, react-router-dom
shared/config  → i18next, react-i18next
shared/lib     → clsx
```

Кросс-импортов между слайсами одного слоя нет. `pages/master-auth` не импортируется никем.
