import React from 'react';
import {
  Braces, Binary, ImageDown, QrCode, FileCode2, KeyRound, ShieldAlert,
  Link2, Palette, SearchCode, GitCompare, Scale, Clock, FileMinus,
  Fingerprint, FileKey, CaseSensitive, FileText, FileImage, Sparkles,
  LayoutGrid, Code, Image, ShieldCheck, Repeat, Wrench, Globe, Sliders,
  Table, Share2, Shapes, Hash, Layers, Type, Maximize2, Code2, Smile,
  FileSpreadsheet, GraduationCap, Quote, Users, Timer, BookOpen, Percent,
  Dices, Tag, Activity, CalendarDays, Calendar, Contrast, MonitorPlay,
  Shuffle, Radio, Building2, Home
} from 'lucide-react';

interface IconRendererProps {
  name: string;
  className?: string;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Braces': return <Braces className={className} />;
    case 'Binary': return <Binary className={className} />;
    case 'ImageDown': return <ImageDown className={className} />;
    case 'QrCode': return <QrCode className={className} />;
    case 'FileCode2': return <FileCode2 className={className} />;
    case 'KeyRound': return <KeyRound className={className} />;
    case 'ShieldAlert': return <ShieldAlert className={className} />;
    case 'Link2': return <Link2 className={className} />;
    case 'Palette': return <Palette className={className} />;
    case 'SearchCode': return <SearchCode className={className} />;
    case 'GitCompare': return <GitCompare className={className} />;
    case 'Scale': return <Scale className={className} />;
    case 'Clock': return <Clock className={className} />;
    case 'FileMinus': return <FileMinus className={className} />;
    case 'Fingerprint': return <Fingerprint className={className} />;
    case 'FileKey': return <FileKey className={className} />;
    case 'CaseSensitive': return <CaseSensitive className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'FileImage': return <FileImage className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'LayoutGrid': return <LayoutGrid className={className} />;
    case 'Code': return <Code className={className} />;
    case 'Image': return <Image className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'Repeat': return <Repeat className={className} />;
    case 'Globe': return <Globe className={className} />;
    case 'Sliders': return <Sliders className={className} />;
    case 'Table': return <Table className={className} />;
    case 'Share2': return <Share2 className={className} />;
    case 'Shapes': return <Shapes className={className} />;
    case 'Hash': return <Hash className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'Type': return <Type className={className} />;
    case 'Maximize2': return <Maximize2 className={className} />;
    case 'Code2': return <Code2 className={className} />;
    case 'Smile': return <Smile className={className} />;
    case 'FileSpreadsheet': return <FileSpreadsheet className={className} />;
    case 'GraduationCap': return <GraduationCap className={className} />;
    case 'Quote': return <Quote className={className} />;
    case 'Users': return <Users className={className} />;
    case 'Timer': return <Timer className={className} />;
    case 'BookOpen': return <BookOpen className={className} />;
    case 'Percent': return <Percent className={className} />;
    case 'Dices': return <Dices className={className} />;
    case 'Tag': return <Tag className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'CalendarDays': return <CalendarDays className={className} />;
    case 'Calendar': return <Calendar className={className} />;
    case 'Contrast': return <Contrast className={className} />;
    case 'MonitorPlay': return <MonitorPlay className={className} />;
    case 'Shuffle': return <Shuffle className={className} />;
    case 'Radio': return <Radio className={className} />;
    case 'Building2': return <Building2 className={className} />;
    case 'Home': return <Home className={className} />;
    default: return <Wrench className={className} />;
  }
};
