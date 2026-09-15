const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'i18n', 'translations.ts');
let content = fs.readFileSync(file, 'utf-8');

// English
content = content.replace(
  /heroTitle: 'Essential Tools for Developers & Creators,'/,
  "heroTitle: '60+ Free Tools for Developers, Designers,'"
);
content = content.replace(
  /heroTitleHighlight: 'Completely In Your Browser.'/,
  "heroTitleHighlight: 'Teachers & Students.'"
);
content = content.replace(
  /heroDescription: 'Experience 60 high-performance utility tools with uncompromising privacy. All operations execute strictly on your device with zero data sent to external servers.'/,
  "heroDescription: 'Fast, private, browser-based tools for everyday work, coding, design and learning. All operations execute strictly on your device with zero data sent to external servers.'"
);

fs.writeFileSync(file, content);
