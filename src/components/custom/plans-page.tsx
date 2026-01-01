"use client";

import { useState } from "react";
import { Check, Crown, Zap, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PlansPageProps {
  onSelectPlan: (plan: string) => void;
  onBack: () => void;
}

export default function PlansPage({ onSelectPlan, onBack }: PlansPageProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "free",
      name: "Básico",
      price: "Grátis",
      icon: Star,
      color: "from-gray-600 to-gray-700",
      features: [
        "Acesso a treinos básicos",
        "3 treinos por semana",
        "Dicas nutricionais básicas",
        "Acompanhamento de progresso",
      ],
      limitations: [
        "Sem treinos avançados",
        "Sem planos nutricionais personalizados",
        "Sem suporte prioritário",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: "R$ 29,90/mês",
      icon: Crown,
      color: "from-orange-500 to-red-500",
      popular: true,
      features: [
        "Todos os treinos disponíveis",
        "Treinos ilimitados",
        "Planos nutricionais personalizados",
        "Receitas exclusivas",
        "Acompanhamento detalhado",
        "Vídeos em alta qualidade",
        "Suporte prioritário",
        "Sem anúncios",
      ],
      limitations: [],
    },
    {
      id: "elite",
      name: "Elite",
      price: "R$ 49,90/mês",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      features: [
        "Tudo do Premium +",
        "Personal trainer virtual",
        "Consultoria nutricional",
        "Planos 100% personalizados",
        "Análise de progresso avançada",
        "Acesso antecipado a novidades",
        "Comunidade exclusiva",
        "Desafios e competições",
      ],
      limitations: [],
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setTimeout(() => {
      onSelectPlan(planId);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 shadow-2xl border-b border-orange-500/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Escolha seu Plano</h1>
              <p className="text-orange-100 mt-1">
                Desbloqueie todo o potencial do FitPro Academy
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-white hover:bg-white/20"
            >
              Voltar
            </Button>
          </div>
        </div>
      </header>

      {/* Plans Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;

            return (
              <Card
                key={plan.id}
                className={`relative bg-gradient-to-br from-gray-900 to-gray-800 border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isSelected
                    ? "border-orange-500 shadow-2xl shadow-orange-500/50"
                    : "border-gray-700 hover:border-orange-500/50"
                } ${plan.popular ? "md:scale-110 z-10" : ""}`}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    MAIS POPULAR
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="bg-green-500/20 rounded-full p-1 mt-0.5">
                          <Check className="w-4 h-4 text-green-400" />
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-gray-700">
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="bg-red-500/20 rounded-full p-1 mt-0.5">
                            <span className="text-red-400 text-xs">✕</span>
                          </div>
                          <span className="text-gray-500 text-sm line-through">
                            {limitation}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button
                    className={`w-full mt-6 bg-gradient-to-r ${plan.color} hover:opacity-90 text-white font-bold py-6 text-lg shadow-lg transition-all ${
                      isSelected ? "scale-105" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectPlan(plan.id);
                    }}
                  >
                    {plan.id === "free" ? "Começar Grátis" : "Assinar Agora"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-gray-400">
            💳 Pagamento seguro • 🔒 Cancele quando quiser • ✨ Sem taxas ocultas
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Pix</span>
            <span>Boleto</span>
          </div>
        </div>
      </div>
    </div>
  );
}
