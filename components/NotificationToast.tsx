import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ORANGE = '#FF9800';

export default function NotificationToast({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <View style={styles.overlay}>
      <View style={styles.toast}>
        <View style={styles.iconWrap}>
          <FontAwesome name="building" size={28} color={ORANGE} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Royal Services</Text>
          <Text style={styles.desc}>It's Sunday, let's clean your garden, book a service type</Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <FontAwesome name="close" size={18} color="#888" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 1000,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginTop: 48,
    minWidth: 320,
    maxWidth: 380,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  iconWrap: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  title: { fontWeight: 'bold', color: '#222', fontSize: 15, marginBottom: 2 },
  desc: { color: '#888', fontSize: 13 },
  closeBtn: { marginLeft: 12, padding: 4 },
}); 