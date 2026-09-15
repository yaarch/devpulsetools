const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'i18n', 'translations.ts');
let content = fs.readFileSync(file, 'utf-8');

const replacements = [
  {
    lang: 'en',
    old: /heroTitle: '60\+ Free Tools for Developers, Designers,',[\s\S]*?heroTitleHighlight: 'Teachers & Students.',[\s\S]*?heroDescription: '[^']*',/,
    newStr: `heroTitle: '60+ Free Tools for Developers, Designers,',
    heroTitleHighlight: 'Teachers & Students.',
    heroDescription: 'Fast, private, browser-based tools for everyday work, coding, design and learning. All operations execute strictly on your device with zero data sent to external servers.',`
  },
  {
    lang: 'es',
    old: /heroTitle: 'Herramientas esenciales para creadores y desarrolladores,',[\s\S]*?heroTitleHighlight: 'Completamente en tu navegador.',[\s\S]*?heroDescription: '[^']*',/,
    newStr: `heroTitle: 'Más de 60 herramientas para desarrolladores, diseñadores,',
    heroTitleHighlight: 'profesores y estudiantes.',
    heroDescription: 'Herramientas rápidas y privadas en el navegador para programación, diseño y aprendizaje. Todo se ejecuta en tu dispositivo sin enviar datos a servidores.',`
  },
  {
    lang: 'fr',
    old: /heroTitle: 'Outils essentiels pour développeurs et créateurs,',[\s\S]*?heroTitleHighlight: 'Directement dans votre navigateur.',[\s\S]*?heroDescription: '[^']*',/,
    newStr: `heroTitle: 'Plus de 60 outils gratuits pour développeurs, designers,',
    heroTitleHighlight: 'enseignants et étudiants.',
    heroDescription: 'Des outils rapides et privés dans le navigateur pour le code, le design et l\\'apprentissage. Toutes les opérations s\\'exécutent localement.',`
  },
  {
    lang: 'ar',
    old: /heroTitle: 'أدوات احترافية لا غنى عنها للمطورين والمبدعين،',[\s\S]*?heroTitleHighlight: 'تعمل كلياً داخل متصفحك.',[\s\S]*?heroDescription: '[^']*',/,
    newStr: `heroTitle: 'أكثر من 60 أداة مجانية للمطورين، المصممين،',
    heroTitleHighlight: 'المعلمين والطلاب.',
    heroDescription: 'أدوات سريعة، آمنة، وتعمل بالكامل داخل متصفحك لإنجاز المهام اليومية، البرمجة، التصميم، والتعليم. جميع العمليات تتم محلياً على جهازك لضمان الخصوصية.',`
  },
  {
    lang: 'de',
    old: /heroTitle: 'Unverzichtbare Werkzeuge für Entwickler & Kreative,',[\s\S]*?heroTitleHighlight: 'Direkt in Ihrem Browser.',[\s\S]*?heroDescription: '[^']*',/,
    newStr: `heroTitle: '60+ kostenlose Tools für Entwickler, Designer,',
    heroTitleHighlight: 'Lehrer & Studenten.',
    heroDescription: 'Schnelle, private, browserbasierte Tools für Code, Design und Lernen. Alle Vorgänge werden lokal auf Ihrem Gerät ohne Datenübertragung ausgeführt.',`
  }
];

replacements.forEach(rep => {
  content = content.replace(rep.old, rep.newStr);
});

fs.writeFileSync(file, content);
