"use client";

// app/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RocketIcon,
  MessageCircleIcon,
  GiftIcon,
  RotateCwIcon,
  BarChartIcon,
  SettingsIcon,
  ZapIcon,
  Gamepad
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  // Mock data - dados do estabelecimento
  const establishment = {
    name: "Café & Cia",
    plan: "Plano Pro",
    progress: 65, // % de configuração do sistema
    clients: 142,
    pointsGiven: 2840,
    rewardsRedeemed: 56,
  };

  const router = useRouter()
  // Funcionalidades principais
  const features = [
    {
      icon: <MessageCircleIcon className="w-6 h-6 text-primary" />,
      title: "Atendimento Inteligente",
      description:
        "IA treinada com suas informações para responder clientes automaticamente",
    },
    {
      icon: <GiftIcon className="w-6 h-6 text-primary" />,
      title: "Programa de Fidelidade",
      description: "Sistema de pontos e recompensas direto no WhatsApp",
    },
    {
      icon: <RotateCwIcon className="w-6 h-6 text-primary" />,
      title: "Roleta de Prêmios",
      description: "Gamificação para aumentar o engajamento dos clientes",
    },
    {
      icon: <BarChartIcon className="w-6 h-6 text-primary" />,
      title: "Marketing Automático",
      description:
        "Campanhas personalizadas para datas especiais e reengajamento",
    },
  ];

  // Ações rápidas
  const quickActions = [
    { title: "Cadastrar Pontos", icon: <GiftIcon className="w-5 h-5" />, href: '/points'},
    { title: "Roleta", icon: <Gamepad className="w-5 h-5" />, href: '/roleta' },
    { title: "Ver Relatórios", icon: <BarChartIcon className="w-5 h-5" />, href: '/' },
    { title: "Configurar IA", icon: <SettingsIcon className="w-5 h-5" /> , href: '/'},
  ];

  return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Olá, {establishment.name}!
            </h1>
            <p className="text-gray-600">
              Bem-vindo ao seu painel de fidelidade inteligente via WhatsApp
            </p>

          </header>
            <div className="lg:col-span-2">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Ações rápidas</CardTitle>
                  <CardDescription>
                    Comece agora mesmo com estas ações
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-24 flex flex-col items-center justify-center gap-2"
                        onClick={()=> router.push(action.href)}
                      >
                        {action.icon}
                        <span>{action.title}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
                      {/* Ações rápidas e tutoriais */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <Card className="bg-white shadow-sm h-full">
                <CardHeader>
                  <CardTitle>Primeiros passos</CardTitle>
                  <CardDescription>
                    Configure seu sistema em minutos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-1 rounded-full mt-1">
                        <span className="text-primary text-sm font-bold w-5 h-5 flex items-center justify-center">
                          1
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">
                          Cadastre suas informações
                        </h3>
                        <p className="text-sm text-gray-600">
                          Horários, serviços, localização
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-1 rounded-full mt-1">
                        <span className="text-primary text-sm font-bold w-5 h-5 flex items-center justify-center">
                          2
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">
                          Configure as recompensas
                        </h3>
                        <p className="text-sm text-gray-600">
                          Pontos necessários e prêmios
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-1 rounded-full mt-1">
                        <span className="text-primary text-sm font-bold w-5 h-5 flex items-center justify-center">
                          3
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">Conecte seu WhatsApp</h3>
                        <p className="text-sm text-gray-600">
                          Integração simples em 2 minutos
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-6 w-full">
                    Guia completo de configuração
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* Destaques */}
          <div className="grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Clientes</p>
                    <p className="text-2xl font-bold">
                      {establishment.clients}
                    </p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MessageCircleIcon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pontos distribuídos</p>
                    <p className="text-2xl font-bold">
                      {establishment.pointsGiven}
                    </p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <RocketIcon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Recompensas resgatadas
                    </p>
                    <p className="text-2xl font-bold">
                      {establishment.rewardsRedeemed}
                    </p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <GiftIcon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Seu plano</p>
                    <p className="text-2xl font-bold">{establishment.plan}</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <ZapIcon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Funcionalidades principais */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">O que você pode fazer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="hover:shadow-md transition-shadow h-full"
                >
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                    <Button variant="link" className="pl-0 mt-4">
                      Começar a usar →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>


        </div>
      </div>
  );
}
