"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PlusIcon,
  UserIcon,
  QrCodeIcon,
  SearchIcon,
  ZapIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AddPoints } from "@/domain/usecases/addPoints";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import QrScanner from "@/components/qrCodeScanner";

type Props = {
  addPoints: AddPoints;
};

export default function AdicionarPontosPage({ addPoints }: Props) {
  const [idCliente, setIdCliente] = useState("");
  const [point, setPoints] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId");

  const { user } = useUser();

  useEffect(() => {
    if (customerId) {
      setIdCliente(customerId);
    }
  }, [customerId]);

  const handleAddPoints = async () => {
    if (user?.id) {
      const info = await addPoints.addPoints({
        customer_id: idCliente,
        points: parseInt(point),
        tenant_id: user?.id,
        type: "earn",
      });

      console.log(info);
    }
    toast("Pontos adicionados com sucesso!");
  };
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Adicionar Pontos
          </h1>
          <p className="text-gray-600">
            Registre pontos para seus clientes de forma rápida
          </p>
        </header>

        {/* QR Code Scanner Modal */}
        {showScanner && (
          <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">
                  Escaneie o QR Code
                </h2>
                <button
                  onClick={() => setShowScanner(false)}
                  className="text-white hover:text-gray-300"
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="relative aspect-square w-full rounded-lg overflow-hidden">
                <QrScanner setText={setIdCliente} />
                <div className="absolute inset-0 border-4 border-primary rounded-lg pointer-events-none" />
              </div>
              <p className="mt-4 text-white text-center">
                Posicione o QR Code dentro da área destacada
              </p>
            </div>
          </div>
        )}

        {/* Card principal */}
        <Card className="shadow-sm">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <ZapIcon className="w-5 h-5 text-yellow-500" />
              <span>Registro Rápido</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4 p-6">
              {/* Método de busca */}
              <div>
                <Label htmlFor="cliente">Cliente</Label>
                <div className="relative mt-1">
                  <Input
                    value={idCliente}
                    onChange={(e) => setIdCliente(e.target.value)}
                    id="cliente"
                    placeholder="Buscar por nome ou telefone"
                    className="pl-10"
                  />
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <div className="mt-2 flex justify-between">
                  <Button variant="ghost" size="sm" className="text-primary">
                    <UserIcon className="w-4 h-4 mr-2" />
                    Últimos clientes
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary"
                    onClick={() => setShowScanner(true)}
                  >
                    <QrCodeIcon className="w-4 h-4 mr-2" />
                    Ler QR Code
                  </Button>
                </div>
              </div>

              {/* Valor da compra */}
              <div>
                <Label htmlFor="valor">Valor da compra (R$)</Label>
                <Input
                  value={point}
                  onChange={(e) => setPoints(e.target.value)}
                  id="valor"
                  type="number"
                  placeholder="0,00"
                  className="mt-1 text-lg font-medium"
                  step="0.01"
                />
                <p className="text-sm text-gray-500 mt-1">
                  1 ponto para cada R$1 gasto
                </p>
              </div>

              {/* Pontos calculados */}
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Pontos a adicionar:
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    {point ? `${point} pts` : "0 pts"}
                  </span>
                </div>
              </div>

              {/* Observação */}
              <div>
                <Label htmlFor="observacao">Observação (opcional)</Label>
                <Input
                  id="observacao"
                  placeholder="Ex: Compra de café especial"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Footer com botão de ação */}
            <div className="bg-gray-50 px-6 py-4 border-t">
              <Button
                className="w-full py-6 text-lg font-bold"
                onClick={handleAddPoints}
                disabled={!idCliente || !point}
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Confirmar Pontos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Seção de atalhos */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            ATALHOS RÁPIDOS
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => setPoints("50")}
            >
              <ZapIcon className="w-5 h-5 text-primary" />
              <span>Adicionar 50 pts</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => setPoints("100")}
            >
              <ZapIcon className="w-5 h-5 text-primary" />
              <span>Adicionar 100 pts</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
