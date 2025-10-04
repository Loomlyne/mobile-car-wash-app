import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';

export default function TabBarBackground() {
  // Return null to let tabBarStyle handle the background
  return null;
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}
