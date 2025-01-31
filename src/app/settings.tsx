import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'blueprints';
import { Switch } from 'blueprints'; // Assuming you will create this component
import { Slider } from 'blueprints'; // Assuming you will create this component
import { useAppContext } from '@/context';
import { translate } from '@/i18n';

const SettingsScreen = () => {
  const { isDarkMode, toggleTheme } = useAppContext();
  const [language, setLanguage] = useState('en');
  const [musicVolume, setMusicVolume] = useState(50);
  const [soundVolume, setSoundVolume] = useState(50);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'de' : 'en'));
  };

  return (
    <ScrollView className="flex-1 bg-primary">
      {/* Logo Section */}
      <View className="flex items-center p-4">
        <Text variant="h1" text={translate('whiz.sentences.0')} />
        <Text variant="body" text={translate('whiz.sentences.1')} />
      </View>

      {/* Language Switch */}
      <View className="flex-row items-center justify-between p-4">
        <Text variant="body" text="Language" />
        <Switch value={language === 'de'} onValueChange={toggleLanguage} />
      </View>

      {/* Dark Mode Switch */}
      <View className="flex-row items-center justify-between p-4">
        <Text variant="body" text="Dark Mode" />
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>

      {/* Sound Settings */}
      <View className="p-4">
        <Text variant="h2" text="Sound Settings" />
        <Text variant="body" text="Music Volume" />
        <Slider value={musicVolume} onValueChange={setMusicVolume} />
        <Text variant="body" text="Sound Effects Volume" />
        <Slider value={soundVolume} onValueChange={setSoundVolume} />
      </View>

      {/* Background Video and Music Section */}
      <View className="p-4">
        <Text variant="h2" text="Background Settings" />
        <Text variant="body" text="Change Background Video and Music (Functionality Coming Soon)" />
      </View>
    </ScrollView>
  );
};

export default SettingsScreen; 