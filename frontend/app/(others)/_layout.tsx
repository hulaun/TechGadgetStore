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
    </Stack>
    <StatusBar backgroundColor="#161622" style="light" />
  </>
  );
}
