const ACADEMY_TOPIC_DATA = {
  "html": {
    "intern": [
      {
        "title": "Document Structure & Syntax",
        "summary": "Learn the skeleton every HTML page is built from and how elements, attributes, nesting, and document metadata fit together.",
        "concepts": [
          {
            "name": "Document skeleton",
            "explanation": "A modern document starts with a doctype, then an html root. The head stores metadata and resource links; the body contains content that participates in the visible page."
          },
          {
            "name": "Elements and attributes",
            "explanation": "Elements give content structure. Attributes add extra information such as an id, language, URL, or input type. Attribute values should be quoted consistently."
          },
          {
            "name": "Nesting and validity",
            "explanation": "Elements form a tree. Closing tags should match the element you opened, and child elements must be placed where the HTML content model permits them."
          }
        ],
        "example": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>Academy Profile</title>\n</head>\n<body>\n  <h1>Code Ascension</h1>\n  <p>I am learning HTML.</p>\n</body>\n</html>",
        "challenge": "Create a valid small HTML document with a doctype, a title, one h1, and one paragraph.",
        "hint": "Start with <!doctype html>, then create html, head, title, body, h1 and p in that nesting order.",
        "solution": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>Academy Profile</title>\n</head>\n<body>\n  <h1>Code Ascension</h1>\n  <p>I am learning HTML.</p>\n</body>\n</html>",
        "groups": [
          [
            "<!doctype html>"
          ],
          [
            "<title"
          ],
          [
            "<h1"
          ],
          [
            "<p"
          ]
        ],
        "references": [
          {
            "title": "MDN — Structuring content with HTML",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content"
          },
          {
            "title": "MDN — HTML reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Text, Headings & Meaning",
        "summary": "Use text-level elements to communicate hierarchy and meaning instead of choosing tags only for their default appearance.",
        "concepts": [
          {
            "name": "Heading hierarchy",
            "explanation": "Use h1 through h6 to describe section hierarchy. Avoid skipping levels simply to make text look smaller; CSS is responsible for appearance."
          },
          {
            "name": "Paragraphs and phrasing",
            "explanation": "Paragraphs group prose. strong marks importance, em adds stress emphasis, and elements such as code, mark, small, sub, and sup carry specific meaning."
          },
          {
            "name": "Semantics first",
            "explanation": "Semantic HTML helps browsers, search engines, and assistive technology understand content. A meaningful element is usually better than a generic div plus styling."
          }
        ],
        "example": "<article>\n  <h1>Learning Log</h1>\n  <h2>Day One</h2>\n  <p>I learned that <strong>meaning matters</strong> in HTML.</p>\n  <p>Use <code>&lt;em&gt;</code> for <em>stress emphasis</em>.</p>\n</article>",
        "challenge": "Write an article with an h1, an h2, two paragraphs, and at least one strong or em element.",
        "hint": "Build the heading hierarchy first, then add prose beneath the correct heading.",
        "solution": "<article>\n  <h1>Learning Log</h1>\n  <h2>Day One</h2>\n  <p>I learned that <strong>meaning matters</strong> in HTML.</p>\n  <p>Use <code>&lt;em&gt;</code> for <em>stress emphasis</em>.</p>\n</article>",
        "groups": [
          [
            "<article"
          ],
          [
            "<h1"
          ],
          [
            "<h2"
          ],
          [
            "<p"
          ],
          [
            "<strong",
            "<em"
          ]
        ],
        "references": [
          {
            "title": "MDN — Structuring content with HTML",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content"
          },
          {
            "title": "MDN — HTML accessibility",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Links, Images & Lists",
        "summary": "Connect documents, embed meaningful images, and represent grouped or ordered information with the correct list structure.",
        "concepts": [
          {
            "name": "Anchors",
            "explanation": "The a element creates a hyperlink. href identifies the destination; link text should explain where the link goes instead of saying only “click here”."
          },
          {
            "name": "Images and alternatives",
            "explanation": "img uses src for the image resource and alt for a text alternative. Decorative images normally use an empty alt value so screen readers can ignore them."
          },
          {
            "name": "Lists",
            "explanation": "Use ul when order does not matter, ol when sequence matters, and li for each item. Description lists use dl, dt, and dd for terms and descriptions."
          }
        ],
        "example": "<nav aria-label=\"Learning links\">\n  <ul>\n    <li><a href=\"lessons.html\">Lessons</a></li>\n    <li><a href=\"tests.html\">Tests</a></li>\n  </ul>\n</nav>\n<img src=\"academy-badge.png\" alt=\"Code Ascension academy badge\">",
        "challenge": "Create a list containing at least three useful links and add an image with alt text.",
        "hint": "Use one ul or ol, place each link inside an li, and remember both src and alt on the image.",
        "solution": "<nav aria-label=\"Learning links\">\n  <ul>\n    <li><a href=\"lessons.html\">Lessons</a></li>\n    <li><a href=\"tests.html\">Tests</a></li>\n  </ul>\n</nav>\n<img src=\"academy-badge.png\" alt=\"Code Ascension academy badge\">",
        "groups": [
          [
            "<ul",
            "<ol"
          ],
          [
            "<li"
          ],
          [
            "<a"
          ],
          [
            "href="
          ],
          [
            "<img"
          ],
          [
            "alt="
          ]
        ],
        "references": [
          {
            "title": "MDN — Structuring content with HTML",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content"
          },
          {
            "title": "MDN — HTML accessibility",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Forms & Basic Controls",
        "summary": "Collect user input with native controls that already provide keyboard behavior, semantics, and browser features.",
        "concepts": [
          {
            "name": "Form ownership",
            "explanation": "form groups controls that belong to one submission. action describes where data goes and method describes how it is submitted."
          },
          {
            "name": "Labels",
            "explanation": "A label should be programmatically associated with its input, usually with for=\"id\". This enlarges the clickable target and gives assistive technology a usable name."
          },
          {
            "name": "Control types",
            "explanation": "input supports many types including text, email, number, checkbox, radio, date, and password. textarea and select cover longer text and predefined choices."
          }
        ],
        "example": "<form action=\"/profile\" method=\"post\">\n  <label for=\"name\">Display name</label>\n  <input id=\"name\" name=\"name\" type=\"text\" required>\n\n  <label for=\"email\">Email</label>\n  <input id=\"email\" name=\"email\" type=\"email\" required>\n\n  <button type=\"submit\">Save profile</button>\n</form>",
        "challenge": "Create a form with labelled name and email fields plus a submit button.",
        "hint": "Give each input an id, then point the matching label for attribute at that id.",
        "solution": "<form action=\"/profile\" method=\"post\">\n  <label for=\"name\">Display name</label>\n  <input id=\"name\" name=\"name\" type=\"text\" required>\n\n  <label for=\"email\">Email</label>\n  <input id=\"email\" name=\"email\" type=\"email\" required>\n\n  <button type=\"submit\">Save profile</button>\n</form>",
        "groups": [
          [
            "<form"
          ],
          [
            "<label"
          ],
          [
            "type=\"email\"",
            "type=email"
          ],
          [
            "<button"
          ],
          [
            "type=\"submit\"",
            "type=submit"
          ]
        ],
        "references": [
          {
            "title": "MDN — Web forms",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms"
          },
          {
            "title": "MDN — HTML accessibility",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Semantic Page Structure & Accessibility Basics",
        "summary": "Combine structural elements into a page that is understandable when styles are removed or when it is navigated with assistive technology.",
        "concepts": [
          {
            "name": "Landmarks",
            "explanation": "header, nav, main, aside, and footer create useful page regions. A document should normally have one main landmark for its primary content."
          },
          {
            "name": "Sections and articles",
            "explanation": "section groups a themed part of a document and typically has a heading. article is for self-contained content that could stand on its own."
          },
          {
            "name": "Built-in accessibility",
            "explanation": "Start with correct native elements, meaningful headings, useful link text, alt text, and labels. ARIA is not a substitute for correct HTML."
          }
        ],
        "example": "<header>\n  <h1>Code Ascension</h1>\n  <nav aria-label=\"Primary\"><a href=\"#roadmap\">Roadmap</a></nav>\n</header>\n<main id=\"roadmap\">\n  <section>\n    <h2>Current path</h2>\n    <article><h3>HTML Intern</h3><p>Five modules in progress.</p></article>\n  </section>\n</main>\n<footer><p>Local learning build</p></footer>",
        "challenge": "Build a page fragment with header, nav, main, section, article and footer, using headings in a logical hierarchy.",
        "hint": "Imagine the page with all CSS disabled. The structure and reading order should still make sense.",
        "solution": "<header>\n  <h1>Code Ascension</h1>\n  <nav aria-label=\"Primary\"><a href=\"#roadmap\">Roadmap</a></nav>\n</header>\n<main id=\"roadmap\">\n  <section>\n    <h2>Current path</h2>\n    <article><h3>HTML Intern</h3><p>Five modules in progress.</p></article>\n  </section>\n</main>\n<footer><p>Local learning build</p></footer>",
        "groups": [
          [
            "<header"
          ],
          [
            "<nav"
          ],
          [
            "<main"
          ],
          [
            "<section"
          ],
          [
            "<article"
          ],
          [
            "<footer"
          ]
        ],
        "references": [
          {
            "title": "MDN — Structuring content with HTML",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content"
          },
          {
            "title": "MDN — HTML accessibility",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      }
    ],
    "junior": [
      {
        "title": "Tables & Data Semantics",
        "summary": "Represent genuinely tabular data with captions, header cells, row/column scope, and a structure that remains understandable to assistive technology.",
        "concepts": [
          {
            "name": "Table anatomy",
            "explanation": "table contains rows. thead, tbody, and tfoot group row regions; tr is a row, th is a header cell, and td is a data cell."
          },
          {
            "name": "Headers and scope",
            "explanation": "Use th for headers and scope=\"col\" or scope=\"row\" when the relationship is not obvious. These relationships help screen readers announce context."
          },
          {
            "name": "Use tables for data",
            "explanation": "Tables are for data relationships, not page layout. CSS Grid and Flexbox are the correct tools for general visual layout."
          }
        ],
        "example": "<table>\n  <caption>Class test results</caption>\n  <thead><tr><th scope=\"col\">Module</th><th scope=\"col\">Score</th></tr></thead>\n  <tbody>\n    <tr><th scope=\"row\">HTML</th><td>92%</td></tr>\n    <tr><th scope=\"row\">CSS</th><td>88%</td></tr>\n  </tbody>\n</table>",
        "challenge": "Create a two-column data table with a caption, column headers, and at least two data rows.",
        "hint": "Start with table and caption, then create thead for column labels and tbody for the records.",
        "solution": "<table>\n  <caption>Class test results</caption>\n  <thead><tr><th scope=\"col\">Module</th><th scope=\"col\">Score</th></tr></thead>\n  <tbody>\n    <tr><th scope=\"row\">HTML</th><td>92%</td></tr>\n    <tr><th scope=\"row\">CSS</th><td>88%</td></tr>\n  </tbody>\n</table>",
        "groups": [
          [
            "<table"
          ],
          [
            "<caption"
          ],
          [
            "<th"
          ],
          [
            "scope="
          ],
          [
            "<td"
          ]
        ],
        "references": [
          {
            "title": "MDN — HTML reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML"
          },
          {
            "title": "MDN — HTML accessibility",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Audio, Video & Timed Tracks",
        "summary": "Embed media with native controls, fallbacks, captions, and multiple sources where useful.",
        "concepts": [
          {
            "name": "Native media",
            "explanation": "audio and video can expose built-in controls with the controls attribute. Browsers can select from multiple source elements."
          },
          {
            "name": "Captions and subtitles",
            "explanation": "track can provide captions, subtitles, descriptions, chapters, or metadata using WebVTT files. Captions are important for accessibility."
          },
          {
            "name": "Fallbacks and preload",
            "explanation": "Provide fallback text or links when media cannot play. preload is a hint; do not assume the browser will always download exactly as requested."
          }
        ],
        "example": "<video controls width=\"640\" poster=\"lesson-poster.jpg\">\n  <source src=\"lesson.webm\" type=\"video/webm\">\n  <source src=\"lesson.mp4\" type=\"video/mp4\">\n  <track src=\"lesson-en.vtt\" kind=\"captions\" srclang=\"en\" label=\"English\" default>\n  <p><a href=\"lesson.mp4\">Download the lesson video</a>.</p>\n</video>",
        "challenge": "Create a video element with controls, at least one source, and a captions track.",
        "hint": "The important nesting is video → source/track/fallback content.",
        "solution": "<video controls width=\"640\" poster=\"lesson-poster.jpg\">\n  <source src=\"lesson.webm\" type=\"video/webm\">\n  <source src=\"lesson.mp4\" type=\"video/mp4\">\n  <track src=\"lesson-en.vtt\" kind=\"captions\" srclang=\"en\" label=\"English\" default>\n  <p><a href=\"lesson.mp4\">Download the lesson video</a>.</p>\n</video>",
        "groups": [
          [
            "<video"
          ],
          [
            "controls"
          ],
          [
            "<source"
          ],
          [
            "<track"
          ],
          [
            "kind=\"captions\"",
            "kind=captions"
          ]
        ],
        "references": [
          {
            "title": "MDN — HTML reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML"
          },
          {
            "title": "MDN — HTML accessibility",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Advanced Forms & Native Validation",
        "summary": "Use richer input types, grouping, autocomplete, constraint attributes, and accessible error-friendly structure before adding JavaScript.",
        "concepts": [
          {
            "name": "Constraint attributes",
            "explanation": "required, minlength, maxlength, min, max, step, and pattern let browsers reject many invalid values without custom JavaScript."
          },
          {
            "name": "Grouping controls",
            "explanation": "fieldset groups related controls and legend gives the group a name. This is especially helpful for radio buttons and related checkboxes."
          },
          {
            "name": "Autocomplete",
            "explanation": "autocomplete tokens help browsers and password managers understand what a field represents. Correct tokens can improve both speed and accessibility."
          }
        ],
        "example": "<form>\n  <fieldset>\n    <legend>Notification preference</legend>\n    <label><input type=\"radio\" name=\"notice\" value=\"email\" required> Email</label>\n    <label><input type=\"radio\" name=\"notice\" value=\"sms\"> SMS</label>\n  </fieldset>\n  <label for=\"age\">Age</label>\n  <input id=\"age\" name=\"age\" type=\"number\" min=\"13\" max=\"120\" required>\n  <button>Continue</button>\n</form>",
        "challenge": "Build a form that uses fieldset/legend and at least two native validation attributes.",
        "hint": "Use required plus a type-specific constraint such as min/max, minlength, or pattern.",
        "solution": "<form>\n  <fieldset>\n    <legend>Notification preference</legend>\n    <label><input type=\"radio\" name=\"notice\" value=\"email\" required> Email</label>\n    <label><input type=\"radio\" name=\"notice\" value=\"sms\"> SMS</label>\n  </fieldset>\n  <label for=\"age\">Age</label>\n  <input id=\"age\" name=\"age\" type=\"number\" min=\"13\" max=\"120\" required>\n  <button>Continue</button>\n</form>",
        "groups": [
          [
            "<fieldset"
          ],
          [
            "<legend"
          ],
          [
            "required"
          ],
          [
            "min=",
            "max=",
            "minlength=",
            "pattern="
          ]
        ],
        "references": [
          {
            "title": "MDN — Web forms",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms"
          },
          {
            "title": "MDN — HTML accessibility",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Metadata, SEO & Document Head",
        "summary": "Use the head to describe encoding, viewport behavior, page identity, canonical resources, stylesheets, icons, and metadata for sharing/search.",
        "concepts": [
          {
            "name": "Essential metadata",
            "explanation": "charset should appear early. viewport metadata is important for mobile layout. title gives each document a meaningful browser/tab and search result label."
          },
          {
            "name": "Links and relationships",
            "explanation": "link can connect stylesheets, icons, canonical URLs, preloads, and other related resources to the document."
          },
          {
            "name": "Descriptions and robots",
            "explanation": "meta name=\"description\" can summarize the page for search results. Robots directives influence indexing but are not a security mechanism."
          }
        ],
        "example": "<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>HTML Junior — Code Ascension</title>\n  <meta name=\"description\" content=\"Study HTML Junior lessons and class tests.\">\n  <link rel=\"stylesheet\" href=\"styles.css\">\n  <link rel=\"icon\" href=\"favicon.svg\" type=\"image/svg+xml\">\n</head>",
        "challenge": "Write a head section with charset, viewport, title, description and stylesheet link.",
        "hint": "Metadata belongs inside head, not body. Treat the title and description as user-facing content.",
        "solution": "<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>HTML Junior — Code Ascension</title>\n  <meta name=\"description\" content=\"Study HTML Junior lessons and class tests.\">\n  <link rel=\"stylesheet\" href=\"styles.css\">\n  <link rel=\"icon\" href=\"favicon.svg\" type=\"image/svg+xml\">\n</head>",
        "groups": [
          [
            "<head"
          ],
          [
            "charset="
          ],
          [
            "name=\"viewport\"",
            "name=viewport"
          ],
          [
            "<title"
          ],
          [
            "name=\"description\"",
            "name=description"
          ],
          [
            "rel=\"stylesheet\"",
            "rel=stylesheet"
          ]
        ],
        "references": [
          {
            "title": "MDN — HTML reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Responsive Images & Art Direction",
        "summary": "Serve appropriate images for different pixel densities, viewport sizes, and compositions with srcset, sizes, picture, and source.",
        "concepts": [
          {
            "name": "Resolution switching",
            "explanation": "srcset can offer multiple image widths or pixel densities. sizes describes the displayed width so the browser can choose an efficient candidate."
          },
          {
            "name": "Art direction",
            "explanation": "picture and source let you provide different crops or formats for different conditions rather than merely resizing the same composition."
          },
          {
            "name": "Fallback image",
            "explanation": "picture still ends with an img element. That img supplies the fallback source and the alt text for the image as a whole."
          }
        ],
        "example": "<picture>\n  <source media=\"(max-width: 600px)\" srcset=\"academy-mobile.jpg\">\n  <source type=\"image/avif\" srcset=\"academy.avif\">\n  <img src=\"academy.jpg\" srcset=\"academy-800.jpg 800w, academy-1600.jpg 1600w\"\n       sizes=\"(max-width: 700px) 100vw, 700px\" alt=\"Code Ascension roadmap\">\n</picture>",
        "challenge": "Create a responsive image using picture/source and an img fallback with srcset or sizes.",
        "hint": "The img element is still required at the end of picture and owns the alt text.",
        "solution": "<picture>\n  <source media=\"(max-width: 600px)\" srcset=\"academy-mobile.jpg\">\n  <source type=\"image/avif\" srcset=\"academy.avif\">\n  <img src=\"academy.jpg\" srcset=\"academy-800.jpg 800w, academy-1600.jpg 1600w\"\n       sizes=\"(max-width: 700px) 100vw, 700px\" alt=\"Code Ascension roadmap\">\n</picture>",
        "groups": [
          [
            "<picture"
          ],
          [
            "<source"
          ],
          [
            "<img"
          ],
          [
            "srcset="
          ],
          [
            "alt="
          ]
        ],
        "references": [
          {
            "title": "MDN — HTML reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      }
    ],
    "intermediate": [
      {
        "title": "Accessible Naming, Landmarks & Source Order",
        "summary": "Go beyond basic semantics by reasoning about accessible names, landmark labels, keyboard order, and how DOM source order affects users.",
        "concepts": [
          {
            "name": "Accessible names",
            "explanation": "Controls need a reliable name from visible text, label, alt, aria-label, or aria-labelledby. Prefer visible native labels when possible."
          },
          {
            "name": "Landmark labels",
            "explanation": "When several nav or region landmarks exist, label them so users can distinguish “Primary navigation” from “Course navigation”."
          },
          {
            "name": "Source order",
            "explanation": "Keyboard and screen-reader navigation generally follow DOM order. Avoid using CSS to create a visual order that contradicts the logical reading order."
          }
        ],
        "example": "<header>\n  <nav aria-label=\"Primary\"><a href=\"/\">Home</a></nav>\n</header>\n<main>\n  <section aria-labelledby=\"progress-title\">\n    <h2 id=\"progress-title\">Progress</h2>\n    <button type=\"button\">Open progress details</button>\n  </section>\n</main>",
        "challenge": "Create two nav landmarks with distinct accessible labels and one section labelled by its heading.",
        "hint": "Use aria-label on repeated nav landmarks and aria-labelledby to connect a section with an existing visible heading.",
        "solution": "<header>\n  <nav aria-label=\"Primary\"><a href=\"/\">Home</a></nav>\n</header>\n<main>\n  <section aria-labelledby=\"progress-title\">\n    <h2 id=\"progress-title\">Progress</h2>\n    <button type=\"button\">Open progress details</button>\n  </section>\n</main>",
        "groups": [
          [
            "<nav"
          ],
          [
            "aria-label="
          ],
          [
            "aria-labelledby="
          ],
          [
            "<h2",
            "<h1"
          ]
        ],
        "references": [
          {
            "title": "MDN — HTML accessibility",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Embedded Content & Sandboxed Frames",
        "summary": "Embed external documents deliberately and restrict capabilities when third-party content does not need full trust.",
        "concepts": [
          {
            "name": "iframe",
            "explanation": "iframe embeds another browsing context. Always give important frames a useful title so assistive technology can identify them."
          },
          {
            "name": "sandbox",
            "explanation": "sandbox removes capabilities from framed content until specific tokens are granted. Add only the permissions the embedded content actually needs."
          },
          {
            "name": "Loading and privacy",
            "explanation": "loading=\"lazy\" can defer off-screen frames. referrerpolicy can control what referrer information is sent to the embedded resource."
          }
        ],
        "example": "<iframe\n  src=\"practice-preview.html\"\n  title=\"Practice preview\"\n  loading=\"lazy\"\n  sandbox=\"allow-scripts\"\n  referrerpolicy=\"no-referrer\">\n</iframe>",
        "challenge": "Create an iframe with a title, lazy loading, and a sandbox attribute.",
        "hint": "Start from the most restricted sandbox and add permissions only when the embedded page needs them.",
        "solution": "<iframe\n  src=\"practice-preview.html\"\n  title=\"Practice preview\"\n  loading=\"lazy\"\n  sandbox=\"allow-scripts\"\n  referrerpolicy=\"no-referrer\">\n</iframe>",
        "groups": [
          [
            "<iframe"
          ],
          [
            "title="
          ],
          [
            "loading=\"lazy\"",
            "loading=lazy"
          ],
          [
            "sandbox="
          ]
        ],
        "references": [
          {
            "title": "MDN — HTML reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Native Interactive Elements",
        "summary": "Use built-in disclosure, dialog, and popover primitives before recreating their behavior with generic div elements.",
        "concepts": [
          {
            "name": "details and summary",
            "explanation": "details creates a disclosure widget and summary supplies its label. The open attribute controls initial state."
          },
          {
            "name": "dialog",
            "explanation": "dialog represents a dialog box. JavaScript can use show(), showModal(), and close(); method=\"dialog\" forms can close a dialog with a return value."
          },
          {
            "name": "Popover",
            "explanation": "The popover attribute gives lightweight top-layer behavior to ordinary elements, while popovertarget connects controls to them without a full custom widget implementation."
          }
        ],
        "example": "<details>\n  <summary>Show hint</summary>\n  <p>Remember to associate labels with inputs.</p>\n</details>\n\n<button popovertarget=\"reference-card\">Open reference</button>\n<div id=\"reference-card\" popover>\n  <p>Read the HTML reference.</p>\n</div>",
        "challenge": "Create one details/summary disclosure and one popover controlled by a button.",
        "hint": "Use the id of the popover as the button's popovertarget value.",
        "solution": "<details>\n  <summary>Show hint</summary>\n  <p>Remember to associate labels with inputs.</p>\n</details>\n\n<button popovertarget=\"reference-card\">Open reference</button>\n<div id=\"reference-card\" popover>\n  <p>Read the HTML reference.</p>\n</div>",
        "groups": [
          [
            "<details"
          ],
          [
            "<summary"
          ],
          [
            "popover"
          ],
          [
            "popovertarget="
          ]
        ],
        "references": [
          {
            "title": "MDN — HTML reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Data Attributes & Machine-Readable Values",
        "summary": "Attach application-specific metadata with data-* while keeping visible meaning in normal HTML and using dedicated elements for dates, measurements, and machine values.",
        "concepts": [
          {
            "name": "data-* attributes",
            "explanation": "Custom data attributes store small pieces of application metadata on elements. JavaScript reads them through element.dataset."
          },
          {
            "name": "time",
            "explanation": "time can pair human-readable text with a machine-readable datetime value, useful for dates and durations."
          },
          {
            "name": "data and meter",
            "explanation": "data associates displayed content with a machine-readable value. meter represents a scalar measurement within a known range; progress represents task completion."
          }
        ],
        "example": "<article data-course=\"html\" data-rank=\"intermediate\">\n  <h2>Assessment window</h2>\n  <p>Opens <time datetime=\"2026-09-01T09:00:00+02:00\">tomorrow morning</time>.</p>\n  <label for=\"mastery\">Mastery</label>\n  <meter id=\"mastery\" min=\"0\" max=\"100\" value=\"82\">82%</meter>\n</article>",
        "challenge": "Create an element with two data-* attributes and include a time element with datetime.",
        "hint": "Custom data names must start with data-. Use datetime for the machine-readable date or time.",
        "solution": "<article data-course=\"html\" data-rank=\"intermediate\">\n  <h2>Assessment window</h2>\n  <p>Opens <time datetime=\"2026-09-01T09:00:00+02:00\">tomorrow morning</time>.</p>\n  <label for=\"mastery\">Mastery</label>\n  <meter id=\"mastery\" min=\"0\" max=\"100\" value=\"82\">82%</meter>\n</article>",
        "groups": [
          [
            "data-"
          ],
          [
            "<time"
          ],
          [
            "datetime="
          ]
        ],
        "references": [
          {
            "title": "MDN — HTML reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Templates, Slots & Component-Friendly Markup",
        "summary": "Prepare reusable DOM fragments and meaningful fallback structures that work well with JavaScript and Web Components.",
        "concepts": [
          {
            "name": "template",
            "explanation": "template stores inert DOM content. Its children are parsed but are not rendered or executed until JavaScript clones the template content."
          },
          {
            "name": "slot",
            "explanation": "Inside a shadow tree, slot defines insertion points for light-DOM content. Named slots let consumers provide different pieces of a component."
          },
          {
            "name": "Fallback content",
            "explanation": "Component-friendly markup should still consider meaningful fallback content and progressive enhancement instead of assuming JavaScript always succeeds."
          }
        ],
        "example": "<template id=\"lesson-card-template\">\n  <article class=\"lesson-card\">\n    <h3 class=\"lesson-title\"></h3>\n    <p class=\"lesson-summary\"></p>\n  </article>\n</template>\n\n<code-academy-card>\n  <span slot=\"title\">HTML Intermediate</span>\n</code-academy-card>",
        "challenge": "Create a template containing a reusable article and demonstrate a named slot assignment on custom-element content.",
        "hint": "The template itself is inert. Put the reusable markup inside it, then use slot=\"name\" on content intended for a named slot.",
        "solution": "<template id=\"lesson-card-template\">\n  <article class=\"lesson-card\">\n    <h3 class=\"lesson-title\"></h3>\n    <p class=\"lesson-summary\"></p>\n  </article>\n</template>\n\n<code-academy-card>\n  <span slot=\"title\">HTML Intermediate</span>\n</code-academy-card>",
        "groups": [
          [
            "<template"
          ],
          [
            "<article"
          ],
          [
            "slot="
          ]
        ],
        "references": [
          {
            "title": "MDN — HTML reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      }
    ],
    "senior": [
      {
        "title": "Parsing, DOM Construction & Content Models",
        "summary": "Reason about how browsers parse markup into a DOM tree, recover from invalid markup, and apply element content rules.",
        "concepts": [
          {
            "name": "Parsing is corrective",
            "explanation": "HTML parsers perform error recovery. Invalid source can produce a DOM tree that differs from what the indentation suggests, especially around tables and misnested formatting elements."
          },
          {
            "name": "Content models",
            "explanation": "Elements have rules describing what categories of content they may contain and where they may appear. Valid markup reduces cross-browser surprises and accessibility defects."
          },
          {
            "name": "DOM versus source",
            "explanation": "Developer tools show the parsed DOM, not necessarily the exact source text. Debug structural bugs by comparing the DOM tree with the markup you intended."
          }
        ],
        "example": "<!doctype html>\n<html lang=\"en\">\n<head><meta charset=\"utf-8\"><title>Parsing Lab</title></head>\n<body>\n  <main>\n    <section>\n      <h1>Valid nesting</h1>\n      <p>Inspect this DOM in developer tools.</p>\n    </section>\n  </main>\n</body>\n</html>",
        "challenge": "Write a small document with intentionally careful, valid nesting and explain its main DOM parent/child relationships in comments.",
        "hint": "Keep block-level structure explicit and close every non-void element in the reverse order in which it was opened.",
        "solution": "<!doctype html>\n<html lang=\"en\">\n<head><meta charset=\"utf-8\"><title>Parsing Lab</title></head>\n<body>\n  <main>\n    <section>\n      <h1>Valid nesting</h1>\n      <p>Inspect this DOM in developer tools.</p>\n    </section>\n  </main>\n</body>\n</html>",
        "groups": [
          [
            "<!doctype html>"
          ],
          [
            "<html"
          ],
          [
            "<main"
          ],
          [
            "<section"
          ]
        ],
        "references": [
          {
            "title": "MDN — HTML reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Form Semantics, Ownership & Constraint Strategy",
        "summary": "Design larger forms by understanding form ownership, successful controls, submission names, button behavior, and native constraint validation.",
        "concepts": [
          {
            "name": "Names drive submission",
            "explanation": "A form control normally needs a name to contribute a name/value pair to form submission. id is for document identity; name is for submitted data."
          },
          {
            "name": "Form-associated controls",
            "explanation": "Some controls can be associated with a form using the form attribute even when they are not physically nested inside it."
          },
          {
            "name": "Validation strategy",
            "explanation": "Use HTML constraints for rules the browser can express, then layer JavaScript and server-side validation for business rules. Client-side validation is never a security boundary."
          }
        ],
        "example": "<form id=\"profile-form\" action=\"/profile\" method=\"post\">\n  <label for=\"username\">Username</label>\n  <input id=\"username\" name=\"username\" minlength=\"3\" maxlength=\"24\" required>\n</form>\n<button type=\"submit\" form=\"profile-form\">Save profile</button>",
        "challenge": "Create a form with a named required input and place its submit button outside the form using the form attribute.",
        "hint": "The button form value must equal the form element id.",
        "solution": "<form id=\"profile-form\" action=\"/profile\" method=\"post\">\n  <label for=\"username\">Username</label>\n  <input id=\"username\" name=\"username\" minlength=\"3\" maxlength=\"24\" required>\n</form>\n<button type=\"submit\" form=\"profile-form\">Save profile</button>",
        "groups": [
          [
            "<form"
          ],
          [
            "name="
          ],
          [
            "required"
          ],
          [
            "form="
          ],
          [
            "type=\"submit\"",
            "type=submit"
          ]
        ],
        "references": [
          {
            "title": "MDN — Web forms",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Resource Loading & HTML Performance Hints",
        "summary": "Use native loading controls to reduce unnecessary work while understanding that hints are advisory rather than guarantees.",
        "concepts": [
          {
            "name": "Lazy loading",
            "explanation": "loading=\"lazy\" can defer off-screen images and iframes, reducing initial network and decoding work when those resources are not immediately needed."
          },
          {
            "name": "Priority hints",
            "explanation": "fetchpriority can hint whether a resource deserves high or low priority. Use it sparingly; incorrect priorities can make the page slower."
          },
          {
            "name": "Preload and preconnect",
            "explanation": "link rel=\"preload\" can request a known critical resource early, while preconnect can establish a connection to an important origin. Measure before adding many hints."
          }
        ],
        "example": "<head>\n  <link rel=\"preload\" href=\"hero.avif\" as=\"image\" type=\"image/avif\" fetchpriority=\"high\">\n  <link rel=\"preconnect\" href=\"https://fonts.example.com\" crossorigin>\n</head>\n<body>\n  <img src=\"hero.avif\" alt=\"Academy dashboard\" fetchpriority=\"high\">\n  <img src=\"optional-chart.png\" alt=\"Progress chart\" loading=\"lazy\" decoding=\"async\">\n</body>",
        "challenge": "Create markup that eagerly prioritizes one hero image and lazily loads a noncritical image.",
        "hint": "Use fetchpriority on the critical image and loading=\"lazy\" on content that starts off-screen.",
        "solution": "<head>\n  <link rel=\"preload\" href=\"hero.avif\" as=\"image\" type=\"image/avif\" fetchpriority=\"high\">\n  <link rel=\"preconnect\" href=\"https://fonts.example.com\" crossorigin>\n</head>\n<body>\n  <img src=\"hero.avif\" alt=\"Academy dashboard\" fetchpriority=\"high\">\n  <img src=\"optional-chart.png\" alt=\"Progress chart\" loading=\"lazy\" decoding=\"async\">\n</body>",
        "groups": [
          [
            "fetchpriority="
          ],
          [
            "loading=\"lazy\"",
            "loading=lazy"
          ],
          [
            "<img"
          ]
        ],
        "references": [
          {
            "title": "MDN — HTML reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Internationalization & Bidirectional Text",
        "summary": "Mark language and direction correctly so pronunciation, line breaking, fonts, search, and bidirectional text behave predictably.",
        "concepts": [
          {
            "name": "Language metadata",
            "explanation": "lang should describe the natural language of a document or a specific fragment. Assistive technology may use it to choose pronunciation rules."
          },
          {
            "name": "Direction",
            "explanation": "dir can be ltr, rtl, or auto. Use bdi to isolate text whose direction is unknown so it does not disturb surrounding punctuation."
          },
          {
            "name": "Language-specific markup",
            "explanation": "ruby can annotate East Asian text, while time and data can pair localized display text with machine-readable values."
          }
        ],
        "example": "<html lang=\"en\">\n<body>\n  <p>English text with an Arabic username: <bdi>مريم</bdi>.</p>\n  <p lang=\"ar\" dir=\"rtl\">مرحبا بكم في الأكاديمية</p>\n  <time datetime=\"2026-08-31\">31 August 2026</time>\n</body>\n</html>",
        "challenge": "Create one fragment in a second language with lang and dir, and isolate an unknown-direction username using bdi.",
        "hint": "Language and text direction are separate ideas; set both when the fragment needs both.",
        "solution": "<html lang=\"en\">\n<body>\n  <p>English text with an Arabic username: <bdi>مريم</bdi>.</p>\n  <p lang=\"ar\" dir=\"rtl\">مرحبا بكم في الأكاديمية</p>\n  <time datetime=\"2026-08-31\">31 August 2026</time>\n</body>\n</html>",
        "groups": [
          [
            "lang="
          ],
          [
            "dir="
          ],
          [
            "<bdi"
          ]
        ],
        "references": [
          {
            "title": "MDN — HTML reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML"
          },
          {
            "title": "MDN — HTML accessibility",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Markup Security Boundaries",
        "summary": "Recognize which HTML features affect trust boundaries and how attributes can reduce risk without replacing server security.",
        "concepts": [
          {
            "name": "Untrusted frames",
            "explanation": "Sandbox third-party iframes and grant the smallest capability set possible. Combining broad tokens can weaken the isolation you expected."
          },
          {
            "name": "External navigation",
            "explanation": "When opening external pages in a new tab, understand opener relationships and use appropriate rel values when needed. Modern browsers add protections, but explicit intent is clearer."
          },
          {
            "name": "HTML is not sanitization",
            "explanation": "Never insert untrusted HTML simply because it “looks like text”. Sanitization and safe DOM APIs are application responsibilities beyond markup alone."
          }
        ],
        "example": "<a href=\"https://example.org\" target=\"_blank\" rel=\"noopener noreferrer\">External reference</a>\n<iframe\n  src=\"https://third-party.example/widget\"\n  title=\"External widget\"\n  sandbox=\"allow-scripts\"\n  referrerpolicy=\"no-referrer\">\n</iframe>",
        "challenge": "Create a safe external link that opens a new tab and a sandboxed third-party iframe with a title.",
        "hint": "Think in capabilities: navigation relationship, referrer information, scripts, forms, and same-origin access are separate concerns.",
        "solution": "<a href=\"https://example.org\" target=\"_blank\" rel=\"noopener noreferrer\">External reference</a>\n<iframe\n  src=\"https://third-party.example/widget\"\n  title=\"External widget\"\n  sandbox=\"allow-scripts\"\n  referrerpolicy=\"no-referrer\">\n</iframe>",
        "groups": [
          [
            "target=\"_blank\"",
            "target=_blank"
          ],
          [
            "rel="
          ],
          [
            "<iframe"
          ],
          [
            "sandbox="
          ],
          [
            "title="
          ]
        ],
        "references": [
          {
            "title": "MDN — HTML reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      }
    ],
    "advanced": [
      {
        "title": "Complex Accessible Data & Controls",
        "summary": "Build dense documents where tables, forms, descriptions, and native controls preserve relationships for keyboard and screen-reader users.",
        "concepts": [
          {
            "name": "Complex table headers",
            "explanation": "For multi-level tables, use multiple th cells and id/headers relationships when simple scope is insufficient to express the header associations."
          },
          {
            "name": "Control instructions",
            "explanation": "Instructions and errors should be connected to controls using visible text and relationships such as aria-describedby when native labeling alone is not enough."
          },
          {
            "name": "Native first",
            "explanation": "Use button, input, select, details, and dialog before inventing custom controls. Every custom interaction adds focus, keyboard, state, and announcement responsibilities."
          }
        ],
        "example": "<table>\n  <caption>Module scores</caption>\n  <thead>\n    <tr><th id=\"student\">Student</th><th id=\"html\">HTML</th><th id=\"css\">CSS</th></tr>\n  </thead>\n  <tbody>\n    <tr><th id=\"diaan\" headers=\"student\">Learner</th><td headers=\"diaan html\">92</td><td headers=\"diaan css\">88</td></tr>\n  </tbody>\n</table>",
        "challenge": "Create a table that demonstrates explicit id/headers relationships for at least one data cell.",
        "hint": "Give header cells ids, then list the relevant header ids in the data cell headers attribute.",
        "solution": "<table>\n  <caption>Module scores</caption>\n  <thead>\n    <tr><th id=\"student\">Student</th><th id=\"html\">HTML</th><th id=\"css\">CSS</th></tr>\n  </thead>\n  <tbody>\n    <tr><th id=\"diaan\" headers=\"student\">Learner</th><td headers=\"diaan html\">92</td><td headers=\"diaan css\">88</td></tr>\n  </tbody>\n</table>",
        "groups": [
          [
            "<table"
          ],
          [
            "id="
          ],
          [
            "headers="
          ],
          [
            "<th"
          ],
          [
            "<td"
          ]
        ],
        "references": [
          {
            "title": "MDN — HTML accessibility",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML"
          },
          {
            "title": "MDN — HTML reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Progressive Enhancement & Resilient Markup",
        "summary": "Design the HTML layer so core content and actions remain understandable before CSS and JavaScript enhance them.",
        "concepts": [
          {
            "name": "Baseline first",
            "explanation": "Start with a meaningful document, real links, real buttons, and real form submission. Enhancement should add convenience without erasing the baseline capability."
          },
          {
            "name": "Fallback strategy",
            "explanation": "Use fallback text, source alternatives, noscript only when appropriate, and server-compatible links/forms when a feature is important."
          },
          {
            "name": "Component contracts",
            "explanation": "Reusable components should define clear semantic input: heading levels, labels, link destinations, and form names. Styling hooks should not be the only meaning."
          }
        ],
        "example": "<form action=\"/search\" method=\"get\" class=\"search-widget\">\n  <label for=\"q\">Search lessons</label>\n  <input id=\"q\" name=\"q\" type=\"search\">\n  <button type=\"submit\">Search</button>\n</form>\n<p class=\"enhancement-note\">JavaScript may enhance results without removing the normal form action.</p>",
        "challenge": "Build a useful interaction that still has a meaningful native behavior before JavaScript runs.",
        "hint": "Forms with real action/method values and anchors with real href values are strong progressive-enhancement foundations.",
        "solution": "<form action=\"/search\" method=\"get\" class=\"search-widget\">\n  <label for=\"q\">Search lessons</label>\n  <input id=\"q\" name=\"q\" type=\"search\">\n  <button type=\"submit\">Search</button>\n</form>\n<p class=\"enhancement-note\">JavaScript may enhance results without removing the normal form action.</p>",
        "groups": [
          [
            "<form"
          ],
          [
            "action="
          ],
          [
            "method="
          ],
          [
            "<button"
          ],
          [
            "name="
          ]
        ],
        "references": [
          {
            "title": "MDN — Structuring content with HTML",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content"
          },
          {
            "title": "MDN — HTML accessibility",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "High-Performance Media Markup",
        "summary": "Combine responsive source selection, modern formats, intrinsic dimensions, loading priorities, and accessible alternatives for media-heavy pages.",
        "concepts": [
          {
            "name": "Avoid layout shifts",
            "explanation": "Give images width and height when the intrinsic ratio is known so the browser can reserve space before the file finishes loading."
          },
          {
            "name": "Format selection",
            "explanation": "picture can offer modern formats such as AVIF or WebP before a broadly supported fallback. The browser chooses the first supported source that matches."
          },
          {
            "name": "Loading priority",
            "explanation": "Critical above-the-fold media may need eager loading and high priority, while below-the-fold media can be lazy. Measure real page behavior instead of applying one rule everywhere."
          }
        ],
        "example": "<picture>\n  <source type=\"image/avif\" srcset=\"hero-800.avif 800w, hero-1600.avif 1600w\">\n  <source type=\"image/webp\" srcset=\"hero-800.webp 800w, hero-1600.webp 1600w\">\n  <img src=\"hero-800.jpg\" srcset=\"hero-1600.jpg 1600w\" sizes=\"100vw\"\n       width=\"1600\" height=\"900\" fetchpriority=\"high\" alt=\"Academy learning roadmap\">\n</picture>",
        "challenge": "Create a picture with two modern-format source elements and a sized img fallback.",
        "hint": "Order source elements from preferred modern format to fallback; the final img carries alt and intrinsic dimensions.",
        "solution": "<picture>\n  <source type=\"image/avif\" srcset=\"hero-800.avif 800w, hero-1600.avif 1600w\">\n  <source type=\"image/webp\" srcset=\"hero-800.webp 800w, hero-1600.webp 1600w\">\n  <img src=\"hero-800.jpg\" srcset=\"hero-1600.jpg 1600w\" sizes=\"100vw\"\n       width=\"1600\" height=\"900\" fetchpriority=\"high\" alt=\"Academy learning roadmap\">\n</picture>",
        "groups": [
          [
            "<picture"
          ],
          [
            "type=\"image/avif\"",
            "type=image/avif"
          ],
          [
            "<img"
          ],
          [
            "width="
          ],
          [
            "height="
          ],
          [
            "alt="
          ]
        ],
        "references": [
          {
            "title": "MDN — HTML reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Parser Edge Cases, Validation & Debugging",
        "summary": "Diagnose markup that appears valid at a glance but produces unexpected DOM trees because the HTML parser repairs or relocates nodes.",
        "concepts": [
          {
            "name": "Inspect the DOM",
            "explanation": "When layout or scripting behaves inexplicably, inspect the DOM tree. Invalid table descendants, omitted elements, and misnesting can cause parser corrections."
          },
          {
            "name": "Validate systematically",
            "explanation": "Use an HTML validator during development, but also test semantics and accessibility; syntactic validity does not automatically mean the document is usable."
          },
          {
            "name": "Minimize ambiguity",
            "explanation": "Prefer explicit structure in complex components. Clear sectioning, form ownership, and table grouping make both maintenance and parser behavior easier to reason about."
          }
        ],
        "example": "<table>\n  <caption>Validated structure</caption>\n  <thead><tr><th scope=\"col\">Topic</th><th scope=\"col\">Status</th></tr></thead>\n  <tbody><tr><td>HTML</td><td>Valid</td></tr></tbody>\n</table>",
        "challenge": "Create a valid table and add HTML comments identifying its parent/child structure for debugging practice.",
        "hint": "After writing it, inspect the Elements/DOM panel and verify the tree matches your mental model.",
        "solution": "<table>\n  <caption>Validated structure</caption>\n  <thead><tr><th scope=\"col\">Topic</th><th scope=\"col\">Status</th></tr></thead>\n  <tbody><tr><td>HTML</td><td>Valid</td></tr></tbody>\n</table>",
        "groups": [
          [
            "<table"
          ],
          [
            "<thead"
          ],
          [
            "<tbody"
          ],
          [
            "<tr"
          ],
          [
            "<td"
          ]
        ],
        "references": [
          {
            "title": "MDN — HTML reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Professional HTML Audit Capstone",
        "summary": "Audit a realistic document for semantics, accessibility, forms, metadata, performance, internationalization, and maintainability as one connected system.",
        "concepts": [
          {
            "name": "Audit by layers",
            "explanation": "Review document metadata, landmark structure, heading hierarchy, links/images, forms, tables/media, loading behavior, and language information separately before judging the whole page."
          },
          {
            "name": "Prefer native solutions",
            "explanation": "Replacing generic clickable containers with native controls often removes several bugs at once: keyboard behavior, semantics, focusability, and activation."
          },
          {
            "name": "Document tradeoffs",
            "explanation": "Senior work includes explaining why a chosen structure is appropriate, which browser behavior it relies on, and what fallback exists if enhancement fails."
          }
        ],
        "example": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Code Ascension Dashboard</title>\n  <meta name=\"description\" content=\"Private programming learning dashboard.\">\n</head>\n<body>\n  <header><h1>Code Ascension</h1><nav aria-label=\"Primary\"><a href=\"#courses\">Courses</a></nav></header>\n  <main id=\"courses\"><section aria-labelledby=\"course-title\"><h2 id=\"course-title\">Courses</h2><button type=\"button\">Resume lesson</button></section></main>\n  <footer><p>Progress stored locally.</p></footer>\n</body>\n</html>",
        "challenge": "Create a compact but production-minded HTML document that includes metadata, landmarks, meaningful headings, and one native interaction.",
        "hint": "Treat this as a code review exercise: every element should have a reason to exist, and the page should still make sense with CSS and JS disabled.",
        "solution": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Code Ascension Dashboard</title>\n  <meta name=\"description\" content=\"Private programming learning dashboard.\">\n</head>\n<body>\n  <header><h1>Code Ascension</h1><nav aria-label=\"Primary\"><a href=\"#courses\">Courses</a></nav></header>\n  <main id=\"courses\"><section aria-labelledby=\"course-title\"><h2 id=\"course-title\">Courses</h2><button type=\"button\">Resume lesson</button></section></main>\n  <footer><p>Progress stored locally.</p></footer>\n</body>\n</html>",
        "groups": [
          [
            "<!doctype html>"
          ],
          [
            "name=\"viewport\"",
            "name=viewport"
          ],
          [
            "<header"
          ],
          [
            "<nav"
          ],
          [
            "<main"
          ],
          [
            "<button"
          ]
        ],
        "references": [
          {
            "title": "MDN — Structuring content with HTML",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content"
          },
          {
            "title": "MDN — HTML accessibility",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML"
          },
          {
            "title": "MDN — HTML reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML"
          }
        ],
        "pitfalls": [],
        "mastery": []
      }
    ]
  },
  "css": {
    "intern": [
      {
        "title": "Selectors, Rules & the Cascade",
        "summary": "Learn the basic grammar of CSS: choose elements with selectors, declare properties and values, and understand why one competing rule wins.",
        "concepts": [
          {
            "name": "Rulesets",
            "explanation": "A ruleset combines a selector with a declaration block. Each declaration is a property/value pair such as color: white."
          },
          {
            "name": "Selectors",
            "explanation": "Type, class, and id selectors target different sets of elements. Classes are the normal reusable styling hook; ids are unique document identifiers."
          },
          {
            "name": "Cascade basics",
            "explanation": "When rules target the same property, origin, importance, specificity, and source order determine which declaration wins."
          }
        ],
        "example": "body {\n  background: #0b1220;\n  color: #eaf2ff;\n}\n\n.card {\n  border: 1px solid #28405f;\n  padding: 1rem;\n}",
        "challenge": "Style the page background/text and create a reusable .card class with padding and a border.",
        "hint": "Use one body rule and one class selector beginning with a dot.",
        "solution": "body {\n  background: #0b1220;\n  color: #eaf2ff;\n}\n\n.card {\n  border: 1px solid #28405f;\n  padding: 1rem;\n}",
        "groups": [
          [
            "body"
          ],
          [
            ".card"
          ],
          [
            "padding"
          ],
          [
            "border"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS styling basics",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics"
          },
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Color, Fonts & Text",
        "summary": "Control readable typography using color, font families, sizes, weights, line height, alignment, and spacing.",
        "concepts": [
          {
            "name": "Color values",
            "explanation": "CSS accepts named colors, hex, rgb()/rgba(), hsl(), and newer color functions. Good contrast matters more than choosing a fashionable notation."
          },
          {
            "name": "Font stack",
            "explanation": "font-family should normally include fallback fonts or a generic family such as sans-serif or monospace."
          },
          {
            "name": "Readable text",
            "explanation": "font-size, line-height, letter-spacing, max-width, and spacing all affect readability. Avoid using tiny text or low contrast as decoration."
          }
        ],
        "example": "body {\n  color: #dce8f7;\n  font-family: Inter, system-ui, sans-serif;\n  line-height: 1.6;\n}\n\nh1 {\n  font-size: 2.5rem;\n  letter-spacing: 0.03em;\n}",
        "challenge": "Create readable body typography and give h1 a larger size and deliberate letter spacing.",
        "hint": "Start with font-family and line-height on body so descendants inherit useful defaults.",
        "solution": "body {\n  color: #dce8f7;\n  font-family: Inter, system-ui, sans-serif;\n  line-height: 1.6;\n}\n\nh1 {\n  font-size: 2.5rem;\n  letter-spacing: 0.03em;\n}",
        "groups": [
          [
            "font-family"
          ],
          [
            "line-height"
          ],
          [
            "font-size"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS styling basics",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics"
          },
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Box Model & Spacing",
        "summary": "Reason about every element as content surrounded by padding, border, and margin, then control sizing predictably with box-sizing.",
        "concepts": [
          {
            "name": "Four layers",
            "explanation": "Content is the inner box. Padding adds interior space, border surrounds padding, and margin creates space outside the border."
          },
          {
            "name": "box-sizing",
            "explanation": "With border-box, declared width and height include padding and border. Many projects apply box-sizing: border-box globally for easier sizing."
          },
          {
            "name": "Margin behavior",
            "explanation": "Vertical margins between normal block elements can collapse in some situations. Gap, padding, or layout systems can be clearer when you need explicit spacing."
          }
        ],
        "example": "*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n.panel {\n  width: 320px;\n  padding: 24px;\n  border: 2px solid #3d5b82;\n  margin: 16px;\n}",
        "challenge": "Create a .panel with width, padding, border and margin, and enable border-box sizing.",
        "hint": "Remember that margin is outside the border while padding is inside it.",
        "solution": "*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n.panel {\n  width: 320px;\n  padding: 24px;\n  border: 2px solid #3d5b82;\n  margin: 16px;\n}",
        "groups": [
          [
            "box-sizing"
          ],
          [
            "padding"
          ],
          [
            "border"
          ],
          [
            "margin"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS styling basics",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics"
          },
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Flexbox Fundamentals",
        "summary": "Lay out items in one dimension and control direction, wrapping, alignment, flexible growth, and spacing.",
        "concepts": [
          {
            "name": "Main and cross axes",
            "explanation": "flex-direction defines the main axis. justify-content distributes items along the main axis; align-items controls the cross axis."
          },
          {
            "name": "Flexible sizing",
            "explanation": "flex-grow, flex-shrink, and flex-basis describe how an item participates when space is added or removed. The flex shorthand combines them."
          },
          {
            "name": "Wrapping and gap",
            "explanation": "flex-wrap allows items to move to another line. gap creates consistent spacing without margin tricks."
          }
        ],
        "example": ".toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n\n.toolbar__actions {\n  display: flex;\n  gap: 8px;\n}",
        "challenge": "Create a flex row that spaces major groups apart and allows wrapping on smaller widths.",
        "hint": "Set display:flex first, then think separately about main-axis and cross-axis alignment.",
        "solution": ".toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n\n.toolbar__actions {\n  display: flex;\n  gap: 8px;\n}",
        "groups": [
          [
            "display: flex",
            "display:flex"
          ],
          [
            "justify-content"
          ],
          [
            "align-items"
          ],
          [
            "gap"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS layout",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout"
          },
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Responsive Foundations",
        "summary": "Build layouts that adapt to available space using fluid dimensions, media queries, and content-driven breakpoints.",
        "concepts": [
          {
            "name": "Fluid first",
            "explanation": "Prefer flexible widths such as percentages, fr units, max-width, and min() before adding many media queries."
          },
          {
            "name": "Media queries",
            "explanation": "@media conditionally applies rules based on features such as viewport width, input capability, motion preference, or color scheme."
          },
          {
            "name": "Mobile-friendly sizing",
            "explanation": "The viewport meta tag belongs in HTML; CSS should then avoid fixed widths that force horizontal scrolling on narrow screens."
          }
        ],
        "example": ".course-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem;\n}\n\n@media (max-width: 700px) {\n  .course-grid {\n    grid-template-columns: 1fr;\n  }\n}",
        "challenge": "Create a two-column layout that becomes one column below 700px.",
        "hint": "Write the base layout first, then override only the property that must change inside @media.",
        "solution": ".course-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem;\n}\n\n@media (max-width: 700px) {\n  .course-grid {\n    grid-template-columns: 1fr;\n  }\n}",
        "groups": [
          [
            "@media"
          ],
          [
            "max-width"
          ],
          [
            "grid-template-columns"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS layout",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout"
          },
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      }
    ],
    "junior": [
      {
        "title": "Sizing, Units & Functions",
        "summary": "Choose units based on what a value should respond to, then use min(), max(), clamp(), and calc() to express relationships instead of magic numbers.",
        "concepts": [
          {
            "name": "Relative units",
            "explanation": "rem responds to the root font size, em responds to the current element, percentages depend on a reference size, and viewport units respond to the viewport."
          },
          {
            "name": "Content constraints",
            "explanation": "min-width, max-width, min-height, and max-height let a component be flexible without becoming unusably small or large."
          },
          {
            "name": "Math functions",
            "explanation": "calc() combines compatible units. min(), max(), and clamp() encode lower/upper bounds and fluid scaling directly in CSS."
          }
        ],
        "example": ".page {\n  width: min(92vw, 1100px);\n  margin-inline: auto;\n}\n\nh1 {\n  font-size: clamp(2rem, 5vw, 4.5rem);\n}",
        "challenge": "Create a centered container with a maximum width and a heading that scales fluidly using clamp().",
        "hint": "Use min() for container width and clamp(min, preferred, max) for the font size.",
        "solution": ".page {\n  width: min(92vw, 1100px);\n  margin-inline: auto;\n}\n\nh1 {\n  font-size: clamp(2rem, 5vw, 4.5rem);\n}",
        "groups": [
          [
            "min("
          ],
          [
            "clamp("
          ],
          [
            "margin-inline"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS styling basics",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics"
          },
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Positioning, Containing Blocks & z-index",
        "summary": "Control normal flow, offsets, sticky/fixed behavior, and stacking without using positioning as a substitute for layout.",
        "concepts": [
          {
            "name": "Position modes",
            "explanation": "relative keeps the element in normal flow while allowing offsets; absolute removes it from normal flow and positions it against a containing block; fixed attaches to a viewport-like reference."
          },
          {
            "name": "Sticky",
            "explanation": "position: sticky behaves like relative until a threshold such as top: 0 is crossed, then remains stuck within its scroll container."
          },
          {
            "name": "Stacking",
            "explanation": "z-index participates in stacking contexts. A huge z-index cannot escape an ancestor stacking context; first understand which element created the context."
          }
        ],
        "example": ".card {\n  position: relative;\n}\n\n.card__badge {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  z-index: 1;\n}\n\n.sidebar {\n  position: sticky;\n  top: 16px;\n}",
        "challenge": "Place a badge in the top-right of a card and make a sidebar sticky.",
        "hint": "The absolute badge needs a positioned ancestor; give the card position: relative.",
        "solution": ".card {\n  position: relative;\n}\n\n.card__badge {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  z-index: 1;\n}\n\n.sidebar {\n  position: sticky;\n  top: 16px;\n}",
        "groups": [
          [
            "position: relative",
            "position:relative"
          ],
          [
            "position: absolute",
            "position:absolute"
          ],
          [
            "position: sticky",
            "position:sticky"
          ],
          [
            "z-index"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS layout",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout"
          },
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "CSS Grid Fundamentals",
        "summary": "Use explicit rows and columns, flexible tracks, named areas, and item placement for two-dimensional layouts.",
        "concepts": [
          {
            "name": "Tracks",
            "explanation": "grid-template-columns and grid-template-rows define tracks. fr shares leftover space; minmax() gives a track flexible limits."
          },
          {
            "name": "Placement",
            "explanation": "Items can be placed with grid-column/grid-row or named areas. Auto-placement handles the rest of the items."
          },
          {
            "name": "Responsive grids",
            "explanation": "repeat(auto-fit, minmax(...)) can create grids that adapt to available width without a breakpoint for every card count."
          }
        ],
        "example": ".course-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 18px;\n}\n\n.featured {\n  grid-column: span 2;\n}",
        "challenge": "Create an auto-fitting card grid using minmax() and make one item span two columns.",
        "hint": "A useful responsive pattern is repeat(auto-fit, minmax(minimum, 1fr)).",
        "solution": ".course-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 18px;\n}\n\n.featured {\n  grid-column: span 2;\n}",
        "groups": [
          [
            "display: grid",
            "display:grid"
          ],
          [
            "repeat("
          ],
          [
            "minmax("
          ],
          [
            "grid-column"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS layout",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout"
          },
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Media Queries & Responsive Strategy",
        "summary": "Choose breakpoints when content needs them, and query user preferences and interaction capabilities in addition to width.",
        "concepts": [
          {
            "name": "Content breakpoints",
            "explanation": "Resize until the design stops working, then add a breakpoint. Device-name breakpoints age poorly because real devices vary."
          },
          {
            "name": "Preference queries",
            "explanation": "prefers-reduced-motion and prefers-color-scheme let your interface respect system-level user preferences."
          },
          {
            "name": "Capability queries",
            "explanation": "hover and pointer media features can help avoid hover-only experiences on touch-oriented devices."
          }
        ],
        "example": ".card-grid { grid-template-columns: repeat(3, 1fr); }\n\n@media (max-width: 820px) {\n  .card-grid { grid-template-columns: 1fr; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  * { scroll-behavior: auto !important; }\n}",
        "challenge": "Add one layout breakpoint and one prefers-reduced-motion rule.",
        "hint": "Responsive CSS is not only about width. Treat accessibility preferences as responsive inputs too.",
        "solution": ".card-grid { grid-template-columns: repeat(3, 1fr); }\n\n@media (max-width: 820px) {\n  .card-grid { grid-template-columns: 1fr; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  * { scroll-behavior: auto !important; }\n}",
        "groups": [
          [
            "@media"
          ],
          [
            "prefers-reduced-motion"
          ],
          [
            "max-width"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS layout",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout"
          },
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Transforms, Transitions & State Feedback",
        "summary": "Animate state changes efficiently with transforms and opacity while keeping motion purposeful and accessible.",
        "concepts": [
          {
            "name": "Transforms",
            "explanation": "transform can translate, scale, rotate, or skew an element without changing normal document flow."
          },
          {
            "name": "Transitions",
            "explanation": "transition animates between old and new computed values when a property changes. Prefer naming properties instead of transition: all."
          },
          {
            "name": "State design",
            "explanation": "Hover, focus-visible, active, disabled, and selected states should communicate meaning. Motion should support state feedback rather than distract from it."
          }
        ],
        "example": ".button {\n  transform: translateY(0);\n  transition: transform 160ms ease, box-shadow 160ms ease;\n}\n\n.button:hover,\n.button:focus-visible {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgb(0 180 255 / 0.22);\n}",
        "challenge": "Create a button hover/focus transition using transform and one other visual property.",
        "hint": "Animate a small set of deliberate properties and include :focus-visible, not only :hover.",
        "solution": ".button {\n  transform: translateY(0);\n  transition: transform 160ms ease, box-shadow 160ms ease;\n}\n\n.button:hover,\n.button:focus-visible {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgb(0 180 255 / 0.22);\n}",
        "groups": [
          [
            "transition:",
            "transition :"
          ],
          [
            "transform:",
            "transform :"
          ],
          [
            ":focus-visible"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      }
    ],
    "intermediate": [
      {
        "title": "Custom Properties, calc() & Design Tokens",
        "summary": "Create reusable values that participate in the cascade and can be overridden per component, theme, or state.",
        "concepts": [
          {
            "name": "Custom properties",
            "explanation": "Names beginning with -- store token-like values. var(--name, fallback) reads them at computed-value time and can provide a fallback."
          },
          {
            "name": "Cascade-powered theming",
            "explanation": "Because custom properties inherit and cascade, changing a token on an ancestor can theme an entire subtree without rewriting every component rule."
          },
          {
            "name": "Derived values",
            "explanation": "Combine tokens with calc(), min(), max(), clamp(), and color functions to derive component values instead of duplicating constants."
          }
        ],
        "example": ":root {\n  --space: 1rem;\n  --accent: #38d9ff;\n  --panel: #101a2a;\n}\n\n.card {\n  padding: calc(var(--space) * 1.5);\n  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);\n  background: var(--panel);\n}",
        "challenge": "Define at least three custom properties and use them in a component, including one calc() or color-mix() expression.",
        "hint": "Put global defaults on :root, then override tokens closer to a component when you need a local theme.",
        "solution": ":root {\n  --space: 1rem;\n  --accent: #38d9ff;\n  --panel: #101a2a;\n}\n\n.card {\n  padding: calc(var(--space) * 1.5);\n  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);\n  background: var(--panel);\n}",
        "groups": [
          [
            "--"
          ],
          [
            "var("
          ],
          [
            "calc(",
            "color-mix("
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Advanced Selectors & Relational Styling",
        "summary": "Use attribute selectors, combinators, structural pseudo-classes, :is(), :where(), :not(), and :has() while keeping selector intent readable.",
        "concepts": [
          {
            "name": "Functional pseudo-classes",
            "explanation": ":is() groups selector alternatives, :where() does the same with zero specificity, and :not() excludes matches."
          },
          {
            "name": "Relational selection",
            "explanation": ":has() can style an element based on matching descendants or relative selectors, enabling parent-like conditions that previously needed JavaScript."
          },
          {
            "name": "Selector cost is secondary",
            "explanation": "Modern engines handle selectors well; prioritize maintainability, scope, and predictable specificity before micro-optimizing selector speed."
          }
        ],
        "example": ".card:has(input:checked) {\n  border-color: #4fef9d;\n}\n\n:is(h1, h2, h3):where(.section-title) {\n  text-wrap: balance;\n}\n\nbutton:not(:disabled):hover {\n  transform: translateY(-1px);\n}",
        "challenge": "Write one :has() rule and one grouped rule using :is() or :where().",
        "hint": ":where() is especially useful when you want matching power without adding specificity.",
        "solution": ".card:has(input:checked) {\n  border-color: #4fef9d;\n}\n\n:is(h1, h2, h3):where(.section-title) {\n  text-wrap: balance;\n}\n\nbutton:not(:disabled):hover {\n  transform: translateY(-1px);\n}",
        "groups": [
          [
            ":has("
          ],
          [
            ":is(",
            ":where("
          ],
          [
            ":not("
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Keyframe Animation & Motion Systems",
        "summary": "Build multi-stage animations, compose timing and fill behavior, and provide reduced-motion alternatives.",
        "concepts": [
          {
            "name": "Keyframes",
            "explanation": "@keyframes defines intermediate states. animation-name, duration, timing-function, iteration-count, direction, and fill-mode control playback."
          },
          {
            "name": "Composable motion",
            "explanation": "Animate transform and opacity where possible for smooth visual feedback, and avoid motion that changes layout every frame unless necessary."
          },
          {
            "name": "Reduced motion",
            "explanation": "Use prefers-reduced-motion to remove or simplify nonessential animations. The goal is not always “zero motion”; it is avoiding harmful or distracting motion."
          }
        ],
        "example": "@keyframes pulse-ring {\n  0% { transform: scale(.95); opacity: .45; }\n  70% { transform: scale(1.08); opacity: .08; }\n  100% { transform: scale(1.08); opacity: 0; }\n}\n\n.active-node::after {\n  animation: pulse-ring 1.8s ease-out infinite;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .active-node::after { animation: none; }\n}",
        "challenge": "Create a keyframe animation with at least three stages and disable it for reduced-motion users.",
        "hint": "Separate the @keyframes definition from the element that applies the animation.",
        "solution": "@keyframes pulse-ring {\n  0% { transform: scale(.95); opacity: .45; }\n  70% { transform: scale(1.08); opacity: .08; }\n  100% { transform: scale(1.08); opacity: 0; }\n}\n\n.active-node::after {\n  animation: pulse-ring 1.8s ease-out infinite;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .active-node::after { animation: none; }\n}",
        "groups": [
          [
            "@keyframes"
          ],
          [
            "animation:",
            "animation-name"
          ],
          [
            "prefers-reduced-motion"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Intrinsic Sizing & Content-Driven Layout",
        "summary": "Use min-content, max-content, fit-content(), minmax(), aspect-ratio, and overflow-aware sizing to let content participate in layout decisions.",
        "concepts": [
          {
            "name": "Intrinsic keywords",
            "explanation": "min-content represents the smallest width without avoidable overflow, while max-content represents the unwrapped preferred width."
          },
          {
            "name": "fit-content",
            "explanation": "fit-content() grows toward the ideal size but respects an available-space limit, useful for labels, sidebars, and content-sized tracks."
          },
          {
            "name": "Aspect ratio",
            "explanation": "aspect-ratio reserves proportional space and helps components remain stable before media loads."
          }
        ],
        "example": ".layout {\n  display: grid;\n  grid-template-columns: minmax(14rem, max-content) minmax(0, 1fr);\n  gap: 1.5rem;\n}\n\n.preview {\n  width: min(100%, 48rem);\n  aspect-ratio: 16 / 9;\n}",
        "challenge": "Build a two-column grid where the sidebar has content-aware sizing and the main area can shrink safely.",
        "hint": "minmax(0, 1fr) is useful when long content would otherwise force a grid track wider than expected.",
        "solution": ".layout {\n  display: grid;\n  grid-template-columns: minmax(14rem, max-content) minmax(0, 1fr);\n  gap: 1.5rem;\n}\n\n.preview {\n  width: min(100%, 48rem);\n  aspect-ratio: 16 / 9;\n}",
        "groups": [
          [
            "minmax("
          ],
          [
            "max-content",
            "min-content",
            "fit-content("
          ],
          [
            "aspect-ratio"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS layout",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout"
          },
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Component CSS Architecture",
        "summary": "Organize selectors, tokens, variants, state, and layout responsibilities so components remain reusable and predictable as a project grows.",
        "concepts": [
          {
            "name": "Separate responsibilities",
            "explanation": "Page layout rules should not quietly depend on deep component internals. Give components explicit classes and modifiers for their public styling contract."
          },
          {
            "name": "Low specificity",
            "explanation": "Class-based selectors, :where(), and thoughtful nesting make overrides easier than long descendant chains or frequent !important."
          },
          {
            "name": "State naming",
            "explanation": "Use clear state hooks such as [aria-current=\"page\"], .is-active, or data-state rather than styling by incidental DOM position when state is semantic."
          }
        ],
        "example": ".course-card {\n  --card-accent: #52d8ff;\n  padding: 1.25rem;\n  border: 1px solid rgb(255 255 255 / .12);\n}\n\n.course-card--advanced { --card-accent: #ff4c5f; }\n.course-card[data-state=\"complete\"] { border-color: var(--card-accent); }\n.course-card__title { color: var(--card-accent); }",
        "challenge": "Create a component class, one variant, one state selector, and one element/subpart selector.",
        "hint": "Treat classes and data attributes as an API: a future developer should understand why each selector exists.",
        "solution": ".course-card {\n  --card-accent: #52d8ff;\n  padding: 1.25rem;\n  border: 1px solid rgb(255 255 255 / .12);\n}\n\n.course-card--advanced { --card-accent: #ff4c5f; }\n.course-card[data-state=\"complete\"] { border-color: var(--card-accent); }\n.course-card__title { color: var(--card-accent); }",
        "groups": [
          [
            ".course-card"
          ],
          [
            "data-state"
          ],
          [
            "--card-accent"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      }
    ],
    "senior": [
      {
        "title": "Cascade Layers & Specificity Engineering",
        "summary": "Control large stylesheets by explicitly ordering groups of rules and reducing accidental specificity wars.",
        "concepts": [
          {
            "name": "Cascade layers",
            "explanation": "@layer lets authors declare an order for style groups. Later layers beat earlier layers before selector specificity is compared within a layer."
          },
          {
            "name": "Specificity control",
            "explanation": ":where() contributes zero specificity, while :is(), :not(), and :has() use the specificity of their most specific argument."
          },
          {
            "name": "Overrides as design",
            "explanation": "A healthy system defines where resets, base styles, components, utilities, and overrides belong instead of relying on ever-larger selectors."
          }
        ],
        "example": "@layer reset, base, components, utilities;\n\n@layer base {\n  :where(body) { margin: 0; font-family: system-ui, sans-serif; }\n}\n\n@layer components {\n  .button { padding: .75rem 1rem; }\n}\n\n@layer utilities {\n  .hidden { display: none !important; }\n}",
        "challenge": "Declare at least three cascade layers and place rules into two of them.",
        "hint": "Declare the layer order once near the top so future files can join the same ordered system.",
        "solution": "@layer reset, base, components, utilities;\n\n@layer base {\n  :where(body) { margin: 0; font-family: system-ui, sans-serif; }\n}\n\n@layer components {\n  .button { padding: .75rem 1rem; }\n}\n\n@layer utilities {\n  .hidden { display: none !important; }\n}",
        "groups": [
          [
            "@layer"
          ],
          [
            ":where("
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Container Queries & Component Responsiveness",
        "summary": "Make components respond to the space they actually receive rather than assuming viewport width describes their layout context.",
        "concepts": [
          {
            "name": "Containment context",
            "explanation": "container-type establishes an element as a query container, commonly inline-size for width-based component queries."
          },
          {
            "name": "@container",
            "explanation": "Container queries conditionally style descendants based on the container instead of the viewport."
          },
          {
            "name": "Container units",
            "explanation": "Units such as cqw and cqi are relative to query-container dimensions and can support local fluid sizing."
          }
        ],
        "example": ".course-shell {\n  container-type: inline-size;\n  container-name: course;\n}\n\n.course-card { display: grid; gap: 1rem; }\n\n@container course (min-width: 640px) {\n  .course-card { grid-template-columns: 160px 1fr; }\n}",
        "challenge": "Create a named inline-size container and a @container rule that changes a child layout.",
        "hint": "The query container belongs on the ancestor; the @container rule styles descendants based on that ancestor size.",
        "solution": ".course-shell {\n  container-type: inline-size;\n  container-name: course;\n}\n\n.course-card { display: grid; gap: 1rem; }\n\n@container course (min-width: 640px) {\n  .course-card { grid-template-columns: 160px 1fr; }\n}",
        "groups": [
          [
            "container-type"
          ],
          [
            "@container"
          ],
          [
            "grid-template-columns"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Subgrid & Shared Alignment",
        "summary": "Use subgrid when nested components need to participate in the track sizing of an ancestor grid.",
        "concepts": [
          {
            "name": "Subgrid",
            "explanation": "A nested grid can use grid-template-columns: subgrid or grid-template-rows: subgrid to reuse the parent tracks it spans."
          },
          {
            "name": "Shared alignment",
            "explanation": "Subgrid solves cases where cards contain independent internal grids but headings, metadata, and actions need to line up across cards."
          },
          {
            "name": "Span matters",
            "explanation": "The subgridded element only receives tracks across the grid area it spans, so parent placement still determines the available track set."
          }
        ],
        "example": ".cards {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 1rem;\n}\n\n.card {\n  display: grid;\n  grid-template-rows: subgrid;\n  grid-row: span 3;\n}",
        "challenge": "Create a parent grid and a card that uses subgrid for rows while spanning multiple parent rows.",
        "hint": "A subgrid needs an ancestor grid and a meaningful span across the inherited tracks.",
        "solution": ".cards {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 1rem;\n}\n\n.card {\n  display: grid;\n  grid-template-rows: subgrid;\n  grid-row: span 3;\n}",
        "groups": [
          [
            "display: grid",
            "display:grid"
          ],
          [
            "subgrid"
          ],
          [
            "grid-row"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS layout",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout"
          },
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Logical Properties & Writing Modes",
        "summary": "Write layouts that adapt naturally to left-to-right, right-to-left, and vertical writing modes by styling logical directions instead of physical ones.",
        "concepts": [
          {
            "name": "Logical edges",
            "explanation": "margin-inline, padding-block, border-inline-start, inset-inline-end, and similar properties map to directions according to writing mode and text direction."
          },
          {
            "name": "Logical sizes",
            "explanation": "inline-size and block-size correspond to the inline and block axes instead of always meaning physical width and height."
          },
          {
            "name": "International layout",
            "explanation": "Logical properties reduce special-case RTL overrides and make components more robust when content direction changes."
          }
        ],
        "example": ".notice {\n  inline-size: min(100%, 42rem);\n  padding-block: 1rem;\n  padding-inline: 1.25rem;\n  border-inline-start: .25rem solid #4fdcff;\n  margin-inline: auto;\n}",
        "challenge": "Style a notice using only logical padding/margin/border properties for its main spacing.",
        "hint": "Translate “left/right/top/bottom” into “inline/block start/end” before writing the rule.",
        "solution": ".notice {\n  inline-size: min(100%, 42rem);\n  padding-block: 1rem;\n  padding-inline: 1.25rem;\n  border-inline-start: .25rem solid #4fdcff;\n  margin-inline: auto;\n}",
        "groups": [
          [
            "padding-inline"
          ],
          [
            "padding-block"
          ],
          [
            "border-inline"
          ],
          [
            "inline-size"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Rendering Performance, Containment & content-visibility",
        "summary": "Reduce rendering work in large interfaces by understanding layout/paint costs and applying containment only where component boundaries are real.",
        "concepts": [
          {
            "name": "Containment",
            "explanation": "contain can isolate layout, paint, size, or style behavior. Strong containment changes how an element participates in layout, so apply it deliberately."
          },
          {
            "name": "content-visibility",
            "explanation": "content-visibility: auto can skip rendering work for off-screen subtrees while preserving find-in-page/accessibility behavior better than simply removing content."
          },
          {
            "name": "Measure first",
            "explanation": "Performance CSS should follow profiling. A rule that improves one page can be irrelevant or harmful elsewhere if it changes layout semantics or memory use."
          }
        ],
        "example": ".long-module-list > section {\n  content-visibility: auto;\n  contain-intrinsic-size: auto 480px;\n}\n\n.chart-shell {\n  contain: layout paint;\n}",
        "challenge": "Add content-visibility to repeated long sections and apply a deliberate containment mode to a self-contained visual component.",
        "hint": "Containment is a contract: use it only when the contained component truly does not need to affect outside layout/paint in the contained dimension.",
        "solution": ".long-module-list > section {\n  content-visibility: auto;\n  contain-intrinsic-size: auto 480px;\n}\n\n.chart-shell {\n  contain: layout paint;\n}",
        "groups": [
          [
            "content-visibility"
          ],
          [
            "contain-intrinsic-size"
          ],
          [
            "contain:"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      }
    ],
    "advanced": [
      {
        "title": "Native CSS Nesting & Scoped Organization",
        "summary": "Use modern nesting to keep component rules together without recreating deep preprocessor selector chains.",
        "concepts": [
          {
            "name": "Native nesting",
            "explanation": "Nested selectors can be written inside a parent rule. The & nesting selector explicitly references the parent selector in states and variants."
          },
          {
            "name": "Keep depth shallow",
            "explanation": "Nesting is organizational syntax, not a reason to create tightly coupled DOM selectors. Deep nesting makes components hard to move and override."
          },
          {
            "name": "Scope strategy",
            "explanation": "Modern CSS increasingly supports local scoping tools; even without them, component classes and cascade layers should define intentional boundaries."
          }
        ],
        "example": ".course-card {\n  padding: 1rem;\n\n  & > h3 { margin-block-start: 0; }\n\n  &:hover,\n  &:focus-within {\n    border-color: var(--accent);\n  }\n\n  &.is-complete { opacity: .85; }\n}",
        "challenge": "Write a component rule using native nesting for a child, a state, and a variant.",
        "hint": "Use & where the nested selector modifies or extends the parent selector.",
        "solution": ".course-card {\n  padding: 1rem;\n\n  & > h3 { margin-block-start: 0; }\n\n  &:hover,\n  &:focus-within {\n    border-color: var(--accent);\n  }\n\n  &.is-complete { opacity: .85; }\n}",
        "groups": [
          [
            "&"
          ],
          [
            ":focus-within"
          ],
          [
            ".course-card"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Modern Color Spaces & Color Functions",
        "summary": "Work with alpha-aware modern syntax, color-mix(), relative color, perceptual spaces, and theme tokens while preserving contrast.",
        "concepts": [
          {
            "name": "Perceptual spaces",
            "explanation": "oklab() and oklch() are designed around perceptual properties, making lightness and color adjustments more predictable than raw RGB changes."
          },
          {
            "name": "Color mixing",
            "explanation": "color-mix() creates derived colors at computed-value time and works well with custom properties for borders, hover states, and overlays."
          },
          {
            "name": "Contrast responsibility",
            "explanation": "A mathematically smooth palette can still be unreadable. Verify text/background contrast and state differences with accessibility tooling."
          }
        ],
        "example": ":root {\n  --accent: oklch(78% .15 210);\n  --danger: oklch(66% .22 25);\n}\n\n.button {\n  background: var(--accent);\n  border-color: color-mix(in oklch, var(--accent) 70%, black);\n}\n\n.button:hover {\n  background: color-mix(in oklch, var(--accent) 86%, white);\n}",
        "challenge": "Define an OKLCH accent token and derive at least one related color with color-mix().",
        "hint": "Keep the source color as a custom property so derived states stay related to the same design token.",
        "solution": ":root {\n  --accent: oklch(78% .15 210);\n  --danger: oklch(66% .22 25);\n}\n\n.button {\n  background: var(--accent);\n  border-color: color-mix(in oklch, var(--accent) 70%, black);\n}\n\n.button:hover {\n  background: color-mix(in oklch, var(--accent) 86%, white);\n}",
        "groups": [
          [
            "oklch("
          ],
          [
            "color-mix("
          ],
          [
            "--accent"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Advanced Grid, Intrinsic Constraints & Overflow",
        "summary": "Solve dense application layouts by combining grid track sizing, minimum-size behavior, overflow rules, and content constraints.",
        "concepts": [
          {
            "name": "Automatic minimums",
            "explanation": "Grid and flex items can refuse to shrink because their automatic minimum size is content-based. min-width: 0 or minmax(0, 1fr) often fixes unexpected overflow."
          },
          {
            "name": "Track strategy",
            "explanation": "Use minmax(), fit-content(), subgrid, and auto-fit/auto-fill intentionally rather than stacking breakpoints to fight content."
          },
          {
            "name": "Overflow is a signal",
            "explanation": "Clipping or scrolling may be correct, but unexplained overflow often reveals an incorrect minimum size, unbreakable content, or overly rigid track."
          }
        ],
        "example": ".app-layout {\n  display: grid;\n  grid-template-columns: fit-content(18rem) minmax(0, 1fr);\n  min-block-size: 100dvh;\n}\n\n.main-pane {\n  min-inline-size: 0;\n  overflow: auto;\n}",
        "challenge": "Create a sidebar/main layout that resists content overflow using fit-content and minmax(0, 1fr).",
        "hint": "When the flexible track still overflows, inspect the grid item minimum size and long unbreakable content.",
        "solution": ".app-layout {\n  display: grid;\n  grid-template-columns: fit-content(18rem) minmax(0, 1fr);\n  min-block-size: 100dvh;\n}\n\n.main-pane {\n  min-inline-size: 0;\n  overflow: auto;\n}",
        "groups": [
          [
            "fit-content("
          ],
          [
            "minmax(0, 1fr)",
            "minmax(0,1fr)"
          ],
          [
            "min-inline-size",
            "min-width"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS layout",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout"
          },
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Accessible Themes, Motion & Forced-Color Resilience",
        "summary": "Design themes and interaction states that remain understandable across dark mode, reduced motion, high contrast/forced colors, and keyboard input.",
        "concepts": [
          {
            "name": "Color-scheme",
            "explanation": "color-scheme can inform the browser which light/dark schemes native controls and default surfaces support."
          },
          {
            "name": "Forced colors",
            "explanation": "forced-colors environments may replace author colors. Avoid communicating state only through subtle color and test system high-contrast modes."
          },
          {
            "name": "Motion and focus",
            "explanation": "Respect reduced-motion preference and keep clear focus-visible indicators. Accessibility variants should be part of the design system, not emergency patches."
          }
        ],
        "example": ":root { color-scheme: dark; }\n\n.button:focus-visible {\n  outline: 3px solid CanvasText;\n  outline-offset: 3px;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .button { transition-duration: 0.01ms; }\n}\n\n@media (forced-colors: active) {\n  .button { border: 2px solid ButtonText; }\n}",
        "challenge": "Add focus-visible styling plus reduced-motion and forced-colors adaptations.",
        "hint": "Test meaning with author colors removed; borders, text, and native control states should still communicate structure.",
        "solution": ":root { color-scheme: dark; }\n\n.button:focus-visible {\n  outline: 3px solid CanvasText;\n  outline-offset: 3px;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .button { transition-duration: 0.01ms; }\n}\n\n@media (forced-colors: active) {\n  .button { border: 2px solid ButtonText; }\n}",
        "groups": [
          [
            ":focus-visible"
          ],
          [
            "prefers-reduced-motion"
          ],
          [
            "forced-colors"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Professional CSS Systems & Debugging Capstone",
        "summary": "Diagnose cascade, layout, overflow, stacking, responsiveness, and rendering problems systematically while keeping a scalable architecture.",
        "concepts": [
          {
            "name": "Debug the computed result",
            "explanation": "Use developer tools to inspect which declaration won, which values were inherited, and which rules are crossed out before adding overrides."
          },
          {
            "name": "Debug layout from the container outward",
            "explanation": "Check the formatting context, available size, minimums, overflow, and track/flex rules before changing child margins at random."
          },
          {
            "name": "Architecture and measurement",
            "explanation": "Use layers, tokens, component boundaries, responsive containers, and performance measurements as parts of one system. Avoid “fixes” that only work at the current viewport."
          }
        ],
        "example": "@layer base, components, utilities;\n\n:root { --space-3: .75rem; --accent: oklch(78% .15 210); }\n\n@layer components {\n  .course-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));\n    gap: var(--space-3);\n  }\n}\n\n@layer utilities {\n  .focus-ring:focus-visible { outline: 3px solid var(--accent); }\n}",
        "challenge": "Build a compact CSS system using a layer order, tokens, a responsive grid, and an accessible focus utility.",
        "hint": "Treat the challenge as architecture: the rules should still make sense when there are twenty components, not only one demo card.",
        "solution": "@layer base, components, utilities;\n\n:root { --space-3: .75rem; --accent: oklch(78% .15 210); }\n\n@layer components {\n  .course-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));\n    gap: var(--space-3);\n  }\n}\n\n@layer utilities {\n  .focus-ring:focus-visible { outline: 3px solid var(--accent); }\n}",
        "groups": [
          [
            "@layer"
          ],
          [
            "--"
          ],
          [
            "display: grid",
            "display:grid"
          ],
          [
            ":focus-visible"
          ]
        ],
        "references": [
          {
            "title": "MDN — CSS styling basics",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics"
          },
          {
            "title": "MDN — CSS layout",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout"
          },
          {
            "title": "MDN — CSS reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS"
          }
        ],
        "pitfalls": [],
        "mastery": []
      }
    ]
  },
  "javascript": {
    "intern": [
      {
        "title": "Variables, Values & Types",
        "summary": "Store and inspect data with let and const, recognize JavaScript primitive values, and understand that variables have values while values have types.",
        "concepts": [
          {
            "name": "let and const",
            "explanation": "Use const when a binding should not be reassigned and let when reassignment is part of the design. Avoid var in new beginner code until you understand its older scoping rules."
          },
          {
            "name": "Primitive values",
            "explanation": "Common primitive types are string, number, bigint, boolean, undefined, symbol, and null. Objects are the major non-primitive category."
          },
          {
            "name": "Dynamic typing",
            "explanation": "A JavaScript variable is not permanently locked to one value type. typeof helps inspect many values, but null is a famous historical edge case because typeof null is \"object\"."
          }
        ],
        "example": "const playerName = \"Nova\";\nlet health = 100;\nconst alive = true;\n\nhealth = health - 25;\nconsole.log(playerName, health, alive);\nconsole.log(typeof health);",
        "challenge": "Declare a const name, a mutable numeric score/health variable, change the number, and log both values.",
        "hint": "Use const for the name and let for the value you intend to reassign.",
        "solution": "const playerName = \"Nova\";\nlet health = 100;\nconst alive = true;\n\nhealth = health - 25;\nconsole.log(playerName, health, alive);\nconsole.log(typeof health);",
        "groups": [
          [
            "const "
          ],
          [
            "let "
          ],
          [
            "console.log"
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Operators, Conditions & Boolean Logic",
        "summary": "Combine expressions with arithmetic, comparison, logical operators, and if/switch control flow.",
        "concepts": [
          {
            "name": "Comparisons",
            "explanation": "Prefer strict equality === and !== for predictable comparisons. Relational operators such as <, >, <=, and >= compare ordered values."
          },
          {
            "name": "Boolean logic",
            "explanation": "&& requires both sides to be truthy, || chooses when at least one side is truthy, and ! negates a truthy/falsy result."
          },
          {
            "name": "Branches",
            "explanation": "if/else is flexible for arbitrary conditions. switch is useful when one expression is matched against many known cases."
          }
        ],
        "example": "const score = 86;\n\nif (score >= 80) {\n  console.log(\"Pass\");\n} else {\n  console.log(\"Review and retry\");\n}\n\nconst rank = score >= 90 ? \"excellent\" : \"developing\";\nconsole.log(rank);",
        "challenge": "Write a condition that prints Pass when a score is at least 80 and Retry otherwise.",
        "hint": "Your condition should compare the score with 80 using >=.",
        "solution": "const score = 86;\n\nif (score >= 80) {\n  console.log(\"Pass\");\n} else {\n  console.log(\"Review and retry\");\n}\n\nconst rank = score >= 90 ? \"excellent\" : \"developing\";\nconsole.log(rank);",
        "groups": [
          [
            "if ("
          ],
          [
            ">= 80",
            ">=80"
          ],
          [
            "else"
          ],
          [
            "console.log"
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Loops & Arrays",
        "summary": "Store ordered values in arrays and repeat work with for, for...of, while, and array indexing.",
        "concepts": [
          {
            "name": "Arrays",
            "explanation": "Arrays are ordered, zero-indexed collections. length tells you how many entries exist, and methods such as push/pop modify the end."
          },
          {
            "name": "for and while",
            "explanation": "for is convenient when setup, condition, and update fit together. while is useful when repetition depends on a condition rather than a known count."
          },
          {
            "name": "for...of",
            "explanation": "for...of reads iterable values directly and is often clearer than manual indexing when you only need each value."
          }
        ],
        "example": "const modules = [\"HTML\", \"CSS\", \"JavaScript\", \"C#\"];\n\nfor (const moduleName of modules) {\n  console.log(moduleName);\n}\n\nfor (let i = 0; i < modules.length; i++) {\n  console.log(i, modules[i]);\n}",
        "challenge": "Create an array with at least three values and print every value using a loop.",
        "hint": "for...of is the simplest choice when you do not need the array index.",
        "solution": "const modules = [\"HTML\", \"CSS\", \"JavaScript\", \"C#\"];\n\nfor (const moduleName of modules) {\n  console.log(moduleName);\n}\n\nfor (let i = 0; i < modules.length; i++) {\n  console.log(i, modules[i]);\n}",
        "groups": [
          [
            "["
          ],
          [
            "for ("
          ],
          [
            "console.log"
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Functions, Parameters & Scope",
        "summary": "Package behavior into reusable functions, pass data through parameters, return results, and reason about where names are visible.",
        "concepts": [
          {
            "name": "Function contracts",
            "explanation": "Parameters describe inputs and return describes the output. A focused function should have a clear purpose that can be described in one sentence."
          },
          {
            "name": "Function forms",
            "explanation": "Function declarations, function expressions, and arrow functions all create callable values, but they differ in details such as hoisting and this behavior."
          },
          {
            "name": "Scope",
            "explanation": "let and const are block scoped. Names declared inside a function are normally unavailable outside it; inner scopes can access names from outer scopes."
          }
        ],
        "example": "function calculateAverage(a, b) {\n  const total = a + b;\n  return total / 2;\n}\n\nconst result = calculateAverage(80, 92);\nconsole.log(result);",
        "challenge": "Write a function that accepts two numbers, returns a calculated result, and log the returned value.",
        "hint": "Put the reusable calculation inside the function and use return rather than logging only inside the function.",
        "solution": "function calculateAverage(a, b) {\n  const total = a + b;\n  return total / 2;\n}\n\nconst result = calculateAverage(80, 92);\nconsole.log(result);",
        "groups": [
          [
            "function "
          ],
          [
            "return "
          ],
          [
            "console.log"
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "DOM Selection & Events",
        "summary": "Connect JavaScript to HTML by selecting elements, changing content/classes, and responding to user events.",
        "concepts": [
          {
            "name": "Selecting elements",
            "explanation": "querySelector returns the first matching element; querySelectorAll returns a static NodeList of matches. Check for null when a selector may not find anything."
          },
          {
            "name": "Updating the DOM",
            "explanation": "textContent changes text safely, classList manages classes, and createElement/append can build new nodes without composing raw HTML strings."
          },
          {
            "name": "Events",
            "explanation": "addEventListener registers behavior without overwriting other listeners. Event objects describe what happened and which target was involved."
          }
        ],
        "example": "const button = document.querySelector(\"#complete-button\");\nconst status = document.querySelector(\"#status\");\n\nbutton?.addEventListener(\"click\", () => {\n  status.textContent = \"Lesson complete\";\n  status.classList.add(\"complete\");\n});",
        "challenge": "Select a button and another element, then update the second element when the button is clicked.",
        "hint": "Use querySelector twice, then attach a click listener with addEventListener.",
        "solution": "const button = document.querySelector(\"#complete-button\");\nconst status = document.querySelector(\"#status\");\n\nbutton?.addEventListener(\"click\", () => {\n  status.textContent = \"Lesson complete\";\n  status.classList.add(\"complete\");\n});",
        "groups": [
          [
            "querySelector"
          ],
          [
            "addEventListener"
          ],
          [
            "textContent",
            "classList"
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      }
    ],
    "junior": [
      {
        "title": "Objects, Properties & Destructuring",
        "summary": "Model related data with objects, access properties safely, copy/merge records, and unpack values with destructuring.",
        "concepts": [
          {
            "name": "Objects",
            "explanation": "Object literals group named properties. Dot notation is concise for known names; bracket notation supports computed property names."
          },
          {
            "name": "Destructuring",
            "explanation": "Object and array destructuring extract values into variables and can provide defaults or rename bindings."
          },
          {
            "name": "Spread",
            "explanation": "Object spread creates a shallow copy/merge. Array spread expands iterable values into a new array; neither performs a deep clone of nested objects."
          }
        ],
        "example": "const learner = {\n  name: \"Nova\",\n  level: \"Junior\",\n  scores: [82, 91, 88]\n};\n\nconst { name, level } = learner;\nconst updated = { ...learner, level: \"Intermediate\" };\nconsole.log(name, level, updated.level);",
        "challenge": "Create an object with at least three properties, destructure two properties, and create a modified copy using spread.",
        "hint": "Destructure with const { propertyA, propertyB } = object and copy with { ...object, changed: value }.",
        "solution": "const learner = {\n  name: \"Nova\",\n  level: \"Junior\",\n  scores: [82, 91, 88]\n};\n\nconst { name, level } = learner;\nconst updated = { ...learner, level: \"Intermediate\" };\nconsole.log(name, level, updated.level);",
        "groups": [
          [
            "{"
          ],
          [
            "..."
          ],
          [
            "const {"
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Array Methods & Data Transformation",
        "summary": "Use map, filter, find, some, every, reduce, and sorting patterns to express collection work without manual indexing.",
        "concepts": [
          {
            "name": "Transformation",
            "explanation": "map returns a new array with one result per input. filter returns only items that pass a predicate. Neither mutates the source array by itself."
          },
          {
            "name": "Search and tests",
            "explanation": "find returns the first matching item; some asks whether any item matches; every asks whether all items match."
          },
          {
            "name": "Reduction",
            "explanation": "reduce combines many values into one accumulator. Use it when the accumulator idea is genuinely clearer than a simpler loop or specialized method."
          }
        ],
        "example": "const scores = [72, 88, 95, 61, 84];\nconst passing = scores.filter(score => score >= 80);\nconst curved = scores.map(score => Math.min(100, score + 5));\nconst average = scores.reduce((sum, score) => sum + score, 0) / scores.length;\n\nconsole.log(passing, curved, average);",
        "challenge": "Given an array of numbers, create a filtered array and a mapped array, then print both.",
        "hint": "Write one callback returning a boolean for filter and one callback returning a transformed value for map.",
        "solution": "const scores = [72, 88, 95, 61, 84];\nconst passing = scores.filter(score => score >= 80);\nconst curved = scores.map(score => Math.min(100, score + 5));\nconst average = scores.reduce((sum, score) => sum + score, 0) / scores.length;\n\nconsole.log(passing, curved, average);",
        "groups": [
          [
            ".filter("
          ],
          [
            ".map("
          ],
          [
            "console.log"
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Forms, State & UI Rendering",
        "summary": "Read form values, validate at the application layer, store UI state, and update the page from that state instead of scattering unrelated mutations.",
        "concepts": [
          {
            "name": "Form events",
            "explanation": "submit events belong to forms. preventDefault can stop navigation when JavaScript handles the interaction locally."
          },
          {
            "name": "Reading data",
            "explanation": "FormData can read successful controls by name. Input properties such as value and checked are useful for individual controls."
          },
          {
            "name": "Single source of truth",
            "explanation": "Keep important UI state in a clear object, then render elements from that state. This makes behavior easier to debug than treating the DOM as hidden storage."
          }
        ],
        "example": "const state = { learnerName: \"\", saved: false };\nconst form = document.querySelector(\"#profile-form\");\nconst output = document.querySelector(\"#profile-status\");\n\nform?.addEventListener(\"submit\", event => {\n  event.preventDefault();\n  const data = new FormData(form);\n  state.learnerName = String(data.get(\"name\") ?? \"\");\n  state.saved = true;\n  output.textContent = `Saved ${state.learnerName}`;\n});",
        "challenge": "Handle a form submit event, prevent the default submission, read at least one form value, and update text on the page.",
        "hint": "Use the form submit event rather than only listening to a button click.",
        "solution": "const state = { learnerName: \"\", saved: false };\nconst form = document.querySelector(\"#profile-form\");\nconst output = document.querySelector(\"#profile-status\");\n\nform?.addEventListener(\"submit\", event => {\n  event.preventDefault();\n  const data = new FormData(form);\n  state.learnerName = String(data.get(\"name\") ?? \"\");\n  state.saved = true;\n  output.textContent = `Saved ${state.learnerName}`;\n});",
        "groups": [
          [
            "addEventListener(\"submit\"",
            "addEventListener('submit'"
          ],
          [
            "preventDefault"
          ],
          [
            "FormData",
            "value"
          ],
          [
            "textContent"
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Errors, Exceptions & Debugging",
        "summary": "Distinguish syntax/runtime/logical errors, throw meaningful exceptions, handle recoverable failures, and debug from evidence instead of guesses.",
        "concepts": [
          {
            "name": "Error categories",
            "explanation": "Syntax errors prevent parsing, runtime errors occur during execution, and logical errors produce the wrong result without necessarily throwing."
          },
          {
            "name": "try/catch/finally",
            "explanation": "Use try/catch for failures you can meaningfully handle. finally runs cleanup code whether or not an exception occurred."
          },
          {
            "name": "Debugging workflow",
            "explanation": "Read the first relevant error, inspect the stack trace, reproduce consistently, isolate inputs, and use breakpoints/watch values before changing several things at once."
          }
        ],
        "example": "function parseScore(text) {\n  const score = Number(text);\n  if (!Number.isFinite(score)) {\n    throw new TypeError(\"Score must be a number\");\n  }\n  return score;\n}\n\ntry {\n  console.log(parseScore(\"91\"));\n} catch (error) {\n  console.error(error.message);\n}",
        "challenge": "Write a function that throws an Error or TypeError for invalid input and handle it with try/catch.",
        "hint": "Validate first, throw a meaningful exception, then catch only where you can respond usefully.",
        "solution": "function parseScore(text) {\n  const score = Number(text);\n  if (!Number.isFinite(score)) {\n    throw new TypeError(\"Score must be a number\");\n  }\n  return score;\n}\n\ntry {\n  console.log(parseScore(\"91\"));\n} catch (error) {\n  console.error(error.message);\n}",
        "groups": [
          [
            "throw new"
          ],
          [
            "try {"
          ],
          [
            "catch ("
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Modules, Storage & Project Structure",
        "summary": "Split code into modules with explicit imports/exports and use browser storage only for appropriate client-side state.",
        "concepts": [
          {
            "name": "ES modules",
            "explanation": "export exposes bindings from a module; import consumes them. Module scripts have their own scope and are deferred by default in browsers."
          },
          {
            "name": "Module boundaries",
            "explanation": "Group code by responsibility rather than creating one giant utility file. Public exports should form a small understandable API."
          },
          {
            "name": "Web storage",
            "explanation": "localStorage stores string key/value data per origin and persists across sessions. Parse/stringify structured data and remember that storage is not a secure secret vault."
          }
        ],
        "example": "// progress.js\nexport function saveProgress(progress) {\n  localStorage.setItem(\"academy-progress\", JSON.stringify(progress));\n}\n\nexport function loadProgress() {\n  const raw = localStorage.getItem(\"academy-progress\");\n  return raw ? JSON.parse(raw) : {};\n}",
        "challenge": "Write one exported function that saves an object to localStorage and another that loads/parses it.",
        "hint": "JSON.stringify before storing objects and JSON.parse after reading them back.",
        "solution": "// progress.js\nexport function saveProgress(progress) {\n  localStorage.setItem(\"academy-progress\", JSON.stringify(progress));\n}\n\nexport function loadProgress() {\n  const raw = localStorage.getItem(\"academy-progress\");\n  return raw ? JSON.parse(raw) : {};\n}",
        "groups": [
          [
            "export "
          ],
          [
            "localStorage"
          ],
          [
            "JSON.stringify"
          ],
          [
            "JSON.parse"
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      }
    ],
    "intermediate": [
      {
        "title": "Closures, Lexical Scope & this",
        "summary": "Understand how functions remember surrounding bindings, how this is determined by call style, and when arrow functions intentionally capture lexical this.",
        "concepts": [
          {
            "name": "Closures",
            "explanation": "A function keeps access to the lexical environment where it was created even after that outer function has returned. This enables private state and function factories."
          },
          {
            "name": "this",
            "explanation": "For normal functions, this depends on how the function is called. Method calls, constructors, explicit bind/call/apply, and plain calls can produce different values."
          },
          {
            "name": "Arrow functions",
            "explanation": "Arrow functions do not create their own this, arguments, or prototype. They are excellent callbacks but are not drop-in replacements for every method/constructor."
          }
        ],
        "example": "function createCounter(start = 0) {\n  let value = start;\n  return {\n    increment() { value += 1; return value; },\n    current() { return value; }\n  };\n}\n\nconst counter = createCounter(10);\nconsole.log(counter.increment());\nconsole.log(counter.current());",
        "challenge": "Create a function factory whose returned function or object method remembers private state from the outer function.",
        "hint": "Declare the state in the outer function and return a function that reads or changes it.",
        "solution": "function createCounter(start = 0) {\n  let value = start;\n  return {\n    increment() { value += 1; return value; },\n    current() { return value; }\n  };\n}\n\nconst counter = createCounter(10);\nconsole.log(counter.increment());\nconsole.log(counter.current());",
        "groups": [
          [
            "return "
          ],
          [
            "let "
          ],
          [
            "function ",
            "=>"
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Prototypes, Classes & Object Design",
        "summary": "Connect class syntax to JavaScript's prototype model and design objects with constructors, methods, inheritance, private fields, and composition.",
        "concepts": [
          {
            "name": "Prototype chain",
            "explanation": "Property lookup walks an object's own properties and then its prototype chain. Methods shared through a prototype avoid copying the same function onto every instance."
          },
          {
            "name": "Class syntax",
            "explanation": "class offers constructor, instance methods, static members, fields, private #fields, inheritance with extends, and super calls."
          },
          {
            "name": "Composition",
            "explanation": "Inheritance is one tool, not the default answer. Small objects/functions composed around capabilities often reduce fragile superclass relationships."
          }
        ],
        "example": "class Course {\n  #completed = false;\n\n  constructor(name) {\n    this.name = name;\n  }\n\n  complete() { this.#completed = true; }\n  get status() { return this.#completed ? \"complete\" : \"active\"; }\n}\n\nconst course = new Course(\"JavaScript\");\ncourse.complete();\nconsole.log(course.status);",
        "challenge": "Create a class with a constructor, one private field, one method, and one getter.",
        "hint": "Private fields begin with # and can only be accessed inside the class body.",
        "solution": "class Course {\n  #completed = false;\n\n  constructor(name) {\n    this.name = name;\n  }\n\n  complete() { this.#completed = true; }\n  get status() { return this.#completed ? \"complete\" : \"active\"; }\n}\n\nconst course = new Course(\"JavaScript\");\ncourse.complete();\nconsole.log(course.status);",
        "groups": [
          [
            "class "
          ],
          [
            "constructor("
          ],
          [
            "#"
          ],
          [
            "get "
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Promises, async/await & Fetch",
        "summary": "Represent future results with promises, compose asynchronous work, handle errors, and avoid blocking or deeply nested callbacks.",
        "concepts": [
          {
            "name": "Promises",
            "explanation": "A promise is pending, fulfilled, or rejected. then/catch/finally compose outcomes without exposing manual completion to consumers."
          },
          {
            "name": "async/await",
            "explanation": "async functions return promises. await pauses that async function until a promise settles while allowing the JavaScript runtime to continue other work."
          },
          {
            "name": "Fetch",
            "explanation": "fetch returns a promise for an HTTP Response. HTTP error status codes do not reject automatically, so check response.ok before parsing data."
          }
        ],
        "example": "async function loadCourse(url) {\n  const response = await fetch(url);\n  if (!response.ok) {\n    throw new Error(`Request failed: ${response.status}`);\n  }\n  return response.json();\n}\n\nloadCourse(\"/course.json\")\n  .then(course => console.log(course))\n  .catch(error => console.error(error));",
        "challenge": "Write an async function that awaits fetch, checks response.ok, and returns parsed JSON.",
        "hint": "Network failure can reject fetch, but an HTTP 404/500 still requires an explicit response.ok check.",
        "solution": "async function loadCourse(url) {\n  const response = await fetch(url);\n  if (!response.ok) {\n    throw new Error(`Request failed: ${response.status}`);\n  }\n  return response.json();\n}\n\nloadCourse(\"/course.json\")\n  .then(course => console.log(course))\n  .catch(error => console.error(error));",
        "groups": [
          [
            "async function",
            "async ("
          ],
          [
            "await fetch"
          ],
          [
            "response.ok"
          ],
          [
            ".json("
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Map, Set, Weak Collections & Data Modeling",
        "summary": "Choose collection types based on identity, uniqueness, key flexibility, and lifetime semantics instead of forcing everything into arrays or plain objects.",
        "concepts": [
          {
            "name": "Map",
            "explanation": "Map accepts keys of any value type, preserves insertion order, exposes size, and has explicit get/set/has/delete methods."
          },
          {
            "name": "Set",
            "explanation": "Set stores unique values. It is useful for membership tests and deduplicating values without manually scanning an array."
          },
          {
            "name": "WeakMap/WeakSet",
            "explanation": "Weak collections hold object keys weakly and are not enumerable. They are useful for associating metadata with objects without extending object lifetime."
          }
        ],
        "example": "const completed = new Set([\"html\", \"css\"]);\ncompleted.add(\"javascript\");\n\nconst scores = new Map();\nscores.set(\"html\", 92);\nscores.set(\"javascript\", 88);\n\nconsole.log(completed.has(\"css\"));\nconsole.log(scores.get(\"html\"));",
        "challenge": "Create a Set for unique completed items and a Map that stores at least two key/value scores.",
        "hint": "Use Set.add/has and Map.set/get rather than array methods.",
        "solution": "const completed = new Set([\"html\", \"css\"]);\ncompleted.add(\"javascript\");\n\nconst scores = new Map();\nscores.set(\"html\", 92);\nscores.set(\"javascript\", 88);\n\nconsole.log(completed.has(\"css\"));\nconsole.log(scores.get(\"html\"));",
        "groups": [
          [
            "new Set"
          ],
          [
            "new Map"
          ],
          [
            ".add("
          ],
          [
            ".set("
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Modules, Regular Expressions & Internationalization",
        "summary": "Work with richer standard-library capabilities while keeping parsing, formatting, and module boundaries explicit.",
        "concepts": [
          {
            "name": "Regular expressions",
            "explanation": "RegExp can search and validate text patterns, but complex patterns should be documented and tested. Do not use regex where a proper parser is required."
          },
          {
            "name": "Intl",
            "explanation": "Intl.NumberFormat, DateTimeFormat, RelativeTimeFormat, Collator, and related APIs format/compare values according to locale rules."
          },
          {
            "name": "Module loading",
            "explanation": "Static import is analyzable up front. dynamic import() returns a promise and can load optional code only when needed."
          }
        ],
        "example": "const codePattern = /^[A-Z]{2}-\\d{4}$/;\nconsole.log(codePattern.test(\"JS-2026\"));\n\nconst formatter = new Intl.NumberFormat(\"en-ZA\", {\n  style: \"currency\",\n  currency: \"ZAR\"\n});\nconsole.log(formatter.format(1299.5));\n\nasync function loadAdvancedTools() {\n  return import(\"./advanced-tools.js\");\n}",
        "challenge": "Create one regular expression test and format a number with Intl.NumberFormat.",
        "hint": "Keep validation patterns small enough to explain; use Intl instead of manually concatenating currency symbols and separators.",
        "solution": "const codePattern = /^[A-Z]{2}-\\d{4}$/;\nconsole.log(codePattern.test(\"JS-2026\"));\n\nconst formatter = new Intl.NumberFormat(\"en-ZA\", {\n  style: \"currency\",\n  currency: \"ZAR\"\n});\nconsole.log(formatter.format(1299.5));\n\nasync function loadAdvancedTools() {\n  return import(\"./advanced-tools.js\");\n}",
        "groups": [
          [
            "RegExp",
            "/"
          ],
          [
            "Intl.NumberFormat"
          ],
          [
            ".test("
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      }
    ],
    "senior": [
      {
        "title": "Iterators, Generators & Custom Iterables",
        "summary": "Control lazy sequence production by understanding the iterable/iterator protocols and generator functions.",
        "concepts": [
          {
            "name": "Iterator protocol",
            "explanation": "An iterator has next() returning { value, done }. An iterable exposes Symbol.iterator that returns an iterator."
          },
          {
            "name": "Generators",
            "explanation": "function* and yield create iterators with far less boilerplate, preserving execution state between yielded values."
          },
          {
            "name": "Lazy computation",
            "explanation": "Iterables can produce values on demand rather than materializing an entire array, which helps with pipelines and large/infinite sequences."
          }
        ],
        "example": "function* range(start, end) {\n  for (let value = start; value <= end; value++) {\n    yield value;\n  }\n}\n\nfor (const number of range(3, 7)) {\n  console.log(number);\n}",
        "challenge": "Create a generator that yields a finite numeric sequence and consume it with for...of.",
        "hint": "Generator declarations use function* and produce values with yield.",
        "solution": "function* range(start, end) {\n  for (let value = start; value <= end; value++) {\n    yield value;\n  }\n}\n\nfor (const number of range(3, 7)) {\n  console.log(number);\n}",
        "groups": [
          [
            "function*"
          ],
          [
            "yield "
          ],
          [
            "for (const"
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Advanced Async, Concurrency & Cancellation",
        "summary": "Compose independent async work concurrently, coordinate completion order, and cancel operations with AbortController.",
        "concepts": [
          {
            "name": "Concurrency",
            "explanation": "Start independent promises before awaiting them, then use Promise.all when all results are required or Promise.allSettled when every outcome matters."
          },
          {
            "name": "Races",
            "explanation": "Promise.race settles with the first settled input, while Promise.any fulfills with the first fulfillment. Choose semantics based on what failure means."
          },
          {
            "name": "Cancellation",
            "explanation": "AbortController creates an AbortSignal that many Web APIs accept. Cancellation should propagate through your async call chain rather than being trapped at the UI edge."
          }
        ],
        "example": "async function loadDashboard(signal) {\n  const lessonsRequest = fetch(\"/lessons.json\", { signal });\n  const scoresRequest = fetch(\"/scores.json\", { signal });\n\n  const [lessons, scores] = await Promise.all([lessonsRequest, scoresRequest]);\n  return Promise.all([lessons.json(), scores.json()]);\n}\n\nconst controller = new AbortController();\nloadDashboard(controller.signal).catch(error => console.error(error));",
        "challenge": "Start two independent promises concurrently, await them with Promise.all, and pass an AbortSignal into the work.",
        "hint": "Do not await the first independent request before starting the second; create both promises first.",
        "solution": "async function loadDashboard(signal) {\n  const lessonsRequest = fetch(\"/lessons.json\", { signal });\n  const scoresRequest = fetch(\"/scores.json\", { signal });\n\n  const [lessons, scores] = await Promise.all([lessonsRequest, scoresRequest]);\n  return Promise.all([lessons.json(), scores.json()]);\n}\n\nconst controller = new AbortController();\nloadDashboard(controller.signal).catch(error => console.error(error));",
        "groups": [
          [
            "Promise.all"
          ],
          [
            "AbortController"
          ],
          [
            "signal"
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Property Descriptors, Proxy & Reflect",
        "summary": "Intercept object operations and reason about writable/configurable/enumerable properties without confusing metaprogramming with ordinary data modeling.",
        "concepts": [
          {
            "name": "Descriptors",
            "explanation": "Object.getOwnPropertyDescriptor exposes property flags and getter/setter functions. defineProperty can create properties with explicit behavior."
          },
          {
            "name": "Proxy",
            "explanation": "Proxy traps operations such as get, set, has, ownKeys, and apply. Traps must respect language invariants or operations can throw."
          },
          {
            "name": "Reflect",
            "explanation": "Reflect methods mirror many internal operations and are useful inside proxy traps for forwarding default behavior cleanly."
          }
        ],
        "example": "const target = { score: 80 };\nconst guarded = new Proxy(target, {\n  set(object, property, value) {\n    if (property === \"score\" && (value < 0 || value > 100)) {\n      throw new RangeError(\"Score out of range\");\n    }\n    return Reflect.set(object, property, value);\n  }\n});\n\nguarded.score = 95;\nconsole.log(guarded.score);",
        "challenge": "Create a Proxy that validates one property in a set trap and forwards valid writes with Reflect.set.",
        "hint": "A good proxy trap usually forwards the normal operation through the matching Reflect method after applying extra behavior.",
        "solution": "const target = { score: 80 };\nconst guarded = new Proxy(target, {\n  set(object, property, value) {\n    if (property === \"score\" && (value < 0 || value > 100)) {\n      throw new RangeError(\"Score out of range\");\n    }\n    return Reflect.set(object, property, value);\n  }\n});\n\nguarded.score = 95;\nconsole.log(guarded.score);",
        "groups": [
          [
            "new Proxy"
          ],
          [
            "set("
          ],
          [
            "Reflect.set"
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Typed Arrays, ArrayBuffer & Binary Data",
        "summary": "Work with fixed-width numeric views over raw memory buffers for files, graphics, networking, and other binary protocols.",
        "concepts": [
          {
            "name": "ArrayBuffer",
            "explanation": "ArrayBuffer represents a fixed-length region of raw bytes. It does not by itself describe how those bytes should be interpreted."
          },
          {
            "name": "Typed arrays",
            "explanation": "Uint8Array, Int32Array, Float32Array, and related types provide indexed numeric views over buffers using a fixed element representation."
          },
          {
            "name": "DataView",
            "explanation": "DataView reads/writes different numeric types at explicit byte offsets and lets you control byte order, making it useful for binary formats."
          }
        ],
        "example": "const buffer = new ArrayBuffer(8);\nconst bytes = new Uint8Array(buffer);\nbytes.set([67, 79, 68, 69]);\n\nconst view = new DataView(buffer);\nview.setUint16(4, 2026, true);\n\nconsole.log(bytes[0], view.getUint16(4, true));",
        "challenge": "Create an ArrayBuffer, view it with a typed array, and write/read at least one numeric value.",
        "hint": "The buffer is raw storage; create a typed array or DataView to interpret its bytes.",
        "solution": "const buffer = new ArrayBuffer(8);\nconst bytes = new Uint8Array(buffer);\nbytes.set([67, 79, 68, 69]);\n\nconst view = new DataView(buffer);\nview.setUint16(4, 2026, true);\n\nconsole.log(bytes[0], view.getUint16(4, true));",
        "groups": [
          [
            "new ArrayBuffer"
          ],
          [
            "Uint8Array",
            "Int32Array",
            "Float32Array"
          ],
          [
            "DataView"
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Functional Composition, Immutability & API Design",
        "summary": "Design predictable transformations with pure functions, immutable updates, higher-order functions, and narrow module APIs.",
        "concepts": [
          {
            "name": "Pure functions",
            "explanation": "A pure function returns the same output for the same inputs and avoids observable side effects. Pure logic is easier to test and compose."
          },
          {
            "name": "Immutable updates",
            "explanation": "Spread, map, filter, and object reconstruction can produce new values rather than mutating shared state. This reduces hidden coupling but may have allocation costs."
          },
          {
            "name": "Higher-order functions",
            "explanation": "Functions can accept or return functions, enabling reusable policies such as predicates, mappers, middleware, and configuration factories."
          }
        ],
        "example": "const addBonus = bonus => learner => ({\n  ...learner,\n  score: Math.min(100, learner.score + bonus)\n});\n\nconst learners = [\n  { name: \"A\", score: 72 },\n  { name: \"B\", score: 91 }\n];\n\nconst upgraded = learners.map(addBonus(5));\nconsole.log(upgraded);",
        "challenge": "Write a higher-order function that returns a transformation function and use it with map without mutating the original objects.",
        "hint": "Return a new object with spread instead of assigning directly to the input object property.",
        "solution": "const addBonus = bonus => learner => ({\n  ...learner,\n  score: Math.min(100, learner.score + bonus)\n});\n\nconst learners = [\n  { name: \"A\", score: 72 },\n  { name: \"B\", score: 91 }\n];\n\nconst upgraded = learners.map(addBonus(5));\nconsole.log(upgraded);",
        "groups": [
          [
            "=>"
          ],
          [
            "..."
          ],
          [
            ".map("
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      }
    ],
    "advanced": [
      {
        "title": "Execution Model, Event Loop & Microtasks",
        "summary": "Predict ordering between synchronous code, promise reactions, queueMicrotask, timers, rendering opportunities, and long-running tasks.",
        "concepts": [
          {
            "name": "Run to completion",
            "explanation": "A JavaScript task runs until its stack is empty. Long synchronous work blocks other tasks and can make the UI unresponsive."
          },
          {
            "name": "Microtasks",
            "explanation": "Promise reactions and queueMicrotask callbacks run from the microtask queue after the current task and before the event loop moves to many other tasks such as timers."
          },
          {
            "name": "Scheduling design",
            "explanation": "Breaking work into chunks, yielding appropriately, and avoiding accidental microtask starvation are part of responsive application architecture."
          }
        ],
        "example": "console.log(\"sync 1\");\n\nsetTimeout(() => console.log(\"timer\"), 0);\nPromise.resolve().then(() => console.log(\"promise microtask\"));\nqueueMicrotask(() => console.log(\"queued microtask\"));\n\nconsole.log(\"sync 2\");",
        "challenge": "Write a small ordering experiment containing synchronous logs, one promise microtask, queueMicrotask, and a zero-delay timer.",
        "hint": "Before running it, predict the order. The synchronous stack finishes before microtasks, and the timer is a later task.",
        "solution": "console.log(\"sync 1\");\n\nsetTimeout(() => console.log(\"timer\"), 0);\nPromise.resolve().then(() => console.log(\"promise microtask\"));\nqueueMicrotask(() => console.log(\"queued microtask\"));\n\nconsole.log(\"sync 2\");",
        "groups": [
          [
            "setTimeout"
          ],
          [
            "Promise.resolve"
          ],
          [
            "queueMicrotask"
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Memory, Reachability & Leak Prevention",
        "summary": "Reason about garbage collection through reachability and identify common leak patterns involving listeners, timers, caches, closures, and detached DOM.",
        "concepts": [
          {
            "name": "Reachability",
            "explanation": "Garbage collectors reclaim objects that are no longer reachable from roots. You do not manually free ordinary JavaScript objects."
          },
          {
            "name": "Leaks",
            "explanation": "An accidental long-lived reference can keep an otherwise unused object reachable: global collections, forgotten event listeners, intervals, caches, and closures are common examples."
          },
          {
            "name": "Weak references",
            "explanation": "WeakMap and WeakSet are useful when metadata should not keep object keys alive. WeakRef/FinalizationRegistry exist for specialized cases and are not normal cache-management tools."
          }
        ],
        "example": "class ViewController {\n  #onResize = () => console.log(\"resize\");\n\n  mount() {\n    window.addEventListener(\"resize\", this.#onResize);\n  }\n\n  unmount() {\n    window.removeEventListener(\"resize\", this.#onResize);\n  }\n}",
        "challenge": "Create a small class/object that registers an event listener and provides a cleanup method that removes the same listener.",
        "hint": "You must retain the exact function reference used during addEventListener so removeEventListener can remove it.",
        "solution": "class ViewController {\n  #onResize = () => console.log(\"resize\");\n\n  mount() {\n    window.addEventListener(\"resize\", this.#onResize);\n  }\n\n  unmount() {\n    window.removeEventListener(\"resize\", this.#onResize);\n  }\n}",
        "groups": [
          [
            "addEventListener"
          ],
          [
            "removeEventListener"
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Symbols, Metaprogramming & Protocol Hooks",
        "summary": "Use symbols for collision-resistant keys and understand language protocols such as iteration, conversion, and built-in customization points.",
        "concepts": [
          {
            "name": "Symbol keys",
            "explanation": "Every Symbol() call creates a unique value. Symbol properties are useful for metadata or protocol hooks that should not collide with ordinary string keys."
          },
          {
            "name": "Well-known symbols",
            "explanation": "Symbol.iterator, Symbol.toPrimitive, Symbol.asyncIterator, and others let objects participate in built-in language operations."
          },
          {
            "name": "Protocol thinking",
            "explanation": "Instead of asking whether an object has a specific class, many JavaScript features ask whether it implements the expected protocol."
          }
        ],
        "example": "const id = Symbol(\"id\");\nconst learner = {\n  [id]: 42,\n  name: \"Nova\",\n  [Symbol.toPrimitive](hint) {\n    return hint === \"number\" ? this[id] : this.name;\n  }\n};\n\nconsole.log(String(learner));\nconsole.log(Number(learner));",
        "challenge": "Create an object with a symbol-keyed property and implement one well-known symbol such as Symbol.toPrimitive or Symbol.iterator.",
        "hint": "Computed property syntax [symbol] lets a Symbol value become the actual property key.",
        "solution": "const id = Symbol(\"id\");\nconst learner = {\n  [id]: 42,\n  name: \"Nova\",\n  [Symbol.toPrimitive](hint) {\n    return hint === \"number\" ? this[id] : this.name;\n  }\n};\n\nconsole.log(String(learner));\nconsole.log(Number(learner));",
        "groups": [
          [
            "Symbol("
          ],
          [
            "[Symbol."
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Module Architecture, Dynamic Loading & Dependency Boundaries",
        "summary": "Design larger codebases around explicit dependency direction, stable public APIs, lazy loading, and testable side-effect boundaries.",
        "concepts": [
          {
            "name": "Static graph",
            "explanation": "Static imports make module dependencies visible to tooling and humans. Circular dependencies are legal but can expose partially initialized bindings and confusing architecture."
          },
          {
            "name": "Dynamic import",
            "explanation": "import() loads a module asynchronously and is useful for optional features, route-level code, heavy editors, or rarely used admin tools."
          },
          {
            "name": "Side-effect boundaries",
            "explanation": "Keep network, storage, DOM, and timers near clear boundaries. Core business logic becomes easier to test when it accepts data and returns data rather than reaching into global state."
          }
        ],
        "example": "// academy-service.js\nexport function createAcademyService({ storage, fetchJson }) {\n  return {\n    loadLocal() { return storage.load(); },\n    async loadReference(url) { return fetchJson(url); }\n  };\n}\n\nexport async function loadEditor() {\n  const module = await import(\"./editor.js\");\n  return module.createEditor();\n}",
        "challenge": "Create a module factory that receives dependencies instead of reading globals directly, and add one dynamic import function.",
        "hint": "Dependency injection can be as simple as passing an object of required functions into a factory.",
        "solution": "// academy-service.js\nexport function createAcademyService({ storage, fetchJson }) {\n  return {\n    loadLocal() { return storage.load(); },\n    async loadReference(url) { return fetchJson(url); }\n  };\n}\n\nexport async function loadEditor() {\n  const module = await import(\"./editor.js\");\n  return module.createEditor();\n}",
        "groups": [
          [
            "export "
          ],
          [
            "import("
          ],
          [
            "async "
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Performance, Security & JavaScript Audit Capstone",
        "summary": "Audit execution cost, DOM work, data flow, network behavior, user input handling, and dangerous APIs as one professional engineering problem.",
        "concepts": [
          {
            "name": "Measure performance",
            "explanation": "Use browser performance tooling to identify long tasks, expensive rendering, unnecessary network work, and memory growth before “optimizing” code."
          },
          {
            "name": "Treat input as data",
            "explanation": "Avoid eval and careless innerHTML with untrusted input. Prefer textContent, createElement, trusted templates, and proper server-side validation/sanitization where HTML is unavoidable."
          },
          {
            "name": "Architect for failure",
            "explanation": "Network calls fail, storage can be unavailable, users double-click, tabs sleep, and data can be malformed. Advanced code makes failure states explicit rather than assuming the happy path."
          }
        ],
        "example": "function renderMessage(container, message) {\n  const paragraph = document.createElement(\"p\");\n  paragraph.textContent = String(message);\n  container.replaceChildren(paragraph);\n}\n\nasync function loadWithTimeout(url, milliseconds = 5000) {\n  const controller = new AbortController();\n  const timer = setTimeout(() => controller.abort(), milliseconds);\n  try {\n    const response = await fetch(url, { signal: controller.signal });\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    return await response.json();\n  } finally {\n    clearTimeout(timer);\n  }\n}",
        "challenge": "Write a safe DOM rendering function using textContent and an async fetch helper with explicit failure/cleanup behavior.",
        "hint": "Keep untrusted strings out of innerHTML, and use try/finally when cleanup such as clearTimeout must always happen.",
        "solution": "function renderMessage(container, message) {\n  const paragraph = document.createElement(\"p\");\n  paragraph.textContent = String(message);\n  container.replaceChildren(paragraph);\n}\n\nasync function loadWithTimeout(url, milliseconds = 5000) {\n  const controller = new AbortController();\n  const timer = setTimeout(() => controller.abort(), milliseconds);\n  try {\n    const response = await fetch(url, { signal: controller.signal });\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    return await response.json();\n  } finally {\n    clearTimeout(timer);\n  }\n}",
        "groups": [
          [
            "textContent"
          ],
          [
            "AbortController"
          ],
          [
            "try {"
          ],
          [
            "finally"
          ]
        ],
        "references": [
          {
            "title": "MDN — JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          },
          {
            "title": "MDN — JavaScript reference",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
          }
        ],
        "pitfalls": [],
        "mastery": []
      }
    ]
  },
  "csharp": {
    "intern": [
      {
        "title": "Program Structure, Variables & Types",
        "summary": "Learn how a C# program is organized and how the compiler uses types to catch many mistakes before the program runs.",
        "concepts": [
          {
            "name": "Strong typing",
            "explanation": "Every expression has a type. The compiler checks assignments, method calls, operators, and conversions so incompatible operations can be caught at compile time."
          },
          {
            "name": "Built-in types",
            "explanation": "Common types include int, long, float, double, decimal, bool, char, string, and object. Choose a type based on the data and operations you need, not only on size."
          },
          {
            "name": "Variables and constants",
            "explanation": "Declare local variables with an explicit type or var when the initializer makes the type clear. const is for compile-time constants; readonly is a separate field concept learned later."
          }
        ],
        "example": "string learnerName = \"Nova\";\nint score = 82;\nbool passed = score >= 80;\nvar nextScore = 91;\n\nConsole.WriteLine($\"{learnerName}: {score} - Passed: {passed}\");\nConsole.WriteLine(nextScore.GetType().Name);",
        "challenge": "Declare a string, an int, and a bool, calculate whether the score passes 80, and print the values.",
        "hint": "C# statements normally end with semicolons. Keep the comparison result in a bool variable.",
        "solution": "string learnerName = \"Nova\";\nint score = 82;\nbool passed = score >= 80;\nvar nextScore = 91;\n\nConsole.WriteLine($\"{learnerName}: {score} - Passed: {passed}\");\nConsole.WriteLine(nextScore.GetType().Name);",
        "groups": [
          [
            "string "
          ],
          [
            "int "
          ],
          [
            "bool "
          ],
          [
            "Console.WriteLine"
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — A tour of C#",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/"
          },
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Operators, Conditions & Switch",
        "summary": "Build expressions and select behavior with if/else, comparison and boolean operators, conditional expressions, and switch.",
        "concepts": [
          {
            "name": "Operators",
            "explanation": "Arithmetic, comparison, equality, and logical operators combine typed values. C# distinguishes boolean logic from bitwise operations even though some operator symbols overlap."
          },
          {
            "name": "if/else",
            "explanation": "if requires a bool condition; C# does not treat arbitrary numbers or strings as truthy/falsy."
          },
          {
            "name": "switch",
            "explanation": "switch statements and switch expressions are useful when behavior depends on discrete cases. Modern patterns can test values, types, properties, and ranges."
          }
        ],
        "example": "int score = 86;\n\nif (score >= 80)\n{\n    Console.WriteLine(\"Pass\");\n}\nelse\n{\n    Console.WriteLine(\"Retry\");\n}\n\nstring grade = score switch\n{\n    >= 90 => \"Excellent\",\n    >= 80 => \"Pass\",\n    _ => \"Developing\"\n};\nConsole.WriteLine(grade);",
        "challenge": "Write an if/else that checks an integer score against 80 and also assign a text result with a switch expression.",
        "hint": "For the switch expression, put the catch-all discard pattern _ last.",
        "solution": "int score = 86;\n\nif (score >= 80)\n{\n    Console.WriteLine(\"Pass\");\n}\nelse\n{\n    Console.WriteLine(\"Retry\");\n}\n\nstring grade = score switch\n{\n    >= 90 => \"Excellent\",\n    >= 80 => \"Pass\",\n    _ => \"Developing\"\n};\nConsole.WriteLine(grade);",
        "groups": [
          [
            "if ("
          ],
          [
            "else"
          ],
          [
            "switch"
          ],
          [
            "=>"
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — A tour of C#",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/"
          },
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Loops, Arrays & Lists",
        "summary": "Repeat work with for/while/foreach and store ordered data in arrays and generic List<T> collections.",
        "concepts": [
          {
            "name": "Arrays",
            "explanation": "Arrays have a fixed length after creation and use zero-based indexing. They are efficient when the number of slots is known."
          },
          {
            "name": "List<T>",
            "explanation": "List<T> is a resizable generic collection. Add, Remove, Count, indexing, and enumeration cover many everyday collection tasks."
          },
          {
            "name": "Loop choice",
            "explanation": "Use foreach when you only need each item, for when the index matters, and while/do when repetition is driven by a condition."
          }
        ],
        "example": "int[] scores = { 72, 88, 95 };\nList<string> modules = new() { \"HTML\", \"CSS\", \"C#\" };\nmodules.Add(\"JavaScript\");\n\nforeach (string module in modules)\n{\n    Console.WriteLine(module);\n}\n\nfor (int i = 0; i < scores.Length; i++)\n{\n    Console.WriteLine(scores[i]);\n}",
        "challenge": "Create a List<string> with at least three values, add another value, and print them with foreach.",
        "hint": "List<T> needs a type argument between angle brackets, such as List<string>.",
        "solution": "int[] scores = { 72, 88, 95 };\nList<string> modules = new() { \"HTML\", \"CSS\", \"C#\" };\nmodules.Add(\"JavaScript\");\n\nforeach (string module in modules)\n{\n    Console.WriteLine(module);\n}\n\nfor (int i = 0; i < scores.Length; i++)\n{\n    Console.WriteLine(scores[i]);\n}",
        "groups": [
          [
            "List<"
          ],
          [
            ".Add("
          ],
          [
            "foreach ("
          ],
          [
            "Console.WriteLine"
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — A tour of C#",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/"
          },
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Methods, Parameters & Return Values",
        "summary": "Package behavior into methods with clear inputs/outputs and learn optional, named, ref/out, and expression-bodied forms gradually.",
        "concepts": [
          {
            "name": "Method signature",
            "explanation": "A method declares accessibility/modifiers, return type, name, and parameters. The parameter types are part of overload selection."
          },
          {
            "name": "Return values",
            "explanation": "Use void when no value is returned; otherwise every reachable path must satisfy the method return contract unless execution throws."
          },
          {
            "name": "Parameters",
            "explanation": "Arguments are passed by value by default. ref, out, and in change parameter passing semantics and should be used only when their intent is clear."
          }
        ],
        "example": "static double Average(int first, int second)\n{\n    int total = first + second;\n    return total / 2.0;\n}\n\nstatic bool IsPassing(int score) => score >= 80;\n\nConsole.WriteLine(Average(80, 92));\nConsole.WriteLine(IsPassing(84));",
        "challenge": "Write one method that accepts two numeric parameters and returns a calculated result, then call it.",
        "hint": "Choose a non-void return type and return the computed value instead of only printing inside the method.",
        "solution": "static double Average(int first, int second)\n{\n    int total = first + second;\n    return total / 2.0;\n}\n\nstatic bool IsPassing(int score) => score >= 80;\n\nConsole.WriteLine(Average(80, 92));\nConsole.WriteLine(IsPassing(84));",
        "groups": [
          [
            "static "
          ],
          [
            "return "
          ],
          [
            "("
          ],
          [
            "Console.WriteLine"
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — A tour of C#",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/"
          },
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Classes, Objects & Basic Encapsulation",
        "summary": "Create your own reference types with fields/properties, constructors, methods, and controlled access to state.",
        "concepts": [
          {
            "name": "Class and instance",
            "explanation": "A class describes a type; new creates an instance. Each instance has its own instance state while static members belong to the type itself."
          },
          {
            "name": "Properties",
            "explanation": "Properties expose get/set accessors and are the normal public data surface for C# objects. Auto-properties are concise when no custom accessor logic is required."
          },
          {
            "name": "Constructors",
            "explanation": "Constructors establish valid initial state. Prefer objects that cannot exist in obviously invalid states after construction."
          }
        ],
        "example": "class Learner\n{\n    public string Name { get; }\n    public int Score { get; private set; }\n\n    public Learner(string name)\n    {\n        Name = name;\n    }\n\n    public void RecordScore(int score)\n    {\n        Score = score;\n    }\n}\n\nLearner learner = new(\"Nova\");\nlearner.RecordScore(91);\nConsole.WriteLine($\"{learner.Name}: {learner.Score}\");",
        "challenge": "Create a class with two properties, a constructor, and one method that changes controlled state.",
        "hint": "Use private set when callers should be able to read a property but not assign it directly.",
        "solution": "class Learner\n{\n    public string Name { get; }\n    public int Score { get; private set; }\n\n    public Learner(string name)\n    {\n        Name = name;\n    }\n\n    public void RecordScore(int score)\n    {\n        Score = score;\n    }\n}\n\nLearner learner = new(\"Nova\");\nlearner.RecordScore(91);\nConsole.WriteLine($\"{learner.Name}: {learner.Score}\");",
        "groups": [
          [
            "class "
          ],
          [
            "public "
          ],
          [
            "{ get;"
          ],
          [
            "constructor",
            "public "
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — A tour of C#",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/"
          },
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      }
    ],
    "junior": [
      {
        "title": "Properties, Constructors & Encapsulation",
        "summary": "Build types whose public API protects invariants using access modifiers, validated setters, init-only values, and constructor requirements.",
        "concepts": [
          {
            "name": "Access modifiers",
            "explanation": "public exposes a member broadly; private limits access to the containing type; protected and internal support inheritance/assembly boundaries."
          },
          {
            "name": "Properties as behavior",
            "explanation": "A property can validate in its setter or compute in its getter. Do not expose mutable fields publicly when a property can preserve the type contract."
          },
          {
            "name": "Initialization",
            "explanation": "Constructors, required members, and init accessors express what must be supplied when an object is created and what may change later."
          }
        ],
        "example": "class Course\n{\n    public required string Name { get; init; }\n    public int PassMark { get; }\n\n    public Course(int passMark)\n    {\n        if (passMark is < 0 or > 100)\n            throw new ArgumentOutOfRangeException(nameof(passMark));\n\n        PassMark = passMark;\n    }\n}\n\nCourse course = new(80) { Name = \"C# Junior\" };\nConsole.WriteLine(course.PassMark);",
        "challenge": "Create a class that validates a constructor argument and exposes at least one property with restricted modification.",
        "hint": "Validate invalid state at the boundary, then make the valid value available through a property.",
        "solution": "class Course\n{\n    public required string Name { get; init; }\n    public int PassMark { get; }\n\n    public Course(int passMark)\n    {\n        if (passMark is < 0 or > 100)\n            throw new ArgumentOutOfRangeException(nameof(passMark));\n\n        PassMark = passMark;\n    }\n}\n\nCourse course = new(80) { Name = \"C# Junior\" };\nConsole.WriteLine(course.PassMark);",
        "groups": [
          [
            "class "
          ],
          [
            "public "
          ],
          [
            "throw new"
          ],
          [
            "get;"
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          },
          {
            "title": "Microsoft Learn — A tour of C#",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Inheritance, Interfaces & Polymorphism",
        "summary": "Separate “is-a” inheritance from capability contracts and call behavior through base/interface types.",
        "concepts": [
          {
            "name": "Inheritance",
            "explanation": "A class can derive from one base class. virtual members may be overridden by derived classes; base constructors and methods can be invoked with base."
          },
          {
            "name": "Interfaces",
            "explanation": "Interfaces describe a contract without requiring a specific class hierarchy. A class can implement multiple interfaces."
          },
          {
            "name": "Polymorphism",
            "explanation": "Code can depend on an interface/base type and receive different concrete implementations. This reduces coupling when the abstraction represents a real shared behavior."
          }
        ],
        "example": "interface IScorable\n{\n    int Score { get; }\n    bool Passed(int passMark);\n}\n\nclass Assessment : IScorable\n{\n    public int Score { get; init; }\n    public bool Passed(int passMark) => Score >= passMark;\n}\n\nIScorable result = new Assessment { Score = 91 };\nConsole.WriteLine(result.Passed(80));",
        "challenge": "Create an interface with one property and one method, implement it in a class, and use the object through the interface type.",
        "hint": "Write the interface contract first, then make the class provide every required member.",
        "solution": "interface IScorable\n{\n    int Score { get; }\n    bool Passed(int passMark);\n}\n\nclass Assessment : IScorable\n{\n    public int Score { get; init; }\n    public bool Passed(int passMark) => Score >= passMark;\n}\n\nIScorable result = new Assessment { Score = 91 };\nConsole.WriteLine(result.Passed(80));",
        "groups": [
          [
            "interface "
          ],
          [
            "class "
          ],
          [
            ": I"
          ],
          [
            "=>",
            "return "
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          },
          {
            "title": "Microsoft Learn — A tour of C#",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Collections, Dictionaries & Enumeration",
        "summary": "Choose arrays, List<T>, Dictionary<TKey,TValue>, HashSet<T>, queues, and stacks based on access and uniqueness needs.",
        "concepts": [
          {
            "name": "Dictionary",
            "explanation": "Dictionary<TKey,TValue> maps unique keys to values and provides fast lookup by key in typical cases."
          },
          {
            "name": "HashSet",
            "explanation": "HashSet<T> stores unique values and supports set operations such as union, intersection, and membership tests."
          },
          {
            "name": "Enumeration",
            "explanation": "foreach works with the enumeration pattern/IEnumerable<T>. Avoid modifying many collections structurally while enumerating them unless the API documents it as safe."
          }
        ],
        "example": "Dictionary<string, int> scores = new()\n{\n    [\"HTML\"] = 92,\n    [\"CSS\"] = 88\n};\n\nscores[\"C#\"] = 95;\n\nHashSet<string> completed = new() { \"HTML\", \"CSS\" };\ncompleted.Add(\"C#\");\n\nConsole.WriteLine(scores[\"C#\"]);\nConsole.WriteLine(completed.Contains(\"CSS\"));",
        "challenge": "Create a Dictionary<string,int> and a HashSet<string>, add values, and perform one lookup/membership check.",
        "hint": "A dictionary uses two generic type arguments: one for keys and one for values.",
        "solution": "Dictionary<string, int> scores = new()\n{\n    [\"HTML\"] = 92,\n    [\"CSS\"] = 88\n};\n\nscores[\"C#\"] = 95;\n\nHashSet<string> completed = new() { \"HTML\", \"CSS\" };\ncompleted.Add(\"C#\");\n\nConsole.WriteLine(scores[\"C#\"]);\nConsole.WriteLine(completed.Contains(\"CSS\"));",
        "groups": [
          [
            "Dictionary<"
          ],
          [
            "HashSet<"
          ],
          [
            ".Add("
          ],
          [
            ".Contains("
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          },
          {
            "title": "Microsoft Learn — A tour of C#",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Exceptions & Defensive Error Handling",
        "summary": "Represent exceptional failures with exceptions, preserve useful context, and distinguish validation from broad catch-all handling.",
        "concepts": [
          {
            "name": "Throwing",
            "explanation": "Throw exceptions when a method cannot satisfy its contract. Standard exception types such as ArgumentException and InvalidOperationException communicate common failure categories."
          },
          {
            "name": "try/catch/finally",
            "explanation": "Catch only where you can recover, translate, log, or add useful context. finally is for cleanup that must occur whether the operation succeeds or fails."
          },
          {
            "name": "Do not hide failures",
            "explanation": "An empty catch block destroys evidence. Preserve the original exception when wrapping it, and avoid using exceptions as routine branch logic."
          }
        ],
        "example": "static int ParseScore(string text)\n{\n    if (!int.TryParse(text, out int score))\n        throw new FormatException(\"Score must be an integer.\");\n\n    if (score is < 0 or > 100)\n        throw new ArgumentOutOfRangeException(nameof(text));\n\n    return score;\n}\n\ntry\n{\n    Console.WriteLine(ParseScore(\"91\"));\n}\ncatch (Exception ex)\n{\n    Console.WriteLine(ex.Message);\n}",
        "challenge": "Write a method that throws a meaningful exception for invalid input and a caller that handles it with try/catch.",
        "hint": "Use a specific exception inside the method. The caller decides whether it can recover or report the error.",
        "solution": "static int ParseScore(string text)\n{\n    if (!int.TryParse(text, out int score))\n        throw new FormatException(\"Score must be an integer.\");\n\n    if (score is < 0 or > 100)\n        throw new ArgumentOutOfRangeException(nameof(text));\n\n    return score;\n}\n\ntry\n{\n    Console.WriteLine(ParseScore(\"91\"));\n}\ncatch (Exception ex)\n{\n    Console.WriteLine(ex.Message);\n}",
        "groups": [
          [
            "throw new"
          ],
          [
            "try"
          ],
          [
            "catch ("
          ],
          [
            "Exception"
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          },
          {
            "title": "Microsoft Learn — A tour of C#",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Files, using & Resource Lifetime",
        "summary": "Read/write local files and ensure disposable resources are released even when an operation fails.",
        "concepts": [
          {
            "name": "File helpers",
            "explanation": "File.ReadAllText/WriteAllText and async variants cover small straightforward file operations without manual stream management."
          },
          {
            "name": "IDisposable",
            "explanation": "Some resources own operating-system or unmanaged handles. IDisposable provides deterministic cleanup through Dispose."
          },
          {
            "name": "using",
            "explanation": "using statements/declarations call Dispose automatically at scope exit, including exceptional paths. await using does the same for IAsyncDisposable."
          }
        ],
        "example": "string path = \"progress.txt\";\nFile.WriteAllText(path, \"HTML=92\nCSS=88\");\nstring text = File.ReadAllText(path);\nConsole.WriteLine(text);\n\nusing StreamReader reader = File.OpenText(path);\nConsole.WriteLine(reader.ReadLine());",
        "challenge": "Write text to a local file, read it back, and use at least one using declaration with a disposable file/stream object.",
        "hint": "Use File helpers for the simple operation and a using declaration when you create a disposable stream directly.",
        "solution": "string path = \"progress.txt\";\nFile.WriteAllText(path, \"HTML=92\nCSS=88\");\nstring text = File.ReadAllText(path);\nConsole.WriteLine(text);\n\nusing StreamReader reader = File.OpenText(path);\nConsole.WriteLine(reader.ReadLine());",
        "groups": [
          [
            "File.WriteAllText",
            "File.WriteAllTextAsync"
          ],
          [
            "File.ReadAllText",
            "File.ReadAllTextAsync"
          ],
          [
            "using "
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      }
    ],
    "intermediate": [
      {
        "title": "Generics & Type Constraints",
        "summary": "Write reusable code that remains type-safe by parameterizing classes and methods with types and constraining capabilities when necessary.",
        "concepts": [
          {
            "name": "Generic parameters",
            "explanation": "T is a placeholder resolved when the generic type or method is used. The compiler still knows the actual type and checks operations at compile time."
          },
          {
            "name": "Constraints",
            "explanation": "where clauses express requirements such as class, struct, notnull, new(), a base type, or an interface. Constraints enable safe operations on T."
          },
          {
            "name": "Reusable APIs",
            "explanation": "Generics power List<T>, Dictionary<TKey,TValue>, Task<T>, Func<T,...>, LINQ, and many .NET APIs because they combine reuse with static type information."
          }
        ],
        "example": "static T ChooseHigher<T>(T first, T second) where T : IComparable<T>\n{\n    return first.CompareTo(second) >= 0 ? first : second;\n}\n\nConsole.WriteLine(ChooseHigher(10, 7));\nConsole.WriteLine(ChooseHigher(\"CSS\", \"C#\"));",
        "challenge": "Write a generic method with one type parameter and an interface constraint, then call it with two different types.",
        "hint": "The constraint should describe the capability your implementation needs from T.",
        "solution": "static T ChooseHigher<T>(T first, T second) where T : IComparable<T>\n{\n    return first.CompareTo(second) >= 0 ? first : second;\n}\n\nConsole.WriteLine(ChooseHigher(10, 7));\nConsole.WriteLine(ChooseHigher(\"CSS\", \"C#\"));",
        "groups": [
          [
            "<T>"
          ],
          [
            "where T :"
          ],
          [
            "IComparable"
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — Generic types and methods",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/generics"
          },
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Delegates, Lambdas & Events",
        "summary": "Treat behavior as data through delegates/lambdas and expose opt-in notifications through events.",
        "concepts": [
          {
            "name": "Delegates",
            "explanation": "A delegate type describes a method signature. Func<...> and Action<...> are general-purpose delegate types for return-value and void callbacks."
          },
          {
            "name": "Lambdas",
            "explanation": "Lambda expressions provide compact function values and capture lexical variables. Captured mutable state should be used deliberately."
          },
          {
            "name": "Events",
            "explanation": "event wraps delegate-based publication with restrictions: outside code can subscribe/unsubscribe but only the declaring type can raise the event."
          }
        ],
        "example": "class CourseProgress\n{\n    public event EventHandler<int>? ScoreChanged;\n    public int Score { get; private set; }\n\n    public void UpdateScore(int score)\n    {\n        Score = score;\n        ScoreChanged?.Invoke(this, score);\n    }\n}\n\nCourseProgress progress = new();\nprogress.ScoreChanged += (_, score) => Console.WriteLine($\"New score: {score}\");\nprogress.UpdateScore(93);",
        "challenge": "Create a class with an event, raise it from a method, and subscribe with a lambda.",
        "hint": "The publisher declares and raises the event; subscribers attach with +=.",
        "solution": "class CourseProgress\n{\n    public event EventHandler<int>? ScoreChanged;\n    public int Score { get; private set; }\n\n    public void UpdateScore(int score)\n    {\n        Score = score;\n        ScoreChanged?.Invoke(this, score);\n    }\n}\n\nCourseProgress progress = new();\nprogress.ScoreChanged += (_, score) => Console.WriteLine($\"New score: {score}\");\nprogress.UpdateScore(93);",
        "groups": [
          [
            "event "
          ],
          [
            "+="
          ],
          [
            "=>"
          ],
          [
            "Invoke"
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — Lambdas, delegates, and events",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/delegates-lambdas"
          },
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "LINQ & Declarative Data Queries",
        "summary": "Filter, project, order, group, aggregate, and compose sequences with strongly typed query operators.",
        "concepts": [
          {
            "name": "Deferred execution",
            "explanation": "Many LINQ operators return an IEnumerable<T> pipeline that executes when enumerated, so later source changes may affect results unless you materialize with ToList/ToArray."
          },
          {
            "name": "Core operators",
            "explanation": "Where filters, Select transforms, OrderBy sorts, GroupBy groups, Any/All test conditions, and aggregate operators combine values."
          },
          {
            "name": "Method/query syntax",
            "explanation": "Most queries can be expressed with method syntax or query-expression syntax. Prefer whichever makes the transformation easier to read."
          }
        ],
        "example": "List<int> scores = new() { 72, 91, 84, 67, 95 };\n\nvar passing = scores\n    .Where(score => score >= 80)\n    .OrderByDescending(score => score)\n    .Select(score => $\"{score}%\")\n    .ToList();\n\nforeach (string score in passing)\n    Console.WriteLine(score);",
        "challenge": "Use LINQ to filter passing scores, order them, project them into another form, and materialize the result.",
        "hint": "Think of the pipeline as steps: Where → OrderBy/OrderByDescending → Select → ToList.",
        "solution": "List<int> scores = new() { 72, 91, 84, 67, 95 };\n\nvar passing = scores\n    .Where(score => score >= 80)\n    .OrderByDescending(score => score)\n    .Select(score => $\"{score}%\")\n    .ToList();\n\nforeach (string score in passing)\n    Console.WriteLine(score);",
        "groups": [
          [
            ".Where("
          ],
          [
            ".Select("
          ],
          [
            ".OrderBy"
          ],
          [
            ".ToList("
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — LINQ",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/linq/"
          },
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "async/await & Task-Based Asynchrony",
        "summary": "Write nonblocking asynchronous workflows, compose tasks, propagate cancellation, and preserve exception behavior.",
        "concepts": [
          {
            "name": "Task model",
            "explanation": "Task represents an ongoing async operation; Task<T> produces a value. async methods normally return Task, Task<T>, ValueTask, or specialized async-stream forms."
          },
          {
            "name": "await",
            "explanation": "await asynchronously waits for a task and resumes the method when it completes. Avoid blocking on Task.Result/Wait in async workflows."
          },
          {
            "name": "Composition",
            "explanation": "Start independent operations before awaiting them and use Task.WhenAll/WhenAny when the work can overlap. CancellationToken communicates cooperative cancellation."
          }
        ],
        "example": "static async Task<string[]> LoadFilesAsync(IEnumerable<string> paths, CancellationToken token)\n{\n    Task<string>[] reads = paths\n        .Select(path => File.ReadAllTextAsync(path, token))\n        .ToArray();\n\n    return await Task.WhenAll(reads);\n}\n\nusing CancellationTokenSource cts = new();\nstring[] content = await LoadFilesAsync(new[] { \"a.txt\", \"b.txt\" }, cts.Token);\nConsole.WriteLine(content.Length);",
        "challenge": "Write an async method returning Task<T>, await at least one async operation, and accept/forward a CancellationToken.",
        "hint": "Do not replace async file/network APIs with Task.Run unless you actually need to offload CPU-bound work.",
        "solution": "static async Task<string[]> LoadFilesAsync(IEnumerable<string> paths, CancellationToken token)\n{\n    Task<string>[] reads = paths\n        .Select(path => File.ReadAllTextAsync(path, token))\n        .ToArray();\n\n    return await Task.WhenAll(reads);\n}\n\nusing CancellationTokenSource cts = new();\nstring[] content = await LoadFilesAsync(new[] { \"a.txt\", \"b.txt\" }, cts.Token);\nConsole.WriteLine(content.Length);",
        "groups": [
          [
            "async "
          ],
          [
            "Task<"
          ],
          [
            "await "
          ],
          [
            "CancellationToken"
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — Asynchronous programming",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/"
          },
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Records, Pattern Matching & Modern Data Modeling",
        "summary": "Use records for value-oriented models and pattern matching for expressive, type-safe branching over data shape.",
        "concepts": [
          {
            "name": "Records",
            "explanation": "record class and record struct synthesize value-based equality and support with expressions, making them useful for immutable-ish data models and messages."
          },
          {
            "name": "Patterns",
            "explanation": "Type, property, relational, list, logical, and positional patterns can test data while extracting values."
          },
          {
            "name": "Switch expressions",
            "explanation": "Switch expressions pair patterns with result expressions and encourage exhaustive, expression-oriented decision logic."
          }
        ],
        "example": "public record Assessment(string Module, int Score);\n\nstatic string Classify(Assessment assessment) => assessment switch\n{\n    { Score: >= 90 } => \"Excellent\",\n    { Score: >= 80 } => \"Pass\",\n    { Score: >= 0 } => \"Retry\",\n    _ => throw new ArgumentOutOfRangeException(nameof(assessment))\n};\n\nAssessment result = new(\"C#\", 92);\nAssessment revised = result with { Score = 95 };\nConsole.WriteLine(Classify(revised));",
        "challenge": "Create a record with at least two values and classify it with a switch expression using property/relational patterns.",
        "hint": "A record is useful here because the data has identity-by-value semantics and can be copied with with { ... }.",
        "solution": "public record Assessment(string Module, int Score);\n\nstatic string Classify(Assessment assessment) => assessment switch\n{\n    { Score: >= 90 } => \"Excellent\",\n    { Score: >= 80 } => \"Pass\",\n    { Score: >= 0 } => \"Retry\",\n    _ => throw new ArgumentOutOfRangeException(nameof(assessment))\n};\n\nAssessment result = new(\"C#\", 92);\nAssessment revised = result with { Score = 95 };\nConsole.WriteLine(Classify(revised));",
        "groups": [
          [
            "record "
          ],
          [
            "switch"
          ],
          [
            "with {"
          ],
          [
            "=>"
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — A tour of C#",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/"
          },
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      }
    ],
    "senior": [
      {
        "title": "Value Types, Reference Types, ref & Nullability",
        "summary": "Reason precisely about copying, aliasing, nullable reference analysis, structs, readonly data, and by-reference APIs.",
        "concepts": [
          {
            "name": "Value versus reference",
            "explanation": "Struct values are copied by value; class variables copy references to objects. This semantic distinction matters more than memorizing “stack versus heap” shortcuts."
          },
          {
            "name": "ref family",
            "explanation": "ref, in, out, ref readonly, ref returns, and ref locals allow code to alias storage rather than copy values. These tools improve specific APIs but increase lifetime/aliasing complexity."
          },
          {
            "name": "Nullable references",
            "explanation": "Nullable reference types add compile-time flow analysis. string and string? express different nullability intent, but the feature does not magically prevent every runtime null."
          }
        ],
        "example": "#nullable enable\n\nreadonly struct Score\n{\n    public int Value { get; }\n    public Score(int value) => Value = value;\n}\n\nstatic int Max(in Score first, in Score second) =>\n    first.Value >= second.Value ? first.Value : second.Value;\n\nScore a = new(88);\nScore b = new(93);\nstring? optionalNote = null;\nConsole.WriteLine(Max(in a, in b));\nConsole.WriteLine(optionalNote?.Length ?? 0);",
        "challenge": "Create a readonly struct and pass at least one struct argument with in/ref readonly semantics; also demonstrate one nullable reference.",
        "hint": "Focus on semantics: readonly struct protects mutation, while in avoids copying/communicates readonly by-reference intent in suitable APIs.",
        "solution": "#nullable enable\n\nreadonly struct Score\n{\n    public int Value { get; }\n    public Score(int value) => Value = value;\n}\n\nstatic int Max(in Score first, in Score second) =>\n    first.Value >= second.Value ? first.Value : second.Value;\n\nScore a = new(88);\nScore b = new(93);\nstring? optionalNote = null;\nConsole.WriteLine(Max(in a, in b));\nConsole.WriteLine(optionalNote?.Length ?? 0);",
        "groups": [
          [
            "readonly struct"
          ],
          [
            " in ",
            "in "
          ],
          [
            "string?",
            "? "
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          },
          {
            "title": "Microsoft Learn — Reduce allocations and copies",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/advanced-topics/performance/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Advanced Interfaces, Abstractions & API Contracts",
        "summary": "Design stable abstractions with interfaces, generic contracts, default/static interface members where appropriate, and explicit dependency direction.",
        "concepts": [
          {
            "name": "Interface evolution",
            "explanation": "Default interface members can add implementation to interfaces, but they change design tradeoffs and should not become a substitute for coherent base abstractions."
          },
          {
            "name": "Static abstract members",
            "explanation": "Modern C# interfaces can require static abstract members, enabling generic algorithms over operator-like capabilities and powering generic math patterns."
          },
          {
            "name": "Dependency direction",
            "explanation": "High-level logic should depend on contracts that describe needed behavior. Keep interfaces focused enough that implementations can satisfy them honestly."
          }
        ],
        "example": "public interface IScorer<TSelf> where TSelf : IScorer<TSelf>\n{\n    static abstract TSelf FromScore(int value);\n    int Value { get; }\n}\n\npublic readonly record struct Score(int Value) : IScorer<Score>\n{\n    public static Score FromScore(int value) => new(value);\n}\n\nstatic T CreatePerfect<T>() where T : IScorer<T> => T.FromScore(100);\nConsole.WriteLine(CreatePerfect<Score>().Value);",
        "challenge": "Create an interface with a static abstract member and a generic method constrained to that interface.",
        "hint": "Static abstract interface members are consumed through a constrained type parameter, not an interface instance.",
        "solution": "public interface IScorer<TSelf> where TSelf : IScorer<TSelf>\n{\n    static abstract TSelf FromScore(int value);\n    int Value { get; }\n}\n\npublic readonly record struct Score(int Value) : IScorer<Score>\n{\n    public static Score FromScore(int value) => new(value);\n}\n\nstatic T CreatePerfect<T>() where T : IScorer<T> => T.FromScore(100);\nConsole.WriteLine(CreatePerfect<Score>().Value);",
        "groups": [
          [
            "interface "
          ],
          [
            "static abstract"
          ],
          [
            "where T :"
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          },
          {
            "title": "Microsoft Learn — Generic types and methods",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/generics"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Task Coordination, Cancellation & Concurrent Design",
        "summary": "Compose asynchronous operations under cancellation and failure while distinguishing I/O concurrency from CPU parallelism.",
        "concepts": [
          {
            "name": "Cancellation tokens",
            "explanation": "CancellationToken is cooperative: pass it through layers and check or forward it to APIs that support cancellation."
          },
          {
            "name": "Task coordination",
            "explanation": "Task.WhenAll, WhenAny, SemaphoreSlim, and channels/queues solve different coordination problems. Avoid starting unbounded work just because async makes it easy."
          },
          {
            "name": "CPU versus I/O",
            "explanation": "Async improves nonblocking waits; it does not automatically make CPU-heavy work parallel. Parallelism uses threads/cores and has separate synchronization costs."
          }
        ],
        "example": "static async Task<IReadOnlyList<string>> LoadAllAsync(\n    IEnumerable<string> paths,\n    int maxConcurrency,\n    CancellationToken token)\n{\n    using SemaphoreSlim gate = new(maxConcurrency);\n    var tasks = paths.Select(async path =>\n    {\n        await gate.WaitAsync(token);\n        try { return await File.ReadAllTextAsync(path, token); }\n        finally { gate.Release(); }\n    });\n\n    return await Task.WhenAll(tasks);\n}",
        "challenge": "Write an async workflow that forwards CancellationToken and limits concurrency with SemaphoreSlim or a similar gate.",
        "hint": "The concurrency limit should wrap each operation with WaitAsync in try/finally so the permit is always released.",
        "solution": "static async Task<IReadOnlyList<string>> LoadAllAsync(\n    IEnumerable<string> paths,\n    int maxConcurrency,\n    CancellationToken token)\n{\n    using SemaphoreSlim gate = new(maxConcurrency);\n    var tasks = paths.Select(async path =>\n    {\n        await gate.WaitAsync(token);\n        try { return await File.ReadAllTextAsync(path, token); }\n        finally { gate.Release(); }\n    });\n\n    return await Task.WhenAll(tasks);\n}",
        "groups": [
          [
            "CancellationToken"
          ],
          [
            "SemaphoreSlim"
          ],
          [
            "WaitAsync"
          ],
          [
            "Task.WhenAll"
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — Asynchronous programming",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/"
          },
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Reflection, Attributes & Runtime Metadata",
        "summary": "Inspect type metadata, annotate code with attributes, and invoke discovery-based behavior without losing sight of compile-time alternatives.",
        "concepts": [
          {
            "name": "Attributes",
            "explanation": "Attributes attach metadata to assemblies, types, members, parameters, and more. Attribute classes derive from System.Attribute."
          },
          {
            "name": "Reflection",
            "explanation": "System.Reflection can inspect types, members, generic arguments, attributes, and sometimes invoke members dynamically."
          },
          {
            "name": "Tradeoffs",
            "explanation": "Reflection is flexible but reduces compile-time visibility and may have trimming/AOT/performance implications. Source generation or explicit registration can be better for hot paths and deployment-sensitive code."
          }
        ],
        "example": "[AttributeUsage(AttributeTargets.Class)]\nsealed class AcademyModuleAttribute : Attribute\n{\n    public string Name { get; }\n    public AcademyModuleAttribute(string name) => Name = name;\n}\n\n[AcademyModule(\"C# Senior\")]\nclass SeniorCourse { }\n\nType type = typeof(SeniorCourse);\nvar attribute = type.GetCustomAttributes(typeof(AcademyModuleAttribute), inherit: false)\n    .Cast<AcademyModuleAttribute>()\n    .Single();\nConsole.WriteLine(attribute.Name);",
        "challenge": "Create a custom attribute, apply it to a type, and read that attribute through reflection.",
        "hint": "Derive the attribute from Attribute and limit its valid targets with AttributeUsage.",
        "solution": "[AttributeUsage(AttributeTargets.Class)]\nsealed class AcademyModuleAttribute : Attribute\n{\n    public string Name { get; }\n    public AcademyModuleAttribute(string name) => Name = name;\n}\n\n[AcademyModule(\"C# Senior\")]\nclass SeniorCourse { }\n\nType type = typeof(SeniorCourse);\nvar attribute = type.GetCustomAttributes(typeof(AcademyModuleAttribute), inherit: false)\n    .Cast<AcademyModuleAttribute>()\n    .Single();\nConsole.WriteLine(attribute.Name);",
        "groups": [
          [
            ": Attribute"
          ],
          [
            "AttributeUsage"
          ],
          [
            "typeof("
          ],
          [
            "GetCustomAttributes"
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Testing, SOLID Tradeoffs & Maintainable C# Design",
        "summary": "Design testable code by separating pure logic from effects and apply design principles as tradeoff tools rather than rigid slogans.",
        "concepts": [
          {
            "name": "Test seams",
            "explanation": "Inject clocks, storage, HTTP clients, or repositories behind narrow abstractions when deterministic tests need control over those dependencies."
          },
          {
            "name": "Single responsibility",
            "explanation": "A type should have a coherent reason to change. Splitting every three-line method into a new class is not automatically better design."
          },
          {
            "name": "Dependency inversion",
            "explanation": "High-level policy should not be forced to construct low-level infrastructure. Constructor/function injection makes dependencies explicit and replaceable."
          }
        ],
        "example": "public interface IProgressStore\n{\n    Task SaveAsync(int score, CancellationToken token);\n}\n\npublic sealed class AcademyService\n{\n    private readonly IProgressStore _store;\n    public AcademyService(IProgressStore store) => _store = store;\n\n    public Task SavePassingScoreAsync(int score, CancellationToken token)\n    {\n        if (score < 80) throw new InvalidOperationException(\"Score is not passing.\");\n        return _store.SaveAsync(score, token);\n    }\n}",
        "challenge": "Create a service that receives one dependency through its constructor and uses that abstraction instead of constructing the dependency internally.",
        "hint": "The constructor should clearly show what the service needs in order to do its work.",
        "solution": "public interface IProgressStore\n{\n    Task SaveAsync(int score, CancellationToken token);\n}\n\npublic sealed class AcademyService\n{\n    private readonly IProgressStore _store;\n    public AcademyService(IProgressStore store) => _store = store;\n\n    public Task SavePassingScoreAsync(int score, CancellationToken token)\n    {\n        if (score < 80) throw new InvalidOperationException(\"Score is not passing.\");\n        return _store.SaveAsync(score, token);\n    }\n}",
        "groups": [
          [
            "interface "
          ],
          [
            "private readonly"
          ],
          [
            "public "
          ],
          [
            "constructor",
            "("
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      }
    ],
    "advanced": [
      {
        "title": "Span<T>, Memory<T> & Allocation-Aware APIs",
        "summary": "Work with contiguous memory safely while avoiding unnecessary allocations/copies on measured hot paths.",
        "concepts": [
          {
            "name": "Span<T>",
            "explanation": "Span<T> is a stack-only ref struct view over contiguous memory. Slicing a span creates another view instead of copying the underlying data."
          },
          {
            "name": "Memory<T>",
            "explanation": "Memory<T> is not stack-only and can cross async boundaries or be stored on the heap; its Span property exposes synchronous span access."
          },
          {
            "name": "Measure first",
            "explanation": "Allocation reduction is valuable in hot paths, but ref-heavy APIs increase complexity. Profile before replacing simple string/array code with low-level memory abstractions."
          }
        ],
        "example": "static int SumCsv(ReadOnlySpan<char> text)\n{\n    int total = 0;\n    while (!text.IsEmpty)\n    {\n        int comma = text.IndexOf(',');\n        ReadOnlySpan<char> part = comma < 0 ? text : text[..comma];\n        total += int.Parse(part);\n        if (comma < 0) break;\n        text = text[(comma + 1)..];\n    }\n    return total;\n}\n\nConsole.WriteLine(SumCsv(\"10,20,30\"));",
        "challenge": "Write a method accepting ReadOnlySpan<char> and slice it at least once without creating a substring for every part.",
        "hint": "Use range slicing such as span[..index] and span[(index + 1)..].",
        "solution": "static int SumCsv(ReadOnlySpan<char> text)\n{\n    int total = 0;\n    while (!text.IsEmpty)\n    {\n        int comma = text.IndexOf(',');\n        ReadOnlySpan<char> part = comma < 0 ? text : text[..comma];\n        total += int.Parse(part);\n        if (comma < 0) break;\n        text = text[(comma + 1)..];\n    }\n    return total;\n}\n\nConsole.WriteLine(SumCsv(\"10,20,30\"));",
        "groups": [
          [
            "ReadOnlySpan<",
            "Span<"
          ],
          [
            ".."
          ],
          [
            "Slice",
            "["
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — Reduce allocations and copies",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/advanced-topics/performance/"
          },
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Expression Trees & Code-as-Data",
        "summary": "Represent lambda expressions as inspectable expression trees for query providers, rules engines, mapping, and dynamic composition.",
        "concepts": [
          {
            "name": "Delegate versus tree",
            "explanation": "Func<T,...> is executable behavior. Expression<Func<T,...>> is a data structure describing the expression and can later be compiled or translated."
          },
          {
            "name": "Tree nodes",
            "explanation": "Expression trees contain nodes such as parameters, constants, member access, calls, and binary operations. Libraries can inspect these to build SQL or other representations."
          },
          {
            "name": "Limits",
            "explanation": "Not every C# construct can appear in an expression tree, and providers support different subsets. Keep translated expressions within the target provider capabilities."
          }
        ],
        "example": "using System.Linq.Expressions;\n\nExpression<Func<int, bool>> passingExpression = score => score >= 80;\n\nBinaryExpression body = (BinaryExpression)passingExpression.Body;\nConsole.WriteLine(body.NodeType);\nConsole.WriteLine(body.Left);\nConsole.WriteLine(body.Right);\n\nFunc<int, bool> passing = passingExpression.Compile();\nConsole.WriteLine(passing(92));",
        "challenge": "Create an Expression<Func<...>>, inspect at least one property of its Body, then compile and invoke it.",
        "hint": "The important distinction is that the expression variable stores a tree before Compile turns it into executable delegate behavior.",
        "solution": "using System.Linq.Expressions;\n\nExpression<Func<int, bool>> passingExpression = score => score >= 80;\n\nBinaryExpression body = (BinaryExpression)passingExpression.Body;\nConsole.WriteLine(body.NodeType);\nConsole.WriteLine(body.Left);\nConsole.WriteLine(body.Right);\n\nFunc<int, bool> passing = passingExpression.Compile();\nConsole.WriteLine(passing(92));",
        "groups": [
          [
            "Expression<Func"
          ],
          [
            ".Body"
          ],
          [
            ".Compile("
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          },
          {
            "title": "Microsoft Learn — LINQ",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/linq/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Async Streams & IAsyncEnumerable<T>",
        "summary": "Produce and consume values over time with async iterators without waiting for an entire asynchronous collection to materialize.",
        "concepts": [
          {
            "name": "Async iterator",
            "explanation": "An async iterator returns IAsyncEnumerable<T>, uses yield return, and can await between produced values."
          },
          {
            "name": "await foreach",
            "explanation": "Consumers enumerate asynchronous streams with await foreach, receiving values as they become available."
          },
          {
            "name": "Cancellation",
            "explanation": "[EnumeratorCancellation] can connect a cancellation token parameter with WithCancellation/consumer cancellation semantics in custom iterators."
          }
        ],
        "example": "using System.Runtime.CompilerServices;\n\nstatic async IAsyncEnumerable<int> CountAsync(\n    [EnumeratorCancellation] CancellationToken token = default)\n{\n    for (int i = 1; i <= 5; i++)\n    {\n        token.ThrowIfCancellationRequested();\n        await Task.Delay(100, token);\n        yield return i;\n    }\n}\n\nawait foreach (int value in CountAsync())\n    Console.WriteLine(value);",
        "challenge": "Write an async iterator that awaits between yielded values and consume it with await foreach.",
        "hint": "The method return type is IAsyncEnumerable<T>; inside it you can combine await and yield return.",
        "solution": "using System.Runtime.CompilerServices;\n\nstatic async IAsyncEnumerable<int> CountAsync(\n    [EnumeratorCancellation] CancellationToken token = default)\n{\n    for (int i = 1; i <= 5; i++)\n    {\n        token.ThrowIfCancellationRequested();\n        await Task.Delay(100, token);\n        yield return i;\n    }\n}\n\nawait foreach (int value in CountAsync())\n    Console.WriteLine(value);",
        "groups": [
          [
            "IAsyncEnumerable<"
          ],
          [
            "yield return"
          ],
          [
            "await foreach"
          ],
          [
            "await "
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — Asynchronous programming",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/"
          },
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Variance, Advanced Generic Constraints & Generic Algorithms",
        "summary": "Understand covariance/contravariance and express generic algorithms over precise capabilities without unsafe casts.",
        "concepts": [
          {
            "name": "Covariance",
            "explanation": "out type parameters permit a generic interface/delegate to produce a more derived type where a base type is expected, such as IEnumerable<string> used as IEnumerable<object>."
          },
          {
            "name": "Contravariance",
            "explanation": "in type parameters permit consumers of a base type to stand in for consumers of a derived type in supported generic interfaces/delegates."
          },
          {
            "name": "Constraints as capabilities",
            "explanation": "Multiple constraints can require interfaces, constructors, nullability/value/reference semantics, or static abstract members so algorithms remain type-safe."
          }
        ],
        "example": "IEnumerable<string> names = new[] { \"HTML\", \"CSS\" };\nIEnumerable<object> objects = names; // covariance\n\nAction<object> printObject = value => Console.WriteLine(value);\nAction<string> printString = printObject; // contravariance\nprintString(\"C#\");\n\nstatic T Create<T>() where T : class, new() => new T();",
        "challenge": "Demonstrate one valid generic variance assignment and write a generic method with at least two constraints.",
        "hint": "Remember the direction: producers are commonly covariant (out), consumers are commonly contravariant (in).",
        "solution": "IEnumerable<string> names = new[] { \"HTML\", \"CSS\" };\nIEnumerable<object> objects = names; // covariance\n\nAction<object> printObject = value => Console.WriteLine(value);\nAction<string> printString = printObject; // contravariance\nprintString(\"C#\");\n\nstatic T Create<T>() where T : class, new() => new T();",
        "groups": [
          [
            "IEnumerable<"
          ],
          [
            "Action<"
          ],
          [
            "where T :"
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — Generic types and methods",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/generics"
          },
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      },
      {
        "title": "Unsafe, Interop, GC & Performance Engineering Capstone",
        "summary": "Recognize when advanced runtime techniques are justified and how to measure allocations, pinning, native boundaries, unsafe code, and garbage-collection behavior.",
        "concepts": [
          {
            "name": "Unsafe and interop",
            "explanation": "unsafe code and pointers can bypass some runtime safety for specialized memory/native interop scenarios. P/Invoke and source-generated interop cross managed/native boundaries."
          },
          {
            "name": "GC pressure",
            "explanation": "Allocation rate, object lifetime, large objects, pinning, finalization, and retained references influence garbage-collector work. Optimize from profiler evidence, not folklore."
          },
          {
            "name": "Engineering discipline",
            "explanation": "Advanced optimization requires a baseline, a reproducible benchmark/profile, one controlled change, and verification that correctness and maintainability remain acceptable."
          }
        ],
        "example": "static unsafe int Sum(int* values, int length)\n{\n    int total = 0;\n    for (int i = 0; i < length; i++)\n        total += values[i];\n    return total;\n}\n\nint[] numbers = { 10, 20, 30 };\nunsafe\n{\n    fixed (int* pointer = numbers)\n    {\n        Console.WriteLine(Sum(pointer, numbers.Length));\n    }\n}",
        "challenge": "Write a small unsafe pointer example or, if you prefer safe code, rewrite the same operation with Span<T> and explain why you would choose one approach.",
        "hint": "Unsafe code should be an explicit tool for measured/native requirements, not a badge of seniority. A safe Span<T> solution is often the better answer.",
        "solution": "static unsafe int Sum(int* values, int length)\n{\n    int total = 0;\n    for (int i = 0; i < length; i++)\n        total += values[i];\n    return total;\n}\n\nint[] numbers = { 10, 20, 30 };\nunsafe\n{\n    fixed (int* pointer = numbers)\n    {\n        Console.WriteLine(Sum(pointer, numbers.Length));\n    }\n}",
        "groups": [
          [
            "unsafe",
            "Span<"
          ],
          [
            "for ("
          ],
          [
            "Console.WriteLine",
            "return "
          ]
        ],
        "references": [
          {
            "title": "Microsoft Learn — Reduce allocations and copies",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/advanced-topics/performance/"
          },
          {
            "title": "Microsoft Learn — C# documentation",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          }
        ],
        "pitfalls": [],
        "mastery": []
      }
    ]
  }
};

const ACADEMY_DIFFICULTIES = [
  {
    "id": "intern",
    "name": "Intern",
    "color": "#49ef9c",
    "rank": "I",
    "description": "Absolute foundations. Learn the vocabulary and core building blocks."
  },
  {
    "id": "junior",
    "name": "Junior",
    "color": "#4f8dff",
    "rank": "II",
    "description": "Practical beginner programming with larger exercises and debugging."
  },
  {
    "id": "intermediate",
    "name": "Intermediate",
    "color": "#ffd34d",
    "rank": "III",
    "description": "Combine systems, reason about structure and solve broader problems."
  },
  {
    "id": "senior",
    "name": "Senior",
    "color": "#ff923f",
    "rank": "IV",
    "description": "Advanced design, architecture, performance and professional patterns."
  },
  {
    "id": "advanced",
    "name": "Advanced",
    "color": "#ff4c5f",
    "rank": "V",
    "description": "Difficult concepts, deep problem solving and demanding assessments."
  }
];

const ACADEMY_LANGUAGE_META = {
  "html": {
    "name": "HTML",
    "accent": "#ff7849",
    "filename": "index.html",
    "description": "Structure webpages with semantic elements, forms, media and accessible markup.",
    "iconUrl": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/html5/html5-original.svg",
    "iconFallback": "HTML5"
  },
  "css": {
    "name": "CSS",
    "accent": "#4f8dff",
    "filename": "styles.css",
    "description": "Control layout, spacing, typography, responsive design and polished visual systems.",
    "iconUrl": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/css3/css3-original.svg",
    "iconFallback": "CSS3"
  },
  "javascript": {
    "name": "JavaScript",
    "accent": "#f4d64e",
    "filename": "app.js",
    "description": "Add logic, interactivity, state, events, functions and real application behaviour.",
    "iconUrl": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/javascript/javascript-original.svg",
    "iconFallback": "JS"
  },
  "csharp": {
    "name": "C#",
    "accent": "#a86cff",
    "filename": "Program.cs",
    "description": "Learn strongly typed programming, methods, classes, collections and .NET application logic.",
    "iconUrl": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/csharp/csharp-original.svg",
    "iconFallback": "C#"
  }
};


function has(text, term) {
  return String(text).toLowerCase().includes(String(term).toLowerCase());
}

function groupMatches(text, group) {
  return group.some(term => has(text, term));
}

function buildValidator(groups, minLength = 8) {
  return code => {
    const text = String(code || '').trim();
    return text.length >= minLength && groups.every(group => groupMatches(text, group));
  };
}

function escapeInline(text) {
  return String(text).replace(/[&<>]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[ch]));
}

const WRONG_SUMMARIES = {
  html: [
    'It is mainly a browser database mechanism for storing application records.',
    'It is a CSS-only technique for changing visual colors and spacing.',
    'It is a JavaScript runtime feature used to schedule asynchronous tasks.'
  ],
  css: [
    'It defines semantic document meaning instead of visual presentation.',
    'It is a C# compiler feature for generic type safety.',
    'It is a browser storage API for persisting JavaScript objects.'
  ],
  javascript: [
    'It is an HTML-only rule for document landmarks and heading hierarchy.',
    'It is a CSS layout feature that defines rows and columns.',
    'It is a C# type-system feature checked only by the .NET compiler.'
  ],
  csharp: [
    'It is a browser markup element used to create semantic page structure.',
    'It is a CSS selector rule used to match DOM elements.',
    'It is a JavaScript-only Web API that exists only in browsers.'
  ]
};

function topicQuestion(topic, language, conceptIndex = 0) {
  const concept = topic.concepts[conceptIndex % topic.concepts.length];
  const other = topic.concepts.filter(c => c !== concept).map(c => c.explanation);
  const options = [concept.explanation, ...other, `It means ${topic.title} can only be used for visual decoration.`].slice(0,4);
  return { type:'mc', prompt:`What best describes “${concept.name}” in this module?`, options, answer:concept.explanation };
}

function topicSummaryQuestion(topic, language) {
  return {
    type:'mc',
    prompt:`What is the main goal of “${topic.title}”?`,
    options:[topic.summary, ...WRONG_SUMMARIES[language]],
    answer:topic.summary
  };
}

function lessonFromTopic(topic, language, difficulty, index) {
  const sections = [
    { title:'Core idea', html:topic.summary, code:'' },
    ...topic.concepts.map(concept => ({
      title:concept.name,
      html:concept.explanation,
      code:''
    })),
    {
      title:'Worked example',
      html:'Read the example from top to bottom. Before changing it, explain what each important line contributes. Then change one value, selector, type, condition, or name and predict the result before running it.',
      code:topic.example
    },
    {
      title:'Common mistakes & debugging',
      html:(topic.pitfalls && topic.pitfalls.length)
        ? `<ul>${topic.pitfalls.map(item=>`<li>${item}</li>`).join('')}</ul>`
        : `<ul><li>Do not copy the syntax without being able to explain the role of the key pieces used in this lesson.</li><li>Change one thing at a time, then inspect the browser/compiler output before making another change.</li><li>Prefer the simplest correct feature that communicates intent clearly.</li></ul>`,
      code:''
    },
    {
      title:'Mastery checkpoint',
      html:(topic.mastery && topic.mastery.length)
        ? `<ul>${topic.mastery.map(item=>`<li>${item}</li>`).join('')}</ul>`
        : `<ul><li>Explain ${escapeInline(topic.title)} without reading the example.</li><li>Rebuild the core example with different names and values.</li><li>Recognize at least one situation where this feature is the wrong tool.</li><li>Complete the practice challenge without opening the hint if possible.</li></ul>`,
      code:''
    }
  ];

  const test = {
    title:`${ACADEMY_LANGUAGE_META[language].name} ${ACADEMY_DIFFICULTIES.find(d=>d.id===difficulty).name} — ${topic.title}`,
    questions:[
      topicSummaryQuestion(topic, language),
      topicQuestion(topic, language, 0),
      topicQuestion(topic, language, 1),
      { type:'code', prompt:`Write a short ${ACADEMY_LANGUAGE_META[language].name} example that demonstrates the essential syntax or structure from “${topic.title}”.`, validator:buildValidator(topic.groups.slice(0, Math.min(2, topic.groups.length)), 8) },
      { type:'code', prompt:`Apply “${topic.title}” to a small academy-themed example. Include the key feature(s) from the lesson.`, validator:buildValidator(topic.groups, 12) }
    ]
  };

  return {
    title:topic.title,
    intro:topic.summary,
    sections,
    starter:topic.example,
    references:topic.references,
    practice:{
      prompt:topic.challenge,
      details:'The checker looks for the important ideas from the lesson. There can be more than one valid solution.',
      hint:topic.hint,
      solution:topic.solution,
      validator:buildValidator(topic.groups, 10)
    },
    test
  };
}

function examFromTopics(language, difficulty, topics, examNumber) {
  const diffName = ACADEMY_DIFFICULTIES.find(d=>d.id===difficulty).name;
  const questions = [];
  topics.forEach((topic, index) => {
    questions.push(index % 2 === 0
      ? topicQuestion(topic, language, examNumber + index)
      : topicSummaryQuestion(topic, language));
  });
  topics.forEach((topic, index) => {
    const rotate = (examNumber + index) % topic.groups.length;
    const ordered = [...topic.groups.slice(rotate), ...topic.groups.slice(0, rotate)];
    const required = examNumber === 1 ? ordered.slice(0, Math.min(2, ordered.length))
                   : examNumber === 2 ? ordered.slice(0, Math.min(3, ordered.length))
                   : ordered;
    questions.push({
      type:'code',
      prompt:`Exam ${examNumber}: Create a fresh example demonstrating “${topic.title}”. Do not simply copy the lesson wording; change names/data/structure while preserving the concept.`,
      validator:buildValidator(required, examNumber === 3 ? 20 : 12)
    });
  });
  return { title:`${ACADEMY_LANGUAGE_META[language].name} ${diffName} Exam ${examNumber}`, questions };
}

function buildLevel(language, difficulty) {
  const topics = ACADEMY_TOPIC_DATA[language][difficulty];
  return {
    language:ACADEMY_LANGUAGE_META[language].name,
    difficulty:ACADEMY_DIFFICULTIES.find(d=>d.id===difficulty).name,
    lessons:topics.map((topic,index)=>lessonFromTopic(topic, language, difficulty, index)),
    exams:[1,2,3].map(n=>examFromTopics(language, difficulty, topics, n))
  };
}

const ACADEMY_DATA = {
  languages:Object.fromEntries(Object.entries(ACADEMY_LANGUAGE_META).map(([id,meta])=>[
    id,
    { ...meta, levels:Object.fromEntries(ACADEMY_DIFFICULTIES.map(d=>[d.id, buildLevel(id,d.id)])) }
  ])),
  difficulties:ACADEMY_DIFFICULTIES
};
