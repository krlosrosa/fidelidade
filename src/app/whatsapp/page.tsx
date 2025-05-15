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
  Smartphone,
  Link,
  Unlink,
  Loader2,
  Settings,
  MessageSquare,
  ClockIcon,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/sideBar";
import Image from "next/image";

type WhatsAppConnection = {
  id: string;
  name: string;
  phoneNumber: string;
  status: "connected" | "disconnected" | "connecting" | "failed";
  lastActivity: string;
  qrCode?: string;
  connectionMethod: "qr-code" | "mobile-device";
};

export default function WhatsAppIntegrationPage() {
  const [connections, setConnections] = useState<WhatsAppConnection[]>([
    {
      id: "1",
      name: "WhatsApp Principal",
      phoneNumber: "+55 11 98765-4321",
      status: "disconnected",
      lastActivity: "2023-06-20T14:30:00",
      connectionMethod: "qr-code",
    },
    {
      id: "2",
      name: "WhatsApp Secundário",
      phoneNumber: "+55 11 91234-5678",
      status: "connected",
      lastActivity: "2023-06-22T09:15:00",
      connectionMethod: "mobile-device",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentConnection, setCurrentConnection] =
    useState<WhatsAppConnection | null>(null);
  const [connectionMethod, setConnectionMethod] = useState<
    "qr-code" | "mobile-device"
  >("qr-code");
  const [newConnectionName, setNewConnectionName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  console.log(isConnecting, currentConnection)

  const handleConnect = (connection: WhatsAppConnection) => {
    setCurrentConnection(connection);
    setIsConnecting(true);

    // Simulação do processo de conexão
    setTimeout(() => {
      setConnections(
        connections.map((c) =>
          c.id === connection.id ? { ...c, status: "connecting" } : c
        )
      );

      // Simulação do QR Code sendo gerado
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
        // Método mobile device
        setTimeout(() => {
          setConnections(
            connections.map((c) =>
              c.id === connection.id
                ? {
                    ...c,
                    status: "connected",
                    lastActivity: new Date().toISOString(),
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
    };
    setConnections([...connections, newConnection]);
    setNewConnectionName("");
    setNewPhoneNumber("");
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
    <div className="flexx">
      <Sidebar/>
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
          <Button onClick={() => setIsDialogOpen(true)}>
            <Link className="h-4 w-4 mr-2" />
            Nova Conexão
          </Button>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="connected">Conectadas</TabsTrigger>
            <TabsTrigger value="disconnected">Desconectadas</TabsTrigger>
          </TabsList>
        </Tabs>

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
                      <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
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
                          <Smartphone className="h-4 w-4 mr-2" />
                          Método: Dispositivo Móvel
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {connection.status === "disconnected" && (
                      <Button
                        variant="default"
                        onClick={() => handleConnect(connection)}
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
                            className="mx-auto h-40 w-40 border rounded-lg"
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

                    {connection.connectionMethod === "mobile-device" && (
                      <div className="mt-6">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                          <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                            <Smartphone className="h-4 w-4 mr-2" />
                            Instruções para conexão via dispositivo móvel
                          </h4>
                          <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
                            <li>Abra o WhatsApp no seu celular</li>
                            <li>
                              Acesse Configurações {">"} Dispositivos conectados
                            </li>
                            <li>Toque em Conectar um dispositivo</li>
                            <li>
                              Aponte a câmera para o QR Code quando solicitado
                            </li>
                          </ol>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {connections.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <MessageSquare className="h-10 w-10 mx-auto text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Nenhuma conexão WhatsApp configurada
                </h3>
                <p className="mt-2 text-gray-600">
                  Conecte seu WhatsApp para começar a enviar mensagens
                  automatizadas
                </p>
                <Button className="mt-6" onClick={() => setIsDialogOpen(true)}>
                  <Link className="h-4 w-4 mr-2" />
                  Criar primeira conexão
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Add Connection Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Nova Conexão WhatsApp</DialogTitle>
            <DialogDescription>
              Configure uma nova conexão com a API do WhatsApp para envio de
              mensagens
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
                placeholder="Ex: WhatsApp Principal"
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
                    connectionMethod === "mobile-device"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => setConnectionMethod("mobile-device")}
                >
                  <div
                    className={`p-2 rounded-full mr-4 ${
                      connectionMethod === "mobile-device"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Conexão via Dispositivo</h4>
                    <p className="text-sm text-gray-600">
                      Use seu celular para parear automaticamente
                    </p>
                  </div>
                  {connectionMethod === "mobile-device" && (
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleAddConnection}>
              <Link className="h-4 w-4 mr-2" />
              Criar Conexão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
        </div>
  );
}
