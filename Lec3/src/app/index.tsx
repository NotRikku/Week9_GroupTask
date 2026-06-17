import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [coffeeItems, setCoffeeItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
  try {
    const response = await fetch(
      'https://api.sampleapis.com/coffee/hot'
    );

    const data = await response.json();

    const formattedData = data.slice(0, 5).map((item: any) => ({
      id: item.id.toString(),
      category: 'Hot Drinks',
      name: item.title,
      price: '₱150',
      description: item.description,
    }));

    setCoffeeItems(formattedData);
  } catch (err) {
    setError(
      'Unable to load menu. Check your internet connection.'
    );
  } finally {
    setLoading(false);
  }
};

  const handlePress = (item: any) => {
    router.push({
      pathname: '/detail',
      params: {
        name: item?.name ?? 'Unknown',
        price: item?.price ?? 'N/A',
        description: item?.description ?? 'No description available',
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading menu...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Placeholder Cafe</Text>
      <Text style={styles.subtitle}>Coffee Shop Menu</Text>

      <FlatList
        data={Array.isArray(coffeeItems) ? coffeeItems : []}
        keyExtractor={(item, index) =>
          String(item?.id ?? index)
        }
        renderItem={({ item }) => {
          if (!item) return null;

          const category =
            typeof item?.category === 'string'
              ? item.category
              : 'Unknown';

          const name =
            typeof item?.name === 'string'
              ? item.name
              : 'Unnamed Item';

          const price =
            typeof item?.price === 'string'
              ? item.price
              : 'N/A';

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handlePress(item)}
            >
              <Text style={styles.category}>
                {category.toUpperCase()}
              </Text>

              <Text style={styles.name}>{name}</Text>

              <Text style={styles.price}>{price}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },

  subtitle: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },

  card: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },

  category: {
    fontSize: 10,
    color: 'gray',
    marginBottom: 5,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  price: {
    marginTop: 5,
    color: '#8B4513',
    fontWeight: 'bold',
  },
});