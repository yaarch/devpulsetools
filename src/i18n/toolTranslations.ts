import { Language } from '../types';

export interface LocalizedToolInfo {
  name: string;
  shortDesc: string;
  tags?: string[];
}

export const TOOL_TRANSLATIONS: Record<string, Partial<Record<Language, LocalizedToolInfo>>> = {
  'compound-interest-calculator': {
    ar: {
      name: 'حاسبة الفائدة المركبة والنمو الاستثماري',
      shortDesc: 'احسب نمو استثماراتك ومدخراتك مع جدول الإيداعات السنوية وحساب العائد التراكمي وتوزيع الأرباح.',
      tags: ['فائدة-مركبة', 'استثمار', 'مالية', 'نمو']
    },
    es: {
      name: 'Calculadora de Interés Compuesto',
      shortDesc: 'Calcula el crecimiento de tus inversiones con aportaciones periódicas y visualización gráfica.',
      tags: ['interes', 'inversiones', 'finanzas']
    },
    fr: {
      name: 'Calculateur d\'Intérêts Composés',
      shortDesc: 'Simulez la croissance de vos investissements et votre épargne avec calendrier de versements.',
      tags: ['interets', 'finance', 'investissement']
    },
    de: {
      name: 'Zinseszins- & Wachstumsrechner',
      shortDesc: 'Berechnen Sie den Zuwachs Ihrer Geldanlagen und Ersparnisse mit jährlichen Einzahlungsplänen.',
      tags: ['zinsen', 'finanzen', 'investition']
    }
  },

  'calorie-calculator': {
    ar: {
      name: 'حاسبة السعرات الحرارية والماكروز (TDEE)',
      shortDesc: 'احسب معدل الأيض اليومي وتوزيع المغذيات الكبرى (البروتين والكربوهيدرات والدهون) لتحقيق أهدافك البدنية.',
      tags: ['سعرات', 'ماكروز', 'صحة', 'تغذية']
    },
    es: {
      name: 'Calculadora de Calorías y Macros (TDEE)',
      shortDesc: 'Calcula tu gasto calórico diario y la distribución óptima de macronutrientes.',
      tags: ['calorias', 'macros', 'salud']
    },
    fr: {
      name: 'Calculateur de Calories & Macros (TDEE)',
      shortDesc: 'Calculez vos besoins énergétiques quotidiens et la répartition des macronutriments.',
      tags: ['calories', 'macros', 'sante']
    },
    de: {
      name: 'Kalorien- & Makronährstoffrechner (TDEE)',
      shortDesc: 'Berechnen Sie Ihren täglichen Kalorienbedarf und die optimale Makronährstoffverteilung.',
      tags: ['kalorien', 'ernaehrung', 'fitness']
    }
  },

  'scientific-calculator': {
    ar: {
      name: 'الحاسبة العلمية والهندسية المتطورة',
      shortDesc: 'حاسبة متطورة للدوال المثلثية، اللوغاريتمات، والعمليات الرياضية المتقدمة مع شاشة سجل التعبيرات.',
      tags: ['رياضيات', 'حاسبة-علمية', 'دوال', 'هندسة']
    },
    es: {
      name: 'Calculadora Científica Avanzada',
      shortDesc: 'Calculadora para trigonometría, logaritmos, potencias y operaciones avanzadas con historial.',
      tags: ['matematicas', 'calculadora', 'ciencia']
    },
    fr: {
      name: 'Calculatrice Scientifique Avancée',
      shortDesc: 'Calculatrice mathématique avec trigonométrie, logarithmes et historique d\'expressions.',
      tags: ['maths', 'calculatrice', 'science']
    },
    de: {
      name: 'Wissenschaftlicher Rechner',
      shortDesc: 'Leistungsstarker Rechner für Trigonometrie, Logarithmen und mathematische Funktionen.',
      tags: ['mathe', 'taschenrechner', 'funktionen']
    }
  },

  'real-estate-calculator': {
    ar: {
      name: 'حاسبة العقارات والرهن والتمويل الشاملة',
      shortDesc: 'تحليل شامل لتمويل العقارات، جدول الإهلاك لـ 30 عاماً، العائد الصافي (ROI & Cap Rate)، وتحليل الشراء مقابل الإيجار مع تصدير PDF.',
      tags: ['عقارات', 'رهن-عقاري', 'تمويل', 'استثمار']
    },
    es: {
      name: 'Calculadora Inmobiliaria e Hipotecaria',
      shortDesc: 'Amortización hipotecaria a 30 años, ROI de alquiler, Cap Rate y comparativa comprar vs alquilar con exportación PDF.',
      tags: ['inmuebles', 'hipoteca', 'finanzas']
    },
    fr: {
      name: 'Calculateur Immobilier & Prêt Hypothécaire',
      shortDesc: 'Tableau d\'amortissement sur 30 ans, rentabilité locative, Cap Rate et analyse achat vs location avec export PDF.',
      tags: ['immobilier', 'pret', 'finance']
    },
    de: {
      name: 'Immobilien- & Hypothekenrechner',
      shortDesc: '30-Jahre Tilgungsplan, Mietrendite (ROI & Cap Rate) und Kaufen vs Mieten Analyse mit PDF-Export.',
      tags: ['immobilien', 'kredit', 'finanzen']
    }
  },

  'json-formatter': {
    ar: {
      name: 'منسق ومدقق ملفات JSON',
      shortDesc: 'تنسيق، ضغط، تدقيق، واكتشاف الأخطاء النحوية في نصوص وكائنات JSON بدقة وفورية.',
      tags: ['json', 'تنسيق', 'ضغط', 'تدقيق']
    },
    es: {
      name: 'Formateador y Validador JSON',
      shortDesc: 'Formatea, compacta, valida y analiza JSON con detección de errores de sintaxis en tiempo real.',
      tags: ['json', 'formato', 'codigo']
    },
    fr: {
      name: 'Formateur & Validateur JSON',
      shortDesc: 'Mettez en forme, compressez et validez du JSON avec détection d\'erreurs syntaxiques instantanée.',
      tags: ['json', 'format', 'code']
    },
    de: {
      name: 'JSON Formatierer & Prüfer',
      shortDesc: 'Formatieren, komprimieren und validieren Sie JSON mit Echtzeit-Fehlererkennung.',
      tags: ['json', 'syntax', 'formatierung']
    }
  },

  'base64-encoder-decoder': {
    ar: {
      name: 'مشفر ومحول نصوص Base64',
      shortDesc: 'تشفير وفك تشفير النصوص والبيانات بصيغة Base64 مع دعم كامل للترميز الثنائي ومحارف UTF-8.',
      tags: ['base64', 'تشفير', 'ترميز', 'تحويل']
    },
    es: {
      name: 'Codificador y Decodificador Base64',
      shortDesc: 'Codifica y decodifica cadenas de texto y datos binarios en formato Base64 con soporte UTF-8.',
      tags: ['base64', 'seguridad', 'texto']
    },
    fr: {
      name: 'Encodeur & Décodeur Base64',
      shortDesc: 'Encodez et décodez du texte en Base64 avec support complet de l\'UTF-8 et des données binaires.',
      tags: ['base64', 'securite', 'texte']
    },
    de: {
      name: 'Base64 Kodierer & Dekodierer',
      shortDesc: 'Kodieren und dekodieren Sie Texte und Binärdaten in Base64 mit nativer UTF-8 Unterstützung.',
      tags: ['base64', 'kodierung', 'sicherheit']
    }
  },

  'image-compressor': {
    ar: {
      name: 'ضاغط ومحسن الصور الاحترافي',
      shortDesc: 'تقليل حجم صور JPG و PNG و WebP محلياً داخل المتصفح مع الحفاظ على أعلى درجات الجودة.',
      tags: ['صور', 'ضغط', 'تصميم', 'web']
    },
    es: {
      name: 'Compresor y Optimizador de Imágenes',
      shortDesc: 'Reduce el tamaño de imágenes JPG, PNG y WebP en el navegador sin pérdida visual.',
      tags: ['imagenes', 'compresion', 'optimizacion']
    },
    fr: {
      name: 'Compresseur & Optimiseur d\'Images',
      shortDesc: 'Compressez et optimisez des images JPG, PNG et WebP localement sans perte de qualité.',
      tags: ['images', 'compression', 'web']
    },
    de: {
      name: 'Bildkompressor & Optimierer',
      shortDesc: 'Reduzieren Sie Dateigrößen von JPG, PNG und WebP direkt im Browser ohne Qualitätsverlust.',
      tags: ['bilder', 'komprimierung', 'design']
    }
  },

  'qr-code-generator': {
    ar: {
      name: 'مولد رموز الاستجابة السريعة (QR)',
      shortDesc: 'إنشاء رموز QR مخصصة للروابط والنصوص وشبكات Wi-Fi وتنزيلها بصيغة PNG أو SVG عالية الدقة.',
      tags: ['qr', 'باركود', 'مشاركة', 'روابط']
    },
    es: {
      name: 'Generador de Códigos QR',
      shortDesc: 'Crea códigos QR personalizados para URLs, texto y redes Wi-Fi con descarga en PNG y SVG.',
      tags: ['qr', 'codigo', 'enlaces']
    },
    fr: {
      name: 'Générateur de Codes QR',
      shortDesc: 'Générez des QR codes personnalisés pour liens, texte et Wi-Fi avec export PNG ou SVG.',
      tags: ['qr', 'code', 'partage']
    },
    de: {
      name: 'QR-Code Generator',
      shortDesc: 'Erstellen Sie anpassbare QR-Codes für URLs, Texte und WLAN mit PNG/SVG-Download.',
      tags: ['qr', 'barcode', 'export']
    }
  },

  'markdown-editor': {
    ar: {
      name: 'محرر ومعاين لغة ماركداون (Markdown)',
      shortDesc: 'محرر نصوص تفاعلي يدعم المعاينة الفورية جنبًا إلى جنب، وتصدير مستندات HTML أو Markdown.',
      tags: ['ماركداون', 'محرر', 'كتابة', 'توثيق']
    },
    es: {
      name: 'Editor y Previsualizador Markdown',
      shortDesc: 'Escribe y previsualiza código Markdown en tiempo real con exportación a HTML y Markdown.',
      tags: ['markdown', 'editor', 'redaccion']
    },
    fr: {
      name: 'Éditeur & Prévisualiseur Markdown',
      shortDesc: 'Rédigez et prévisualisez du Markdown en temps réel avec export HTML ou document brut.',
      tags: ['markdown', 'editeur', 'texte']
    },
    de: {
      name: 'Markdown Editor & Vorschau',
      shortDesc: 'Schreiben und visualisieren Sie Markdown in Echtzeit mit sofortigem HTML-Export.',
      tags: ['markdown', 'editor', 'dokumentation']
    }
  },

  'password-generator': {
    ar: {
      name: 'مولد كلمات المرور الآمنة والمشفرة',
      shortDesc: 'توليد كلمات مرور قوية وعشوائية ومقاومة للاختراق مع قياس درجة الأمان ومعدل الإنتروبيا.',
      tags: ['كلمة-مرور', 'أمان', 'توليد', 'حماية']
    },
    es: {
      name: 'Generador de Contraseñas Seguras',
      shortDesc: 'Genera contraseñas criptográficamente seguras con medidor de entropía y opciones avanzadas.',
      tags: ['contrasena', 'seguridad', 'proteccion']
    },
    fr: {
      name: 'Générateur de Mots de Passe Sécurisés',
      shortDesc: 'Générez des mots de passe robustes et aléatoires avec indicateur d\'entropie et de force.',
      tags: ['motdepasse', 'securite', 'cryptographie']
    },
    de: {
      name: 'Sicherer Passwortgenerator',
      shortDesc: 'Erstellen Sie kryptografisch sichere Passwörter mit Entropie- und Stärke-Analyse.',
      tags: ['passwort', 'sicherheit', 'generator']
    }
  },

  'hash-generator': {
    ar: {
      name: 'مولد الهاش والتشفير (SHA-256, MD5)',
      shortDesc: 'حساب بصمات الهاش المشفرة مثل SHA-256 و SHA-512 و MD5 بدقة وسرعة فائقة في الذاكرة.',
      tags: ['هاش', 'تشفير', 'sha256', 'أمان']
    },
    es: {
      name: 'Generador de Hashes Criptográficos',
      shortDesc: 'Calcula firmas SHA-256, SHA-512 y MD5 directamente en memoria para validar integridad.',
      tags: ['hash', 'criptografia', 'seguridad']
    },
    fr: {
      name: 'Générateur de Hashs Cryptographiques',
      shortDesc: 'Calculez des empreintes SHA-256, SHA-512 et MD5 pour vérifier l\'intégrité de vos données.',
      tags: ['hash', 'cryptographie', 'securite']
    },
    de: {
      name: 'Kryptografischer Hash-Generator',
      shortDesc: 'Berechnen Sie SHA-256, SHA-512 und MD5 Hashes zur Integritätsprüfung im Speicher.',
      tags: ['hash', 'sha256', 'kryptografie']
    }
  },

  'url-shortener': {
    ar: {
      name: 'مختصر ومنظف الروابط ومسارات التتبع',
      shortDesc: 'إزالة بارامترات التتبع الإعلانية (UTM) وتنظيف الروابط الطويلة لجعلها آمنة وأنيقة للمشاركة.',
      tags: ['روابط', 'تنظيف', 'خصوصية', 'مشاركة']
    },
    es: {
      name: 'Limpiador y Acortador de Enlaces',
      shortDesc: 'Elimina parámetros de seguimiento (UTM/fbclid) y genera enlaces limpios y privados.',
      tags: ['enlaces', 'privacidad', 'utilidad']
    },
    fr: {
      name: 'Nettoyeur & Raccourcisseur d\'URL',
      shortDesc: 'Supprimez les trackers publicitaires (UTM) et obtenez des liens propres et respectueux.',
      tags: ['url', 'confidentialite', 'liens']
    },
    de: {
      name: 'URL-Bereiniger & Kürzer',
      shortDesc: 'Entfernen Sie Tracking-Parameter (UTM) für saubere, datenschutzfreundliche Weblinks.',
      tags: ['url', 'datenschutz', 'links']
    }
  },

  'color-converter': {
    ar: {
      name: 'محول صيغ وأنظمة الألوان المتعددة',
      shortDesc: 'التحويل الفوري والسلس بين HEX و RGB و HSL و CMYK مع معاينة الألوان ونسخ الأكواد بنقرة واحدة.',
      tags: ['ألوان', 'تصميم', 'hex', 'rgb']
    },
    es: {
      name: 'Conversor de Formatos de Color',
      shortDesc: 'Convierte valores entre HEX, RGB, HSL y CMYK con paleta visual y copia rápida.',
      tags: ['colores', 'diseno', 'hex', 'rgb']
    },
    fr: {
      name: 'Convertisseur de Formats de Couleur',
      shortDesc: 'Convertissez instantanément entre HEX, RGB, HSL et CMYK avec aperçu visuel.',
      tags: ['couleurs', 'design', 'hex', 'rgb']
    },
    de: {
      name: 'Farbcode-Konverter',
      shortDesc: 'Konvertieren Sie nahtlos zwischen HEX, RGB, HSL und CMYK mit visueller Vorschau.',
      tags: ['farben', 'design', 'hex', 'rgb']
    }
  },

  'regex-tester': {
    ar: {
      name: 'مختبر التعابير النمطية (Regex Tester)',
      shortDesc: 'اختبار وتدقيق التعابير النمطية (Regular Expressions) مع تمييز التطابقات وتفسير الأنماط فورياً.',
      tags: ['regex', 'تطابق', 'برمجة', 'نصوص']
    },
    es: {
      name: 'Probador de Expresiones Regulares (Regex)',
      shortDesc: 'Prueba y depura expresiones regulares con resaltado de coincidencias y explicaciones.',
      tags: ['regex', 'desarrollo', 'texto']
    },
    fr: {
      name: 'Testeur d\'Expressions Régulières (Regex)',
      shortDesc: 'Testez et validez vos expressions régulières avec surlignage des correspondances.',
      tags: ['regex', 'developpement', 'texte']
    },
    de: {
      name: 'Reguläre Ausdrücke (Regex) Tester',
      shortDesc: 'Testen und validieren Sie Regex-Muster mit Live-Treffermarkierung und Gruppenerkennung.',
      tags: ['regex', 'entwicklung', 'text']
    }
  },

  'diff-checker': {
    ar: {
      name: 'مقارن الفروق بين النصوص والأكواد (Diff)',
      shortDesc: 'مقارنة نصين أو ملفين سطراً بسطر وتمييز الإضافات والحذف والتعديلات بدقة بصرية واضحة.',
      tags: ['مقارنة', 'فروق', 'أكواد', 'نصوص']
    },
    es: {
      name: 'Comparador de Textos y Código (Diff)',
      shortDesc: 'Compara dos textos línea por línea resaltando diferencias, adiciones y supresiones.',
      tags: ['comparador', 'diff', 'codigo']
    },
    fr: {
      name: 'Comparateur de Texte & Code (Diff)',
      shortDesc: 'Comparez deux textes ligne par ligne avec mise en évidence des différences.',
      tags: ['comparateur', 'diff', 'code']
    },
    de: {
      name: 'Text- & Code-Differenzprüfer (Diff)',
      shortDesc: 'Vergleichen Sie zwei Texte Zeile für Zeile mit visueller Hervorhebung von Änderungen.',
      tags: ['diff', 'vergleich', 'code']
    }
  },

  'unit-converter': {
    ar: {
      name: 'محول الوحدات والقياسات الشامل',
      shortDesc: 'تحويل سريع بين وحدات الطول، الوزن، المساحة، درجة الحرارة، السرعة، الحجم، وحجم البيانات.',
      tags: ['وحدات', 'تحويل', 'قياس', 'حساب']
    },
    es: {
      name: 'Conversor Universal de Unidades',
      shortDesc: 'Convierte unidades de longitud, peso, temperatura, datos, volumen y velocidad al instante.',
      tags: ['unidades', 'conversion', 'calculo']
    },
    fr: {
      name: 'Convertisseur d\'Unités Universel',
      shortDesc: 'Convertissez des unités de longueur, poids, température, volume et stockage numérique.',
      tags: ['unites', 'conversion', 'mesures']
    },
    de: {
      name: 'Universeller Einheiten-Umrechner',
      shortDesc: 'Rechnen Sie Einheiten für Länge, Gewicht, Temperatur, Datenmengen und Fläche um.',
      tags: ['einheiten', 'umrechner', 'masse']
    }
  },

  'timestamp-converter': {
    ar: {
      name: 'محول التوقيت الزمني (Unix Timestamp)',
      shortDesc: 'التحويل بين التوقيت الموحد للأنظمة (Epoch/Unix) والتواريخ البشرية مع دعم كافة المناطق الزمنية.',
      tags: ['وقت', 'تاريخ', 'unix', 'برمجة']
    },
    es: {
      name: 'Conversor de Marcas de Tiempo Unix',
      shortDesc: 'Convierte marcas de tiempo Unix Epoch a fechas legibles en todas las zonas horarias.',
      tags: ['tiempo', 'timestamp', 'unix']
    },
    fr: {
      name: 'Convertisseur de Timestamp Unix Epoch',
      shortDesc: 'Convertissez des timestamps Unix en dates lisibles selon différents fuseaux horaires.',
      tags: ['temps', 'timestamp', 'date']
    },
    de: {
      name: 'Unix-Timestamp Zeitumrechner',
      shortDesc: 'Konvertieren Sie Unix-Timestamps in lesbare Datumsformate und Zeitzonen.',
      tags: ['zeit', 'timestamp', 'datum']
    }
  },

  'html-minifier': {
    ar: {
      name: 'ضاغط ومحسن أكواد HTML',
      shortDesc: 'تقليص حجم كود HTML وإزالة المسافات الزائدة والتعليقات لتسريع تحميل صفحات الويب.',
      tags: ['html', 'ضغط', 'ويب', 'تحسين']
    },
    es: {
      name: 'Minificador y Optimizador HTML',
      shortDesc: 'Comprime código HTML eliminando espacios y comentarios para mayor velocidad web.',
      tags: ['html', 'minificar', 'web']
    },
    fr: {
      name: 'Minificateur & Optimiseur HTML',
      shortDesc: 'Compressez votre code HTML en éliminant les espaces et commentaires superflus.',
      tags: ['html', 'minification', 'web']
    },
    de: {
      name: 'HTML Minifizierer & Komprimierer',
      shortDesc: 'Reduzieren Sie die Größe Ihres HTML-Codes für schnellere Web-Ladezeiten.',
      tags: ['html', 'minifizierung', 'web']
    }
  },

  'uuid-generator': {
    ar: {
      name: 'مولد المعرفات الفريدة (UUID / GUID)',
      shortDesc: 'توليد معرفات فريدة عالمياً (UUID v4) فرادى أو دفعات متسلسلة للمشاريع والبرمجيات.',
      tags: ['uuid', 'معرفات', 'برمجة', 'توليد']
    },
    es: {
      name: 'Generador de UUID / GUID (v4)',
      shortDesc: 'Genera identificadores únicos universales individuales o por lotes.',
      tags: ['uuid', 'guid', 'identificador']
    },
    fr: {
      name: 'Générateur de UUID / GUID (v4)',
      shortDesc: 'Générez des identifiants uniques universels aléatoires à l\'unité ou par lots.',
      tags: ['uuid', 'guid', 'identifiant']
    },
    de: {
      name: 'UUID / GUID Generator (v4)',
      shortDesc: 'Erstellen Sie kryptografisch eindeutige Identifikatoren einzeln oder im Stapel.',
      tags: ['uuid', 'guid', 'datenbank']
    }
  },

  'jwt-decoder': {
    ar: {
      name: 'محلل وفك تشفير رموز JWT',
      shortDesc: 'فك تشفير رأس وحمولة رموز JSON Web Tokens وتدقيق وقت الصلاحية وتوقيع الأمان دون إرسالها لأي خادم.',
      tags: ['jwt', 'أمان', 'توكن', 'تشفير']
    },
    es: {
      name: 'Decodificador y Analizador JWT',
      shortDesc: 'Decodifica encabezados y cargas útiles de JSON Web Tokens con validación de expiración.',
      tags: ['jwt', 'seguridad', 'token']
    },
    fr: {
      name: 'Décodeur & Inspecteur JWT',
      shortDesc: 'Décodez et inspectez le payload et l\'en-tête de tokens JWT en toute confidentialité.',
      tags: ['jwt', 'securite', 'token']
    },
    de: {
      name: 'JWT Decoder & Inspektor',
      shortDesc: 'Dekodieren und analysieren Sie JSON Web Tokens mit Ablaufzeit- und Signaturprüfung.',
      tags: ['jwt', 'token', 'sicherheit']
    }
  },

  'case-converter': {
    ar: {
      name: 'محول صيغ وحالات الأحرف والنصوص',
      shortDesc: 'تحويل النصوص بين camelCase و kebab-case و snake_case و PascalCase و UPPERCASE بنقرة واحدة.',
      tags: ['نصوص', 'تحويل', 'حالات', 'برمجة']
    },
    es: {
      name: 'Conversor de Mayúsculas y Nomenclaturas',
      shortDesc: 'Transforma texto a camelCase, snake_case, kebab-case, PascalCase y mayúsculas/minúsculas.',
      tags: ['texto', 'conversion', 'codigo']
    },
    fr: {
      name: 'Convertisseur de Casse & Formats de Texte',
      shortDesc: 'Convertissez du texte en camelCase, snake_case, kebab-case, majuscules et minuscules.',
      tags: ['texte', 'casse', 'developpement']
    },
    de: {
      name: 'Schreibweisen- & Text-Konverter',
      shortDesc: 'Wandeln Sie Texte in camelCase, snake_case, kebab-case und Groß-/Kleinschreibung um.',
      tags: ['text', 'schreibweise', 'programmierung']
    }
  },

  'word-counter': {
    ar: {
      name: 'عداد الكلمات والأحرف وإحصاء النصوص',
      shortDesc: 'إحصاء فوري لعدد الكلمات، الحروف، الفقرات، وتقدير وقت القراءة والتحدث بدقة فائقة.',
      tags: ['كلمات', 'إحصاء', 'كتابة', 'نصوص']
    },
    es: {
      name: 'Contador de Palabras y Caracteres',
      shortDesc: 'Calcula el número de palabras, caracteres, oraciones y tiempo estimado de lectura.',
      tags: ['palabras', 'conteo', 'redaccion']
    },
    fr: {
      name: 'Compteur de Mots et Caractères',
      shortDesc: 'Comptez instantanément les mots, caractères, paragraphes et temps de lecture estimé.',
      tags: ['mots', 'redaction', 'statistiques']
    },
    de: {
      name: 'Wort- & Zeichenzähler',
      shortDesc: 'Zählen Sie Wörter, Zeichen, Sätze und ermitteln Sie geschätzte Lesezeiten.',
      tags: ['woerter', 'zeichen', 'text']
    }
  },

  'svg-to-png-converter': {
    ar: {
      name: 'محول رسوميات SVG إلى صور PNG',
      shortDesc: 'تحويل ملفات SVG المتجهة إلى صور PNG عالية الدقة مع التحكم الكامل في المقاسات والأبعاد.',
      tags: ['svg', 'png', 'تصميم', 'تحويل']
    },
    es: {
      name: 'Conversor de SVG a PNG',
      shortDesc: 'Convierte gráficos vectoriales SVG a imágenes PNG en alta resolución con escala personalizable.',
      tags: ['svg', 'png', 'diseno']
    },
    fr: {
      name: 'Convertisseur SVG vers PNG',
      shortDesc: 'Convertissez des fichiers vectoriels SVG en images PNG haute résolution personnalisables.',
      tags: ['svg', 'png', 'design']
    },
    de: {
      name: 'SVG zu PNG Konverter',
      shortDesc: 'Wandeln Sie Vektorgrafiken (SVG) in hochauflösende PNG-Bilder mit flexibler Skalierung um.',
      tags: ['svg', 'png', 'grafik']
    }
  },

  'box-shadow-generator': {
    ar: {
      name: 'مولد تأثيرات الظلال في CSS (Box Shadow)',
      shortDesc: 'تصميم ظلال CSS ثلاثية الأبعاد وناعمة مع معاينة بصرية حية وتوليد كود CSS فوري.',
      tags: ['css', 'ظلال', 'تصميم', 'واجهات']
    },
    es: {
      name: 'Generador de Sombras CSS (Box Shadow)',
      shortDesc: 'Diseña sombras CSS multicapa con previsualización interactiva y copia de código.',
      tags: ['css', 'sombras', 'diseno']
    },
    fr: {
      name: 'Générateur d\'Ombres CSS (Box Shadow)',
      shortDesc: 'Créez des ombres portées CSS fluides et multicouches avec aperçu en direct.',
      tags: ['css', 'ombres', 'design']
    },
    de: {
      name: 'CSS Schatten-Generator (Box-Shadow)',
      shortDesc: 'Entwerfen Sie moderne, mehrlagige CSS-Schatten mit interaktiver Live-Vorschau.',
      tags: ['css', 'schatten', 'design']
    }
  },

  'url-encoder-decoder': {
    ar: {
      name: 'مشفر وفك تشفير الروابط (URL Encoding)',
      shortDesc: 'تشفير وفك ترميز الروابط والرموز الخاصة بما يتوافق مع معايير الويب العالمية.',
      tags: ['url', 'تشفير', 'ترميز', 'ويب']
    },
    es: {
      name: 'Codificador y Decodificador de URL',
      shortDesc: 'Codifica y decodifica parámetros de URL y caracteres especiales según estándares web.',
      tags: ['url', 'codificacion', 'web']
    },
    fr: {
      name: 'Encodeur & Décodeur d\'URL',
      shortDesc: 'Encodez et décodez les chaînes d\'URL et caractères spéciaux conformes aux RFCs.',
      tags: ['url', 'encodage', 'web']
    },
    de: {
      name: 'URL Kodierer & Dekodierer',
      shortDesc: 'Kodieren und dekodieren Sie URL-Parameter und Sonderzeichen standardkonform.',
      tags: ['url', 'kodierung', 'web']
    }
  },

  'css-gradient-generator': {
    ar: {
      name: 'مولد تدرجات الألوان في CSS (Gradients)',
      shortDesc: 'تصميم تدرجات لونية خطية وشعاعية رائعة مع استخراج كود CSS الجاهز للمواقع والتطبيقات.',
      tags: ['css', 'تدرج', 'ألوان', 'تصميم']
    },
    es: {
      name: 'Generador de Degradados CSS',
      shortDesc: 'Crea degradados lineales y radiales con múltiples paradas de color y exporta código CSS.',
      tags: ['css', 'degradados', 'colores']
    },
    fr: {
      name: 'Générateur de Dégradés CSS',
      shortDesc: 'Créez de superbes dégradés linéaires ou radiaux et générez le code CSS prêt à l\'emploi.',
      tags: ['css', 'degrades', 'design']
    },
    de: {
      name: 'CSS Farbverlauf-Generator',
      shortDesc: 'Erstellen Sie lineare und radiale CSS-Farbverläufe mit direktem Code-Export.',
      tags: ['css', 'farbverlauf', 'design']
    }
  },

  'lorem-ipsum-generator': {
    ar: {
      name: 'مولد النصوص التجريبية (Lorem Ipsum)',
      shortDesc: 'توليد نصوص تجريبية باللغتين العربية واللاتينية بعدد فقرات وكلمات مخصص لتصاميمك.',
      tags: ['نصوص', 'لوريم', 'تجريبي', 'تصميم']
    },
    es: {
      name: 'Generador de Texto Falso (Lorem Ipsum)',
      shortDesc: 'Genera párrafos, oraciones y listas de texto de relleno para maquetas y prototipos.',
      tags: ['lorem', 'texto', 'maquetacion']
    },
    fr: {
      name: 'Générateur de Faux Texte (Lorem Ipsum)',
      shortDesc: 'Générez des paragraphes et listes de texte factice pour vos maquettes de design.',
      tags: ['lorem', 'texte', 'prototype']
    },
    de: {
      name: 'Blindtext-Generator (Lorem Ipsum)',
      shortDesc: 'Erstellen Sie Platzhaltertexte, Absätze und Sätze für Layouts und Prototypen.',
      tags: ['blindtext', 'lorem', 'design']
    }
  },

  'glassmorphism-generator': {
    ar: {
      name: 'مولد تأثيرات الزجاج المصنفر (Glassmorphism)',
      shortDesc: 'تصميم واجهات زجاجية عصرية بضبابية خلفية ناعمة وشفافية فائقة واستخراج كود CSS.',
      tags: ['css', 'زجاج', 'واجهات', 'تصميم']
    },
    es: {
      name: 'Generador de Efecto Glassmorphism',
      shortDesc: 'Crea elementos con efecto de vidrio esmerilado con desenfoque de fondo y bordes sutiles.',
      tags: ['glassmorphism', 'css', 'diseno']
    },
    fr: {
      name: 'Générateur d\'Effet Verre Dépoli (Glassmorphism)',
      shortDesc: 'Concevez des interfaces modernes en verre dépoli avec flou d\'arrière-plan en CSS.',
      tags: ['glassmorphism', 'css', 'design']
    },
    de: {
      name: 'Glassmorphismus CSS Generator',
      shortDesc: 'Gestalten Sie moderne Milchglas-Effekte mit Hintergrund-Blur und CSS-Export.',
      tags: ['glassmorphism', 'css', 'design']
    }
  },

  'html-entity-converter': {
    ar: {
      name: 'محول ومترجم كيانات ورموز HTML',
      shortDesc: 'تحويل الرموز الخاصة والأحرف المحجوزة إلى كيانات HTML والعكس صحيح لمنع أخطاء العرض.',
      tags: ['html', 'كيانات', 'رموز', 'ويب']
    },
    es: {
      name: 'Conversor de Entidades HTML',
      shortDesc: 'Codifica y decodifica caracteres especiales a entidades HTML de forma segura.',
      tags: ['html', 'entidades', 'codigo']
    },
    fr: {
      name: 'Convertisseur d\'Entités HTML',
      shortDesc: 'Encodez et décodez les caractères spéciaux en entités HTML nommées ou numériques.',
      tags: ['html', 'entites', 'web']
    },
    de: {
      name: 'HTML-Entities Konverter',
      shortDesc: 'Wandeln Sie Sonderzeichen und Symbole in HTML-Entitäten und zurück um.',
      tags: ['html', 'entities', 'web']
    }
  },

  'css-flexbox-generator': {
    ar: {
      name: 'مولد ومصمم تخطيطات CSS Flexbox',
      shortDesc: 'بناء وتجربة تخطيطات Flexbox بصرية مع التحكم في المحاذاة والاتجاه واستخراج الكود فورياً.',
      tags: ['flexbox', 'css', 'تخطيط', 'واجهات']
    },
    es: {
      name: 'Generador Visual de CSS Flexbox',
      shortDesc: 'Configura propiedades de Flexbox interactivamente y obtén el código CSS listo para usar.',
      tags: ['flexbox', 'css', 'layout']
    },
    fr: {
      name: 'Générateur Visuel CSS Flexbox',
      shortDesc: 'Expérimentez et générez des mises en page Flexbox avec aperçu visuel instantané.',
      tags: ['flexbox', 'css', 'mise-en-page']
    },
    de: {
      name: 'CSS Flexbox Layout Generator',
      shortDesc: 'Erstellen und testen Sie flexible Layouts mit visuellen Steuerelementen und CSS-Export.',
      tags: ['flexbox', 'css', 'layout']
    }
  },

  'json-to-csv': {
    ar: {
      name: 'محول جداول JSON إلى CSV و Excel',
      shortDesc: 'تحويل مصفوفات وبيانات JSON إلى ملفات جداول CSV والعكس مع معاينة وتنزيل مباشر.',
      tags: ['json', 'csv', 'بيانات', 'تحويل']
    },
    es: {
      name: 'Conversor de JSON a CSV y Viceversa',
      shortDesc: 'Convierte colecciones JSON a formato de hoja de cálculo CSV con vista previa y descarga.',
      tags: ['json', 'csv', 'datos']
    },
    fr: {
      name: 'Convertisseur JSON vers CSV & Tableur',
      shortDesc: 'Transformez des tableaux JSON en fichiers CSV tabulaires avec téléchargement direct.',
      tags: ['json', 'csv', 'donnees']
    },
    de: {
      name: 'JSON zu CSV & Excel Konverter',
      shortDesc: 'Konvertieren Sie JSON-Datensätze in tabellarische CSV-Dateien und umgekehrt.',
      tags: ['json', 'csv', 'daten']
    }
  },

  'cron-parser': {
    ar: {
      name: 'محلل ومفسر تعابير Cron المجدولة',
      shortDesc: 'ترجمة تعابير Cron إلى مواعيد مفهومة بشرياً مع عرض جدول أوقات التشغيل القادمة بدقة.',
      tags: ['cron', 'جدولة', 'سيرفر', 'مهام']
    },
    es: {
      name: 'Analizador e Intérprete de Cron',
      shortDesc: 'Traduce expresiones cron a lenguaje natural y muestra las próximas fechas de ejecución.',
      tags: ['cron', 'automatizacion', 'servidor']
    },
    fr: {
      name: 'Analyseur d\'Expressions Cron',
      shortDesc: 'Traduisez les expressions cron en texte clair et visualisez les prochaines exécutions.',
      tags: ['cron', 'planification', 'serveur']
    },
    de: {
      name: 'Cron-Syntax Parser & Zeitplaner',
      shortDesc: 'Übersetzen Sie Cron-Ausdrücke in verständliche Sprache und berechnen Sie Ausführungszeiten.',
      tags: ['cron', 'zeitplan', 'server']
    }
  },

  'text-duplicate-remover': {
    ar: {
      name: 'منظف ومزيل التكرار من النصوص والأسطر',
      shortDesc: 'حذف الأسطر والكلمات المكررة وترتيب النصوص هجائياً أو عكسياً بنقرة زر واحدة.',
      tags: ['نصوص', 'تنظيف', 'تكرار', 'ترتيب']
    },
    es: {
      name: 'Eliminador de Líneas y Textos Duplicados',
      shortDesc: 'Limpia listas de texto eliminando duplicados y ordenando alfabéticamente.',
      tags: ['texto', 'duplicados', 'limpieza']
    },
    fr: {
      name: 'Suppresseur de Lignes et Textes Doublons',
      shortDesc: 'Nettoyez vos listes en éliminant les doublons et en triant le contenu alphabétiquement.',
      tags: ['doublons', 'texte', 'tri']
    },
    de: {
      name: 'Duplikate-Entferner für Textzeilen',
      shortDesc: 'Entfernen Sie doppelte Zeilen aus Listen und sortieren Sie Textinhalte automatisch.',
      tags: ['duplikate', 'text', 'bereinigung']
    }
  },

  'clip-path-generator': {
    ar: {
      name: 'مولد أشكال وقصاصات CSS Clip-Path',
      shortDesc: 'تصميم أشكال وقصاصات هندسية ومضلعات تفاعلية واستخراج كود clip-path في CSS.',
      tags: ['css', 'أشكال', 'clip-path', 'تصميم']
    },
    es: {
      name: 'Generador de Formas CSS (Clip-Path)',
      shortDesc: 'Diseña máscaras y formas poligonales complejas con editor visual y código CSS.',
      tags: ['css', 'formas', 'clippath']
    },
    fr: {
      name: 'Générateur de Découpes CSS (Clip-Path)',
      shortDesc: 'Créez des masques de découpe polygonaux personnalisés et récupérez le code CSS.',
      tags: ['css', 'clippath', 'design']
    },
    de: {
      name: 'CSS Clip-Path Formen-Generator',
      shortDesc: 'Entwerfen Sie benutzerdefinierte geometrische Masken mit CSS clip-path.',
      tags: ['css', 'clippath', 'grafik']
    }
  },

  'color-palette-generator': {
    ar: {
      name: 'مولد لوحات وتناسق الألوان الاحترافي',
      shortDesc: 'توليد باليتات ألوان متناسقة ومتكاملة لتصاميمك ومواقعك مع تصدير الأكواد وقيم HEX.',
      tags: ['ألوان', 'باليت', 'تناسق', 'تصميم']
    },
    es: {
      name: 'Generador de Paletas de Color Armónicas',
      shortDesc: 'Crea paletas de colores basadas en teoría del color con exportación de valores HEX y RGB.',
      tags: ['paleta', 'colores', 'diseno']
    },
    fr: {
      name: 'Générateur de Palettes de Couleurs',
      shortDesc: 'Générez des palettes harmonieuses selon la théorie des couleurs pour vos projets.',
      tags: ['palettes', 'couleurs', 'design']
    },
    de: {
      name: 'Farbpaletten- & Harmonie-Generator',
      shortDesc: 'Erstellen Sie harmonische Farbpaletten nach Farblehre mit HEX- und RGB-Export.',
      tags: ['farbpalette', 'farben', 'design']
    }
  },

  'sql-formatter': {
    ar: {
      name: 'منسق ومجمل استعلامات قواعد البيانات SQL',
      shortDesc: 'تنسيق وترتيب استعلامات SQL المعقدة وتلوين الكلمات المفتاحية لتسهيل القراءة والتدقيق.',
      tags: ['sql', 'قواعد-بيانات', 'تنسيق', 'استعلام']
    },
    es: {
      name: 'Formateador y Embellecedor de SQL',
      shortDesc: 'Formatea consultas SQL complejas con sangrías y mayúsculas en palabras clave.',
      tags: ['sql', 'base-de-datos', 'formato']
    },
    fr: {
      name: 'Formateur & Enjoliveur de Requêtes SQL',
      shortDesc: 'Mettez en forme vos requêtes SQL complexes avec indentation et coloration propre.',
      tags: ['sql', 'base-de-donnees', 'requetes']
    },
    de: {
      name: 'SQL Abfrage-Formatierer & Beautifier',
      shortDesc: 'Formatieren Sie komplexe SQL-Statements mit Einrückungen und Großschreibung von Keywords.',
      tags: ['sql', 'datenbank', 'abfragen']
    }
  },

  'meta-tags-generator': {
    ar: {
      name: 'مولد وسوم الميتا والسيو (Meta Tags & OpenGraph)',
      shortDesc: 'توليد وسوم الميتا لتحسين محركات البحث SEO وبطاقات المشاركة في تويتر وفيسبوك بدقة.',
      tags: ['سيو', 'ميتا', 'opengraph', 'مواقع']
    },
    es: {
      name: 'Generador de Meta Tags y Open Graph',
      shortDesc: 'Crea etiquetas meta para SEO y tarjetas de vista previa para redes sociales.',
      tags: ['seo', 'metatags', 'opengraph']
    },
    fr: {
      name: 'Générateur de Balises Meta & Open Graph',
      shortDesc: 'Générez des balises meta pour le SEO et les cartes de partage sur les réseaux sociaux.',
      tags: ['seo', 'meta', 'opengraph']
    },
    de: {
      name: 'Meta-Tags & OpenGraph Generator',
      shortDesc: 'Erstellen Sie suchmaschinenoptimierte Meta-Tags und Social-Media-Vorschaukarten.',
      tags: ['seo', 'metatags', 'web']
    }
  },

  'text-ascii-styler': {
    ar: {
      name: 'منسق وزخرفة النصوص (ASCII & Unicode)',
      shortDesc: 'تحويل النصوص العادية إلى خطوط وزخارف يونيكود مميزة لوسائل التواصل والرسائل.',
      tags: ['زخرفة', 'نصوص', 'يونيكود', 'ascii']
    },
    es: {
      name: 'Estilizador de Texto y Fuentes Unicode',
      shortDesc: 'Transforma texto normal en estilos elegantes y fuentes Unicode para redes sociales.',
      tags: ['fuentes', 'unicode', 'estilo']
    },
    fr: {
      name: 'Styliseur de Texte & Polices Unicode',
      shortDesc: 'Transformez du texte brut en styles typographiques Unicode pour vos réseaux.',
      tags: ['style', 'unicode', 'texte']
    },
    de: {
      name: 'Text-Styler & Unicode-Schriftarten',
      shortDesc: 'Wandeln Sie normalen Text in stylische Unicode-Schriften für Social Media um.',
      tags: ['schriftarten', 'unicode', 'styling']
    }
  },

  'css-clamp-calculator': {
    ar: {
      name: 'حاسبة التجاوب المرن للخطوط والأبعاد (CSS clamp)',
      shortDesc: 'حساب دالة clamp() في CSS للحصول على خطوط وأبعاد تتجاوب بسلاسة مع كافة أحجام الشاشات.',
      tags: ['css', 'clamp', 'تجاوب', 'خطوط']
    },
    es: {
      name: 'Calculadora de Tipografía Fluida (CSS clamp)',
      shortDesc: 'Calcula fórmulas clamp() para tipografía y espaciados fluidos en diseño responsivo.',
      tags: ['css', 'clamp', 'responsivo']
    },
    fr: {
      name: 'Calculateur de Typographie Fluide (CSS clamp)',
      shortDesc: 'Calculez des fonctions clamp() pour une typographie et des marges adaptatives.',
      tags: ['css', 'clamp', 'responsive']
    },
    de: {
      name: 'CSS Clamp Rechner für fluide Typografie',
      shortDesc: 'Berechnen Sie CSS clamp() Funktionen für fließende Schriftgrößen und Abstände.',
      tags: ['css', 'clamp', 'responsive']
    }
  },

  'json-schema-generator': {
    ar: {
      name: 'مولد مخططات وهياكل JSON Schema',
      shortDesc: 'استنتاج وتوليد مخطط JSON Schema للتحقق من صحة بنية البيانات تلقائياً من أي نص JSON.',
      tags: ['json', 'schema', 'بيانات', 'تدقيق']
    },
    es: {
      name: 'Generador de Esquemas JSON (JSON Schema)',
      shortDesc: 'Infere y genera esquemas JSON Schema de validación a partir de ejemplos JSON.',
      tags: ['json', 'schema', 'validacion']
    },
    fr: {
      name: 'Générateur de Schémas JSON (JSON Schema)',
      shortDesc: 'Générez des schémas de validation JSON Schema automatiquement à partir d\'échantillons.',
      tags: ['json', 'schema', 'donnees']
    },
    de: {
      name: 'JSON Schema Generator',
      shortDesc: 'Erstellen Sie automatisch JSON Schema Validierungen aus Beispieldaten.',
      tags: ['json', 'schema', 'validierung']
    }
  },

  'border-radius-generator': {
    ar: {
      name: 'مولد انحناء الحواف في CSS (Border Radius)',
      shortDesc: 'تصميم حواف وانحناءات مخصصة ثنائية وثمانية المحاور مع استخراج كود CSS فورياً.',
      tags: ['css', 'انحناء', 'تصميم', 'واجهات']
    },
    es: {
      name: 'Generador de Bordes Redondeados (Border Radius)',
      shortDesc: 'Crea esquinas redondeadas orgánicas con control de 8 valores y exporta código CSS.',
      tags: ['css', 'bordes', 'diseno']
    },
    fr: {
      name: 'Générateur d\'Arrondis de Bordure CSS',
      shortDesc: 'Créez des formes organiques avec contrôle à 8 valeurs du border-radius.',
      tags: ['css', 'bordures', 'design']
    },
    de: {
      name: 'CSS Border-Radius Generator',
      shortDesc: 'Gestalten Sie organische abgerundete Ecken mit 8-Werte-Steuerung und CSS-Export.',
      tags: ['css', 'ecken', 'design']
    }
  },

  'js-minifier': {
    ar: {
      name: 'ضاغط ومحسن أكواد جافاسكريبت (JavaScript)',
      shortDesc: 'ضغط وتصغير حجم ملفات JavaScript وإزالة الفراغات لتسريع أداء التطبيقات.',
      tags: ['javascript', 'ضغط', 'كود', 'تحسين']
    },
    es: {
      name: 'Minificador de Código JavaScript',
      shortDesc: 'Comprime y optimiza scripts JavaScript eliminando espacios y comentarios.',
      tags: ['javascript', 'minificar', 'codigo']
    },
    fr: {
      name: 'Minificateur de Code JavaScript',
      shortDesc: 'Compressez vos scripts JavaScript pour réduire les temps de chargement.',
      tags: ['javascript', 'minification', 'performance']
    },
    de: {
      name: 'JavaScript Code Minifizierer',
      shortDesc: 'Komprimieren Sie JS-Code durch Entfernen von Leerzeichen und Kommentaren.',
      tags: ['javascript', 'minifizierung', 'performance']
    }
  },

  'bcrypt-generator': {
    ar: {
      name: 'مولد ومطابق تشفير كلمات المرور (Bcrypt)',
      shortDesc: 'توليد هاش Bcrypt آمن لكلمات المرور مع مطابقة وتدقيق الهاشات بخصوصية كاملة.',
      tags: ['bcrypt', 'تشفير', 'أمان', 'كلمات-مرور']
    },
    es: {
      name: 'Generador y Verificador de Bcrypt',
      shortDesc: 'Genera hashes bcrypt seguros para contraseñas y verifica coincidencias en memoria.',
      tags: ['bcrypt', 'seguridad', 'hash']
    },
    fr: {
      name: 'Générateur & Vérificateur de Hash Bcrypt',
      shortDesc: 'Générez des hashs bcrypt robustes pour mots de passe et testez leur correspondance.',
      tags: ['bcrypt', 'securite', 'cryptographie']
    },
    de: {
      name: 'Bcrypt Hash-Generator & Prüfer',
      shortDesc: 'Erstellen Sie sichere Bcrypt-Hashes für Passwörter und verifizieren Sie Übereinstimmungen.',
      tags: ['bcrypt', 'sicherheit', 'passwort']
    }
  },

  'favicon-generator': {
    ar: {
      name: 'صانع أيقونات المواقع المتعددة (Favicon)',
      shortDesc: 'إنشاء أيقونات مواقع احترافية بجميع المقاسات ورموز التعبير مع حزمة ملفات الويب الجاهزة.',
      tags: ['favicon', 'أيقونات', 'مواقع', 'تصميم']
    },
    es: {
      name: 'Generador de Favicons y Paquetes de Iconos',
      shortDesc: 'Crea favicons a partir de emojis o texto en múltiples tamaños para la web.',
      tags: ['favicon', 'iconos', 'web']
    },
    fr: {
      name: 'Générateur de Favicons & Packs d\'Icônes',
      shortDesc: 'Créez des favicons personnalisés à partir d\'emojis ou de texte pour votre site web.',
      tags: ['favicon', 'icones', 'design']
    },
    de: {
      name: 'Favicon- & Website-Icon-Generator',
      shortDesc: 'Erstellen Sie Favicons aus Text oder Emojis in mehreren Web-Größen.',
      tags: ['favicon', 'icons', 'webdesign']
    }
  },

  'gpa-calculator': {
    ar: {
      name: 'حاسبة المعدل التراكمي الجامعي والمدرسي (GPA)',
      shortDesc: 'حساب المعدل الفصلي والتراكمي بنظام 4.0 أو 5.0 مع دعم الساعات المعتمدة وتقديرات المواد.',
      tags: ['معدل', 'gpa', 'جامعة', 'دراسة']
    },
    es: {
      name: 'Calculadora de Promedio Académico (GPA)',
      shortDesc: 'Calcula tu promedio semestral y acumulado en escalas 4.0 y 5.0 con créditos por materia.',
      tags: ['gpa', 'promedio', 'estudiantes']
    },
    fr: {
      name: 'Calculateur de Moyenne Académique (GPA)',
      shortDesc: 'Calculez votre moyenne générale semestrielle et cumulative avec coefficients.',
      tags: ['gpa', 'moyenne', 'etudes']
    },
    de: {
      name: 'Notendurchschnitt-Rechner (GPA)',
      shortDesc: 'Berechnen Sie Ihren Notendurchschnitt für Semester und Gesamtstudium mit ECTS-Gewichtung.',
      tags: ['noten', 'gpa', 'studium']
    }
  },

  'citation-generator': {
    ar: {
      name: 'منشئ المراجع والاقتباسات الأكاديمية (APA, MLA)',
      shortDesc: 'توليد توثيق ومراجع الأبحاث وفق صيغ APA و MLA و Chicago للكتب والمقالات والمواقع.',
      tags: ['مراجع', 'اقتباس', 'أبحاث', 'توثيق']
    },
    es: {
      name: 'Generador de Citas Bibliográficas (APA / MLA)',
      shortDesc: 'Crea referencias bibliográficas en formato APA, MLA y Chicago para libros y páginas web.',
      tags: ['citas', 'apa', 'mla', 'investigacion']
    },
    fr: {
      name: 'Générateur de Citations Bibliographiques (APA / MLA)',
      shortDesc: 'Générez des références bibliographiques aux normes APA, MLA et Chicago.',
      tags: ['citations', 'bibliographie', 'recherche']
    },
    de: {
      name: 'Zitations- & Quellenverzeichnis-Generator',
      shortDesc: 'Erstellen Sie Quellenangaben nach APA, MLA und Chicago für wissenschaftliche Arbeiten.',
      tags: ['zitation', 'apa', 'mla', 'quellen']
    }
  },

  'random-group-generator': {
    ar: {
      name: 'أداة تقسيم وتوزيع المجموعات العشوائية',
      shortDesc: 'تقسيم قوائم الأسماء والطلاب عشوائياً إلى مجموعات متساوية أو فرق للأنشطة والفصول.',
      tags: ['مجموعات', 'قرعة', 'فصول', 'تعليم']
    },
    es: {
      name: 'Generador de Grupos y Equipos Aleatorios',
      shortDesc: 'Divide listas de estudiantes o participantes en grupos equitativos al azar.',
      tags: ['grupos', 'equipos', 'clase']
    },
    fr: {
      name: 'Générateur Aléatoire de Groupes & Équipes',
      shortDesc: 'Répartissez des listes de noms en groupes équitables pour la classe ou des projets.',
      tags: ['groupes', 'equipes', 'education']
    },
    de: {
      name: 'Zufalls-Gruppen & Team-Generator',
      shortDesc: 'Teilen Sie Teilnehmerlisten in gleichmäßige Arbeitsgruppen für Unterricht und Workshops auf.',
      tags: ['gruppen', 'teams', 'unterricht']
    }
  },

  'pomodoro-timer': {
    ar: {
      name: 'مؤقت دراسة بومودورو للتركيز والإنتاجية',
      shortDesc: 'تنظيم فترات العمل والمذاكرة بتقنية بومودورو (25 دقيقة تركيز و 5 دقائق استراحة) مع تنبيهات صوتية.',
      tags: ['بومودورو', 'مؤقت', 'تركيز', 'إنتاجية']
    },
    es: {
      name: 'Temporizador Pomodoro para Estudio',
      shortDesc: 'Gestiona sesiones de estudio y descansos con la técnica Pomodoro y alertas sonoras.',
      tags: ['pomodoro', 'tiempo', 'productividad']
    },
    fr: {
      name: 'Minuteur Pomodoro d\'Étude & Concentration',
      shortDesc: 'Organisez vos sessions de travail et pauses avec la méthode Pomodoro et alertes audio.',
      tags: ['pomodoro', 'productivite', 'etudes']
    },
    de: {
      name: 'Pomodoro Lerntimer & Fokus-Uhr',
      shortDesc: 'Strukturieren Sie Lerneinheiten und Pausen mit der bewährten Pomodoro-Methode.',
      tags: ['pomodoro', 'fokus', 'produktivitaet']
    }
  },

  'readability-analyzer': {
    ar: {
      name: 'محلل مستوى سهولة وقراءة النصوص (Readability)',
      shortDesc: 'قياس مستوى صعوبة وفهم النصوص وفق مؤشرات Flesch-Kincaid لتناسب الفئة المستهدفة.',
      tags: ['قراءة', 'نصوص', 'تحليل', 'تعليم']
    },
    es: {
      name: 'Analizador de Nivel de Lectura y Complejidad',
      shortDesc: 'Evalúa la facilidad y grado escolar de textos según la fórmula Flesch-Kincaid.',
      tags: ['lectura', 'texto', 'analisis']
    },
    fr: {
      name: 'Analyseur de Lisibilité & Complexité de Texte',
      shortDesc: 'Évaluez le niveau de difficulté de lecture d\'un texte selon l\'indice Flesch-Kincaid.',
      tags: ['lisibilite', 'texte', 'analyse']
    },
    de: {
      name: 'Lesbarkeits- & Textanalyse-Tool',
      shortDesc: 'Messen Sie die Verständlichkeit von Texten anhand des Flesch-Kincaid-Index.',
      tags: ['lesbarkeit', 'textanalyse', 'bildung']
    }
  },

  'flashcard-generator': {
    ar: {
      name: 'صانع ومراجع البطاقات التعليمية التفاعلية',
      shortDesc: 'إنشاء ومراجعة بطاقات الحفظ والمذاكرة التفاعلية وجهًا لظهر مع دعم الحفظ المحلي والتصدير.',
      tags: ['بطاقات', 'مذاكرة', 'تعليم', 'حفظ']
    },
    es: {
      name: 'Creador de Tarjetas de Estudio (Flashcards)',
      shortDesc: 'Crea y practica con tarjetas interactivas de preguntas y respuestas para memorizar.',
      tags: ['flashcards', 'estudio', 'memoria']
    },
    fr: {
      name: 'Créateur de Fiches Mémo Interactives',
      shortDesc: 'Créez et révisez avec des cartes de mémorisation recto-verso personnalisées.',
      tags: ['fiches', 'memorisation', 'etude']
    },
    de: {
      name: 'Interaktiver Karteikarten-Ersteller',
      shortDesc: 'Erstellen und üben Sie mit digitalen Karteikarten zur effektiven Wissensaneignung.',
      tags: ['karteikarten', 'lernen', 'memorieren']
    }
  },

  'percentage-calculator': {
    ar: {
      name: 'حاسبة النسب المئوية والتغير الرياضي',
      shortDesc: 'حساب نسبة القيمة من المجموع، نسبة الزيادة أو النقصان، والخصم المئوي بسرعة وسهولة.',
      tags: ['نسبة', 'رياضيات', 'حساب', 'أرقام']
    },
    es: {
      name: 'Calculadora de Porcentajes y Variaciones',
      shortDesc: 'Calcula aumentos, descuentos, porcentajes directos y variaciones porcentuales.',
      tags: ['porcentajes', 'matematicas', 'calculo']
    },
    fr: {
      name: 'Calculateur de Pourcentages & Variations',
      shortDesc: 'Calculez des remises, augmentations, taxes et pourcentages d\'une valeur rapidement.',
      tags: ['pourcentage', 'maths', 'calcul']
    },
    de: {
      name: 'Prozentrechner & Prozentuale Veränderung',
      shortDesc: 'Berechnen Sie prozentuale Anteile, Steigerungen, Rabatte und Differenzen.',
      tags: ['prozent', 'mathematik', 'rechnen']
    }
  },

  'random-number-generator': {
    ar: {
      name: 'مولد الأرقام العشوائية وقرعة السحب',
      shortDesc: 'توليد أرقام عشوائية آمنة ضمن نطاق مخصص مع خيار منع التكرار للسحوبات والمسابقات.',
      tags: ['أرقام', 'عشوائي', 'قرعة', 'سحب']
    },
    es: {
      name: 'Generador de Números Aleatorios y Sorteos',
      shortDesc: 'Genera números aleatorios dentro de un rango con o sin repetición para sorteos.',
      tags: ['numeros', 'aleatorio', 'sorteo']
    },
    fr: {
      name: 'Générateur de Nombres Aléatoires & Tirages',
      shortDesc: 'Générez des nombres aléatoires dans une plage définie avec ou sans doublon.',
      tags: ['nombres', 'aleatoire', 'tirage']
    },
    de: {
      name: 'Zufallszahlen- & Ziehungs-Generator',
      shortDesc: 'Generieren Sie Zufallszahlen in benutzerdefinierten Bereichen für Ziehungen und Tests.',
      tags: ['zufall', 'zahlen', 'ziehung']
    }
  },

  'discount-calculator': {
    ar: {
      name: 'حاسبة الخصومات والتخفيضات والضريبة',
      shortDesc: 'احسب السعر النهائي بعد الخصم وقيمة التوفير المالي مع احتساب ضريبة القيمة المضافة.',
      tags: ['خصم', 'تسوق', 'توفير', 'أسعار']
    },
    es: {
      name: 'Calculadora de Descuentos y Rebajas',
      shortDesc: 'Calcula el precio final con descuento e impuestos incluidos y conoce tu ahorro total.',
      tags: ['descuento', 'compras', 'ahorro']
    },
    fr: {
      name: 'Calculateur de Réductions & Soldes',
      shortDesc: 'Calculez le montant économisé et le prix final après remise et taxes.',
      tags: ['remise', 'soldes', 'achats']
    },
    de: {
      name: 'Rabatt- & Preisnachlass-Rechner',
      shortDesc: 'Ermitteln Sie Endpreise nach Abzug von Rabatten und Steuern sowie Ihre Gesamtersparnis.',
      tags: ['rabatt', 'einkaufen', 'sparen']
    }
  },

  'bmi-calculator': {
    ar: {
      name: 'حاسبة مؤشر كتلة الجسم والوزن المثالي (BMI)',
      shortDesc: 'احسب مؤشر كتلة جسمك وتعرف على تصنيف وزنك ونطاق الوزن الصحي الموصى به طبياً.',
      tags: ['bmi', 'وزن', 'صحة', 'جسم']
    },
    es: {
      name: 'Calculadora de Índice de Masa Corporal (IMC)',
      shortDesc: 'Calcula tu IMC y descubre tu categoría de peso saludable recomendada.',
      tags: ['imc', 'peso', 'salud']
    },
    fr: {
      name: 'Calculateur d\'Indice de Masse Corporelle (IMC)',
      shortDesc: 'Calculez votre IMC et déterminez votre tranche de poids corporel idéal.',
      tags: ['imc', 'poids', 'sante']
    },
    de: {
      name: 'Body-Mass-Index Rechner (BMI)',
      shortDesc: 'Berechnen Sie Ihren BMI und ermitteln Sie Ihren gesunden Idealgewichtsbereich.',
      tags: ['bmi', 'gewicht', 'gesundheit']
    }
  },

  'age-calculator': {
    ar: {
      name: 'حاسبة العمر الدقيقة وموعد الميلاد القادم',
      shortDesc: 'احسب عمرك بدقة بالسنوات والأشهر والأيام والساعات مع العد التنازلي ليوم ميلادك القادم.',
      tags: ['عمر', 'تاريخ', 'ميلاد', 'وقت']
    },
    es: {
      name: 'Calculadora Exacta de Edad y Cumpleaños',
      shortDesc: 'Calcula tu edad precisa en años, meses, días y horas con cuenta regresiva.',
      tags: ['edad', 'cumpleanos', 'fecha']
    },
    fr: {
      name: 'Calculateur d\'Âge Exact & Prochain Anniversaire',
      shortDesc: 'Calculez votre âge précis en années, mois, jours et découvrez le compte à rebours.',
      tags: ['age', 'anniversaire', 'date']
    },
    de: {
      name: 'Exakter Alters- & Geburtstagsrechner',
      shortDesc: 'Berechnen Sie Ihr genaues Alter in Jahren, Monaten und Tagen mit Countdown zum Geburtstag.',
      tags: ['alter', 'geburtstag', 'zeit']
    }
  },

  'days-between-dates': {
    ar: {
      name: 'حاسبة الفارق الزمني وعدد الأيام بين تاريخين',
      shortDesc: 'احسب إجمالي الأيام، الأسابيع، الأشهر، وأيام العمل الرسمية الفاصلة بين أي موعدين.',
      tags: ['أيام', 'تاريخ', 'فارق', 'تقويم']
    },
    es: {
      name: 'Calculadora de Días Entre Dos Fechas',
      shortDesc: 'Calcula la diferencia total en días, semanas, meses y días hábiles entre fechas.',
      tags: ['dias', 'fechas', 'calendario']
    },
    fr: {
      name: 'Calculateur de Jours Entre Deux Dates',
      shortDesc: 'Calculez l\'écart en jours, semaines, mois et jours ouvrés entre deux dates.',
      tags: ['jours', 'dates', 'calendrier']
    },
    de: {
      name: 'Datumsdifferenz- & Tagesabstandsrechner',
      shortDesc: 'Berechnen Sie exakte Tage, Wochen und Werktage zwischen zwei beliebigen Daten.',
      tags: ['tage', 'datum', 'kalender']
    }
  },

  'stopwatch-timer': {
    ar: {
      name: 'ساعة إيقاف ومؤقت تنازلي عالي الدقة',
      shortDesc: 'ساعة إيقاف رقمية مع تسجيل دورات اللفات ومؤقت تنازلي للتمارين والأنشطة.',
      tags: ['ساعة', 'مؤقت', 'إيقاف', 'وقت']
    },
    es: {
      name: 'Cronómetro Digital y Temporizador',
      shortDesc: 'Cronómetro con registro de vueltas y temporizador de cuenta atrás para tareas y deportes.',
      tags: ['cronometro', 'temporizador', 'tiempo']
    },
    fr: {
      name: 'Chronomètre & Minuteur Numérique de Précision',
      shortDesc: 'Chronométrez avec temps intermédiaires et compte à rebours pour vos activités.',
      tags: ['chronometre', 'minuteur', 'temps']
    },
    de: {
      name: 'Präzisions-Stoppuhr & Countdown-Timer',
      shortDesc: 'Digitaler Timer mit Rundenzeiten und Rückwärtszähler für Sport und Aufgaben.',
      tags: ['stoppuhr', 'timer', 'zeitmessung']
    }
  },

  'color-contrast-checker': {
    ar: {
      name: 'فاحص تباين الألوان ومعايير الوصولية (WCAG)',
      shortDesc: 'تدقيق نسبة التباين بين نصوص وألوان الخلفيات لضمان مطابقة معايير إمكانية الوصول WCAG AA/AAA.',
      tags: ['تباين', 'ألوان', 'وصولية', 'wcag']
    },
    es: {
      name: 'Verificador de Contraste de Color (WCAG)',
      shortDesc: 'Evalúa la legibilidad y relación de contraste entre texto y fondo según WCAG AA y AAA.',
      tags: ['contraste', 'accesibilidad', 'wcag']
    },
    fr: {
      name: 'Vérificateur de Contraste de Couleurs (WCAG)',
      shortDesc: 'Testez le ratio de contraste texte/fond pour la conformité aux normes d\'accessibilité WCAG.',
      tags: ['contraste', 'accessibilite', 'wcag']
    },
    de: {
      name: 'Farbkontrast-Prüfer & Barrierefreiheit (WCAG)',
      shortDesc: 'Prüfen Sie Kontrastverhältnisse von Text und Hintergrund nach WCAG AA/AAA Standards.',
      tags: ['kontrast', 'barrierefreiheit', 'wcag']
    }
  },

  'aspect-ratio-calculator': {
    ar: {
      name: 'حاسبة أبعاد ونسب العرض إلى الارتفاع (Aspect Ratio)',
      shortDesc: 'حساب وتعديل أبعاد الصور والفيديوهات (16:9, 4:3, 1:1) مع الحفاظ على التناسب الدقيق.',
      tags: ['أبعاد', 'نسبة', 'صور', 'فيديو']
    },
    es: {
      name: 'Calculadora de Relación de Aspecto',
      shortDesc: 'Calcula y escala dimensiones de imágenes y videos manteniendo proporciones (16:9, 4:3).',
      tags: ['proporcion', 'aspecto', 'dimensiones']
    },
    fr: {
      name: 'Calculateur de Ratio d\'Aspect & Dimensions',
      shortDesc: 'Redimensionnez des visuels et vidéos tout en conservant leur format d\'affichage.',
      tags: ['ratio', 'dimensions', 'image']
    },
    de: {
      name: 'Seitenverhältnis- & Bilddimensions-Rechner',
      shortDesc: 'Skalieren Sie Bild- und Videogrößen unter Beibehaltung des Seitenverhältnisses.',
      tags: ['seitenverhaeltnis', 'abmessungen', 'grafik']
    }
  },

  'svg-placeholder-generator': {
    ar: {
      name: 'مولد الصور التجريبية المتجهة (SVG Placeholder)',
      shortDesc: 'إنشاء صور مؤقتة وخفيفة الوزن بأبعاد وألوان ونصوص مخصصة للاستخدام في المواقع.',
      tags: ['svg', 'placeholder', 'تصميم', 'صور']
    },
    es: {
      name: 'Generador de Marcadores de Posición SVG',
      shortDesc: 'Crea imágenes de relleno vectoriales ultraligeras con dimensiones y colores a medida.',
      tags: ['svg', 'placeholder', 'imagenes']
    },
    fr: {
      name: 'Générateur d\'Images SVG d\'Attente (Placeholder)',
      shortDesc: 'Générez des images vectorielles d\'attente légères avec dimensions personnalisées.',
      tags: ['svg', 'placeholder', 'design']
    },
    de: {
      name: 'SVG Platzhalterbild-Generator',
      shortDesc: 'Erstellen Sie leichtgewichtige Vektor-Platzhalterbilder mit benutzerdefinierten Maßen.',
      tags: ['svg', 'platzhalter', 'webdesign']
    }
  },

  'text-repeater': {
    ar: {
      name: 'مكرر النصوص والكلمات التلقائي',
      shortDesc: 'تكرار أي نص أو عبارة بعدد المرات المطلوب مع خيارات الفواصل والأسطر الجديدة بنقرة واحدة.',
      tags: ['تكرار', 'نصوص', 'توليد', 'أدوات']
    },
    es: {
      name: 'Repetidor y Multiplicador de Texto',
      shortDesc: 'Repite cualquier palabra o frase tantas veces como quieras con saltos de línea y separadores.',
      tags: ['texto', 'repetidor', 'generador']
    },
    fr: {
      name: 'Répéteur & Multiplicateur de Texte',
      shortDesc: 'Répétez un texte ou mot le nombre de fois désiré avec séparateurs personnalisés.',
      tags: ['texte', 'repeteur', 'outils']
    },
    de: {
      name: 'Text- & Wort-Wiederholer',
      shortDesc: 'Vervielfachen Sie Wörter oder Textblöcke mit Zeilenumbrüchen und Trennzeichen.',
      tags: ['text', 'wiederholung', 'werkzeuge']
    }
  },

  'word-scrambler': {
    ar: {
      name: 'مبعثر ومخلط الحروف والكلمات (Scrambler)',
      shortDesc: 'خلط وترتيب حروف الكلمات عشوائياً لصناعة الألغاز والألعاب اللغوية الممتعة.',
      tags: ['ألعاب', 'ألغاز', 'كلمات', 'خلط']
    },
    es: {
      name: 'Mezclador y Desordenador de Palabras',
      shortDesc: 'Desordena letras aleatoriamente para crear acertijos y juegos de palabras divertidos.',
      tags: ['juegos', 'palabras', 'acertijos']
    },
    fr: {
      name: 'Mélangeur et Anagrammeur de Mots',
      shortDesc: 'Mélangez les lettres de mots ou phrases pour créer des énigmes et devinettes.',
      tags: ['jeux', 'mots', 'enigmes']
    },
    de: {
      name: 'Wort- & Buchstaben-Mischer (Scrambler)',
      shortDesc: 'Mischen Sie Buchstaben für Worträtsel, Spiele und linguistische Tests.',
      tags: ['spiele', 'woerter', 'raetsel']
    }
  },

  'morse-code-translator': {
    ar: {
      name: 'مترجم ومحول شفرة مورس الصوتية (Morse Code)',
      shortDesc: 'التحويل بين النصوص وشفرة مورس العالمية مع إمكانية الاستماع للصوت وإرسال الإشارات.',
      tags: ['مورس', 'شفرة', 'صوت', 'ترجمة']
    },
    es: {
      name: 'Traductor de Código Morse con Audio',
      shortDesc: 'Convierte texto a código Morse y viceversa con reproducción de sonido interactiva.',
      tags: ['morse', 'codigo', 'audio']
    },
    fr: {
      name: 'Traducteur de Code Morse avec Audio',
      shortDesc: 'Traduisez du texte en code Morse et inversement avec synthèse sonore.',
      tags: ['morse', 'code', 'audio']
    },
    de: {
      name: 'Morsecode-Übersetzer mit Audiowiedergabe',
      shortDesc: 'Übersetzen Sie Text in Morsecode und zurück mit akustischer Tonwiedergabe.',
      tags: ['morse', 'audio', 'uebersetzer']
    }
  },

  'text-to-binary': {
    ar: {
      name: 'محول النصوص إلى النظام الثنائي (Binary Code)',
      shortDesc: 'تحويل النصوص والكلمات إلى أرقام ثنائية (0 و 1) والعكس مع دعم فك التشفير الفوري.',
      tags: ['ثنائي', 'binary', 'تحويل', 'برمجة']
    },
    es: {
      name: 'Conversor de Texto a Código Binario',
      shortDesc: 'Convierte texto alfabético a números binarios (0 y 1) y decodifica binario a texto.',
      tags: ['binario', 'texto', 'codigo']
    },
    fr: {
      name: 'Convertisseur de Texte en Binaire',
      shortDesc: 'Transformez du texte en code binaire (0 et 1) et décodez du binaire instantanément.',
      tags: ['binaire', 'texte', 'conversion']
    },
    de: {
      name: 'Text zu Binärcode Konverter',
      shortDesc: 'Wandeln Sie Text in Binärzahlen (0 und 1) um und dekodieren Sie Binärcode in Text.',
      tags: ['binaer', 'code', 'konverter']
    }
  }
};

/**
 * Returns the localized tool information (name, shortDesc, tags) based on the user's selected language.
 */
export function getLocalizedTool(
  tool: { id: string; name: string; shortDesc: string; tags: string[] },
  lang: Language
): { name: string; shortDesc: string; tags: string[] } {
  const trans = TOOL_TRANSLATIONS[tool.id]?.[lang];
  if (trans) {
    return {
      name: trans.name || tool.name,
      shortDesc: trans.shortDesc || tool.shortDesc,
      tags: trans.tags || tool.tags
    };
  }
  return {
    name: tool.name,
    shortDesc: tool.shortDesc,
    tags: tool.tags
  };
}
