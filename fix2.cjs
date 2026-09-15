const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'context', 'AppContext.tsx');
let content = fs.readFileSync(file, 'utf-8');

// Remove addRecentTool definition
content = content.replace(/  const addRecentTool = \(toolId: string\) => {[\s\S]*?  };\n/, '');

// Remove addRecentTool from context interface
content = content.replace(/  addRecentTool: \(toolId: string\) => void;\n/, '');

fs.writeFileSync(file, content);
