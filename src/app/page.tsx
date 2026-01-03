"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dumbbell, Target, TrendingUp, User, Calendar, Flame, Trophy, Crown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OnboardingModal from "@/components/custom/onboarding-modal";
import WorkoutSection from "@/components/custom/workout-section";
import NutritionSection from "@/components/custom/nutrition-section";
import ProgressSection from "@/components/custom/progress-section";
import SubscriptionFlow, { SubscriptionData } from "@/components/custom/subscription-flow";
import PlansPage from "@/components/custom/plans-page";
import { getCurrentUser, signOut } from "@/lib/auth";

export type UserGoal = "weight_loss" | "muscle_gain" | "definition";

export interface UserProfile {
  name: string;
  goal: UserGoal;
  weight: number;
  height: number;
  age: number;
  level: "beginner" | "intermediate" | "advanced";
  createdAt: string;
  subscriptionPlan?: string;
  subscriptionData?: SubscriptionData;
}

export interface WorkoutLog {
  date: string;
  workoutType: string;
  duration: number;
  exercises: number;
}

export default function FitnessApp() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSubscriptionFlow, setShowSubscriptionFlow] = useState(false);
  const [showPlansPage, setShowPlansPage] = useState(false);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [activeTab, setActiveTab] = useState("treinos");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await getCurrentUser();
      
      if (!user) {
        router.push("/login");
        return;
      }

      setIsAuthenticated(true);
      
      // Carregar dados do localStorage
      const savedProfile = localStorage.getItem("fitnessProfile");
      const savedLogs = localStorage.getItem("workoutLogs");

      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setUserProfile(profile);
        
        // Se não tem plano de assinatura, mostrar página de planos
        if (!profile.subscriptionPlan) {
          setShowPlansPage(true);
        }
      } else {
        setShowOnboarding(true);
      }

      if (savedLogs) {
        setWorkoutLogs(JSON.parse(savedLogs));
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem("fitnessProfile", JSON.stringify(profile));
    setShowOnboarding(false);
    setShowPlansPage(true);
  };

  const handleSubscriptionComplete = (data: SubscriptionData) => {
    if (userProfile) {
      const updatedProfile = {
        ...userProfile,
        subscriptionData: data,
      };
      setUserProfile(updatedProfile);
      localStorage.setItem("fitnessProfile", JSON.stringify(updatedProfile));
    }
    setShowSubscriptionFlow(false);
    setShowPlansPage(true);
  };

  const handlePlanSelect = (planId: string) => {
    if (userProfile) {
      const updatedProfile = {
        ...userProfile,
        subscriptionPlan: planId,
      };
      setUserProfile(updatedProfile);
      localStorage.setItem("fitnessProfile", JSON.stringify(updatedProfile));
      setShowPlansPage(false);
    }
  };

  const handleLogWorkout = (log: WorkoutLog) => {
    const updatedLogs = [...workoutLogs, log];
    setWorkoutLogs(updatedLogs);
    localStorage.setItem("workoutLogs", JSON.stringify(updatedLogs));
  };

  const getGoalText = (goal: UserGoal) => {
    const goals = {
      weight_loss: "Perda de Peso",
      muscle_gain: "Ganho de Massa",
      definition: "Definição Muscular",
    };
    return goals[goal];
  };

  const getPlanBadge = () => {
    if (!userProfile?.subscriptionPlan) return null;
    
    const badges = {
      free: { label: "Básico", color: "from-gray-600 to-gray-700" },
      premium: { label: "Premium", color: "from-orange-500 to-red-500" },
      elite: { label: "Elite", color: "from-purple-500 to-pink-500" },
    };

    const badge = badges[userProfile.subscriptionPlan as keyof typeof badges];
    if (!badge) return null;

    return (
      <div className={`bg-gradient-to-r ${badge.color} px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold`}>
        <Crown className="w-3 h-3" />
        {badge.label}
      </div>
    );
  };

  const getMotivationalQuote = () => {
    const quotes = [
      "Seu corpo pode fazer qualquer coisa. É sua mente que você precisa convencer!",
      "A dor que você sente hoje será a força que você sentirá amanhã.",
      "Não pare quando estiver cansado. Pare quando terminar.",
      "O sucesso não é acidental. É trabalho duro, perseverança e aprendizado.",
      "Treine como um atleta, pense como um campeão!",
      "Cada repetição te aproxima do seu objetivo!",
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="animate-pulse text-orange-500">
          <Dumbbell className="w-12 h-12" />
        </div>
      </div>
    );
  }

  // Mostrar fluxo de assinatura
  if (showSubscriptionFlow) {
    return (
      <SubscriptionFlow
        onComplete={handleSubscriptionComplete}
        onBack={() => setShowSubscriptionFlow(false)}
      />
    );
  }

  // Mostrar página de planos
  if (showPlansPage) {
    return (
      <PlansPage
        onSelectPlan={handlePlanSelect}
        onBack={() => setShowPlansPage(false)}
      />
    );
  }

  // Mostrar onboarding
  if (showOnboarding) {
    return <OnboardingModal onComplete={handleProfileComplete} />;
  }

  // Loading profile
  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="animate-pulse text-orange-500">
          <Dumbbell className="w-12 h-12" />
        </div>
      </div>
    );
  }

  const totalCalories = workoutLogs.reduce((sum, log) => sum + 350, 0);
  const totalMinutes = workoutLogs.reduce((sum, log) => sum + log.duration, 0);
  const isPremium = userProfile.subscriptionPlan === "premium" || userProfile.subscriptionPlan === "elite";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white shadow-2xl border-b border-orange-500/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl border border-white/20">
                <Dumbbell className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">FitPro Academy</h1>
                <p className="text-orange-100 text-sm">Seu treino de academia personalizado</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {getPlanBadge()}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 border border-white/20"
                onClick={() => setShowOnboarding(true)}
              >
                <User className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 border border-white/20"
                onClick={handleLogout}
              >
                <LogOut className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Banner */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crown className="w-5 h-5" />
                <span className="text-sm font-medium">
                  Desbloqueie treinos avançados e planos nutricionais personalizados
                </span>
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setShowPlansPage(true)}
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold"
              >
                Fazer Upgrade
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Section */}
      <div className="container mx-auto px-4 py-6">
        <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white border-0 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Olá, {userProfile.name}! 💪</h2>
                <p className="text-orange-100 mb-3">{getMotivationalQuote()}</p>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 border border-white/20">
                    <Target className="w-4 h-4" />
                    <span className="text-sm font-medium">{getGoalText(userProfile.goal)}</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 border border-white/20">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{workoutLogs.length} treinos</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 border border-white/20">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm font-medium">{totalMinutes} min totais</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl text-center border border-white/20">
                <Flame className="w-12 h-12 mx-auto mb-2" />
                <p className="text-3xl font-bold">{totalCalories}</p>
                <p className="text-sm text-orange-100">Calorias queimadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 border border-gray-700 shadow-xl h-auto p-1">
            <TabsTrigger
              value="treinos"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white py-3 text-gray-400"
            >
              <Dumbbell className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Treinos</span>
            </TabsTrigger>
            <TabsTrigger
              value="nutricao"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white py-3 text-gray-400"
            >
              <Flame className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Nutrição</span>
            </TabsTrigger>
            <TabsTrigger
              value="progresso"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white py-3 text-gray-400"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Progresso</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="treinos" className="space-y-6">
            <WorkoutSection userProfile={userProfile} onLogWorkout={handleLogWorkout} />
          </TabsContent>

          <TabsContent value="nutricao" className="space-y-6">
            <NutritionSection userProfile={userProfile} />
          </TabsContent>

          <TabsContent value="progresso" className="space-y-6">
            <ProgressSection userProfile={userProfile} workoutLogs={workoutLogs} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
