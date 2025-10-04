import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
}

export default function PageHeader({ title, onBack }: PageHeaderProps) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  // Capitalize first letter, lowercase rest
  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Image
          resizeMode='contain'
          source={require('../../assets/images/back.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{formattedTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  backButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
});
