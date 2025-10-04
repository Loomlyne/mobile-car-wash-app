import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  title: string;
  description: string;
  image: any;
  onNext: () => void;
  onLanguageChange?: () => void;
  selectedLanguage?: 'English' | 'Arabic';
}

export default function OnboardingScreen({ 
  title, 
  description, 
  image, 
  onNext, 
  onLanguageChange,
  selectedLanguage = 'English'
}: OnboardingScreenProps) {
  return (
    <View style={styles.container}>
      {/* Image Section - Upper 2/3 with curved bottom */}
      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/young.jpg')} style={styles.image} resizeMode="cover" />
        {/* Curved overlay at bottom of image */}
        <View style={styles.curveOverlay}>
          <View style={styles.curve} />
        </View>
      </View>
      
      {/* Text Card - Bottom 1/3 with curved top */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          
          <TouchableOpacity style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
          
          <View style={styles.languageContainer}>
            <TouchableOpacity 
              style={styles.languageButton} 
              onPress={onLanguageChange}
            >
              <Text style={styles.languageText}>Arabic</Text>
            </TouchableOpacity>
            <Text style={styles.languageSeparator}> | </Text>
            <TouchableOpacity 
              style={styles.languageButton} 
              onPress={onLanguageChange}
            >
              <Text style={[
                styles.languageText, 
                selectedLanguage === 'English' && styles.selectedLanguage
              ]}>
                English
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: height * 0.67, // Upper 2/3
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  curveOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'transparent',
  },
  curve: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  cardContainer: {
    height: height * 0.33, // Bottom 1/3
    paddingHorizontal: 20,
    paddingTop: 0, // Reduced to account for curve
    marginTop: -20, // Overlap with curve
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  nextButton: {
    width: '50%',
    alignSelf: 'center',
    backgroundColor: '#222',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageButton: {
    paddingHorizontal: 8,
  },
  languageText: {
    fontSize: 14,
    color: '#888',
  },
  selectedLanguage: {
    color: '#FF9800',
    fontWeight: 'bold',
  },
  languageSeparator: {
    fontSize: 14,
    color: '#888',
  },
}); 