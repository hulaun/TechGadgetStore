import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
    <Stack>
      <Stack.Screen
        name="sign_in"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign_up"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
    <StatusBar backgroundColor="#161622" style="light" />
  </>
  );
}
