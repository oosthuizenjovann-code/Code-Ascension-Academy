export const CHEAT_SHEETS = [
  {
    id: 'html-document-semantics',
    language: 'html',
    title: 'HTML Document & Semantics',
    summary: 'The core document skeleton, structural landmarks, headings and meaningful content elements.',
    sections: [
      { title: 'Document skeleton', rows: [
        ['<!doctype html>', 'Declares modern HTML.'],
        ['<html lang="en">', 'Root element; lang helps accessibility and language tools.'],
        ['<head>', 'Metadata, title, stylesheets and other document resources.'],
        ['<meta charset="utf-8">', 'Uses UTF-8 character encoding.'],
        ['<meta name="viewport" content="width=device-width, initial-scale=1">', 'Makes responsive layouts behave correctly on mobile.'],
        ['<body>', 'Contains the visible page content.']
      ]},
      { title: 'Semantic landmarks', rows: [
        ['<header>', 'Introductory content for a page or section.'],
        ['<nav>', 'Primary or meaningful groups of navigation links.'],
        ['<main>', 'The page’s primary content; normally one per document.'],
        ['<section>', 'A themed section, usually with a heading.'],
        ['<article>', 'Self-contained content that can stand on its own.'],
        ['<aside>', 'Related but secondary content.'],
        ['<footer>', 'Closing information for a page or section.']
      ]},
      { title: 'Text structure', rows: [
        ['<h1>…<h6>', 'Heading hierarchy. Use levels for structure, not visual size.'],
        ['<p>', 'Paragraph of prose.'],
        ['<strong>', 'Strong importance.'],
        ['<em>', 'Stress emphasis.'],
        ['<code>', 'Inline code fragment.'],
        ['<pre>', 'Preformatted text where whitespace matters.']
      ]}
    ]
  },
  {
    id: 'html-forms-accessibility',
    language: 'html',
    title: 'HTML Forms & Accessibility',
    summary: 'Common form controls and the accessibility habits worth memorising early.',
    sections: [
      { title: 'Form controls', rows: [
        ['<form>', 'Groups controls for submission.'],
        ['<label for="email">', 'Associates visible text with an input id.'],
        ['<input type="email">', 'Email input with browser validation support.'],
        ['<textarea>', 'Multi-line text input.'],
        ['<select> / <option>', 'Choose from predefined options.'],
        ['<button type="submit">', 'Explicit submit button.']
      ]},
      { title: 'Accessibility checklist', rows: [
        ['alt="…"', 'Describe meaningful images; use alt="" for decorative images.'],
        ['for + id', 'Connect every visible label to its control.'],
        ['button', 'Prefer native buttons over clickable divs.'],
        ['heading order', 'Keep headings logical and meaningful.'],
        ['link text', 'Describe the destination instead of using “click here”.'],
        ['aria-*', 'Use ARIA only when native HTML cannot express the needed semantics.']
      ]}
    ]
  },
  {
    id: 'html-elements-attributes',
    language: 'html',
    title: 'HTML Elements & Attributes',
    summary: 'A compact reference for links, lists, media, tables and useful global attributes.',
    sections: [
      { title: 'Common elements', rows: [
        ['<a href="…">', 'Hyperlink.'],
        ['<img src="…" alt="…">', 'Image with text alternative.'],
        ['<ul> / <ol> / <li>', 'Unordered, ordered and list-item structure.'],
        ['<figure> / <figcaption>', 'Media plus its caption.'],
        ['<table> / <thead> / <tbody> / <tr> / <th> / <td>', 'Tabular data.'],
        ['<details> / <summary>', 'Native disclosure widget.']
      ]},
      { title: 'Useful attributes', rows: [
        ['id', 'Unique document identifier.'],
        ['class', 'Reusable hook for CSS and JavaScript.'],
        ['data-*', 'Custom application data attached to an element.'],
        ['hidden', 'Hides content from rendering.'],
        ['required', 'Marks a form control as mandatory.'],
        ['disabled', 'Makes an interactive control unavailable.']
      ]}
    ]
  },
  {
    id: 'css-cascade-selectors',
    language: 'css',
    title: 'CSS Selectors & Cascade',
    summary: 'Selector patterns, specificity, inheritance and cascade concepts.',
    sections: [
      { title: 'Selectors', rows: [
        ['.card', 'Class selector.'],
        ['#main', 'ID selector.'],
        ['article p', 'Descendant selector.'],
        ['nav > a', 'Direct-child selector.'],
        ['input[type="email"]', 'Attribute selector.'],
        [':hover / :focus-visible', 'State pseudo-classes.'],
        ['::before / ::after', 'Generated pseudo-elements.']
      ]},
      { title: 'Cascade rules', rows: [
        ['origin + importance', 'Author/user/UA origins and !important participate first.'],
        ['@layer', 'Explicitly controls cascade-layer order.'],
        ['specificity', 'IDs > classes/attributes/pseudo-classes > elements.'],
        ['scope/proximity', 'Closer scoped rules can win when supported and otherwise tied.'],
        ['source order', 'Later declaration wins when earlier cascade factors tie.'],
        ['inheritance', 'Some properties, such as color and font, inherit by default.']
      ]}
    ]
  },
  {
    id: 'css-layout',
    language: 'css',
    title: 'CSS Box Model, Flexbox & Grid',
    summary: 'The layout properties used constantly in modern interfaces.',
    sections: [
      { title: 'Box model', rows: [
        ['box-sizing: border-box', 'Width/height include padding and border.'],
        ['margin', 'Space outside the border.'],
        ['padding', 'Space between content and border.'],
        ['border', 'Edge around the padding/content box.'],
        ['overflow', 'Controls content that exceeds its box.']
      ]},
      { title: 'Flexbox', rows: [
        ['display: flex', 'Creates a flex formatting context.'],
        ['flex-direction', 'Main-axis direction.'],
        ['justify-content', 'Main-axis distribution.'],
        ['align-items', 'Cross-axis alignment.'],
        ['gap', 'Space between flex/grid children.'],
        ['flex: 1', 'Common shorthand for a flexible item.']
      ]},
      { title: 'Grid', rows: [
        ['display: grid', 'Creates a grid formatting context.'],
        ['grid-template-columns', 'Defines column tracks.'],
        ['repeat(3, 1fr)', 'Three equal flexible columns.'],
        ['minmax(0, 1fr)', 'Flexible track that can shrink below content size.'],
        ['grid-column / grid-row', 'Places/spans items across tracks.'],
        ['place-items', 'Shorthand for align-items + justify-items.']
      ]}
    ]
  },
  {
    id: 'css-responsive',
    language: 'css',
    title: 'CSS Responsive & Modern Sizing',
    summary: 'Responsive units, media/container queries and useful sizing functions.',
    sections: [
      { title: 'Responsive tools', rows: [
        ['@media (max-width: 768px)', 'Viewport-based conditional styles.'],
        ['@container', 'Styles based on a containing element’s size.'],
        ['rem', 'Root-font-relative unit; useful for scalable sizing.'],
        ['vw / vh / dvh', 'Viewport-relative units.'],
        ['%', 'Relative to a relevant containing dimension.'],
        ['aspect-ratio', 'Maintains a width/height ratio.']
      ]},
      { title: 'Sizing functions', rows: [
        ['min()', 'Uses the smallest supplied value.'],
        ['max()', 'Uses the largest supplied value.'],
        ['clamp(min, preferred, max)', 'Fluid value constrained by lower/upper bounds.'],
        ['min-content', 'Intrinsic minimum content size.'],
        ['max-content', 'Intrinsic maximum content size.'],
        ['fit-content()', 'Clamps intrinsic size to an available limit.']
      ]}
    ]
  },
  {
    id: 'javascript-core',
    language: 'javascript',
    title: 'JavaScript Core Syntax',
    summary: 'Variables, equality, conditions, loops and functions at a glance.',
    sections: [
      { title: 'Core syntax', rows: [
        ['const value = 10', 'Binding that cannot be reassigned.'],
        ['let value = 10', 'Block-scoped mutable binding.'],
        ['=== / !==', 'Strict equality/inequality. Prefer these by default.'],
        ['if / else', 'Conditional control flow.'],
        ['for / while', 'Loop constructs.'],
        ['function add(a, b) { … }', 'Function declaration.'],
        ['const add = (a, b) => a + b', 'Arrow-function expression.']
      ]},
      { title: 'Useful operators', rows: [
        ['?.', 'Optional chaining.'],
        ['??', 'Nullish coalescing.'],
        ['...', 'Spread/rest syntax depending on context.'],
        ['&& / ||', 'Logical AND / OR and short-circuit evaluation.'],
        ['condition ? a : b', 'Conditional/ternary expression.']
      ]}
    ]
  },
  {
    id: 'javascript-arrays-objects',
    language: 'javascript',
    title: 'JavaScript Arrays & Objects',
    summary: 'Common collection operations and object syntax.',
    sections: [
      { title: 'Array methods', rows: [
        ['map(fn)', 'Transforms every item into a new array.'],
        ['filter(fn)', 'Keeps items whose callback returns truthy.'],
        ['find(fn)', 'Returns the first matching item.'],
        ['some(fn)', 'True if at least one item matches.'],
        ['every(fn)', 'True if every item matches.'],
        ['reduce(fn, initial)', 'Combines items into one accumulated result.'],
        ['forEach(fn)', 'Runs side-effect work for each item.']
      ]},
      { title: 'Objects', rows: [
        ['const player = { health: 100 }', 'Object literal.'],
        ['player.health', 'Dot-property access.'],
        ['player["health"]', 'Bracket-property access.'],
        ['const { health } = player', 'Object destructuring.'],
        ['{ ...player, health: 80 }', 'Shallow copy with property override.'],
        ['Object.keys(obj)', 'Array of enumerable own property names.']
      ]}
    ]
  },
  {
    id: 'javascript-dom-async',
    language: 'javascript',
    title: 'JavaScript DOM, Events & Async',
    summary: 'Browser interaction and asynchronous programming quick reference.',
    sections: [
      { title: 'DOM & events', rows: [
        ['document.querySelector(".card")', 'Finds the first matching element.'],
        ['document.querySelectorAll(".card")', 'Returns all matching elements.'],
        ['element.addEventListener("click", fn)', 'Registers an event listener.'],
        ['element.textContent', 'Reads/sets plain text.'],
        ['element.classList.add("active")', 'Manipulates classes.'],
        ['element.dataset.id', 'Reads data-id.']
      ]},
      { title: 'Async', rows: [
        ['async function load() { … }', 'Function that returns a Promise.'],
        ['await promise', 'Waits for Promise settlement inside async code.'],
        ['fetch(url)', 'Starts an HTTP request and returns a Promise<Response>.'],
        ['try / catch', 'Handles synchronous errors and awaited rejections.'],
        ['Promise.all([...])', 'Waits for multiple Promises concurrently.'],
        ['AbortController', 'Supports cancellation in APIs such as fetch.']
      ]}
    ]
  },
  {
    id: 'csharp-core',
    language: 'csharp',
    title: 'C# Types, Control Flow & Methods',
    summary: 'Core C# syntax for values, conditions, loops and methods.',
    sections: [
      { title: 'Common types', rows: [
        ['int', '32-bit signed integer.'],
        ['double', 'Double-precision floating-point number.'],
        ['decimal', 'High-precision decimal value, often preferred for money.'],
        ['bool', 'true or false.'],
        ['char', 'Single UTF-16 code unit.'],
        ['string', 'Sequence of characters.'],
        ['var', 'Compiler infers the local variable’s type.']
      ]},
      { title: 'Control and methods', rows: [
        ['if / else', 'Conditional control flow.'],
        ['switch', 'Pattern/value-based branching.'],
        ['for / foreach / while', 'Loop constructs.'],
        ['return', 'Returns a result or exits a method.'],
        ['void DoWork()', 'Method with no returned value.'],
        ['int Add(int a, int b)', 'Typed parameters and return type.']
      ]}
    ]
  },
  {
    id: 'csharp-oop',
    language: 'csharp',
    title: 'C# Classes, Interfaces & Records',
    summary: 'Core object-oriented syntax and modern data-model constructs.',
    sections: [
      { title: 'Types and members', rows: [
        ['class Player { }', 'Reference-type class declaration.'],
        ['public int Health { get; set; }', 'Auto-implemented property.'],
        ['public Player(int health) { … }', 'Constructor.'],
        ['interface IDamageable { … }', 'Contract implemented by types.'],
        ['record PlayerState(int Health)', 'Concise value-oriented reference record.'],
        ['override', 'Replaces a virtual/abstract base implementation.']
      ]},
      { title: 'Access modifiers', rows: [
        ['public', 'Accessible everywhere permitted by containing visibility.'],
        ['private', 'Accessible only inside the containing type.'],
        ['protected', 'Accessible in the containing type and derived types.'],
        ['internal', 'Accessible inside the same assembly.']
      ]}
    ]
  },
  {
    id: 'csharp-collections-linq',
    language: 'csharp',
    title: 'C# Collections & LINQ',
    summary: 'Frequently used generic collections and LINQ operators.',
    sections: [
      { title: 'Collections', rows: [
        ['T[]', 'Fixed-size array.'],
        ['List<T>', 'Resizable ordered collection.'],
        ['Dictionary<TKey, TValue>', 'Key/value lookup collection.'],
        ['HashSet<T>', 'Set of unique values.'],
        ['Queue<T>', 'First-in, first-out collection.'],
        ['Stack<T>', 'Last-in, first-out collection.']
      ]},
      { title: 'LINQ', rows: [
        ['Where(predicate)', 'Filters a sequence.'],
        ['Select(selector)', 'Projects/transforms items.'],
        ['OrderBy(key)', 'Sorts ascending by a key.'],
        ['Any(predicate)', 'Checks whether any item matches.'],
        ['FirstOrDefault(predicate)', 'Returns first match or default.'],
        ['ToList()', 'Materialises an enumerable into a List<T>.']
      ]}
    ]
  },
  {
    id: 'csharp-async-errors',
    language: 'csharp',
    title: 'C# Async, Exceptions & Nullability',
    summary: 'Common patterns for asynchronous work, exceptions and nullable references.',
    sections: [
      { title: 'Async', rows: [
        ['async Task MethodAsync()', 'Asynchronous method with no result value.'],
        ['async Task<T>', 'Asynchronous method returning a result.'],
        ['await task', 'Asynchronously waits for task completion.'],
        ['CancellationToken', 'Cooperative cancellation signal.'],
        ['Task.WhenAll(tasks)', 'Waits for multiple tasks concurrently.']
      ]},
      { title: 'Errors & nulls', rows: [
        ['try / catch / finally', 'Exception handling and guaranteed cleanup block.'],
        ['throw', 'Raises an exception.'],
        ['string?', 'Nullable reference annotation.'],
        ['value?.Member', 'Null-conditional access.'],
        ['value ?? fallback', 'Null-coalescing fallback.'],
        ['ArgumentNullException.ThrowIfNull(value)', 'Guard against a null argument.']
      ]}
    ]
  }
];

export function getCheatSheet(id) {
  return CHEAT_SHEETS.find(sheet => sheet.id === id) || null;
}
