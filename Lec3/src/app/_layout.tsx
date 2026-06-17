import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Menu',
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Cart',
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />

      <Tabs.Screen
        name="detail"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}