import { router } from 'expo-router';
import React from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ORANGE = '#FF9800';
import { getAuth, signOut } from "firebase/auth";

export default function LogoutModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const auth = getAuth();

const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("✅ User signed out successfully");
  } catch (error) {
    console.error("❌ Error signing out:", error);
  }
};
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* App Logo */}
          <Image source={require('../assets/images/LogoV.png')} style={styles.icon} />
          <Text style={styles.title}>Log out?</Text>
          <Text style={styles.desc}>Are you sure you want to log out?</Text>
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutBtn} onPress={async () => {
              router.replace('/SignIn');
              handleLogout()
              onClose();
            }}>
              <Text style={styles.logoutBtnText}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.18)', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: '#fff', borderRadius: 36, padding: 28, alignItems: 'center', width: 340, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 12, elevation: 12 },
  icon: { width: 64, height: 64, marginBottom: 10, marginTop: 2, resizeMode: 'contain' },
  title: { fontWeight: 'bold', fontSize: 21, color: '#222', marginBottom: 8 },
  desc: { color: '#888', fontSize: 15, textAlign: 'center', marginBottom: 22 },
  btnRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  cancelBtn: { flex: 1, backgroundColor: '#F2F2F2', borderRadius: 24, paddingVertical: 15, alignItems: 'center', marginRight: 8 },
  cancelBtnText: { color: '#888', fontWeight: 'bold', fontSize: 16 },
  logoutBtn: { flex: 1, backgroundColor: '#F44336', borderRadius: 24, paddingVertical: 15, alignItems: 'center', marginLeft: 8 },
  logoutBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
}); 