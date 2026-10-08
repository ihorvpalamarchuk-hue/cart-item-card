# Практична робота №1 — Cart Item Card (картка товару в кошику)

Варіант 1: зображення, назва, ціна, лічильник кількості (− / число / +), кнопка видалення зі станом підтвердження.


## Структура

```
index.html        — семантична розмітка компонента
style.css         — дизайн-токени в :root, Flexbox, :hover, :focus-visible
script.js         — стани: лічильник, підтвердження видалення, повернення товару
img/kosiv-cup.svg — зображення товару
```

## Дизайн-токени (однакові у Figma та CSS)

| Токен Figma (Variables) | CSS-змінна   | Значення  | Призначення                         |
|-------------------------|--------------|-----------|-------------------------------------|
| Color/Background        | `--bg`       | `#EEF1EC` | фон сторінки                        |
| Color/Surface           | `--surface`  | `#FFFFFF` | фон картки, текст на кольорових кнопках |
| Color/Text              | `--text`     | `#1F2A24` | основний текст, іконки, рамки       |
| Color/Accent            | `--accent`   | `#1F6F5C` | hover, рамка фокусу                 |
| Color/Danger (додатково)| `--danger`   | `#A8321E` | стан підтвердження видалення        |

| Text Style | Шрифт   | Розмір / інтерліньяж | Насиченість |
|------------|---------|----------------------|-------------|
| Title      | Manrope | 18 / 24              | Bold (700)  |
| Body       | Manrope | 14 / 20              | Regular (400) |

## Структура компонента у Figma (тільки Auto Layout)

```
CartItem  (Component Set, property State)
└─ Card            Auto Layout →  horizontal, gap 16, padding 16, radius 16, fill Surface, width Fill
   ├─ Image        96×96, radius 10, Fixed
   └─ Body         Auto Layout ↓  vertical, gap 12, width Fill
      ├─ Header    Auto Layout →  horizontal, space-between, gap 8, width Fill
      │  ├─ Info   Auto Layout ↓  vertical, gap 4, width Fill
      │  │  ├─ Title  «Чашка "Косівська хвиля"»  (Title)
      │  │  ├─ Meta   «Ручний розпис, 300 мл»    (Body)
      │  │  └─ Price  «450 ₴ за штуку»           (Body)
      │  └─ Remove 40×40, іконка кошика 20
      └─ Footer    Auto Layout →  horizontal, space-between, gap 12, width Fill
         ├─ Quantity Auto Layout →  gap 4, padding 4, stroke 1 Text, radius 10
         │  ├─ Minus 32×32 · Value «1» · Plus 32×32
         └─ Total  «450 ₴»  (Title)
```

Варіанти (Component Variants, властивість `State`):

| State     | Що змінюється                                                          |
|-----------|------------------------------------------------------------------------|
| Default   | базовий вигляд, рамка картки прозора                                   |
| Hover     | рамка картки 1 px Accent, тінь; кнопка «+» з заливкою Accent           |
| Confirm   | Footer прихований, замість нього рядок «Видалити чашку з кошика?» + кнопки «Залишити» / «Видалити»; рамка Danger |

## Відповідність HTML ↔ Figma

| Шар Figma | HTML                                                             |
|-----------|------------------------------------------------------------------|
| Card      | `<article class="cart-item">`                                    |
| Title     | `<h2>`                                                           |
| Price     | `<data value="450">`                                             |
| Remove, Minus, Plus | `<button type="button" aria-label="…">` (іконки з `aria-hidden`) |
| Value     | `<output>` (живий регіон: зміни озвучуються)                       |
| Total     | `<output for="item-1-qty">`                                      |
| Confirm   | `<div role="group">` з двома `<button type="button">`            |

## Звіт про тестування доступності

**Клавіатура (Tab / Shift+Tab / Enter / Escape).** Порядок фокусу: «Видалити товар» → «Зменшити кількість» (активна з кількістю > 1) → «Збільшити кількість». Фокус позначено рамкою 3 px кольору Accent з відступом 2 px (`:focus-visible`). Після натискання «Видалити товар» фокус переходить на «Залишити», Escape закриває підтвердження й повертає фокус на кошик. Коли кнопка стає неактивною на межі (1 або 10 шт.), фокус переноситься на сусідню кнопку, щоб не загубитися.

**Контрастність (WCAG 2.1, мінімум 4.5:1).**

| Пара кольорів              | Контраст |
|----------------------------|----------|
| Text на Surface            | 14.84:1  |
| Text на Background         | 13.02:1  |
| Surface на Accent (hover)  | 6.02:1   |
| Surface на Danger (кнопка) | 6.69:1   |
| Danger на Surface (текст)  | 6.69:1   |
| Accent (фокус) на Surface  | 6.02:1   |

**W3C Nu Validator.** HTML: 0 помилок, 0 попереджень. CSS: 0 помилок.

**axe-core (WCAG 2A/2AA + best practices).** 0 порушень у станах Default і Confirm.

**Адаптивність.** Картка не має фіксованої ширини: тіло займає `flex: 1 1 180px` і стискається, у вузькому контейнері (< ~320 px) переноситься під фото. На сторінці картка лежить у рамці з `resize: horizontal` — потягніть її кут, щоб показати поведінку на захисті. Горизонтального скролу немає від 300 px.
