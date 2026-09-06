# Структура проекта `dnd-game-tool`

> Навигационная карта репозитория: где что лежит, как связано и куда идти, чтобы что-то поменять.
> Обновлять при изменении слоёв, роутов, стора или UI-кита (правило зафиксировано в [../CLAUDE.md](../CLAUDE.md)).

---

## 1. Что это

SPA-инструмент для D&D (пространство мастера, просмотр официальных кампаний, архивы заклинаний/NPC, режим игрока).
Бэкенда нет — все данные mock-овые (статические массивы + искусственная задержка). Деплой — статика на GitHub Pages.

**Стек:**

| Область | Технология |
|---|---|
| UI | React 19, TypeScript 5.9 (strict) |
| Сборка | Vite 7 (`@vitejs/plugin-react`, `@tailwindcss/vite`) |
| Архитектура | Feature-Sliced Design (FSD v2.1), линтер — Steiger |
| Роутинг | `react-router-dom` 7, **hash-роутер** (`createHashRouter`) |
| Server state | TanStack Query 5 |
| Таблицы | TanStack Table 8 |
| Client state | Zustand 5 (+ `persist` для кампаний мастера) |
| Формы | react-hook-form 7 + `@hookform/resolvers` + Zod 3 |
| i18n | i18next + react-i18next (`ru` дефолт, `en` fallback) |
| UI-кит | HeroUI v3 (`@heroui/react`, `@heroui/styles`) |
| Стили | CSS Modules (основное) + Tailwind v4 (только мост/утилиты в `shared/ui`) |
| Прочее | `@vercel/speed-insights`, `react-error-boundary`, `clsx` + `tailwind-merge` |

> `react-aria*` в дереве зависимостей — транзитивно через HeroUI, напрямую не импортируется.

---

## 2. Слои FSD

Направление импортов — только вниз: `app → pages → (widgets) → (features) → (entities) → shared`.

```
app/        инициализация, провайдеры, роутер, глобальные стили, тема
pages/      экраны по роутам, вся композиция и логика экрана
features/   переиспользуемые пользовательские действия — сейчас 2: master-auth, language-switcher
widgets/    НЕ используется
entities/   НЕ используется (бизнес-домена как слоя нет — модели живут внутри pages)
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
│                                   подключение шрифта Montserrat с Google Fonts
├── vite.config.ts                 alias @ → src; base './'; build.outDir = 'docs'  (см. §9)
├── tsconfig.json / .app.json / .node.json   project references; paths @/* → ./src/*
├── eslint.config.js               js + typescript-eslint + react-hooks + jsx-a11y (flat config)
├── steiger.config.ts              FSD-линтер: recommended + послабление для app/**
├── components.json                конфиг shadcn — ЛЕГАСИ (shadcn удалён, файл не используется)
├── .prettierrc                    singleQuote, semi, printWidth 100, trailingComma es5
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
    │   ├── App.tsx                <AppProviders> → <ScrollArea> [ <LanguageSwitcher/> + <RouterProvider/> ] + <SpeedInsights/>
    │   ├── App.module.css         .root { height: 100% }
    │   ├── router.tsx             createHashRouter; все страницы через lazy() + withSuspense (ErrorBoundary + Suspense + PageLoader)
    │   ├── router.module.css      стили .loader / .loaderText
    │   ├── route-error.tsx        RouteError — фолбэк ErrorBoundary (кнопка «перезагрузить»)
    │   ├── route-error.module.css
    │   ├── providers/
    │   │   ├── app-providers.tsx  I18nextProvider → QueryProvider
    │   │   └── query-provider.tsx QueryClient (staleTime 60s, retry 1)
    │   └── styles/
    │       ├── index.css          @import tailwindcss + @heroui/styles + tokens.css;
    │       │                      :root.dark — переопределение палитры HeroUI под D&D (золото/эмбер),
    │       │                      алиасы токенов для CSS-модулей, @theme inline — мост в Tailwind
    │       └── tokens.css         дизайн-токены для CSS-модулей: типографика, отступы, радиусы (шкала = Tailwind)
    │
    ├── pages/                     ─────────── слой PAGES ───────────
    │   ├── mode-select/           «/» — выбор роли (Игрок / Мастер / Компании)
    │   │   ├── index.ts
    │   │   └── ui/mode-select-page.{tsx,module.css}
    │   │           3 кнопки: navigate('/player'), открыть <MasterAuthModal>, navigate('/company')
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
    │   ├── company/               «/company» — каталог официальных кампаний
    │   │   ├── index.ts
    │   │   ├── api/fetch-official-campaigns.ts   mock: slugify(id) + zod-парсинг + задержка 300мс
    │   │   ├── lib/filter-campaigns.ts           фильтрация по названию / настроению / уровням
    │   │   ├── model/
    │   │   │   ├── official-campaign.ts          zod-схема OfficialCampaign + CAMPAIGN_MOOD_TAGS
    │   │   │   ├── official-campaigns-data.ts    статический массив OFFICIAL_CAMPAIGNS (20 шт.)
    │   │   │   ├── campaign-keys.ts              фабрика queryKey
    │   │   │   ├── use-official-campaigns.ts     useQuery-обёртка
    │   │   │   └── campaign-filters-store.ts     Zustand (без persist): поиск, moods, min/maxLevel + clamp
    │   │   └── ui/
    │   │       ├── company-page.{tsx,module.css}          PageTitle + CampaignFilters + CampaignBoard
    │   │       ├── campaign-filters.{tsx,module.css}      читает/пишет campaign-filters-store
    │   │       ├── campaign-board.{tsx,module.css}        useOfficialCampaigns + filter → грид карточек / скелетоны / ошибка / пусто
    │   │       ├── campaign-card.{tsx,module.css}         презентационная карточка (img + Chip + ScrollArea)
    │   │       └── campaign-card-skeleton.{tsx,module.css}
    │   │
    │   ├── archive/               «/master/spells» и «/master/npcs»
    │   │   ├── index.ts
    │   │   ├── api/fetch-spells.ts               mock MOCK_SPELLS + zod + задержка 200мс
    │   │   ├── model/spell.ts                    zod-схема Spell (level 0–9)
    │   │   ├── model/spell-keys.ts               фабрика queryKey
    │   │   └── ui/
    │   │       ├── spells-archive-page.{tsx,module.css}   PageTitle + SpellsTable
    │   │       ├── spells-table.{tsx,module.css}          TanStack Table + inline useQuery(fetchSpells)
    │   │       └── archive-placeholder-page.{tsx,module.css}  «в разработке», принимает titleKey (для NPC)
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
    │   │   ├── index.ts           экспорт: LoginForm, RegisterForm, MasterAuthModal
    │   │   ├── model/auth.ts      zod-схемы loginSchema / registerSchema + выводимые типы
    │   │   └── ui/
    │   │       ├── master-auth-modal.{tsx,module.css}   Modal (HeroUI) с 3 состояниями: login | register | success
    │   │       ├── login-form.tsx                        rhf + zodResolver → onSuccess + navigate('/master')
    │   │       ├── register-form.tsx                     rhf + zodResolver → onSuccess (переход на success)
    │   │       └── auth-form.module.css                  общие стили обеих форм
    │   │
    │   └── language-switcher/     переключатель Ру/En
    │       ├── index.ts
    │       └── ui/language-switcher.{tsx,module.css}     fixed top-right; i18n.changeLanguage
    │
    └── shared/                    ─────────── слой SHARED ───────────
        ├── ui/
        │   ├── index.ts           public API: реэкспорт локальных + из @heroui/react
        │   │                      (Card, Chip, Modal, TextField, Input, Label, FieldError, Skeleton, ScrollShadow)
        │   ├── button.tsx         адаптер: старый shadcn-API (variant/size/onClick) → HeroUI Button (onPress)
        │   ├── controlled/        обвязка react-hook-form ⇄ HeroUI-поля
        │   │   ├── index.ts       реэкспорт
        │   │   └── text-field.tsx ControlledTextField: Controller + TextField/Label/Input/FieldError по props
        │   ├── page-title.tsx     заголовок экрана + кнопка «Назад» (history-aware, fallback backTo)
        │   └── scroll-area.tsx    кастомный скроллбар: drag thumb, стрелки, клавиатура, ARIA role="scrollbar",
        │                          render-пропсы, ResizeObserver
        ├── lib/
        │   ├── index.ts           экспорт cn
        │   └── cn.ts              clsx + tailwind-merge
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

| Путь | Компонент | Экран |
|---|---|---|
| `/` | `ModeSelectPage` | выбор роли |
| `/master` | `MasterHomePage` | пространство мастера |
| `/master/spells` | `SpellsArchivePage` | архив заклинаний (таблица) |
| `/master/npcs` | `ArchivePlaceholderPage` (`titleKey="archive.npcTitle"`) | заглушка |
| `/player` | `PlayerPage` | заглушка |
| `/company` | `CompanyPage` | каталог официальных кампаний |

Навигация между экранами — `useNavigate()` из кнопок (`ModeSelectPage`, `MasterHomePage`, `LoginForm`). Отдельного роута для логина нет.

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
               │  ├─ <LanguageSwitcher/> features/language-switcher (fixed)
               │  └─ <RouterProvider router={router}/>   → страницы
               └─ <SpeedInsights/>       @vercel/speed-insights
```

**Вход мастера:** `ModeSelectPage` держит локальный `authOpen` и рендерит `<MasterAuthModal>` из `features/master-auth`. Модалка переключает внутренние состояния `login → register → success`; `LoginForm` при успехе делает `navigate('/master')`. Страница `pages/master-auth` — это ранняя нероутовая версия того же, оставлена как легаси.

---

## 6. Состояние

| Тип | Где | Детали |
|---|---|---|
| Server state | TanStack Query | `useOfficialCampaigns()` (`pages/company/model`), inline `useQuery` в `spells-table.tsx`. QueryKey-фабрики: `campaignKeys`, `spellKeys`. Клиент: `staleTime 60s`, `retry 1` |
| Client state (кампании мастера) | `useMasterCampaignStore` — `pages/master-home/model/master-campaign-store.ts` | Zustand + `persist`, ключ localStorage **`dnd-campaign-store`**, `partialize` → только `campaigns` (не `selectedCampaignId`) |
| Client state (фильтры каталога) | `useCampaignFiltersStore` — `pages/company/model/campaign-filters-store.ts` | Zustand без persist; `setMinLevel/setMaxLevel` делают clamp 1–20 и держат min ≤ max |
| Form state | react-hook-form + `zodResolver` | `features/master-auth` (login/register). В `create-campaign-form.tsx` — простой `useState` |
| i18n | инстанс i18next | `shared/config/i18n.ts`, смена языка — `i18n.changeLanguage()` |
| UI-состояние экранов | локальный `useState` | `authOpen` в `ModeSelectPage`, `view` в `MasterAuthModal`, `registered` в `MasterAuthPage` |

---

## 7. Данные (mock)

- **Официальные кампании:** `pages/company/model/official-campaigns-data.ts` — массив `OFFICIAL_CAMPAIGNS` (20 записей без `id`).
  `fetchOfficialCampaigns()` добавляет `id = slugify(cardTitle)`, валидирует `officialCampaignSchema`, эмулирует задержку 300 мс.
  Обложки: `public/compaign-images/…` — путь `thumbnailImage` относительный, резолвится от `base`.
- **Заклинания:** `pages/archive/api/fetch-spells.ts` — `MOCK_SPELLS` (4 шт.), задержка 200 мс, схема `spellSchema`.
- **NPC:** данных нет — `ArchivePlaceholderPage`.

Добавить бэкенд → менять только файлы в `*/api/*` (и, при необходимости, `queryKey`-фабрики); UI и модели не трогаются.

---

## 8. Стили и тема

**Основной способ — CSS Modules** (`*.module.css` рядом с компонентом) во всех слоях `app / features / pages`.

- **Токены:** `app/styles/tokens.css` — типографика, отступы (`--space-*`), радиусы; шкала 1:1 с Tailwind.
  Цвета и алиасы (`--primary`, `--card`, `--muted-foreground`, `--dnd-gold`, `--dnd-ember`, …) — в `app/styles/index.css`, блок `:root.dark`.
- **Tailwind v4** подключён (`@import 'tailwindcss'` + `@theme inline` мост), но утилитарные классы остались **только в `shared/ui`** — `scroll-area.tsx` и `page-title.tsx`. Новый код пишем на CSS-модулях + токенах.
- **Тема жёстко тёмная:** `<html class="dark">` в `index.html`, переключателя светлой темы нет. Палитра — D&D (золотой акцент вместо синего HeroUI).
- **HeroUI v3** — базовый UI-кит; `@heroui/styles` импортируется в `index.css`. Компоненты реэкспортируются через `shared/ui/index.ts`, а не импортируются из `@heroui/react` напрямую по экранам.
- `components.json` (shadcn) — мёртвый файл, shadcn удалён (коммит `DNDAPP-6`/`DNDAPP-7`).

---

## 9. Сборка и деплой

**Скрипты (`package.json`):**

| Команда | Действие |
|---|---|
| `npm run dev` | Vite dev-сервер (`--host 0.0.0.0`) |
| `npm run build` | `tsc -b` (project references) затем `vite build` |
| `npm run preview` | предпросмотр билда |
| `npm run lint` | ESLint по всему проекту |
| `npm run lint:fsd` | Steiger — проверка границ FSD |
| `npm run clean` | удалить `docs/` и `tsconfig.tsbuildinfo` |

**⚠️ Несоответствия сборки/деплоя (учитывать при работе с CI):**

1. `vite.config.ts` → `build.outDir: 'docs'`, а `.github/workflows/deploy.yml` публикует `./dist`. То есть workflow в текущем виде выкладывает **устаревшую** папку `dist/`, а не свежий билд в `docs/`.
2. `.gitignore` игнорирует `dist`, но **не** `docs`.
3. Папка `dist/` в репозитории — артефакт прошлой (до-FSD) структуры (там есть `MasterAuthPage`, `NpcsArchivePage`, которых в текущем роутере нет).

Если трогаете деплой — это первое, что стоит привести в согласованность (единый выходной каталог + актуализировать/удалить `dist/`).

---

## 10. Шпаргалка «где что менять»

| Задача | Файлы |
|---|---|
| Добавить/изменить роут | `src/app/router.tsx` |
| Новый экран | новый слайс в `src/pages/<name>/` (`index.ts` + `ui/` + при необходимости `model/`, `api/`, `lib/`) |
| Текст интерфейса | `src/shared/config/locales/ru.ts` **и** `en.ts` (ключи типизированы — оба файла синхронно) |
| Тема / цвета | `src/app/styles/index.css` (`:root.dark`) |
| Отступы / шрифты / радиусы | `src/app/styles/tokens.css` |
| Общий UI-компонент | `src/shared/ui/` + добавить в `src/shared/ui/index.ts` |
| Поле формы (rhf + HeroUI) | `src/shared/ui/controlled/` (`ControlledTextField`) |
| Кнопка «назад» / заголовок экрана | `src/shared/ui/page-title.tsx` |
| Поведение скролла приложения | `src/shared/ui/scroll-area.tsx` |
| Логика входа/регистрации | `src/features/master-auth/` (`model/auth.ts` — правила валидации, `ui/*` — формы) |
| Список кампаний мастера, persist | `src/pages/master-home/model/master-campaign-store.ts` |
| Каталог официальных кампаний (данные) | `src/pages/company/model/official-campaigns-data.ts` |
| Логика фильтрации каталога | `src/pages/company/lib/filter-campaigns.ts` + `model/campaign-filters-store.ts` |
| Замена mock на реальный API | `src/pages/*/api/*` (+ `model/*-keys.ts` при смене ключей) |
| Провайдеры / QueryClient | `src/app/providers/` |
| Настройка i18n (языки, дефолт) | `src/shared/config/i18n.ts` |

---

## 11. Граф зависимостей слайсов (кто кого импортирует)

```
app/App.tsx
  → app/providers, app/router, features/language-switcher, shared/ui

app/router.tsx  → pages/{mode-select, master-home, company, player, archive}

pages/mode-select    → features/master-auth (MasterAuthModal), shared/ui
pages/master-home    → shared/ui  (+ внутренний model/master-campaign-store)
pages/company        → shared/ui, shared/lib (cn)  (+ внутренние model/api/lib)
pages/archive        → shared/ui  (+ внутренние model/api)
pages/player         → shared/ui

features/master-auth      → shared/ui (ControlledTextField), react-hook-form, zod, react-router-dom
features/language-switcher → shared/lib (cn), shared/config (i18n)

shared/ui      → @heroui/react, react-hook-form (controlled/), shared/lib (cn), react-i18next, react-router-dom
shared/config  → i18next, react-i18next
shared/lib     → clsx, tailwind-merge
```

Кросс-импортов между слайсами одного слоя нет. `pages/master-auth` не импортируется никем.
