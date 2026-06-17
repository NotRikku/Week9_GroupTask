import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen() {
  const [note, setNote] = useState('');

  useEffect(() => {
    loadNote();
  }, []);

  const loadNote = async () => {
    try {
      const savedNote = await AsyncStorage.getItem('cartNote');

      if (savedNote) {
        setNote(savedNote);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveNote = async () => {
    try {
      await AsyncStorage.setItem('cartNote', note);
      alert('Note saved!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>

      <TextInput
        style={styles.input}
        placeholder="Special instructions..."
        value={note}
        onChangeText={setNote}
      />

      <Button
        title="Save Note"
        onPress={saveNote}
      />

      <Text style={styles.saved}>
        Saved Note: {note}
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
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },

  saved: {
    marginTop: 20,
    fontSize: 16,
  },
});