import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [name, setName] = useState('');

  useEffect(() => {
    loadName();
  }, []);

  const loadName = async () => {
    try {
      const savedName = await AsyncStorage.getItem('profileName');

      if (savedName) {
        setName(savedName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveName = async () => {
    try {
      await AsyncStorage.setItem('profileName', name);
      alert('Profile saved!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <Button
        title="Save Name"
        onPress={saveName}
      />

      <Text style={styles.saved}>
        Current Name: {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },

  saved: {
    marginTop: 20,
    fontSize: 16,
  },
});