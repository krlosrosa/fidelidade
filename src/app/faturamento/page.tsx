"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Calendar,
  Loader2,
  Check,
  X,
  RefreshCw,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sidebar } from "@/components/sideBar";

type Subscription = {
  id: string;
  planName: string;
  planPrice: number;
  status: "active" | "canceled" | "past_due" | "paused";
  paymentMethod: string;
  nextBillingDate: string;
  interval: "month" | "year";
  features: string[];
};

export default function MySubscriptionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isUpdatingPayment, setIsUpdatingPayment] = useState(false);

  // Dados mockados da assinatura do usuário atual
  const [mySubscription, setMySubscription] = useState<Subscription>({
    id: "sub_123",
    planName: "Plano Premium",
    planPrice: 89.9,
    status: "active",
    paymentMethod: "Visa **** 4242",
    nextBillingDate: "2023-12-15",
    interval: "month",
    features: [
      "Agendamentos ilimitados",
      "Suporte prioritário",
      "Descontos exclusivos",
      "Relatórios avançados",
    ],
  });

  const getStatusBadge = () => {
    switch (mySubscription.status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>;
      case "canceled":
        return <Badge className="bg-gray-100 text-gray-800">Cancelado</Badge>;
      case "past_due":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            Pagamento pendente
          </Badge>
        );
      case "paused":
        return <Badge className="bg-blue-100 text-blue-800">Pausado</Badge>;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const handleCancelSubscription = async () => {
    setIsLoading(true);
    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMySubscription({ ...mySubscription, status: "canceled" });
      setIsCancelDialogOpen(false);
    } catch (error) {
      console.error("Erro ao cancelar assinatura:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePaymentMethod = async () => {
    setIsUpdatingPayment(true);
    try {
      // Simular redirecionamento para o Stripe
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Redirecionando para atualização de método de pagamento...");
    } catch (error) {
      console.error("Erro ao atualizar pagamento:", error);
    } finally {
      setIsUpdatingPayment(false);
    }
  };

  const handleReactivateSubscription = async () => {
    setIsLoading(true);
    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMySubscription({ ...mySubscription, status: "active" });
    } catch (error) {
      console.error("Erro ao reativar assinatura:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-screen flex-1 bg-gray-50 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
              <CreditCard className="h-6 w-6 mr-2 text-blue-600" />
              Minha Assinatura
            </h1>
            <p className="text-gray-600 mt-1">
              Gerencie seu plano e informações de pagamento
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{mySubscription.planName}</CardTitle>
                  <CardDescription>
                    {formatCurrency(mySubscription.planPrice)}/
                    {mySubscription.interval === "month" ? "mês" : "ano"}
                  </CardDescription>
                </div>
                {getStatusBadge()}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Próximos passos</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">
                          Próxima cobrança
                        </p>
                        <p>{formatDate(mySubscription.nextBillingDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-3 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">
                          Método de pagamento
                        </p>
                        <p>{mySubscription.paymentMethod}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Button
                      onClick={handleUpdatePaymentMethod}
                      disabled={
                        isUpdatingPayment || mySubscription.status !== "active"
                      }
                    >
                      {isUpdatingPayment ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4 mr-2" />
                      )}
                      Atualizar pagamento
                    </Button>

                    {mySubscription.status === "active" ? (
                      <Button
                        variant="outline"
                        onClick={() => setIsCancelDialogOpen(true)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancelar assinatura
                      </Button>
                    ) : mySubscription.status === "canceled" ? (
                      <Button
                        onClick={handleReactivateSubscription}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Check className="h-4 w-4 mr-2" />
                        )}
                        Reativar assinatura
                      </Button>
                    ) : null}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Benefícios incluídos</h3>
                  <ul className="space-y-2">
                    {mySubscription.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {mySubscription.status === "past_due" && (
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">
                        Pagamento pendente
                      </h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Seu pagamento não foi processado. Atualize seu método de
                        pagamento para evitar interrupções no serviço.
                      </p>
                      <Button
                        size="sm"
                        className="mt-3"
                        onClick={handleUpdatePaymentMethod}
                        disabled={isUpdatingPayment}
                      >
                        {isUpdatingPayment ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          "Regularizar pagamento"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seção de histórico e upgrades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Histórico de Pagamentos
                </CardTitle>
                <CardDescription>
                  Últimas cobranças da sua assinatura
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        Cobrança de {formatDate("2023-11-15")}
                      </p>
                      <p className="text-sm text-gray-500">Plano Premium</p>
                    </div>
                    <div className="text-right">
                      <p>{formatCurrency(89.9)}</p>
                      <Badge className="bg-green-100 text-green-800 mt-1">
                        Pago
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        Cobrança de {formatDate("2023-10-15")}
                      </p>
                      <p className="text-sm text-gray-500">Plano Premium</p>
                    </div>
                    <div className="text-right">
                      <p>{formatCurrency(89.9)}</p>
                      <Badge className="bg-green-100 text-green-800 mt-1">
                        Pago
                      </Badge>
                    </div>
                  </div>
                </div>

                <Button variant="link" className="mt-4 pl-0">
                  Ver histórico completo <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Atualizar Plano</CardTitle>
                <CardDescription>
                  Escolha um plano que melhor atenda suas necessidades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Plano Básico</h4>
                      <p className="text-blue-600">
                        {formatCurrency(49.9)}/mês
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Para pequenas barbearias
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg hover:border-blue-500 transition-colors cursor-pointer bg-blue-50 border-blue-200">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Plano Premium</h4>
                      <p className="text-blue-600">
                        {formatCurrency(89.9)}/mês
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Seu plano atual
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Plano Empresarial</h4>
                      <p className="text-blue-600">
                        {formatCurrency(149.9)}/mês
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Para múltiplas unidades
                    </p>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  Comparar planos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialog de cancelamento */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar assinatura</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja cancelar sua assinatura?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600">
              Você perderá acesso aos benefícios imediatamente após o término do
              período atual.
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">
                Acesso até: {formatDate(mySubscription.nextBillingDate)}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCancelDialogOpen(false)}
            >
              Manter assinatura
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelSubscription}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : null}
              Confirmar cancelamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
