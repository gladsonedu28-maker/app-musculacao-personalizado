"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular verificação de pagamento
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Atualizar localStorage com plano premium
      const profile = localStorage.getItem("fitnessProfile");
      if (profile) {
        const parsedProfile = JSON.parse(profile);
        parsedProfile.subscriptionPlan = "premium"; // ou "elite" dependendo do plano
        parsedProfile.subscriptionActive = true;
        parsedProfile.subscriptionDate = new Date().toISOString();
        localStorage.setItem("fitnessProfile", JSON.stringify(parsedProfile));
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <Card className="bg-gray-800 border-gray-700 max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Processando pagamento...
            </h2>
            <p className="text-gray-400">
              Aguarde enquanto confirmamos sua assinatura
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <Card className="bg-gradient-to-br from-green-900/20 to-gray-800 border-green-500/50 max-w-md w-full shadow-2xl">
        <CardContent className="p-8 text-center">
          {/* Ícone de sucesso com animação */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto relative animate-bounce" />
          </div>

          {/* Título */}
          <h1 className="text-3xl font-bold text-white mb-3">
            Pagamento Confirmado! 🎉
          </h1>

          {/* Descrição */}
          <p className="text-gray-300 mb-6">
            Sua assinatura foi ativada com sucesso! Agora você tem acesso a todos os recursos premium.
          </p>

          {/* Benefícios desbloqueados */}
          <div className="bg-gray-900/50 rounded-lg p-4 mb-6 border border-green-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-bold text-white">Você desbloqueou:</h3>
            </div>
            <ul className="text-left space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Treinos ilimitados e personalizados
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Planos nutricionais exclusivos
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Acompanhamento detalhado de progresso
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Suporte prioritário
              </li>
            </ul>
          </div>

          {/* Botão de ação */}
          <Button
            onClick={() => router.push("/")}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-6 text-lg shadow-lg"
          >
            Começar a Treinar Agora
          </Button>

          {/* Informação adicional */}
          <p className="text-xs text-gray-500 mt-4">
            Um email de confirmação foi enviado para você
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
