// app/pricing/page.tsx
"use client";
import {
  CheckIcon,
  ZapIcon,
  BotIcon,
  CrownIcon,
  CalendarIcon,
  MessageCircleIcon,
  StarIcon,
  ChevronRightIcon,
  AwardIcon,
  BarChart2Icon,
  SmileIcon,
  UsersIcon,
  ScissorsIcon,
  ClockIcon,
  PhoneIcon,
  GiftIcon,
  UserPlusIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import ButtonPay from "@/presentation/checkout";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function PricingPage() {

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ScissorsIcon className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">BarberIA</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600">
              Recursos
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600">
              Planos
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-blue-600"
            >
              Depoimentos
            </a>
            <a href="#faq" className="text-gray-700 hover:text-blue-600">
              FAQ
            </a>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 hidden md:block">
            Comece agora
          </Button>
          <Button variant="ghost" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge
              variant="secondary"
              className="mb-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
            >
              <StarIcon className="w-4 h-4 mr-2" />
              <span>Transforme sua barbearia em 7 dias grátis</span>
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Fidelize clientes e{" "}
              <span className="text-yellow-300">automatize</span> seu
              atendimento
            </h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto leading-relaxed">
              Sistema completo de relacionamento via WhatsApp com IA que aumenta
              em <span className="font-semibold">até 3x</span> a frequência dos
              seus clientes
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold"
              >
                Comece agora
                <ChevronRightIcon className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-white/10 border-white/30"
              >
                <PhoneIcon className="w-4 h-4 mr-2" />
                Falar com consultor
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                value: "87%",
                label: "Retenção de clientes",
                icon: (
                  <UsersIcon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                ),
              },
              {
                value: "3.2x",
                label: "Mais visitas",
                icon: (
                  <ClockIcon className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                ),
              },
              {
                value: "24/7",
                label: "Atendimento automático",
                icon: (
                  <BotIcon className="w-6 h-6 mx-auto mb-2 text-green-600" />
                ),
              },
              {
                value: "98%",
                label: "Satisfação",
                icon: (
                  <SmileIcon className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                ),
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {item.icon}
                <p className="text-3xl font-bold text-blue-600">{item.value}</p>
                <p className="mt-2 text-gray-600">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Demo */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Veja como funciona em{" "}
              <span className="text-blue-600">1 minuto</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra como nossa plataforma pode transformar seu negócio
            </p>
          </div>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-xl shadow-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="bg-white mb-4">
              <AwardIcon className="w-4 h-4 mr-2" />
              Tudo o que você precisa
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Transforme seu <span className="text-blue-600">atendimento</span>{" "}
              e <span className="text-purple-600">relacionamento</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Recursos poderosos projetados para barbeiros que querem crescer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${feature.iconBg}`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Como a <span className="text-blue-600">BarberIA</span> funciona?
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Simples, rápido e eficiente - em apenas 3 passos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Cadastro rápido",
                description:
                  "Crie sua conta em menos de 2 minutos e conecte seu WhatsApp",
                icon: <UserPlusIcon className="w-8 h-8 text-blue-600" />,
              },
              {
                step: "2",
                title: "Configure sua IA",
                description:
                  "Envie seus materiais e configure suas campanhas de fidelização",
                icon: <BotIcon className="w-8 h-8 text-purple-600" />,
              },
              {
                step: "3",
                title: "Comece a fidelizar",
                description:
                  "Ative o sistema e veja seus clientes voltarem mais vezes",
                icon: <GiftIcon className="w-8 h-8 text-green-600" />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-xl text-center"
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <span className="text-sm font-semibold text-blue-600">
                  PASSO {item.step}
                </span>
                <h3 className="text-xl font-semibold my-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Planos que{" "}
              <span className="relative whitespace-nowrap text-blue-600">
                <span className="relative">crescem</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute top-3/4 left-0 h-[0.58em] w-full fill-blue-300/60"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                </svg>
              </span>{" "}
              com você
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha o plano ideal baseado no tamanho da sua equipe e
              necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Plano Essencial */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
              <Card className="relative h-full flex flex-col border border-gray-200 hover:border-blue-300 transition-colors duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                        <ZapIcon className="w-5 h-5 text-yellow-500" />
                        <span>Essencial</span>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Para equipes de até 2 pessoas
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-600"
                    >
                      Popular
                    </Badge>
                  </div>
                  <div className="mt-6">
                    <span className="text-4xl font-bold">R$39,90</span>
                    <span className="text-gray-500">/mês</span>
                    <p className="mt-2 text-sm text-gray-500">
                      + R$0,50 por cliente adicional
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {[
                      "Até 100 clientes ativos",
                      "Respostas automáticas via IA",
                      "Mensagens de aniversário",
                      "Programa de fidelidade básico",
                      "2 PDFs para treinar a IA",
                      "Relatórios mensais",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <ButtonPay priceId="price_1RMvqNPOQetwSPfGTiF7Z4SM" />
                </CardFooter>
              </Card>
            </motion.div>

            {/* Plano Profissional - Destaque */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-200"></div>
              <Card className="relative h-full flex flex-col border-2 border-blue-500 shadow-xl transform hover:scale-[1.01] transition-transform duration-200">
                <CardHeader>
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-xs font-bold rounded-bl-lg rounded-tr-lg">
                    MELHOR CUSTO-BENEFÍCIO
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                      <BotIcon className="w-5 h-5 text-blue-500" />
                      <span>Profissional</span>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Para equipes de 3-5 pessoas
                    </CardDescription>
                  </div>
                  <div className="mt-6">
                    <span className="text-4xl font-bold">R$69,90</span>
                    <span className="text-gray-500">/mês</span>
                    <p className="mt-2 text-sm text-gray-500">
                      + R$0,40 por cliente adicional
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {[
                      "Até 500 clientes ativos",
                      "IA avançada com 5 PDFs",
                      "Campanhas automáticas",
                      "Fidelidade personalizada",
                      "Agendamento inteligente",
                      "Relatórios semanais",
                      "Lembretes personalizados",
                      "Suporte prioritário",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <ButtonPay enable priceId="price_1RMvqbPOQetwSPfGUN25w2SG" />
                </CardFooter>
              </Card>
            </motion.div>

            {/* Plano Premium */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
              <Card className="relative h-full flex flex-col border border-gray-200 hover:border-purple-300 transition-colors duration-200">
                <CardHeader>
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                      <CrownIcon className="w-5 h-5 text-purple-500" />
                      <span>Premium</span>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Para equipes com mais de 5 pessoas
                    </CardDescription>
                  </div>
                  <div className="mt-6">
                    <span className="text-4xl font-bold">R$120</span>
                    <span className="text-gray-500">/mês</span>
                    <p className="mt-2 text-sm text-gray-500">
                      Clientes ilimitados
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {[
                      "Clientes ilimitados",
                      "IA premium com documentos ilimitados",
                      "Automação completa",
                      "Agendamento premium",
                      "Relatórios avançados",
                      "Integração com redes sociais",
                      "Treinamento personalizado",
                      "Suporte 24/7 dedicado",
                      "Consultoria mensal",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <ButtonPay priceId="price_1RMvpyPOQetwSPfG25deGtV7" />
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              O que dizem <span className="text-blue-600">nossos clientes</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Barbeiros que já transformaram seus negócios com nossa plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <UsersIcon className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">{testimonial.quote}</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Perguntas <span className="text-blue-600">frequentes</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Tudo o que você precisa saber antes de começar
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Como faço para conectar meu WhatsApp?",
                answer:
                  "O processo é simples e seguro. Após criar sua conta, você receberá instruções passo a passo para conectar seu WhatsApp Business em menos de 2 minutos.",
              },
              {
                question: "Posso testar antes de assinar?",
                answer:
                  "Sim! Oferecemos 7 dias grátis para você testar todos os recursos da plataforma sem compromisso.",
              },
              {
                question: "Como funciona o treinamento da IA?",
                answer:
                  "Você envia materiais como lista de serviços, preços e perguntas frequentes. Nossa IA analisa e aprende a responder como se fosse sua equipe.",
              },
              {
                question: "Posso cancelar a qualquer momento?",
                answer:
                  "Sim, você pode cancelar quando quiser sem taxas ou multas. Seu acesso permanece até o final do período contratado.",
              },
              {
                question: "É seguro para meus clientes?",
                answer:
                  "Totalmente. Seguimos todas as normas de proteção de dados (LGPD) e não compartilhamos informações com terceiros.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="font-semibold text-lg text-gray-900">
                  {item.question}
                </h3>
                <p className="mt-2 text-gray-600">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold sm:text-4xl mb-6">
              Pronto para transformar sua barbearia?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Comece hoje e aumente sua receita com clientes mais fiéis e
              satisfeitos
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold"
              >
                Experimente 7 dias grátis
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-white/10 border-white"
              >
                <PhoneIcon className="w-4 h-4 mr-2" />
                Falar com consultor
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ScissorsIcon className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">BarberIA</span>
              </div>
              <p className="text-gray-400">
                A solução completa para fidelização e automação de barbearias
                via WhatsApp.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Produto</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white"
                  >
                    Recursos
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-gray-400 hover:text-white">
                    Planos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Demonstração
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    7 dias grátis
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Carreiras
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contato
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Receba dicas para sua barbearia
              </p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Seu e-mail"
                  className="bg-gray-800 border-gray-700"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Assinar
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} BarberIA. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: MessageCircleIcon,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Fidelização Inteligente",
    description:
      "Programa de pontos e recompensas automatizado via WhatsApp, com cupons personalizados que aumentam o retorno dos clientes.",
  },
  {
    icon: BotIcon,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "Assistente IA 24/7",
    description:
      "Respostas automáticas baseadas no seu material, capaz de agendar horários e responder perguntas sobre serviços e preços.",
  },
  {
    icon: CalendarIcon,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "Gestão de Agendamentos",
    description:
      "Sistema inteligente que reduz faltas em até 70% com confirmações automáticas e lembretes personalizados.",
  },
  {
    icon: BarChart2Icon,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    title: "Análises Poderosas",
    description:
      "Relatórios detalhados sobre frequência de clientes, gasto médio e campanhas mais eficazes para sua barbearia.",
  },
  {
    icon: SmileIcon,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    title: "Relacionamento Automatizado",
    description:
      "Mensagens de aniversário, follow-ups para clientes inativos e promoções personalizadas baseadas no histórico.",
  },
  {
    icon: UsersIcon,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    title: "Gestão de Equipe",
    description:
      "Controle de comissões, desempenho de barbeiros e atribuição automática de clientes para cada profissional.",
  },
];

const testimonials = [
  {
    name: "Carlos Mendes",
    role: "Dono da Barbearia Elite",
    quote:
      "Depois que implementamos o sistema, nossa clientela fixa aumentou 120% em 3 meses. O melhor investimento que fizemos!",
    rating: 5,
  },
  {
    name: "Fernanda Oliveira",
    role: "Gerente da Barbearia Moderna",
    quote:
      "A IA que responde perguntas liberou nosso tempo para focar no atendimento pessoal. Os clientes amam a praticidade!",
    rating: 5,
  },
  {
    name: "Ricardo Souza",
    role: "Barbeiro na Old School",
    quote:
      "Nunca mais tive cliente esquecendo horário. O sistema de lembretes reduziu minhas faltas a zero.",
    rating: 4,
  },
];
