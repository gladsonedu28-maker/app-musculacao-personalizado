"use client";

import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SubscriptionFlowProps {
  onComplete: (data: SubscriptionData) => void;
  onBack: () => void;
}

export interface SubscriptionData {
  ageRange: string;
  gender: string;
  bodyType: string;
  goal: string;
}

export default function SubscriptionFlow({ onComplete, onBack }: SubscriptionFlowProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<SubscriptionData>>({});

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = (key: keyof SubscriptionData, value: string) => {
    const newData = { ...data, [key]: value };
    setData(newData);

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(newData as SubscriptionData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <button
          onClick={handleBack}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Ajuda</span>
          <span className="text-sm text-gray-400">Português</span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gray-900 h-1">
        <div
          className="bg-gradient-to-r from-orange-500 to-red-500 h-1 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress Text */}
      <div className="text-center py-4">
        <span className="text-sm text-gray-400">
          {step}/{totalSteps}
        </span>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {step === 1 && (
          <AgeRangeStep onSelect={(value) => handleNext("ageRange", value)} />
        )}
        {step === 2 && (
          <GenderStep onSelect={(value) => handleNext("gender", value)} />
        )}
        {step === 3 && (
          <BodyTypeStep onSelect={(value) => handleNext("bodyType", value)} />
        )}
        {step === 4 && (
          <GoalStep onSelect={(value) => handleNext("goal", value)} />
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-black border-t border-gray-800">
        <div className="container mx-auto max-w-4xl space-y-3">
          <label className="flex items-start gap-3 text-sm text-gray-400 cursor-pointer">
            <input type="checkbox" className="mt-1 accent-orange-500" />
            <span>
              Ao continuar, você concorda com nossos{" "}
              <a href="#" className="text-orange-500 hover:underline">
                Termos de serviço
              </a>{" "}
              e{" "}
              <a href="#" className="text-orange-500 hover:underline">
                Política de privacidade
              </a>
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm text-gray-400 cursor-pointer">
            <input type="checkbox" className="mt-1 accent-orange-500" />
            <span>Desejo receber atualizações sobre produtos e ofertas</span>
          </label>
        </div>
      </footer>
    </div>
  );
}

function AgeRangeStep({ onSelect }: { onSelect: (value: string) => void }) {
  const options = [
    { value: "18-29", label: "dos 18 aos 29 anos", emoji: "🧑" },
    { value: "30-39", label: "dos 30 aos 39 anos", emoji: "👨" },
    { value: "40-49", label: "dos 40 aos 49 anos", emoji: "👨‍🦳" },
    { value: "50+", label: "50 anos ou mais", emoji: "👴" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">CORPO PERFEITO</h1>
        <p className="text-gray-400 text-lg">De acordo com a sua idade e IMC</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <Card
            key={option.value}
            onClick={() => onSelect(option.value)}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-orange-500 transition-all cursor-pointer group p-6"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="text-6xl">{option.emoji}</div>
                <p className="text-white font-medium">Idade:</p>
                <p className="text-gray-400">{option.label}</p>
              </div>
              <div className="bg-orange-500 rounded-full p-2 group-hover:scale-110 transition-transform">
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function GenderStep({ onSelect }: { onSelect: (value: string) => void }) {
  const options = [
    { value: "male", label: "Masculino", emoji: "👨" },
    { value: "female", label: "Feminino", emoji: "👩" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Escolha seu gênero</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {options.map((option) => (
          <Card
            key={option.value}
            onClick={() => onSelect(option.value)}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-orange-500 transition-all cursor-pointer group p-8"
          >
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-white">{option.label}</span>
              <div className="text-5xl">{option.emoji}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function BodyTypeStep({ onSelect }: { onSelect: (value: string) => void }) {
  const options = [
    { value: "slim", label: "Magro", emoji: "🧍" },
    { value: "average", label: "Médio", emoji: "🧍‍♂️" },
    { value: "large", label: "Grande", emoji: "🧍‍♂️" },
    { value: "heavy", label: "Pesado", emoji: "🧍‍♂️" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Escolha o seu tipo de corpo</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {options.map((option) => (
          <Card
            key={option.value}
            onClick={() => onSelect(option.value)}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-orange-500 transition-all cursor-pointer group p-6"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl">{option.emoji}</div>
              <span className="text-white font-medium">{option.label}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function GoalStep({ onSelect }: { onSelect: (value: string) => void }) {
  const options = [
    {
      value: "beach_body",
      label: "Corpo de praia",
      description: "Definição e estética",
      emoji: "🏖️",
    },
    {
      value: "training_body",
      label: "Corpo de treino",
      description: "Força e resistência",
      emoji: "💪",
    },
    {
      value: "crossfit_body",
      label: "Corpo cross-fit",
      description: "Performance atlética",
      emoji: "🏋️",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Escolha o corpo que você deseja</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
        {options.map((option) => (
          <Card
            key={option.value}
            onClick={() => onSelect(option.value)}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-orange-500 transition-all cursor-pointer group p-6"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">{option.label}</h3>
                <p className="text-gray-400">{option.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-5xl">{option.emoji}</div>
                <div className="bg-orange-500 rounded-full p-2 group-hover:scale-110 transition-transform">
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
