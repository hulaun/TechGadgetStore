import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@react-navigation/native';
const Home = () => {

  const theme = useTheme();
  useEffect(() => {
    console.log(theme)
  }, [theme])


  const products = [
    { id: "1", name: "TMA-2 HD Wireless", price: "Rp. 1,500,000", image: "https://example.com/headphone.png" },
    { id: "2", name: "TMA-2 HD Wireless", price: "Rp. 1,500,000", image: "https://example.com/headphone2.png" },
  ];


  return (
    <SafeAreaProvider>
      <ScrollView 
        style={{ backgroundColor: theme.colors.background }}
        className={``}>
        <StatusBar backgroundColor={theme.colors.background}/>
        {/* Search Bar */}
        <View className='p-6'>
          <View 
            style={{ backgroundColor: theme.colors.card }}
            className="flex-row items-center p-3 rounded-xl my-4">
            <TextInput placeholder="Search Product Name" className="flex-1 text-gray-700" />
            <Text>Ic</Text>
          </View>
          {/* Banner */}
          <View className="bg-blueOcean rounded-xl p-6 mb-4">
            <Text className="text-white text-lg font-bold">Gatis Ongkir Selama PPKM!</Text>
            <Text className="text-white">Periode Mei - Agustus 2021</Text>
          </View>
          {/* Categories */}
          <Text className="text-lg font-semibold">Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2 mb-4">
            {["Foods", "Gift", "Fashion", "Gadget", "Computers"].map((cat, i) => (
              <View key={i} className="bg-gray-100 p-4 rounded-lg mx-2">
                <Text>{cat}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        {/* Featured Products */}
        <Text className="text-lg font-semibold mb-2">Featured Product</Text>
        <FlatList
          horizontal
          data={products}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }:{item: any}) => (
            <TouchableOpacity className="bg-white p-4 rounded-lg shadow-md mx-2">
              <Image source={{ uri: item.image }} className="w-24 h-24 mb-2" />
              <Text className="font-semibold">{item.name}</Text>
              <Text className="text-red-500">{item.price}</Text>
            </TouchableOpacity>
          )}
        />
        {/* Latest News */}
        <Text className="text-lg font-semibold mt-4">Latest News</Text>
        <View className="bg-white p-4 rounded-lg shadow-md mt-2">
          <Text className="font-semibold">Philosophy That Addresses Topics Such As Goodness</Text>
          <Text className="text-gray-600">13 Jan 2021</Text>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default Home