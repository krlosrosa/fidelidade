import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ChevronRight, MessageSquare, Bot, Zap, Mail, Clock, Settings } from "lucide-react";

export const metadata = {
  title: "Tutorial - Atendimento Automático",
  description: "Guia completo para configurar respostas automáticas via WhatsApp"
};

export default function AutoReplyTutorialPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full">
          <Bot className="h-5 w-5" />
          <span className="font-medium">Atendimento Automático</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Guia do Atendimento Inteligente
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Configure respostas automáticas para perguntas frequentes e atenda clientes 24/7 via WhatsApp
        </p>
      </header>

      {/* Benefits Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <ChevronRight className="h-6 w-6 text-primary" />
          Por que usar o Atendimento Automático?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-3 pb-3">
              <Zap className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Respostas Imediatas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Seus clientes recebem respostas instantâneas a qualquer hora, sem esperar.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-3 pb-3">
              <Clock className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Atendimento 24/7</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Funciona mesmo fora do horário comercial, nunca perca uma oportunidade.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-3 pb-3">
              <Settings className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Fácil Configuração</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Configure em minutos sem precisar de conhecimentos técnicos.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Setup Tutorial */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <ChevronRight className="h-6 w-6 text-primary" />
          Configuração Básica
        </h2>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm">
                  1
                </span>
                Cadastre suas informações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-muted rounded-lg w-48 h-32"></div>
                <div>
                  <h3 className="font-medium mb-2">Acesse a seção de Atendimento Automático</h3>
                  <p className="text-sm text-muted-foreground">
                    No menu principal, clique em Atendimento e depois em Configurar Respostas.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-muted rounded-lg w-48 h-32"></div>
                <div>
                  <h3 className="font-medium mb-2">Preencha os dados do seu negócio</h3>
                  <p className="text-sm text-muted-foreground">
                    Horário de funcionamento, endereço, serviços oferecidos e perguntas frequentes.
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
                Treine sua IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-muted rounded-lg w-48 h-32"></div>
                <div>
                  <h3 className="font-medium mb-2">Adicione perguntas e respostas</h3>
                  <p className="text-sm text-muted-foreground">
                    Crie um banco de perguntas frequentes com as respostas adequadas.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-muted rounded-lg w-48 h-32"></div>
                <div>
                  <h3 className="font-medium mb-2">Ative o treinamento automático</h3>
                  <p className="text-sm text-muted-foreground">
                    O sistema irá aprender a responder variações das mesmas perguntas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm">
                  3
                </span>
                Teste e ative
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-muted rounded-lg w-48 h-32"></div>
                <div>
                  <h3 className="font-medium mb-2">Simule perguntas</h3>
                  <p className="text-sm text-muted-foreground">
                    Use o painel de testes para verificar se as respostas estão corretas.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-muted rounded-lg w-48 h-32"></div>
                <div>
                  <h3 className="font-medium mb-2">Ative o atendimento automático</h3>
                  <p className="text-sm text-muted-foreground">
                    Habilite a função e comece a receber respostas automáticas no WhatsApp.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <ChevronRight className="h-6 w-6 text-primary" />
          Boas Práticas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="flex flex-row items-center gap-4 pb-3">
              <MessageSquare className="h-6 w-6 text-primary" />
              <CardTitle>Mantenha respostas curtas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                No WhatsApp, respostas objetivas de 1-2 linhas têm melhor engajamento. Use quebras de linha para organizar.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="flex flex-row items-center gap-4 pb-3">
              <Mail className="h-6 w-6 text-primary" />
              <CardTitle>Personalize quando possível</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Use variáveis como cliente ou horario para deixar as mensagens mais humanizadas.
              </p>
            </CardContent>
          </Card>
        </div>

        <Alert className="mt-6 bg-primary/5 border-primary/30">
          <Zap className="h-4 w-4" />
          <AlertTitle>Dica profissional</AlertTitle>
          <AlertDescription>
            Sempre inclua uma opção para falar com atendente humano (ex: Digite 0 para falar com nosso time).
          </AlertDescription>
        </Alert>
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
              Quais tipos de perguntas o sistema responde?
            </AccordionTrigger>
            <AccordionContent>
              O sistema pode responder sobre horário de funcionamento, endereço, preços, serviços, status de pedidos e qualquer outra informação que você cadastrar. Para perguntas complexas, o cliente é direcionado para um atendente.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="hover:no-underline">
              Como adiciono novas perguntas depois?
            </AccordionTrigger>
            <AccordionContent>
              Basta acessar a seção de configurações, adicionar a nova pergunta e resposta, e o sistema atualiza automaticamente em poucos minutos.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="hover:no-underline">
              Os clientes sabem que estão falando com um bot?
            </AccordionTrigger>
            <AccordionContent>
              Sim, as mensagens automáticas incluem um indicativo de que são respostas automáticas. Você pode personalizar este texto nas configurações.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="hover:no-underline">
              Posso ver o histórico de atendimentos automáticos?
            </AccordionTrigger>
            <AccordionContent>
              Sim, o painel mostra todas as interações, perguntas frequentes e casos onde o sistema não soube responder, para você melhorar continuamente.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Pronto para automatizar seu atendimento?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Configure seu atendimento automático agora e nunca mais deixe um cliente sem resposta.
        </p>
        <Button size="lg" className="gap-2">
          Configurar Atendimento Automático
          <ChevronRight className="h-4 w-4" />
        </Button>
      </section>
    </div>
  );
}