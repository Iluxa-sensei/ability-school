import { useState, useRef, useEffect } from "react";
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
  Hand,
  Settings,
  Users,
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
  Info
} from "lucide-react";

export default function StudentClassroom() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
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
    { id: 1, user: "Учитель", message: "Добро пожаловать на урок!", time: "10:00", isTeacher: true },
    { id: 2, user: "Айгүл", message: "Привет всем!", time: "10:01", isTeacher: false },
    { id: 3, user: "Нұрлан", message: "Готов к работе!", time: "10:02", isTeacher: false }
  ]);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  // Media streams refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);

  const addNotification = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Initialize camera and microphone
  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      localStreamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      if (audioRef.current) {
        audioRef.current.srcObject = stream;
      }

      addNotification("Камера и микрофон подключены", 'success');
    } catch (error) {
      console.error('Media access error:', error);
      addNotification("Нет доступа к камере или микрофону", 'error');
    }
  };

  // Toggle microphone
  const toggleMicrophone = async () => {
    if (!localStreamRef.current) {
      await initializeMedia();
      return;
    }

    const audioTracks = localStreamRef.current.getAudioTracks();
    audioTracks.forEach(track => {
      track.enabled = isMuted;
    });

    setIsMuted(!isMuted);
    addNotification(isMuted ? "Микрофон включен" : "Микрофон выключен", 'info');
  };

  // Toggle camera
  const toggleCamera = async () => {
    if (!localStreamRef.current) {
      await initializeMedia();
      return;
    }

    const videoTracks = localStreamRef.current.getVideoTracks();
    videoTracks.forEach(track => {
      track.enabled = isVideoOff;
    });

    setIsVideoOff(!isVideoOff);
    addNotification(isVideoOff ? "Камера включена" : "Камера выключена", 'info');
  };

  // Toggle screen sharing
  const toggleScreenShare = async () => {
    try {
      if (isScreenSharing) {
        // Stop screen sharing
        if (screenStreamRef.current) {
          screenStreamRef.current.getTracks().forEach(track => track.stop());
          screenStreamRef.current = null;
        }
        setIsScreenSharing(false);
        addNotification("Демонстрация экрана остановлена", 'info');
      } else {
        // Start screen sharing
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });

        screenStreamRef.current = screenStream;
        setIsScreenSharing(true);
        addNotification("Демонстрация экрана начата", 'success');

        // Handle screen share end
        screenStream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          addNotification("Демонстрация экрана завершена", 'info');
        };
      }
    } catch (error) {
      console.error('Screen sharing error:', error);
      addNotification("Не удалось начать демонстрацию экрана", 'error');
    }
  };

  // Initialize media on component mount
  useEffect(() => {
    initializeMedia();

    return () => {
      // Cleanup on unmount
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleHandRaise = () => {
    setIsHandRaised(!isHandRaised);
    addNotification(isHandRaised ? "Рука опущена" : "Рука поднята", isHandRaised ? 'info' : 'success');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleToolSelection = (tool: string) => {
    setSelectedTool(selectedTool === tool ? null : tool);
    addNotification(`Выбран инструмент: ${tool}`, 'info');
  };

  const sendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        user: "Вы",
        message: chatMessage,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isTeacher: false
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
                  Онлайн
                </Badge>
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
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{ display: isVideoOff ? 'none' : 'block' }}
            />
            {isVideoOff && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <VideoOff className="w-16 h-16" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Виртуальный класс</h2>
                  <p className="text-gray-300">Камера выключена</p>
                </div>
              </div>
            )}

            {/* Connection Status */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${connectionQuality === 'excellent' ? 'bg-green-500' :
                  connectionQuality === 'good' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
              <span className="text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                {connectionQuality === 'excellent' ? 'Отлично' :
                 connectionQuality === 'good' ? 'Хорошо' : 'Плохо'}
              </span>
            </div>

            {/* Lesson Progress */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Прогресс урока</span>
                  <span className="text-sm text-gray-600">{lessonProgress}%</span>
                </div>
                <Progress value={lessonProgress} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">Урок: {currentActivity}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white border-t p-4">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={isMuted ? "destructive" : "outline"}
                size="lg"
                onClick={toggleMicrophone}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>

              <Button
                variant={isVideoOff ? "destructive" : "outline"}
                size="lg"
                onClick={toggleCamera}
              >
                {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </Button>

              <Button
                variant={isScreenSharing ? "default" : "outline"}
                size="lg"
                onClick={toggleScreenShare}
              >
                {isScreenSharing ? <MonitorOff className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
              </Button>

              <Button
                variant={isHandRaised ? "default" : "outline"}
                size="lg"
                onClick={toggleHandRaise}
                className={isHandRaised ? "bg-yellow-500 hover:bg-yellow-600" : ""}
              >
                <Hand className="w-5 h-5" />
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
                <h3 className="font-semibold mb-4">Участники (12)</h3>
                <div className="space-y-2">
                  {[
                    { name: "Айгүл Нұрланова", role: "Мұғалім", isOnline: true },
                    { name: "Айжан Қасымова", role: "Оқушы", isOnline: true },
                    { name: "Нұрлан Ахметов", role: "Оқушы", isOnline: true },
                    { name: "Алма Сейтқазы", role: "Оқушы", isOnline: false }
                  ].map((participant, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">{participant.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{participant.name}</span>
                          {participant.role === "Учитель" && <Badge variant="outline" className="text-xs">Учитель</Badge>}
                        </div>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${participant.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          <span className="text-xs text-gray-500">{participant.isOnline ? 'Онлайн' : 'Офлайн'}</span>
                        </div>
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
                      onClick={() => handleToolSelection(tool.name)}
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