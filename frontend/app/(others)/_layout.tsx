import { Stack, Tabs, useNavigation, useRouter } from 'expo-router';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  return (
    <>
    <Stack>
      <Stack.Screen
        name="cart_list"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="category"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="product_details_screen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="seller_details_screen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="user_profile"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="update_profile"  // 👈 Added Update Profile Screen
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="order_list_screen" options={{ headerShown: false }} />
      <Stack.Screen name="order_detail" options={{ headerShown: false }} />
    </Stack>
    <StatusBar backgroundColor="#161622" style="light" />
  </>
  );
}
