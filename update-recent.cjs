const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'context', 'AppContext.tsx');
let content = fs.readFileSync(file, 'utf-8');

// Interface
content = content.replace(
  'recentTools: string[];',
  'recentTools: string[];\n  addRecentTool: (toolId: string) => void;'
);

// Implementation
const oldRecentHook = `  const [recentTools, setRecentTools] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('devpulse_recents');
      return saved ? JSON.parse(saved) : ['json-formatter', 'qr-code-generator', 'image-compressor'];
    } catch {
      return ['json-formatter', 'qr-code-generator', 'image-compressor'];
    }
  });`;

const newRecentHook = `  const [recentTools, setRecentTools] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('devpulse_recents');
      return saved ? JSON.parse(saved) : ['json-formatter', 'qr-code-generator', 'image-compressor'];
    } catch {
      return ['json-formatter', 'qr-code-generator', 'image-compressor'];
    }
  });

  const addRecentTool = (toolId: string) => {
    setRecentTools(prev => {
      const next = [toolId, ...prev.filter(id => id !== toolId)].slice(0, 10);
      localStorage.setItem('devpulse_recents', JSON.stringify(next));
      return next;
    });
  };`;

content = content.replace(oldRecentHook, newRecentHook);

// navigateToTool logic
const oldNav = `  const navigateToTool = (toolId: string) => {
    setActivePage({ type: 'tool', toolId });
  };`;

const newNav = `  const navigateToTool = (toolId: string) => {
    addRecentTool(toolId);
    setActivePage({ type: 'tool', toolId });
  };`;

content = content.replace(oldNav, newNav);

// Context value
content = content.replace(
  'recentTools,',
  'recentTools,\n        addRecentTool,'
);

fs.writeFileSync(file, content);
