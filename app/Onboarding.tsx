import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import OnboardingScreen from '../components/OnboardingScreen';
import SplashScreen from '../components/SplashScreen';

// Mock image for now - replace with actual image
const onboardingImage = require('../assets/images/cleaning.png');

const onboardingData = [
  {
    title: 'Professional car wash',
    description: 'Lorem ipsum is a placeholder text commonly used to demonstrate',
    image: onboardingImage,
  },
  {
    title: 'Professional car wash',
    description: 'Lorem ipsum is a placeholder text commonly used to demonstrate',
    image: onboardingImage,
  },
  {
    title: 'Professional car wash',
    description: 'Lorem ipsum is a placeholder text commonly used to demonstrate',
    image: onboardingImage,
  },
];

export default function Onboarding() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'Arabic'>('English');

  useEffect(() => {
    // Show splash for 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (currentScreen < onboardingData.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      // Navigate to main app
      router.replace('/SignIn');
    }
  };

  const handleLanguageChange = () => {
    setSelectedLanguage(selectedLanguage === 'English' ? 'Arabic' : 'English');
  };

  if (showSplash) {
    return <SplashScreen orange={false} />;
  }

  const currentData = onboardingData[currentScreen];

  return (
    <View style={styles.container}>
      <OnboardingScreen
        title={currentData.title}
        description={currentData.description}
        image={currentData.image}
        onNext={handleNext}
        onLanguageChange={handleLanguageChange}
        selectedLanguage={selectedLanguage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 