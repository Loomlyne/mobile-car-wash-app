import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ORANGE = '#FF9800';

export default function RatingModal({ visible, onClose, onRate }: { visible: boolean; onClose: () => void; onRate: (rating: number) => void }) {
  const [rating, setRating] = useState(4);
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Modal handle */}
          <View style={styles.handle} />
          {/* App Logo */}
          <Image source={require('../assets/images/LogoV.png')} style={styles.icon} />
          <Text style={styles.title}>Royal Services</Text>
          <Text style={styles.desc}>Your feedback will help us to make improvements</Text>
          <View style={styles.starsRow}>
            {[1,2,3,4,5].map(i => (
              <TouchableOpacity key={i} onPress={() => setRating(i)}>
                <FontAwesome name={i <= rating ? 'star' : 'star-o'} size={34} color={ORANGE} style={{ marginHorizontal: 3 }} />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rateBtn} onPress={() => { onRate(rating); onClose(); }}>
              <Text style={styles.rateBtnText}>Rate Us</Text>
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
  handle: { width: 48, height: 5, borderRadius: 3, backgroundColor: '#E0E0E0', marginBottom: 18, marginTop: -8 },
  icon: { width: 64, height: 64, marginBottom: 10, marginTop: 2, resizeMode: 'contain' },
  title: { fontWeight: 'bold', fontSize: 21, color: '#222', marginBottom: 6, marginTop: 2 },
  desc: { color: '#888', fontSize: 15, textAlign: 'center', marginBottom: 22 },
  starsRow: { flexDirection: 'row', marginBottom: 22 },
  btnRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  cancelBtn: { flex: 1, backgroundColor: '#F2F2F2', borderRadius: 24, paddingVertical: 15, alignItems: 'center', marginRight: 8 },
  cancelBtnText: { color: '#888', fontWeight: 'bold', fontSize: 16 },
  rateBtn: { flex: 1, backgroundColor: ORANGE, borderRadius: 24, paddingVertical: 15, alignItems: 'center', marginLeft: 8 },
  rateBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
}); 