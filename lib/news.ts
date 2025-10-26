export type NewsItem = {
  id: string
  title: string
  category: string
  date: string
  excerpt: string
  content: string
  fullContent: string[]
  image?: string
  author?: string
  tags?: string[]
}

export const newsItems: NewsItem[] = [
  {
    id: "N001",
    title: "Prefeitura anuncia novo programa de pavimentação",
    category: "Infraestrutura",
    date: "23/01/2024",
    author: "Secretaria de Infraestrutura",
    excerpt: "Serão investidos R$ 15 milhões na pavimentação de 50 ruas em diversos bairros da cidade.",
    content:
      "A Prefeitura de Aracaju anunciou hoje um novo programa de pavimentação que beneficiará mais de 20 bairros...",
    fullContent: [
      "A Prefeitura de Aracaju anunciou hoje um novo programa de pavimentação que beneficiará mais de 20 bairros da cidade. O investimento total será de R$ 15 milhões, recursos provenientes de convênio com o governo estadual e contrapartida municipal.",
      "Serão pavimentadas 50 ruas, totalizando aproximadamente 35 quilômetros de vias. As obras começarão pelos bairros com maior demanda e seguirão um cronograma que prioriza áreas com maior fluxo de veículos e pedestres.",
      "O secretário de Infraestrutura, João Silva, destacou que 'este é um dos maiores programas de pavimentação dos últimos anos. Estamos trabalhando para melhorar a mobilidade urbana e a qualidade de vida dos cidadãos de Aracaju'.",
      "As obras incluem não apenas a pavimentação asfáltica, mas também a construção de calçadas acessíveis, instalação de meio-fio e melhorias no sistema de drenagem pluvial. O prazo estimado para conclusão de todas as etapas é de 18 meses.",
      "A população pode acompanhar o andamento das obras através do portal da transparência da prefeitura, onde será disponibilizado um mapa interativo com todas as ruas contempladas e o status de cada obra.",
    ],
    image: "/street-paving.jpg",
    tags: ["Infraestrutura", "Pavimentação", "Obras", "Mobilidade"],
  },
  {
    id: "N002",
    title: "Campanha de vacinação contra a gripe começa na próxima semana",
    category: "Saúde",
    date: "22/01/2024",
    author: "Secretaria Municipal de Saúde",
    excerpt: "Postos de saúde estarão abertos em horário estendido para atender a população.",
    content: "A Secretaria Municipal de Saúde informa que a campanha de vacinação contra a gripe terá início...",
    fullContent: [
      "A Secretaria Municipal de Saúde informa que a campanha de vacinação contra a gripe terá início na próxima segunda-feira, dia 29 de janeiro. Todas as Unidades Básicas de Saúde (UBS) da cidade estarão preparadas para atender a população.",
      "A campanha tem como público prioritário idosos acima de 60 anos, crianças de 6 meses a 5 anos, gestantes, puérperas, trabalhadores da saúde, professores, pessoas com doenças crônicas e imunossuprimidos.",
      "Para facilitar o acesso da população, as UBSs funcionarão em horário estendido durante a campanha, das 7h às 19h em dias úteis, e das 8h às 12h aos sábados. Não é necessário agendamento prévio.",
      "A meta é vacinar 90% do público-alvo, o que corresponde a aproximadamente 150 mil pessoas. A vacina é segura e a melhor forma de prevenção contra a gripe e suas complicações.",
      "É importante levar documento de identidade, cartão do SUS e carteira de vacinação. Pessoas com febre ou sintomas gripais devem aguardar a recuperação antes de se vacinar.",
    ],
    image: "/vaccination-campaign.jpg",
    tags: ["Saúde", "Vacinação", "Gripe", "Prevenção"],
  },
  {
    id: "N003",
    title: "Matrículas para a rede municipal de ensino estão abertas",
    category: "Educação",
    date: "20/01/2024",
    author: "Secretaria Municipal de Educação",
    excerpt: "Pais e responsáveis podem realizar a matrícula online ou presencialmente até 15 de fevereiro.",
    content: "A Secretaria Municipal de Educação informa que as matrículas para o ano letivo de 2024 estão abertas...",
    fullContent: [
      "A Secretaria Municipal de Educação informa que as matrículas para o ano letivo de 2024 estão abertas desde o dia 15 de janeiro. O processo pode ser realizado de forma online através do portal da prefeitura ou presencialmente nas escolas da rede municipal.",
      "São oferecidas vagas para educação infantil (creche e pré-escola), ensino fundamental I e II, e Educação de Jovens e Adultos (EJA). A rede municipal conta com 85 escolas distribuídas por todos os bairros da cidade.",
      "Para realizar a matrícula online, os pais ou responsáveis devem acessar o portal, preencher o formulário com os dados do aluno e anexar os documentos necessários: certidão de nascimento, comprovante de residência, carteira de vacinação atualizada e documento de identidade do responsável.",
      "O prazo para matrículas vai até 15 de fevereiro. As aulas terão início no dia 5 de março. A secretaria reforça a importância de realizar a matrícula dentro do prazo para garantir a vaga na escola mais próxima da residência.",
      "Em caso de dúvidas, os pais podem entrar em contato com a Central de Atendimento da Secretaria de Educação pelo telefone 0800-123-4567 ou comparecer pessoalmente à sede da secretaria.",
    ],
    image: "/school-enrollment.jpg",
    tags: ["Educação", "Matrícula", "Escola", "Ensino"],
  },
  {
    id: "N004",
    title: "Novo parque será inaugurado no bairro Jardins",
    category: "Meio Ambiente",
    date: "18/01/2024",
    author: "Secretaria de Meio Ambiente",
    excerpt: "Espaço contará com área de lazer, pista de caminhada e playground.",
    content: "A Prefeitura de Aracaju inaugura no próximo mês um novo parque no bairro Jardins...",
    fullContent: [
      "A Prefeitura de Aracaju inaugura no próximo mês um novo parque no bairro Jardins, ampliando as áreas verdes e de lazer da cidade. O Parque Municipal Jardins terá 25 mil metros quadrados de área total.",
      "O novo espaço contará com pista de caminhada de 1,2 km, ciclovia, playground infantil, academia ao ar livre, quadras poliesportivas, área para piquenique e um lago ornamental. Toda a infraestrutura foi projetada seguindo critérios de acessibilidade.",
      "Foram plantadas mais de 500 árvores nativas da região, incluindo ipês, oitis e cajueiros. O paisagismo foi desenvolvido priorizando espécies que atraem pássaros e borboletas, contribuindo para a biodiversidade urbana.",
      "O parque terá iluminação LED, sistema de segurança com câmeras, banheiros públicos e uma área administrativa. O horário de funcionamento será das 5h às 22h todos os dias, com equipe de manutenção e segurança.",
      "A inauguração está prevista para o dia 15 de fevereiro e contará com programação especial incluindo apresentações culturais, atividades esportivas e educação ambiental para crianças.",
    ],
    image: "/city-park.png",
    tags: ["Meio Ambiente", "Parque", "Lazer", "Área Verde"],
  },
  {
    id: "N005",
    title: "Programa de capacitação profissional oferece 500 vagas",
    category: "Trabalho e Renda",
    date: "15/01/2024",
    author: "Secretaria de Trabalho e Renda",
    excerpt: "Cursos gratuitos em diversas áreas para qualificação da população.",
    content: "A Secretaria de Trabalho e Renda está com inscrições abertas para cursos de capacitação profissional...",
    fullContent: [
      "A Secretaria de Trabalho e Renda está com inscrições abertas para cursos de capacitação profissional gratuitos. São 500 vagas distribuídas em 15 cursos diferentes, voltados para diversas áreas do mercado de trabalho.",
      "Os cursos oferecidos incluem: Assistente Administrativo, Informática Básica e Avançada, Marketing Digital, Vendas e Atendimento ao Cliente, Eletricista Predial, Encanador, Pedreiro, Costura Industrial, Cozinheiro, Panificação, Manicure e Pedicure, Cabeleireiro, Auxiliar de Logística, Operador de Empilhadeira e Inglês Básico.",
      "As aulas serão realizadas no Centro de Capacitação Profissional, localizado no centro da cidade, e em polos descentralizados nos bairros. Os cursos têm duração de 2 a 4 meses, com carga horária entre 80 e 160 horas.",
      "Para se inscrever, é necessário ter no mínimo 16 anos, ensino fundamental completo (para a maioria dos cursos) e disponibilidade para frequentar as aulas. As inscrições podem ser feitas online ou presencialmente na sede da secretaria.",
      "Ao final do curso, os alunos recebem certificado reconhecido e têm acesso ao banco de empregos da prefeitura, que conecta os capacitados com empresas parceiras que oferecem oportunidades de trabalho.",
    ],
    image: "/professional-training.png",
    tags: ["Trabalho", "Capacitação", "Emprego", "Qualificação"],
  },
  {
    id: "N006",
    title: "UBSs ampliam horário de funcionamento durante campanha de vacinação",
    category: "Saúde",
    date: "25/01/2024",
    excerpt: "Unidades estarão abertas até 20h em dias úteis para aumentar cobertura vacinal.",
    content:
      "Para garantir maior adesão à campanha de vacinação, as UBSs da capital ampliarão o horário de atendimento...",
    fullContent: [],
    image: "/vaccination-campaign.jpg",
    tags: [],
  },
  {
    id: "N007",
    title: "Iluminação pública recebe lâmpadas LED em 30 bairros",
    category: "Infraestrutura",
    date: "27/01/2024",
    excerpt: "Troca de lâmpadas aumenta segurança e reduz consumo de energia.",
    content: "O programa de modernização da iluminação pública segue avançando com a instalação de lâmpadas LED...",
    fullContent: [],
    image: "/placeholder.jpg",
    tags: [],
  },
  {
    id: "N008",
    title: "Merenda escolar terá cardápio saudável e regionalizado",
    category: "Educação",
    date: "28/01/2024",
    excerpt: "Novo cardápio inclui frutas, legumes e alimentos típicos da região.",
    content: "A rede municipal de ensino adotará um cardápio mais saudável e com alimentos regionais, promovendo...",
    fullContent: [],
    image: "/school-enrollment.jpg",
    tags: [],
  },
  {
    id: "N009",
    title: "Coleta seletiva é ampliada para novos bairros da zona norte",
    category: "Meio Ambiente",
    date: "29/01/2024",
    excerpt: "Expansão da coleta seletiva contribui para redução de resíduos e reciclagem.",
    content:
      "A ampliação da coleta seletiva alcança mais 12 bairros, com a instalação de ecopontos e campanhas educativas...",
    fullContent: [],
    image: "/placeholder.jpg",
    tags: [],
  },
  {
    id: "N010",
    title: "Feira de empregos municipal reúne empresas e oferece 800 vagas",
    category: "Trabalho e Renda",
    date: "30/01/2024",
    excerpt: "Ação conecta trabalhadores a oportunidades com apoio de orientação profissional.",
    content: "A feira de empregos promovida pela Prefeitura contará com empresas parceiras e serviços de orientação...",
    fullContent: [],
    image: "/professional-training.png",
    tags: [],
  },
  {
    id: "N011",
    title: "Reforma de pontes melhora mobilidade entre bairros",
    category: "Infraestrutura",
    date: "01/02/2024",
    excerpt: "Obras de recuperação estrutural e alargamento de calçadas estão em andamento.",
    content: "As obras de reforma em duas pontes importantes seguem em ritmo acelerado, com melhorias de mobilidade...",
    fullContent: [],
    image: "/street-paving.jpg",
    tags: [],
  },
  {
    id: "N012",
    title: "Mutirão de exames reduz fila de diagnóstico",
    category: "Saúde",
    date: "02/02/2024",
    excerpt: "Ação conjunta realiza atendimentos extras nos fins de semana.",
    content: "Com o mutirão de exames de imagem e laboratoriais, a fila de espera foi reduzida significativamente...",
    fullContent: [],
    image: "/placeholder.jpg",
    tags: [],
  },
  {
    id: "N013",
    title: "Olimpíada Municipal de Matemática abre inscrições",
    category: "Educação",
    date: "03/02/2024",
    excerpt: "Estudantes do ensino fundamental podem participar em diferentes categorias.",
    content: "A Olimpíada Municipal de Matemática busca incentivar o estudo de ciências exatas nas escolas públicas...",
    fullContent: [],
    image: "/placeholder.jpg",
    tags: [],
  },
  {
    id: "N014",
    title: "Plantio de 5 mil mudas reforça arborização urbana",
    category: "Meio Ambiente",
    date: "04/02/2024",
    excerpt: "A iniciativa integra o plano municipal de sustentabilidade.",
    content: "Em parceria com instituições e voluntários, o município realizará o plantio de 5 mil mudas em áreas...",
    fullContent: [],
    image: "/city-park.png",
    tags: [],
  },
  {
    id: "N015",
    title: "Programa de qualificação digital para jovens",
    category: "Trabalho e Renda",
    date: "05/02/2024",
    excerpt: "Cursos de tecnologia voltados para primeiro emprego e empreendedorismo.",
    content: "O programa de qualificação digital oferecerá cursos de programação, design e marketing para jovens...",
    fullContent: [],
    image: "/professional-training.png",
    tags: [],
  },
]

export function getNewsById(id: string) {
  return newsItems.find((n) => n.id === id)
}

export function getRelatedNews(currentId: string, category: string, limit = 3) {
  return newsItems.filter((n) => n.id !== currentId && n.category === category).slice(0, limit)
}
