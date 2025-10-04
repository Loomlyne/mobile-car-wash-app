import { FontAwesome } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ORANGE = '#FF9800';
const { width } = Dimensions.get('window');

interface Building {
  id: string;
  address: string;
  name: string;
}

export default function ChangeBuildingScreen() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selected, setSelected] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      fetchBuildingsAndUserSelection();
    }, [])
  );

  const fetchBuildingsAndUserSelection = async () => {
    try {
      setLoading(true);

      // Fetch buildings dynamically from DB
      const { data: buildingsData, error: buildingsError } = await supabase
        .from('buildings')
        .select('id, name, address')
        .order('name');

      if (buildingsError) throw buildingsError;
      setBuildings(buildingsData || []);

      // Fetch user selected building
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData } = await supabase
        .from('profiles')
        .select('selected_building')
        .eq('phone', `+${user.phone}`)
        .single();

      // If user has a selected building, set it, else default to first building
      if (profileData && profileData.selected_building) {
        setSelected(profileData.selected_building);
      } else if (buildingsData && buildingsData.length > 0) {
        setSelected(buildingsData[0].id);
      } else {
        setSelected('');
      }
    } catch (error) {
      console.error('Error fetching buildings or user selection:', error);
      setBuildings([]);
      setSelected('');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSelection = async () => {
    if (!selected) {
      Alert.alert('Error', 'Please select a building');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        Alert.alert('Error', 'User not logged in');
        return;
      }
      console.log(selected);
      const { error } = await supabase
        .from('profiles')
        .update({ selected_building: selected })
        .eq('phone', "+"+user.phone);
      console.log(error);
      if (error) throw error;

      Alert.alert('Success', 'Building updated successfully', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Error saving building selection:', error);
      Alert.alert('Error', 'Failed to save building selection');
    }
  };

  const handleAddBuilding = () => {
    router.push('/AddBuilding');
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#222', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff' }}>Loading buildings...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#222' }}>
      {/* Black Header */}
      <View style={{
        backgroundColor: '#222',
        paddingTop: 44,
        paddingBottom: 32,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12, marginBottom: 4 }}>
          <FontAwesome name="angle-left" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, flex: 1, marginBottom: 4 }}>Building</Text>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddBuilding}>
          <Text style={styles.addBtnText}>Add Building</Text>
          <FontAwesome name="plus" size={14} color={ORANGE} />
        </TouchableOpacity>
      </View>

      {/* White Card with Curve */}
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -24,
        padding: 18,
        width: width - 24,
        alignSelf: 'center',
      }}>
        <FlatList
          data={buildings}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.buildingCard, selected === item.id && styles.buildingCardSelected]}
              onPress={() => setSelected(item.id)}
            >
              <FontAwesome name="map-marker" size={22} color={selected === item.id ? ORANGE : '#888'} style={{ marginRight: 16 }} />
              <Text style={[styles.buildingText, selected === item.id && styles.buildingTextSelected]}>
                {item.address}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ padding: 18 }}
        />
        <TouchableOpacity style={styles.doneBtn} onPress={handleSaveSelection}>
          <Text style={styles.doneBtnText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF3E0', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6 },
  addBtnText: { color: ORANGE, fontWeight: 'bold', fontSize: 13, marginRight: 4 },
  buildingCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F2F2', borderRadius: 18, padding: 18, marginBottom: 14 },
  buildingCardSelected: { borderWidth: 2, borderColor: ORANGE },
  buildingText: { color: '#888', fontSize: 15, flex: 1 },
  buildingTextSelected: { color: ORANGE, fontWeight: 'bold' },
  doneBtn: { backgroundColor: ORANGE, borderRadius: 24, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', margin: 18, marginTop: 0 },
  doneBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});
