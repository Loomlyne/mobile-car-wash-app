import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const ORANGE = '#FF8A00';
const BLACK = '#1E1E1E';
const GREYSCALE = '#8D8E90';
const YELLOW = '#FBBC04';

// Mock data - replace with actual data from your backend
const mockUpcomingBookings = [
  {
    id: '1',
    status: 'Not Started Yet',
    carName: 'BMW',
    license: 'BXD-255366',
    ref: '#D-652563',
    schedule: '4 Nov, 10:00-11:00 AM',
  },
  {
    id: '2',
    status: 'In progress',
    carName: 'Toyota Fortuner',
    license: 'DUB-56273892',
    ref: '#D-652563',
    schedule: '4 Nov, 10:00-11:00 AM',
  },
];

const mockHistoryBookings = [
  {
    id: '3',
    status: 'Complete',
    carName: 'BMW',
    license: 'BXD-255366',
    ref: '#D-652563',
    schedule: '4 Nov, 10:00-11:00 AM',
  },
  {
    id: '4',
    status: 'Complete',
    carName: 'BMW',
    license: 'BXD-255366',
    ref: '#D-652563',
    schedule: '4 Nov, 10:00-11:00 AM',
  },
];

const BookingCard = ({ booking, tab }: any) => {
  const { theme } = useTheme();

  const getStatusStyle = () => {
    if (booking.status === 'Complete') {
      return { backgroundColor: 'rgba(76, 175, 80, 0.2)', color: '#4CAF50' };
    } else if (booking.status === 'In progress') {
      return { backgroundColor: 'rgba(255, 138, 0, 0.2)', color: ORANGE };
    } else {
      return { backgroundColor: 'rgba(4, 4, 4, 0.2)', color: BLACK };
    }
  };

  const statusStyle = getStatusStyle();

  return (
    <TouchableOpacity
      onPress={() => {
        if (tab === 'upcoming') {
          router.push({ pathname: '/OrderInProgress', params: { id: booking.id } });
        } else {
          router.push({ pathname: '/HistoryDetails', params: { id: booking.id } });
        }
      }}
      style={[styles.bookingCard, { backgroundColor: theme.cardBackground }]}
    >
      <View style={styles.statusRow}>
        <Text style={[styles.cardLabel, { color: theme.textPrimary }]}>Status</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
          <Text style={[styles.statusText, { color: statusStyle.color }]}>
            {booking.status}
          </Text>
          <Ionicons name="chevron-forward" size={18} color={statusStyle.color} />
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={[styles.label, { color: theme.textPrimary }]}>{booking.status === 'In progress' ? booking.carName : 'Car Name'}</Text>
        <Text style={[styles.value, { color: theme.textSecondary }]}>{booking.status === 'In progress' ? booking.license : booking.carName}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={[styles.label, { color: theme.textPrimary }]}>Car License Plate</Text>
        <Text style={[styles.value, { color: theme.textSecondary }]}>{booking.license}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={[styles.label, { color: theme.textPrimary }]}>Reference Number</Text>
        <Text style={[styles.value, { color: theme.textSecondary }]}>{booking.ref}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={[styles.label, { color: theme.textPrimary }]}>Schedule</Text>
        <Text style={[styles.value, { color: theme.textSecondary }]}>{booking.schedule}</Text>
      </View>
    </TouchableOpacity>
  );
};

const EmptyState = ({ tab }: { tab: 'upcoming' | 'history' }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.emptyState}>
      <Ionicons name="clipboard-outline" size={80} color="#D0D0D0" style={{ marginBottom: 24 }} />
      <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>No Upcoming Order</Text>
      <Text style={[styles.emptyDesc, { color: theme.textSecondary }]}>
        Currently you don't have any upcoming order. Place and track your orders from here.
      </Text>
    </View>
  );
};

export default function BookingsScreen() {
  const { theme } = useTheme();
  const [tab, setTab] = useState<'upcoming' | 'history'>('upcoming');

  // Get bookings based on selected tab
  const bookings = tab === 'upcoming' ? mockUpcomingBookings : mockHistoryBookings;
  const isEmpty = bookings.length === 0;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <LinearGradient colors={[theme.gradientStart, theme.gradientEnd]} style={styles.headerGradient}>
        <SafeAreaView edges={['top']} style={{ paddingBottom: 12 }}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Image resizeMode='contain' source={require('../../assets/images/back.png')} style={styles.backIcon} tintColor="#000" />
              </TouchableOpacity>
              <Text style={[styles.title, { color: theme.textPrimary }]}>Bookings</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/ScheduleOrder')}
              style={[styles.addBookingBtn, { backgroundColor: theme.primaryOrange }]}
            >
              <Text style={[styles.addBookingBtnText, { color: theme.buttonText }]}>Add booking</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.tabRow, { backgroundColor: theme.surface }]}>
            <TouchableOpacity
              style={[styles.tabBtn, tab === 'upcoming' && [styles.tabBtnActive, { backgroundColor: theme.primaryOrange }]]}
              onPress={() => setTab('upcoming')}
            >
              <Text style={[styles.tabBtnText, { color: theme.textSecondary }, tab === 'upcoming' && [styles.tabBtnTextActive, { color: theme.buttonText }]]}>
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabBtn, tab === 'history' && [styles.tabBtnActive, { backgroundColor: theme.primaryOrange }]]}
              onPress={() => setTab('history')}
            >
              <Text style={[styles.tabBtnText, { color: theme.textSecondary }, tab === 'history' && [styles.tabBtnTextActive, { color: theme.buttonText }]]}>
                History
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {isEmpty ? (
        <EmptyState tab={tab} />
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <BookingCard booking={item} tab={tab} />}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerGradient: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingVertical: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
    color: BLACK,
  },
  addBookingBtn: {
    backgroundColor: ORANGE,
    borderRadius: 45,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  addBookingBtnText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    padding: 0,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  tabBtnActive: {
    backgroundColor: ORANGE,
  },
  tabBtnText: {
    color: GREYSCALE,
    fontWeight: '400',
    fontSize: 14,
  },
  tabBtnTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: BLACK,
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 14,
    color: GREYSCALE,
    textAlign: 'center',
    lineHeight: 20,
  },
  listContent: {
    padding: 24,
  },
  bookingCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    padding: 16,
    marginBottom: 24,
    gap: 12,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: BLACK,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 8,
    paddingVertical: 4,
    borderRadius: 23,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: BLACK,
    flexShrink: 0,
  },
  value: {
    fontSize: 14,
    color: GREYSCALE,
    fontWeight: '400',
    flex: 1,
  },
});
