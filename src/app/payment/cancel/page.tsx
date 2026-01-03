"use client";

import { useRouter } from "next/navigation";
import { XCircle, ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <Card className="bg-gradient-to-br from-red-900/20 to-gray-800 border-red-500/50 max-w-md w-full shadow-2xl">
        <CardContent className="p-8 text-center">
          {/* Ícone de cancelamento */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl" />
            <XCircle className="w-20 h-20 text-red-500 mx-auto relative" />
          </div>

          {/* Título */}
          <h1 className="text-3xl font-bold text-white mb-3">
            Pagamento Cancelado
          </h1>

          {/* Descrição */}
          <p className="text-gray-300 mb-6">
            Você cancelou o processo de pagamento. Nenhuma cobrança foi realizada.
          </p>

          {/* Informações */}
          <div className="bg-gray-900/50 rounded-lg p-4 mb-6 border border-gray-700">
            <div className="flex items-start gap-3 text-left">
              <HelpCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-300">
                <p className="font-medium text-white mb-1">Teve algum problema?</p>
                <p>
                  Se você encontrou alguma dificuldade durante o pagamento, 
                  entre em contato com nosso suporte. Estamos aqui para ajudar!
                </p>
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="space-y-3">
            <Button
              onClick={() => router.push("/")}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6 text-lg shadow-lg"
            >
              Tentar Novamente
            </Button>

            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 py-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </div>

          {/* Informação adicional */}
          <p className="text-xs text-gray-500 mt-6">
            Você ainda pode usar o plano gratuito com recursos básicos
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
