import { Metadata } from "next";
import { FeatureCard } from "./auxiliares/FeatureCard";
import { StepItem } from "./auxiliares/StepItem";
import { VideoDemo } from "./auxiliares/VideoDemo";
import { features, gettingStartedSteps, advancedUsageSteps } from "./data/tutorialData";

export const metadata: Metadata = {
  title: "Guia do Sistema - Tutorial Completo",
  description: "Aprenda a usar todas as funcionalidades do nosso sistema de fidelidade via WhatsApp",
};

export default function TutorialPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Guia do Sistema</h1>
        <p className="text-xl text-muted-foreground">
          Aprenda a usar todas as funcionalidades do nosso sistema de fidelidade via WhatsApp
        </p>
      </header>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Principais Funcionalidades</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Começando</h2>
        <div className="space-y-8">
          {gettingStartedSteps.map((step, index) => (
            <StepItem key={index} {...step} number={index + 1} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Uso Avançado</h2>
        <div className="space-y-8">
          {advancedUsageSteps.map((step, index) => (
            <StepItem key={index} {...step} number={index + 1 + gettingStartedSteps.length} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Demonstrações em Vídeo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <VideoDemo 
            title="Como criar uma campanha" 
            description="Aprenda a configurar sua primeira campanha de marketing" 
            videoUrl="https://www.youtube.com/embed/exemplo1" 
          />
          <VideoDemo 
            title="Gerenciando sua roleta de prêmios" 
            description="Configure e personalize sua roleta de fidelidade" 
            videoUrl="https://www.youtube.com/embed/exemplo2" 
          />
        </div>
      </section>

      <section className="bg-secondary/20 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Precisa de ajuda?</h2>
        <p className="mb-4">
          Se ainda tiver dúvidas, nossa equipe está pronta para ajudar!
        </p>
        <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
          Contatar Suporte
        </button>
      </section>
    </div>
  );
}