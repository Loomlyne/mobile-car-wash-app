import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Animated, Dimensions, StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';

interface NotificationPopupProps {
  visible: boolean;
  title: string;
  message: string;
  type?: 'success' | 'danger' | 'info';
  onClose: () => void;
  onPress?: () => void;
}

const { width } = Dimensions.get('window');

export default function NotificationPopup({ 
  visible, 
  title, 
  message, 
  type = 'info',
  onClose,
  onPress 
}: NotificationPopupProps) {
  const slideAnim = new Animated.Value(-300);
  const opacityAnim = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      // Slide in from top
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after 5 seconds
      const timer = setTimeout(() => {
        hidePopup();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hidePopup = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View 
      style={[
        styles.overlay,
        {
          opacity: opacityAnim,
        }
      ]}
    >
      <Animated.View 
        style={[
          styles.popup,
          {
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.popupContent}
          onPress={onPress}
          activeOpacity={0.9}
        >
          <View style={styles.iconContainer}>
         <Image source={require('@/assets/images/royal-logo2.png')} style={{width: 60, height: 60}} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={hidePopup}
          >
            <FontAwesome name="times" size={18} color="#888" />
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 9999,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 80, // Account for status bar and some spacing
  },
  popup: {
    width: width - 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  popupContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  message: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  closeButton: {
    padding: 8,
    marginLeft: 12,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
}); 