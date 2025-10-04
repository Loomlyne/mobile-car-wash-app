import React from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const GREEN = '#4CAF50';
const ORANGE = '#FF9800';

export default function OrderSuccessModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.iconCircle}>
            <Image source={require('../assets/images/Done.png')} style={styles.icon} />
          </View>
          <Text style={styles.title}>Successful</Text>
          <Text style={styles.desc}>We will call you within 30 minutes to confirm your order.</Text>
          <TouchableOpacity style={styles.homeBtn} onPress={onClose}>
            <Text style={styles.homeBtnText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.18)', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: '#fff', borderRadius: 28, padding: 28, alignItems: 'center', width: 320, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 8, elevation: 8 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: GREEN, alignItems: 'center', justifyContent: 'center', marginBottom: 0, marginTop: 18, backgroundColor: '#fff' },
  icon: { width: 48, height: 48, resizeMode: 'contain' },
  title: { fontWeight: 'bold', fontSize: 20, color: '#222', marginBottom: 8 },
  desc: { color: '#888', fontSize: 15, textAlign: 'center', marginBottom: 24 },
  homeBtn: { backgroundColor: ORANGE, borderRadius: 24, paddingVertical: 14, paddingHorizontal: 40, alignItems: 'center', width: '100%' },
  homeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
}); 