import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, Eye, EyeOff, Accessibility } from 'lucide-react';

interface VoiceNavigationProps {
    onNavigate?: (command: string) => void;
    onSpeak?: (text: string) => void;
}

interface NavigationCommand {
    command: string;
    action: string;
    description: string;
}

const navigationCommands: NavigationCommand[] = [
  { command: "главная", action: "navigate", description: "Перейти на главную страницу" },
  { command: "урок", action: "navigate", description: "Перейти к урокам" },
  { command: "домашнее задание", action: "navigate", description: "Перейти к домашним заданиям" },
  { command: "профиль", action: "navigate", description: "Перейти к профилю" },
  { command: "чат", action: "navigate", description: "Перейти к AI чату" },
  { command: "помощь", action: "help", description: "Получить помощь" },
  { command: "читать", action: "speak", description: "Прочитать текущую страницу" },
  { command: "остановить", action: "stop", description: "Остановить чтение" },
  { command: "увеличить", action: "zoom", description: "Увеличить текст" },
  { command: "уменьшить", action: "zoom", description: "Уменьшить текст" },
  { command: "темная тема", action: "theme", description: "Переключить на темную тему" },
  { command: "светлая тема", action: "theme", description: "Переключить на светлую тему" }
];

export default function VoiceNavigation({ onNavigate, onSpeak }: VoiceNavigationProps) {
  const [isListening, setIsListening] = useState(true); // Всегда включено
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>('');
  const [isEnabled, setIsEnabled] = useState(true); // Всегда включено
  const [showCommands, setShowCommands] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const recognitionRef = useRef<any>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

    // Initialize speech recognition
    const initializeRecognition = useCallback(() => {
        if (typeof window === 'undefined') return false;

        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        if (!SpeechRecognition) return false;

        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.lang = 'ru-RU';
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event: any) => {
            const results = event.results;
            let transcript = '';

            for (let i = event.resultIndex; i < results.length; i++) {
                transcript += results[i][0].transcript.toLowerCase().trim();
            }

            if (transcript) {
                handleVoiceCommand(transcript);
            }
        };

        recognitionRef.current.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            
            // Don't stop listening for "no-speech" errors - this is normal
            if (event.error === 'no-speech') {
                console.log('No speech detected, continuing to listen...');
                return;
            }
            
            // Stop listening for other errors
            if (event.error !== 'aborted' && event.error !== 'network') {
                setIsListening(false);
            }
        };

        recognitionRef.current.onend = () => {
            if (isEnabled && isListening) {
                // Restart recognition if it ended unexpectedly
                setTimeout(() => {
                    if (recognitionRef.current && isEnabled && isListening) {
                        try {
                            recognitionRef.current.start();
                        } catch (error) {
                            console.log('Recognition restart failed:', error);
                        }
                    }
                }, 100);
            } else {
                setIsListening(false);
            }
        };

        return true;
    }, []);

  // Handle voice commands
  const handleVoiceCommand = useCallback((command: string) => {
    setLastCommand(command);
    
    // Проверяем, начинается ли команда с "команда"
    if (!command.toLowerCase().startsWith('команда')) {
      return; // Игнорируем команды без префикса
    }
    
    // Убираем префикс "команда" и ищем совпадение
    const cleanCommand = command.toLowerCase().replace('команда', '').trim();
    
    const matchedCommand = navigationCommands.find(cmd => 
      cleanCommand.includes(cmd.command.toLowerCase())
    );

    if (matchedCommand) {
      switch (matchedCommand.action) {
        case 'navigate':
          // Handle navigation based on command
          switch (matchedCommand.command) {
            case 'главная':
              window.location.href = '/';
              break;
            case 'урок':
              window.location.href = '/dashboard/student/schedule';
              break;
            case 'домашнее задание':
              window.location.href = '/dashboard/student/homework';
              break;
            case 'профиль':
              window.location.href = '/dashboard/student/profile';
              break;
            case 'чат':
              window.location.href = '/dashboard/student/ai-chat';
              break;
            default:
              if (onNavigate) {
                onNavigate(matchedCommand.command);
              }
          }
          speakText(`${matchedCommand.description} выполнено`);
          break;
        case 'help':
          speakText('Доступные команды: ' + navigationCommands.map(c => c.command).join(', '));
          break;
        case 'speak':
          speakText('Название текущей страницы: ' + document.title);
          break;
        case 'stop':
          stopSpeaking();
          break;
        case 'zoom':
          if (cleanCommand.includes('увеличить')) {
            document.body.style.fontSize = '1.2em';
            speakText('Текст увеличен');
          } else if (cleanCommand.includes('уменьшить')) {
            document.body.style.fontSize = '1em';
            speakText('Текст уменьшен');
          }
          break;
        case 'theme':
          if (cleanCommand.includes('темная')) {
            document.documentElement.classList.add('dark');
            speakText('Темная тема включена');
          } else if (cleanCommand.includes('светлая')) {
            document.documentElement.classList.remove('dark');
            speakText('Светлая тема включена');
          }
          break;
      }
    } else {
      speakText('Команда не найдена. Скажите "команда помощь" для получения списка команд');
    }
  }, [onNavigate]);

    // Text-to-speech function
    const speakText = useCallback((text: string) => {
        if (!('speechSynthesis' in window)) return;

        // Stop any current speech
        window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        speechRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    }, []);

    // Stop speaking
    const stopSpeaking = useCallback(() => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        setIsSpeaking(false);
    }, []);

    // Toggle listening
    const toggleListening = useCallback(() => {
        if (!isEnabled) {
            setIsEnabled(true);
            speakText('Голосовая навигация включена');
            return;
        }

        if (isListening) {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            setIsListening(false);
        } else {
            if (recognitionRef.current) {
                recognitionRef.current.start();
                setIsListening(true);
                speakText('Прослушивание начато');
            }
        }
    }, [isListening, isEnabled, speakText]);

    // Initialize on mount
    useEffect(() => {
        const supported = initializeRecognition();
        if (!supported) {
            console.warn('Speech recognition not supported');
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            stopSpeaking();
        };
    }, [initializeRecognition, stopSpeaking]);

    // Listen for events from accessibility panel
    useEffect(() => {
        const handleEnableVoiceNavigation = () => {
            setIsEnabled(true);
            if (recognitionRef.current) {
                recognitionRef.current.start();
                setIsListening(true);
            }
        };

        const handleDisableVoiceNavigation = () => {
            setIsEnabled(false);
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            setIsListening(false);
        };

        window.addEventListener('enableVoiceNavigation', handleEnableVoiceNavigation);
        window.addEventListener('disableVoiceNavigation', handleDisableVoiceNavigation);

        return () => {
            window.removeEventListener('enableVoiceNavigation', handleEnableVoiceNavigation);
            window.removeEventListener('disableVoiceNavigation', handleDisableVoiceNavigation);
        };
    }, []);

  if (isHidden) {
    return (
      <Button
        onClick={() => setIsHidden(false)}
        className="fixed bottom-4 right-4 z-50"
        size="sm"
        variant="outline"
      >
        <Mic className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Accessibility className="w-4 h-4" />
            Голосовая навигация
            <Badge variant={isEnabled ? "default" : "secondary"} className="ml-auto">
              {isEnabled ? "Включена" : "Выключена"}
            </Badge>
            <Button
              onClick={() => setIsHidden(true)}
              variant="ghost"
              size="sm"
              className="ml-auto p-1 h-6 w-6"
            >
              ×
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Button
              onClick={toggleListening}
              variant={isListening ? "destructive" : "default"}
              size="sm"
              className="flex-1"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              {isListening ? "Остановить" : "Слушать"}
            </Button>
            
            <Button
              onClick={() => speakText('Текущая страница: ' + document.title)}
              variant="outline"
              size="sm"
              disabled={isSpeaking}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            Скажите "команда" + название команды
          </div>

          {lastCommand && (
            <div className="text-xs text-muted-foreground">
              Последняя команда: "{lastCommand}"
            </div>
          )}

          <Button
            onClick={() => setShowCommands(!showCommands)}
            variant="ghost"
            size="sm"
            className="w-full"
          >
            {showCommands ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showCommands ? "Скрыть команды" : "Показать команды"}
          </Button>

          {showCommands && (
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {navigationCommands.map((cmd, index) => (
                <div key={index} className="text-xs p-2 bg-muted rounded">
                  <strong>"команда {cmd.command}"</strong> - {cmd.description}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
