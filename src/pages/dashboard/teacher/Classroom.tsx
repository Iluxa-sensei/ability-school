import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  MessageSquare,
  Users,
  Settings,
  Maximize,
  Minimize,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Bell,
  BellOff,
  Share2,
  Download,
  BookOpen,
  Calculator,
  PenTool,
  Eraser,
  Type,
  Image,
  FileText,
  Link,
  Smile,
  Send,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  UserPlus,
  UserMinus,
  Phone,
  PhoneOff,
  Hand,
  Clock,
  Target,
  Award
} from "lucide-react";

export default function TeacherClassroom() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showParticipants, setShowParticipants] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [showTools, setShowTools] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('excellent');
  const [lessonProgress, setLessonProgress] = useState(65);
  const [currentActivity, setCurrentActivity] = useState("Решение задач по алгебре");
  const [notifications, setNotifications] = useState<Array<{ id: string, message: string, type: 'info' | 'success' | 'warning' | 'error' }>>([]);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "Вы", message: "Добро пожаловать на урок!", time: "10:00", isTeacher: true },
    { id: 2, user: "Айжан", message: "Бәріне сәлем!", time: "10:01", isTeacher: false },
    { id: 3, user: "Нұрлан", message: "Жұмысқа дайынмын!", time: "10:02", isTeacher: false }
  ]);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [lessonTimer, setLessonTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [students, setStudents] = useState([
    { id: 1, name: "Айжан Қасымова", isOnline: true, isMuted: false, hasHandRaised: false, isSpeaking: false },
    { id: 2, name: "Нұрлан Ахметов", isOnline: true, isMuted: false, hasHandRaised: true, isSpeaking: false },
    { id: 3, name: "Алма Сейтқазы", isOnline: true, isMuted: true, hasHandRaised: false, isSpeaking: true },
    { id: 4, name: "Ерлан Төлеуов", isOnline: false, isMuted: false, hasHandRaised: false, isSpeaking: false }
  ]);

  const addNotification = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const toggleLessonStatus = () => {
    setIsTimerRunning(!isTimerRunning);
    addNotification(isTimerRunning ? "Урок приостановлен" : "Урок начат", 'info');
  };

  const endLesson = () => {
    setIsTimerRunning(false);
    setLessonTimer(0);
    addNotification("Урок завершен", 'success');
  };

  const muteStudent = (studentId: number) => {
    setStudents(prev => prev.map(student =>
      student.id === studentId ? { ...student, isMuted: !student.isMuted } : student
    ));
    const student = students.find(s => s.id === studentId);
    addNotification(`${student?.name} ${student?.isMuted ? 'размучен' : 'заглушен'}`, 'info');
  };

  const removeStudent = (studentId: number) => {
    setStudents(prev => prev.filter(student => student.id !== studentId));
    const student = students.find(s => s.id === studentId);
    addNotification(`${student?.name} удален из урока`, 'warning');
  };

  const callStudent = (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    addNotification(`Вызов ${student?.name}`, 'info');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const sendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        user: "Вы",
        message: chatMessage,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isTeacher: true
      };
      setChatMessages(prev => [...prev, newMessage]);
      setChatMessage("");
    }
  };

  const tools = [
    { name: "Калькулятор", icon: Calculator, color: "bg-blue-500" },
    { name: "Ручка", icon: PenTool, color: "bg-green-500" },
    { name: "Ластик", icon: Eraser, color: "bg-red-500" },
    { name: "Текст", icon: Type, color: "bg-purple-500" },
    { name: "Изображение", icon: Image, color: "bg-yellow-500" },
    { name: "Файл", icon: FileText, color: "bg-indigo-500" },
    { name: "Ссылка", icon: Link, color: "bg-pink-500" },
    { name: "Эмодзи", icon: Smile, color: "bg-orange-500" }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg shadow-lg flex items-center gap-2 text-white animate-in slide-in-from-right ${notification.type === 'success' ? 'bg-green-500' :
              notification.type === 'warning' ? 'bg-yellow-500' :
                notification.type === 'error' ? 'bg-red-500' :
                  'bg-blue-500'
              }`}
          >
            {notification.type === 'success' && <CheckCircle className="w-4 h-4" />}
            {notification.type === 'warning' && <AlertCircle className="w-4 h-4" />}
            {notification.type === 'error' && <AlertCircle className="w-4 h-4" />}
            {notification.type === 'info' && <Info className="w-4 h-4" />}
            <span className="text-sm">{notification.message}</span>
          </div>
        ))}
      </div>

      <div className="flex h-screen">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${connectionQuality === 'excellent' ? 'bg-green-500' :
                    connectionQuality === 'good' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}></div>
                  <span className="text-sm text-gray-600">
                    {connectionQuality === 'excellent' ? 'Отличное соединение' :
                      connectionQuality === 'good' ? 'Хорошее соединение' :
                        'Плохое соединение'}
                  </span>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Урок активен
                </Badge>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  {formatTime(lessonTimer)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTools(!showTools)}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Video Area */}
          <div className="flex-1 bg-black relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-16 h-16" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Виртуальный класс</h2>
                <p className="text-gray-300">Урок: {currentActivity}</p>
                <div className="mt-4 flex items-center justify-center gap-4">
                  <Badge className="bg-blue-500">
                    {students.filter(s => s.isOnline).length} участников
                  </Badge>
                  <Badge className="bg-yellow-500">
                    {students.filter(s => s.hasHandRaised).length} подняли руку
                  </Badge>
                </div>
              </div>
            </div>

            {/* Lesson Progress */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Прогресс урока</span>
                  <span className="text-sm text-gray-600">{lessonProgress}%</span>
                </div>
                <Progress value={lessonProgress} className="h-2" />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white border-t p-4">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={isMuted ? "destructive" : "outline"}
                size="lg"
                onClick={() => {
                  setIsMuted(!isMuted);
                  addNotification(isMuted ? "Микрофон включен" : "Микрофон выключен", 'info');
                }}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>

              <Button
                variant={isVideoOff ? "destructive" : "outline"}
                size="lg"
                onClick={() => {
                  setIsVideoOff(!isVideoOff);
                  addNotification(isVideoOff ? "Камера включена" : "Камера выключена", 'info');
                }}
              >
                {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </Button>

              <Button
                variant={isScreenSharing ? "default" : "outline"}
                size="lg"
                onClick={() => {
                  setIsScreenSharing(!isScreenSharing);
                  addNotification(isScreenSharing ? "Демонстрация экрана остановлена" : "Демонстрация экрана начата", 'info');
                }}
              >
                {isScreenSharing ? <MonitorOff className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
              </Button>

              <Button
                variant={isTimerRunning ? "default" : "outline"}
                size="lg"
                onClick={toggleLessonStatus}
                className={isTimerRunning ? "bg-green-500 hover:bg-green-600" : ""}
              >
                {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>

              <Button
                variant="destructive"
                size="lg"
                onClick={endLesson}
              >
                <PhoneOff className="w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowChat(!showChat)}
              >
                <MessageSquare className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l flex flex-col">
          {/* Toggle Buttons */}
          <div className="flex gap-1 p-1 bg-muted rounded-lg m-4">
            <Button
              size="sm"
              variant={showParticipants ? 'default' : 'ghost'}
              onClick={() => setShowParticipants(!showParticipants)}
            >
              <Users className="w-4 h-4 mr-1" />
              Участники
            </Button>
            <Button
              size="sm"
              variant={showChat ? 'default' : 'ghost'}
              onClick={() => setShowChat(!showChat)}
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              Чат
            </Button>
            <Button
              size="sm"
              variant={showTools ? 'default' : 'ghost'}
              onClick={() => setShowTools(!showTools)}
            >
              <Settings className="w-4 h-4 mr-1" />
              Инструменты
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {showParticipants && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Участники ({students.length})</h3>
                  <Button size="sm" variant="outline">
                    <UserPlus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center relative">
                        <span className="text-sm font-medium">{student.name.split(' ').map(n => n[0]).join('')}</span>
                        {student.isSpeaking && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{student.name}</span>
                          {student.hasHandRaised && (
                            <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800">
                              <Hand className="w-3 h-3 mr-1" />
                              Рука
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${student.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          <span className="text-xs text-gray-500">{student.isOnline ? 'Онлайн' : 'Офлайн'}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => muteStudent(student.id)}
                          className={student.isMuted ? "text-red-600" : ""}
                        >
                          {student.isMuted ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => callStudent(student.id)}
                        >
                          <Phone className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeStudent(student.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <UserMinus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showChat && (
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Чат</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.isTeacher ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${message.isTeacher
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                        }`}>
                        <div className="text-xs font-medium mb-1">{message.user}</div>
                        <div className="text-sm">{message.message}</div>
                        <div className="text-xs opacity-70 mt-1">{message.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Напишите сообщение..."
                      className="flex-1 p-2 border rounded-lg text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button size="sm" onClick={sendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {showTools && (
              <div className="p-4">
                <h3 className="font-semibold mb-4">Инструменты</h3>
                <div className="grid grid-cols-2 gap-2">
                  {tools.map((tool, index) => (
                    <Button
                      key={index}
                      variant={selectedTool === tool.name ? "default" : "outline"}
                      size="sm"
                      className="h-auto p-3 flex flex-col items-center gap-2"
                      onClick={() => setSelectedTool(selectedTool === tool.name ? null : tool.name)}
                    >
                      <tool.icon className="w-5 h-5" />
                      <span className="text-xs">{tool.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}