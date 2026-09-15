export type Language = 'en' | 'es' | 'fr' | 'ar' | 'de';

export type PrimaryToolCategory = 
  | 'finance'
  | 'developer'
  | 'designer'
  | 'security'
  | 'data'
  | 'education';

export type ToolCategory = 
  | 'all'
  | PrimaryToolCategory;

export type EducationSubCategory = 'all' | 'teachers' | 'students';

export type EducationAudience = 'teachers' | 'students' | 'both';

export interface CategoryMetadata {
  id: ToolCategory;
  labelKey: string;
  name: string;
  icon: string;
  description: string;
}

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  category: PrimaryToolCategory;
  educationAudience?: EducationAudience;
  iconName: string;
  tags: string[];
  isPopular?: boolean;
  isNew?: boolean;
  instructions: string[];
  faqs: { question: string; answer: string }[];
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

export type ActivePage = 
  | { type: 'home' }
  | { type: 'tools' }
  | { type: 'real-estate' }
  | { type: 'tool'; toolId: string }
  | { type: 'about' }
  | { type: 'privacy' }
  | { type: 'terms' }
  | { type: 'contact' }
  | { type: 'not-found' };
