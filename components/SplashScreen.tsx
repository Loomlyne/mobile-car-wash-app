import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen({ orange = false }) {
  return (
    <View style={[styles.container, { backgroundColor: orange ? '#FF9800' : '#fff' }]}> 
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/royal-logo2.png')}
          style={styles.icon}
          resizeMode="contain"
        />  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 180,
    height: 180,
    marginBottom: 16,
  },
  royalText: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  serviceText: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});