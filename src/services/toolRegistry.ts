import { ToolItem, ToolCategory, EducationSubCategory, CategoryMetadata } from '../types';

export const TOOL_CATEGORIES: CategoryMetadata[] = [
  {
    id: 'all',
    labelKey: 'cat_all',
    name: 'All Tools',
    icon: 'LayoutGrid',
    description: 'Explore the full suite of client-side privacy-first tools.'
  },
  {
    id: 'finance',
    labelKey: 'cat_finance',
    name: 'Real Estate & Finance',
    icon: 'Building2',
    description: 'Real estate ROI, mortgage amortization, loan comparison, salary, and savings calculators.'
  },
  {
    id: 'developer',
    labelKey: 'cat_developer',
    name: 'Developer & Code',
    icon: 'Code',
    description: 'Code minifiers, regex debuggers, diff inspectors, and syntax formatters.'
  },
  {
    id: 'designer',
    labelKey: 'cat_designer',
    name: 'Designer & UI',
    icon: 'Palette',
    description: 'CSS generators, color palettes, fluid typography, icons, and SVG tools.'
  },
  {
    id: 'security',
    labelKey: 'cat_security',
    name: 'Security & Crypto',
    icon: 'ShieldCheck',
    description: 'Hash generators, password security, bcrypt hashes, and JWT decoders.'
  },
  {
    id: 'data',
    labelKey: 'cat_data',
    name: 'Data & Utilities',
    icon: 'Database',
    description: 'JSON formatters, CSV converters, SQL beautifiers, and Base64 encoders.'
  },
  {
    id: 'education',
    labelKey: 'cat_education',
    name: 'Education & Study',
    icon: 'GraduationCap',
    description: 'Academic tools tailored for teachers and students with zero server logging.'
  }
];

export interface EducationSubCategoryItem {
  id: EducationSubCategory;
  labelKey: string;
  label: string;
  description: string;
  icon: string;
}

export const EDUCATION_SUBCATEGORIES: EducationSubCategoryItem[] = [
  {
    id: 'all',
    labelKey: 'subcat_all_edu',
    label: 'All Education',
    description: 'All 14 academic and classroom tools for teachers and students.',
    icon: 'GraduationCap'
  },
  {
    id: 'teachers',
    labelKey: 'subcat_teachers',
    label: 'For Teachers',
    description: 'Group generation, classroom timers, reading level metrics, and quizzes.',
    icon: 'Users'
  },
  {
    id: 'students',
    labelKey: 'subcat_students',
    label: 'For Students',
    description: 'GPA calculator, flashcards, Pomodoro study timers, citations, and math.',
    icon: 'BookOpen'
  }
];

export class ToolRegistryService {
  private tools: ToolItem[] = [];

  constructor(tools: ToolItem[] = []) {
    this.tools = tools;
  }

  /**
   * Set or update tools list
   */
  public setTools(tools: ToolItem[]): void {
    this.tools = tools;
  }

  /**
   * Retrieve all tools
   */
  public getAllTools(): ToolItem[] {
    return this.tools;
  }

  /**
   * Retrieve all category metadata
   */
  public getCategories(): CategoryMetadata[] {
    return TOOL_CATEGORIES;
  }

  /**
   * Retrieve primary categories (excluding 'all')
   */
  public getPrimaryCategories(): CategoryMetadata[] {
    return TOOL_CATEGORIES.filter(c => c.id !== 'all');
  }

  /**
   * Retrieve education subcategories
   */
  public getEducationSubCategories(): EducationSubCategoryItem[] {
    return EDUCATION_SUBCATEGORIES;
  }

  /**
   * Retrieve a single category's metadata
   */
  public getCategoryMetadata(id: ToolCategory): CategoryMetadata | undefined {
    return TOOL_CATEGORIES.find(c => c.id === id);
  }

  /**
   * Retrieve tool by id or slug
   */
  public getTool(idOrSlug: string): ToolItem | undefined {
    return this.tools.find(t => t.id === idOrSlug || t.slug === idOrSlug);
  }

  /**
   * Check if an education tool matches a specific subcategory
   */
  public matchesEducationSubCategory(tool: ToolItem, subCat: EducationSubCategory): boolean {
    if (tool.category !== 'education') return false;
    if (subCat === 'all') return true;
    if (tool.educationAudience === 'both') return true;
    return tool.educationAudience === subCat;
  }

  /**
   * Retrieve tools filtered by category and optional education subcategory
   */
  public getToolsByCategory(
    category: ToolCategory,
    educationSubCategory: EducationSubCategory = 'all'
  ): ToolItem[] {
    if (category === 'all') {
      return this.tools;
    }

    return this.tools.filter(tool => {
      if (tool.category !== category) return false;
      if (category === 'education') {
        return this.matchesEducationSubCategory(tool, educationSubCategory);
      }
      return true;
    });
  }

  /**
   * Count total tools in a category
   */
  public getCategoryCount(
    category: ToolCategory,
    educationSubCategory: EducationSubCategory = 'all'
  ): number {
    if (category === 'all') return this.tools.length;
    return this.getToolsByCategory(category, educationSubCategory).length;
  }

  /**
   * Count tools for education subcategories
   */
  public getEducationSubCategoryCount(subCat: EducationSubCategory): number {
    return this.tools.filter(tool => this.matchesEducationSubCategory(tool, subCat)).length;
  }

  /**
   * Multi-dimensional search and filter
   */
  public filterTools(options: {
    category?: ToolCategory;
    educationSubCategory?: EducationSubCategory;
    query?: string;
    onlyFavorites?: boolean;
    favorites?: string[];
  }): ToolItem[] {
    const {
      category = 'all',
      educationSubCategory = 'all',
      query = '',
      onlyFavorites = false,
      favorites = []
    } = options;

    const trimmedQuery = query.trim().toLowerCase();

    return this.tools.filter(tool => {
      // 1. Search Query
      if (trimmedQuery) {
        const matchesName = tool.name.toLowerCase().includes(trimmedQuery);
        const matchesDesc = tool.shortDesc.toLowerCase().includes(trimmedQuery);
        const matchesTags = tool.tags.some(tag => tag.toLowerCase().includes(trimmedQuery));
        const matchesCategory = tool.category.toLowerCase().includes(trimmedQuery);
        const matchesAudience = tool.educationAudience ? tool.educationAudience.toLowerCase().includes(trimmedQuery) : false;

        if (!matchesName && !matchesDesc && !matchesTags && !matchesCategory && !matchesAudience) {
          return false;
        }
      }

      // 2. Category Filter
      if (category !== 'all') {
        if (tool.category !== category) return false;
        if (category === 'education' && educationSubCategory !== 'all') {
          if (!this.matchesEducationSubCategory(tool, educationSubCategory)) {
            return false;
          }
        }
      }

      // 3. Favorites Filter
      if (onlyFavorites && !favorites.includes(tool.id)) {
        return false;
      }

      return true;
    });
  }
}

export const ToolRegistry = new ToolRegistryService();
