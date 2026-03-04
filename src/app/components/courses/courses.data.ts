import { Course } from './courses.model';

const BASE_URL = 'https://faculdadefilos.edu.br';
const CITY_SUFFIX = 'aguas-lindas-go';

function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

type CourseInput = Omit<Course, 'seoSlug' | 'seoTitle' | 'seoDescription' | 'seoImage'> & {
  seoSlug?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
};

function withSeo(c: CourseInput): Course {
  const levelPrefix =
    c.level === 'graduacao'
      ? 'graduacao'
      : c.level === 'pos'
      ? 'pos-graduacao'
      : c.level;

  const autoSlug = `${levelPrefix}-${slugify(c.title)}-${CITY_SUFFIX}`;

  const seoSlug = c.seoSlug ?? autoSlug;

  const seoTitle =
    c.seoTitle ??
    `${c.level === 'pos' ? 'Pós-graduação em' : 'Curso de'} ${
      c.title
    } em Águas Lindas (GO) | Faculdade Filos`;

  const seoDescription =
    c.seoDescription ??
    `Conheça ${c.level === 'pos' ? 'a pós-graduação em' : 'o curso de'} ${
      c.title
    } na Faculdade Filos em Águas Lindas de Goiás. Inscrição, modalidade e informações do curso.`;

  const seoImage = c.seoImage ?? `${BASE_URL}/${c.imageFront}`;

  return {
    ...c,
    seoSlug,
    seoTitle,
    seoDescription,
    seoImage,
  };
}

export const COURSES: Course[] = [
  withSeo({
    id: 'adm',
    title: 'Administração',
    level: 'graduacao',
    type: 'Bacharelado',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/administracao.webp',
    imageSrc: 'assets/cursos/rota/adm.webp',
    applyHref: '/admissions?curso=administracao',

    content: {
      lead:
        'Formar profissionais capazes de atuar de forma estratégica na gestão de organizações públicas e privadas.',
      coordinator: 'Coordenação do Curso de Administração',
      matrixUrl: 'https://drive.google.com/',
      sections: {
        objetivos: [
          'Desenvolver competências em gestão e liderança.',
          'Preparar profissionais para atuar em empresas públicas e privadas.',
          'Estimular visão estratégica e empreendedora.',
        ],
        estrutura: [
          'Administração Financeira',
          'Gestão de Pessoas',
          'Marketing e Estratégia',
          'Empreendedorismo',
        ],
        diferenciais: [
          'Professores com experiência de mercado.',
          'Projetos práticos e estudos de caso.',
        ],
        egresso: [
          'Capacidade de liderança e tomada de decisão.',
          'Visão estratégica para gestão organizacional.',
        ],
      },
    },
  }),

  withSeo({
    id: 'dir',
    title: 'Direito',
    level: 'graduacao',
    type: 'Bacharelado',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/direito.webp',
    imageSrc: 'assets/cursos/rota/dire.webp',
    applyHref: '/admissions?curso=direito',

    content: {
      lead:
        'Formar profissionais éticos e críticos preparados para atuar nas diversas áreas do Direito.',
      coordinator: 'Professor Alef Guerra',
      matrixUrl: 'https://drive.google.com/',
      sections: {
        objetivos: [
          'Formação jurídica sólida com visão crítica.',
          'Capacitação para atuação em diversas áreas do Direito.',
        ],
        estrutura: [
          'Direito Constitucional',
          'Direito Civil',
          'Direito Penal',
          'Direito Empresarial',
        ],
        diferenciais: [
          'Núcleo de prática jurídica.',
          'Projetos de extensão comunitária.',
        ],
        egresso: [
          'Capacidade de interpretação jurídica.',
          'Preparação para carreiras públicas e privadas.',
        ],
      },
    },
  }),

  withSeo({
    id: 'ped',
    title: 'Pedagogia',
    level: 'graduacao',
    type: 'Licenciatura',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/pedagogia.webp',
    imageSrc: 'assets/cursos/rota/ped.webp',
    applyHref: '/admissions?curso=pedagogia',

    content: {
      lead:
        'Formação de educadores preparados para atuar na educação básica e na gestão educacional.',
      coordinator: 'Coordenação de Pedagogia',
      matrixUrl: 'https://drive.google.com/',
      sections: {
        objetivos: [
          'Formar profissionais comprometidos com a educação.',
          'Desenvolver competências pedagógicas.',
        ],
      },
    },
  }),

  withSeo({
    id: 'rad',
    title: 'Radiologia',
    level: 'graduacao',
    type: 'Tecnólogo',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/radiologia.webp',
    imageSrc: 'assets/cursos/rota/radio.webp',
    applyHref: '/admissions?curso=radiologia',

    content: {
      lead:
        'Formação tecnológica voltada para diagnóstico por imagem e práticas laboratoriais.',
      coordinator: 'Coordenação de Radiologia',
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'pos-direito-penal',
    title: 'Direito Penal e Processo Penal',
    level: 'pos',
    type: 'Especialização',
    modality: 'EAD',
    imageFront: 'assets/cursos/modal/pos-direito-penal.png',
    imageSrc: 'assets/cursos/rota/pos-direito-penal.png',
    applyHref: '/admissions?curso=direito-penal-processo-penal',

    content: {
      lead:
        'Especialização voltada para aprofundamento teórico e prático em Direito Penal e Processo Penal.',
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'pos-direito-imobiliario',
    title: 'Direito Imobiliário e Regularização Fundiária',
    level: 'pos',
    type: 'Especialização',
    modality: 'EAD',
    imageFront: 'assets/cursos/modal/pos-direito-imobiliario.png',
    imageSrc: 'assets/cursos/rota/pos-direito-imobiliario.png',
    applyHref: '/admissions?curso=direito-imobiliario',

    content: {
      lead:
        'Especialização voltada para atuação jurídica no setor imobiliário e regularização fundiária.',
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'pos-gestao-operacoes',
    title: 'Gestão de Operações',
    level: 'pos',
    type: 'Especialização',
    modality: 'EAD',
    imageFront: 'assets/cursos/modal/pos-gestao-operacoes.png',
    imageSrc: 'assets/cursos/rota/pos-gestao-operacoes.png',
    applyHref: '/admissions?curso=gestao-operacoes',

    content: {
      lead:
        'Especialização focada na gestão estratégica de processos e operações organizacionais.',
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'pos-ia-negocios',
    title: 'Inteligência Artificial Aplicada aos Negócios',
    level: 'pos',
    type: 'Especialização',
    modality: 'EAD',
    imageFront: 'assets/cursos/modal/pos-ia-negocios.png',
    imageSrc: 'assets/cursos/rota/pos-ia-negocios.png',
    applyHref: '/admissions?curso=ia-negocios',

    content: {
      lead:
        'Especialização voltada para aplicação prática de inteligência artificial em ambientes corporativos.',
      matrixUrl: 'https://drive.google.com/',
    },
  }),
];

export default COURSES;