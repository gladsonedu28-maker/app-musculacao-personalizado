"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Dumbbell,
  TrendingUp,
  Activity,
  Calendar,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Target,
  Award,
  BarChart3,
  LogOut,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signOut } from "@/lib/auth";

interface UserData {
  id: string;
  name: string;
  email: string;
  age: number;
  goal: string;
  level: string;
  frequency: string;
  weight: number;
  height: number;
  createdAt: string;
  lastActive: string;
  workoutsCompleted: number;
}

export default function AdminPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("all");
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados
    // Em produção, isso viria do Supabase
    const mockUsers: UserData[] = [
      {
        id: "1",
        name: "João Silva",
        email: "joao@email.com",
        age: 28,
        goal: "muscle_gain",
        level: "intermediate",
        frequency: "5",
        weight: 75,
        height: 178,
        createdAt: "2024-01-15",
        lastActive: "2024-01-20",
        workoutsCompleted: 12,
      },
      {
        id: "2",
        name: "Maria Santos",
        email: "maria@email.com",
        age: 32,
        goal: "weight_loss",
        level: "beginner",
        frequency: "4",
        weight: 68,
        height: 165,
        createdAt: "2024-01-10",
        lastActive: "2024-01-19",
        workoutsCompleted: 8,
      },
      {
        id: "3",
        name: "Pedro Costa",
        email: "pedro@email.com",
        age: 25,
        goal: "definition",
        level: "advanced",
        frequency: "6",
        weight: 82,
        height: 180,
        createdAt: "2024-01-05",
        lastActive: "2024-01-20",
        workoutsCompleted: 18,
      },
    ];

    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const getGoalLabel = (goal: string) => {
    const goals: Record<string, string> = {
      weight_loss: "Perda de Peso",
      muscle_gain: "Ganho de Massa",
      definition: "Definição",
      health: "Saúde",
    };
    return goals[goal] || goal;
  };

  const getLevelLabel = (level: string) => {
    const levels: Record<string, string> = {
      beginner: "Iniciante",
      intermediate: "Intermediário",
      advanced: "Avançado",
    };
    return levels[level] || level;
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGoal = selectedGoal === "all" || user.goal === selectedGoal;
    return matchesSearch && matchesGoal;
  });

  const stats = {
    totalUsers: users.length,
    activeToday: users.filter(u => u.lastActive === new Date().toISOString().split('T')[0]).length,
    totalWorkouts: users.reduce((sum, u) => sum + u.workoutsCompleted, 0),
    avgWorkouts: users.length > 0 ? Math.round(users.reduce((sum, u) => sum + u.workoutsCompleted, 0) / users.length) : 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white shadow-2xl border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl border border-white/20">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Painel Administrativo</h1>
                <p className="text-purple-100 text-sm">FitPro Academy - Gestão de Usuários</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => router.push("/")}
                className="text-white hover:bg-white/20 border border-white/20"
              >
                Ver App
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-white hover:bg-white/20 border border-white/20"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Total de Usuários</p>
                  <p className="text-3xl font-bold">{stats.totalUsers}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                  <Users className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-700 border-0 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm mb-1">Ativos Hoje</p>
                  <p className="text-3xl font-bold">{stats.activeToday}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                  <Activity className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600 to-red-600 border-0 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm mb-1">Total de Treinos</p>
                  <p className="text-3xl font-bold">{stats.totalWorkouts}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                  <Dumbbell className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-pink-600 border-0 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm mb-1">Média de Treinos</p>
                  <p className="text-3xl font-bold">{stats.avgWorkouts}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                  <TrendingUp className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="bg-gray-800 border-gray-700 shadow-2xl">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-2xl text-white">Gerenciamento de Usuários</CardTitle>
              <div className="flex gap-3">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filtros */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              >
                <option value="all">Todos os Objetivos</option>
                <option value="weight_loss">Perda de Peso</option>
                <option value="muscle_gain">Ganho de Massa</option>
                <option value="definition">Definição</option>
                <option value="health">Saúde</option>
              </select>
            </div>

            {/* Tabela de Usuários */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-pulse text-purple-500">
                  <Activity className="w-12 h-12 mx-auto" />
                </div>
                <p className="text-gray-400 mt-4">Carregando usuários...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-4 px-4 text-gray-300 font-medium">Usuário</th>
                      <th className="text-left py-4 px-4 text-gray-300 font-medium">Objetivo</th>
                      <th className="text-left py-4 px-4 text-gray-300 font-medium">Nível</th>
                      <th className="text-left py-4 px-4 text-gray-300 font-medium">Frequência</th>
                      <th className="text-left py-4 px-4 text-gray-300 font-medium">Treinos</th>
                      <th className="text-left py-4 px-4 text-gray-300 font-medium">Última Atividade</th>
                      <th className="text-left py-4 px-4 text-gray-300 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-white font-medium">{user.name}</p>
                            <p className="text-gray-400 text-sm">{user.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm">
                            <Target className="w-3 h-3" />
                            {getGoalLabel(user.goal)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-300">{getLevelLabel(user.level)}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-300">{user.frequency}x/semana</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                            <Award className="w-3 h-3" />
                            {user.workoutsCompleted}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-400 text-sm">
                            {new Date(user.lastActive).toLocaleDateString('pt-BR')}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-700">
                              Ver Detalhes
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Nenhum usuário encontrado</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
