import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ORANGE = '#FF9800';

const mockOrder = {
  ref: '#D-654321',
  statusSteps: [
    { label: 'Order Has Been Placed', done: true },
    { label: 'Order Has Been Confirmed', done: true },
    { label: 'You Car Will Be Available In 1 Hour', done: false },
  ],
};
const doneIcon=require('../assets/images/icondone.png')
const notDoneIcon=require('../assets/images/iconprog.png')
export default function OrderInProgressScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Black Header */}
      <LinearGradient colors={['#FFCC00', '#FFFFFF']} style={styles.headerGradient}>
        <SafeAreaView style={{ paddingBottom: 12 }}>
          <View style={{flexDirection:"row",marginBottom:15}}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12, marginTop: 5 }}>
          <Image resizeMode='contain' source={require('../assets/images/back.png')} style={styles.back} tintColor="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Wash in progress</Text>

          </View>
        </SafeAreaView>
      </LinearGradient>
      {/* White Card with Curve */}
   
        <View style={styles.centered}>
          <View style={styles.checkCircle}>
          <Image resizeMode='contain' source={require('../assets/images/Doneorange.png')} style={styles.done} />

          </View>
          <Text style={styles.placedTitle}>Your Order Has Been Placed</Text>
          <Text style={styles.refText}>Reference Code: <Text style={{fontWeight:"bold"}}>{mockOrder.ref}</Text></Text>
        </View>
        <View style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>Order Status</Text>
          <View style={styles.timelineWrap}>
          {mockOrder.statusSteps.map((step, idx) => (
        <View key={step.label} style={styles.timelineRow}>
          <View style={styles.timelineIconWrap}>
            <Image
              source={step.done ? notDoneIcon : doneIcon}
              style={styles.timelineIcon}
            />
            {idx < mockOrder.statusSteps.length - 1 && (
              <View style={styles.timelineLine} />
            )}
          </View>
          <Text
            style={[
              styles.timelineLabel,
              step.done && styles.timelineLabelDone,
            ]}
          >
            {step.label}
          </Text>
        </View>
      ))}
          </View>
        </View>
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={()=>router.push("/CancelReason")}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.doneBtn} onPress={()=>router.push("/(tabs)/Bookings")}>
            <Text style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>
        </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18, backgroundColor: '#222', borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  headerTitle: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  centered: { alignItems: 'center', marginTop: 32, marginBottom: 16 },
  checkCircle: { width: 96, height: 96, borderRadius: 48, borderWidth: 4, borderColor: ORANGE, alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  placedTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 8, color: '#222' },
  refText: { color: 'black', fontSize: 15, marginBottom: 8 },
  timelineCard: {  borderRadius: 18, padding: 18, margin: 18, marginTop: 0 },
  timelineTitle: { color: '#222', fontWeight: 'bold', fontSize: 15, marginBottom: 12 },
  timelineWrap: { marginLeft: 8,gap:60 },
  timelineRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  timelineIconWrap: { alignItems: 'center', marginRight: 16 },
  timelineCircle: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#E0E0E0', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  timelineCircleDone: { borderColor: ORANGE },
  done:{
width:120,
height:120
  },
  timelineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: ORANGE },
  timelineLine: { width: 2, height: 85, backgroundColor: 'orange', position: 'absolute', top: 22 },
  timelineLabel: { color: '#888', fontSize: 15 },
  timelineLabelDone: { color: '#222', fontWeight: 'bold' },
  btnRow: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 18, marginTop: 32 },
  cancelBtn: { flex: 1, backgroundColor: '#F2F2F2', borderRadius: 24, paddingVertical: 16, alignItems: 'center', marginRight: 8 },
  cancelBtnText: { color: '#888', fontWeight: 'bold', fontSize: 18 },
  doneBtn: { flex: 1, backgroundColor: ORANGE, borderRadius: 24, paddingVertical: 16, alignItems: 'center', marginLeft: 8 },
  doneBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  title: {
    fontSize: 28,
    marginBottom: 35,
    fontWeight: 'bold',
    color: '#000',
  },
  back:{
   height:25,
   width:30 
  },
 headerGradient: {
    height: 150,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  timelineIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
}); 