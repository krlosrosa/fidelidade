// app/atendimento/page.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  MessageCircleIcon,
  SettingsIcon,
  ZapIcon,
  PlusIcon,
  DatabaseIcon,
  TestTubeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Sidebar } from "@/components/sideBar";

export default function AtendimentoPage() {
  // Mock data - configurações do atendimento
  const config = {
    iaAtivada: true,
    horarioFuncionamento: "Seg a Sex: 8h às 18h\nSáb: 9h às 13h",
    informacoesNegocio:
      "Café & Cia - Cafeteria especializada em grãos premium\nRua Principal, 123 - Centro\n(11) 99999-9999",
    perguntasFrequentes: [
      {
        pergunta: "Quais são os horários de funcionamento?",
        resposta:
          "Funcionamos de Segunda a Sexta das 8h às 18h e aos Sábados das 9h às 13h.",
      },
      {
        pergunta: "Vocês entregam?",
        resposta:
          "Sim, fazemos delivery em um raio de 5km. Taxa de entrega: R$5,00.",
      },
    ],
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Atendimento Inteligente
            </h1>
            <p className="text-gray-600">
              IA treinada com suas informações para responder clientes
              automaticamente via WhatsApp
            </p>
          </header>

          {/* Abas principais */}
          <Tabs defaultValue="config" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="config">
                <SettingsIcon className="w-4 h-4 mr-2" />
                Configuração
              </TabsTrigger>
              <TabsTrigger value="knowledge">
                <DatabaseIcon className="w-4 h-4 mr-2" />
                Base de Conhecimento
              </TabsTrigger>
              <TabsTrigger value="test">
                <TestTubeIcon className="w-4 h-4 mr-2" />
                Testar IA
              </TabsTrigger>
            </TabsList>

            {/* Conteúdo da aba Configuração */}
            <TabsContent value="config" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações Principais</CardTitle>
                    <CardDescription>
                      Controle como sua IA atende os clientes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enable-ia"
                        defaultChecked={config.iaAtivada}
                      />
                      <Label htmlFor="enable-ia">
                        Atendimento por IA ativado
                      </Label>
                    </div>

                    <div>
                      <Label htmlFor="business-info">
                        Informações do seu negócio
                      </Label>
                      <Textarea
                        id="business-info"
                        defaultValue={config.informacoesNegocio}
                        rows={5}
                        placeholder="Inclua detalhes sobre seu negócio que a IA deve saber"
                      />
                    </div>

                    <div>
                      <Label htmlFor="opening-hours">
                        Horário de funcionamento
                      </Label>
                      <Textarea
                        id="opening-hours"
                        defaultValue={config.horarioFuncionamento}
                        rows={3}
                        placeholder="Descreva seus horários de atendimento"
                      />
                    </div>

                    <Button className="mt-4">Salvar Configurações</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Como Funciona</CardTitle>
                    <CardDescription>
                      Fluxo do atendimento inteligente
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                          <MessageCircleIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            1. Cliente envia mensagem
                          </h3>
                          <p className="text-sm text-gray-600">
                            Pergunta chega via WhatsApp
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                          <ZapIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            2. IA analisa a pergunta
                          </h3>
                          <p className="text-sm text-gray-600">
                            Compara com sua base de conhecimento
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                          <MessageCircleIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            3. Resposta automática
                          </h3>
                          <p className="text-sm text-gray-600">
                            IA responde com informações precisas
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                          <SettingsIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            4. Aprimoramento contínuo
                          </h3>
                          <p className="text-sm text-gray-600">
                            IA aprende com novas interações
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-2">
                        Exemplo de resposta da IA:
                      </h3>
                      <div className="bg-white p-3 rounded border">
                        <p className="text-gray-800">
                          Olá! Nós funcionamos de Segunda a Sexta das 8h às 18h
                          e aos Sábados das 9h às 13h. Posso ajudar com mais
                          alguma coisa?
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Conteúdo da aba Base de Conhecimento */}
            <TabsContent value="knowledge" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Base de Conhecimento</CardTitle>
                      <CardDescription>
                        Perguntas frequentes e respostas para treinar sua IA
                      </CardDescription>
                    </div>
                    <Button>
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Adicionar Pergunta
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {config.perguntasFrequentes.map((faq, index) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div>
                              <Label>Pergunta</Label>
                              <Input defaultValue={faq.pergunta} />
                            </div>
                            <div>
                              <Label>Resposta</Label>
                              <Textarea defaultValue={faq.resposta} rows={3} />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm">
                                Remover
                              </Button>
                              <Button size="sm">Salvar</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {config.perguntasFrequentes.length === 0 && (
                      <div className="text-center py-12">
                        <DatabaseIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                          Nenhuma pergunta cadastrada
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Adicione perguntas frequentes para treinar sua IA
                        </p>
                        <div className="mt-6">
                          <Button>
                            <PlusIcon className="w-4 h-4 mr-2" />
                            Adicionar Pergunta
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Conteúdo da aba Testar IA */}
            <TabsContent value="test" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Testar Respostas da IA</CardTitle>
                    <CardDescription>
                      Simule perguntas para ver como sua IA responderia
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Digite uma pergunta</Label>
                        <Input placeholder="Ex: Qual o horário de funcionamento?" />
                      </div>
                      <Button>Testar Resposta</Button>

                      <div className="mt-6 space-y-2">
                        <Label>Resposta da IA:</Label>
                        <div className="bg-gray-50 p-4 rounded-lg min-h-32 border">
                          <p className="text-gray-600">
                            A resposta aparecerá aqui...
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sugestões para Testar</CardTitle>
                    <CardDescription>
                      Perguntas comuns que você pode experimentar
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full text-left justify-start"
                      >
                        Qual o horário de funcionamento?
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full text-left justify-start"
                      >
                        Vocês fazem entregas?
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full text-left justify-start"
                      >
                        Qual o endereço?
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full text-left justify-start"
                      >
                        Tem promoção hoje?
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full text-left justify-start"
                      >
                        Preciso reservar mesa?
                      </Button>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">Dica:</h3>
                      <p className="text-sm text-blue-700">
                        Teste variações das mesmas perguntas para ver como a IA
                        responde. Ex: Abre que horas? vs Qual o horário?
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
