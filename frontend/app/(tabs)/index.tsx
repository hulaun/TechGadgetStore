import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@react-navigation/native';
import { ComputerIcon, FashionIcon, FoodsIcon, GadgetIcon, GiftIcon, SearchIcon, StarIcon } from '@/constants/Icons';
import { Colors } from '@/constants/Colors';
import Svg, { Path } from 'react-native-svg';
import ProductCard from '@/components/ui/ProductCard';

const categories = [
  {
    id: 1,
    name: "Foods",
    Icon: FoodsIcon,
    color: "bg-offGreen",
    iconColor: Colors.earthGreen
  },
  {
    id: 2,
    name: "Gift",
    Icon: GiftIcon,
    color: "bg-offRed",
    iconColor: Colors.redVelvet
  },
  {
    id: 3,
    name: "Fashion",
    Icon: FashionIcon,
    color: "bg-[#FFF6E4]",
    iconColor: Colors.orangeFresh
  },
  {
    id: 4,
    name: "Gadget",
    Icon: GadgetIcon,
    color: "bg-[#F1EDFC]",
    iconColor: "purple"
  },
  {
    id: 5,
    name: "Computers",
    Icon: ComputerIcon,
    color: "bg-offGreen",
    iconColor: Colors.earthGreen
  },
]

const Home = () => {

  const theme = useTheme();
  useEffect(() => {
    console.log(theme)
  }, [theme])


  const products = [
    { id: "1", name: "TMA-2 HD Wireless", price: "Rp. 1,500,000", image: "https://picsum.photos/20" , rating: 4.5, sold: 100 },
    { id: "2", name: "TMA-2 HD Wireless", price: "Rp. 1,500,000", image: "https://picsum.photos/20", rating: 4.5, sold: 100 },
  ];

  const productsForYou = [
    { id: "1", name: "TMA-2 HD Wireless", price: "Rp. 1,500,000", image: "https://picsum.photos/20" , rating: 4.5, sold: 100 },
    { id: "2", name: "Iphone XS Max", price: "Rp. 2,500,000", image: "https://picsum.photos/20", rating: 4.6, sold: 130 },
    { id: "3", name: "Oppo A15", price: "Rp. 500,000", image: "https://picsum.photos/20", rating: 4.2, sold: 200 },
    { id: "4", name: "Samsung Galaxy S21", price: "Rp. 1,500,000", image: "https://picsum.photos/20", rating: 4.7, sold: 150 },
    { id: "5", name: "Samsung Galaxy S21", price: "Rp. 1,500,000", image: "https://picsum.photos/20", rating: 4.7, sold: 150 },
    { id: "6", name: "Samsung Galaxy S21", price: "Rp. 1,500,000", image: "https://picsum.photos/20", rating: 4.7, sold: 150 },
    { id: "7", name: "Samsung Galaxy S21", price: "Rp. 1,500,000", image: "https://picsum.photos/20", rating: 4.7, sold: 150 },
    { id: "8", name: "Samsung Galaxy S21", price: "Rp. 1,500,000", image: "https://picsum.photos/20", rating: 4.7, sold: 150 },
    { id: "9", name: "Samsung Galaxy S21", price: "Rp. 1,500,000", image: "https://picsum.photos/20", rating: 4.7, sold: 150 },
    { id: "10", name: "Samsung Galaxy S21", price: "Rp. 1,500,000", image: "https://picsum.photos/20", rating: 4.7, sold: 150 },
    { id: "11", name: "Samsung Galaxy S21", price: "Rp. 1,500,000", image: "https://picsum.photos/20", rating: 4.7, sold: 150 },
    { id: "12", name: "Samsung Galaxy S21", price: "Rp. 1,500,000", image: "https://picsum.photos/20", rating: 4.7, sold: 150 },
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
            <SearchIcon/>
          </View>
          {/* Banner */}
          <View className="bg-blueOcean rounded-xl p-6 mb-4">
            <Text className="text-white text-lg font-bold">Gatis Ongkir Selama PPKM!</Text>
            <Text className="text-white">Periode Mei - Agustus 2021</Text>
          </View>
          {/* Categories */}
          <View className='flex-row justify-between items-center'>
            <Text className="text-lg font-semibold">Categories</Text>
            <Text className="text-md font-semibold text-blueOcean">See All</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2 mb-4 flex">
            {categories.map((cat) => (
              <View key={cat.id}  className={`${cat.color} p-4 rounded-xl w-14 h-14 flex items-center justify-center mr-6`}>
                <cat.Icon color={cat.iconColor} />
              </View>
            ))}
          </ScrollView>
        </View>
        {/* Featured Products */}
        <View className='p-6 bg-offGrey rounded-t-xl'>
          <Text className="text-lg font-semibold mb-2">Top Rated Products</Text>
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row" >
            {products.map((item) => (
              <View key={item.id} className='mr-2 w-3/5'>
                <ProductCard item={item} />
              </View>
            ))} */}
            {/* </ScrollView> */}
          <View className="grid grid-cols-2 justify-between gap-4">
            {products.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </View>
          <Text className="text-lg font-semibold mb-2">Products for you</Text>
          <View className="grid grid-cols-2 justify-between gap-4">
            {productsForYou.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default Home