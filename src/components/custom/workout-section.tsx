"use client";

import { useState } from "react";
import { UserProfile, WorkoutLog } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Flame, CheckCircle2, ChevronRight, Dumbbell } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface WorkoutSectionProps {
  userProfile: UserProfile;
  onLogWorkout: (log: WorkoutLog) => void;
}

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  videoId?: string;
  equipment?: string;
}

interface Workout {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: string;
  calories: number;
  exercises: Exercise[];
  muscleGroup: string;
}

export default function WorkoutSection({ userProfile, onLogWorkout }: WorkoutSectionProps) {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<number>(0);

  const getWorkoutsByGoal = (): Workout[] => {
    const workouts = {
      weight_loss: [
        {
          id: "cardio-hiit",
          title: "HIIT Cardio Intenso",
          description: "Treino intervalado de alta intensidade para queimar gordura",
          duration: 30,
          difficulty: "Intermediário",
          calories: 400,
          muscleGroup: "Corpo Todo",
          exercises: [
            { name: "Polichinelos", sets: "3", reps: "30 seg", rest: "15 seg", equipment: "Nenhum" },
            { name: "Burpees", sets: "3", reps: "15", rest: "30 seg", equipment: "Nenhum" },
            { name: "Mountain Climbers", sets: "3", reps: "30 seg", rest: "15 seg", equipment: "Nenhum" },
            { name: "Jump Squats", sets: "3", reps: "15", rest: "30 seg", equipment: "Nenhum" },
            { name: "High Knees", sets: "3", reps: "30 seg", rest: "15 seg", equipment: "Nenhum" },
          ],
        },
        {
          id: "full-body-burn",
          title: "Queima Total Academia",
          description: "Treino de corpo inteiro focado em queimar calorias com equipamentos",
          duration: 45,
          difficulty: "Iniciante",
          calories: 380,
          muscleGroup: "Corpo Todo",
          exercises: [
            { name: "Esteira - Corrida Intervalada", sets: "1", reps: "10 min", rest: "1 min", equipment: "Esteira" },
            { name: "Leg Press", sets: "3", reps: "15", rest: "45 seg", equipment: "Leg Press" },
            { name: "Supino Máquina", sets: "3", reps: "15", rest: "45 seg", equipment: "Máquina" },
            { name: "Remada Máquina", sets: "3", reps: "15", rest: "45 seg", equipment: "Máquina" },
            { name: "Bicicleta Ergométrica", sets: "1", reps: "10 min", rest: "0", equipment: "Bicicleta" },
          ],
        },
        {
          id: "cardio-resistance",
          title: "Cardio + Resistência",
          description: "Combinação perfeita de aeróbico e musculação",
          duration: 50,
          difficulty: "Intermediário",
          calories: 450,
          muscleGroup: "Corpo Todo",
          exercises: [
            { name: "Elíptico", sets: "1", reps: "8 min", rest: "1 min", equipment: "Elíptico" },
            { name: "Agachamento Smith", sets: "4", reps: "12", rest: "60 seg", equipment: "Smith Machine" },
            { name: "Desenvolvimento Máquina", sets: "3", reps: "12", rest: "60 seg", equipment: "Máquina" },
            { name: "Puxada Frontal", sets: "3", reps: "12", rest: "60 seg", equipment: "Polia" },
            { name: "Abdominal Máquina", sets: "3", reps: "20", rest: "45 seg", equipment: "Máquina" },
            { name: "Esteira - Caminhada Inclinada", sets: "1", reps: "10 min", rest: "0", equipment: "Esteira" },
          ],
        },
      ],
      muscle_gain: [
        {
          id: "chest-triceps",
          title: "Peito e Tríceps",
          description: "Treino focado em hipertrofia da parte superior",
          duration: 60,
          difficulty: "Intermediário",
          calories: 320,
          muscleGroup: "Peito e Tríceps",
          exercises: [
            { name: "Supino Reto Barra", sets: "4", reps: "8-10", rest: "2 min", equipment: "Barra" },
            { name: "Supino Inclinado Halteres", sets: "4", reps: "10-12", rest: "90 seg", equipment: "Halteres" },
            { name: "Crucifixo Máquina", sets: "3", reps: "12-15", rest: "60 seg", equipment: "Máquina" },
            { name: "Crossover", sets: "3", reps: "12-15", rest: "60 seg", equipment: "Polia" },
            { name: "Tríceps Testa Barra W", sets: "4", reps: "10-12", rest: "90 seg", equipment: "Barra W" },
            { name: "Tríceps Corda", sets: "3", reps: "12-15", rest: "60 seg", equipment: "Polia" },
            { name: "Mergulho no Banco", sets: "3", reps: "12-15", rest: "60 seg", equipment: "Banco" },
          ],
        },
        {
          id: "back-biceps",
          title: "Costas e Bíceps",
          description: "Desenvolvimento completo das costas e braços",
          duration: 60,
          difficulty: "Intermediário",
          calories: 340,
          muscleGroup: "Costas e Bíceps",
          exercises: [
            { name: "Barra Fixa", sets: "4", reps: "8-10", rest: "2 min", equipment: "Barra Fixa" },
            { name: "Remada Curvada Barra", sets: "4", reps: "10-12", rest: "90 seg", equipment: "Barra" },
            { name: "Puxada Frontal", sets: "4", reps: "10-12", rest: "90 seg", equipment: "Polia" },
            { name: "Remada Cavalinho", sets: "3", reps: "12-15", rest: "60 seg", equipment: "Polia" },
            { name: "Rosca Direta Barra", sets: "4", reps: "10-12", rest: "90 seg", equipment: "Barra" },
            { name: "Rosca Alternada Halteres", sets: "3", reps: "12 cada", rest: "60 seg", equipment: "Halteres" },
            { name: "Rosca Martelo", sets: "3", reps: "12-15", rest: "60 seg", equipment: "Halteres" },
          ],
        },
        {
          id: "legs-glutes",
          title: "Pernas e Glúteos",
          description: "Treino intenso para membros inferiores",
          duration: 65,
          difficulty: "Avançado",
          calories: 420,
          muscleGroup: "Pernas",
          exercises: [
            { name: "Agachamento Livre", sets: "5", reps: "8-10", rest: "2 min", equipment: "Barra" },
            { name: "Leg Press 45°", sets: "4", reps: "12-15", rest: "90 seg", equipment: "Leg Press" },
            { name: "Hack Machine", sets: "4", reps: "10-12", rest: "90 seg", equipment: "Hack Machine" },
            { name: "Cadeira Extensora", sets: "3", reps: "15-20", rest: "60 seg", equipment: "Máquina" },
            { name: "Cadeira Flexora", sets: "3", reps: "15-20", rest: "60 seg", equipment: "Máquina" },
            { name: "Stiff", sets: "4", reps: "10-12", rest: "90 seg", equipment: "Barra" },
            { name: "Panturrilha em Pé", sets: "4", reps: "15-20", rest: "60 seg", equipment: "Máquina" },
            { name: "Panturrilha Sentado", sets: "3", reps: "20", rest: "45 seg", equipment: "Máquina" },
          ],
        },
        {
          id: "shoulders-abs",
          title: "Ombros e Abdômen",
          description: "Desenvolvimento de ombros e core",
          duration: 55,
          difficulty: "Intermediário",
          calories: 300,
          muscleGroup: "Ombros",
          exercises: [
            { name: "Desenvolvimento Barra", sets: "4", reps: "8-10", rest: "2 min", equipment: "Barra" },
            { name: "Desenvolvimento Halteres", sets: "4", reps: "10-12", rest: "90 seg", equipment: "Halteres" },
            { name: "Elevação Lateral", sets: "4", reps: "12-15", rest: "60 seg", equipment: "Halteres" },
            { name: "Elevação Frontal", sets: "3", reps: "12-15", rest: "60 seg", equipment: "Halteres" },
            { name: "Crucifixo Inverso", sets: "3", reps: "15", rest: "60 seg", equipment: "Halteres" },
            { name: "Abdominal na Polia", sets: "4", reps: "15-20", rest: "45 seg", equipment: "Polia" },
            { name: "Prancha", sets: "3", reps: "60 seg", rest: "45 seg", equipment: "Nenhum" },
          ],
        },
      ],
      definition: [
        {
          id: "circuit-definition",
          title: "Circuito de Definição",
          description: "Treino em circuito para tonificar e definir",
          duration: 40,
          difficulty: "Intermediário",
          calories: 380,
          muscleGroup: "Corpo Todo",
          exercises: [
            { name: "Agachamento Jump", sets: "3", reps: "15", rest: "20 seg", equipment: "Nenhum" },
            { name: "Flexão Diamante", sets: "3", reps: "12", rest: "20 seg", equipment: "Nenhum" },
            { name: "Prancha Lateral", sets: "3", reps: "30 seg cada", rest: "20 seg", equipment: "Nenhum" },
            { name: "Afundo com Halteres", sets: "3", reps: "12 cada", rest: "20 seg", equipment: "Halteres" },
            { name: "Abdominal Bicicleta", sets: "3", reps: "20", rest: "20 seg", equipment: "Nenhum" },
          ],
        },
        {
          id: "functional-training",
          title: "Treino Funcional Academia",
          description: "Exercícios funcionais com equipamentos",
          duration: 45,
          difficulty: "Intermediário",
          calories: 360,
          muscleGroup: "Corpo Todo",
          exercises: [
            { name: "Kettlebell Swing", sets: "4", reps: "15", rest: "45 seg", equipment: "Kettlebell" },
            { name: "Box Jump", sets: "3", reps: "12", rest: "60 seg", equipment: "Box" },
            { name: "Battle Rope", sets: "3", reps: "30 seg", rest: "45 seg", equipment: "Corda Naval" },
            { name: "Medicine Ball Slam", sets: "3", reps: "15", rest: "45 seg", equipment: "Medicine Ball" },
            { name: "TRX Row", sets: "3", reps: "12", rest: "45 seg", equipment: "TRX" },
            { name: "Farmer's Walk", sets: "3", reps: "30 seg", rest: "60 seg", equipment: "Halteres" },
          ],
        },
        {
          id: "core-definition",
          title: "Core e Abdômen Definido",
          description: "Foco total em definição abdominal",
          duration: 30,
          difficulty: "Iniciante",
          calories: 220,
          muscleGroup: "Abdômen",
          exercises: [
            { name: "Prancha Frontal", sets: "3", reps: "60 seg", rest: "30 seg", equipment: "Nenhum" },
            { name: "Prancha Lateral", sets: "3", reps: "45 seg cada", rest: "30 seg", equipment: "Nenhum" },
            { name: "Abdominal Cruzado", sets: "3", reps: "20", rest: "30 seg", equipment: "Nenhum" },
            { name: "Mountain Climbers", sets: "3", reps: "30 seg", rest: "30 seg", equipment: "Nenhum" },
            { name: "Russian Twist", sets: "3", reps: "20", rest: "30 seg", equipment: "Nenhum" },
            { name: "Abdominal Canivete", sets: "3", reps: "15", rest: "30 seg", equipment: "Nenhum" },
          ],
        },
      ],
    };

    return workouts[userProfile.goal] || [];
  };

  const handleStartWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
    setIsWorkoutActive(true);
    setCompletedExercises(0);
  };

  const handleCompleteExercise = () => {
    if (selectedWorkout && completedExercises < selectedWorkout.exercises.length - 1) {
      setCompletedExercises(completedExercises + 1);
    } else if (selectedWorkout) {
      // Workout completo
      const log: WorkoutLog = {
        date: new Date().toISOString(),
        workoutType: selectedWorkout.title,
        duration: selectedWorkout.duration,
        exercises: selectedWorkout.exercises.length,
      };
      onLogWorkout(log);
      setIsWorkoutActive(false);
      setSelectedWorkout(null);
      setCompletedExercises(0);
    }
  };

  const workouts = getWorkoutsByGoal();
  const progress = selectedWorkout
    ? ((completedExercises + 1) / selectedWorkout.exercises.length) * 100
    : 0;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <Card
            key={workout.id}
            className="hover:shadow-2xl transition-all duration-300 hover:scale-105 border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2 text-white">{workout.title}</CardTitle>
                  <CardDescription className="text-gray-400">{workout.description}</CardDescription>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
                >
                  {workout.difficulty}
                </Badge>
              </div>
              <div className="mt-3">
                <Badge variant="outline" className="border-orange-500 text-orange-400">
                  <Dumbbell className="w-3 h-3 mr-1" />
                  {workout.muscleGroup}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-700/50 rounded-lg p-3 text-center border border-gray-600">
                  <Clock className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                  <p className="text-sm font-semibold text-white">{workout.duration} min</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3 text-center border border-gray-600">
                  <Flame className="w-5 h-5 text-red-400 mx-auto mb-1" />
                  <p className="text-sm font-semibold text-white">{workout.calories} kcal</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3 text-center border border-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto mb-1" />
                  <p className="text-sm font-semibold text-white">{workout.exercises.length} ex.</p>
                </div>
              </div>

              <Button
                onClick={() => handleStartWorkout(workout)}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg"
              >
                <Play className="w-4 h-4 mr-2" />
                Iniciar Treino
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workout Dialog */}
      <Dialog open={isWorkoutActive} onOpenChange={setIsWorkoutActive}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">{selectedWorkout?.title}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Exercício {completedExercises + 1} de {selectedWorkout?.exercises.length}
            </DialogDescription>
          </DialogHeader>

          {selectedWorkout && (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-white">Progresso</span>
                  <span className="text-gray-400">{Math.round(progress)}%</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Current Exercise */}
              <Card className="border-2 border-orange-500 bg-gradient-to-br from-gray-800 to-gray-900">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">
                    {selectedWorkout.exercises[completedExercises].name}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Equipamento: {selectedWorkout.exercises[completedExercises].equipment}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Video Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-gray-950 to-black rounded-xl flex items-center justify-center border border-gray-700">
                    <div className="text-center text-white">
                      <Play className="w-16 h-16 mx-auto mb-3 opacity-80" />
                      <p className="text-sm opacity-80">Vídeo demonstrativo</p>
                      <p className="text-xs opacity-60 mt-1">
                        {selectedWorkout.exercises[completedExercises].name}
                      </p>
                    </div>
                  </div>

                  {/* Exercise Details */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gray-800 rounded-lg p-4 text-center border-2 border-orange-500">
                      <p className="text-sm text-gray-400 mb-1">Séries</p>
                      <p className="text-2xl font-bold text-orange-400">
                        {selectedWorkout.exercises[completedExercises].sets}
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 text-center border-2 border-red-500">
                      <p className="text-sm text-gray-400 mb-1">Repetições</p>
                      <p className="text-2xl font-bold text-red-400">
                        {selectedWorkout.exercises[completedExercises].reps}
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 text-center border-2 border-green-500">
                      <p className="text-sm text-gray-400 mb-1">Descanso</p>
                      <p className="text-2xl font-bold text-green-400">
                        {selectedWorkout.exercises[completedExercises].rest}
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handleCompleteExercise}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-6 text-lg shadow-lg"
                  >
                    {completedExercises < selectedWorkout.exercises.length - 1 ? (
                      <>
                        Próximo Exercício
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </>
                    ) : (
                      <>
                        Finalizar Treino
                        <CheckCircle2 className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Exercise List */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-400">Todos os exercícios</h4>
                {selectedWorkout.exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      index === completedExercises
                        ? "bg-orange-900/30 border-2 border-orange-500"
                        : index < completedExercises
                        ? "bg-green-900/30 border-2 border-green-500"
                        : "bg-gray-800 border-2 border-gray-700"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index < completedExercises
                          ? "bg-green-500 text-white"
                          : index === completedExercises
                          ? "bg-orange-500 text-white"
                          : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {index < completedExercises ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">{exercise.name}</p>
                      <p className="text-sm text-gray-400">
                        {exercise.sets} x {exercise.reps} • {exercise.equipment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
