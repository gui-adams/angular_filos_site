export type CourseLevel = 'graduacao' | 'pos' | 'mba';

export type CourseType =
  | 'Bacharelado'
  | 'Tecnólogo'
  | 'Licenciatura'
  | 'Especialização'
  | 'MBA';

export type CourseModality = 'EAD' | 'Presencial';

/**
 * Conteúdo específico de cada curso
 * Usado na página dinâmica de cursos
 */
export interface CourseContent {
  lead: string; // texto principal do topo

  coordinator?: string;

  whatsappText?: string;

  matrixUrl?: string;

  sections?: {
    objetivos?: string[];
    estrutura?: string[];
    diferenciais?: string[];
    egresso?: string[];
  };
}

/**
 * Estrutura completa de um curso
 * Usada no sistema de SEO + página dinâmica
 */
export interface Course {
  /** identificador interno */
  id: string;

  /** nome do curso */
  title: string;

  /** nível acadêmico */
  level: CourseLevel;

  /** tipo de curso */
  type: CourseType;

  /** modalidade */
  modality: CourseModality;

  /** imagem usada nos cards */
  imageFront: string;

  /** imagem usada na página do curso */
  imageSrc: string;

  /** link para inscrição */
  applyHref: string;

  /**
   * SLUG SEO da página
   * Ex:
   * graduacao-direito-aguas-lindas-go
   */
  seoSlug: string;

  /** title SEO */
  seoTitle: string;

  /** description SEO */
  seoDescription: string;

  /** imagem usada para OpenGraph */
  seoImage?: string;

  /** conteúdo completo da página */
  content: CourseContent;
}