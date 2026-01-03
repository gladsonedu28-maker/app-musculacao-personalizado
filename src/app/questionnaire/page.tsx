"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Dumbbell, 
  ArrowRight, 
  ArrowLeft, 
  Target, 
  Activity, 
  Calendar,
  TrendingUp,
  Weight,
  Ruler,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface QuestionnaireData {
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  goal: string;
  level: string;
  frequency: string;
  injuries: string;
  preferences: string;
}

export default function QuestionnairePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuestionnaireData>({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    goal: "",
    level: "",
    frequency: "",
    injuries: "",
    preferences: "",
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // Salvar dados no localStorage
    const profile = {
      name: data.name,
      age: parseInt(data.age),
      gender: data.gender,
      weight: parseFloat(data.weight),
      height: parseFloat(data.height),
      goal: data.goal,
      level: data.level,
      frequency: data.frequency,
      injuries: data.injuries,
      preferences: data.preferences,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("fitnessProfile", JSON.stringify(profile));
    router.push("/");
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return data.name && data.age && data.gender;
      case 2:
        return data.weight && data.height;
      case 3:
        return data.goal;
      case 4:
        return data.level && data.frequency;
      case 5:
        return true; // Última etapa é opcional
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-4 shadow-2xl">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Vamos conhecer você!</h1>
          <p className="text-gray-400">
            Responda algumas perguntas para criarmos seu treino personalizado
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Etapa {step} de {totalSteps}</span>
            <span className="text-sm text-orange-400 font-medium">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Card com perguntas */}
        <Card className="bg-gray-800 border-gray-700 shadow-2xl">
          <CardContent className="p-8">
            {/* Etapa 1: Informações Básicas */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Informações Básicas</h2>
                    <p className="text-gray-400">Conte-nos um pouco sobre você</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300 mb-2 block">Qual é o seu nome?</Label>
                    <Input
                      id="name"
                      placeholder="Digite seu nome"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="age" className="text-gray-300 mb-2 block">Qual é a sua idade?</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Ex: 25"
                      value={data.age}
                      onChange={(e) => setData({ ...data, age: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300 mb-3 block">Qual é o seu gênero?</Label>
                    <RadioGroup value={data.gender} onValueChange={(value) => setData({ ...data, gender: value })}>
                      <div className="grid grid-cols-2 gap-3">
                        <label className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          data.gender === "male" 
                            ? "border-orange-500 bg-orange-500/10" 
                            : "border-gray-600 bg-gray-700 hover:border-gray-500"
                        }`}>
                          <RadioGroupItem value="male" id="male" />
                          <span className="text-white font-medium">Masculino</span>
                        </label>
                        <label className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          data.gender === "female" 
                            ? "border-orange-500 bg-orange-500/10" 
                            : "border-gray-600 bg-gray-700 hover:border-gray-500"
                        }`}>
                          <RadioGroupItem value="female" id="female" />
                          <span className="text-white font-medium">Feminino</span>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}

            {/* Etapa 2: Medidas Corporais */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <Weight className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Medidas Corporais</h2>
                    <p className="text-gray-400">Precisamos saber suas medidas atuais</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="weight" className="text-gray-300 mb-2 block">Qual é o seu peso atual? (kg)</Label>
                    <div className="relative">
                      <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        placeholder="Ex: 75.5"
                        value={data.weight}
                        onChange={(e) => setData({ ...data, weight: e.target.value })}
                        className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="height" className="text-gray-300 mb-2 block">Qual é a sua altura? (cm)</Label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="height"
                        type="number"
                        placeholder="Ex: 175"
                        value={data.height}
                        onChange={(e) => setData({ ...data, height: e.target.value })}
                        className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* IMC Calculado */}
                  {data.weight && data.height && (
                    <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                      <p className="text-gray-400 text-sm mb-1">Seu IMC aproximado:</p>
                      <p className="text-2xl font-bold text-orange-400">
                        {(parseFloat(data.weight) / Math.pow(parseFloat(data.height) / 100, 2)).toFixed(1)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Etapa 3: Objetivo */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Qual é o seu objetivo?</h2>
                    <p className="text-gray-400">Escolha o que você quer alcançar</p>
                  </div>
                </div>

                <RadioGroup value={data.goal} onValueChange={(value) => setData({ ...data, goal: value })}>
                  <div className="space-y-3">
                    <label className={`flex items-start space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      data.goal === "weight_loss" 
                        ? "border-orange-500 bg-orange-500/10" 
                        : "border-gray-600 bg-gray-700 hover:border-gray-500"
                    }`}>
                      <RadioGroupItem value="weight_loss" id="weight_loss" className="mt-1" />
                      <div>
                        <p className="text-white font-medium">Perda de Peso</p>
                        <p className="text-gray-400 text-sm">Queimar gordura e reduzir medidas</p>
                      </div>
                    </label>

                    <label className={`flex items-start space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      data.goal === "muscle_gain" 
                        ? "border-orange-500 bg-orange-500/10" 
                        : "border-gray-600 bg-gray-700 hover:border-gray-500"
                    }`}>
                      <RadioGroupItem value="muscle_gain" id="muscle_gain" className="mt-1" />
                      <div>
                        <p className="text-white font-medium">Ganho de Massa Muscular</p>
                        <p className="text-gray-400 text-sm">Aumentar músculos e força</p>
                      </div>
                    </label>

                    <label className={`flex items-start space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      data.goal === "definition" 
                        ? "border-orange-500 bg-orange-500/10" 
                        : "border-gray-600 bg-gray-700 hover:border-gray-500"
                    }`}>
                      <RadioGroupItem value="definition" id="definition" className="mt-1" />
                      <div>
                        <p className="text-white font-medium">Definição Muscular</p>
                        <p className="text-gray-400 text-sm">Manter massa e reduzir gordura</p>
                      </div>
                    </label>

                    <label className={`flex items-start space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      data.goal === "health" 
                        ? "border-orange-500 bg-orange-500/10" 
                        : "border-gray-600 bg-gray-700 hover:border-gray-500"
                    }`}>
                      <RadioGroupItem value="health" id="health" className="mt-1" />
                      <div>
                        <p className="text-white font-medium">Saúde e Bem-estar</p>
                        <p className="text-gray-400 text-sm">Melhorar condicionamento físico geral</p>
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Etapa 4: Nível e Frequência */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Experiência e Disponibilidade</h2>
                    <p className="text-gray-400">Qual é o seu nível atual?</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label className="text-gray-300 mb-3 block">Nível de experiência</Label>
                    <RadioGroup value={data.level} onValueChange={(value) => setData({ ...data, level: value })}>
                      <div className="space-y-3">
                        <label className={`flex items-start space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          data.level === "beginner" 
                            ? "border-orange-500 bg-orange-500/10" 
                            : "border-gray-600 bg-gray-700 hover:border-gray-500"
                        }`}>
                          <RadioGroupItem value="beginner" id="beginner" className="mt-1" />
                          <div>
                            <p className="text-white font-medium">Iniciante</p>
                            <p className="text-gray-400 text-sm">Pouca ou nenhuma experiência</p>
                          </div>
                        </label>

                        <label className={`flex items-start space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          data.level === "intermediate" 
                            ? "border-orange-500 bg-orange-500/10" 
                            : "border-gray-600 bg-gray-700 hover:border-gray-500"
                        }`}>
                          <RadioGroupItem value="intermediate" id="intermediate" className="mt-1" />
                          <div>
                            <p className="text-white font-medium">Intermediário</p>
                            <p className="text-gray-400 text-sm">Treino há alguns meses</p>
                          </div>
                        </label>

                        <label className={`flex items-start space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          data.level === "advanced" 
                            ? "border-orange-500 bg-orange-500/10" 
                            : "border-gray-600 bg-gray-700 hover:border-gray-500"
                        }`}>
                          <RadioGroupItem value="advanced" id="advanced" className="mt-1" />
                          <div>
                            <p className="text-white font-medium">Avançado</p>
                            <p className="text-gray-400 text-sm">Treino há mais de 1 ano</p>
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-gray-300 mb-3 block">Quantos dias por semana pode treinar?</Label>
                    <RadioGroup value={data.frequency} onValueChange={(value) => setData({ ...data, frequency: value })}>
                      <div className="grid grid-cols-2 gap-3">
                        {["3", "4", "5", "6"].map((days) => (
                          <label key={days} className={`flex items-center justify-center space-x-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            data.frequency === days 
                              ? "border-orange-500 bg-orange-500/10" 
                              : "border-gray-600 bg-gray-700 hover:border-gray-500"
                          }`}>
                            <RadioGroupItem value={days} id={`days-${days}`} />
                            <span className="text-white font-medium">{days} dias</span>
                          </label>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}

            {/* Etapa 5: Informações Adicionais */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Informações Adicionais</h2>
                    <p className="text-gray-400">Opcional, mas nos ajuda a personalizar melhor</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="injuries" className="text-gray-300 mb-2 block">
                      Tem alguma lesão ou limitação física?
                    </Label>
                    <Input
                      id="injuries"
                      placeholder="Ex: Dor no joelho, problema na coluna... (opcional)"
                      value={data.injuries}
                      onChange={(e) => setData({ ...data, injuries: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="preferences" className="text-gray-300 mb-2 block">
                      Preferências ou observações
                    </Label>
                    <Input
                      id="preferences"
                      placeholder="Ex: Prefiro treinar pela manhã, não gosto de esteira... (opcional)"
                      value={data.preferences}
                      onChange={(e) => setData({ ...data, preferences: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/50 p-4 rounded-lg">
                  <p className="text-green-400 text-sm">
                    ✓ Pronto! Vamos criar seu treino personalizado baseado nas suas respostas.
                  </p>
                </div>
              </div>
            )}

            {/* Botões de navegação */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === totalSteps ? "Finalizar" : "Próximo"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
