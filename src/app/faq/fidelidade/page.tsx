import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ChevronRight, Gift, MessageSquare, Plus, Settings, Star, Users } from "lucide-react";

export const metadata = {
  title: "Tutorial - Programa de Fidelidade",
  description: "Guia completo para criar e gerenciar seu programa de pontos"
};

export default function FidelityTutorialPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full">
          <Star className="h-5 w-5" />
          <span className="font-medium">Programa de Fidelidade</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Guia Completo do Programa de Pontos
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Aprenda a criar, configurar e gerenciar seu programa de fidelidade para reter e engajar clientes
        </p>
      </header>

      {/* Quick Start Guide */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <ChevronRight className="h-6 w-6 text-primary" />
          Guia Rápido
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Settings className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">1. Configuração</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Defina as regras básicas do seu programa de pontos no painel de configurações.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">2. Divulgação</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Compartilhe o link do programa com seus clientes via WhatsApp.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Gift className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">3. Resgates</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Aprove resgates e acompanhe o desempenho do programa.
              </p>
            </CardContent>
          </Card>
        </div>

        <Alert className="bg-primary/5 border-primary/30">
          <Star className="h-4 w-4" />
          <AlertTitle>Dica profissional</AlertTitle>
          <AlertDescription>
            Comece com regras simples (ex: 1 ponto por R$1 gasto) e ajuste conforme a resposta dos clientes.
          </AlertDescription>
        </Alert>
      </section>

      {/* Detailed Tutorial */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <ChevronRight className="h-6 w-6 text-primary" />
          Tutorial Passo a Passo
        </h2>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm">
                  1
                </span>
                Criando seu Programa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-muted rounded-lg w-48 h-32"></div>
                <div>
                  <h3 className="font-medium mb-2">Acesse a seção de Fidelidade</h3>
                  <p className="text-sm text-muted-foreground">
                    No menu principal, clique em Programa de Fidelidade e depois em Criar Programa.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-muted rounded-lg w-48 h-32"></div>
                <div>
                  <h3 className="font-medium mb-2">Defina as regras de pontos</h3>
                  <p className="text-sm text-muted-foreground">
                    Escolha como os clientes ganham pontos (por compra, valor gasto, etc.) e o valor de cada ponto.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm">
                  2
                </span>
                Configurando Benefícios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-muted rounded-lg w-48 h-32"></div>
                <div>
                  <h3 className="font-medium mb-2">Adicione prêmios</h3>
                  <p className="text-sm text-muted-foreground">
                    Crie benefícios que seus clientes podem resgatar com os pontos acumulados.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-muted rounded-lg w-48 h-32"></div>
                <div>
                  <h3 className="font-medium mb-2">Defina valores em pontos</h3>
                  <p className="text-sm text-muted-foreground">
                    Atribua valores em pontos para cada benefício baseado no seu custo e valor percebido.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <ChevronRight className="h-6 w-6 text-primary" />
          Perguntas Frequentes
        </h2>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline">
              Como os clientes se cadastram no programa?
            </AccordionTrigger>
            <AccordionContent>
              Os clientes são automaticamente cadastrados quando fazem a primeira compra ou interagem com seu WhatsApp. Eles recebem uma mensagem automática explicando o programa.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="hover:no-underline">
              Posso alterar as regras depois de lançar o programa?
            </AccordionTrigger>
            <AccordionContent>
              Sim, mas recomendamos avisar os clientes sobre mudanças significativas. Alterações não afetam pontos já acumulados.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="hover:no-underline">
              Como os clientes conferem seus pontos?
            </AccordionTrigger>
            <AccordionContent>
              Eles podem enviar PONTOS para seu WhatsApp ou clicar no link do programa que você compartilhar. O saldo é mostrado automaticamente.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="hover:no-underline">
              Existe um custo adicional por resgate?
            </AccordionTrigger>
            <AccordionContent>
              Não, o sistema é totalmente gratuito para os clientes. Você só arca com os custos dos benefícios que oferecer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Pro Tips */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <ChevronRight className="h-6 w-6 text-primary" />
          Dicas Profissionais
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="flex flex-row items-center gap-4 pb-3">
              <MessageSquare className="h-6 w-6 text-primary" />
              <CardTitle>Comunique claramente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Explique as regras de forma simples no WhatsApp e no seu estabelecimento. Use exemplos como Gaste R$100 e ganhe 10 pontos.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="flex flex-row items-center gap-4 pb-3">
              <Plus className="h-6 w-6 text-primary" />
              <CardTitle>Ofereça benefícios exclusivos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Crie prêmios que não estão disponíveis para não participantes, como produtos especiais ou descontos exclusivos.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Pronto para começar?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Crie seu programa de fidelidade agora mesmo e comece a reter mais clientes através do WhatsApp.
        </p>
        <Button size="lg" className="gap-2">
          Criar Programa de Fidelidade
          <ChevronRight className="h-4 w-4" />
        </Button>
      </section>
    </div>
  );
}