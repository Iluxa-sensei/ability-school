import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Accessibility, 
  Type, 
  Contrast, 
  Volume2, 
  MousePointer,
  Keyboard,
  Settings,
  RotateCcw
} from 'lucide-react';

interface AccessibilitySettings {
  fontSize: number;
  contrast: 'normal' | 'high' | 'dark';
  soundEnabled: boolean;
  voiceNavigation: boolean;
  keyboardNavigation: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
}

export default function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 16,
    contrast: 'normal',
    soundEnabled: true,
    voiceNavigation: false,
    keyboardNavigation: true,
    reducedMotion: false,
    screenReader: false
  });

  // Apply accessibility settings
  useEffect(() => {
    const root = document.documentElement;
    
    // Font size
    root.style.fontSize = `${settings.fontSize}px`;
    
    // Contrast
    root.classList.remove('high-contrast', 'dark-contrast');
    if (settings.contrast === 'high') {
      root.classList.add('high-contrast');
    } else if (settings.contrast === 'dark') {
      root.classList.add('dark-contrast');
    }
    
    // Reduced motion
    if (settings.reducedMotion) {
      root.style.setProperty('--animation-duration', '0s');
      root.style.setProperty('--transition-duration', '0s');
    } else {
      root.style.removeProperty('--animation-duration');
      root.style.removeProperty('--transition-duration');
    }
    
    // Keyboard navigation
    if (settings.keyboardNavigation) {
      document.body.classList.add('keyboard-navigation');
    } else {
      document.body.classList.remove('keyboard-navigation');
    }

    // Voice navigation
    if (settings.voiceNavigation) {
      // Enable voice navigation globally
      const voiceNavEvent = new CustomEvent('enableVoiceNavigation');
      window.dispatchEvent(voiceNavEvent);
    } else {
      const voiceNavEvent = new CustomEvent('disableVoiceNavigation');
      window.dispatchEvent(voiceNavEvent);
    }


    // Screen reader
    if (settings.screenReader) {
      // Add screen reader attributes
      document.body.setAttribute('aria-live', 'polite');
      document.body.setAttribute('role', 'main');
    } else {
      document.body.removeAttribute('aria-live');
      document.body.removeAttribute('role');
    }
    
  }, [settings]);

  // Reset to defaults
  const resetSettings = () => {
    setSettings({
      fontSize: 16,
      contrast: 'normal',
      soundEnabled: true,
      voiceNavigation: false,
      keyboardNavigation: true,
      reducedMotion: false,
      screenReader: false
    });
  };

  // Save settings to localStorage
  const saveSettings = () => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  };

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('accessibility-settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading accessibility settings:', error);
      }
    }
  }, []);

  // Auto-save settings
  useEffect(() => {
    saveSettings();
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (isHidden) {
    return (
      <Button
        onClick={() => setIsHidden(false)}
        className="fixed top-4 right-4 z-50"
        size="sm"
        variant="outline"
      >
        <Accessibility className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <>
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50"
        size="sm"
        variant="outline"
      >
        <Accessibility className="w-4 h-4 mr-2" />
        Доступность
      </Button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed top-16 right-4 z-50 w-80">
          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Accessibility className="w-4 h-4" />
                Параметры доступности
                <Button
                  onClick={resetSettings}
                  variant="ghost"
                  size="sm"
                  className="ml-auto"
                >
                  <RotateCcw className="w-3 h-3" />
                </Button>
                <Button
                  onClick={() => setIsHidden(true)}
                  variant="ghost"
                  size="sm"
                  className="ml-1 p-1 h-6 w-6"
                >
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Font Size */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  <span className="text-sm font-medium">Размер шрифта</span>
                  <Badge variant="outline" className="ml-auto">
                    {settings.fontSize}px
                  </Badge>
                </div>
                <Slider
                  value={[settings.fontSize]}
                  onValueChange={([value]) => updateSetting('fontSize', value)}
                  min={12}
                  max={24}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Contrast */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Contrast className="w-4 h-4" />
                  <span className="text-sm font-medium">Контраст</span>
                </div>
                <div className="flex gap-2">
                  {(['normal', 'high', 'dark'] as const).map((contrast) => (
                    <Button
                      key={contrast}
                      onClick={() => updateSetting('contrast', contrast)}
                      variant={settings.contrast === contrast ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                    >
                      {contrast === 'normal' && 'Обычный'}
                      {contrast === 'high' && 'Высокий'}
                      {contrast === 'dark' && 'Темный'}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Sound */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Звук</span>
                </div>
                <Switch
                  checked={settings.soundEnabled}
                  onCheckedChange={(checked) => updateSetting('soundEnabled', checked)}
                />
              </div>

              {/* Voice Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Голосовая навигация</span>
                </div>
                <Switch
                  checked={settings.voiceNavigation}
                  onCheckedChange={(checked) => updateSetting('voiceNavigation', checked)}
                />
              </div>


              {/* Keyboard Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Keyboard className="w-4 h-4" />
                  <span className="text-sm font-medium">Навигация с клавиатуры</span>
                </div>
                <Switch
                  checked={settings.keyboardNavigation}
                  onCheckedChange={(checked) => updateSetting('keyboardNavigation', checked)}
                />
              </div>

              {/* Reduced Motion */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MousePointer className="w-4 h-4" />
                  <span className="text-sm font-medium">Уменьшенная анимация</span>
                </div>
                <Switch
                  checked={settings.reducedMotion}
                  onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
                />
              </div>

              {/* Screen Reader */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm font-medium">Экранный диктор</span>
                </div>
                <Switch
                  checked={settings.screenReader}
                  onCheckedChange={(checked) => updateSetting('screenReader', checked)}
                />
              </div>

              {/* Quick Actions */}
              <div className="pt-2 border-t">
                <div className="text-xs font-medium mb-2">Быстрые действия</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => updateSetting('fontSize', 18)}
                    variant="outline"
                    size="sm"
                  >
                    Увеличить
                  </Button>
                  <Button
                    onClick={() => updateSetting('fontSize', 14)}
                    variant="outline"
                    size="sm"
                  >
                    Уменьшить
                  </Button>
                  <Button
                    onClick={() => updateSetting('contrast', 'high')}
                    variant="outline"
                    size="sm"
                  >
                    Высокий контраст
                  </Button>
                  <Button
                    onClick={() => updateSetting('reducedMotion', true)}
                    variant="outline"
                    size="sm"
                  >
                    Остановить анимацию
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
