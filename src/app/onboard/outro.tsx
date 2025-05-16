"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Smartphone,
  Store,
  Gift,
  MessageCircle,
  Link,
  AlertCircle,
} from "lucide-react";
import { AddAccount } from "@/domain/usecases/onboarding";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


type FormData = {
  id?: number; // Optional as it's likely auto-generated
  nome: string;
  telefone: string;
  plano_id: number;
  ativo: boolean;
  tipo_estabelecimento: string;
  subdomain: string;
};

type Props = {
  useCase: AddAccount;
};

export default function OnboardingInput({ useCase }: Props) {
  const [step, setStep] = useState(1);
  const [subdomainError, setSubdomainError] = useState<string | null>(null);
  const [isSubdomainValid, setIsSubdomainValid] = useState<boolean>(false);
  const { user } = useUser();
  const router = useRouter()

    if(user?.publicMetadata){
    const metaData = user.publicMetadata
    if(metaData.hasCompletedOnboarding){
      router.push('/')
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    defaultValues: {
      nome: "",
      telefone: "",
      plano_id: 0, // Default to first plan
      ativo: true, // Default to active
      tipo_estabelecimento: "",
      subdomain: "",
    },
  });

  const formData = watch();

  useEffect(() => {
    if (step === 3 && formData.subdomain) {
      validateSubdomain(formData.subdomain);
    }
  }, [formData.subdomain, step]);

  const validateSubdomain = (value: string) => {
    const regex = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

    if (!value) {
      setSubdomainError("O subdomínio é obrigatório");
      setIsSubdomainValid(false);
      return;
    }

    if (value.length < 3) {
      setSubdomainError("Mínimo de 3 caracteres");
      setIsSubdomainValid(false);
      return;
    }

    if (value.length > 63) {
      setSubdomainError("Máximo de 63 caracteres");
      setIsSubdomainValid(false);
      return;
    }

    if (!regex.test(value)) {
      setSubdomainError(
        "Use apenas letras minúsculas, números e hífens (sem espaços ou caracteres especiais)"
      );
      setIsSubdomainValid(false);
      return;
    }

    if (value.includes("--")) {
      setSubdomainError("Não pode ter hífens consecutivos");
      setIsSubdomainValid(false);
      return;
    }

    setSubdomainError(null);
    setIsSubdomainValid(true);
  };

  const businessTypes = [
    { value: "cafe", label: "Cafeteria", icon: "☕" },
    { value: "salon", label: "Salão", icon: "💇‍♀️" },
    { value: "barber", label: "Barbearia", icon: "✂️" },
    { value: "gym", label: "Academia", icon: "💪" },
    { value: "store", label: "Loja", icon: "🛍️" },
    { value: "restaurant", label: "Restaurante", icon: "🍽️" },
    { value: "other", label: "Outro", icon: "🏢" },
  ];

  const plans = [
    {
      id: 1, // Changed from string to number
      name: "Básico",
      price: "R$ 99/mês",
      features: [
        "100 clientes",
        "Pontos básico",
        "Respostas automáticas",
        "1 campanha/mês",
      ],
      recommended: false,
    },
    {
      id: 2,
      name: "Profissional",
      price: "R$ 199/mês",
      features: [
        "500 clientes",
        "Pontos completo",
        "IA para atendimento",
        "5 campanhas/mês",
        "Roleta de prêmios",
      ],
      recommended: true,
    },
    {
      id: 3,
      name: "Empresarial",
      price: "R$ 399/mês",
      features: [
        "Clientes ilimitados",
        "Todas funcionalidades",
        "Campanhas ilimitadas",
        "Relatórios avançados",
      ],
      recommended: false,
    },
    {
      id: 4,
      name: "Free",
      price: "R$ 0/mês",
      features: [
        "5 clientes",
        "Todas funcionalidades",
        "1 campanha/mês",
        "Relatórios avançados",
      ],
      recommended: false,
    },
  ];

  const handleNext = async (e: any) => {
    e.preventDefault();
    if (step === 1) {
      const isValid = await trigger("nome");
      if (!isValid) return;
    } else if (step === 2) {
      const isValid = await trigger("tipo_estabelecimento");
      if (!isValid) return;
    } else if (step === 3) {
      const isValid = await trigger(["telefone", "subdomain"]);
      if (!isValid || !isSubdomainValid) return;
    }

    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data: FormData) => {
    if (user?.primaryEmailAddress?.emailAddress) {
      await useCase.create({
        nome: data.nome,
        telefone: data.telefone,
        plano_id: data.plano_id,
        ativo: data.ativo,
        tipo_estabelecimento: data.tipo_estabelecimento,
        subdomain: data.subdomain,
        email: user?.primaryEmailAddress?.emailAddress,
        clerk_id: user.id,
      });
      await fetch("/api/complete", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      }).then(()=> {
        router.push('/')
      })
    }
    alert(JSON.stringify(data));
  };

  const progressValue = (step / 4) * 100;

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setValue("subdomain", value);
    validateSubdomain(value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full max-w-4xl  shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {step === 1 && "Sobre seu negócio"}
                  {step === 2 && "Tipo de estabelecimento"}
                  {step === 3 && "Contato principal"}
                  {step === 4 && "Escolha seu plano"}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {step === 1 && "Nome do seu estabelecimento"}
                  {step === 2 && "Selecione a categoria"}
                  {step === 3 && "Número do WhatsApp e subdomínio"}
                  {step === 4 && "Melhor plano para você"}
                </CardDescription>
              </div>
              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                {step}/4
              </Badge>
            </div>
            <Progress value={progressValue} className="h-1.5 mt-3" />
          </CardHeader>

          <CardContent className="px-6 py-2 max-h-[60vh] overflow-y-auto">
            {/* Step 1: Business Name */}
            {step === 1 && (
              <div className="space-y-3 py-2">
                <div className="space-y-1.5">
                  <Label htmlFor="nome" className="text-sm">
                    Nome do Estabelecimento
                  </Label>
                  <Input
                    id="nome"
                    placeholder="Ex: Cafeteria do Zé"
                    className="h-9"
                    {...register("nome", {
                      required: "Nome do estabelecimento é obrigatório",
                    })}
                  />
                  {errors.nome && (
                    <div className="flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.nome.message}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  <span>Aparecerá para clientes no WhatsApp</span>
                </div>
              </div>
            )}

            {/* Step 2: Business Type */}
            {step === 2 && (
              <div className="space-y-3 py-2">
                <input
                  type="hidden"
                  {...register("tipo_estabelecimento", {
                    required: "Selecione um tipo de negócio",
                  })}
                />
                <RadioGroup
                  value={formData.tipo_estabelecimento}
                  onValueChange={(value) =>
                    setValue("tipo_estabelecimento", value)
                  }
                  className="grid grid-cols-3 gap-2"
                >
                  {businessTypes.map((type) => (
                    <div
                      key={type.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={type.value}
                        id={type.value}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={type.value}
                        className="flex flex-col items-center justify-center p-2 rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary text-xs text-center h-16 w-full"
                      >
                        <span className="text-xl mb-1">{type.icon}</span>
                        {type.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {errors.tipo_estabelecimento && (
                  <div className="flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.tipo_estabelecimento.message}</span>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Phone Number and Subdomain */}
            {step === 3 && (
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="telefone" className="text-sm">
                      WhatsApp Business
                    </Label>
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm h-9">
                        +55
                      </span>
                      <Input
                        id="telefone"
                        type="tel"
                        placeholder="11987654321"
                        className="flex-1 rounded-l-none h-9"
                        {...register("telefone", {
                          required: "Número de WhatsApp é obrigatório",
                          pattern: {
                            value: /^\d{10,11}$/,
                            message: "Digite um número válido (DDD + número)",
                          },
                        })}
                      />
                    </div>
                    {errors.telefone && (
                      <div className="flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.telefone.message}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="subdomain"
                      className="text-sm flex items-center gap-1"
                    >
                      <Link className="h-3 w-3" /> Seu subdomínio
                    </Label>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center">
                        <Input
                          id="subdomain"
                          placeholder="seudominio"
                          className={`rounded-r-none h-9 ${
                            subdomainError ? "border-red-500" : ""
                          }`}
                          {...register("subdomain", {
                            required: "Subdomínio é obrigatório",
                            onChange: handleSubdomainChange,
                          })}
                        />
                        <span className="inline-flex items-center px-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm h-9">
                          .meufideliza.com
                        </span>
                      </div>
                      {subdomainError && (
                        <div className="flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="h-3 w-3" />
                          <span>{subdomainError}</span>
                        </div>
                      )}
                      {!subdomainError && formData.subdomain && (
                        <div className="flex items-center gap-1 text-xs text-green-500">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>
                            Subdomínio válido! Seu painel será:{" "}
                            <strong>
                              {formData.subdomain}.meufideliza.com
                            </strong>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-xs">
                  <div className="flex items-start space-x-2">
                    <Smartphone className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-blue-600">
                      Número principal para enviar/receber mensagens dos
                      clientes. Seu painel será acessível em:{" "}
                      <strong>
                        {formData.subdomain || "seudominio"}.meufideliza.com
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Plan Selection */}
            {step === 4 && (
              <div className="space-y-4 py-2 ">
                <input
                  type="hidden"
                  {...register("plano_id", {
                    required: "Selecione um plano",
                    valueAsNumber: true,
                  })}
                />
                {/* Cards de planos em grid responsivo */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {plans.map((plan) => (
                    <Card
                      key={plan.id}
                      className={`relative hover:shadow-md transition-all cursor-pointer ${
                        formData.plano_id === plan.id
                          ? "border-2 border-primary shadow-md"
                          : "border hover:border-gray-300"
                      }`}
                      onClick={() => setValue("plano_id", plan.id)}
                    >
                      {plan.recommended && (
                        <div className="absolute -top-2 right-4 bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full">
                          RECOMENDADO
                        </div>
                      )}
                      <div className="p-4">
                        <div className="mb-3">
                          <h3 className="font-bold text-lg">{plan.name}</h3>
                          <p className="text-primary font-semibold text-lg">
                            {plan.price}
                          </p>
                        </div>
                        <ul className="space-y-2 text-sm min-h-24 mb-4">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          variant={
                            formData.plano_id === plan.id
                              ? "default"
                              : "outline"
                          }
                          className="w-full"
                          size="sm"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setValue("plano_id", plan.id);
                          }}
                        >
                          {formData.plano_id === plan.id
                            ? "Selecionado"
                            : "Selecionar"}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Benefícios do sistema */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Benefícios do sistema:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="flex items-center space-x-2 bg-white p-2 rounded border border-gray-100 shadow-sm">
                      <div className="bg-green-50 p-2 rounded-full">
                        <MessageCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <span className="font-medium">
                        Atendimento Automatizado
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white p-2 rounded border border-gray-100 shadow-sm">
                      <div className="bg-purple-50 p-2 rounded-full">
                        <Gift className="h-5 w-5 text-purple-500" />
                      </div>
                      <span className="font-medium">
                        Programa de Fidelidade
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white p-2 rounded border border-gray-100 shadow-sm">
                      <div className="bg-blue-50 p-2 rounded-full">
                        <Store className="h-5 w-5 text-blue-500" />
                      </div>
                      <span className="font-medium">Marketing Direcionado</span>
                    </div>
                  </div>
                </div>
                {errors.plano_id && (
                  <div className="flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.plano_id.message}</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between pt-4 pb-6 px-6 border-t">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className="h-9 px-4"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Voltar
            </Button>
            {step < 4 ? (
              <Button
                size="sm"
                type="button"
                onClick={handleNext}
                disabled={
                  (step === 1 && !formData.nome) ||
                  (step === 2 && !formData.tipo_estabelecimento) ||
                  (step === 3 &&
                    (!formData.telefone ||
                      !formData.subdomain ||
                      !isSubdomainValid))
                }
                className="h-9 px-4"
              >
                Próximo <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button size="sm" type="submit" className="h-9 px-4">
                Finalizar
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
