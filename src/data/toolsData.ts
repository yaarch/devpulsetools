import { ToolItem } from '../types';

export const TOOLS_LIST: ToolItem[] = [
  {
    id: 'compound-interest-calculator',
    slug: 'compound-interest-calculator',
    name: 'Compound Interest & Investment Calculator',
    shortDesc: 'Calculate exponential wealth growth, compound interest accumulation, annual milestones, and regular contribution returns.',
    category: 'finance',
    iconName: 'TrendingUp',
    tags: ['compound interest', 'investment', 'savings', 'wealth', 'finance', 'calculator', 'stock market', 'growth', 'roi'],
    isPopular: true,
    isNew: true,
    instructions: [
      'Enter your initial starting balance / principal investment amount.',
      'Specify regular monthly or annual recurring contributions.',
      'Set expected annual interest or investment return rate (e.g., 7-10% for index funds).',
      'Select time horizon in years and compounding frequency.',
      'Review the year-by-year milestone table and interactive growth chart.'
    ],
    faqs: [
      {
        question: 'What is Compound Interest?',
        answer: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. It creates exponential wealth growth over long horizons.'
      },
      {
        question: 'What is the Rule of 72?',
        answer: 'The Rule of 72 is a quick mental formula to estimate how many years it takes for your investment to double: Divide 72 by your annual rate of return (e.g., at 8%, your money doubles in ~9 years).'
      }
    ]
  },
  {
    id: 'calorie-calculator',
    slug: 'calorie-calculator',
    name: 'TDEE, Calorie & Macro Nutrition Calculator',
    shortDesc: 'Calculate daily Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and custom protein/carb/fat macro distributions.',
    category: 'education',
    iconName: 'Flame',
    tags: ['calorie', 'tdee', 'bmr', 'macro', 'nutrition', 'fitness', 'weight loss', 'diet', 'health', 'protein'],
    isPopular: true,
    isNew: true,
    instructions: [
      'Select your unit system (Metric kg/cm or Imperial lbs/ft).',
      'Enter your biological gender, age, weight, and height.',
      'Select your current daily activity and exercise level.',
      'Choose your fitness target (mild weight loss, muscle gain, or maintenance).',
      'Explore your clinical BMR, TDEE, and daily protein, carb, and fat gram targets.'
    ],
    faqs: [
      {
        question: 'What is BMR vs TDEE?',
        answer: 'BMR (Basal Metabolic Rate) is the energy your body burns at total rest just to stay alive. TDEE (Total Daily Energy Expenditure) adds your daily movement, exercise, and digestion calories.'
      },
      {
        question: 'Which clinical formula is used?',
        answer: 'We implement the Mifflin-St Jeor equation, the gold-standard formula verified by the American Dietetic Association for metabolic estimation.'
      }
    ]
  },
  {
    id: 'scientific-calculator',
    slug: 'scientific-calculator',
    name: 'Scientific Calculator with History Tape',
    shortDesc: 'Solve trigonometric functions, logarithms, roots, powers, and math expressions with continuous history tape.',
    category: 'education',
    iconName: 'Calculator',
    tags: ['scientific', 'calculator', 'math', 'trig', 'sin', 'cos', 'log', 'history', 'tape', 'fractions'],
    isPopular: true,
    isNew: true,
    instructions: [
      'Use the keypad or type mathematical expressions directly.',
      'Toggle between Degrees (DEG) and Radians (RAD) for trigonometry.',
      'Execute functions including sin, cos, tan, log, ln, square root, and powers.',
      'Click previous results in the history tape to reuse them in ongoing calculations.'
    ],
    faqs: [
      {
        question: 'Can I use previous calculation answers in new formulas?',
        answer: 'Yes! Click the "Ans" button or click on any past calculation in the right-hand history tape to instantly load it.'
      }
    ]
  },
  {
    id: 'real-estate-calculator',
    slug: 'real-estate-calculator',
    name: 'Real Estate & Mortgage Investment Calculator',
    shortDesc: 'Calculate monthly mortgage payments, loan amortization schedules, rental yields, Cap Rate, cash flow, and rent vs. buy comparisons.',
    category: 'finance',
    iconName: 'Building2',
    tags: ['real estate', 'mortgage', 'calculator', 'investment', 'roi', 'cap rate', 'loan', 'property', 'finance', 'amortization'],
    isPopular: true,
    isNew: true,
    instructions: [
      'Select your calculation mode: Mortgage Amortization, Rental Yield & ROI, or Rent vs. Buy.',
      'Pick your preferred currency (USD, SAR, AED, EUR, GBP, EGP, etc.) or choose a quick benchmark preset.',
      'Enter property price, down payment percentage, interest rate, and loan term.',
      'Explore the interactive monthly payment breakdown, full year-by-year amortization schedule, and financial health metrics.',
      'Export the amortization schedule to CSV or click "Copy Report" to share an executive summary.'
    ],
    faqs: [
      {
        question: 'What is Capitalization Rate (Cap Rate) and why does it matter?',
        answer: 'Cap Rate is the ratio of Net Operating Income (NOI) to property asset value. It measures the intrinsic annual return of a real estate investment property without taking financing or mortgage debt into account.'
      },
      {
        question: 'What is the difference between Cap Rate and Cash-on-Cash Return?',
        answer: 'Cap Rate calculates property performance against total purchase price, while Cash-on-Cash Return calculates the annual net cash flow specifically against the actual out-of-pocket cash you invested (down payment + closing/renovation costs).'
      },
      {
        question: 'Are my financial figures stored or tracked?',
        answer: 'No. Everything is computed entirely locally in your browser with zero server tracking and maximum privacy.'
      }
    ]
  },
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    shortDesc: 'Prettify, minify, validate, and inspect JSON with detailed syntax error detection.',
    category: 'developer',
    iconName: 'Braces',
    tags: ['json', 'format', 'minify', 'beautify', 'validate', 'syntax', 'api'],
    isPopular: true,
    instructions: [
      'Paste your raw or minified JSON payload into the input editor.',
      'Click "Format / Prettify" to format with clean indentations (2 or 4 spaces).',
      'Use "Minify / Compact" to compress payload for API transfer.',
      'Check syntax errors highlighted with exact line and column numbers.',
      'Click "Copy" or "Download" to use your formatted JSON.'
    ],
    faqs: [
      {
        question: 'Is my JSON data uploaded to any remote server?',
        answer: 'No. All parsing and formatting happens 100% in your browser memory. Your sensitive credentials and API tokens never leave your computer.'
      },
      {
        question: 'Does this validator support large JSON payloads?',
        answer: 'Yes, it leverages native browser JSON parsing and efficient string buffering to handle multi-megabyte payloads effortlessly.'
      }
    ]
  },
  {
    id: 'base64-encoder-decoder',
    slug: 'base64-encoder-decoder',
    name: 'Base64 Encoder / Decoder',
    shortDesc: 'Encode and decode plain text or binary files to and from Base64 with URL-safe options.',
    category: 'developer',
    iconName: 'Binary',
    tags: ['base64', 'encode', 'decode', 'binary', 'text', 'crypto', 'ascii'],
    isPopular: true,
    instructions: [
      'Choose whether to encode plaintext to Base64 or decode Base64 back to text.',
      'You can also drag and drop any image or file to get its Base64 Data URL.',
      'Toggle URL-Safe mode (substituting + and / with - and _) when encoding web tokens.',
      'Copy the output with one click or download as a raw file.'
    ],
    faqs: [
      {
        question: 'What is URL-safe Base64?',
        answer: 'Standard Base64 contains "+" and "/" which have special meanings in URLs. URL-safe Base64 swaps them with "-" and "_" so they can be passed as query parameters safely.'
      },
      {
        question: 'Can I decode UTF-8 emojis and special characters?',
        answer: 'Yes! Our implementation properly handles full multi-byte UTF-8 string encoding and decoding without mangling characters.'
      }
    ]
  },
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    name: 'Image Compressor & Resizer',
    shortDesc: 'Compress JPEG, PNG, and WebP images locally using client-side HTML5 canvas.',
    category: 'designer',
    iconName: 'ImageDown',
    tags: ['image', 'compress', 'optimize', 'resize', 'jpeg', 'png', 'webp'],
    isPopular: true,
    instructions: [
      'Drop any JPEG, PNG, or WebP image into the upload dropzone.',
      'Adjust the quality slider (e.g. 70%-85% retains optical fidelity with drastic size reductions).',
      'Optionally scale maximum width or height to resize the image.',
      'Compare original vs compressed size and savings percentage side-by-side.',
      'Download your optimized image instantly.'
    ],
    faqs: [
      {
        question: 'Are my private photos uploaded to a cloud server?',
        answer: 'Never. All compression and downscaling is executed directly inside your web browser using HTML5 Canvas APIs.'
      },
      {
        question: 'Which formats yield the highest compression ratio?',
        answer: 'WebP and JPEG offer the highest file size savings. PNG is optimal for graphics with transparent backgrounds.'
      }
    ]
  },
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    shortDesc: 'Generate customizable, high-resolution QR codes for URLs, WiFi credentials, vCards, and text.',
    category: 'data',
    iconName: 'QrCode',
    tags: ['qr', 'qrcode', 'barcode', 'wifi', 'vcard', 'generator', 'svg'],
    isPopular: true,
    instructions: [
      'Select your data type: Link / URL, Plain Text, WiFi Network, or Contact Card (vCard).',
      'Enter the content and watch the QR code render in real time.',
      'Customize foreground color, background color, error correction level (L, M, Q, H), and margin.',
      'Export and download as crisp SVG vector or high-resolution PNG.'
    ],
    faqs: [
      {
        question: 'Do these QR codes expire?',
        answer: 'No! These are static QR codes that encode your data directly into the pixel matrix. They work indefinitely without any subscription or third-party redirection.'
      },
      {
        question: 'What error correction level should I select?',
        answer: 'Level M (15% recovery) or Q (25% recovery) is ideal for standard scanning. Choose H (30%) if you plan on printing onto rough textures or adding custom overlays.'
      }
    ]
  },
  {
    id: 'markdown-editor',
    slug: 'markdown-editor',
    name: 'Markdown Live Editor',
    shortDesc: 'Interactive split-pane Markdown editor with live preview, word statistics, and HTML/MD export.',
    category: 'developer',
    iconName: 'FileCode2',
    tags: ['markdown', 'editor', 'preview', 'readme', 'gfm', 'html', 'docs'],
    isPopular: true,
    instructions: [
      'Type Markdown on the left pane and see the rendered HTML preview in real-time on the right.',
      'Use the top toolbar to quickly insert headings, bold, italics, links, tables, blockquotes, and code blocks.',
      'Monitor live word count, character count, and estimated reading time.',
      'Export the content as a .md file or copy the compiled HTML.'
    ],
    faqs: [
      {
        question: 'Does this editor support GitHub Flavored Markdown (GFM)?',
        answer: 'Yes, tables, task lists, code blocks with syntax highlighting classes, strikethrough, and blockquotes are all supported.'
      }
    ]
  },
  {
    id: 'password-generator',
    slug: 'password-generator',
    name: 'Secure Password Generator',
    shortDesc: 'Generate cryptographically strong, uncrackable passwords using window.crypto CSPRNG.',
    category: 'security',
    iconName: 'KeyRound',
    tags: ['password', 'security', 'crypto', 'generator', 'random', 'credentials'],
    isPopular: true,
    instructions: [
      'Choose your desired password length using the slider (12-64 characters recommended).',
      'Toggle character classes: Uppercase, Lowercase, Numbers, and Special Symbols.',
      'Optionally exclude ambiguous characters like (O, 0, l, 1, I).',
      'Review the real-time entropy and brute-force crack-time estimate.',
      'Generate batch passwords or copy your primary password instantly.'
    ],
    faqs: [
      {
        question: 'Is this random generator cryptographically secure?',
        answer: 'Yes! We use window.crypto.getRandomValues(), the industry standard Cryptographically Secure Pseudo-Random Number Generator (CSPRNG).'
      }
    ]
  },
  {
    id: 'hash-generator',
    slug: 'hash-generator',
    name: 'Hash & Checksum Generator',
    shortDesc: 'Compute MD5, SHA-1, SHA-256, SHA-384, and SHA-512 cryptographic hashes with HMAC option.',
    category: 'security',
    iconName: 'ShieldAlert',
    tags: ['hash', 'sha256', 'md5', 'sha1', 'sha512', 'hmac', 'checksum'],
    instructions: [
      'Enter or paste text into the input field.',
      'View simultaneously calculated hashes: SHA-256, SHA-512, SHA-384, SHA-1, and MD5.',
      'Optionally specify a secret key for HMAC message authentication.',
      'Click the copy icon next to any computed hash digest.'
    ],
    faqs: [
      {
        question: 'Which hash algorithm is recommended for modern security?',
        answer: 'SHA-256 or SHA-512 is recommended for integrity checks and signatures. MD5 and SHA-1 should only be used for legacy checksum verifications.'
      }
    ]
  },
  {
    id: 'url-shortener',
    slug: 'url-shortener',
    name: 'URL Cleaner & Privacy Shortener',
    shortDesc: 'Strip invasive tracking parameters (UTM, fbclid, gclid), minify long links, and generate QR codes.',
    category: 'developer',
    iconName: 'Link2',
    tags: ['url', 'link', 'cleaner', 'shorten', 'utm', 'tracking', 'privacy'],
    instructions: [
      'Paste any long or marketing URL cluttered with tracking tokens.',
      'The cleaner automatically strips UTM parameters, gclid, fbclid, and analytics tags.',
      'Generate a clean, compact shareable redirect token or bookmark it to your client library.',
      'Instantly generate a QR code for mobile scanning.'
    ],
    faqs: [
      {
        question: 'Why clean URLs?',
        answer: 'Tracking query parameters track user profiles across websites and bloat link lengths. Cleaning links protects personal privacy and looks cleaner when sharing.'
      }
    ]
  },
  {
    id: 'color-converter',
    slug: 'color-converter',
    name: 'Color Converter & Contrast Checker',
    shortDesc: 'Convert between HEX, RGB, HSL, and CMYK with WCAG accessibility contrast ratio analyzer.',
    category: 'designer',
    iconName: 'Palette',
    tags: ['color', 'hex', 'rgb', 'hsl', 'cmyk', 'contrast', 'wcag', 'css'],
    instructions: [
      'Pick a color with the interactive color wheel or enter a HEX, RGB, or HSL value.',
      'View instantaneous cross-conversions in all formats (HEX, RGB, HSL, CMYK, CSS rgba).',
      'Check WCAG 2.1 contrast ratios against black and white backgrounds (AA and AAA ratings).',
      'Inspect generated tints and shades palette for UI design.'
    ],
    faqs: [
      {
        question: 'What does the WCAG rating mean?',
        answer: 'WCAG AA requires a 4.5:1 contrast ratio for normal text. AAA requires 7:1. Our tool shows exactly whether your color passes for accessible design.'
      }
    ]
  },
  {
    id: 'regex-tester',
    slug: 'regex-tester',
    name: 'Regex Live Tester & Debugger',
    shortDesc: 'Test regular expressions in real-time with visual group highlighting, flags, and cheat presets.',
    category: 'developer',
    iconName: 'SearchCode',
    tags: ['regex', 'regexp', 'regular-expression', 'tester', 'debug', 'matches'],
    instructions: [
      'Type your regular expression pattern and toggle flags (g, i, m, s, u).',
      'Paste your test string in the target text area.',
      'Watch matched strings and capturing groups highlighted in distinct colors.',
      'Pick from ready-made presets (Email, URL, IP address, Phone number, Date).'
    ],
    faqs: [
      {
        question: 'What flags are supported?',
        answer: 'Global (g), Case-insensitive (i), Multiline (m), DotAll (s), and Unicode (u) are supported directly via modern JavaScript RegExp engine.'
      }
    ]
  },
  {
    id: 'diff-checker',
    slug: 'diff-checker',
    name: 'Text & Code Diff Checker',
    shortDesc: 'Compare two text or code snippets side-by-side with line additions, deletions, and differences.',
    category: 'developer',
    iconName: 'GitCompare',
    tags: ['diff', 'compare', 'difference', 'code', 'text', 'merge', 'git'],
    instructions: [
      'Paste your original (old) text into the left pane.',
      'Paste your modified (new) text into the right pane.',
      'Toggle between Side-by-Side and Unified view.',
      'View highlighted differences: red for deletions and green for additions.'
    ],
    faqs: [
      {
        question: 'Can I compare code files like JSON, HTML, or JavaScript?',
        answer: 'Yes, any plain text, source code, config files, or markdown can be compared line-by-line.'
      }
    ]
  },
  {
    id: 'unit-converter',
    slug: 'unit-converter',
    name: 'Universal Unit Converter',
    shortDesc: 'Fast conversion between Length, Weight, Temperature, Area, Speed, Time, and Digital Storage.',
    category: 'data',
    iconName: 'Scale',
    tags: ['unit', 'converter', 'metric', 'imperial', 'length', 'weight', 'temperature', 'storage'],
    instructions: [
      'Choose a physical category (Length, Weight, Temperature, Digital Data, Speed, Area, Time).',
      'Input the value in the source unit.',
      'Select the target unit to see immediate high-precision calculations.',
      'Swap units with a single click.'
    ],
    faqs: [
      {
        question: 'Are metric and imperial units both supported?',
        answer: 'Yes! Meters, feet, inches, miles, kilograms, pounds, Celsius, Fahrenheit, and all digital data units (bytes to terabytes) are supported.'
      }
    ]
  },
  {
    id: 'timestamp-converter',
    slug: 'timestamp-converter',
    name: 'Unix Timestamp Converter',
    shortDesc: 'Convert Epoch timestamps (seconds/ms) to human-readable UTC/Local time and vice versa.',
    category: 'developer',
    iconName: 'Clock',
    tags: ['timestamp', 'epoch', 'unix', 'time', 'date', 'utc', 'iso'],
    instructions: [
      'Enter an epoch timestamp (seconds or milliseconds) or click "Now" for the current moment.',
      'Read converted representations: UTC time, Local timezone, ISO 8601, and Relative time (e.g. 5 minutes ago).',
      'Or pick any date and time on the calendar to generate its Unix timestamp.'
    ],
    faqs: [
      {
        question: 'Does this handle seconds and milliseconds?',
        answer: 'Yes, the converter auto-detects whether your timestamp is in 10-digit seconds or 13-digit milliseconds and displays both.'
      }
    ]
  },
  {
    id: 'html-minifier',
    slug: 'html-minifier',
    name: 'HTML Minifier & Cleaner',
    shortDesc: 'Compress HTML documents by eliminating redundant whitespaces, comments, and line breaks.',
    category: 'developer',
    iconName: 'FileMinus',
    tags: ['html', 'minify', 'compress', 'web', 'optimization', 'frontend'],
    instructions: [
      'Paste your raw HTML document or snippet into the editor.',
      'Choose whether to strip comments and collapse multiple whitespaces.',
      'Click "Minify HTML" to run the compression.',
      'Review compression metrics (bytes reduced and percentage saved) and copy the output.'
    ],
    faqs: [
      {
        question: 'Does minifying HTML break preformatted tags?',
        answer: 'No, content inside <pre>, <code>, and <textarea> blocks is carefully preserved to protect syntax structure.'
      }
    ]
  },
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    name: 'UUID / GUID Generator',
    shortDesc: 'Generate cryptographically random UUID version 4 tokens individually or in bulk.',
    category: 'developer',
    iconName: 'Fingerprint',
    tags: ['uuid', 'guid', 'v4', 'random', 'id', 'token', 'unique'],
    instructions: [
      'Select how many UUIDs to generate (from 1 up to 100).',
      'Toggle uppercase or lowercase output.',
      'Choose whether to include standard hyphens or generate compact 32-character tokens.',
      'Click "Generate" and copy the single or batch list with one click.'
    ],
    faqs: [
      {
        question: 'What version of UUID is generated?',
        answer: 'UUID Version 4 (RFC 4122 compliant), generated with high-entropy cryptographic randomness using crypto.getRandomValues().'
      }
    ]
  },
  {
    id: 'jwt-decoder',
    slug: 'jwt-decoder',
    name: 'JWT Debugger & Decoder',
    shortDesc: 'Decode and inspect JSON Web Tokens (JWT) headers, claims, expiration, and payload signatures.',
    category: 'security',
    iconName: 'FileKey',
    tags: ['jwt', 'token', 'decode', 'auth', 'bearer', 'security', 'claims'],
    instructions: [
      'Paste any standard JSON Web Token (encoded as header.payload.signature).',
      'Inspect the decoded Header (algorithm, token type) and Payload (claims, sub, exp).',
      'Check the automatic Expiration status badge (Valid, Expired, or Not Before).',
      'Human-readable date times are automatically mapped for iat, exp, and nbf timestamps.'
    ],
    faqs: [
      {
        question: 'Is it safe to paste production JWTs here?',
        answer: 'Yes! DevPulse processes everything completely in client-side memory. No network requests are made, keeping your tokens strictly private.'
      }
    ]
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    name: 'Text Case Converter',
    shortDesc: 'Convert text between camelCase, snake_case, kebab-case, UPPERCASE, Title Case, and PascalCase.',
    category: 'developer',
    iconName: 'CaseSensitive',
    tags: ['case', 'converter', 'camelcase', 'snake_case', 'kebab-case', 'uppercase', 'text'],
    instructions: [
      'Type or paste your text in the input box.',
      'Click on any target case style: camelCase, snake_case, kebab-case, PascalCase, UPPERCASE, lowercase, Title Case, Sentence case, or CONSTANT_CASE.',
      'Click copy on your desired converted format.'
    ],
    faqs: [
      {
        question: 'How are word separators handled?',
        answer: 'Our smart tokenizer detects spaces, hyphens, underscores, and existing camelCase boundaries to ensure accurate conversions.'
      }
    ]
  },
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word & Character Counter',
    shortDesc: 'Real-time text analyzer for words, characters, sentences, reading time, and keyword density.',
    category: 'developer',
    iconName: 'FileText',
    tags: ['word', 'counter', 'character', 'reading-time', 'density', 'sentences', 'seo'],
    instructions: [
      'Type or paste text into the document analyzer.',
      'View instant statistics: Word count, character count (with/without spaces), sentence count, and paragraph count.',
      'Inspect estimated reading time (at 200 WPM) and speaking time (at 130 WPM).',
      'Review top 5 most frequently used keywords and their percentage density.'
    ],
    faqs: [
      {
        question: 'Is there a character limit?',
        answer: 'No limit! You can paste full essays, articles, or books, and stats update in milliseconds.'
      }
    ]
  },
  {
    id: 'svg-to-png-converter',
    slug: 'svg-to-png-converter',
    name: 'SVG to PNG Converter',
    shortDesc: 'Convert scalable vector graphics (SVG) into crisp, high-resolution PNG images with custom scaling.',
    category: 'designer',
    iconName: 'FileImage',
    tags: ['svg', 'png', 'converter', 'vector', 'raster', 'image', 'export'],
    instructions: [
      'Paste raw SVG XML code or upload an .svg file directly.',
      'Select your output resolution scale multiplier (1x, 2x, 4x Retina, or 8x Ultra HD).',
      'Choose a transparent or solid background color.',
      'Preview the rasterized result and download your PNG file.'
    ],
    faqs: [
      {
        question: 'Does the converted PNG maintain vector sharpness?',
        answer: 'Yes! Because the scaling happens before rasterization onto an HTML5 canvas, selecting 2x or 4x yields pixel-crisp high-DPI graphics.'
      }
    ]
  },
  {
    id: 'box-shadow-generator',
    slug: 'box-shadow-generator',
    name: 'CSS Box Shadow Generator',
    shortDesc: 'Design modern multi-layered CSS box shadows with interactive sliders and instant CSS copy.',
    category: 'developer',
    iconName: 'Sparkles',
    tags: ['css', 'box-shadow', 'shadow', 'generator', 'styling', 'frontend', 'ui'],
    instructions: [
      'Adjust Horizontal and Vertical offsets, Blur radius, and Spread radius sliders.',
      'Select shadow color and tweak opacity.',
      'Toggle Inset checkbox for inner shadows.',
      'Add multiple shadow layers for sophisticated realistic elevation effects.',
      'Copy the ready-to-use CSS box-shadow rule for your stylesheet.'
    ],
    faqs: [
      {
        question: 'Can I add multiple shadow layers?',
        answer: 'Yes! Modern UI design achieves realistic depth by stacking multiple subtle shadows. You can add, adjust, and delete shadow layers seamlessly.'
      }
    ]
  },
  {
    id: 'url-encoder-decoder',
    slug: 'url-encoder-decoder',
    name: 'URL Encoder / Decoder',
    shortDesc: 'Safely encode and decode URI components, query parameters, and full URLs with RFC 3986 compliance.',
    category: 'developer',
    iconName: 'Globe',
    tags: ['url', 'uri', 'encode', 'decode', 'querystring', 'percent-encoding', 'web'],
    isPopular: true,
    isNew: true,
    instructions: [
      'Paste your URL, query string, or plain text into the input box.',
      'Select Encode to percent-encode reserved characters, or Decode to restore raw text.',
      'Toggle "Encode Full URI" or "Component Only" based on whether you need protocol/slashes preserved.',
      'Copy the encoded or decoded output with a single click.'
    ],
    faqs: [
      {
        question: 'What is the difference between encodeURI and encodeURIComponent?',
        answer: 'encodeURI preserves protocol and path delimiters (like ://, /, ?), whereas encodeURIComponent encodes every special character, which is required for query parameter values.'
      },
      {
        question: 'Does this handle UTF-8 international characters?',
        answer: 'Yes, all unicode characters are properly converted to multi-byte UTF-8 percent-encoded hex sequences.'
      }
    ]
  },
  {
    id: 'css-gradient-generator',
    slug: 'css-gradient-generator',
    name: 'CSS Gradient Generator',
    shortDesc: 'Visually design, tweak color stops, and export linear, radial, and conic CSS & Tailwind gradients.',
    category: 'designer',
    iconName: 'Palette',
    tags: ['css', 'gradient', 'linear', 'radial', 'tailwind', 'generator', 'design'],
    isPopular: true,
    isNew: true,
    instructions: [
      'Choose gradient type: Linear, Radial, or Conic.',
      'Click color stops to edit colors or drag to adjust positions.',
      'Add or remove color stops with the + and delete buttons.',
      'Rotate linear gradient angle from 0° to 360° using the circular dial or slider.',
      'Copy standard CSS gradient rule or Tailwind CSS arbitrary classes.'
    ],
    faqs: [
      {
        question: 'Does this generator support Tailwind CSS?',
        answer: 'Yes! You can copy either vanilla CSS code or arbitrary Tailwind background gradient classes directly.'
      }
    ]
  },
  {
    id: 'lorem-ipsum-generator',
    slug: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    shortDesc: 'Generate customizable dummy placeholder text by paragraphs, sentences, or words with HTML export.',
    category: 'designer',
    iconName: 'FileText',
    tags: ['lorem', 'ipsum', 'placeholder', 'dummy-text', 'copywriting', 'generator'],
    isNew: true,
    instructions: [
      'Select whether to generate Paragraphs, Sentences, or Words.',
      'Set the desired count and toggle whether to start with classic "Lorem ipsum dolor sit amet...".',
      'Choose export format: Plain Text, HTML (<p> tags), or Markdown.',
      'Click "Copy" to paste directly into your layout design or prototype.'
    ],
    faqs: [
      {
        question: 'Where does the original Lorem Ipsum come from?',
        answer: 'It originates from sections 1.10.32 and 1.10.33 of Cicero\'s "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil), written in 45 BC.'
      }
    ]
  },
  {
    id: 'glassmorphism-generator',
    slug: 'glassmorphism-generator',
    name: 'Glassmorphism CSS Generator',
    shortDesc: 'Create trendy frosted glass blur effects with customizable transparency, borders, and backdrop filters.',
    category: 'designer',
    iconName: 'Sparkles',
    tags: ['glassmorphism', 'frosted-glass', 'backdrop-filter', 'css', 'tailwind', 'blur'],
    isPopular: true,
    isNew: true,
    instructions: [
      'Adjust the Blur slider to set backdrop-filter intensity.',
      'Tweak Opacity and Background Color to control glass tint.',
      'Customize border width, border opacity, and corner radius.',
      'Preview with different backgrounds to inspect contrast.',
      'Copy pure CSS with vendor prefixes or Tailwind classes.'
    ],
    faqs: [
      {
        question: 'Which browsers support backdrop-filter?',
        answer: 'All modern browsers including Chrome, Edge, Safari, Firefox, and iOS/Android web views support backdrop-filter natively.'
      }
    ]
  },
  {
    id: 'html-entity-converter',
    slug: 'html-entity-converter',
    name: 'HTML Entity Encoder / Decoder',
    shortDesc: 'Encode special characters to HTML named and numeric entities to prevent XSS and rendering bugs.',
    category: 'developer',
    iconName: 'Code',
    tags: ['html', 'entities', 'encode', 'decode', 'special-characters', 'xss', 'escape'],
    isNew: true,
    instructions: [
      'Paste text or HTML code into the input area.',
      'Select "Encode" to replace symbols (<, >, &, \', ") with entities like &lt; and &gt;.',
      'Select "Decode" to convert HTML entities back to raw characters.',
      'Browse the quick-reference cheat sheet for common symbols.'
    ],
    faqs: [
      {
        question: 'Why should I escape HTML characters?',
        answer: 'Escaping HTML prevents cross-site scripting (XSS) attacks and ensures special characters render correctly on web pages instead of being interpreted as HTML tags.'
      }
    ]
  },
  {
    id: 'css-flexbox-generator',
    slug: 'css-flexbox-generator',
    name: 'CSS Flexbox Playground & Generator',
    shortDesc: 'Interactive visual flexbox builder with flex-direction, alignment, justify-content, wrap, and gap controls.',
    category: 'developer',
    iconName: 'LayoutGrid',
    tags: ['flexbox', 'css', 'layout', 'alignment', 'justify-content', 'tailwind', 'interactive'],
    isPopular: true,
    isNew: true,
    instructions: [
      'Toggle flex-direction (row, column, reverse) and wrap modes.',
      'Select justify-content and align-items options to observe item alignment.',
      'Adjust gap between elements with the slider.',
      'Click any box to inspect and tweak individual flex-grow and align-self properties.',
      'Copy the compiled CSS rule or Tailwind classes.'
    ],
    faqs: [
      {
        question: 'Can I test flexbox on mobile viewports?',
        answer: 'Yes, the playground adapts smoothly to smaller containers and lets you experiment with wrapping and direction changes.'
      }
    ]
  },
  {
    id: 'json-to-csv',
    slug: 'json-to-csv',
    name: 'JSON to CSV / CSV to JSON Converter',
    shortDesc: 'Bi-directional tabular data converter with delimiter configuration, data preview, and download options.',
    category: 'data',
    iconName: 'Table',
    tags: ['json', 'csv', 'excel', 'spreadsheet', 'data-converter', 'export', 'table'],
    isPopular: true,
    isNew: true,
    instructions: [
      'Choose conversion mode: JSON to CSV or CSV to JSON.',
      'Paste your array of JSON objects or CSV rows.',
      'Select delimiter (Comma, Semicolon, or Tab).',
      'Inspect the tabular preview with row count.',
      'Download as .csv or .json file, or copy output to clipboard.'
    ],
    faqs: [
      {
        question: 'How are nested objects handled in CSV conversion?',
        answer: 'Nested objects and arrays are safely serialized as JSON strings within quoted CSV cells to preserve data fidelity.'
      }
    ]
  },
  {
    id: 'cron-parser',
    slug: 'cron-parser',
    name: 'Cron Expression Parser & Schedule Explainer',
    shortDesc: 'Translate 5-part cron syntax into plain English, inspect upcoming execution times, and use common presets.',
    category: 'developer',
    iconName: 'Clock',
    tags: ['cron', 'crontab', 'schedule', 'parser', 'timer', 'automation', 'devops'],
    isPopular: true,
    isNew: true,
    instructions: [
      'Type or paste any standard 5-part cron expression (* * * * *).',
      'Read the real-time plain English schedule description.',
      'Inspect breakdown of minute, hour, day-of-month, month, and day-of-week fields.',
      'Click on any preset template (every 5 minutes, daily at midnight, weekdays) to test.',
      'View simulated upcoming execution times.'
    ],
    faqs: [
      {
        question: 'What is the order of fields in standard crontab?',
        answer: 'Standard Unix cron uses: 1) Minute (0-59), 2) Hour (0-23), 3) Day of Month (1-31), 4) Month (1-12), 5) Day of Week (0-6, where 0 is Sunday).'
      }
    ]
  },
  {
    id: 'text-duplicate-remover',
    slug: 'text-duplicate-remover',
    name: 'Text Line Deduplicator & Sorter',
    shortDesc: 'Strip duplicate lines from lists, sort alphabetically or by length, and trim unwanted whitespace.',
    category: 'developer',
    iconName: 'FileMinus',
    tags: ['deduplicate', 'remove-duplicates', 'lines', 'sort', 'clean', 'filter', 'text'],
    isNew: true,
    instructions: [
      'Paste your multiline list of items, URLs, emails, or tags.',
      'Toggle case sensitivity, whitespace trimming, and empty line stripping.',
      'Select sorting order: None, A-Z, Z-A, or by line length.',
      'Check compression metrics (original lines, unique lines, duplicates removed).',
      'Copy cleaned unique list.'
    ],
    faqs: [
      {
        question: 'Does this handle large datasets?',
        answer: 'Yes! Using JavaScript Set and Map operations, it can process tens of thousands of lines in milliseconds.'
      }
    ]
  },
  {
    id: 'clip-path-generator',
    slug: 'clip-path-generator',
    name: 'CSS Clip-Path Shape Generator',
    shortDesc: 'Create modern geometric shapes and masks with polygon(), circle(), and ellipse() CSS clip-paths.',
    category: 'designer',
    iconName: 'Shapes',
    tags: ['clip-path', 'css', 'polygon', 'shapes', 'svg', 'tailwind', 'mask'],
    isNew: true,
    instructions: [
      'Select from 14+ geometric presets (Triangle, Hexagon, Star, Diamond, Bubble).',
      'Switch aspect ratio (1:1, 16:9, 4:3) to preview responsiveness.',
      'Inspect the generated CSS clip-path rule with vendor prefixes.',
      'Copy pure CSS or Tailwind arbitrary bracket syntax.'
    ],
    faqs: [
      {
        question: 'How do clip-paths affect element click events?',
        answer: 'Areas clipped outside the shape do not trigger hover or pointer events, making clip-path great for interactive clickable geometric buttons.'
      }
    ]
  },
  {
    id: 'color-palette-generator',
    slug: 'color-palette-generator',
    name: 'Color Palette & Harmony Generator',
    shortDesc: 'Generate triadic, complementary, analogous, and monochromatic color palettes with CSS variables.',
    category: 'designer',
    iconName: 'Sliders',
    tags: ['palette', 'color', 'harmony', 'triadic', 'complementary', 'css-variables', 'hex'],
    isPopular: true,
    isNew: true,
    instructions: [
      'Pick a base color with the color picker or enter any hex code.',
      'Choose a harmony rule: Triadic, Complementary, Analogous, Tetradic, or Monochromatic.',
      'Click any swatch to copy its individual HEX color code.',
      'Hit "Randomize Color" for instant inspiration.',
      'Copy the ready-to-use CSS Custom Properties block.'
    ],
    faqs: [
      {
        question: 'What makes triadic palettes work well in UI design?',
        answer: 'Triadic colors are spaced equally around the 360° color wheel (120° apart), offering vibrant contrast while preserving visual balance and legibility.'
      }
    ]
  },
  {
    id: 'sql-formatter',
    slug: 'sql-formatter',
    name: 'SQL Formatter & Query Beautifier',
    shortDesc: 'Beautify messy SQL queries with clause indentation, keyword capitalization, and one-click minification.',
    category: 'developer',
    iconName: 'FileCode2',
    tags: ['sql', 'format', 'beautify', 'minify', 'database', 'query', 'postgres', 'mysql'],
    isPopular: true,
    isNew: true,
    instructions: [
      'Paste your raw, unformatted SQL statement into the editor.',
      'Toggle uppercase keywords (SELECT, FROM, WHERE, JOIN...).',
      'Choose 2 or 4 space indentation for sub-clauses.',
      'Optionally click "Minify Single-Line" for compact migration strings.',
      'Copy formatted SQL.'
    ],
    faqs: [
      {
        question: 'Which SQL dialects are supported?',
        answer: 'Standard ANSI SQL, PostgreSQL, MySQL, SQLite, Oracle, and MS SQL Server query constructs are beautified cleanly.'
      }
    ]
  },
  {
    id: 'meta-tags-generator',
    slug: 'meta-tags-generator',
    name: 'Meta Tags & Open Graph Generator',
    shortDesc: 'Create comprehensive SEO and social share card meta tags for Google, Facebook, Twitter, and LinkedIn.',
    category: 'developer',
    iconName: 'Share2',
    tags: ['seo', 'meta-tags', 'open-graph', 'twitter-card', 'social-preview', 'html'],
    isPopular: true,
    isNew: true,
    instructions: [
      'Fill in Title, Meta Description, Canonical URL, and Social Card Image URL.',
      'Check real-time character counters for Google and social display limits.',
      'Switch between Google Search, Facebook, and Twitter/X interactive previews.',
      'Copy the complete HTML <head> meta tags snippet.'
    ],
    faqs: [
      {
        question: 'What is the optimal size for og:image?',
        answer: '1200 × 630 pixels (1.91:1 aspect ratio) ensures sharp display across high-DPI retina devices on Facebook, Twitter, and LinkedIn.'
      }
    ]
  },
  {
    id: 'text-ascii-styler',
    slug: 'text-ascii-styler',
    name: 'Fancy Unicode & ASCII Text Styler',
    shortDesc: 'Convert regular text into mathematical bold, gothic, script, bubble, and inverted Unicode styles.',
    category: 'designer',
    iconName: 'Type',
    tags: ['ascii', 'unicode', 'fonts', 'bold', 'italic', 'bubble', 'social-media'],
    isNew: true,
    instructions: [
      'Type or paste your text in the top input box.',
      'Instantly see real-time conversions in Mathematical Bold, Italic, Fraktur, Monospace, Bubble, and Upside-Down.',
      'Click "Copy" next to any style to paste into social media, GitHub READMEs, or chat messages.'
    ],
    faqs: [
      {
        question: 'Will these fonts work everywhere without installing anything?',
        answer: 'Yes! They utilize standard Unicode mathematical and enclosed alphanumeric glyph blocks supported natively across all operating systems and browsers.'
      }
    ]
  },
  {
    id: 'css-clamp-calculator',
    slug: 'css-clamp-calculator',
    name: 'CSS Clamp() & Fluid Typography Calculator',
    shortDesc: 'Calculate perfectly fluid clamp(min, val, max) responsive font sizes and spacing without media queries.',
    category: 'designer',
    iconName: 'Scale',
    tags: ['clamp', 'fluid-typography', 'responsive', 'vw', 'css', 'calculator', 'font-size'],
    isNew: true,
    instructions: [
      'Set your minimum and maximum screen viewport widths (e.g. 360px to 1280px).',
      'Set your minimum and maximum desired element or font sizes in pixels.',
      'Drag the simulated screen width slider to see fluid typography scale in real time.',
      'Copy the calculated CSS clamp() property or the standalone mathematical formula.'
    ],
    faqs: [
      {
        question: 'Why use CSS clamp() instead of media queries?',
        answer: 'clamp() scales smoothly on every pixel of screen width between your limits, eliminating jarring font size jumps at breakpoint boundaries.'
      }
    ]
  },
  {
    id: 'json-schema-generator',
    slug: 'json-schema-generator',
    name: 'JSON to JSON Schema Generator',
    shortDesc: 'Automatically infer and generate valid Draft-07 JSON Schema definitions from raw sample JSON.',
    category: 'data',
    iconName: 'Braces',
    tags: ['json-schema', 'draft-07', 'schema', 'validation', 'api', 'types'],
    isNew: true,
    instructions: [
      'Paste any sample JSON object or array payload.',
      'Toggle whether all object properties should be marked as "required".',
      'Automatic type detection handles numbers, integers, booleans, strings, email/date formats, arrays, and nested structures.',
      'Download schema.json or copy to clipboard.'
    ],
    faqs: [
      {
        question: 'Which JSON Schema draft version is produced?',
        answer: 'It conforms to Draft-07 schema specifications, compatible with OpenAPI, Ajv, and modern API validation frameworks.'
      }
    ]
  },
  {
    id: 'border-radius-generator',
    slug: 'border-radius-generator',
    name: 'Fancy 8-Point Border Radius Generator',
    shortDesc: 'Design organic blob shapes, asymmetric pill buttons, and modern fluid UI cards with 8-value border-radius.',
    category: 'designer',
    iconName: 'Maximize2',
    tags: ['border-radius', 'blob', 'organic-shapes', 'css', 'tailwind', 'design'],
    isNew: true,
    instructions: [
      'Adjust horizontal and vertical radius sliders for all four corners.',
      'Click "Randomize Organic Shape" for instant creative blob shapes.',
      'Preview real-time gradients applied to the morphing container.',
      'Copy pure CSS border-radius or Tailwind arbitrary rounded-[...] syntax.'
    ],
    faqs: [
      {
        question: 'How does the 8-value syntax work in CSS?',
        answer: 'The slash (/) separates horizontal radii from vertical radii (top-left, top-right, bottom-right, bottom-left), allowing elliptical curvature.'
      }
    ]
  },
  {
    id: 'js-minifier',
    slug: 'js-minifier',
    name: 'JavaScript Minifier & Stripper',
    shortDesc: 'Minify raw JavaScript code, strip comments and console.log calls, and calculate bundle byte savings.',
    category: 'developer',
    iconName: 'Code2',
    tags: ['javascript', 'minify', 'compress', 'strip-comments', 'optimize', 'bundle'],
    isNew: true,
    instructions: [
      'Paste your JavaScript code into the source editor.',
      'Toggle stripping of comments (/* */ and //) and console.log() statements.',
      'Inspect before and after byte sizes and percentage saved.',
      'Download as .min.js or copy minified code.'
    ],
    faqs: [
      {
        question: 'Is it safe to run in-browser?',
        answer: 'Yes! Processing happens entirely in local memory with zero external requests, protecting proprietary script logic.'
      }
    ]
  },
  {
    id: 'bcrypt-generator',
    slug: 'bcrypt-generator',
    name: 'Bcrypt Hash Generator & Verifier',
    shortDesc: 'Generate secure cryptographically salted Bcrypt hashes and verify plaintext passwords against hashes.',
    category: 'security',
    iconName: 'KeyRound',
    tags: ['bcrypt', 'hash', 'salt', 'security', 'password', 'verify', 'crypto'],
    isPopular: true,
    isNew: true,
    instructions: [
      'Type your plaintext password into the generator.',
      'Select cost factor rounds (8 through 14; 10 is industry standard).',
      'Copy the resulting 60-character bcrypt hash starting with $2b$.',
      'Use the verifier section below to test whether passwords match specific hashes.'
    ],
    faqs: [
      {
        question: 'What do the parts of a bcrypt hash mean?',
        answer: '$2b$ indicates the modern bcrypt prefix, the next 2 digits are the log2 cost rounds (e.g. 10 = 1,024 iterations), followed by 22 salt characters and 31 hash characters.'
      }
    ]
  },
  {
    id: 'favicon-generator',
    slug: 'favicon-generator',
    name: 'Favicon & App Icon Generator',
    shortDesc: 'Generate multi-size favicons (16x16, 32x32, 180x180) from emojis or monogram letters with HTML tags.',
    category: 'designer',
    iconName: 'Smile',
    tags: ['favicon', 'icon', 'apple-touch-icon', 'emoji', 'png', 'branding'],
    isPopular: true,
    isNew: true,
    instructions: [
      'Choose between Emoji icon or Text Monogram (1-2 letters).',
      'Customize background color, shape (rounded, circle, square), and text color.',
      'Inspect real-world live previews at 128x128, 64x64, 32x32 browser tab, and 16x16.',
      'Download 32x32 PNG, 16x16 PNG, or 180x180 Apple Touch Icon.',
      'Copy HTML <link rel="icon"> tags for your site header.'
    ],
    faqs: [
      {
        question: 'Why are multiple favicon sizes needed?',
        answer: 'Modern web platforms use 16×16 for bookmarks/browser tabs, 32×32 for high-DPI taskbars and retina displays, and 180×180 for iOS home screen bookmarks.'
      }
    ]
  },
  {
    id: 'gpa-calculator',
    slug: 'gpa-calculator',
    name: 'GPA Calculator',
    shortDesc: 'Calculate your semester and cumulative GPA easily.',
    category: 'education',
    iconName: 'GraduationCap',
    tags: ['gpa', 'calculator'],
    isPopular: false,
    instructions: [
      'Enter your data in the input fields.',
      'Click the button to process.',
      'View or copy the results.'
    ],
    faqs: [
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, all our tools are 100% free and run completely in your browser.'
      }
    ]
  },
  {
    id: 'citation-generator',
    slug: 'citation-generator',
    name: 'Citation Generator',
    shortDesc: 'Generate APA, MLA, and Chicago style citations.',
    category: 'education',
    iconName: 'Quote',
    tags: ['citation', 'generator'],
    isPopular: false,
    instructions: [
      'Enter your data in the input fields.',
      'Click the button to process.',
      'View or copy the results.'
    ],
    faqs: [
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, all our tools are 100% free and run completely in your browser.'
      }
    ]
  },
  {
    id: 'random-group-generator',
    slug: 'random-group-generator',
    name: 'Random Team Generator',
    shortDesc: 'Randomly split a list of names into equal teams or groups.',
    category: 'education',
    iconName: 'Users',
    tags: ['random', 'group', 'generator'],
    isPopular: false,
    instructions: [
      'Enter your data in the input fields.',
      'Click the button to process.',
      'View or copy the results.'
    ],
    faqs: [
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, all our tools are 100% free and run completely in your browser.'
      }
    ]
  },
  {
    id: 'pomodoro-timer',
    slug: 'pomodoro-timer',
    name: 'Pomodoro Timer',
    shortDesc: 'Boost productivity with a customizable Pomodoro focus timer.',
    category: 'education',
    iconName: 'Timer',
    tags: ['pomodoro', 'timer'],
    isPopular: false,
    instructions: [
      'Enter your data in the input fields.',
      'Click the button to process.',
      'View or copy the results.'
    ],
    faqs: [
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, all our tools are 100% free and run completely in your browser.'
      }
    ]
  },
  {
    id: 'readability-analyzer',
    slug: 'readability-analyzer',
    name: 'Readability Analyzer',
    shortDesc: 'Analyze text to determine reading level and estimated reading time.',
    category: 'education',
    iconName: 'BookOpen',
    tags: ['readability', 'analyzer'],
    isPopular: false,
    instructions: [
      'Enter your data in the input fields.',
      'Click the button to process.',
      'View or copy the results.'
    ],
    faqs: [
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, all our tools are 100% free and run completely in your browser.'
      }
    ]
  },
  {
    id: 'flashcard-generator',
    slug: 'flashcard-generator',
    name: 'Flashcard Generator',
    shortDesc: 'Create, shuffle, and review interactive study flashcards.',
    category: 'education',
    iconName: 'Layers',
    tags: ['flashcard', 'generator'],
    isPopular: false,
    instructions: [
      'Enter your data in the input fields.',
      'Click the button to process.',
      'View or copy the results.'
    ],
    faqs: [
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, all our tools are 100% free and run completely in your browser.'
      }
    ]
  },
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    shortDesc: 'Quickly calculate percentages, discounts, and margins.',
    category: 'education',
    educationAudience: 'students',
    iconName: 'Percent',
    tags: ['percentage', 'calculator'],
    isPopular: false,
    instructions: [
      'Enter your data in the input fields.',
      'Click the button to process.',
      'View or copy the results.'
    ],
    faqs: [
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, all our tools are 100% free and run completely in your browser.'
      }
    ]
  },
  {
    id: 'random-number-generator',
    slug: 'random-number-generator',
    name: 'Random Number Generator',
    shortDesc: 'Generate secure random numbers within a custom range.',
    category: 'data',
    iconName: 'Dices',
    tags: ['random', 'number', 'generator'],
    isPopular: false,
    instructions: [
      'Enter your data in the input fields.',
      'Click the button to process.',
      'View or copy the results.'
    ],
    faqs: [
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, all our tools are 100% free and run completely in your browser.'
      }
    ]
  },
  {
    id: 'discount-calculator',
    slug: 'discount-calculator',
    name: 'Discount Calculator',
    shortDesc: 'Calculate the final price after applying discount percentages.',
    category: 'data',
    iconName: 'Tag',
    tags: ['discount', 'calculator'],
    isPopular: false,
    instructions: [
      'Enter your data in the input fields.',
      'Click the button to process.',
      'View or copy the results.'
    ],
    faqs: [
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, all our tools are 100% free and run completely in your browser.'
      }
    ]
  },
  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    shortDesc: 'Calculate your Body Mass Index (BMI) and health category.',
    category: 'data',
    iconName: 'Activity',
    tags: ['bmi', 'calculator'],
    isPopular: false,
    instructions: [
      'Enter your data in the input fields.',
      'Click the button to process.',
      'View or copy the results.'
    ],
    faqs: [
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, all our tools are 100% free and run completely in your browser.'
      }
    ]
  },
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    name: 'Age Calculator',
    shortDesc: 'Calculate precise age in years, months, and days.',
    category: 'data',
    iconName: 'CalendarDays',
    tags: ['age', 'calculator'],
    isPopular: false,
    instructions: [
      'Enter your data in the input fields.',
      'Click the button to process.',
      'View or copy the results.'
    ],
    faqs: [
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, all our tools are 100% free and run completely in your browser.'
      }
    ]
  },
  {
    id: 'days-between-dates',
    slug: 'days-between-dates',
    name: 'Days Between Dates',
    shortDesc: 'Calculate the exact number of days between two dates.',
    category: 'data',
    iconName: 'Calendar',
    tags: ['days', 'between', 'dates'],
    isPopular: false,
    instructions: [
      'Enter your data in the input fields.',
      'Click the button to process.',
      'View or copy the results.'
    ],
    faqs: [
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, all our tools are 100% free and run completely in your browser.'
      }
    ]
  },
  {
    id: 'stopwatch-timer',
    slug: 'stopwatch-timer',
    name: 'Stopwatch & Timer',
    shortDesc: 'A simple, precise stopwatch and countdown timer.',
    category: 'education',
    educationAudience: 'both',
    iconName: 'Clock',
    tags: ['stopwatch', 'timer'],
    isPopular: false,
    instructions: [
      'Enter your data in the input fields.',
      'Click the button to process.',
      'View or copy the results.'
    ],
    faqs: [
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, all our tools are 100% free and run completely in your browser.'
      }
    ]
  },
  {
    id: 'color-contrast-checker',
    slug: 'color-contrast-checker',
    name: 'Color Contrast Checker',
    shortDesc: 'Check color contrast ratios for WCAG accessibility compliance.',
    category: 'designer',
    iconName: 'Contrast',
    tags: ['color', 'contrast', 'checker'],
    isPopular: false,
    instructions: [
      'Enter your data in the input fields.',
      'Click the button to process.',
      'View or copy the results.'
    ],
    faqs: [
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, all our tools are 100% free and run completely in your browser.'
      }
    ]
  },
  {
    id: 'aspect-ratio-calculator',
    slug: 'aspect-ratio-calculator',
    name: 'Aspect Ratio Calculator',
    shortDesc: 'Calculate image and video aspect ratios and dimensions.',
    category: 'designer',
    iconName: 'MonitorPlay',
    tags: ['aspect', 'ratio', 'calculator'],
    isPopular: false,
    instructions: [
      'Enter your data in the input fields.',
      'Click the button to process.',
      'View or copy the results.'
    ],
    faqs: [
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, all our tools are 100% free and run completely in your browser.'
      }
    ]
  },
  {
    id: 'svg-placeholder-generator',
    slug: 'svg-placeholder-generator',
    name: 'SVG Placeholder Generator',
    shortDesc: 'Generate customizable SVG placeholder images for your layouts.',
    category: 'designer',
    iconName: 'Image',
    tags: ['svg', 'placeholder', 'generator'],
    isPopular: false,
    instructions: [
      'Enter your data in the input fields.',
      'Click the button to process.',
      'View or copy the results.'
    ],
    faqs: [
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, all our tools are 100% free and run completely in your browser.'
      }
    ]
  },
  {
    id: 'text-repeater',
    slug: 'text-repeater',
    name: 'Text Repeater',
    shortDesc: 'Repeat a text string multiple times with customizable separators.',
    category: 'developer',
    iconName: 'Repeat',
    tags: ['text', 'repeater'],
    isPopular: false,
    instructions: [
      'Enter your data in the input fields.',
      'Click the button to process.',
      'View or copy the results.'
    ],
    faqs: [
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, all our tools are 100% free and run completely in your browser.'
      }
    ]
  },
  {
    id: 'word-scrambler',
    slug: 'word-scrambler',
    name: 'Word Scrambler',
    shortDesc: 'Scramble the letters of words or sentences randomly.',
    category: 'education',
    educationAudience: 'both',
    iconName: 'Shuffle',
    tags: ['word', 'scrambler'],
    isPopular: false,
    instructions: [
      'Enter your data in the input fields.',
      'Click the button to process.',
      'View or copy the results.'
    ],
    faqs: [
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, all our tools are 100% free and run completely in your browser.'
      }
    ]
  },
  {
    id: 'morse-code-translator',
    slug: 'morse-code-translator',
    name: 'Morse Code Translator',
    shortDesc: 'Translate text to Morse code and vice versa.',
    category: 'data',
    iconName: 'Radio',
    tags: ['morse', 'code', 'translator'],
    isPopular: false,
    instructions: [
      'Enter your data in the input fields.',
      'Click the button to process.',
      'View or copy the results.'
    ],
    faqs: [
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, all our tools are 100% free and run completely in your browser.'
      }
    ]
  },
  {
    id: 'text-to-binary',
    slug: 'text-to-binary',
    name: 'Text to Binary Converter',
    shortDesc: 'Convert plain text to binary code and binary back to text.',
    category: 'developer',
    iconName: 'Binary',
    tags: ['text', 'to', 'binary'],
    isPopular: false,
    instructions: [
      'Enter your data in the input fields.',
      'Click the button to process.',
      'View or copy the results.'
    ],
    faqs: [
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, all our tools are 100% free and run completely in your browser.'
      }
    ]
  },
];

import { TOOL_CATEGORIES, ToolRegistry } from '../services/toolRegistry';

ToolRegistry.setTools(TOOLS_LIST);

export { TOOL_CATEGORIES, ToolRegistry };

export const TOOLS_MAP: Record<string, ToolItem> = TOOLS_LIST.reduce((acc, tool) => {
  acc[tool.id] = tool;
  acc[tool.slug] = tool;
  if (tool.id === 'url-shortener' || tool.slug === 'url-shortener') {
    acc['url-cleaner'] = tool;
    acc['url-shortener'] = tool;
  }
  if (tool.id === 'svg-to-png-converter' || tool.slug === 'svg-to-png-converter') {
    acc['svg-to-png'] = tool;
    acc['svg-to-png-converter'] = tool;
  }
  if (tool.id === 'box-shadow-generator' || tool.slug === 'box-shadow-generator') {
    acc['css-box-shadow-generator'] = tool;
    acc['box-shadow-generator'] = tool;
  }
  if (tool.id === 'base64-encoder-decoder') {
    acc['base64-tool'] = tool;
  }
  if (tool.id === 'qr-code-generator') {
    acc['qr-generator'] = tool;
  }
  return acc;
}, {} as Record<string, ToolItem>);
