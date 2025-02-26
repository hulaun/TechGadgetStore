import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BellIcon, CartIcon, HomeIcon, LoginIcon, OrderIcon, WishlistIcon } from '@/constants/Icons';
import { useTheme } from '@react-navigation/native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.blueOcean,
        headerShown: false,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color}/>,
          headerShown: true,
          header: () => (
            <SafeAreaView>
              <View style={{backgroundColor: theme.colors.background}}className="flex-row justify-between items-center px-4 pt-6">
                <Text/>
                <Text className="text-xl font-bold text-blue-600">Mega Mall</Text>
                <View className="flex-row gap-4">
                  <BellIcon/>
                  <CartIcon/>
                </View>
              </View>
            </SafeAreaView>
          )
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color }) => <WishlistIcon color={color}/>,
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'order',
          tabBarIcon: ({ color }) => <OrderIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'login',
          tabBarIcon: ({ color }) => <LoginIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'account',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
