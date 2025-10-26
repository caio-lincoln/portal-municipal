"use client"

import { useState } from "react"
import {
  Accessibility,
  Eye,
  Type,
  Palette,
  ZoomIn,
  Volume2,
  BookOpen,
  Brain,
  Focus,
  Sparkles,
  LayoutGrid,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useAccessibility } from "@/components/accessibility-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AccessibilityModal() {
  const [open, setOpen] = useState(false)
  const {
    highContrast,
    toggleHighContrast,
    fontSize,
    setFontSize,
    colorBlindMode,
    setColorBlindMode,
    contrastBoost,
    toggleContrastBoost,
    pageZoom,
    setPageZoom,
    dyslexiaFont,
    toggleDyslexiaFont,
    lineSpacing,
    setLineSpacing,
    letterSpacing,
    setLetterSpacing,
    focusMode,
    toggleFocusMode,
    readingGuide,
    toggleReadingGuide,
    simplifiedLayout,
    toggleSimplifiedLayout,
    animationsReduced,
    toggleAnimationsReduced,
    iconsOnly,
    toggleIconsOnly,
  } = useAccessibility()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 bg-blue-700 hover:bg-blue-800"
          aria-label="Abrir configurações de acessibilidade"
        >
          <Accessibility className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Accessibility className="h-6 w-6 text-primary" />
            </div>
            Central de Acessibilidade
          </DialogTitle>
          <p className="text-muted-foreground text-sm mt-2">
            Personalize sua experiência para melhor atender suas necessidades
          </p>
        </DialogHeader>

        <Tabs defaultValue="visual" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="visual" className="gap-2">
              <Eye className="h-4 w-4" />
              Visual
            </TabsTrigger>
            <TabsTrigger value="cognitive" className="gap-2">
              <Brain className="h-4 w-4" />
              Cognitivo
            </TabsTrigger>
            <TabsTrigger value="reading" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Leitura
            </TabsTrigger>
          </TabsList>

          {/* Visual Tab */}
          <TabsContent value="visual" className="space-y-6 mt-6">
            {/* High Contrast */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <Label htmlFor="high-contrast" className="text-base font-semibold cursor-pointer">
                      Alto Contraste
                    </Label>
                    <p className="text-sm text-muted-foreground">Aumenta o contraste entre texto e fundo</p>
                  </div>
                </div>
                <Switch id="high-contrast" checked={highContrast} onCheckedChange={toggleHighContrast} />
              </div>

              {/* Contrast Boost */}
              <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <Label htmlFor="contrast-boost" className="text-base font-semibold cursor-pointer">
                      Reforço de Contraste
                    </Label>
                    <p className="text-sm text-muted-foreground">Intensifica ainda mais o contraste visual</p>
                  </div>
                </div>
                <Switch id="contrast-boost" checked={contrastBoost} onCheckedChange={toggleContrastBoost} />
              </div>
            </div>

            <Separator />

            {/* Font Size */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Type className="h-5 w-5 text-primary" />
                <Label className="text-base font-semibold">Tamanho da Fonte</Label>
              </div>
              <RadioGroup
                value={fontSize}
                onValueChange={(v) => setFontSize(v as any)}
                className="grid grid-cols-3 gap-3"
              >
                <div>
                  <RadioGroupItem value="normal" id="font-normal" className="peer sr-only" />
                  <Label
                    htmlFor="font-normal"
                    className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                  >
                    <Type className="h-5 w-5 mb-2" />
                    <span className="text-sm font-medium">Normal</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="large" id="font-large" className="peer sr-only" />
                  <Label
                    htmlFor="font-large"
                    className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                  >
                    <Type className="h-6 w-6 mb-2" />
                    <span className="text-sm font-medium">Grande</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="xlarge" id="font-xlarge" className="peer sr-only" />
                  <Label
                    htmlFor="font-xlarge"
                    className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                  >
                    <Type className="h-7 w-7 mb-2" />
                    <span className="text-sm font-medium">Muito Grande</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            {/* Page Zoom */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ZoomIn className="h-5 w-5 text-primary" />
                <Label className="text-base font-semibold">Zoom da Página</Label>
              </div>
              <RadioGroup
                value={String(pageZoom)}
                onValueChange={(v) => setPageZoom(Number(v) as any)}
                className="grid grid-cols-3 gap-3"
              >
                <div>
                  <RadioGroupItem value="100" id="zoom-100" className="peer sr-only" />
                  <Label
                    htmlFor="zoom-100"
                    className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                  >
                    <span className="text-lg font-semibold mb-1">100%</span>
                    <span className="text-xs text-muted-foreground">Padrão</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="125" id="zoom-125" className="peer sr-only" />
                  <Label
                    htmlFor="zoom-125"
                    className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                  >
                    <span className="text-lg font-semibold mb-1">125%</span>
                    <span className="text-xs text-muted-foreground">Médio</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="150" id="zoom-150" className="peer sr-only" />
                  <Label
                    htmlFor="zoom-150"
                    className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                  >
                    <span className="text-lg font-semibold mb-1">150%</span>
                    <span className="text-xs text-muted-foreground">Grande</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            {/* Color Blind Mode */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Palette className="h-5 w-5 text-primary" />
                <Label className="text-base font-semibold">Modo Daltonismo</Label>
              </div>
              <RadioGroup
                value={colorBlindMode}
                onValueChange={(v) => setColorBlindMode(v as any)}
                className="space-y-2"
              >
                {[
                  { value: "none", label: "Nenhum", desc: "Cores padrão" },
                  { value: "grayscale", label: "Escala de Cinza", desc: "Remove todas as cores" },
                  { value: "deuteranopia", label: "Deuteranopia", desc: "Dificuldade com verde" },
                  { value: "protanopia", label: "Protanopia", desc: "Dificuldade com vermelho" },
                  { value: "tritanopia", label: "Tritanopia", desc: "Dificuldade com azul" },
                ].map((mode) => (
                  <div key={mode.value}>
                    <RadioGroupItem value={mode.value} id={`cb-${mode.value}`} className="peer sr-only" />
                    <Label
                      htmlFor={`cb-${mode.value}`}
                      className="flex items-center justify-between rounded-lg border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                    >
                      <div>
                        <div className="font-medium">{mode.label}</div>
                        <div className="text-sm text-muted-foreground">{mode.desc}</div>
                      </div>
                      <div className="h-6 w-6 rounded-full border-2 peer-data-[state=checked]:border-primary" />
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </TabsContent>

          {/* Cognitive Tab */}
          <TabsContent value="cognitive" className="space-y-6 mt-6">
            {/* Focus Mode */}
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Focus className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <Label htmlFor="focus-mode" className="text-base font-semibold cursor-pointer">
                    Modo Foco
                  </Label>
                  <p className="text-sm text-muted-foreground">Destaca o conteúdo principal e reduz distrações</p>
                </div>
              </div>
              <Switch id="focus-mode" checked={focusMode} onCheckedChange={toggleFocusMode} />
            </div>

            {/* Simplified Layout */}
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <Label htmlFor="simplified-layout" className="text-base font-semibold cursor-pointer">
                    Layout Simplificado
                  </Label>
                  <p className="text-sm text-muted-foreground">Interface mais limpa com menos elementos visuais</p>
                </div>
              </div>
              <Switch id="simplified-layout" checked={simplifiedLayout} onCheckedChange={toggleSimplifiedLayout} />
            </div>

            {/* Icons Only */}
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <LayoutGrid className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <Label htmlFor="icons-only" className="text-base font-semibold cursor-pointer">
                    Somente Ícones
                  </Label>
                  <p className="text-sm text-muted-foreground">Mostra apenas ícones no menu lateral para simplificar</p>
                </div>
              </div>
              <Switch id="icons-only" checked={iconsOnly} onCheckedChange={toggleIconsOnly} />
            </div>

            {/* Reduced Animations */}
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Volume2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <Label htmlFor="reduced-animations" className="text-base font-semibold cursor-pointer">
                    Reduzir Animações
                  </Label>
                  <p className="text-sm text-muted-foreground">Minimiza movimentos e transições na interface</p>
                </div>
              </div>
              <Switch id="reduced-animations" checked={animationsReduced} onCheckedChange={toggleAnimationsReduced} />
            </div>

            {/* Line Spacing */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Type className="h-5 w-5 text-primary" />
                <Label className="text-base font-semibold">Espaçamento entre Linhas</Label>
              </div>
              <RadioGroup
                value={lineSpacing}
                onValueChange={(v) => setLineSpacing(v as any)}
                className="grid grid-cols-3 gap-3"
              >
                {[
                  { value: "normal", label: "Normal", height: "h-8" },
                  { value: "relaxed", label: "Relaxado", height: "h-10" },
                  { value: "loose", label: "Amplo", height: "h-12" },
                ].map((spacing) => (
                  <div key={spacing.value}>
                    <RadioGroupItem value={spacing.value} id={`line-${spacing.value}`} className="peer sr-only" />
                    <Label
                      htmlFor={`line-${spacing.value}`}
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                    >
                      <div className={`w-full ${spacing.height} flex flex-col justify-around mb-2`}>
                        <div className="w-full h-0.5 bg-current" />
                        <div className="w-full h-0.5 bg-current" />
                        <div className="w-full h-0.5 bg-current" />
                      </div>
                      <span className="text-sm font-medium">{spacing.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Separator />

            {/* Letter Spacing */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Type className="h-5 w-5 text-primary" />
                <Label className="text-base font-semibold">Espaçamento entre Letras</Label>
              </div>
              <RadioGroup
                value={letterSpacing}
                onValueChange={(v) => setLetterSpacing(v as any)}
                className="grid grid-cols-3 gap-3"
              >
                {[
                  { value: "normal", label: "Normal", spacing: "tracking-normal" },
                  { value: "wide", label: "Amplo", spacing: "tracking-wide" },
                  { value: "wider", label: "Muito Amplo", spacing: "tracking-wider" },
                ].map((spacing) => (
                  <div key={spacing.value}>
                    <RadioGroupItem value={spacing.value} id={`letter-${spacing.value}`} className="peer sr-only" />
                    <Label
                      htmlFor={`letter-${spacing.value}`}
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                    >
                      <span className={`text-lg font-semibold mb-2 ${spacing.spacing}`}>ABC</span>
                      <span className="text-sm font-medium">{spacing.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </TabsContent>

          {/* Reading Tab */}
          <TabsContent value="reading" className="space-y-6 mt-6">
            {/* Dyslexia Font */}
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <Label htmlFor="dyslexia-font" className="text-base font-semibold cursor-pointer">
                    Fonte para Dislexia
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Usa fonte especialmente desenhada para facilitar a leitura
                  </p>
                </div>
              </div>
              <Switch id="dyslexia-font" checked={dyslexiaFont} onCheckedChange={toggleDyslexiaFont} />
            </div>

            {/* Reading Guide */}
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Focus className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <Label htmlFor="reading-guide" className="text-base font-semibold cursor-pointer">
                    Guia de Leitura
                  </Label>
                  <p className="text-sm text-muted-foreground">Destaca a linha atual durante a leitura</p>
                </div>
              </div>
              <Switch id="reading-guide" checked={readingGuide} onCheckedChange={toggleReadingGuide} />
            </div>

            <Separator />

            <div className="p-6 rounded-lg bg-muted/50 border-2 border-dashed">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Volume2 className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Leitor de Tela</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Este portal é totalmente compatível com leitores de tela como NVDA, JAWS e VoiceOver. Todas as
                    notificações e conteúdos importantes possuem suporte para síntese de voz integrada.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Use as teclas de atalho do seu leitor de tela para navegar pelos marcos da página (landmarks) e
                    cabeçalhos.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-6 border-t">
          <Button onClick={() => setOpen(false)} className="w-full" size="lg">
            Aplicar Configurações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
