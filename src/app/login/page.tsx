"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dumbbell, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn, signUp } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        await signIn(formData.email, formData.password);
        router.push("/questionnaire");
      } else {
        // Cadastro
        if (formData.password !== formData.confirmPassword) {
          setError("As senhas não coincidem");
          setLoading(false);
          return;
        }
        
        if (formData.password.length < 6) {
          setError("A senha deve ter pelo menos 6 caracteres");
          setLoading(false);
          return;
        }

        await signUp(formData.email, formData.password);
        router.push("/questionnaire");
      }
    } catch (err: any) {
      setError(err.message || "Erro ao processar sua solicitação");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-4 shadow-2xl">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">FitPro Academy</h1>
          <p className="text-gray-400">Seu treino personalizado de academia</p>
        </div>

        {/* Card de Login/Cadastro */}
        <Card className="bg-gray-800 border-gray-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-white">
              {isLogin ? "Entrar na sua conta" : "Criar nova conta"}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {isLogin 
                ? "Entre com seu email e senha para continuar" 
                : "Preencha os dados abaixo para começar"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirmar Senha (apenas no cadastro) */}
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-300">Confirmar Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Mensagem de erro */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Botão de submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6 text-lg shadow-xl"
              >
                {loading ? "Processando..." : isLogin ? "Entrar" : "Criar Conta"}
              </Button>

              {/* Toggle Login/Cadastro */}
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                  }}
                  className="text-orange-400 hover:text-orange-300 text-sm font-medium"
                >
                  {isLogin 
                    ? "Não tem uma conta? Cadastre-se" 
                    : "Já tem uma conta? Faça login"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Acesso Admin */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/admin")}
            className="text-gray-500 hover:text-gray-400 text-sm flex items-center justify-center gap-2 mx-auto"
          >
            <User className="w-4 h-4" />
            Acesso Administrativo
          </button>
        </div>
      </div>
    </div>
  );
}
