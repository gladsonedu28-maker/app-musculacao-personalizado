"use client";

import { useState } from "react";
import { UserGoal, UserProfile } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, TrendingDown, TrendingUp, Zap } from "lucide-react";

interface OnboardingModalProps {
  onComplete: (profile: UserProfile) => void;
}

export default function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    goal: "" as UserGoal,
    weight: "",
    height: "",
    age: "",
    level: "" as "beginner" | "intermediate" | "advanced",
  });

  const handleGoalSelect = (goal: UserGoal) => {
    setFormData({ ...formData, goal });
    setStep(2);
  };

  const handleLevelSelect = (level: "beginner" | "intermediate" | "advanced") => {
    setFormData({ ...formData, level });
    setStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: UserProfile = {
      name: formData.name,
      goal: formData.goal,
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      age: parseInt(formData.age),
      level: formData.level,
      createdAt: new Date().toISOString(),
    };
    onComplete(profile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-green-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
            Bem-vindo ao FitPro! 💪
          </CardTitle>
          <CardDescription className="text-base">
            Vamos personalizar seu treino em {step} de 3 passos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Qual é o seu objetivo?</h3>
                <p className="text-muted-foreground">Escolha o que melhor descreve sua meta</p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <button
                  onClick={() => handleGoalSelect("weight_loss")}
                  className="group relative overflow-hidden rounded-2xl border-2 border-orange-200 hover:border-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 text-center">
                    <div className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <TrendingDown className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Perda de Peso</h4>
                    <p className="text-sm text-muted-foreground">Queimar gordura e emagrecer</p>
                  </div>
                </button>

                <button
                  onClick={() => handleGoalSelect("muscle_gain")}
                  className="group relative overflow-hidden rounded-2xl border-2 border-green-200 hover:border-green-500 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 text-center">
                    <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Ganho de Massa</h4>
                    <p className="text-sm text-muted-foreground">Aumentar músculos e força</p>
                  </div>
                </button>

                <button
                  onClick={() => handleGoalSelect("definition")}
                  className="group relative overflow-hidden rounded-2xl border-2 border-orange-200 hover:border-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 text-center">
                    <div className="bg-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Zap className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Definição</h4>
                    <p className="text-sm text-muted-foreground">Tonificar e definir músculos</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Qual é o seu nível?</h3>
                <p className="text-muted-foreground">Isso nos ajuda a personalizar seus treinos</p>
              </div>
              <div className="grid gap-4">
                <button
                  onClick={() => handleLevelSelect("beginner")}
                  className="group rounded-xl border-2 border-gray-200 hover:border-orange-500 p-6 text-left transition-all duration-300 hover:shadow-lg hover:scale-102"
                >
                  <h4 className="font-bold text-lg mb-2">🌱 Iniciante</h4>
                  <p className="text-sm text-muted-foreground">
                    Começando agora ou com pouca experiência em treinos
                  </p>
                </button>

                <button
                  onClick={() => handleLevelSelect("intermediate")}
                  className="group rounded-xl border-2 border-gray-200 hover:border-green-500 p-6 text-left transition-all duration-300 hover:shadow-lg hover:scale-102"
                >
                  <h4 className="font-bold text-lg mb-2">🔥 Intermediário</h4>
                  <p className="text-sm text-muted-foreground">
                    Treino regularmente há alguns meses ou anos
                  </p>
                </button>

                <button
                  onClick={() => handleLevelSelect("advanced")}
                  className="group rounded-xl border-2 border-gray-200 hover:border-orange-600 p-6 text-left transition-all duration-300 hover:shadow-lg hover:scale-102"
                >
                  <h4 className="font-bold text-lg mb-2">💪 Avançado</h4>
                  <p className="text-sm text-muted-foreground">
                    Experiência sólida e busco desafios maiores
                  </p>
                </button>
              </div>
              <Button
                variant="ghost"
                onClick={() => setStep(1)}
                className="w-full"
              >
                Voltar
              </Button>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Últimos detalhes</h3>
                <p className="text-muted-foreground">Precisamos de algumas informações básicas</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    placeholder="Como você gostaria de ser chamado?"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="age">Idade</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      required
                      min="15"
                      max="100"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      required
                      min="30"
                      max="300"
                      step="0.1"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="height">Altura (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="170"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      required
                      min="100"
                      max="250"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600"
                >
                  Começar Treino! 🚀
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
