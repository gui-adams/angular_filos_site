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
      coordinator: 'José Dias',
      matrixUrl: 'https://drive.google.com/file/d/1e7fJ_wK2NL96lDHu6J3L945j6qVelp3-/view',
      sections: {
        objetivos: [
          'Proporcionar uma formação sólida em gestão, liderança e tomada de decisão.',
          'Desenvolver competências para planejar, organizar e dirigir processos.',
          'Preparar profissionais para os desafios do mercado globalizado.',
          'Estimular o empreendedorismo e a inovação.',
        ],
        estrutura: [
          'Formação Básica: Economia, Contabilidade e Matemática.',
          'Formação Profissional: Gestão de Pessoas, Marketing e Finanças.',
          'Prática: Projetos integradores e estágios supervisionados.',
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
      coordinator: 'Alef Guerra',
      matrixUrl: 'https://drive.google.com/file/d/1uUE9CH9VdhcdiiaE6fSjqUp8HP63SxBO/view',
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
      coordinator: 'Elimar Pereira dos Reis',
      matrixUrl: 'https://drive.google.com/file/d/1YSCgVNylFvMcCxdPEw68ecNcEHLpry9r/view',
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
      coordinator: 'Amariles Monteiro Cabral Procópio',
      matrixUrl: 'https://faculdadefilos.edu.br/cursos/radiologia',
    },
  }),

  withSeo({
    id: 'pos-direito-penal',
    title: 'Direito Penal e Processo Penal',
    level: 'pos',
    type: 'Especialização',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/pos-direito-penal.png',
    imageSrc: 'assets/cursos/rota/pos-direito-penal.png',
    applyHref: '/admissions?curso=direito-penal-processo-penal',

    content: {
      lead: `Criada para advogados e operadores do direito de sucesso neste mercado competitivo, com o objetivo de especializá-lo para o verdadeiro enfrentamento da justiça criminal.

    Esta Pós-Graduação será a chave para que você domine todo o ecossistema desta pauta, desde a investigação defensiva até os tribunais superiores, atualizando-se com as mais recentes reformas legislativas.

    Nesse mercado saturado, o nosso diferencial é a prática real e o networking poderoso que só a sala de aula física proporciona.

    Torne-se a principal referência técnica da sua região, capaz de converter conhecimento em teses combativas e vencedoras.

    Eleve os seus honorários e a sua confiança profissional ao mais alto patamar.

    A justiça não espera por quem está desatualizado: garanta a sua vaga e assuma o controle da sua carreira!`,
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'pos-direito-imobiliario',
    title: 'Direito Imobiliário e Regularização Fundiária',
    level: 'pos',
    type: 'Especialização',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/pos-direito-imobiliario.png',
    imageSrc: 'assets/cursos/rota/pos-direito-imobiliario.png',
    applyHref: '/admissions?curso=direito-imobiliario',

    content: {
      lead: `O mercado imobiliário exige segurança absoluta e profissionais capacitados para atuarem em todo esse ecossistema com as suas camadas.

    Este curso é voltado estrategicamente para corretores de imóveis, advogados e qualquer profissional portador de diploma superior que atue nesse setor.

    Nosso objetivo é capacitar você com ferramentas teóricas e práticas essenciais para o mercado. Garanta a realização de negócios imobiliários totalmente seguros e blindados contra imprevistos.

    Domine desde a análise rigorosa de risco (due diligence) até a complexa formalização registral.

    Seja a referência na solução ágil de conflitos judiciais e extrajudiciais, no caso de advogados, envolvendo a propriedade ou qualquer transação imobiliária.

    Proteja transações patrimoniais e atue com maestria em toda a cadeia produtiva desse mercado dinâmico.

    Alavanque sua carreira de forma definitiva dominando as engrenagens práticas do Direito Imobiliário.`,
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'pos-gestao-operacoes',
    title: 'Gestão de Operações',
    level: 'pos',
    type: 'Especialização',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/pos-gestao-operacoes.png',
    imageSrc: 'assets/cursos/rota/pos-gestao-operacoes.png',
    applyHref: '/admissions?curso=gestao-operacoes',

    content: {
      lead: `O mercado de Águas Lindas e região busca desesperadamente por líderes táticos preparados.

    Se você é graduado, tecnólogo, empresário, gerente, supervisor, administrador ou atua nesse campo, assuma o controle.

    Nossa Pós em Gestão de Operações 4.0 atende proprietários de farmácias, supermercados, restaurantes e agronegócios, ou seus gerentes e gestores.

    O objetivo principal é formar um gestor "mão na massa" e estratégico nos resultados, focado no verdadeiro "fazer acontecer".

    Domine a operação real de grandes empresas, liderando diretamente no chão de loja e na linha de produção.

    Acelere sua carreira com uma abordagem 100% prática e totalmente focada na resolução de cases reais.

    Aprenda a organizar processos, gerenciar estoques complexos e calcular preços com precisão absoluta (Markup e CMV).

    Desenvolva as competências necessárias para liderar equipes de alto volume com excelência tática.

    Seja capaz de atuar desde um grande Atacadão até redes varejistas e unidades industriais, lojas ou necessidades afins.

    Domine a gestão de operações de pequeno, médio e grande porte, destacando-se definitivamente no mercado.`,
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'pos-ia-negocios',
    title: 'Inteligência Artificial Aplicada aos Negócios',
    level: 'pos',
    type: 'Especialização',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/pos-ia-negocios.png',
    imageSrc: 'assets/cursos/rota/pos-ia-negocios.png',
    applyHref: '/admissions?curso=ia-negocios',

    content: {
      lead: `A Inteligência Artificial não é o futuro, é o presente, e você não pode ficar de fora.

    Se você é empresário, advogado, engenheiro, pedagogo ou atuante em sua profissão, assuma a liderança. Este curso é essencial também para servidores públicos que buscam inovação, resultados e um posicionamento estratégico no local de trabalho.

    O objetivo é transformar você em um líder indispensável, dominando ferramentas tecnológicas ágeis.

    Multiplique sua produtividade, desburocratize rotinas e otimize seu tempo de forma definitiva.

    Com uma abordagem 100% focada na prática, você reduzirá custos e elevará sua performance.

    Melhore o nível da sua tomada de decisão tanto na iniciativa privada quanto na gestão pública.

    Ingresse em um ecossistema de alto nível para profissionais com diploma de nível superior.

    Não fique para trás no mercado: use a IA como a chave para alavancar sua carreira agora mesmo.`,
      matrixUrl: 'https://drive.google.com/',
    },
  }),

withSeo({
  id: 'pos-docencia-ensino-superior',
  title: 'Docência no Ensino Superior',
  level: 'pos',
  type: 'Especialização',
  modality: 'Presencial',
  imageFront: 'assets/cursos/modal/pos-docencia-ensino-superior.png',
  imageSrc: 'assets/cursos/rota/pos-docencia-ensino-superior.png',
  applyHref: '/admissions?curso=docencia-ensino-superior',

  content: {
    lead: `Transforme sua expertise profissional em inspiração para as próximas gerações do mercado.

Este curso é destinado a profissionais graduados nas mais diversas áreas de conhecimento que desejam atuar no ensino superior com excelência.

Nosso objetivo é qualificar especialistas para o cenário educacional contemporâneo, conectando teoria pedagógica, prática docente e as demandas reais do mercado.

Desenvolva todas as competências e habilidades necessárias para atuar como docente no Ensino Superior com segurança, didática e autoridade acadêmica.

Domine as mais modernas metodologias ativas de aprendizagem, os fundamentos da andragogia e o uso estratégico de tecnologias educacionais.

Supere o modelo tradicional de ensino, criando ambientes de aprendizagem inclusivos, inovadores e centrados no estudante.

Aprenda a estruturar planejamentos pedagógicos eficientes, elaborar planos de ensino consistentes e aplicar avaliações formativas que realmente desenvolvam competências.

Torne-se um professor universitário protagonista, preparado para os desafios acadêmicos e para a formação de profissionais de alto nível.

Alavanque sua carreira com autoridade intelectual, didática impecável e capacidade de ensino reconhecida.`,
    matrixUrl: 'https://drive.google.com/',
  },
}), 

withSeo({
  id: 'pos-ressonancia-magnetica',
  title: 'Ressonância Magnética',
  level: 'pos',
  type: 'Especialização',
  modality: 'Presencial',
  imageFront: 'assets/cursos/modal/pos-ressonancia-magnetica.png',
  imageSrc: 'assets/cursos/rota/pos-ressonancia-magnetica.png',
  applyHref: '/admissions?curso=ressonancia-magnetica',

  content: {
    lead: `O mercado de saúde exige precisão absoluta e profissionais altamente qualificados em diagnóstico por imagem.

Este curso é voltado para Tecnólogos em Radiologia, Biomédicos, Físicos Médicos, Enfermeiros, Médicos e demais profissionais da área da saúde que atuem ou desejem atuar nesse campo.

É a especialização ideal para portadores de diploma superior na área da saúde ou áreas afins que buscam aprofundamento técnico e avanço na carreira.

Nosso objetivo é capacitar você plenamente para atuar de forma especializada em Ressonância Magnética.

Desenvolva competências técnico-científicas, éticas e operacionais exigidas pelos grandes hospitais e centros de diagnóstico por imagem.

Domine com excelência a execução, a otimização minuciosa e a análise de exames complexos.

Aprofunde-se nos fundamentos físicos e tecnológicos da ressonância magnética e na aplicação prática de protocolos clínicos.

Assegure a mais alta qualidade diagnóstica, garantindo o cumprimento rigoroso das normas de segurança e proteção ao paciente.

Eleve sua carreira dominando a tecnologia de imagem e torne-se referência na segurança, qualidade e precisão dos exames.`,
    matrixUrl: 'https://drive.google.com/',
  },
})
];
export default COURSES;