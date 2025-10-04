import React, { useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ORANGE = '#FF9800';
const LIGHT_ORANGE = '#FFF3E0';
const CARD_RADIUS = 32;
const { width } = Dimensions.get('window');

const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', 'back'],
];

export default function AddMoneyModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [amount, setAmount] = useState('20');

  const handleKeyPress = (key: string) => {
    if (key === 'back') setAmount(a => a.length > 1 ? a.slice(0, -1) : '0');
    else if (key && amount.length < 6) setAmount(a => (a === '0' ? key : a + key));
  };

  const handlePay = () => {
    // Implement pay logic here
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Balance Box */}
          <View style={styles.balanceBox}>
            <Text style={styles.balanceLabel}>Added Balance</Text>
            <Text style={styles.balanceValue}>AED {parseFloat(amount).toFixed(2)}</Text>
          </View>
          {/* Pay Button */}
          <TouchableOpacity style={styles.payBtn} onPress={handlePay}>
            <Text style={styles.payBtnText}>Pay</Text>
          </TouchableOpacity>
          {/* Keypad */}
          <View style={styles.keypad}>
            {KEYS.map((row, i) => (
              <View key={i} style={styles.keypadRow}>
                {row.map((key, j) => (
                  <TouchableOpacity
                    key={j}
                    style={[styles.key, key === '' && { backgroundColor: 'transparent' }]}
                    onPress={() => key && handleKeyPress(key)}
                    disabled={key === ''}
                  >
                    {key === 'back' ? (
                      <Text style={styles.keyBack}>&#9003;</Text>
                    ) : (
                      <Text style={styles.keyText}>{key}</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.18)', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: '#fff', borderRadius: CARD_RADIUS, padding: 0, alignItems: 'center', width: width - 32, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 8, elevation: 8, overflow: 'hidden' },
  balanceBox: { backgroundColor: LIGHT_ORANGE, width: '100%', alignItems: 'center', paddingVertical: 24, borderTopLeftRadius: CARD_RADIUS, borderTopRightRadius: CARD_RADIUS, marginBottom: 18 },
  balanceLabel: { color: ORANGE, fontWeight: 'bold', fontSize: 15, marginBottom: 4 },
  balanceValue: { color: '#222', fontWeight: 'bold', fontSize: 28 },
  payBtn: { backgroundColor: ORANGE, borderRadius: 24, width: '90%', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, marginBottom: 18 },
  payBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  keypad: { width: '100%', paddingHorizontal: 24, paddingBottom: 24 },
  keypadRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
  key: { backgroundColor: '#222', borderRadius: 16, width: 70, height: 56, alignItems: 'center', justifyContent: 'center' },
  keyText: { color: '#fff', fontWeight: 'bold', fontSize: 24 },
  keyBack: { color: '#fff', fontWeight: 'bold', fontSize: 28 },
}); 