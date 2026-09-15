/**
 * Centralized SEO Configuration for DevPulse Tools
 * Defines metadata, structured data, canonical URLs, titles, and rich content for each tool.
 */

export interface ToolSeoData {
  id: string;
  slug: string;
  aliases?: string[];
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  whatIs: string;
  features: string[];
  howToUse: string[];
  useCases: string[];
  privacyStatement: string;
  relatedToolIds: string[];
  category: string;
  categoryLabel: string;
  keywords: string[];
}

export const SITE_URL = 'https://devpulsetools.pages.dev';
export const SITE_NAME = 'DevPulse Tools';

export const HOMEPAGE_SEO = {
  title: 'Free Online Tools for Developers, Designers, Finance & Education – DevPulse',
  metaDescription: 'Discover free, fast, privacy-first utilities for developers, designers, real estate investors, teachers, and students. Formatter, encoder, real estate calculator, CSS tools, and more running 100% in your browser.',
  h1: 'Free Online Tools for Developers, Designers, Finance & Education',
  intro: 'A comprehensive suite of modern utilities designed for fast workflows, financial planning, and academic productivity. Every tool runs client-side directly in your browser with zero tracking, zero server uploads, and instant response times.',
  canonical: `${SITE_URL}/`
};

export const ALL_TOOLS_SEO = {
  title: 'All Tools & Utilities – Free Online Suite | DevPulse Tools',
  metaDescription: 'Browse the complete collection of free utilities. Categorized into Real Estate & Finance, Developer, Designer, Security, Data, and Education with dedicated teacher and student tools.',
  h1: 'All Developer, Designer, Finance & Education Utilities',
  intro: 'Explore our full catalogue of browser-based utility tools. Filter by formal category or student/teacher sub-category, search instantly, and process your data locally without sending bytes to external servers.',
  canonical: `${SITE_URL}/tools/`
};

export const CATEGORIES_INFO = [
  {
    id: 'finance',
    name: 'Real Estate & Finance Tools',
    description: 'Calculate mortgage amortization, rental property ROI & Cap Rate, rent vs buy feasibility, loans, and investment interest.'
  },
  {
    id: 'developer',
    name: 'Developer Tools',
    description: 'Format, inspect, minify, test regex expressions, check diffs, and generate code syntax without leaving your browser.'
  },
  {
    id: 'designer',
    name: 'Designer & UI Tools',
    description: 'Design CSS box shadows, gradients, flexbox layouts, check color contrast, convert vectors, and generate palettes.'
  },
  {
    id: 'security',
    name: 'Security & Privacy Tools',
    description: 'Generate cryptographic passwords, calculate hash digests (MD5, SHA-256), decode JWT tokens, and verify bcrypt strings.'
  },
  {
    id: 'data',
    name: 'Data & Database Tools',
    description: 'Format JSON payloads, convert JSON to CSV, beautify SQL queries, generate JSON schemas, and encode Base64 or QR codes.'
  },
  {
    id: 'education',
    name: 'Education Suite (Teachers & Students)',
    description: 'Academic tools including GPA calculator, citation generator, classroom group picker, Pomodoro timer, readability analyzer, and flashcard maker.'
  }
];

export const TOOLS_SEO: Record<string, ToolSeoData> = {
  'json-formatter': {
    id: 'json-formatter',
    slug: 'json-formatter',
    title: 'JSON Formatter & Validator Online – Free JSON Tool | DevPulse',
    metaDescription: 'Format, validate, minify and inspect JSON directly in your browser. Free JSON formatter with syntax error detection and privacy-first client-side processing.',
    h1: 'JSON Formatter & Validator Online',
    intro: 'Prettify, validate, minify, and inspect JSON payloads with precise syntax error detection and zero server transfers.',
    whatIs: 'JSON (JavaScript Object Notation) Formatter is an interactive utility that parses raw, minified, or malformed JSON data, formats it with configurable indentation, and checks for syntax discrepancies in real time.',
    features: [
      'Format raw JSON with customizable 2-space or 4-space indentation',
      'Minify and compact large JSON payloads for API transfer',
      'Real-time syntax validator showing exact error line and column numbers',
      'One-click clipboard copy and file download (.json)',
      '100% client-side execution protecting sensitive API keys and tokens'
    ],
    howToUse: [
      'Paste your raw, unformatted, or minified JSON string into the input editor.',
      'Click "Format / Prettify" to structure the document with clean indentation.',
      'If errors exist, inspect the highlighted line and message to fix missing commas or quotes.',
      'Use "Minify" to strip whitespace for production payloads.',
      'Click "Copy" or "Download" to export your validated JSON.'
    ],
    useCases: [
      'Inspecting REST API or GraphQL JSON responses during frontend debugging',
      'Minifying configuration files before production deployments',
      'Validating complex configuration payloads (e.g. package.json, tsconfig.json)',
      'Cleaning up noisy server logs and nested object dumps'
    ],
    privacyStatement: 'Your data is processed locally in your browser. No JSON text or credentials are ever transmitted to any remote server.',
    relatedToolIds: ['base64-encoder-decoder', 'jwt-decoder', 'hash-generator', 'uuid-generator', 'html-minifier'],
    category: 'developer',
    categoryLabel: 'Developer Tools',
    keywords: ['json formatter', 'json validator', 'beautify json', 'minify json', 'format json online', 'json parser']
  },

  'base64-encoder-decoder': {
    id: 'base64-encoder-decoder',
    slug: 'base64-encoder-decoder',
    aliases: ['base64-tool'],
    title: 'Base64 Encoder & Decoder Online – Free Tool | DevPulse',
    metaDescription: 'Encode and decode Base64 strings, binary files, and data URLs locally in your browser. Supports URL-safe encoding and full UTF-8 Unicode characters.',
    h1: 'Base64 Encoder & Decoder Online',
    intro: 'Convert plain text, Unicode strings, and binary files to and from Base64 with optional URL-safe encoding.',
    whatIs: 'Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It is widely used in HTTP authorizations, Data URIs, email MIME headers, and API token transmission.',
    features: [
      'Bidirectional encoding and decoding for text and binary payloads',
      'URL-Safe Base64 mode (substituting + and / with - and _)',
      'Full UTF-8 Unicode support for international characters and emojis',
      'File to Base64 Data URL converter with instant drag-and-drop',
      'Live character and byte size calculation'
    ],
    howToUse: [
      'Choose whether you wish to Encode plaintext to Base64 or Decode Base64 to text.',
      'Type or paste your input into the editor, or drag and drop a binary file.',
      'Toggle "URL-Safe" mode if you intend to use the output in URL query parameters.',
      'Review the decoded or encoded result and click Copy to clipboard.'
    ],
    useCases: [
      'Encoding Basic Auth credentials (username:password) for HTTP headers',
      'Embedding small icons and images directly into CSS or HTML as Data URIs',
      'Decoding encoded parameters found in query strings and tracking links',
      'Debugging authorization tokens and webhook payloads'
    ],
    privacyStatement: 'Your data is processed locally in your browser. Files and text are converted in client-side memory only.',
    relatedToolIds: ['json-formatter', 'jwt-decoder', 'hash-generator', 'url-cleaner'],
    category: 'developer',
    categoryLabel: 'Developer Tools',
    keywords: ['base64 encode', 'base64 decode', 'base64 online', 'base64 to text', 'text to base64', 'url safe base64']
  },

  'image-compressor': {
    id: 'image-compressor',
    slug: 'image-compressor',
    title: 'Image Compressor & Resizer Online – Free Tool | DevPulse',
    metaDescription: 'Compress and resize JPEG, PNG, and WebP images directly in your browser. Reduce image file size without losing optical quality. 100% private and client-side.',
    h1: 'Image Compressor & Resizer Online',
    intro: 'Optimize and downscale JPEG, PNG, and WebP images locally with HTML5 canvas algorithms, slashing file size while preserving visual fidelity.',
    whatIs: 'An in-browser image optimization utility that recompresses raster graphics to modern standards, stripping metadata and applying efficient compression curves to improve website loading speeds.',
    features: [
      'Compress JPEG, PNG, and WebP images with adjustable quality sliders',
      'Resize images by width and height while maintaining aspect ratios',
      'Side-by-side original vs compressed file size and savings indicator',
      'Instant preview comparing visual quality before downloading',
      '100% client-side canvas processing ensures photos never touch a server'
    ],
    howToUse: [
      'Drag and drop any JPG, PNG, or WebP photo into the upload dropzone.',
      'Slide the compression quality (75%–85% recommended for optimal balance).',
      'Optionally set a maximum width or height to downscale large camera photos.',
      'Inspect the computed savings percentage and download your optimized image.'
    ],
    useCases: [
      'Shrinking photos for web performance and Core Web Vitals optimization',
      'Reducing image attachments for email and upload forms with strict size caps',
      'Batch-optimizing blog post banners and social media preview assets',
      'Downscaling smartphone high-resolution photos for mobile display'
    ],
    privacyStatement: 'Your data is processed locally in your browser. Your private images are never uploaded to any cloud server.',
    relatedToolIds: ['svg-to-png', 'qr-code-generator', 'color-converter'],
    category: 'media',
    categoryLabel: 'Image & Media Tools',
    keywords: ['image compressor', 'compress image online', 'reduce image size', 'compress png', 'compress jpg', 'webp compressor']
  },

  'qr-code-generator': {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    aliases: ['qr-generator'],
    title: 'Free QR Code Generator – Create QR Codes Online | DevPulse',
    metaDescription: 'Generate custom, high-resolution QR codes for websites, Wi-Fi networks, vCards, and text. Download crisp SVG vectors or PNGs with custom colors and error correction.',
    h1: 'Free QR Code Generator Online',
    intro: 'Create customizable QR codes for links, Wi-Fi configurations, contact cards, and plain text with flexible error correction levels and export formats.',
    whatIs: 'A Quick Response (QR) code is a two-dimensional matrix barcode capable of storing URLs, contact details, and credentials easily readable by smartphones and optical cameras.',
    features: [
      'Supports URLs, plain text, Wi-Fi network credentials, and vCard contacts',
      'Adjustable Error Correction Levels (L: 7%, M: 15%, Q: 25%, H: 30%)',
      'Customizable foreground and background color palette',
      'Export to high-resolution PNG or scalable vector SVG',
      'Instant real-time rendering as you type'
    ],
    howToUse: [
      'Choose the data format: URL / Link, Plain Text, Wi-Fi, or Contact Card (vCard).',
      'Fill in the fields (e.g. Wi-Fi SSID and password).',
      'Select colors to match your brand and choose the desired error correction level.',
      'Download as PNG for digital use or SVG for crisp print media.'
    ],
    useCases: [
      'Generating Wi-Fi access codes for office visitors and coffee shops without sharing passwords',
      'Printing scannable business cards, menus, stickers, and event flyers',
      'Creating dynamic links to landing pages, documentation, and app downloads',
      'Sharing payment addresses and cryptographic keys quickly'
    ],
    privacyStatement: 'Your data is processed locally in your browser. Wi-Fi passwords and personal contact cards remain strictly confidential on your device.',
    relatedToolIds: ['url-cleaner', 'svg-to-png', 'image-compressor'],
    category: 'media',
    categoryLabel: 'Image & Media Tools',
    keywords: ['qr code generator', 'free qr code', 'generate qr code', 'wifi qr code', 'vcard qr code', 'custom qr code']
  },

  'markdown-editor': {
    id: 'markdown-editor',
    slug: 'markdown-editor',
    title: 'Free Markdown Editor – Live Markdown Preview | DevPulse',
    metaDescription: 'Edit and preview Markdown in real time with side-by-side synchronized preview. Includes syntax shortcuts, word counts, and HTML export. 100% client-side.',
    h1: 'Free Markdown Live Editor & Previewer',
    intro: 'Write, format, and preview CommonMark and GitHub Flavored Markdown with instant side-by-side HTML rendering.',
    whatIs: 'Markdown is a lightweight markup language with plain text formatting syntax. This tool provides a distraction-free environment to draft READMEs, documentation, and articles with live preview.',
    features: [
      'Split-screen view with synchronous live HTML rendering',
      'Support for headings, lists, tables, code blocks, blockquotes, and links',
      'Word, character, and estimated reading time counters',
      'One-click export to Markdown (.md) or raw HTML (.html)',
      'Saved locally to prevent accidental content loss during work'
    ],
    howToUse: [
      'Type Markdown formatting directly into the left editor pane.',
      'Observe the instant live HTML preview on the right pane.',
      'Use toolbar buttons to quickly insert bold, italics, code blocks, or tables.',
      'Click "Export HTML" or "Download .md" when you are ready to publish.'
    ],
    useCases: [
      'Drafting GitHub repository README.md files and release documentation',
      'Writing blog posts and documentation for static site generators (Hugo, Astro, Jekyll)',
      'Quickly converting formatted text notes to clean HTML markup',
      'Testing Markdown table and syntax rendering'
    ],
    privacyStatement: 'Your data is processed locally in your browser. Your drafts are never synchronized to external servers.',
    relatedToolIds: ['html-minifier', 'word-counter', 'diff-checker', 'case-converter'],
    category: 'text',
    categoryLabel: 'Text Tools',
    keywords: ['markdown editor', 'live markdown preview', 'markdown to html', 'online markdown', 'markdown viewer']
  },

  'password-generator': {
    id: 'password-generator',
    slug: 'password-generator',
    title: 'Strong Password Generator – Free Secure Password Tool | DevPulse',
    metaDescription: 'Generate cryptographically strong, random passwords and passphrases using browser Web Crypto APIs. Includes entropy meter and customizable character sets.',
    h1: 'Strong Password Generator Online',
    intro: 'Create high-entropy, cryptographically secure random passwords and memorable passphrases with client-side Web Crypto APIs.',
    whatIs: 'A security tool that utilizes your browser\'s native cryptographic pseudorandom number generator (`crypto.getRandomValues`) to create unpredictable credentials resistant to brute-force and dictionary attacks.',
    features: [
      'Cryptographically secure random generation using the Web Crypto API',
      'Customizable length (8 to 64 characters) with uppercase, lowercase, numbers, and symbols',
      'Real-time password strength and entropy bit calculation',
      'Option to exclude confusing ambiguous characters (e.g. 0, O, 1, l, I)',
      'Bulk password generation mode for system administration'
    ],
    howToUse: [
      'Select your desired password length using the slider.',
      'Check or uncheck character sets (Uppercase, Lowercase, Numbers, Special Symbols).',
      'Inspect the entropy rating (e.g. 80+ bits for strong security).',
      'Click "Generate" or copy the password directly to your clipboard or password manager.'
    ],
    useCases: [
      'Generating master passwords for password managers (1Password, Bitwarden, KeePass)',
      'Creating secure API secrets, database passwords, and SSH passphrases',
      'Creating random tokens for staging environments and test accounts',
      'Setting up fresh Wi-Fi encryption keys'
    ],
    privacyStatement: 'Your data is processed locally in your browser. Generated passwords exist only in memory on your device and are never transmitted over the network.',
    relatedToolIds: ['hash-generator', 'uuid-generator', 'base64-encoder-decoder'],
    category: 'security',
    categoryLabel: 'Security & Privacy Tools',
    keywords: ['password generator', 'strong password', 'secure password generator', 'random password', 'generate password']
  },

  'hash-generator': {
    id: 'hash-generator',
    slug: 'hash-generator',
    title: 'Hash Generator – SHA-256, SHA-512 & MD5 | DevPulse',
    metaDescription: 'Calculate cryptographic hash digests including SHA-256, SHA-512, SHA-384, SHA-1, and MD5 in real time using client-side Web Crypto. Supports HMAC hashing.',
    h1: 'Cryptographic Hash Generator Online',
    intro: 'Generate instant hash checksums and HMAC signatures for any input text using standard cryptographic algorithms.',
    whatIs: 'A cryptographic hash function produces a fixed-size deterministic string from arbitrary data. It is foundational to file integrity checking, digital signatures, password hashing, and blockchain protocols.',
    features: [
      'Computes SHA-256, SHA-512, SHA-384, SHA-1, and MD5 simultaneously',
      'HMAC (Keyed-Hash Message Authentication Code) mode with custom secret key',
      'Instant hashing as you type powered by browser native Web Crypto',
      'One-click copy for each individual hash digest',
      'Hexadecimal output with character count verification'
    ],
    howToUse: [
      'Enter or paste the string you want to hash into the input area.',
      'Optionally toggle HMAC mode and provide a secret key for signature verification.',
      'Examine the computed hashes generated across all supported algorithms.',
      'Click the copy icon next to your desired hash (e.g. SHA-256).'
    ],
    useCases: [
      'Verifying file checksums and software release digests',
      'Generating API HMAC signatures for webhook authentication (Stripe, GitHub, AWS)',
      'Creating unique fingerprints for database records and cache keys',
      'Learning and demonstrating cryptographic hash properties'
    ],
    privacyStatement: 'Your data is processed locally in your browser. Secret keys and plaintexts never leave your local machine.',
    relatedToolIds: ['password-generator', 'uuid-generator', 'base64-encoder-decoder', 'jwt-decoder'],
    category: 'security',
    categoryLabel: 'Security & Privacy Tools',
    keywords: ['hash generator', 'sha256 generator', 'sha512 generator', 'md5 hash online', 'hmac generator', 'crypto hash']
  },

  'url-cleaner': {
    id: 'url-cleaner',
    slug: 'url-cleaner',
    aliases: ['url-shortener'],
    title: 'URL Cleaner – Remove UTM & Tracking Parameters | DevPulse',
    metaDescription: 'Strip UTM parameters, click IDs (fbclid, gclid), and tracking tokens from web links to protect privacy and create clean, shareable URLs. 100% client-side.',
    h1: 'URL Cleaner & Privacy Link Tool',
    intro: 'Clean cluttered web URLs by stripping marketing trackers, analytics tokens, and click IDs to protect user privacy when sharing links.',
    whatIs: 'URL Cleaner analyzes query parameters inside web links and strips out tracking tags such as UTM campaigns, Facebook Click IDs (`fbclid`), Google Click IDs (`gclid`), and affiliate referrals.',
    features: [
      'Automatically detects and removes utm_source, utm_medium, utm_campaign, gclid, fbclid, and more',
      'Shows which tracking tags were removed with clear visual badges',
      'One-click copy for clean privacy-safe link sharing',
      'Generates a companion QR code for the sanitized URL',
      'Local bookmark history saved in browser storage'
    ],
    howToUse: [
      'Paste any long or marketing URL cluttered with tracking tokens.',
      'The cleaner automatically extracts and purges tracking query parameters in real time.',
      'Review the list of stripped tags and inspect the clean output URL.',
      'Click "Copy Clean URL" to share a privacy-friendly link.'
    ],
    useCases: [
      'Sharing links on social media and messaging apps without sending tracking metadata',
      'Cleaning affiliate links before saving bookmarks',
      'Shortening cluttered documentation URLs for presentations',
      'Removing cross-site session IDs and referrer traces'
    ],
    privacyStatement: 'Your data is processed locally in your browser. Links you paste are parsed purely via the browser URL API.',
    relatedToolIds: ['qr-code-generator', 'base64-encoder-decoder', 'color-converter'],
    category: 'security',
    categoryLabel: 'Security & Privacy Tools',
    keywords: ['url cleaner', 'remove utm', 'strip tracking parameters', 'clean link', 'remove fbclid', 'privacy url']
  },

  'color-converter': {
    id: 'color-converter',
    slug: 'color-converter',
    title: 'Color Converter & Contrast Checker – HEX, RGB, HSL | DevPulse',
    metaDescription: 'Convert between HEX, RGB, HSL, and CMYK color codes with an integrated WCAG 2.1 accessibility contrast checker. 100% client-side design utility.',
    h1: 'Color Converter & Contrast Checker',
    intro: 'Convert colors across HEX, RGB, HSL, and CMYK formats while evaluating WCAG 2.1 accessibility compliance against light and dark backgrounds.',
    whatIs: 'A color conversion and accessibility auditing suite for UI/UX designers and frontend developers to cross-convert color representations and guarantee accessible contrast ratios.',
    features: [
      'Bidirectional conversion between HEX, RGB, HSL, and CMYK',
      'Interactive visual color picker and palette generator',
      'WCAG 2.1 accessibility contrast ratio audit (AA and AAA rating tests)',
      'Generated tints and shades palette for component styling',
      'One-click CSS color string copying (hex, rgb(), hsl())'
    ],
    howToUse: [
      'Pick a color with the visual palette or type an existing HEX, RGB, or HSL code.',
      'View instantaneous conversions updated across all standard color models.',
      'Check the contrast score against white and dark backgrounds to ensure WCAG compliance.',
      'Copy the ready-to-use CSS syntax directly to your clipboard.'
    ],
    useCases: [
      'Translating design tokens from Figma or Sketch into CSS stylesheets',
      'Ensuring button and typography colors pass accessibility audits (WCAG AA/AAA)',
      'Creating harmonious tint and shade variations for hover and active button states',
      'Converting print CMYK coordinates to screen RGB values'
    ],
    privacyStatement: 'Your data is processed locally in your browser. Color computations execute instantaneously in JavaScript.',
    relatedToolIds: ['css-box-shadow-generator', 'svg-to-png', 'image-compressor'],
    category: 'converter',
    categoryLabel: 'Converters',
    keywords: ['color converter', 'hex to rgb', 'rgb to hex', 'contrast checker', 'wcag contrast', 'hsl converter']
  },

  'regex-tester': {
    id: 'regex-tester',
    slug: 'regex-tester',
    title: 'Regex Tester – Test Regular Expressions Online | DevPulse',
    metaDescription: 'Test and debug JavaScript regular expressions in real time. Highlights matches, capture groups, and supports global, multiline, and case-insensitive flags.',
    h1: 'Regular Expression Live Tester',
    intro: 'Debug, test, and refine regular expressions with real-time match highlighting, capture group inspection, and flag toggles.',
    whatIs: 'A development tool that evaluates regular expression patterns against sample text in real time using the browser JavaScript RegExp engine.',
    features: [
      'Real-time syntax evaluation as you write your pattern',
      'Visual match highlighting with match index and capture group breakdown',
      'Toggleable flags: Global (g), Case-Insensitive (i), Multiline (m), DotAll (s), and Unicode (u)',
      'Pre-built templates for common patterns (Emails, URLs, Phone numbers, Dates)',
      'Displays full match counts and execution diagnostics'
    ],
    howToUse: [
      'Enter your regular expression pattern in the pattern input field.',
      'Toggle desired flags (e.g. g for global match, i for case-insensitive).',
      'Type or paste your test text in the test string area.',
      'Inspect the highlighted matches and capture group details listed below.'
    ],
    useCases: [
      'Validating form inputs such as emails, postal codes, and custom identifiers',
      'Extracting specific substrings and tokens from log files',
      'Testing regex replacement expressions before refactoring codebase files',
      'Learning and mastering regular expression syntax'
    ],
    privacyStatement: 'Your data is processed locally in your browser. Sample text and regular expressions are never sent across the network.',
    relatedToolIds: ['diff-checker', 'word-counter', 'case-converter', 'html-minifier'],
    category: 'developer',
    categoryLabel: 'Developer Tools',
    keywords: ['regex tester', 'test regex online', 'javascript regex', 'regular expression tester', 'regex debugger']
  },

  'diff-checker': {
    id: 'diff-checker',
    slug: 'diff-checker',
    title: 'Diff Checker – Compare Text & Code Online | DevPulse',
    metaDescription: 'Compare two blocks of text or code side-by-side to highlight differences, additions, and deletions. Fast, private, 100% client-side diff comparison.',
    h1: 'Text & Code Diff Checker Online',
    intro: 'Compare two pieces of text or source code side-by-side with visual line-by-line difference tracking and change metrics.',
    whatIs: 'Diff Checker calculates the difference between an original and modified version of a document or code snippet, showing additions in green and deletions in red.',
    features: [
      'Side-by-side and unified diff comparison views',
      'Clear color-coded highlights for added, modified, and deleted lines',
      'Summary metrics showing total additions, deletions, and unchanged lines',
      'Swap text button to reverse original and modified perspectives easily',
      'Zero server dependencies; runs entirely in browser memory'
    ],
    howToUse: [
      'Paste your original text or code snippet into the left text box.',
      'Paste your revised or modified text into the right text box.',
      'View the highlighted changes instantly with line numbers and diff badges.',
      'Toggle between side-by-side and unified views as needed.'
    ],
    useCases: [
      'Comparing changes between two versions of code before committing',
      'Auditing legal documents and contractual clauses for subtle changes',
      'Detecting configuration drift across server environment files',
      'Verifying translation revisions and editorial changes'
    ],
    privacyStatement: 'Your data is processed locally in your browser. Confidential code and private drafts remain secure on your machine.',
    relatedToolIds: ['markdown-editor', 'word-counter', 'regex-tester', 'case-converter'],
    category: 'text',
    categoryLabel: 'Text Tools',
    keywords: ['diff checker', 'text diff online', 'compare text', 'code diff', 'compare files', 'diff viewer']
  },

  'unit-converter': {
    id: 'unit-converter',
    slug: 'unit-converter',
    title: 'Unit Converter – Free Online Unit Conversion Tool | DevPulse',
    metaDescription: 'Convert between units of length, weight, digital storage, temperature, speed, and time with instant bidirectional calculations. 100% client-side tool.',
    h1: 'Universal Unit Converter Online',
    intro: 'Fast, comprehensive unit conversion across length, mass, digital storage, temperature, speed, and time with high floating-point precision.',
    whatIs: 'A multi-category measurement converter that transforms numeric values across metric, imperial, and digital computation units.',
    features: [
      'Multiple categories: Length, Weight, Digital Storage, Temperature, Speed, and Time',
      'Supports Metric (meters, grams) and Imperial (inches, feet, pounds) systems',
      'Digital storage units from bytes to terabytes (KB, MB, GB, TB)',
      'Live bidirectional calculations as you enter values',
      'High-precision decimal output with easy copy'
    ],
    howToUse: [
      'Select the measurement category (e.g. Digital Storage or Length).',
      'Enter the numerical value and choose the source unit.',
      'Select the destination unit to convert into.',
      'View the converted result instantly with full mathematical precision.'
    ],
    useCases: [
      'Converting data sizes between megabytes (MB) and gigabytes (GB) for bandwidth budgeting',
      'Translating CSS units (rem, px, inches) during frontend responsive design',
      'Converting temperatures (Celsius, Fahrenheit, Kelvin) for international audiences',
      'Calculating distance and speed benchmarks across metric and imperial systems'
    ],
    privacyStatement: 'Your data is processed locally in your browser. Mathematical equations are solved instantaneously in client JavaScript.',
    relatedToolIds: ['timestamp-converter', 'color-converter', 'word-counter'],
    category: 'converter',
    categoryLabel: 'Converters',
    keywords: ['unit converter', 'convert units online', 'length converter', 'digital storage converter', 'weight converter']
  },

  'timestamp-converter': {
    id: 'timestamp-converter',
    slug: 'timestamp-converter',
    title: 'Unix Timestamp Converter – Epoch & Date Converter | DevPulse',
    metaDescription: 'Convert Unix epoch timestamps to human-readable dates and vice versa. Includes live Unix clock, UTC, local time, and ISO-8601 formatting. 100% client-side.',
    h1: 'Unix Timestamp & Epoch Converter',
    intro: 'Convert between Unix epoch timestamps (seconds and milliseconds) and human-readable calendar dates across UTC and local time zones.',
    whatIs: 'Unix time represents the number of seconds that have elapsed since January 1, 1970 UTC (the Unix Epoch). It is widely used in databases, HTTP caching headers, and authentication tokens.',
    features: [
      'Live real-time ticking Unix epoch clock in seconds and milliseconds',
      'Bidirectional conversion: Epoch to Date, and Date picker to Epoch',
      'Displays conversions in UTC, local time zone, and ISO-8601 formats',
      'Relative time indicator (e.g. "5 minutes ago" or "in 2 hours")',
      'One-click copy for timestamps and formatted strings'
    ],
    howToUse: [
      'View the current live Unix timestamp at the top of the tool.',
      'To convert a timestamp: paste the numeric value into the input field.',
      'To convert a date: select a date and time using the calendar picker.',
      'Read and copy the converted outputs in UTC, ISO-8601, and local formats.'
    ],
    useCases: [
      'Debugging database `created_at` and `updated_at` epoch timestamps',
      'Decoding expiration timestamps (`exp`, `iat`) inside JWT tokens',
      'Setting cache control and cookie expiration headers accurately',
      'Translating server log timestamps into local time'
    ],
    privacyStatement: 'Your data is processed locally in your browser. Date calculations rely on native browser Date APIs.',
    relatedToolIds: ['jwt-decoder', 'unit-converter', 'json-formatter'],
    category: 'converter',
    categoryLabel: 'Converters',
    keywords: ['unix timestamp converter', 'epoch converter', 'timestamp to date', 'date to timestamp', 'unix time online']
  },

  'html-minifier': {
    id: 'html-minifier',
    slug: 'html-minifier',
    title: 'HTML Minifier – Compress & Minify HTML Online | DevPulse',
    metaDescription: 'Compress and minify HTML code by stripping comments, whitespace, and redundant attributes to accelerate webpage load times. 100% client-side tool.',
    h1: 'HTML Code Minifier & Compressor',
    intro: 'Reduce HTML file size by stripping unnecessary whitespace, blank lines, and comments while keeping markup valid.',
    whatIs: 'HTML Minifier is an optimization utility that cleans raw HTML markup by removing redundant indentation, extra spaces, and code comments to reduce bandwidth usage.',
    features: [
      'Strips extra whitespace, tabs, and duplicate line breaks',
      'Optional removal of HTML comments (`<!-- comment -->`)',
      'Preserves preformatted code blocks and textareas safely',
      'Before-and-after byte size metrics and compression ratio display',
      'One-click copy and file download (.html)'
    ],
    howToUse: [
      'Paste your raw or unminified HTML markup into the editor.',
      'Select minification options (e.g. remove comments).',
      'Click "Minify HTML" to run the compression algorithm.',
      'Inspect the computed byte savings and copy the clean output.'
    ],
    useCases: [
      'Compressing static HTML templates before production deployment',
      'Embedding inline HTML widgets and email newsletters with tight size constraints',
      'Speeding up Core Web Vitals (LCP, TTFB) by shrinking markup transfer size',
      'Cleaning up noisy exported markup from visual WYSIWYG editors'
    ],
    privacyStatement: 'Your data is processed locally in your browser. Your HTML code is transformed entirely in client-side memory.',
    relatedToolIds: ['json-formatter', 'markdown-editor', 'css-box-shadow-generator', 'diff-checker'],
    category: 'developer',
    categoryLabel: 'Developer Tools',
    keywords: ['html minifier', 'minify html online', 'compress html', 'html compressor', 'clean html code']
  },

  'uuid-generator': {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    title: 'UUID Generator – Free Online UUID v4 Generator | DevPulse',
    metaDescription: 'Generate RFC 4122 compliant version 4 UUIDs and GUIDs individually or in bulk. Features uppercase, hyphen-less, and brute-force cryptographic randomness.',
    h1: 'UUID / GUID Generator Online',
    intro: 'Generate cryptographically random RFC 4122 version 4 UUIDs and GUIDs individually or in bulk using the Web Crypto API.',
    whatIs: 'A Universally Unique Identifier (UUID) is a 128-bit label used for unique identification across computer systems. Version 4 UUIDs are generated randomly with negligible probability of collision.',
    features: [
      'Generates RFC 4122 Version 4 cryptographically random UUIDs',
      'Bulk generation option (generate from 1 to 100 UUIDs in one click)',
      'Formatting options: Standard hyphens, No hyphens, Uppercase, or Lowercase',
      'One-click copy all or download as a clean text list',
      'Powered by `crypto.randomUUID()` for guaranteed entropy'
    ],
    howToUse: [
      'Select how many UUIDs you need to generate (e.g. 1, 5, 25, or 100).',
      'Choose whether to include hyphens and select case sensitivity (lowercase or uppercase).',
      'Click "Generate UUIDs" to produce fresh identifiers.',
      'Copy individual UUIDs or click "Copy All" to export the entire list.'
    ],
    useCases: [
      'Creating unique primary keys for database records (PostgreSQL, MongoDB, SQLite)',
      'Assigning transaction and trace IDs for distributed API logging',
      'Mocking mock database records and fixtures during unit testing',
      'Generating unique filenames and download tokens'
    ],
    privacyStatement: 'Your data is processed locally in your browser. All UUIDs are produced directly via your browser\'s native cryptographic engine.',
    relatedToolIds: ['password-generator', 'hash-generator', 'base64-encoder-decoder'],
    category: 'developer',
    categoryLabel: 'Developer Tools',
    keywords: ['uuid generator', 'guid generator', 'uuid v4', 'generate uuid online', 'random uuid', 'bulk uuid']
  },

  'jwt-decoder': {
    id: 'jwt-decoder',
    slug: 'jwt-decoder',
    title: 'JWT Decoder – Decode JSON Web Tokens Online | DevPulse',
    metaDescription: 'Decode and inspect JSON Web Tokens (JWT) headers, payloads, claims, and expiration dates locally in your browser without exposing secret tokens.',
    h1: 'JSON Web Token (JWT) Decoder',
    intro: 'Inspect, decode, and analyze JSON Web Token (JWT) header parameters, claims, payloads, and expiration dates with 100% client-side privacy.',
    whatIs: 'JSON Web Tokens (JWT) are open industry-standard RFC 7519 tokens used to securely transmit claims between parties. This tool decodes Base64Url-encoded tokens into readable JSON structures.',
    features: [
      'Decodes Header (algorithm, token type) and Payload (claims, roles, user ID)',
      'Automatic expiration checking with readable date and remaining time status',
      'Formatted JSON visualization with syntax highlighting',
      'Signature verification indicator',
      'Strict client-side decoding: sensitive bearer tokens are NEVER sent over the internet'
    ],
    howToUse: [
      'Paste your encoded JWT string (the three-part `header.payload.signature`) into the input.',
      'The tool automatically splits and decodes the Base64Url segments in real time.',
      'Inspect the header algorithms, payload claims, and the `exp` / `iat` timestamps.',
      'Copy the formatted payload JSON or claims as needed.'
    ],
    useCases: [
      'Debugging OAuth 2.0 and OpenID Connect authentication flows',
      'Checking user roles and permissions encoded inside bearer tokens',
      'Verifying why a session token is expired or rejecting API requests',
      'Inspecting custom token claims during backend integration testing'
    ],
    privacyStatement: 'Your data is processed locally in your browser. Your authentication tokens are NEVER sent to any server or logged.',
    relatedToolIds: ['json-formatter', 'base64-encoder-decoder', 'timestamp-converter', 'hash-generator'],
    category: 'developer',
    categoryLabel: 'Developer Tools',
    keywords: ['jwt decoder', 'decode jwt', 'inspect jwt', 'json web token decoder', 'jwt debugger online']
  },

  'case-converter': {
    id: 'case-converter',
    slug: 'case-converter',
    title: 'Case Converter – camelCase, snake_case, kebab-case & More | DevPulse',
    metaDescription: 'Convert text and code variables between camelCase, snake_case, kebab-case, PascalCase, Title Case, UPPERCASE, and lowercase instantly in your browser.',
    h1: 'Text & Code Variable Case Converter',
    intro: 'Transform text and programming identifiers across camelCase, PascalCase, snake_case, kebab-case, Title Case, and more.',
    whatIs: 'A text transformation tool that converts naming conventions between standard English capitalization styles and programming language identifier conventions.',
    features: [
      'Supports camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and Title Case',
      'Supports UPPERCASE, lowercase, and Sentence case',
      'Instant conversion across all formats simultaneously as you type',
      'One-click copy button next to each converted naming style',
      'Handles multi-word phrases, hyphens, underscores, and acronyms'
    ],
    howToUse: [
      'Type or paste your text or variable name into the input field.',
      'View instantaneous live conversions across all supported case formats.',
      'Click the copy button beside the desired format to paste into your code editor.'
    ],
    useCases: [
      'Converting database column names (snake_case) to JavaScript variables (camelCase)',
      'Formulating CSS class names and URLs (kebab-case) from product titles',
      'Standardizing constant definitions (UPPER_SNAKE_CASE) in configuration files',
      'Fixing capitalization errors in blog titles and article headlines'
    ],
    privacyStatement: 'Your data is processed locally in your browser. Text manipulation executes in memory with zero external requests.',
    relatedToolIds: ['word-counter', 'markdown-editor', 'diff-checker'],
    category: 'text',
    categoryLabel: 'Text Tools',
    keywords: ['case converter', 'camelcase converter', 'snake case', 'kebab case', 'pascal case', 'title case converter']
  },

  'word-counter': {
    id: 'word-counter',
    slug: 'word-counter',
    title: 'Word Counter – Free Text & Word Count Tool | DevPulse',
    metaDescription: 'Count words, characters, sentences, and paragraphs in real time with estimated reading and speaking times. Includes keyword density analysis. 100% private.',
    h1: 'Word Counter & Text Analyzer',
    intro: 'Analyze text in real time with word, character, sentence, and paragraph counts alongside estimated reading and speaking times.',
    whatIs: 'An online editorial and copywriting analyzer that measures text metrics and density to help writers adhere to publishing constraints.',
    features: [
      'Real-time metrics: words, characters (with & without spaces), sentences, and paragraphs',
      'Estimated reading time and speaking time calculations',
      'Keyword density frequency table highlighting recurring terms',
      'Average word length and reading level metrics',
      '100% private: write and analyze sensitive drafts securely'
    ],
    howToUse: [
      'Type or paste your text into the large writing area.',
      'Watch the counters update instantaneously with every keystroke.',
      'Review the estimated reading time and sentence length distributions.',
      'Check the keyword frequency table to avoid repetitive phrasing.'
    ],
    useCases: [
      'Ensuring essays and assignments meet word count requirements',
      'Keeping social media posts within platform character limits (X, LinkedIn, Meta)',
      'Estimating speaking duration for speech transcripts and video scripts',
      'Optimizing blog posts and articles for readability and content length'
    ],
    privacyStatement: 'Your data is processed locally in your browser. No drafts or notes leave your browser session.',
    relatedToolIds: ['case-converter', 'markdown-editor', 'diff-checker'],
    category: 'text',
    categoryLabel: 'Text Tools',
    keywords: ['word counter', 'character counter', 'count words online', 'reading time calculator', 'text analyzer']
  },

  'svg-to-png': {
    id: 'svg-to-png',
    slug: 'svg-to-png',
    aliases: ['svg-to-png-converter'],
    title: 'SVG to PNG Converter – Free Online SVG Converter | DevPulse',
    metaDescription: 'Convert SVG vector files and code into crisp, high-resolution PNG images with transparent backgrounds and custom resolution scaling up to 8x Retina.',
    h1: 'SVG to PNG Converter Online',
    intro: 'Convert scalable vector graphics (SVG) into crisp, high-resolution raster PNG images with custom scaling multipliers and background controls.',
    whatIs: 'SVG to PNG Converter rasterizes vector SVG markup onto an HTML5 canvas at custom resolution scales, rendering pixel-crisp PNG images for software, presentations, and platforms that do not support vector formats.',
    features: [
      'Paste SVG XML code or upload an SVG file directly',
      'Resolution scaling multipliers (1x, 2x Retina, 4x Ultra-HD, 8x Print)',
      'Toggle transparent or custom solid background color',
      'Real-time canvas preview before downloading',
      'Instant client-side export to downloadable .png file'
    ],
    howToUse: [
      'Paste your raw SVG code or upload an .svg file.',
      'Select your desired output scale (e.g. 2x or 4x for high-DPI displays).',
      'Choose between a transparent background or a solid white canvas.',
      'Inspect the rasterized preview and click "Download PNG".'
    ],
    useCases: [
      'Converting vector logos and icons for social media avatars and favicon creation',
      'Rendering SVG illustrations for Microsoft PowerPoint and Word documents',
      'Creating high-DPI assets for mobile and web applications',
      'Converting charts and diagram exports into universal raster images'
    ],
    privacyStatement: 'Your data is processed locally in your browser. Vector parsing and image rasterization happen strictly via HTML5 Canvas APIs.',
    relatedToolIds: ['image-compressor', 'qr-code-generator', 'color-converter'],
    category: 'media',
    categoryLabel: 'Image & Media Tools',
    keywords: ['svg to png', 'convert svg to png', 'svg converter', 'vector to png', 'svg rasterizer']
  },

  'css-box-shadow-generator': {
    id: 'css-box-shadow-generator',
    slug: 'css-box-shadow-generator',
    aliases: ['box-shadow-generator'],
    title: 'CSS Box Shadow Generator – Free Online CSS Tool | DevPulse',
    metaDescription: 'Design multi-layered CSS box shadows with interactive controls for offset, blur, spread, and inset. Copy clean CSS box-shadow code instantly.',
    h1: 'CSS Box Shadow Generator Online',
    intro: 'Create elegant multi-layer CSS box shadows with interactive sliders, real-time visual preview, and instant CSS code export.',
    whatIs: 'A visual CSS styling tool that lets designers and developers craft sophisticated, realistic elevation and drop-shadow effects with stacked CSS `box-shadow` rules.',
    features: [
      'Interactive sliders for Horizontal Offset, Vertical Offset, Blur Radius, and Spread Radius',
      'Color picker with alpha transparency slider',
      'Support for multiple stacked shadow layers to produce smooth realistic depth',
      'Inset checkbox for interior shadow styling',
      'One-click CSS code copy for stylesheets and Tailwind CSS configs'
    ],
    howToUse: [
      'Adjust the sliders to manipulate the light angle, elevation, and blur spread.',
      'Pick a shadow color and adjust opacity to keep shadows natural.',
      'Click "Add Layer" to stack a secondary softer shadow for realistic depth.',
      'Click "Copy CSS" to paste the rule directly into your stylesheet.'
    ],
    useCases: [
      'Crafting modern card and modal elevations for web applications',
      'Designing subtle neumorphic or modern minimalist UI component depths',
      'Visualizing shadow spread before committing styling to code',
      'Generating reusable design system elevation tokens'
    ],
    privacyStatement: 'Your data is processed locally in your browser. All styles render in real-time in your DOM.',
    relatedToolIds: ['color-converter', 'html-minifier', 'svg-to-png'],
    category: 'developer',
    categoryLabel: 'CSS & Web Tools',
    keywords: ['css box shadow generator', 'box shadow generator', 'box-shadow css', 'css shadow generator', 'drop shadow generator']
  }
};

/**
 * Static pages SEO configuration
 */
export const STATIC_PAGES_SEO: Record<string, { title: string; metaDescription: string; h1: string; canonical: string }> = {
  about: {
    title: 'About DevPulse Tools – Free Privacy-First Online Utilities',
    metaDescription: 'Learn about DevPulse Tools, our mission to provide fast, 100% browser-based developer utilities without ads, trackers, or server uploads.',
    h1: 'About DevPulse Tools',
    canonical: `${SITE_URL}/about/`
  },
  privacy: {
    title: 'Privacy Policy – Client-Side Data Security | DevPulse Tools',
    metaDescription: 'DevPulse Tools Privacy Policy: All tools execute client-side in your browser. We do not store, collect, or transmit your inputs or files to external servers.',
    h1: 'Privacy Policy',
    canonical: `${SITE_URL}/privacy/`
  },
  terms: {
    title: 'Terms of Service – DevPulse Tools',
    metaDescription: 'DevPulse Tools Terms of Service: Free, open client-side utilities provided as-is with zero server logging or user tracking.',
    h1: 'Terms of Service',
    canonical: `${SITE_URL}/terms/`
  },
  'real-estate': {
    title: 'Real Estate & Mortgage Calculator – Free Property Investment Hub | DevPulse',
    metaDescription: 'Calculate mortgage amortization schedules, rental property ROI & Cap Rate, cash-on-cash return, and rent vs. buy financial feasibility with 100% private client-side processing.',
    h1: 'Real Estate & Mortgage Investment Calculator Hub',
    canonical: `${SITE_URL}/tools/real-estate-calculator/`
  },
  contact: {
    title: 'Contact & Feedback – DevPulse Tools',
    metaDescription: 'Get in touch with the DevPulse Tools team. Suggest new developer utilities, report issues, or provide feedback on our suite.',
    h1: 'Contact & Feedback',
    canonical: `${SITE_URL}/contact/`
  },
  'not-found': {
    title: '404 - Page Not Found | DevPulse Tools',
    metaDescription: 'The page you requested could not be found. Explore our collection of free developer tools or return to the DevPulse homepage.',
    h1: '404 - Page Not Found',
    canonical: `${SITE_URL}/404/`
  }
};

/**
 * Helper to lookup tool SEO by id or slug or alias
 */
export function getToolSeo(identifier: string): ToolSeoData | undefined {
  if (TOOLS_SEO[identifier]) return TOOLS_SEO[identifier];
  return Object.values(TOOLS_SEO).find(
    t => t.slug === identifier || (t.aliases && t.aliases.includes(identifier))
  );
}
