"use client";

import { UserProfile } from "@/app/page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Apple, Beef, Egg, Fish, Salad, Wheat, Coffee, Droplets } from "lucide-react";

interface NutritionSectionProps {
  userProfile: UserProfile;
}

interface Meal {
  name: string;
  time: string;
  foods: string[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface Recipe {
  id: string;
  name: string;
  icon: any;
  prepTime: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

export default function NutritionSection({ userProfile }: NutritionSectionProps) {
  const getMealPlanByGoal = (): Meal[] => {
    const mealPlans = {
      weight_loss: [
        {
          name: "Café da Manhã",
          time: "7:00 - 8:00",
          foods: ["2 ovos mexidos", "1 fatia de pão integral", "1 xícara de café sem açúcar", "1 fruta (maçã ou banana)"],
          calories: 350,
          protein: 20,
          carbs: 35,
          fats: 12,
        },
        {
          name: "Lanche da Manhã",
          time: "10:00 - 10:30",
          foods: ["1 iogurte grego natural", "1 colher de granola", "Frutas vermelhas"],
          calories: 180,
          protein: 15,
          carbs: 20,
          fats: 5,
        },
        {
          name: "Almoço",
          time: "12:00 - 13:00",
          foods: ["150g de frango grelhado", "Salada verde à vontade", "3 colheres de arroz integral", "Legumes cozidos"],
          calories: 450,
          protein: 40,
          carbs: 40,
          fats: 10,
        },
        {
          name: "Lanche da Tarde",
          time: "16:00 - 16:30",
          foods: ["1 shake de proteína", "1 punhado de castanhas"],
          calories: 200,
          protein: 25,
          carbs: 10,
          fats: 8,
        },
        {
          name: "Jantar",
          time: "19:00 - 20:00",
          foods: ["150g de peixe assado", "Salada verde", "Legumes grelhados", "2 colheres de quinoa"],
          calories: 400,
          protein: 35,
          carbs: 30,
          fats: 12,
        },
      ],
      muscle_gain: [
        {
          name: "Café da Manhã",
          time: "7:00 - 8:00",
          foods: ["4 ovos mexidos", "2 fatias de pão integral", "1 copo de leite", "1 banana com aveia"],
          calories: 550,
          protein: 35,
          carbs: 60,
          fats: 18,
        },
        {
          name: "Lanche da Manhã",
          time: "10:00 - 10:30",
          foods: ["1 shake de proteína", "2 colheres de pasta de amendoim", "1 banana"],
          calories: 400,
          protein: 30,
          carbs: 40,
          fats: 12,
        },
        {
          name: "Almoço",
          time: "12:00 - 13:00",
          foods: ["200g de carne vermelha magra", "5 colheres de arroz integral", "Feijão", "Salada", "Batata doce"],
          calories: 700,
          protein: 50,
          carbs: 80,
          fats: 15,
        },
        {
          name: "Lanche da Tarde",
          time: "16:00 - 16:30",
          foods: ["1 shake de proteína", "2 fatias de pão integral", "Queijo cottage", "Frutas"],
          calories: 450,
          protein: 35,
          carbs: 45,
          fats: 10,
        },
        {
          name: "Jantar",
          time: "19:00 - 20:00",
          foods: ["200g de frango", "4 colheres de arroz", "Legumes", "Salada verde"],
          calories: 600,
          protein: 45,
          carbs: 65,
          fats: 12,
        },
        {
          name: "Ceia",
          time: "22:00",
          foods: ["Iogurte grego", "Whey protein", "Castanhas"],
          calories: 300,
          protein: 30,
          carbs: 15,
          fats: 12,
        },
      ],
      definition: [
        {
          name: "Café da Manhã",
          time: "7:00 - 8:00",
          foods: ["3 claras + 1 ovo inteiro", "2 fatias de pão integral", "Café sem açúcar", "1 fruta"],
          calories: 380,
          protein: 25,
          carbs: 45,
          fats: 10,
        },
        {
          name: "Lanche da Manhã",
          time: "10:00 - 10:30",
          foods: ["1 shake de proteína", "1 colher de pasta de amendoim"],
          calories: 250,
          protein: 25,
          carbs: 15,
          fats: 8,
        },
        {
          name: "Almoço",
          time: "12:00 - 13:00",
          foods: ["180g de frango grelhado", "4 colheres de arroz integral", "Salada verde", "Legumes"],
          calories: 500,
          protein: 45,
          carbs: 50,
          fats: 10,
        },
        {
          name: "Lanche da Tarde",
          time: "16:00 - 16:30",
          foods: ["Iogurte grego", "Frutas vermelhas", "1 colher de granola"],
          calories: 220,
          protein: 20,
          carbs: 25,
          fats: 5,
        },
        {
          name: "Jantar",
          time: "19:00 - 20:00",
          foods: ["180g de peixe", "3 colheres de batata doce", "Salada verde", "Legumes grelhados"],
          calories: 450,
          protein: 40,
          carbs: 40,
          fats: 12,
        },
      ],
    };

    return mealPlans[userProfile.goal] || [];
  };

  const getRecipesByGoal = (): Recipe[] => {
    const recipes: Recipe[] = [
      {
        id: "protein-pancake",
        name: "Panqueca Proteica",
        icon: Egg,
        prepTime: "15 min",
        difficulty: "Fácil",
        ingredients: [
          "2 ovos inteiros",
          "1 banana madura",
          "2 colheres de aveia",
          "1 scoop de whey protein",
          "Canela a gosto",
        ],
        instructions: [
          "Bata todos os ingredientes no liquidificador",
          "Aqueça uma frigideira antiaderente",
          "Despeje a massa e cozinhe em fogo médio",
          "Vire quando formar bolhas na superfície",
          "Sirva com frutas ou mel",
        ],
        nutrition: { calories: 380, protein: 35, carbs: 40, fats: 10 },
      },
      {
        id: "chicken-salad",
        name: "Salada de Frango Fit",
        icon: Salad,
        prepTime: "20 min",
        difficulty: "Fácil",
        ingredients: [
          "200g de peito de frango",
          "Mix de folhas verdes",
          "Tomate cereja",
          "Pepino",
          "Azeite e limão",
          "Temperos naturais",
        ],
        instructions: [
          "Tempere e grelhe o frango",
          "Corte o frango em cubos",
          "Lave e corte os vegetais",
          "Monte a salada em um bowl",
          "Tempere com azeite e limão",
        ],
        nutrition: { calories: 320, protein: 42, carbs: 15, fats: 12 },
      },
      {
        id: "salmon-sweet-potato",
        name: "Salmão com Batata Doce",
        icon: Fish,
        prepTime: "30 min",
        difficulty: "Médio",
        ingredients: [
          "1 filé de salmão (180g)",
          "1 batata doce média",
          "Aspargos",
          "Azeite",
          "Limão e ervas",
        ],
        instructions: [
          "Asse a batata doce em cubos",
          "Tempere o salmão com limão e ervas",
          "Grelhe o salmão por 4-5 min cada lado",
          "Refogue os aspargos rapidamente",
          "Monte o prato e sirva",
        ],
        nutrition: { calories: 480, protein: 38, carbs: 45, fats: 18 },
      },
    ];

    return recipes;
  };

  const meals = getMealPlanByGoal();
  const recipes = getRecipesByGoal();

  const totalDailyNutrition = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  return (
    <div className="space-y-6">
      {/* Daily Summary */}
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Resumo Diário</CardTitle>
          <CardDescription className="text-green-100">
            Plano nutricional personalizado para {userProfile.goal === "weight_loss" ? "perda de peso" : userProfile.goal === "muscle_gain" ? "ganho de massa" : "definição"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <Droplets className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{totalDailyNutrition.calories}</p>
              <p className="text-sm text-green-100">Calorias</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <Beef className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{totalDailyNutrition.protein}g</p>
              <p className="text-sm text-green-100">Proteínas</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <Wheat className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{totalDailyNutrition.carbs}g</p>
              <p className="text-sm text-green-100">Carboidratos</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <Coffee className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{totalDailyNutrition.fats}g</p>
              <p className="text-sm text-green-100">Gorduras</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meal Plan */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Plano de Refeições</h3>
        <div className="space-y-4">
          {meals.map((meal, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{meal.name}</CardTitle>
                    <CardDescription>{meal.time}</CardDescription>
                  </div>
                  <Badge className="bg-gradient-to-r from-orange-500 to-green-500 text-white border-0">
                    {meal.calories} kcal
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {meal.foods.map((food, foodIndex) => (
                    <li key={foodIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-green-500" />
                      {food}
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Proteína</p>
                    <p className="font-bold text-sm text-orange-600">{meal.protein}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Carbos</p>
                    <p className="font-bold text-sm text-green-600">{meal.carbs}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Gorduras</p>
                    <p className="font-bold text-sm text-orange-600">{meal.fats}g</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recipes */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Receitas Saudáveis</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => {
            const Icon = recipe.icon;
            return (
              <Card key={recipe.id} className="hover:shadow-xl transition-all duration-300 hover:scale-102">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-gradient-to-br from-orange-100 to-green-100 p-3 rounded-xl">
                      <Icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{recipe.name}</CardTitle>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {recipe.prepTime}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {recipe.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Ingredientes:</h4>
                    <ul className="space-y-1">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-4 gap-2 pt-3 border-t">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Cal</p>
                      <p className="font-bold text-sm">{recipe.nutrition.calories}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Prot</p>
                      <p className="font-bold text-sm text-orange-600">{recipe.nutrition.protein}g</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Carb</p>
                      <p className="font-bold text-sm text-green-600">{recipe.nutrition.carbs}g</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Gord</p>
                      <p className="font-bold text-sm text-orange-600">{recipe.nutrition.fats}g</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Hydration Tip */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 text-white p-4 rounded-full">
              <Droplets className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg mb-1">Hidratação é Fundamental!</h4>
              <p className="text-sm text-muted-foreground">
                Beba pelo menos 2-3 litros de água por dia. Mantenha-se hidratado antes, durante e após os treinos.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
