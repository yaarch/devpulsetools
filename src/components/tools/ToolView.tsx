import React from 'react';
import { TOOLS_MAP } from '../../data/toolsData';
import { ToolWrapper } from './ToolWrapper';
import { JsonFormatter } from './JsonFormatter';
import { Base64Tool } from './Base64Tool';
import { QrCodeGenerator } from './QrCodeGenerator';
import { ImageCompressor } from './ImageCompressor';
import { MarkdownEditor } from './MarkdownEditor';
import { PasswordGenerator } from './PasswordGenerator';
import { HashGenerator } from './HashGenerator';
import { UrlShortener } from './UrlShortener';
import { ColorConverter } from './ColorConverter';
import { RegexTester } from './RegexTester';
import { DiffChecker } from './DiffChecker';
import { UnitConverter } from './UnitConverter';
import { TimestampConverter } from './TimestampConverter';
import { HtmlMinifier } from './HtmlMinifier';
import { UuidGenerator } from './UuidGenerator';
import { JwtDecoder } from './JwtDecoder';
import { CaseConverter } from './CaseConverter';
import { WordCounter } from './WordCounter';
import { SvgToPngConverter } from './SvgToPngConverter';
import { BoxShadowGenerator } from './BoxShadowGenerator';
import { UrlEncoderDecoder } from './UrlEncoderDecoder';
import { CssGradientGenerator } from './CssGradientGenerator';
import { LoremIpsumGenerator } from './LoremIpsumGenerator';
import { GlassmorphismGenerator } from './GlassmorphismGenerator';
import { HtmlEntityConverter } from './HtmlEntityConverter';
import { CssFlexboxGenerator } from './CssFlexboxGenerator';
import { JsonCsvConverter } from './JsonCsvConverter';
import { CronParser } from './CronParser';
import { TextDuplicateRemover } from './TextDuplicateRemover';
import { ClipPathGenerator } from './ClipPathGenerator';
import { ColorPaletteGenerator } from './ColorPaletteGenerator';
import { SqlFormatter } from './SqlFormatter';
import { MetaTagsGenerator } from './MetaTagsGenerator';
import { TextAsciiStyler } from './TextAsciiStyler';
import { CssClampCalculator } from './CssClampCalculator';
import { JsonSchemaGenerator } from './JsonSchemaGenerator';
import { BorderRadiusGenerator } from './BorderRadiusGenerator';
import { JsMinifier } from './JsMinifier';
import { BcryptGenerator } from './BcryptGenerator';
import { FaviconGenerator } from './FaviconGenerator';
import { GpaCalculator } from './GpaCalculator';
import { CitationGenerator } from './CitationGenerator';
import { RandomGroupGenerator } from './RandomGroupGenerator';
import { PomodoroTimer } from './PomodoroTimer';
import { ReadabilityAnalyzer } from './ReadabilityAnalyzer';
import { FlashcardGenerator } from './FlashcardGenerator';
import { PercentageCalculator } from './PercentageCalculator';
import { RandomNumberGenerator } from './RandomNumberGenerator';
import { DiscountCalculator } from './DiscountCalculator';
import { BmiCalculator } from './BmiCalculator';
import { AgeCalculator } from './AgeCalculator';
import { DaysBetweenDates } from './DaysBetweenDates';
import { StopwatchTimer } from './StopwatchTimer';
import { ColorContrastChecker } from './ColorContrastChecker';
import { AspectRatioCalculator } from './AspectRatioCalculator';
import { SvgPlaceholderGenerator } from './SvgPlaceholderGenerator';
import { TextRepeater } from './TextRepeater';
import { WordScrambler } from './WordScrambler';
import { MorseCodeTranslator } from './MorseCodeTranslator';
import { TextToBinary } from './TextToBinary';
import { RealEstateCalculator } from './RealEstateCalculator';
import { CompoundInterestCalculator } from './CompoundInterestCalculator';
import { CalorieMacroCalculator } from './CalorieMacroCalculator';
import { ScientificCalculator } from './ScientificCalculator';

interface ToolViewProps {
  toolId: string;
}

export const ToolView: React.FC<ToolViewProps> = ({ toolId }) => {
  const tool = TOOLS_MAP[toolId];

  if (!tool) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Tool Not Found</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          The requested developer tool does not exist or has been moved.
        </p>
      </div>
    );
  }

  const renderToolComponent = () => {
    switch (tool.id) {
      case 'json-formatter':
        return <JsonFormatter />;
      case 'base64-encoder-decoder':
      case 'base64-tool':
        return <Base64Tool />;
      case 'qr-code-generator':
      case 'qr-generator':
        return <QrCodeGenerator />;
      case 'image-compressor':
        return <ImageCompressor />;
      case 'markdown-editor':
        return <MarkdownEditor />;
      case 'password-generator':
        return <PasswordGenerator />;
      case 'hash-generator':
        return <HashGenerator />;
      case 'url-shortener':
      case 'url-cleaner':
        return <UrlShortener />;
      case 'color-converter':
        return <ColorConverter />;
      case 'regex-tester':
        return <RegexTester />;
      case 'diff-checker':
        return <DiffChecker />;
      case 'unit-converter':
        return <UnitConverter />;
      case 'timestamp-converter':
        return <TimestampConverter />;
      case 'html-minifier':
        return <HtmlMinifier />;
      case 'uuid-generator':
        return <UuidGenerator />;
      case 'jwt-decoder':
        return <JwtDecoder />;
      case 'case-converter':
        return <CaseConverter />;
      case 'word-counter':
        return <WordCounter />;
      case 'svg-to-png':
      case 'svg-to-png-converter':
        return <SvgToPngConverter />;
      case 'box-shadow-generator':
      case 'css-box-shadow-generator':
        return <BoxShadowGenerator />;
      case 'url-encoder-decoder':
        return <UrlEncoderDecoder />;
      case 'css-gradient-generator':
        return <CssGradientGenerator />;
      case 'lorem-ipsum-generator':
        return <LoremIpsumGenerator />;
      case 'glassmorphism-generator':
        return <GlassmorphismGenerator />;
      case 'html-entity-converter':
        return <HtmlEntityConverter />;
      case 'css-flexbox-generator':
        return <CssFlexboxGenerator />;
      case 'json-to-csv':
      case 'json-csv-converter':
        return <JsonCsvConverter />;
      case 'cron-parser':
        return <CronParser />;
      case 'text-duplicate-remover':
        return <TextDuplicateRemover />;
      case 'clip-path-generator':
        return <ClipPathGenerator />;
      case 'color-palette-generator':
        return <ColorPaletteGenerator />;
      case 'sql-formatter':
        return <SqlFormatter />;
      case 'meta-tags-generator':
        return <MetaTagsGenerator />;
      case 'text-ascii-styler':
        return <TextAsciiStyler />;
      case 'css-clamp-calculator':
        return <CssClampCalculator />;
      case 'json-schema-generator':
        return <JsonSchemaGenerator />;
      case 'border-radius-generator':
        return <BorderRadiusGenerator />;
      case 'js-minifier':
        return <JsMinifier />;
      case 'bcrypt-generator':
        return <BcryptGenerator />;
      case 'favicon-generator':
        return <FaviconGenerator />;
      case 'gpa-calculator':
        return <GpaCalculator />;
      case 'citation-generator':
        return <CitationGenerator />;
      case 'random-group-generator':
        return <RandomGroupGenerator />;
      case 'pomodoro-timer':
        return <PomodoroTimer />;
      case 'readability-analyzer':
        return <ReadabilityAnalyzer />;
      case 'flashcard-generator':
        return <FlashcardGenerator />;
      case 'percentage-calculator':
        return <PercentageCalculator />;
      case 'random-number-generator':
        return <RandomNumberGenerator />;
      case 'discount-calculator':
        return <DiscountCalculator />;
      case 'bmi-calculator':
        return <BmiCalculator />;
      case 'age-calculator':
        return <AgeCalculator />;
      case 'days-between-dates':
        return <DaysBetweenDates />;
      case 'stopwatch-timer':
        return <StopwatchTimer />;
      case 'color-contrast-checker':
        return <ColorContrastChecker />;
      case 'aspect-ratio-calculator':
        return <AspectRatioCalculator />;
      case 'svg-placeholder-generator':
        return <SvgPlaceholderGenerator />;
      case 'text-repeater':
        return <TextRepeater />;
      case 'word-scrambler':
        return <WordScrambler />;
      case 'morse-code-translator':
        return <MorseCodeTranslator />;
      case 'text-to-binary':
        return <TextToBinary />;
      case 'real-estate-calculator':
      case 'mortgage-calculator':
        return <RealEstateCalculator />;
      case 'compound-interest-calculator':
      case 'investment-calculator':
        return <CompoundInterestCalculator />;
      case 'calorie-calculator':
      case 'tdee-calculator':
      case 'macro-calculator':
        return <CalorieMacroCalculator />;
      case 'scientific-calculator':
        return <ScientificCalculator />;
      default:
        return (
          <div className="p-8 text-center text-sm text-slate-500">
            Tool under active refinement.
          </div>
        );
    }
  };

  return <ToolWrapper tool={tool}>{renderToolComponent()}</ToolWrapper>;
};
