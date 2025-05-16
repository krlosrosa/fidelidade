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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  AlertCircle,
  QrCode,
  Link,
  Unlink,
  Loader2,
  Settings,
  MessageSquare,
  ClockIcon,
  Key,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

type WhatsAppConnection = {
  id: string;
  name: string;
  phoneNumber: string;
  status: "connected" | "disconnected" | "connecting" | "failed";
  lastActivity: string;
  qrCode?: string;
  connectionMethod: "qr-code" | "api-key";
  apiKey?: string;
};

export default function WhatsAppIntegrationPage() {
  const [connections, setConnections] = useState<WhatsAppConnection[]>([
    {
      id: "1",
      name: "Conexão Principal",
      phoneNumber: "+55 11 98765-4321",
      status: "disconnected",
      lastActivity: "2023-06-20T14:30:00",
      connectionMethod: "qr-code",
    },
    {
      id: "2",
      name: "Conexão Oficial",
      phoneNumber: "+55 11 91234-5678",
      status: "disconnected",
      lastActivity: "2023-06-22T09:15:00",
      connectionMethod: "api-key",
      apiKey: "",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentConnection, setCurrentConnection] =
    useState<WhatsAppConnection | null>(null);
  const [connectionMethod, setConnectionMethod] = useState<
    "qr-code" | "api-key"
  >("qr-code");
  const [newConnectionName, setNewConnectionName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [apiKey, setApiKey] = useState("");

  console.log(isConnecting, currentConnection);

  // Verifica se já existe uma conexão ativa
  const hasActiveConnection = connections.some((c) => c.status === "connected");

  const handleConnect = (connection: WhatsAppConnection) => {
    if (hasActiveConnection) {
      alert(
        "Você já tem uma conexão ativa. Desconecte-a antes de conectar outra."
      );
      return;
    }

    setCurrentConnection(connection);
    setIsConnecting(true);

    // Simulação do processo de conexão
    setTimeout(() => {
      setConnections(
        connections.map((c) =>
          c.id === connection.id ? { ...c, status: "connecting" } : c
        )
      );

      if (connection.connectionMethod === "qr-code") {
        setTimeout(() => {
          setConnections(
            connections.map((c) =>
              c.id === connection.id
                ? {
                    ...c,
                    status: "connected",
                    lastActivity: new Date().toISOString(),
                    qrCode:
                      "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=EXAMPLE_QR_CODE_DATA",
                  }
                : c
            )
          );
          setIsConnecting(false);
        }, 3000);
      } else {
        // Método API Key
        setTimeout(() => {
          setConnections(
            connections.map((c) =>
              c.id === connection.id
                ? {
                    ...c,
                    status: "connected",
                    lastActivity: new Date().toISOString(),
                    apiKey: apiKey,
                  }
                : c
            )
          );
          setIsConnecting(false);
        }, 2000);
      }
    }, 500);
  };

  const handleDisconnect = (id: string) => {
    setConnections(
      connections.map((c) =>
        c.id === id ? { ...c, status: "disconnected" } : c
      )
    );
  };

  const handleAddConnection = () => {
    const newConnection: WhatsAppConnection = {
      id: `conn-${connections.length + 1}`,
      name: newConnectionName,
      phoneNumber: newPhoneNumber,
      status: "disconnected",
      lastActivity: new Date().toISOString(),
      connectionMethod: connectionMethod,
      apiKey: connectionMethod === "api-key" ? apiKey : undefined,
    };

    setConnections([...connections, newConnection]);
    setNewConnectionName("");
    setNewPhoneNumber("");
    setApiKey("");
    setIsDialogOpen(false);
  };

  const getStatusBadge = (status: WhatsAppConnection["status"]) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Conectado
          </Badge>
        );
      case "disconnected":
        return (
          <Badge variant="outline" className="text-gray-600">
            <Unlink className="h-3 w-3 mr-1" />
            Desconectado
          </Badge>
        );
      case "connecting":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Conectando...
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Falha na conexão
          </Badge>
        );
    }
  };

  return (
      <div className="min-h-screen flex-1 bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Integração WhatsApp
              </h1>
              <p className="text-gray-600 mt-2">
                Conecte seu WhatsApp para enviar mensagens automatizadas aos
                clientes
              </p>
            </div>
            <Button
              onClick={() => setIsDialogOpen(true)}
              disabled={hasActiveConnection}
            >
              <Link className="h-4 w-4 mr-2" />
              Nova Conexão
            </Button>
          </div>

          <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-800 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Limitação da API
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              Você só pode ter uma conexão ativa por vez (via QR Code ou API
              Oficial).
            </p>
          </div>

          <div className="grid gap-6">
            {connections.map((connection) => (
              <Card
                key={connection.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        {connection.connectionMethod === "qr-code" ? (
                          <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
                        ) : (
                          <Key className="h-5 w-5 mr-2 text-purple-600" />
                        )}
                        {connection.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {connection.phoneNumber}
                      </CardDescription>
                    </div>
                    {getStatusBadge(connection.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <ClockIcon className="h-4 w-4 mr-2" />
                        Última atividade:{" "}
                        {new Date(connection.lastActivity).toLocaleString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        {connection.connectionMethod === "qr-code" ? (
                          <>
                            <QrCode className="h-4 w-4 mr-2" />
                            Método: QR Code
                          </>
                        ) : (
                          <>
                            <Key className="h-4 w-4 mr-2" />
                            Método: API Oficial
                          </>
                        )}
                      </div>
                      {connection.connectionMethod === "api-key" &&
                        connection.apiKey && (
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="truncate max-w-xs">
                              Chave: ••••••••••••••••••••••••••••••••
                            </span>
                          </div>
                        )}
                    </div>

                    <div className="flex space-x-2">
                      {connection.status === "disconnected" && (
                        <Button
                          variant="default"
                          onClick={() => handleConnect(connection)}
                          disabled={hasActiveConnection}
                        >
                          <Link className="h-4 w-4 mr-2" />
                          Conectar
                        </Button>
                      )}

                      {connection.status === "connected" && (
                        <Button
                          variant="outline"
                          onClick={() => handleDisconnect(connection.id)}
                        >
                          <Unlink className="h-4 w-4 mr-2" />
                          Desconectar
                        </Button>
                      )}

                      {connection.status === "connecting" && (
                        <Button variant="outline" disabled>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Conectando...
                        </Button>
                      )}

                      <Button variant="ghost">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {connection.status === "connecting" && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Conectando seu WhatsApp...
                        </span>
                        <span className="text-sm text-gray-500">
                          {connection.connectionMethod === "qr-code"
                            ? "Passo 2 de 3"
                            : "Passo 1 de 2"}
                        </span>
                      </div>
                      <Progress
                        value={
                          connection.connectionMethod === "qr-code" ? 66 : 50
                        }
                        className="h-2"
                      />

                      {connection.connectionMethod === "qr-code" && (
                        <div className="mt-6 text-center">
                          <p className="text-sm font-medium mb-4">
                            Escaneie o QR Code abaixo com seu WhatsApp
                          </p>
                          {connection.qrCode ? (
                            <Image
                              src={connection.qrCode}
                              alt="QR Code para conexão"
                              width={160}
                              height={160}
                              className="mx-auto border rounded-lg"
                            />
                          ) : (
                            <div className="mx-auto h-40 w-40 border rounded-lg flex items-center justify-center bg-gray-100">
                              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                            </div>
                          )}
                          <p className="text-xs text-gray-500 mt-4">
                            WhatsApp {">"} Configurações {">"} Dispositivos
                            conectados {">"} Conectar um dispositivo
                          </p>
                        </div>
                      )}

                      {connection.connectionMethod === "api-key" && (
                        <div className="mt-6">
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                            <h4 className="font-medium text-purple-800 mb-2 flex items-center">
                              <Key className="h-4 w-4 mr-2" />
                              Conectando via API Oficial
                            </h4>
                            <p className="text-sm text-purple-700">
                              Validando sua chave de API com os servidores do
                              WhatsApp...
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add Connection Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Nova Conexão WhatsApp</DialogTitle>
              <DialogDescription>
                Escolha um método de conexão (apenas uma conexão ativa por vez)
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  value={newConnectionName}
                  onChange={(e) => setNewConnectionName(e.target.value)}
                  placeholder="Ex: Conexão Principal"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Número
                </Label>
                <Input
                  id="phone"
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                  placeholder="+55 11 98765-4321"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Método</Label>
                <div className="col-span-3 space-y-4">
                  <div
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      connectionMethod === "qr-code"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => setConnectionMethod("qr-code")}
                  >
                    <div
                      className={`p-2 rounded-full mr-4 ${
                        connectionMethod === "qr-code"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <QrCode className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Conexão via QR Code</h4>
                      <p className="text-sm text-gray-600">
                        Escaneie o QR Code pelo seu celular
                      </p>
                    </div>
                    {connectionMethod === "qr-code" && (
                      <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    )}
                  </div>

                  <div
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      connectionMethod === "api-key"
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => setConnectionMethod("api-key")}
                  >
                    <div
                      className={`p-2 rounded-full mr-4 ${
                        connectionMethod === "api-key"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Key className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">API Oficial</h4>
                      <p className="text-sm text-gray-600">
                        Use sua chave de API do WhatsApp Business
                      </p>
                    </div>
                    {connectionMethod === "api-key" && (
                      <CheckCircle2 className="h-5 w-5 text-purple-600" />
                    )}
                  </div>
                </div>
              </div>

              {connectionMethod === "api-key" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="apiKey" className="text-right">
                    Chave API
                  </Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Insira sua chave de API"
                    className="col-span-3"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={handleAddConnection}
                disabled={
                  !newConnectionName ||
                  !newPhoneNumber ||
                  (connectionMethod === "api-key" && !apiKey)
                }
              >
                <Link className="h-4 w-4 mr-2" />
                Criar Conexão
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  );
}
