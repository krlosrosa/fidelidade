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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  CalendarIcon,
  MessageSquareIcon,
  BellIcon,
  MailIcon,
  CakeIcon,
  ClockIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/sideBar";

type AutomationRule = {
  id: string;
  name: string;
  triggerType:
    | "inactivity"
    | "birthday"
    | "anniversary"
    | "purchase"
    | "custom";
  status: "active" | "inactive";
  message: string;
  daysAfter?: number;
  channels: ("email" | "sms" | "whatsapp")[];
  createdAt: string;
  lastEdited: string;
};

const mockAutomationRules: AutomationRule[] = [
  {
    id: "1",
    name: "Aniversário do Cliente",
    triggerType: "birthday",
    status: "active",
    message:
      "Feliz aniversário, {nome}! Aproveite seu dia especial com 15% de desconto em sua próxima compa. Use o cupom: ANIVERSARIO15",
    channels: ["email", "whatsapp"],
    createdAt: "2023-01-10",
    lastEdited: "2023-05-20",
  },
  {
    id: "2",
    name: "Inatividade (15 dias)",
    triggerType: "inactivity",
    status: "active",
    message:
      "Oi {nome}, sentimos sua falta! Volte para aproveitar nossas novidades e ofertas especiais.",
    daysAfter: 15,
    channels: ["email", "sms"],
    createdAt: "2023-02-15",
    lastEdited: "2023-04-10",
  },
  {
    id: "3",
    name: "Primeira Compra",
    triggerType: "purchase",
    status: "inactive",
    message:
      "Olá {nome}, obrigado por sua primeira compa! Esperamos que tenha uma ótima experiência com seu produto.",
    channels: ["email"],
    createdAt: "2023-03-05",
    lastEdited: "2023-03-05",
  },
  {
    id: "4",
    name: "Aniversário de Cadastro",
    triggerType: "anniversary",
    status: "active",
    message:
      "Parabéns {nome}! Faz 1 ano que você está conosco. Como agradecimento, aqui está um cupom de 10% de desconto: ANO1",
    channels: ["email", "whatsapp", "sms"],
    createdAt: "2023-01-20",
    lastEdited: "2023-06-15",
  },
];

export default function CustomerExperienceAutomation() {
  const [rules, setRules] = useState<AutomationRule[]>(mockAutomationRules);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentRule, setCurrentRule] = useState<AutomationRule | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState<
    Omit<AutomationRule, "id" | "createdAt" | "lastEdited">
  >({
    name: "",
    triggerType: "inactivity",
    status: "active",
    message: "",
    daysAfter: undefined,
    channels: ["email"],
  });

  const filteredRules = rules.filter(
    (rule) =>
      rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toISOString().split("T")[0];

    if (isEditing && currentRule) {
      setRules(
        rules.map((rule) =>
          rule.id === currentRule.id
            ? {
                ...formData,
                id: currentRule.id,
                createdAt: currentRule.createdAt,
                lastEdited: now,
              }
            : rule
        )
      );
    } else {
      setRules([
        ...rules,
        {
          ...formData,
          id: `rule-${rules.length + 1}`,
          createdAt: now,
          lastEdited: now,
        },
      ]);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (rule: AutomationRule) => {
    setCurrentRule(rule);
    setFormData({
      name: rule.name,
      triggerType: rule.triggerType,
      status: rule.status,
      message: rule.message,
      daysAfter: rule.daysAfter,
      channels: rule.channels,
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  const handleStatusChange = (id: string) => {
    setRules(
      rules.map((rule) =>
        rule.id === id
          ? {
              ...rule,
              status: rule.status === "active" ? "inactive" : "active",
            }
          : rule
      )
    );
  };

  const resetForm = () => {
    setFormData({
      name: "",
      triggerType: "inactivity",
      status: "active",
      message: "",
      daysAfter: undefined,
      channels: ["email"],
    });
    setCurrentRule(null);
    setIsEditing(false);
  };

  const triggerTypeLabels = {
    inactivity: "Inatividade",
    birthday: "Aniversário",
    anniversary: "Aniversário de Cadastro",
    purchase: "Compra",
    custom: "Personalizado",
  };

  const triggerTypeIcons = {
    inactivity: <ClockIcon className="h-4 w-4 mr-2" />,
    birthday: <CakeIcon className="h-4 w-4 mr-2" />,
    anniversary: <CalendarIcon className="h-4 w-4 mr-2" />,
    purchase: <BellIcon className="h-4 w-4 mr-2" />,
    custom: <MessageSquareIcon className="h-4 w-4 mr-2" />,
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-50 p-6">
        <div className=" mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Automação de Experiência do Cliente
          </h1>

          <div className="flex justify-between items-center mb-6">
            <Input
              placeholder="Buscar automações..."
              className="max-w-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={() => setIsDialogOpen(true)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Nova Automação
            </Button>
          </div>

          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="active">Ativas</TabsTrigger>
              <TabsTrigger value="inactive">Inativas</TabsTrigger>
            </TabsList>
          </Tabs>

          <Card className="">
            <CardHeader>
              <CardTitle>Regras de Automação</CardTitle>
              <CardDescription>
                Configure mensagens automáticas para diferentes eventos do
                cliente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Disparador</TableHead>
                    <TableHead>Mensagem</TableHead>
                    <TableHead>Última Edição</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Switch
                            checked={rule.status === "active"}
                            onCheckedChange={() => handleStatusChange(rule.id)}
                            className="mr-2"
                          />
                          <Badge
                            variant={
                              rule.status === "active" ? "default" : "outline"
                            }
                            className={
                              rule.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {rule.status === "active" ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {triggerTypeIcons[rule.triggerType]}
                          {triggerTypeLabels[rule.triggerType]}
                          {rule.daysAfter && (
                            <span className="ml-1">
                              ({rule.daysAfter} dias)
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {rule.message}
                      </TableCell>
                      <TableCell>
                        {new Date(rule.lastEdited).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(rule)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(rule.id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Add/Edit Rule Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {isEditing
                    ? "Editar Regra de Automação"
                    : "Nova Regra de Automação"}
                </DialogTitle>
                <DialogDescription>
                  {isEditing
                    ? "Atualize os detalhes da regra de automação"
                    : "Configure uma nova regra de automação para envio de mensagens"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="col-span-3"
                      placeholder="Ex: Mensagem de Aniversário"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="triggerType" className="text-right">
                      Disparador
                    </Label>
                    <Select
                      value={formData.triggerType}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          triggerType: value as AutomationRule["triggerType"],
                        })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione o tipo de disparo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inactivity">
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-2" />
                            Inatividade do Cliente
                          </div>
                        </SelectItem>
                        <SelectItem value="birthday">
                          <div className="flex items-center">
                            <CakeIcon className="h-4 w-4 mr-2" />
                            Aniversário do Cliente
                          </div>
                        </SelectItem>
                        <SelectItem value="anniversary">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            Aniversário de Cadastro
                          </div>
                        </SelectItem>
                        <SelectItem value="purchase">
                          <div className="flex items-center">
                            <BellIcon className="h-4 w-4 mr-2" />
                            Evento de Compra
                          </div>
                        </SelectItem>
                        <SelectItem value="custom">
                          <div className="flex items-center">
                            <MessageSquareIcon className="h-4 w-4 mr-2" />
                            Personalizado
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.triggerType === "inactivity" && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="daysAfter" className="text-right">
                        Dias sem atividade
                      </Label>
                      <Input
                        id="daysAfter"
                        type="number"
                        value={formData.daysAfter || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            daysAfter: parseInt(e.target.value) || undefined,
                          })
                        }
                        className="col-span-3"
                        placeholder="Ex: 15"
                        required
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="channels" className="text-right">
                      Canais
                    </Label>
                    <div className="col-span-3 flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="email-channel"
                          checked={formData.channels.includes("email")}
                          onCheckedChange={(checked: any) =>
                            setFormData({
                              ...formData,
                              channels: checked
                                ? [...formData.channels, "email"]
                                : formData.channels.filter(
                                    (c) => c !== "email"
                                  ),
                            })
                          }
                        />
                        <Label htmlFor="email-channel">
                          <MailIcon className="h-4 w-4 mr-1 inline" />
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="sms-channel"
                          checked={formData.channels.includes("sms")}
                          onCheckedChange={(checked: any) =>
                            setFormData({
                              ...formData,
                              channels: checked
                                ? [...formData.channels, "sms"]
                                : formData.channels.filter((c) => c !== "sms"),
                            })
                          }
                        />
                        <Label htmlFor="sms-channel">
                          <MessageSquareIcon className="h-4 w-4 mr-1 inline" />
                          SMS
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="whatsapp-channel"
                          checked={formData.channels.includes("whatsapp")}
                          onCheckedChange={(checked: any) =>
                            setFormData({
                              ...formData,
                              channels: checked
                                ? [...formData.channels, "whatsapp"]
                                : formData.channels.filter(
                                    (c) => c !== "whatsapp"
                                  ),
                            })
                          }
                        />
                        <Label htmlFor="whatsapp-channel">
                          <MessageSquareIcon className="h-4 w-4 mr-1 inline" />
                          WhatsApp
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="message" className="text-right mt-2">
                      Mensagem
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e: any) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="col-span-3 min-h-[120px]"
                      placeholder={`Ex: Olá {nome}, sentimos sua falta! Volte para aproveitar nossas novidades.`}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Status</Label>
                    <div className="col-span-3 flex items-center">
                      <Switch
                        id="status"
                        checked={formData.status === "active"}
                        onCheckedChange={(checked: any) =>
                          setFormData({
                            ...formData,
                            status: checked ? "active" : "inactive",
                          })
                        }
                        className="mr-2"
                      />
                      <Label htmlFor="status">
                        {formData.status === "active" ? "Ativo" : "Inativo"}
                      </Label>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right mt-2">Variáveis</Label>
                    <div className="col-span-3">
                      <p className="text-sm text-gray-500 mb-2">
                        Você pode usar estas variáveis na mensagem:
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <Badge variant="outline" className="text-xs">
                          {"{nome}"} - Nome do cliente
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {"{email}"} - Email do cliente
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {"{ultimaCompra}"} - Data da última compra
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    {isEditing ? "Atualizar Regra" : "Criar Regra"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
