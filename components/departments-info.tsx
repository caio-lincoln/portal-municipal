"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  Search,
  Construction,
  Lightbulb,
  Trees,
  Droplets,
  AlertCircle,
  Users,
  Heart,
  GraduationCap,
  Shield,
  Volume2,
} from "lucide-react"
import { useAccessibility } from "@/components/accessibility-provider"

interface Department {
  id: string
  name: string
  category: string
  icon: any
  description: string
  problems: string[]
  phone: string
  email: string
  address: string
  hours: string
  emergencyPhone?: string
}

const departments: Department[] = [
  {
    id: "1",
    name: "Secretaria Municipal de Infraestrutura",
    category: "Infraestrutura",
    icon: Construction,
    description: "Responsável pela manutenção e obras de infraestrutura urbana",
    problems: [
      "Ruas esburacadas",
      "Calçadas danificadas",
      "Pontes e viadutos",
      "Drenagem e pavimentação",
      "Obras públicas",
    ],
    phone: "(79) 3179-1400",
    email: "infraestrutura@aracaju.se.gov.br",
    address: "Av. Ivo do Prado, 250 - Centro, Aracaju - SE",
    hours: "Segunda a Sexta: 8h às 14h",
  },
  {
    id: "2",
    name: "Empresa Municipal de Serviços Urbanos (EMSURB)",
    category: "Limpeza Urbana",
    icon: Trees,
    description: "Responsável pela limpeza urbana e manutenção de áreas verdes",
    problems: ["Coleta de lixo", "Limpeza de ruas", "Poda de árvores", "Capina e roçagem", "Remoção de entulho"],
    phone: "(79) 3179-1900",
    email: "emsurb@aracaju.se.gov.br",
    address: "Rua Frei Luís Canolo de Noronha, 70 - Grageru, Aracaju - SE",
    hours: "Segunda a Sexta: 7h às 13h",
  },
  {
    id: "3",
    name: "Companhia de Saneamento de Sergipe (DESO)",
    category: "Saneamento",
    icon: Droplets,
    description: "Responsável pelo abastecimento de água e esgoto",
    problems: ["Falta de água", "Vazamento de água", "Esgoto entupido", "Esgoto a céu aberto", "Qualidade da água"],
    phone: "0800 079 0195",
    emergencyPhone: "115",
    email: "atendimento@deso-se.com.br",
    address: "Av. Hermes Fontes, 1901 - Salgado Filho, Aracaju - SE",
    hours: "24 horas (emergências)",
  },
  {
    id: "4",
    name: "Energisa Sergipe",
    category: "Energia Elétrica",
    icon: Lightbulb,
    description: "Responsável pela distribuição de energia elétrica",
    problems: [
      "Falta de energia",
      "Postes danificados",
      "Iluminação pública",
      "Fiação exposta",
      "Religação de energia",
    ],
    phone: "0800 079 0196",
    emergencyPhone: "116",
    email: "atendimento@energisa.com.br",
    address: "Av. Tancredo Neves, 5655 - Jabotiana, Aracaju - SE",
    hours: "24 horas (emergências)",
  },
  {
    id: "5",
    name: "Secretaria Municipal de Saúde (SMS)",
    category: "Saúde",
    icon: Heart,
    description: "Responsável pela saúde pública municipal",
    problems: ["Atendimento em UBS", "Vacinação", "Dengue e zoonoses", "Vigilância sanitária", "Medicamentos"],
    phone: "(79) 3179-1800",
    emergencyPhone: "192 (SAMU)",
    email: "saude@aracaju.se.gov.br",
    address: "Av. Augusto Franco, 2260 - Siqueira Campos, Aracaju - SE",
    hours: "Segunda a Sexta: 7h às 17h",
  },
  {
    id: "6",
    name: "Secretaria Municipal de Educação (SEMED)",
    category: "Educação",
    icon: GraduationCap,
    description: "Responsável pela educação municipal",
    problems: [
      "Matrícula escolar",
      "Transporte escolar",
      "Merenda escolar",
      "Infraestrutura escolar",
      "Professores e funcionários",
    ],
    phone: "(79) 3179-1500",
    email: "semed@aracaju.se.gov.br",
    address: "Rua Pacatuba, 320 - Centro, Aracaju - SE",
    hours: "Segunda a Sexta: 8h às 14h",
  },
  {
    id: "7",
    name: "Guarda Municipal de Aracaju",
    category: "Segurança",
    icon: Shield,
    description: "Responsável pela segurança municipal e patrimônio público",
    problems: [
      "Segurança em prédios públicos",
      "Fiscalização de trânsito",
      "Proteção ambiental",
      "Eventos públicos",
      "Patrimônio municipal",
    ],
    phone: "(79) 3179-2100",
    emergencyPhone: "153",
    email: "guardamunicipal@aracaju.se.gov.br",
    address: "Av. Beira Mar, 1020 - Atalaia, Aracaju - SE",
    hours: "24 horas",
  },
  {
    id: "8",
    name: "Secretaria Municipal de Assistência Social (SEMAS)",
    category: "Assistência Social",
    icon: Users,
    description: "Responsável pela assistência social e programas sociais",
    problems: [
      "Cadastro Único",
      "Bolsa Família",
      "Abrigos e acolhimento",
      "Programas sociais",
      "Assistência a vulneráveis",
    ],
    phone: "(79) 3179-1700",
    email: "semas@aracaju.se.gov.br",
    address: "Rua Santa Luzia, 680 - São José, Aracaju - SE",
    hours: "Segunda a Sexta: 8h às 14h",
  },
]

export function DepartmentsInfo() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const { speak } = useAccessibility()

  const categories = ["all", ...Array.from(new Set(departments.map((d) => d.category)))]

  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch =
      searchTerm === "" ||
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.problems.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || dept.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleCall = (phone: string, deptName: string) => {
    speak(`Ligando para ${deptName}`)
    window.location.href = `tel:${phone.replace(/\D/g, "")}`
  }

  const handleEmail = (email: string, deptName: string) => {
    speak(`Abrindo email para ${deptName}`)
    window.location.href = `mailto:${email}`
  }

  const handleListen = (dept: Department) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
    }

    if (speakingId === dept.id) {
      setSpeakingId(null)
      return
    }

    setSpeakingId(dept.id)

    const problemsList = dept.problems.join(", ")
    const emergencyText = dept.emergencyPhone ? ` Telefone de emergência: ${dept.emergencyPhone}.` : ""

    const fullText = `
      ${dept.name}. 
      ${dept.description}. 
      Problemas que resolve: ${problemsList}. 
      Telefone: ${dept.phone}.${emergencyText}
      E-mail: ${dept.email}. 
      Endereço: ${dept.address}. 
      Horário de funcionamento: ${dept.hours}.
    `

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(fullText)
      utterance.lang = "pt-BR"
      utterance.rate = 0.9
      utterance.onend = () => {
        setSpeakingId(null)
      }
      utterance.onerror = () => {
        setSpeakingId(null)
      }
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">Órgãos Responsáveis</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Encontre o órgão responsável para resolver seu problema e entre em contato diretamente
        </p>
      </div>

      <Card>
        <CardContent className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
            <Input
              placeholder="Buscar por problema, órgão ou serviço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 sm:pl-10 h-11 sm:h-12 text-base"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-xs sm:text-sm min-h-[36px] sm:min-h-[40px]"
              >
                {category === "all" ? "Todas as Categorias" : category}
              </Button>
            ))}
          </div>

          {filteredDepartments.length > 0 && (
            <p className="text-xs sm:text-sm text-gray-600">
              {filteredDepartments.length}{" "}
              {filteredDepartments.length === 1 ? "órgão encontrado" : "órgãos encontrados"}
            </p>
          )}
        </CardContent>
      </Card>

      {filteredDepartments.length === 0 ? (
        <Card>
          <CardContent className="p-8 sm:p-12 text-center">
            <AlertCircle className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Nenhum órgão encontrado</h3>
            <p className="text-sm sm:text-base text-gray-600">Tente ajustar sua busca ou selecionar outra categoria</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:gap-6">
          {filteredDepartments.map((dept) => {
            const Icon = dept.icon
            return (
              <Card key={dept.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-3 sm:pb-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base sm:text-lg md:text-xl text-blue-900 mb-1 sm:mb-2">
                        {dept.name}
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {dept.category}
                      </Badge>
                    </div>
                    <Button
                      variant={speakingId === dept.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleListen(dept)}
                      className="flex-shrink-0"
                      aria-label={speakingId === dept.id ? "Parar de ouvir" : "Ouvir informações"}
                    >
                      <Volume2 className={`h-4 w-4 ${speakingId === dept.id ? "animate-pulse" : ""}`} />
                    </Button>
                  </div>
                  <CardDescription className="text-xs sm:text-sm mt-2 sm:mt-3">{dept.description}</CardDescription>
                </CardHeader>

                <CardContent className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">
                      Problemas que resolve:
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {dept.problems.map((problem, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {problem}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm font-medium text-gray-700">Telefone</p>
                          <button
                            onClick={() => handleCall(dept.phone, dept.name)}
                            className="text-xs sm:text-sm text-blue-600 hover:underline break-all"
                          >
                            {dept.phone}
                          </button>
                          {dept.emergencyPhone && (
                            <p className="text-xs text-red-600 font-semibold mt-1">Emergência: {dept.emergencyPhone}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start gap-2 sm:gap-3">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm font-medium text-gray-700">E-mail</p>
                          <button
                            onClick={() => handleEmail(dept.email, dept.name)}
                            className="text-xs sm:text-sm text-blue-600 hover:underline break-all"
                          >
                            {dept.email}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm font-medium text-gray-700">Endereço</p>
                          <p className="text-xs sm:text-sm text-gray-600">{dept.address}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 sm:gap-3">
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm font-medium text-gray-700">Horário</p>
                          <p className="text-xs sm:text-sm text-gray-600">{dept.hours}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4 border-t">
                    <Button
                      variant={speakingId === dept.id ? "default" : "outline"}
                      onClick={() => handleListen(dept)}
                      className="flex-1 min-h-[44px] text-sm sm:text-base"
                    >
                      <Volume2 className={`h-4 w-4 mr-2 ${speakingId === dept.id ? "animate-pulse" : ""}`} />
                      {speakingId === dept.id ? "Parar de Ouvir" : "Ouvir Informações"}
                    </Button>
                    <Button
                      onClick={() => handleCall(dept.phone, dept.name)}
                      className="flex-1 min-h-[44px] text-sm sm:text-base"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Ligar Agora
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleEmail(dept.email, dept.name)}
                      className="flex-1 min-h-[44px] text-sm sm:text-base"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Enviar E-mail
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
