import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

const TabBarBackground = () => {
  if (Platform.OS === 'web') return null;

  // Return null to let tabBarStyle handle the background
  return null;
};

export default TabBarBackground;

export function useBottomTabOverflow() {
  return 0;
}
