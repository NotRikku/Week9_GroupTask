import { View, Text, Button, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function DetailScreen() {
  const { name, price, description } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>

      <Text style={styles.price}>{price}</Text>

      <Text style={styles.description}>
        {description}
      </Text>

      <Button
        title="Back to Menu"
        onPress={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  price: {
    fontSize: 18,
    marginBottom: 10,
  },

  description: {
    marginBottom: 20,
  },
});