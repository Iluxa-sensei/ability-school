import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Plus, BookOpen, Clock, Target, Users, FileText, CheckCircle, Play, Pause, Edit, Trash2 } from "lucide-react";

interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  grade: string;
  duration: string;
  status: 'draft' | 'ready' | 'in-progress' | 'completed';
  difficulty: 'easy' | 'medium' | 'hard';
  objectives: string[];
  materials: string[];
  activities: string[];
  createdAt: string;
  updatedAt: string;
}

const mockLessonPlans: LessonPlan[] = [
  {
    id: "1",
    title: "Введение в алгебру",
    subject: "Математика",
    grade: "7 класс",
    duration: "45 минут",
    status: 'ready',
    difficulty: 'medium',
    objectives: [
      "Понять основные понятия алгебры",
      "Научиться решать простые уравнения",
      "Применить знания на практике"
    ],
    materials: [
      "Интерактивная доска",
      "Рабочие листы",
      "Калькуляторы"
    ],
    activities: [
      "Объяснение теории (10 мин)",
      "Решение примеров (20 мин)",
      "Самостоятельная работа (15 мин)"
    ],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: "2",
    title: "История Древнего Рима",
    subject: "История",
    grade: "6 класс",
    duration: "60 минут",
    status: 'in-progress',
    difficulty: 'easy',
    objectives: [
      "Изучить основные периоды римской истории",
      "Понять влияние Рима на современный мир"
    ],
    materials: [
      "Карты",
      "Изображения артефактов",
      "Видеоматериалы"
    ],
    activities: [
      "Презентация (20 мин)",
      "Работа с картами (15 мин)",
      "Обсуждение (25 мин)"
    ],
    createdAt: "2024-01-14",
    updatedAt: "2024-01-16"
  }
];

export default function AIPlanner() {
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>(mockLessonPlans);
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [formData, setFormData] = useState({
    subject: "",
    grade: "",
    duration: "",
    difficulty: "medium",
    topic: "",
    objectives: ""
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const generateLessonPlan = async () => {
    setIsGenerating(true);
    
    // Симуляция генерации ИИ
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newPlan: LessonPlan = {
      id: Date.now().toString(),
      title: formData.topic || "Новый урок",
      subject: formData.subject,
      grade: formData.grade,
      duration: formData.duration,
      status: 'draft',
      difficulty: formData.difficulty as 'easy' | 'medium' | 'hard',
      objectives: formData.objectives.split('\n').filter(obj => obj.trim()),
      materials: ["Интерактивная доска", "Рабочие материалы"],
      activities: ["Введение", "Основная часть", "Закрепление"],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setLessonPlans(prev => [newPlan, ...prev]);
    setIsGenerating(false);
  };

  const updatePlanStatus = (id: string, status: LessonPlan['status']) => {
    setLessonPlans(prev => prev.map(plan => 
      plan.id === id ? { ...plan, status, updatedAt: new Date().toISOString().split('T')[0] } : plan
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold">ИИ‑планировщик уроков</h1>
          <p className="text-muted-foreground mt-1">Создавайте интерактивные планы уроков с помощью ИИ</p>
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Создать урок
            </TabsTrigger>
            <TabsTrigger value="plans" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Мои планы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  Генератор планов уроков
                </CardTitle>
                <CardDescription>
                  Заполните форму ниже, и ИИ создаст персонализированный план урока
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Предмет</Label>
                    <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите предмет" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">Математика</SelectItem>
                        <SelectItem value="russian">Русский язык</SelectItem>
                        <SelectItem value="history">История</SelectItem>
                        <SelectItem value="science">Естествознание</SelectItem>
                        <SelectItem value="english">Английский язык</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grade">Класс</Label>
                    <Select value={formData.grade} onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите класс" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 класс</SelectItem>
                        <SelectItem value="2">2 класс</SelectItem>
                        <SelectItem value="3">3 класс</SelectItem>
                        <SelectItem value="4">4 класс</SelectItem>
                        <SelectItem value="5">5 класс</SelectItem>
                        <SelectItem value="6">6 класс</SelectItem>
                        <SelectItem value="7">7 класс</SelectItem>
                        <SelectItem value="8">8 класс</SelectItem>
                        <SelectItem value="9">9 класс</SelectItem>
                        <SelectItem value="10">10 класс</SelectItem>
                        <SelectItem value="11">11 класс</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Длительность</Label>
                    <Select value={formData.duration} onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите длительность" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 минут</SelectItem>
                        <SelectItem value="45">45 минут</SelectItem>
                        <SelectItem value="60">60 минут</SelectItem>
                        <SelectItem value="90">90 минут</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Сложность</Label>
                    <Select value={formData.difficulty} onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите сложность" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Легкая</SelectItem>
                        <SelectItem value="medium">Средняя</SelectItem>
                        <SelectItem value="hard">Сложная</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Тема урока</Label>
                  <Input
                    id="topic"
                    placeholder="Введите тему урока"
                    value={formData.topic}
                    onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objectives">Цели урока (каждая с новой строки)</Label>
                  <textarea
                    id="objectives"
                    className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md resize-none"
                    placeholder="Введите цели урока, каждая с новой строки"
                    value={formData.objectives}
                    onChange={(e) => setFormData(prev => ({ ...prev, objectives: e.target.value }))}
                  />
                </div>

                <Button 
                  onClick={generateLessonPlan} 
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Генерирую план...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Создать план урока
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Мои планы уроков</h2>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  Сетка
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  Список
                </Button>
              </div>
            </div>

            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {lessonPlans.map((plan) => (
                <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{plan.title}</CardTitle>
                        <CardDescription>{plan.subject} • {plan.grade}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(plan.status)}>
                        {plan.status === 'draft' && 'Черновик'}
                        {plan.status === 'ready' && 'Готов'}
                        {plan.status === 'in-progress' && 'В процессе'}
                        {plan.status === 'completed' && 'Завершен'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {plan.duration}
                      </div>
                      <Badge variant="outline" className={getDifficultyColor(plan.difficulty)}>
                        {plan.difficulty === 'easy' && 'Легкая'}
                        {plan.difficulty === 'medium' && 'Средняя'}
                        {plan.difficulty === 'hard' && 'Сложная'}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Цели:</span>
                      </div>
                      <ul className="text-sm text-muted-foreground ml-6 space-y-1">
                        {plan.objectives.slice(0, 2).map((objective, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            {objective}
                          </li>
                        ))}
                        {plan.objectives.length > 2 && (
                          <li className="text-xs text-muted-foreground">
                            +{plan.objectives.length - 2} еще...
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      {plan.status === 'draft' && (
                        <Button size="sm" onClick={() => updatePlanStatus(plan.id, 'ready')}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Готов
                        </Button>
                      )}
                      {plan.status === 'ready' && (
                        <Button size="sm" onClick={() => updatePlanStatus(plan.id, 'in-progress')}>
                          <Play className="h-4 w-4 mr-1" />
                          Начать
                        </Button>
                      )}
                      {plan.status === 'in-progress' && (
                        <Button size="sm" onClick={() => updatePlanStatus(plan.id, 'completed')}>
                          <Pause className="h-4 w-4 mr-1" />
                          Завершить
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Редактировать
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}