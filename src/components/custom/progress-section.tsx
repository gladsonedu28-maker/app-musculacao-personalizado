"use client";

import { UserProfile, WorkoutLog } from "@/app/page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, Flame, Dumbbell, Award, Target } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ProgressSectionProps {
  userProfile: UserProfile;
  workoutLogs: WorkoutLog[];
}

export default function ProgressSection({ userProfile, workoutLogs }: ProgressSectionProps) {
  // Calcular estatísticas
  const totalWorkouts = workoutLogs.length;
  const totalMinutes = workoutLogs.reduce((acc, log) => acc + log.duration, 0);
  const totalCalories = workoutLogs.length * 350; // Estimativa
  const averageDuration = totalWorkouts > 0 ? Math.round(totalMinutes / totalWorkouts) : 0;

  // Preparar dados para gráficos
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split("T")[0];
  });

  const workoutsByDay = last7Days.map((date) => {
    const dayLogs = workoutLogs.filter((log) => log.date.split("T")[0] === date);
    const totalMinutes = dayLogs.reduce((acc, log) => acc + log.duration, 0);
    return {
      date: new Date(date).toLocaleDateString("pt-BR", { weekday: "short", day: "numeric" }),
      workouts: dayLogs.length,
      minutes: totalMinutes,
      calories: dayLogs.length * 350,
    };
  });

  // Calcular streak (sequência de dias consecutivos)
  const calculateStreak = () => {
    if (workoutLogs.length === 0) return 0;

    const sortedLogs = [...workoutLogs].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const log of sortedLogs) {
      const logDate = new Date(log.date);
      logDate.setHours(0, 0, 0, 0);

      const diffDays = Math.floor((currentDate.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === streak) {
        streak++;
        currentDate = logDate;
      } else if (diffDays > streak) {
        break;
      }
    }

    return streak;
  };

  const currentStreak = calculateStreak();

  // Conquistas
  const achievements = [
    {
      id: "first-workout",
      name: "Primeiro Passo",
      description: "Complete seu primeiro treino",
      icon: Dumbbell,
      unlocked: totalWorkouts >= 1,
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "5-workouts",
      name: "Consistência",
      description: "Complete 5 treinos",
      icon: Target,
      unlocked: totalWorkouts >= 5,
      color: "from-green-500 to-green-600",
    },
    {
      id: "10-workouts",
      name: "Dedicado",
      description: "Complete 10 treinos",
      icon: Award,
      unlocked: totalWorkouts >= 10,
      color: "from-orange-600 to-red-600",
    },
    {
      id: "7-day-streak",
      name: "Semana Perfeita",
      description: "Treine 7 dias seguidos",
      icon: Calendar,
      unlocked: currentStreak >= 7,
      color: "from-purple-500 to-pink-600",
    },
    {
      id: "1000-calories",
      name: "Queimador",
      description: "Queime 1000 calorias",
      icon: Flame,
      unlocked: totalCalories >= 1000,
      color: "from-red-500 to-orange-600",
    },
    {
      id: "30-workouts",
      name: "Atleta",
      description: "Complete 30 treinos",
      icon: TrendingUp,
      unlocked: totalWorkouts >= 30,
      color: "from-blue-500 to-cyan-600",
    },
  ];

  const unlockedAchievements = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm mb-1">Total de Treinos</p>
                <p className="text-4xl font-bold">{totalWorkouts}</p>
              </div>
              <Dumbbell className="w-12 h-12 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm mb-1">Tempo Total</p>
                <p className="text-4xl font-bold">{totalMinutes}</p>
                <p className="text-green-100 text-xs">minutos</p>
              </div>
              <Calendar className="w-12 h-12 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-orange-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm mb-1">Calorias Queimadas</p>
                <p className="text-4xl font-bold">{totalCalories}</p>
                <p className="text-orange-100 text-xs">kcal</p>
              </div>
              <Flame className="w-12 h-12 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm mb-1">Sequência Atual</p>
                <p className="text-4xl font-bold">{currentStreak}</p>
                <p className="text-purple-100 text-xs">dias</p>
              </div>
              <TrendingUp className="w-12 h-12 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Treinos nos Últimos 7 Dias</CardTitle>
            <CardDescription>Quantidade de treinos realizados</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={workoutsByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="workouts" fill="url(#colorWorkouts)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorWorkouts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calorias Queimadas</CardTitle>
            <CardDescription>Estimativa semanal de calorias</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={workoutsByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="calories"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{ fill: "#f97316", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Conquistas</CardTitle>
              <CardDescription>
                Você desbloqueou {unlockedAchievements} de {achievements.length} conquistas
              </CardDescription>
            </div>
            <Badge className="bg-gradient-to-r from-orange-500 to-green-500 text-white border-0 text-lg px-4 py-2">
              {unlockedAchievements}/{achievements.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`relative overflow-hidden rounded-xl border-2 p-6 transition-all duration-300 ${
                    achievement.unlocked
                      ? "border-orange-300 bg-gradient-to-br from-orange-50 to-green-50 hover:shadow-lg hover:scale-105"
                      : "border-gray-200 bg-gray-50 opacity-60"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl ${
                        achievement.unlocked
                          ? `bg-gradient-to-r ${achievement.color} text-white`
                          : "bg-gray-300 text-gray-500"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">{achievement.name}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      {achievement.unlocked && (
                        <Badge className="mt-2 bg-green-500 text-white border-0">
                          Desbloqueado! ✓
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Workouts */}
      {workoutLogs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Histórico Recente</CardTitle>
            <CardDescription>Seus últimos treinos realizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...workoutLogs]
                .reverse()
                .slice(0, 5)
                .map((log, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-orange-50 to-green-50 border-2 border-orange-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-r from-orange-500 to-green-500 text-white p-3 rounded-xl">
                        <Dumbbell className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold">{log.workoutType}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(log.date).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-orange-600">{log.duration} min</p>
                      <p className="text-sm text-muted-foreground">{log.exercises} exercícios</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Motivational Message */}
      {totalWorkouts === 0 && (
        <Card className="bg-gradient-to-r from-orange-500 to-green-500 text-white border-0">
          <CardContent className="p-8 text-center">
            <Dumbbell className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">Comece Sua Jornada!</h3>
            <p className="text-orange-100 mb-4">
              Complete seu primeiro treino para começar a acompanhar seu progresso e desbloquear conquistas.
            </p>
            <Badge className="bg-white text-orange-600 text-base px-6 py-2">
              Vá para a aba Treinos 🚀
            </Badge>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
