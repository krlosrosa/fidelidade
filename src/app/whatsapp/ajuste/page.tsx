// app/fidelidade/page.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  GiftIcon,
  ZapIcon,
  SettingsIcon,
  MessageCircleIcon,
  PlusIcon,
  ListIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function FidelidadePage() {
  // Mock data - configurações de fidelidade
  const config = {
    pontosPorReal: 1,
    pontosMinimosResgate: 100,
    pontosExpiramMeses: 12,
    mensagemPontos:
      "Você ganhou {pontos} pontos por sua compra! Seu total agora é {total} pontos.",
    whatsappLink: "https://wa.me/5511999999999?text=Consultar%20pontos",
  };

  // Mock data - recompensas cadastradas
  const rewards = [
    { id: 1, nome: "Café grátis", pontos: 100, ativo: true },
    { id: 2, nome: "10% de desconto", pontos: 50, ativo: true },
    { id: 3, nome: "Brigadeiro extra", pontos: 30, ativo: false },
  ];

  return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Programa de Fidelidade
            </h1>
            <p className="text-gray-600">
              Configure seu sistema de pontos e recompensas direto pelo WhatsApp
            </p>
          </header>

          {/* Abas principais */}
          <Tabs defaultValue="config" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="config">
                <SettingsIcon className="w-4 h-4 mr-2" />
                Configuração
              </TabsTrigger>
              <TabsTrigger value="rewards">
                <GiftIcon className="w-4 h-4 mr-2" />
                Recompensas
              </TabsTrigger>
              <TabsTrigger value="integration">
                <MessageCircleIcon className="w-4 h-4 mr-2" />
                Integração
              </TabsTrigger>
            </TabsList>

            {/* Conteúdo da aba Configuração */}
            <TabsContent value="config" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Programa</CardTitle>
                  <CardDescription>
                    Defina como seus clientes ganham e resgatam pontos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="pontos-por-real">
                        Pontos por R$1 gasto
                      </Label>
                      <Input
                        id="pontos-por-real"
                        type="number"
                        defaultValue={config.pontosPorReal}
                        min="1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="minimo-resgate">
                        Mínimo para resgate
                      </Label>
                      <Input
                        id="minimo-resgate"
                        type="number"
                        defaultValue={config.pontosMinimosResgate}
                        min="10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiracao">Expiração (meses)</Label>
                      <Input
                        id="expiracao"
                        type="number"
                        defaultValue={config.pontosExpiramMeses}
                        min="1"
                        max="24"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="mensagem-pontos">Mensagem de pontos</Label>
                    <Input
                      id="mensagem-pontos"
                      defaultValue={config.mensagemPontos}
                      placeholder="Mensagem enviada quando cliente ganha pontos"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Use{" "}
                      <code className="bg-gray-100 px-1 rounded">
                        {"{pontos}"}
                      </code>{" "}
                      para os pontos ganhos e{" "}
                      <code className="bg-gray-100 px-1 rounded">
                        {"{total}"}
                      </code>{" "}
                      para o total acumulado
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="enable-fidelidade" defaultChecked />
                    <Label htmlFor="enable-fidelidade">
                      Programa de fidelidade ativo
                    </Label>
                  </div>

                  <Button className="mt-4">Salvar Configurações</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Conteúdo da aba Recompensas */}
            <TabsContent value="rewards" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Recompensas</CardTitle>
                      <CardDescription>
                        Prêmios que seus clientes podem resgatar com pontos
                      </CardDescription>
                    </div>
                    <Button>
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Nova Recompensa
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rewards.map((reward) => (
                      <div
                        key={reward.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h3 className="font-medium">{reward.nome}</h3>
                          <p className="text-sm text-gray-600">
                            {reward.pontos} pontos
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Switch checked={reward.ativo} />
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                        </div>
                      </div>
                    ))}

                    {rewards.length === 0 && (
                      <div className="text-center py-12">
                        <GiftIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                          Nenhuma recompensa cadastrada
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Comece criando sua primeira recompensa para seus
                          clientes
                        </p>
                        <div className="mt-6">
                          <Button>
                            <PlusIcon className="w-4 h-4 mr-2" />
                            Criar Recompensa
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Conteúdo da aba Integração */}
            <TabsContent value="integration" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Integração com WhatsApp</CardTitle>
                    <CardDescription>
                      Como seus clientes acessam o programa
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Link para consulta de pontos</Label>
                        <div className="flex items-center space-x-2 mt-2">
                          <Input value={config.whatsappLink} readOnly />
                          <Button variant="outline" size="sm">
                            Copiar
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label>Mensagem automática</Label>
                        <p className="text-sm text-gray-500 mt-2">
                          Quando um cliente enviar PONTOS para seu WhatsApp, ele
                          receberá automaticamente:
                        </p>
                        <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                          <p className="font-medium">
                            Olá! Você tem 150 pontos acumulados.
                          </p>
                          <p className="mt-1">Resgate: {config.whatsappLink}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-4">
                        <Switch id="enable-auto" defaultChecked />
                        <Label htmlFor="enable-auto">
                          Respostas automáticas ativas
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Como funciona</CardTitle>
                    <CardDescription>
                      Fluxo do programa de fidelidade
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                          <ZapIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            1. Cliente faz uma compra
                          </h3>
                          <p className="text-sm text-gray-600">
                            O sistema calcula os pontos automaticamente
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                          <MessageCircleIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            2. Mensagem automática
                          </h3>
                          <p className="text-sm text-gray-600">
                            Cliente recebe no WhatsApp os pontos ganhos
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                          <ListIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">3. Consulta de pontos</h3>
                          <p className="text-sm text-gray-600">
                            Cliente pode verificar saldo a qualquer momento
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                          <GiftIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            4. Resgate de recompensas
                          </h3>
                          <p className="text-sm text-gray-600">
                            Cliente escolhe prêmios pelo link no WhatsApp
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
  );
}
