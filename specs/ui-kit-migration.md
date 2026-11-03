# Уход с HeroUI и Tailwind → свой UI-кит на CSS Modules

## Context

Сейчас стили смешаны: экраны на CSS Modules, `shared/ui` (page-title, scroll-area) — на Tailwind, компоненты — реэкспорт HeroUI v3 (`@heroui/styles` + переопределения в `index.css`). Цель — один подход: свои компоненты в `shared/ui`, стили только в `*.module.css` на токенах.

**CSS Modules или Less → CSS Modules.** Less ничего не добавляет:

- нативный CSS уже умеет вложенность (`&:hover`), переменные (`--token`), `color-mix()`, `@layer`, `@container`; Vite поддерживает это из коробки, Less — лишняя зависимость и компиляция;
- переменные Less существуют только при сборке, а CSS-переменные — в рантайме (тема, состояния, inline-переопределения через `style={{'--x': …}}`);
- 20 модулей проекта уже на `.module.css` — Less означал бы второе переписывание.
  Миксины Less заменяются общими классами через `composes:` в CSS Modules.

**Основа поведения — `react-aria-components`** (уже в зависимостях; HeroUI v3 сам на нём построен). Он даёт доступность, фокус, клавиатуру, модалки с focus-trap, а вёрстку и стили пишем сами. Писать Modal/TextField полностью вручную — дорого и легко сломать a11y.

## Инвентарь (что заменить)

Используется по экранам: `Button`, `TextField`+`Input`+`Label`+`FieldError` (+`ControlledTextField`), `Modal`, `Card`, `Chip`, `Skeleton`, `ScrollArea` (radix + Tailwind), `PageTitle` (Tailwind). `ScrollShadow` экспортируется, но не используется — удалить.

## План

1. **Токены** — `src/app/styles/tokens.css`: перенести собственные значения палитры (сейчас `--accent/--surface/--overlay/--radius` и алиасы `--primary/--card/...` в [index.css](src/app/styles/index.css) опираются на переменные HeroUI). Определить полные значения: background, foreground, surface, border, muted, accent, danger, focus-ring, radius-_, space-_, font-_, shadow-_, duration-\*. Проверить, какие HeroUI-переменные (`--default`, `--muted`, `--danger`, `--surface-foreground`, `--border` и т.п.) читают существующие модули (Grep по `var(--`), и задать их явно.
2. **Компоненты в `shared/ui/<name>/`** (`<name>.tsx` + `<name>.module.css`, экспорт через `shared/ui/index.ts`, API максимально совместимый с текущим, чтобы экраны менялись минимально):
   - `button` — RAC `Button`, варианты `variant` (primary/secondary/ghost/danger), `size`, `isPending`; стили по `[data-hovered]`, `[data-pressed]`, `[data-focus-visible]`, `[data-disabled]`.
   - `text-field` — RAC `TextField`/`Input`/`Label`/`FieldError`/`Text`; `controlled/text-field.tsx` переводится на него.
   - `modal` — RAC `ModalOverlay`+`Modal`+`Dialog`+`Heading`; анимации через `[data-entering]/[data-exiting]`.
   - `card`, `chip`, `skeleton` — простые разметочные компоненты (div/span + модуль), без RAC.
   - `scroll-area` — оставить radix (нужен кастомный скроллбар), Tailwind-классы → модуль.
   - `page-title` — Tailwind → модуль.
   - Утилита классов: `clsx` (уже есть); `tailwind-merge` больше не нужен.
3. **Миграция экранов** — по одному компоненту: заменить использование HeroUI-специфичных пропсов/compound-API (`Card.Header`, `Modal.Body` и т.п.) на новый API в ~15 файлах ([master-auth-modal.tsx](src/features/master-auth/ui/master-auth-modal.tsx), [campaign-card.tsx](src/pages/company/ui/campaign-card.tsx), [campaign-filters.tsx](src/pages/company/ui/campaign-filters.tsx), [create-campaign-form.tsx](src/pages/master-home/ui/create-campaign-form.tsx) и др.). Убрать оставшиеся Tailwind-классы в `className` (Grep).
4. **Чистка** — удалить из `index.css` `@import 'tailwindcss'`, `@import '@heroui/styles'`, блок `@theme inline`; вынести reset/база (box-sizing, margin, шрифты, `:focus-visible`) в `src/app/styles/base.css`. Удалить зависимости: `@heroui/react`, `@heroui/styles`, `tailwindcss`, `@tailwindcss/vite`, `tailwind-merge`; убрать плагин из `vite.config.ts`. Удалить мёртвые `components.json`, если не нужен. Проверить провайдеры в `src/app` (HeroUI/`I18nProvider`/`RouterProvider` RAC оставить, если используются).
5. **Документация** — обновить `CLAUDE.md` (раздел «Стиль и гочи»: только CSS Modules, UI из `@/shared/ui`, построен на react-aria-components) и `documents/project-structure.md` (смена UI-кита и системы стилей).

Порядок коммитов: (1) токены+base, (2) компоненты shared/ui, (3) миграция экранов, (4) удаление HeroUI/Tailwind + доки. Каждый шаг собирается.

## Verification

- `npm run build:check`, `npm run lint`, `npm run lint:fsd` — показать вывод.
- Grep: нет `@heroui`, `tailwind`, `tailwind-merge` в `src/` и `package.json`; нет Tailwind-утилит в `className`.
- `npm run dev` + Playwright: пройти mode-select → master-auth (модалка: открыть, Tab-фокус, Esc закрывает, ошибки полей) → master-home (создать кампанию) → company (карточки, фильтры, скелетоны) → player; скриншоты до/после для сравнения визуала.
