export type NewsItem = {
  id: string
  title: string
  category: string
  date: string
  excerpt: string
  content: string
  image?: string
}

export const newsItems: NewsItem[] = [
  {
    id: "N001",
    title: "Prefeitura anuncia novo programa de pavimentação",
    category: "Infraestrutura",
    date: "23/01/2024",
    excerpt: "Serão investidos R$ 15 milhões na pavimentação de 50 ruas em diversos bairros da cidade.",
    content:
      "A Prefeitura de Aracaju anunciou hoje um novo programa de pavimentação que beneficiará mais de 20 bairros...",
    image: "/street-paving.jpg",
  },
  {
    id: "N002",
    title: "Campanha de vacinação contra a gripe começa na próxima semana",
    category: "Saúde",
    date: "22/01/2024",
    excerpt: "Postos de saúde estarão abertos em horário estendido para atender a população.",
    content: "A Secretaria Municipal de Saúde informa que a campanha de vacinação contra a gripe terá início...",
    image: "/vaccination-campaign.jpg",
  },
  {
    id: "N003",
    title: "Matrículas para a rede municipal de ensino estão abertas",
    category: "Educação",
    date: "20/01/2024",
    excerpt: "Pais e responsáveis podem realizar a matrícula online ou presencialmente até 15 de fevereiro.",
    content:
      "A Secretaria Municipal de Educação informa que as matrículas para o ano letivo de 2024 estão abertas...",
    image: "/school-enrollment.jpg",
  },
  {
    id: "N004",
    title: "Novo parque será inaugurado no bairro Jardins",
    category: "Meio Ambiente",
    date: "18/01/2024",
    excerpt: "Espaço contará com área de lazer, pista de caminhada e playground.",
    content: "A Prefeitura de Aracaju inaugura no próximo mês um novo parque no bairro Jardins...",
    image: "/city-park.png",
  },
  {
    id: "N005",
    title: "Programa de capacitação profissional oferece 500 vagas",
    category: "Trabalho e Renda",
    date: "15/01/2024",
    excerpt: "Cursos gratuitos em diversas áreas para qualificação da população.",
    content:
      "A Secretaria de Trabalho e Renda está com inscrições abertas para cursos de capacitação profissional...",
    image: "/professional-training.png",
  },
  // Itens mockados adicionais
  {
    id: "N006",
    title: "UBSs ampliam horário de funcionamento durante campanha de vacinação",
    category: "Saúde",
    date: "25/01/2024",
    excerpt: "Unidades estarão abertas até 20h em dias úteis para aumentar cobertura vacinal.",
    content:
      "Para garantir maior adesão à campanha de vacinação, as UBSs da capital ampliarão o horário de atendimento...",
    image: "/vaccination-campaign.jpg",
  },
  {
    id: "N007",
    title: "Iluminação pública recebe lâmpadas LED em 30 bairros",
    category: "Infraestrutura",
    date: "27/01/2024",
    excerpt: "Troca de lâmpadas aumenta segurança e reduz consumo de energia.",
    content:
      "O programa de modernização da iluminação pública segue avançando com a instalação de lâmpadas LED...",
    image: "/placeholder.jpg",
  },
  {
    id: "N008",
    title: "Merenda escolar terá cardápio saudável e regionalizado",
    category: "Educação",
    date: "28/01/2024",
    excerpt: "Novo cardápio inclui frutas, legumes e alimentos típicos da região.",
    content:
      "A rede municipal de ensino adotará um cardápio mais saudável e com alimentos regionais, promovendo...",
    image: "/school-enrollment.jpg",
  },
  {
    id: "N009",
    title: "Coleta seletiva é ampliada para novos bairros da zona norte",
    category: "Meio Ambiente",
    date: "29/01/2024",
    excerpt: "Expansão da coleta seletiva contribui para redução de resíduos e reciclagem.",
    content:
      "A ampliação da coleta seletiva alcança mais 12 bairros, com a instalação de ecopontos e campanhas educativas...",
    image: "/placeholder.jpg",
  },
  {
    id: "N010",
    title: "Feira de empregos municipal reúne empresas e oferece 800 vagas",
    category: "Trabalho e Renda",
    date: "30/01/2024",
    excerpt: "Ação conecta trabalhadores a oportunidades com apoio de orientação profissional.",
    content:
      "A feira de empregos promovida pela Prefeitura contará com empresas parceiras e serviços de orientação...",
    image: "/professional-training.png",
  },
  {
    id: "N011",
    title: "Reforma de pontes melhora mobilidade entre bairros",
    category: "Infraestrutura",
    date: "01/02/2024",
    excerpt: "Obras de recuperação estrutural e alargamento de calçadas estão em andamento.",
    content:
      "As obras de reforma em duas pontes importantes seguem em ritmo acelerado, com melhorias de mobilidade...",
    image: "/street-paving.jpg",
  },
  {
    id: "N012",
    title: "Mutirão de exames reduz fila de diagnóstico",
    category: "Saúde",
    date: "02/02/2024",
    excerpt: "Ação conjunta realiza atendimentos extras nos fins de semana.",
    content:
      "Com o mutirão de exames de imagem e laboratoriais, a fila de espera foi reduzida significativamente...",
    image: "/placeholder.jpg",
  },
  {
    id: "N013",
    title: "Olimpíada Municipal de Matemática abre inscrições",
    category: "Educação",
    date: "03/02/2024",
    excerpt: "Estudantes do ensino fundamental podem participar em diferentes categorias.",
    content:
      "A Olimpíada Municipal de Matemática busca incentivar o estudo de ciências exatas nas escolas públicas...",
    image: "/placeholder.jpg",
  },
  {
    id: "N014",
    title: "Plantio de 5 mil mudas reforça arborização urbana",
    category: "Meio Ambiente",
    date: "04/02/2024",
    excerpt: "A iniciativa integra o plano municipal de sustentabilidade.",
    content:
      "Em parceria com instituições e voluntários, o município realizará o plantio de 5 mil mudas em áreas...",
    image: "/city-park.png",
  },
  {
    id: "N015",
    title: "Programa de qualificação digital para jovens",
    category: "Trabalho e Renda",
    date: "05/02/2024",
    excerpt: "Cursos de tecnologia voltados para primeiro emprego e empreendedorismo.",
    content:
      "O programa de qualificação digital oferecerá cursos de programação, design e marketing para jovens...",
    image: "/professional-training.png",
  },
]

export function getNewsById(id: string) {
  return newsItems.find((n) => n.id === id)
}