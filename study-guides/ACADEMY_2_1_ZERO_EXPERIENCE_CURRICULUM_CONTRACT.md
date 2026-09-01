# Academy 2.1 — Zero-Experience Curriculum Contract

## Purpose

This contract defines the teaching rules for Intern content in Code Ascension Academy 2.1.
Intern must be suitable for a learner who has never written code before and may not know basic programming vocabulary.

## Non-negotiable Intern rule

> If the Academy has not explicitly taught a concept, symbol, syntax rule, term, or programming idea, an Intern assessment must not require the learner to know it.

The learner must not be expected to reverse-engineer unexplained syntax from a worked example.

## Rank boundaries

- **Intern:** I have never coded before.
- **Junior:** I understand fundamental syntax and can create small programs/pages.
- **Intermediate:** I can combine concepts and solve normal development problems.
- **Senior:** I can design larger systems and reason about architecture.
- **Advanced:** I can solve complex professional-level problems.

Intern should be unusually explicit because it creates the foundation. Later ranks should become progressively less guided and more demanding.

## Required Intern teaching sequence

Where a topic needs the relevant material, teach in this order:

1. What are we learning?
2. Why does it matter?
3. New terminology.
4. New symbols/syntax.
5. One tiny example.
6. Break the example down piece by piece.
7. Explain what the browser/compiler/computer does.
8. Change one thing at a time and predict the result.
9. Show common mistakes.
10. Show how to read the resulting error or unexpected output.
11. Combine already-taught pieces into a worked example.
12. Give guided practice using only taught concepts.
13. Recap.
14. Mastery checkpoint.
15. Only then assess the concept.

## Beginner curriculum fields

`web/js/curriculum.js` supports an optional `beginnerScaffold` object on Intern topics. Existing Junior–Advanced topics continue to use the legacy generated lesson structure.

Supported fields are:

- `learningGoal`
- `whyItMatters`
- `terms[]` with `term` and `meaning`
- `syntax[]` with `symbol` and `meaning`
- `examples[]` with `title`, `explanation`, and `code`
- `breakdown[]` with `piece` and `meaning`
- `computerSteps[]`
- `guidedChanges[]`
- `workedExampleIntro`
- `errorExamples[]` with `mistake`, `explanation`, and `fix`
- `recap[]`

A topic may also provide `starter` so the lesson editor can begin with a tiny example rather than exposing the final combined example immediately.

## Assessment boundaries

An optional `assessment` object can narrow or explicitly define what a topic is allowed to test:

- `practiceGroups`
- `practiceMinLength`
- `testCodeQuestions[]`
- `examGroups` keyed by exam number (`1`, `2`, `3`)
- `examPrompts` keyed by exam number

Assessment groups must be a subset of syntax/concepts explicitly taught before that assessment.

The curriculum should become harder by combining known concepts, not by surprising the learner with unknown syntax.

## Save compatibility rule

Existing learner progress identifies normal modules primarily by language, rank, and lesson index.
Therefore the five module positions in each rank are persistent identities for Academy 2.1.

**Do not reorder modules casually.**

Rewriting and expanding the teaching inside an existing module is safe when its conceptual purpose remains the same. If a future change genuinely needs to move a concept to another module index, create an explicit save migration instead of silently moving it.

This phase does not change the frontend save version or storage envelope schema.

## C# specific rule

C# Intern must explicitly teach, before requiring them:

- source code, compile, run, and a beginner-level explanation of .NET
- statements and semicolons
- identifiers and naming rules
- case sensitivity
- variables, values, and types
- `string`, `int`, `double`, and `bool`
- assignment with `=`
- comparisons used by the lesson
- quotation marks
- `Console.WriteLine`
- method/parentheses/argument vocabulary at a simple conceptual level
- interpolation with `$` and `{ }`
- compiler errors and line/column information

C# examples should grow from one instruction to a combined program. A combined example must not be the learner's first exposure to its individual pieces.

## Phase 2.1A reference implementation

C# Intern Module 1 (`csharp.intern.0`) is the first reference implementation of this contract.
Its persistent module position remains unchanged.

Use the learner's experience with this module to judge the teaching density and clarity before applying the same framework to the remaining Intern modules.

## Academy 2.1F — C# formal assessment compilation gate

C# class-test and exam code responses must satisfy two independent checks:

1. The response must contain the concepts/syntax required by the question validator.
2. The response must compile successfully through the Academy's real local C# runner.

A structurally plausible but invalid C# answer must not receive credit merely because it contains expected tokens. Compiler infrastructure failures (for example the desktop bridge or local SDK being unavailable) must not silently count as a wrong learner answer; grading pauses and the learner is told that the compiler could not be reached.

This rule applies to ordinary C# class tests and exams across ranks. It does not change the normal 80% progression requirement, question counts, XP awards, lesson IDs, or save schema.

## JavaScript Intern specific rule

JavaScript Intern must begin with programming fundamentals before browser DOM manipulation. Before an Intern assessment requires them, the curriculum must explicitly teach:

- what programming and JavaScript are at a beginner-friendly level
- source code and statements
- console output with `console.log`
- identifiers, naming rules, and case sensitivity
- variables and values
- `const` and `let`
- assignment with `=` and simple reassignment
- strings, numbers, and booleans
- quotation marks and lowercase `true` / `false`
- the punctuation used by each example
- how to read simple console/runtime errors

Do not require comparisons, conditionals, loops, functions, arrays, objects, events, or DOM APIs in Module 1 before those ideas have been introduced in later modules.

## Academy 2.1G — JavaScript Intern Module 1 reference

JavaScript Intern Module 1 (`javascript.intern.0`) now follows the zero-experience scaffold. Its persistent module position remains unchanged. The module deliberately avoids `typeof`, arithmetic, comparisons, conditions, loops, functions, DOM access, optional chaining, and other later syntax in its required practice and formal assessment prompts.

## Academy 2.1H — JavaScript Intern Module 2 reference

JavaScript Intern Module 2 (`javascript.intern.1`) now teaches decision-making in an explicit sequence: arithmetic expressions, boolean comparisons, assignment-versus-comparison, `if`, `else`, logical operators, and finally a simple `switch`. Its persistent module position remains unchanged.

The module prefers strict equality (`===` / `!==`) and clear `if/else` blocks. Loose equality (`==` / `!=`) conversion rules and compact ternary (`? :`) expressions are intentionally not required at Intern level here. Formal practice and assessment prompts are restricted to syntax introduced in Modules 1–2.

## Academy 2.1I — JavaScript Intern Module 3 reference

JavaScript Intern Module 3 (`javascript.intern.2`) now introduces repetition before combining it with collections. The teaching order is: a traceable `while` loop, a counted `for` loop, array literals, zero-based indexing, `.length`, `for...of`, and finally an indexed array traversal that connects the previously taught pieces. Its persistent module position remains unchanged.

Formal practice and assessment prompts are limited to this taught syntax. `push`, `pop`, `map`, `forEach`, callbacks, higher-order array methods, functions, objects, DOM APIs, and events are not required by Module 3. The module explicitly teaches infinite-loop risk, zero-based indexing, `.length` versus the final valid index, `for...of` versus `for...in`, and the common `i <= array.length` off-by-one mistake.

## Academy 2.1J — JavaScript Intern Module 4 reference

JavaScript Intern Module 4 (`javascript.intern.3`) now introduces reusable behaviour in a strict beginner sequence: normal function declaration, function call, one parameter/argument, multiple parameters/arguments, returned values, storing a returned value, local function scope, and finally reading a simple outer-scope value from inside a function. Its persistent module position remains unchanged.

Formal practice and assessment prompts are restricted to normal `function` declarations and syntax already taught in Modules 1–4. Arrow functions, function expressions, callbacks, closures, detailed hoisting rules, `this`, DOM APIs, and events are intentionally not required here. The module explicitly teaches parameter-versus-argument vocabulary, the meaning of `undefined` when no useful value is returned/provided, case-sensitive function names, missing calls, missing commas, missing `return`, and the boundary around local function variables.

## Academy 2.1K — JavaScript Intern Module 5 reference

JavaScript Intern Module 5 (`javascript.intern.4`) now introduces browser interaction only after Modules 1–4 have established variables, conditions, loops/arrays, and normal functions. The teaching order is: browser/DOM mental model, `document`, one `querySelector`, selector strings, `textContent`, a normal named event-handler function, `addEventListener`, the `"click"` event name, and finally `null` plus a simple guard when a selector may fail. Its persistent module position remains unchanged.

Formal practice and assessment prompts are restricted to `querySelector`, normal named functions, `textContent`, `addEventListener`, and syntax already taught in earlier JavaScript Intern modules. `querySelectorAll`, `classList`, `createElement`, anonymous callbacks, arrow functions, optional chaining, forms, event-object inspection, and larger state/rendering patterns are intentionally deferred.

Because executing DOM lesson code against the Academy's own WebView document could accidentally modify the application UI, JavaScript Intern Module 5 RUN actions use a small isolated DOM preview window containing `#demo-button` and `#demo-status`. This preview is a teaching sandbox only; it does not change progression, save IDs, or the general JavaScript runner used by Modules 1–4.

## HTML Intern specific rule

HTML Intern must assume the learner does not yet know what a website, webpage, browser, HTML document, tag, element, attribute, or nesting relationship is. Before requiring them in an Intern assessment, the curriculum must explicitly teach:

- website versus webpage at a simple technical level
- what a browser does with an HTML file
- what HTML is and that it is a markup language rather than a programming language
- the `.html` filename extension
- angle brackets, opening tags, closing tags, and the closing `/`
- tag versus complete element versus element content
- attributes, `=`, and quoted attribute values
- nesting, parent/child relationships, and indentation
- the modern doctype declaration
- the `html`, `head`, `title`, and `body` document roles
- that browsers may repair malformed markup, so visible output is not proof that source structure is correct

HTML should not inherit language rules from C# or JavaScript without explanation. In particular, normal HTML tag names are ASCII case-insensitive even though the Academy consistently teaches lowercase modern markup style.

## Academy 2.1L — HTML Intern Module 1 reference

HTML Intern Module 1 (`html.intern.0`) now begins before markup syntax itself: website versus webpage, browser, HTML source file, and markup. It then introduces one paragraph element, opening/closing tags, attributes, nesting/indentation, `head` versus visible `body` content, and only afterward assembles the complete document skeleton. Its persistent module position remains unchanged.

Formal practice and assessment prompts are restricted to syntax explicitly introduced in this module: basic paired elements, quoted attributes, the doctype, `html`, `head`, `title`, `body`, and the already-shown `h1`/`p` elements. `article`, semantic landmarks, links, images, forms, ARIA, and other later-module structures are intentionally not required by Module 1.

## Academy 2.1M — HTML Intern Module 2 reference

HTML Intern Module 2 (`html.intern.1`) now introduces visible text structure in a strict beginner sequence: page heading, paragraph, section heading, optional subsection heading, strong importance, and stress emphasis. Its persistent module position remains unchanged.

Formal practice and assessment prompts are restricted to heading hierarchy (`h1`/`h2` and recognition of `h3`), paragraphs, `strong`, and `em`, plus document/tag fundamentals already taught in Module 1. `article`, links, images, lists, forms, ARIA, encoded-tag demonstrations, CSS-driven presentation, and later semantic-landmark structures are intentionally not required here. The module explicitly teaches that heading levels communicate hierarchy rather than font size, that `strong`/`em` carry meaning rather than merely bold/italic appearance, and that browser error recovery can make malformed paragraph/heading markup appear deceptively acceptable.

## Academy 2.1N — HTML Intern Module 3 reference

HTML Intern Module 3 (`html.intern.2`) now introduces navigation/resource markup in a strict beginner sequence: one anchor with `href`, relative versus full URL destinations at a basic level, descriptive link text, one `img` with `src` and meaningful `alt`, unordered lists, ordered lists, and `li` items before combining links inside list items. Its persistent module position remains unchanged.

Formal practice and assessment prompts are restricted to `a`, `href`, `img`, `src`, `alt`, `ul`, `ol`, and `li`, plus heading/paragraph concepts already taught in Modules 1–2. `nav`, ARIA, forms, description lists, responsive images, `picture`, `srcset`, CSS, and advanced path rules are intentionally not required here. The module explicitly teaches that `img` is a void element, that `alt` is a text alternative rather than an automatic caption, that syntactically valid `href`/`src` values can still point to missing resources, and that list items must be nested correctly inside their `ul`/`ol` container.

## Academy 2.1O — HTML Intern Module 4 reference

HTML Intern Module 4 (`html.intern.3`) now introduces forms as a user-input structure before teaching submission infrastructure. The teaching order is: form container, label, label `for` plus input `id`, text input, the separate role of `name`, `required`, email input, checkbox recognition, radio-group recognition, and finally an explicit submit button. Its persistent module position remains unchanged.

Formal practice and assessment prompts are restricted to the core form structure explicitly taught in this module: `form`, `label`, `for`, `input`, `id`, `name`, text/email `type`, `required`, and `button type="submit"`, plus HTML fundamentals from Modules 1–3. `action`, `method`, real server submission, JavaScript form events, `select`, `textarea`, `fieldset`, `legend`, advanced validation, and larger form architecture are intentionally deferred. Checkbox and radio controls are introduced for recognition and safe experimentation but are not required by the final Module 4 practice. The module explicitly teaches that `input` is a void element, `required` is a boolean attribute, `id` and `name` have different jobs, radio options share a `name` to form a group, and browser validation is useful feedback rather than trusted server-side validation.

## Academy 2.1P — HTML Intern Module 5 reference

HTML Intern Module 5 (`html.intern.4`) now completes the zero-experience HTML track by introducing semantic page regions and accessibility as meaning-first HTML rather than as a list of extra attributes. The teaching order is: semantic HTML/accessibility mental model, page `header`, one clear `main`, major `nav`, themed `section`, self-contained `article`, page `footer`, logical source order, then a recap of headings, descriptive links, image `alt` text and connected form labels from earlier modules. Its persistent module position remains unchanged.

Formal practice and assessment prompts are restricted to `header`, `nav`, `main`, `section`, `article`, `footer`, logical `h1`/`h2`/`h3` hierarchy, descriptive links, and HTML fundamentals already taught in Modules 1–4. Advanced ARIA roles/states/properties, complex accessible-name rules, skip-link engineering, custom widgets, CSS layout/accessibility interactions, and professional accessibility auditing are intentionally deferred. ARIA is introduced only as a later tool: Intern is taught to prefer correct native HTML first and not to add redundant ARIA merely because it sounds more accessible.

## CSS Intern specific rule

CSS Intern must assume the learner does not yet know what CSS is, how it relates to HTML, or what the punctuation inside a CSS rule means. Before requiring them in an Intern assessment, the curriculum must explicitly teach:

- the different jobs of HTML structure and CSS presentation
- what a stylesheet and `.css` file are at a beginner-friendly level
- selector, rule/ruleset, declaration block and declaration vocabulary
- `{` and `}` as the declaration-block boundaries
- property, `:`, value and `;` as the basic declaration grammar
- element selectors
- class selectors and the leading `.`
- the relationship between `.card` in CSS and `class="card"` in HTML
- id selectors and the leading `#` at a basic recognition/use level
- the relationship between `#featured` in CSS and `id="featured"` in HTML
- the simplest safe cascade rule: when otherwise-equal selectors set the same property, the later declaration wins
- how to recognize basic CSS syntax mistakes and distinguish a valid selector that matches nothing from invalid declaration syntax

Do not begin CSS Intern by assuming that terms such as selector, property, declaration, class, id, cascade or specificity are already understood. Full specificity calculation, `!important`, selector combinators, pseudo-classes, pseudo-elements, cascade layers and other advanced conflict rules are intentionally deferred until the learner has a reliable mental model of basic rule grammar.

## Academy 2.1Q — CSS Intern Module 1 reference

CSS Intern Module 1 (`css.intern.0`) now starts before CSS syntax itself: CSS versus HTML, stylesheet, selector, rule, declaration block, property/value grammar and the punctuation `{ } : ;`. It then introduces one element selector, a reusable class selector, a basic id selector, and only afterward the simplest equal-selector/source-order form of the cascade. Its persistent module position remains unchanged.

Formal practice and assessment prompts are restricted to element/class/id selectors, `color`/`background-color` as simple demonstration properties, and the basic selector `{ property: value; }` grammar explicitly introduced in this module. Padding, border, box-model sizing, Flexbox, Grid, media queries, selector combinators, pseudo-selectors, `!important`, specificity arithmetic and other later CSS topics are intentionally not required here. Module 2 remains responsible for teaching color and typography in depth; Module 1 only uses simple named color values so the learner can see CSS grammar clearly.


## Academy 2.1R — CSS Intern Module 2 reference

CSS Intern Module 2 (`css.intern.1`) now treats color and typography as a new beginner layer built on Module 1's rule grammar. The teaching order is: foreground `color`, `background-color`, named colors, six-digit hex colors, the contextual difference between `#featured` as an id selector and `#1d4ed8` as a color value, `font-family` plus comma-separated fallbacks, `px`, `rem`, `font-weight`, unitless `line-height`, and `text-align`. Its persistent module position remains unchanged.

Formal practice and assessment prompts are restricted to those properties/value formats plus selector/rule syntax already taught in Module 1. `rgb()`/`hsl()` and newer color functions, web-font loading, `@font-face`, variable fonts, `clamp()`, viewport units, `letter-spacing`, text decoration systems, responsive typography, custom-property design tokens, and layout/box-model properties are intentionally deferred. The module explicitly teaches that valid CSS can still be difficult to read when foreground/background contrast is poor, and that `text-align` aligns inline text rather than replacing layout tools.

## Academy 2.1S — CSS Intern Module 3 reference

CSS Intern Module 3 (`css.intern.2`) now teaches spacing and sizing from the box-model mental model instead of beginning with a global reset pattern. The teaching order is: content box, `width` / `height`, single-value `padding`, border shorthand, single-value `margin`, the default `content-box` calculation, and finally `box-sizing: border-box`. Its persistent module position remains unchanged.

Formal practice and assessment prompts are restricted to `width`, `height` recognition, `padding`, `border`, `margin`, `box-sizing`, `content-box` / `border-box`, and length/color syntax already taught in CSS Intern Modules 1–2. Side-specific spacing properties, multi-value shorthand patterns, margin-collapsing edge cases, outline, min/max sizing, overflow, percentages, viewport units, global universal-selector resets, pseudo-elements, Flexbox and Grid are intentionally deferred. The module explicitly teaches inside-versus-outside spacing, how padding and border increase a `content-box`, why `border-box` is easier to predict, and why unnecessary fixed heights can fail when content grows.


## Academy 2.1T — CSS Intern Module 4 reference

CSS Intern Module 4 (`css.intern.3`) now introduces Flexbox from the parent-child layout mental model rather than beginning with a dense toolbar recipe. The teaching order is: layout/flex-container/flex-item vocabulary, `display: flex`, an explicit `flex-direction: row`, main axis versus cross axis, `justify-content` (`flex-start`, `center`, `space-between`), `align-items: center`, `gap`, and finally a simple `flex-direction: column` comparison so the learner sees that the axes—not the property meanings—change. Its persistent module position remains unchanged.

Formal practice and assessment prompts are restricted to `display: flex`, `flex-direction`, `row`, the taught `justify-content` values, `align-items: center`, and pixel `gap`, plus selector/length concepts already taught in CSS Intern Modules 1–3. `flex-wrap`, `flex-grow`, `flex-shrink`, `flex-basis`, the `flex` shorthand, `order`, `align-self`, multi-line alignment, Grid, media queries, and responsive breakpoint logic are intentionally deferred. The module explicitly teaches that Flexbox is controlled by the parent, only direct children become flex items, `justify-content` follows the main axis rather than always meaning horizontal, and `gap` is different from padding and margin.

## Academy 2.1U — CSS Intern Module 5 reference

CSS Intern Module 5 (`css.intern.4`) now completes the zero-experience CSS track without leaking CSS Grid down from Junior. The teaching order is: responsive-design purpose, viewport, percentage width, `max-width`, a base Flexbox row reused from Module 4, the syntax and plain-English meaning of `@media (max-width: 700px)`, breakpoint vocabulary, then a single narrow-layout override from `flex-direction: row` to `flex-direction: column`. Its persistent module position remains unchanged.

Formal practice and assessment prompts are restricted to percentage widths, `max-width`, pixel breakpoint lengths, `@media`, and Flexbox properties already taught in CSS Intern Modules 1–4. CSS Grid, `grid-template-columns`, `fr`, `repeat()`, `minmax()`, container queries, `clamp()`, viewport units, advanced media features, mobile-first architecture debates, and professional breakpoint systems are intentionally deferred. The module explicitly teaches that `max-width` is a ceiling rather than a fixed width, that a breakpoint is chosen where the layout needs to change rather than representing a universal device category, and that responsive design can begin with fluid sizing plus a very small conditional override.
