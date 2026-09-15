const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'context', 'AppContext.tsx');
let content = fs.readFileSync(file, 'utf-8');

content = content.replace(
  'const [recentTools,        addRecentTool, setRecentTools] = useState<string[]>(',
  'const [recentTools, setRecentTools] = useState<string[]>('
);

fs.writeFileSync(file, content);
