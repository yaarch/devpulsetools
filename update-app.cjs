const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(file, 'utf-8');

// Imports
content = content.replace("import { ToolGrid } from './components/home/ToolGrid';", "import { ToolGrid } from './components/home/ToolGrid';\nimport { EducationPromo } from './components/home/EducationPromo';\nimport { PopularTools } from './components/home/PopularTools';\nimport { RecentTools } from './components/home/RecentTools';");

// Render
const oldRender = `<>
            <Hero />
            <ToolGrid />
          </>`;

const newRender = `<>
            <Hero />
            <RecentTools />
            <PopularTools />
            <div id="tool-grid">
              <ToolGrid />
            </div>
            <EducationPromo />
          </>`;

content = content.replace(oldRender, newRender);
content = content.replace(oldRender, newRender); // Do it twice for the default case

fs.writeFileSync(file, content);
