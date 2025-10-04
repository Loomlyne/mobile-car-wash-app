import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { HomeIconFilled, HomeIconOutline } from '@/components/icons/HomeIcon';
import { DocumentIconFilled, DocumentIconOutline } from '@/components/icons/DocumentIcon';
import { ProfileIconFilled, ProfileIconOutline } from '@/components/icons/ProfileIcon';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

function CustomTabBarIcon({
  IconOutline,
  IconFilled,
  focused
}: {
  IconOutline: React.ComponentType<{ size?: number; color?: string }>;
  IconFilled: React.ComponentType<{ size?: number; color?: string }>;
  focused: boolean
}) {
  const Icon = focused ? IconFilled : IconOutline;
  const color = focused ? '#FFFFFF' : '#8D8E90';

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', height: 48 }}>
      <View style={{ width: 20, height: 20, marginBottom: 14 }}>
        <Icon size={20} color={color} />
      </View>
      {focused && (
        <View
          style={{
            width: 8,
            height: 4,
            borderRadius: 2,
            backgroundColor: '#FF8A00',
          }}
        />
      )}
    </View>
  );
}

export default function TabLayout() {
  useColorScheme(); // just to keep the hook if needed
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#1E1E1E',
          borderTopWidth: 0,
          height: 96,
          left: 0,
          right: 0,
          bottom: 0,
          paddingTop: 24,
          paddingHorizontal: 40,
          paddingBottom: 0,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          shadowColor: '#00031D',
          shadowOffset: { width: 15, height: 15 },
          shadowOpacity: 0.14,
          shadowRadius: 30,
          elevation: 20,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              IconOutline={HomeIconOutline}
              IconFilled={HomeIconFilled}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Bookings"
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              IconOutline={DocumentIconOutline}
              IconFilled={DocumentIconFilled}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              IconOutline={ProfileIconOutline}
              IconFilled={ProfileIconFilled}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
