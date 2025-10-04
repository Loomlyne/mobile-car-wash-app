import { ThemedText } from '@/components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Building {
  id: string;
  name: string;
  address: string;
}

// Hardcoded buildings list (same as ChangeBuilding)
const AVAILABLE_BUILDINGS: Building[] = [
  { id: '1', name: '4880 Holden Street', address: '4880 Holden Street San Diego, CA 92103' },
  { id: '2', name: '4881 Holden Street', address: '4881 Holden Street San Diego, CA 92103' },
  { id: '3', name: '4882 Holden Street', address: '4882 Holden Street San Diego, CA 92103' },
  { id: '4', name: '4883 Holden Street', address: '4883 Holden Street San Diego, CA 92103' },
  { id: '5', name: '4884 Holden Street', address: '4884 Holden Street San Diego, CA 92103' },
  { id: '6', name: '4885 Holden Street', address: '4885 Holden Street San Diego, CA 92103' },
];

export default function PickBuilding() {
  const [selected, setSelected] = useState<number>(-1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserSelectedBuilding();
  }, []);

  const fetchUserSelectedBuilding = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData } = await supabase
        .from('profiles')
        .select('selected_building')
        .eq('phone', `+${user.phone}`)
        .single();

      if (profileData && profileData.selected_building) {
        // Find the index of the selected building
        const selectedIndex = AVAILABLE_BUILDINGS.findIndex(b => b.id === profileData.selected_building);
        setSelected(selectedIndex >= 0 ? selectedIndex : 0);
      } else {
        setSelected(0); // Select first building by default
      }
    } catch (error) {
      console.error('Error fetching selected building:', error);
      setSelected(0); // Select first building by default
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    if (selected === -1) {
      Alert.alert('Error', 'Please select a building');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData } = await supabase
        .from('profiles')
        .select('id')
        .eq('phone', `+${user.phone}`)
        .single();

      if (!profileData) return;

      const selectedBuilding = AVAILABLE_BUILDINGS[selected];

      const { error } = await supabase
        .from('profiles')
        .update({ 
          selected_building: selectedBuilding.id
        })
        .eq('id', profileData.id);

      if (error) {
        Alert.alert('Error', 'Failed to save building selection');
        return;
      }

      // Navigate to the next screen
      router.push('/(tabs)');
    } catch (error) {
      console.error('Error saving building selection:', error);
      Alert.alert('Error', 'Failed to save building selection');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ThemedText style={{ textAlign: 'center' }}>Loading buildings...</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>Pick Your Building</ThemedText>
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {AVAILABLE_BUILDINGS.map((building, idx) => {
          const isSelected = idx === selected;
          return (
            <TouchableOpacity
              key={building.id}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => setSelected(idx)}
              activeOpacity={0.8}
            >
              <View style={styles.iconContainer}>
                <FontAwesome name="map-marker" size={24} color={isSelected ? '#FF9800' : '#BDBDBD'} />
              </View>
              <View style={styles.textContainer}>
                <ThemedText style={styles.buildingName}>{building.name}</ThemedText>
                <ThemedText style={[styles.buildingAddress, isSelected && styles.buildingAddressSelected]}>{building.address}</ThemedText>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <ThemedText style={styles.continueButtonText}>Continue</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  list: {
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: '#FF9800',
    backgroundColor: '#FFF7ED',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textContainer: {
    flex: 1,
  },
  buildingName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
    color: '#222',
  },
  buildingAddress: {
    fontSize: 13,
    color: '#BDBDBD',
  },
  buildingAddressSelected: {
    color: '#FF9800',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#FF9800',
    borderRadius: 32,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
}); 