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
    imageFront: 'assets/cursos/modal/radiologia.jpg',
    imageSrc: 'assets/cursos/rota/radiologia.jpg',
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
  }),

  withSeo({
    id: 'pos-neuropsicopedagogia',
    title: 'Neuropsicopedagogia',
    level: 'pos',
    type: 'Especialização',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/pos-neuropsicopedagogia.png',
    imageSrc: 'assets/cursos/rota/pos-neuropsicopedagogia.png',
    applyHref: '/admissions?curso=neuropsicopedagogia',

    content: {
      lead: `Transforme a sua vocação de ensinar e cuidar em excelência técnica com a Pós-Graduação 100% presencial em Neuropsicopedagogia da Faculdade Filos.

  Criada para profissionais da Educação, Saúde e Gestão de Pessoas, o nosso objetivo é capacitá-lo para avaliar, intervir e prevenir transtornos de aprendizagem.

  Domine a união entre neurociência, pedagogia e psicologia, atuando com segurança e embasamento tanto no ambiente clínico quanto no escolar.

  Em um mercado com alta demanda por inclusão, o nosso diferencial é a prática real e o networking que só a sala de aula física proporciona.

  Torne-se a referência da sua região na elaboração de diagnósticos precisos e planos de intervenção que realmente transformam a cognição e a emoção.

  Eleve o seu impacto social, a sua valorização financeira e a confiança nos seus atendimentos ao mais alto patamar.

  A verdadeira inclusão exige especialistas atualizados: garanta a sua vaga e assuma o protagonismo na sua carreira!`,
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  // ========================================================
  // INÍCIO DOS CURSOS EXTENSIONISTAS
  // ========================================================

  withSeo({
    id: 'ext-qualidade-imagem',
    title: 'Controle de Qualidade de Imagem e Artefatos Médicos',
    level: 'extensao',
    type: 'Extensão',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/ext-qualidade-imagem.png',
    imageSrc: 'assets/cursos/rota/ext-qualidade-imagem.png',
    applyHref: '/admissions?curso=controle-qualidade-imagem',
    content: {
      lead: `O que será ministrado: Descubra o que diferencia um exame perfeito de um exame falho e evite erros médicos. Derivado da nossa conceituada Pós-Graduação em Ressonância Magnética e Diagnóstico por Imagem, este curso treina o seu olhar clínico. O aluno aprenderá a identificar os chamados "artefatos" — que são manchas, distorções ou borrões nas imagens causados por movimento do paciente, presença de metais ou falhas técnicas do aparelho. O objetivo é fornecer um senso crítico apurado para que você atue diretamente no controle de qualidade dos exames, garantindo que apenas imagens nítidas e precisas cheguem às mãos dos médicos radiologistas nas clínicas de Águas Lindas e do DF.
      
Público-alvo: Aberto ao público em geral. Perfeito para assistentes de radiologia, digitadores de laudos médicos, profissionais de suporte técnico de clínicas de imagem e qualquer pessoa interessada em atuar na área de qualidade e triagem na saúde. Não é exigida formação superior prévia.

Carga Horária: 50 horas.

Certificação: Curso de extensão com certificação oficial da Faculdade Filos, com base acadêmica vinculada à especialização em Ressonância Magnética.`,
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'ext-vendas-digitais',
    title: 'Vendas Digitais (Redes Sociais e WhatsApp Business)',
    level: 'extensao',
    type: 'Extensão',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/ext-vendas-digitais.png',
    imageSrc: 'assets/cursos/rota/ext-vendas-digitais.png',
    applyHref: '/admissions?curso=vendas-digitais',
    content: {
      lead: `O que será ministrado: Transforme o celular em uma ferramenta de alta conversão. Este curso prático ensina a atrair clientes através do Instagram, criar publicações estratégicas e utilizar o WhatsApp Business para fechar negócios com agilidade. O aluno aprenderá a organizar catálogos, automatizar o atendimento e criar um canal de vendas direto e rentável, perfeitamente adaptado à realidade do comércio local.

Público-alvo: Aberto ao público em geral. Essencial para lojistas, prestadores de serviços, trabalhadores independentes e vendedores que buscam alavancar suas vendas online sem necessidade de formação superior ou conhecimentos técnicos prévios.

Carga Horária: 50 horas.

Certificação: Curso de extensão com certificação oficial emitida pela instituição.`,
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'ext-atendimento-fidelizacao',
    title: 'Excelência no Atendimento e Fidelização de Clientes',
    level: 'extensao',
    type: 'Extensão',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/ext-atendimento-fidelizacao.png',
    imageSrc: 'assets/cursos/rota/ext-atendimento-fidelizacao.png',
    applyHref: '/admissions?curso=atendimento-fidelizacao',
    content: {
      lead: `O que será ministrado: Este curso revela as estratégias fundamentais para encantar o cliente desde o primeiro contato, diferenciando o seu negócio da concorrência. O aluno aprenderá técnicas avançadas de comunicação assertiva, resolução inteligente de conflitos e reclamações, além de práticas de fidelização que garantem que o consumidor compre, retorne e indique a sua empresa. O foco é elevar o padrão de qualidade e humanização no atendimento local.

Público-alvo: Aberto ao público em geral. Ideal para profissionais em busca de destaque no mercado de trabalho, bem como para empresários, gerentes e líderes que necessitam treinar e qualificar suas equipes de linha de frente para um serviço impecável.

Carga Horária: 50 horas.

Certificação: Curso de extensão com certificação oficial emitida pela instituição.`,
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'ext-tecnicas-vendas',
    title: 'Técnicas de Vendas e Negociação de Alto Impacto',
    level: 'extensao',
    type: 'Extensão',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/ext-tecnicas-vendas.png',
    imageSrc: 'assets/cursos/rota/ext-tecnicas-vendas.png',
    applyHref: '/admissions?curso=tecnicas-vendas',
    content: {
      lead: `O que será ministrado: Um treinamento intensivo focado puramente em conversão e resultados práticos para o dia a dia do comércio de Águas Lindas e região. Derivado da nossa prestigiada Pós-Graduação em Gestão de Operações 4.0: Varejo, Atacado e Indústria, este curso de extensão traduz estratégias avançadas de mercado para a sua realidade. O aluno dominará os gatilhos mentais que influenciam a decisão de compra, aprenderá a contornar objeções difíceis com naturalidade e aplicará táticas de persuasão que aceleram o fechamento de negócios. O foco é ensinar a ler o comportamento do cliente, apresentar soluções irrecusáveis e criar um diferencial competitivo forte e lucrativo.

Público-alvo: Aberto ao público em geral. Ideal para vendedores de loja, corretores, pequenos empreendedores e profissionais autônomos que vivem de comissões e desejam aumentar seus rendimentos de forma sólida e estruturada. Não é necessária qualquer formação superior prévia.

Carga Horária: 50 horas.

Certificação: Curso de extensão com certificação oficial da Faculdade Filos, com base acadêmica vinculada à especialização em Gestão de Operações 4.0.`,
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'ext-dominio-ias',
    title: 'Domínio das I.As: Criação de Textos e Imagens com Inteligência Artificial',
    level: 'extensao',
    type: 'Extensão',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/ext-dominio-ias.png',
    imageSrc: 'assets/cursos/rota/ext-dominio-ias.png',
    applyHref: '/admissions?curso=dominio-ias',
    content: {
      lead: `O que será ministrado: Aprenda a se comunicar de forma exata com as ferramentas de Inteligência Artificial mais modernas do mercado para obter resultados rápidos e precisos. Derivado da nossa Pós-Graduação em Inteligência Artificial Aplicada: Negócios e Gestão Pública, este curso descomplica a tecnologia para o uso diário. O aluno aprenderá a criar os comandos corretos (prompts) no ChatGPT e em geradores de imagem para redigir documentos, planejar tarefas, criar conteúdos atrativos para redes sociais e otimizar a rotina de trabalho. O objetivo é extrair o máximo potencial da tecnologia para multiplicar a sua produtividade, mesmo que você não tenha qualquer conhecimento técnico de informática.

Público-alvo: Aberto ao público em geral. Ideal para estudantes, pequenos empreendedores de Águas Lindas e região, vendedores, prestadores de serviços e qualquer profissional que deseje poupar tempo e elevar a qualidade do seu trabalho diário.

Carga Horária: 50 horas.

Certificação: Curso de extensão com certificação oficial da Faculdade Filos, com base acadêmica vinculada à especialização em Inteligência Artificial Aplicada.`,
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'ext-automacao-nocode',
    title: 'Automação Prática sem Programação (No-Code)',
    level: 'extensao',
    type: 'Extensão',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/ext-automacao-nocode.png',
    imageSrc: 'assets/cursos/rota/ext-automacao-nocode.png',
    applyHref: '/admissions?curso=automacao-nocode',
    content: {
      lead: `O que será ministrado: Um guia totalmente prático para colocar a tecnologia para trabalhar por você de forma automática. Este curso de extensão, estruturado a partir da nossa Pós-Graduação em Inteligência Artificial Aplicada: Negócios e Gestão Pública, traduz a automação de processos complexos em passos simples e visuais. O aluno aprenderá a conectar diferentes ferramentas do dia a dia para criar fluxos de trabalho automáticos (como organizar planilhas de clientes, enviar mensagens padronizadas em massa ou gerenciar contatos), tudo isso sem precisar escrever uma única linha de código de programação. O objetivo é eliminar o trabalho manual e repetitivo da sua rotina.

Público-alvo: Aberto ao público em geral. Perfeito para donos de pequenos negócios em Águas Lindas, profissionais liberais, assistentes administrativos e trabalhadores autônomos que buscam reduzir erros, otimizar processos e ganhar tempo livre na sua jornada de trabalho. Não exige formação superior ou conhecimento prévio em TI.

Carga Horária: 50 horas.

Certificação: Curso de extensão com certificação oficial da Faculdade Filos, com base acadêmica vinculada à especialização em Inteligência Artificial Aplicada.`,
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'ext-direito-penal-seguranca',
    title: 'Noções de Direito Penal e Segurança Cidadã',
    level: 'extensao',
    type: 'Extensão',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/ext-direito-penal.png',
    imageSrc: 'assets/cursos/rota/ext-direito-penal.png',
    applyHref: '/admissions?curso=direito-penal-seguranca',
    content: {
      lead: `O que será ministrado: Um manual prático de sobrevivência e cidadania para o dia a dia. Derivado da nossa conceituada Pós-Graduação em Direito Penal e Processual Penal, este curso traduz a linguagem jurídica complexa para a realidade do cidadão comum. O aluno aprenderá conceitos fundamentais sobre o que configura um crime, quais são os seus direitos e deveres constitucionais durante abordagens policiais, os limites legais da legítima defesa e como o sistema de segurança pública funciona na prática. O objetivo é fornecer o conhecimento exato para que você saiba como agir, como se proteger legalmente e como evitar abusos de autoridade.

Público-alvo: Aberto ao público em geral. Essencial para líderes comunitários de Águas Lindas e região, vigilantes, agentes de segurança privada, síndicos e qualquer cidadão que deseje conhecer seus direitos fundamentais e atuar de forma segura na sociedade. Não exige formação superior prévia.

Carga Horária: 50 horas.

Certificação: Curso de extensão com certificação oficial da Faculdade Filos, com base acadêmica vinculada à especialização em Direito Penal e Processual Penal.`,
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'ext-maria-da-penha',
    title: 'Lei Maria da Penha e Proteção à Família',
    level: 'extensao',
    type: 'Extensão',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/ext-maria-da-penha.png',
    imageSrc: 'assets/cursos/rota/ext-maria-da-penha.png',
    applyHref: '/admissions?curso=maria-da-penha',
    content: {
      lead: `O que será ministrado: Um guia essencial de conscientização e proteção. Extraído da nossa Pós-Graduação em Direito Penal e Processual Penal, este curso de extensão oferece um entendimento prático da Lei Maria da Penha, adaptado para a realidade social de Águas Lindas. O aluno aprenderá a identificar os diferentes tipos de violência (física, psicológica, patrimonial e moral), como funcionam as medidas protetivas de urgência e qual é o passo a passo para buscar auxílio nos órgãos competentes da nossa região. O objetivo é formar agentes multiplicadores de informação que saibam acolher, orientar e proteger vítimas dentro de suas comunidades.

Público-alvo: Aberto ao público em geral. Essencial para líderes de associações de bairro, conselheiros tutelares, assistentes sociais, educadores e qualquer cidadão engajado na proteção à família e combate à violência doméstica. Não é exigida formação superior.

Carga Horária: 50 horas.

Certificação: Curso de extensão com certificação oficial da Faculdade Filos, com base acadêmica vinculada à especialização em Direito Penal e Processual Penal.`,
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'ext-reurb-introducao',
    title: 'Introdução à Regularização de Imóveis (A Lei da REURB)',
    level: 'extensao',
    type: 'Extensão',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/ext-reurb-introducao.png',
    imageSrc: 'assets/cursos/rota/ext-reurb-introducao.png',
    applyHref: '/admissions?curso=introducao-reurb',
    content: {
      lead: `O que será ministrado: Este curso descomplica as leis de regularização fundiária, um tema de extrema urgência e relevância para Águas Lindas e região. Derivado da nossa conceituada Pós-Graduação em Direito Imobiliário e Regularização Fundiária, o treinamento ensina, de forma clara e acessível, o que é a REURB (Regularização Fundiária Urbana), quem tem o direito de legalizar o seu lote e quais são os tipos de regularização existentes (Social e Específica). O aluno entenderá como a legislação atual funciona para proteger a posse e a propriedade, combatendo a desinformação e construindo a base de conhecimento necessária para compreender o processo de legalização de áreas urbanas com total segurança jurídica.

Público-alvo: Aberto ao público em geral. Ideal para moradores, líderes comunitários, presidentes de associações de bairro, corretores de imóveis iniciantes e qualquer cidadão que deseje entender como garantir a segurança legal do seu patrimônio. Não é necessária qualquer formação superior prévia.

Carga Horária: 50 horas.

Certificação: Curso de extensão com certificação oficial da Faculdade Filos, com base acadêmica vinculada à especialização em Direito Imobiliário.`,
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'ext-reurb-pratica',
    title: 'REURB na Prática (O Passo a Passo da Legalização)',
    level: 'extensao',
    type: 'Extensão',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/ext-reurb-pratica.png',
    imageSrc: 'assets/cursos/rota/ext-reurb-pratica.png',
    applyHref: '/admissions?curso=reurb-pratica',
    content: {
      lead: `O que será ministrado: Um curso totalmente focado na ação e na resolução de problemas reais da nossa região. Extraído da nossa prestigiada Pós-Graduação em Direito Imobiliário e Regularização Fundiária, este treinamento ensina o passo a passo exato de como reunir a documentação correta, preencher os requerimentos técnicos, dar entrada nos pedidos junto à prefeitura de Águas Lindas (e municípios vizinhos) e acompanhar o processo até a emissão da documentação final no cartório. É o roteiro prático, atualizado e sem burocracia excessiva para tirar um imóvel da irregularidade, desenhado especificamente para quem deseja atuar prestando esse serviço essencial.

Público-alvo: Aberto ao público em geral. Excelente para assistentes administrativos, despachantes, síndicos, presidentes de associações de bairro e pessoas com visão empreendedora que pretendam atuar profissionalmente com serviços de apoio à regularização de lotes na comunidade. Não exige formação superior prévia.

Carga Horária: 50 horas.

Certificação: Curso de extensão com certificação oficial da Faculdade Filos, com base acadêmica vinculada à especialização em Direito Imobiliário.`,
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'ext-biosseguranca-ressonancia',
    title: 'Biossegurança e Prevenção de Acidentes em Ressonância',
    level: 'extensao',
    type: 'Extensão',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/ext-biosseguranca.png',
    imageSrc: 'assets/cursos/rota/ext-biosseguranca.png',
    applyHref: '/admissions?curso=biosseguranca-ressonancia',
    content: {
      lead: `O que será ministrado: Domine as regras vitais para salvar vidas e evitar acidentes graves no ambiente de diagnóstico por imagem. Derivado da nossa conceituada Pós-Graduação em Ressonância Magnética e Diagnóstico por Imagem, este curso ensina, de forma prática e direta, os perigos reais do forte campo magnético (que está sempre ligado). O aluno aprenderá como fazer a triagem rigorosa de pacientes, identificar implantes metálicos proibidos (como marcapassos antigos e projéteis de arma de fogo) e agir com rapidez e exatidão em situações de emergência. O objetivo é formar profissionais altamente preparados para garantir um ambiente 100% seguro para a equipe e para os pacientes nas clínicas e hospitais da nossa região.

Público-alvo: Aberto ao público em geral. Essencial para maqueiros, profissionais de limpeza hospitalar, recepcionistas, técnicos de enfermagem, bombeiros civis e qualquer trabalhador de Águas Lindas e do DF que precise circular com total segurança dentro de setores de radiologia. Não exige formação superior prévia.

Carga Horária: 50 horas.

Certificação: Curso de extensão com certificação oficial da Faculdade Filos, com base acadêmica vinculada à especialização em Ressonância Magnética.`,
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'ext-anatomia-seccional',
    title: 'Anatomia Seccional (Leitura Básica de Exames de Imagem)',
    level: 'extensao',
    type: 'Extensão',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/ext-anatomia-seccional.png',
    imageSrc: 'assets/cursos/rota/ext-anatomia-seccional.png',
    applyHref: '/admissions?curso=anatomia-seccional',
    content: {
      lead: `O que será ministrado: Aprenda, de forma simples e visual, a identificar as estruturas do corpo humano em cortes de imagem. Extraído da nossa prestigiada Pós-Graduação em Ressonância Magnética e Diagnóstico por Imagem, este curso descomplica a anatomia humana, ensinando como reconhecer órgãos, ossos e tecidos normais em exames reais. O objetivo é capacitar o aluno para compreender o básico da linguagem médica e radiológica, facilitando a rotina de atendimento, o agendamento correto de procedimentos e o fluxo de trabalho nas clínicas, hospitais e laboratórios de Águas Lindas e do Distrito Federal.

Público-alvo: Aberto ao público em geral. Ideal para recepcionistas de clínicas de imagem, auxiliares de saúde, maqueiros, estudantes de cursos técnicos e qualquer pessoa que deseje ingressar ou se destacar no mercado de trabalho de diagnóstico por imagem, sem a necessidade prévia de um curso superior na área da saúde.

Carga Horária: 50 horas.

Certificação: Curso de extensão com certificação oficial da Faculdade Filos, com base acadêmica vinculada à especialização em Ressonância Magnética.`,
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'ext-praticas-inclusao',
    title: 'Práticas de Inclusão e Direitos na Educação',
    level: 'extensao',
    type: 'Extensão',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/ext-praticas-inclusao.png',
    imageSrc: 'assets/cursos/rota/ext-praticas-inclusao.png',
    applyHref: '/admissions?curso=praticas-inclusao',
    content: {
      lead: `O que será ministrado: Um guia prático sobre como garantir o direito de todos à educação e promover a verdadeira inclusão em Águas Lindas e região. Derivado da nossa conceituada Pós-Graduação em Neuropsicopedagogia Aplicada, este curso aborda a legislação atual de inclusão e ensina formas simples e eficazes de adaptar o ambiente, a comunicação e as atividades para pessoas com necessidades específicas (como autismo, TDAH e deficiências físicas ou intelectuais). O foco é transformar a teoria em ação, combatendo o preconceito e criando espaços de ensino, trabalho e convivência que sejam verdadeiramente acolhedores e preparados para todos.

Público-alvo: Aberto ao público em geral. Ideal para monitores escolares, assistentes administrativos de escolas, famílias de alunos atípicos, líderes de projetos sociais e qualquer cidadão que queira atuar como agente ativo de inclusão na sociedade. Não exige formação superior prévia.

Carga Horária: 50 horas.

Certificação: Curso de extensão com certificação oficial da Faculdade Filos, com base acadêmica vinculada à especialização em Neuropsicopedagogia Aplicada.`,
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'ext-ferramentas-digitais',
    title: 'Ferramentas Digitais e Gamificação no Ensino',
    level: 'extensao',
    type: 'Extensão',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/ext-ferramentas-digitais.png',
    imageSrc: 'assets/cursos/rota/ext-ferramentas-digitais.png',
    applyHref: '/admissions?curso=ferramentas-digitais',
    content: {
      lead: `O que será ministrado: Aprenda a criar aulas, treinamentos e apresentações que prendem a atenção do público do início ao fim usando a tecnologia a seu favor. Extraído da nossa moderna Pós-Graduação em Docência do Ensino Superior e Inovação Educacional, este curso apresenta ferramentas práticas e gratuitas para criar conteúdos interativos, jogos educativos (gamificação) e o uso de recursos digitais para facilitar o ensino. O foco é abandonar o modelo tradicional e cansativo, adotando um formato dinâmico que gera engajamento real e aprendizado acelerado em qualquer tipo de treinamento, sala de aula ou workshop na região de Águas Lindas.

Público-alvo: Aberto ao público em geral. Perfeito para instrutores de treinamentos em empresas locais, tutores, influenciadores que criam conteúdo educativo, professores da rede básica e qualquer profissional interessado em educação digital e inovadora. Não exige formação superior prévia.

Carga Horária: 50 horas.

Certificação: Curso de extensão com certificação oficial da Faculdade Filos, com base acadêmica vinculada à especialização em Docência do Ensino Superior.`,
      matrixUrl: 'https://drive.google.com/',
    },
  }),

  withSeo({
    id: 'ext-oratoria-desinibicao',
    title: 'Oratória, Desinibição e Comunicação Assertiva',
    level: 'extensao',
    type: 'Extensão',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/ext-oratoria-desinibicao.png',
    imageSrc: 'assets/cursos/rota/ext-oratoria-desinibicao.png',
    applyHref: '/admissions?curso=oratoria',
    content: {
      lead: `O que será ministrado: Perca o medo de falar em público e domine as técnicas de comunicação dos grandes oradores. Derivado da nossa renomada Pós-Graduação em Docência do Ensino Superior e Inovação Educacional, este curso ensina, na prática, como organizar o seu pensamento, controlar o nervosismo, projetar a voz com clareza e utilizar a linguagem corporal para transmitir confiança e credibilidade. O objetivo é transformar o seu conhecimento em apresentações impactantes e persuasivas, seja em uma sala de aula, em uma reunião de negócios, na igreja ou em um palco na região de Águas Lindas.

Público-alvo: Aberto ao público em geral. Ideal para líderes religiosos, professores, vendedores, profissionais que desejam ministrar palestras, estudantes e qualquer pessoa que precise falar em público com segurança. Não exige formação superior prévia.

Carga Horária: 50 horas.

Certificação: Curso de extensão com certificação oficial da Faculdade Filos, com base acadêmica vinculada à especialização em Docência do Ensino Superior.`,
      matrixUrl: 'https://drive.google.com/',
    },
  }),
];

export default COURSES;