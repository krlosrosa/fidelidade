'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Building2,
  UserRound,
  MessageSquareText,
  Palette,
  Smile,
  Meh,
  Languages,
  Sparkles,
  BadgeInfo,
  CheckCircle2,
  Loader2
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type BusinessInfo = {
  businessName: string
  businessType: string
  description: string
  targetAudience: string
  tone: 'formal' | 'friendly' | 'enthusiastic' | 'professional' | 'funny'
  mainProducts: string[]
  brandColor: string
  language: string
  personalityTraits: string[]
  exampleMessages: string[]
}

export default function BusinessProfilePage() {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    businessName: '',
    businessType: '',
    description: '',
    targetAudience: '',
    tone: 'friendly',
    mainProducts: [''],
    brandColor: '#3b82f6',
    language: 'pt-BR',
    personalityTraits: [],
    exampleMessages: ['']
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const businessTypes = [
    'Restaurante',
    'Loja de Roupas',
    'Serviços Profissionais',
    'E-commerce',
    'Salão de Beleza',
    'Consultoria',
    'Academia',
    'Outros'
  ]

  const toneOptions = [
    { value: 'formal', label: 'Formal', icon: <UserRound className="h-4 w-4 mr-2" /> },
    { value: 'friendly', label: 'Amigável', icon: <Smile className="h-4 w-4 mr-2" /> },
    { value: 'enthusiastic', label: 'Entusiasmado', icon: <Sparkles className="h-4 w-4 mr-2" /> },
    { value: 'professional', label: 'Profissional', icon: <BadgeInfo className="h-4 w-4 mr-2" /> },
    { value: 'funny', label: 'Humorado', icon: <Meh className="h-4 w-4 mr-2" /> }
  ]

  const personalityTraits = [
    'Criativo',
    'Técnico',
    'Empático',
    'Direto',
    'Persuasivo',
    'Detalhista',
    'Animado'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBusinessInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleAddProduct = () => {
    setBusinessInfo(prev => ({
      ...prev,
      mainProducts: [...prev.mainProducts, '']
    }))
  }

  const handleProductChange = (index: number, value: string) => {
    const newProducts = [...businessInfo.mainProducts]
    newProducts[index] = value
    setBusinessInfo(prev => ({ ...prev, mainProducts: newProducts }))
  }

  const handleRemoveProduct = (index: number) => {
    const newProducts = businessInfo.mainProducts.filter((_, i) => i !== index)
    setBusinessInfo(prev => ({ ...prev, mainProducts: newProducts }))
  }

  const handleTraitToggle = (trait: string) => {
    setBusinessInfo(prev => {
      const newTraits = prev.personalityTraits.includes(trait)
        ? prev.personalityTraits.filter(t => t !== trait)
        : [...prev.personalityTraits, trait]
      return { ...prev, personalityTraits: newTraits }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Aqui você faria a chamada para salvar no banco de dados
      console.log('Dados salvos:', businessInfo)
      // Simulando um delay de rede
      await new Promise(resolve => setTimeout(resolve, 1500))
      alert('Perfil do negócio salvo com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  return (
      <div className="min-h-screen min-w-full flex-1 bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Building2 className="h-8 w-8 mr-3 text-blue-600" />
                Perfil do Estabelecimento
              </h1>
              <p className="text-gray-600 mt-2">
                Configure como sua IA deve se comportar com seus clientes
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="px-3 py-1">
                Passo {currentStep} de 3
              </Badge>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2" />
                    Informações Básicas
                  </CardTitle>
                  <CardDescription>
                    Dados essenciais sobre seu negócio
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Nome do Estabelecimento</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={businessInfo.businessName}
                      onChange={handleInputChange}
                      placeholder="Ex: Restaurante Sabor & Arte"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType">Tipo de Negócio</Label>
                    <Select
                      value={businessInfo.businessType}
                      onValueChange={(value) => setBusinessInfo(prev => ({ ...prev, businessType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de negócio" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição do Negócio</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={businessInfo.description}
                      onChange={handleInputChange}
                      placeholder="Descreva em poucas palavras o que seu negócio oferece"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetAudience">Público-Alvo</Label>
                    <Input
                      id="targetAudience"
                      name="targetAudience"
                      value={businessInfo.targetAudience}
                      onChange={handleInputChange}
                      placeholder="Ex: Adultos 25-45 anos, classe média alta"
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="h-5 w-5 mr-2" />
                    Produtos e Identidade
                  </CardTitle>
                  <CardDescription>
                    Detalhes sobre o que você oferece e sua identidade
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Principais Produtos/Serviços</Label>
                    {businessInfo.mainProducts.map((product, index) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          value={product}
                          onChange={(e) => handleProductChange(index, e.target.value)}
                          placeholder={`Produto/Serviço ${index + 1}`}
                          required={index === 0}
                        />
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleRemoveProduct(index)}
                          >
                            Remover
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddProduct}
                    >
                      Adicionar Produto
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brandColor">Cor da Marca</Label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="color"
                        id="brandColor"
                        value={businessInfo.brandColor}
                        onChange={(e) => setBusinessInfo(prev => ({ ...prev, brandColor: e.target.value }))}
                        className="w-12 h-12 cursor-pointer"
                      />
                      <span>{businessInfo.brandColor}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Idioma Principal</Label>
                    <div className="flex items-center space-x-2">
                      <Languages className="h-5 w-5 text-gray-500" />
                      <Select
                        value={businessInfo.language}
                        onValueChange={(value) => setBusinessInfo(prev => ({ ...prev, language: value }))}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Selecione o idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pt-BR">Português (BR)</SelectItem>
                          <SelectItem value="en-US">Inglês (EUA)</SelectItem>
                          <SelectItem value="es-ES">Espanhol</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquareText className="h-5 w-5 mr-2" />
                    Personalidade da IA
                  </CardTitle>
                  <CardDescription>
                    Defina como você quer que a IA interaja com seus clientes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Tom de Voz</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {toneOptions.map((tone) => (
                        <div
                          key={tone.value}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${businessInfo.tone === tone.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                          onClick={() => setBusinessInfo(prev => ({ ...prev, tone: tone.value as any }))}
                        >
                          {tone.icon}
                          <span>{tone.label}</span>
                          {businessInfo.tone === tone.value && (
                            <CheckCircle2 className="h-5 w-5 ml-auto text-blue-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Traços de Personalidade (Selecione até 3)</Label>
                    <div className="flex flex-wrap gap-2">
                      {personalityTraits.map((trait) => (
                        <Badge
                          key={trait}
                          variant={businessInfo.personalityTraits.includes(trait) ? 'default' : 'outline'}
                          className={`cursor-pointer ${businessInfo.personalityTraits.includes(trait) ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' : ''}`}
                          onClick={() => handleTraitToggle(trait)}
                        >
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Exemplo de Mensagem</Label>
                    <Textarea
                      placeholder="Mostre como você gostaria que a IA respondesse em uma situação específica"
                      rows={3}
                      value={businessInfo.exampleMessages[0]}
                      onChange={(e) => setBusinessInfo(prev => ({
                        ...prev,
                        exampleMessages: [e.target.value]
                      }))}
                    />
                    <p className="text-sm text-gray-500">
                      Ex: Olá [Cliente]! Aqui é o [Seu Nome] do [Estabelecimento]. Como posso te ajudar hoje? 😊
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between">
              {currentStep > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Voltar
                </Button>
              ) : (
                <div></div>
              )}

              {currentStep < 3 ? (
                <Button type="button" onClick={nextStep}>
                  Próximo
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    'Salvar Perfil'
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
  )
}