// app/add-building.tsx
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ORANGE = '#FF9800';
const { width } = Dimensions.get('window');

export default function AddBuildingScreen() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleAdd = async () => {
    if (!name || !address) {
      Alert.alert('Error', 'Please enter both name and address');
      return;
    }

    try {
      

     

      Alert.alert('Success', 'Building added successfully', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error('Error adding building:', error);
      Alert.alert('Error', 'Failed to add building');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#222' }}>
      {/* Black Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12, marginBottom: 4 }}>
          <FontAwesome name="angle-left" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Building</Text>
        <View style={{ width: 28 }} /> {/* Placeholder to balance layout */}
      </View>

      {/* White Curved Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Add New Building</Text>
        <TextInput
          placeholder="Building Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          multiline
        />
        <TouchableOpacity onPress={handleAdd} style={styles.button}>
          <Text style={styles.buttonText}>Add Building</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#222',
    paddingTop: 44,
    paddingBottom: 32,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    marginBottom: 4,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
    padding: 24,
    width: width - 24,
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    color: '#000',
  },
  button: {
    backgroundColor: ORANGE,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
