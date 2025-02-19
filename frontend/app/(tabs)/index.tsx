import { View, Text, TextInput, TouchableOpacity, Dimensions, ImageSourcePropType } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@react-navigation/native';
import { ComputerIcon, FashionIcon, FoodsIcon, GadgetIcon, GiftIcon, SearchIcon, StarIcon } from '@/constants/Icons';
import { Colors } from '@/constants/Colors';
import Svg, { Path } from 'react-native-svg';
import ProductCard from '@/components/ui/ProductCard';
import { useRouter } from 'expo-router';
type Product = {
  id: string;
  name: string;
  price: string;
  image: ImageSourcePropType;
  rating: number;
  sold: number;
};

type Category = {
  id: number;
  name: string;
  Icon: React.ComponentType<{ color?: string }>;
  color: string;
  iconColor: string;
};
const categories:Array<Category> = [
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

  const screenWidth = useRef<number>(Dimensions.get('screen').width);
  const router = useRouter();
  const theme = useTheme();
  useEffect(() => {
    console.log(theme)
  }, [theme])


  const products: Array<Product> = [
    { id: "1", name: "TMA-2 HD Wireless", price: "Rp. 1,500,000", image: require("../../assets/images/headphones.png") , rating: 4.5, sold: 100 },
    { id: "2", name: "TMA-2 HD Wireless", price: "Rp. 1,500,000", image: require("../../assets/images/headphones.png"), rating: 4.5, sold: 100 },
    { id: "3", name: "Oppo A15", price: "Rp. 500,000", image: require("../../assets/images/headphones.png"), rating: 4.2, sold: 200 },
    // { id: "4", name: "Oppo A15", price: "Rp. 500,000", image: require("../../assets/images/headphones.png"), rating: 4.2, sold: 200 },
  ];

  const productsForYou: Array<Product> = [
    { id: "1", name: "TMA-2 HD Wireless", price: "Rp. 1,500,000", image: require("../../assets/images/headphones.png") , rating: 4.5, sold: 100 },
    { id: "2", name: "Iphone XS Max", price: "Rp. 2,500,000", image: require("../../assets/images/headphones.png"), rating: 4.6, sold: 130 },
    { id: "3", name: "Oppo A15", price: "Rp. 500,000", image: require("../../assets/images/headphones.png"), rating: 4.2, sold: 200 },
    { id: "4", name: "Samsung Galaxy S21", price: "Rp. 1,500,000", image: require("../../assets/images/headphones.png"), rating: 4.7, sold: 150 },
    { id: "5", name: "Samsung Galaxy S21", price: "Rp. 1,500,000", image: require("../../assets/images/headphones.png"), rating: 4.7, sold: 150 },
    { id: "6", name: "Samsung Galaxy S21", price: "Rp. 1,500,000", image: require("../../assets/images/headphones.png"), rating: 4.7, sold: 150 },
    { id: "7", name: "Samsung Galaxy S21", price: "Rp. 1,500,000", image: require("../../assets/images/headphones.png"), rating: 4.7, sold: 150 },
    { id: "8", name: "Samsung Galaxy S21", price: "Rp. 1,500,000", image: require("../../assets/images/headphones.png"), rating: 4.7, sold: 150 },
    { id: "9", name: "Samsung Galaxy S21", price: "Rp. 1,500,000", image: require("../../assets/images/headphones.png"), rating: 4.7, sold: 150 },
    { id: "10", name: "Samsung Galaxy S21", price: "Rp. 1,500,000", image: require("../../assets/images/headphones.png"), rating: 4.7, sold: 150 },
    { id: "11", name: "Samsung Galaxy S21", price: "Rp. 1,500,000", image: require("../../assets/images/headphones.png"), rating: 4.7, sold: 150 },
    { id: "12", name: "Samsung Galaxy S21", price: "Rp. 1,500,000", image: require("../../assets/images/headphones.png"), rating: 4.7, sold: 150 },
  ];


  return (
    <SafeAreaProvider>
      
        <StatusBar backgroundColor={theme.colors.background}/>
        
        <FlatList
        showsVerticalScrollIndicator={false}
        data={[
          { type: 'search', data: null },
          { type: 'banner', data: null },
          { type: 'categories', data: categories },
          { type: 'featured', data: products },
          { type: 'forYou', data: productsForYou },
        ]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          switch (item.type) {
            case 'search':
              return (
                <View className="p-6">
                  <View
                    style={{ backgroundColor: theme.colors.card }}
                    className="flex-row items-center p-3 rounded-xl my-4">
                    <TextInput placeholder="Search Product Name" className="flex-1 text-gray-700" />
                    <SearchIcon />
                  </View>
                </View>
              );
            case 'banner':
              return (
                <View className='px-6'>
                  <View className="bg-blueOcean rounded-xl p-6 mb-4">
                    <Text className="text-white text-lg font-bold">Gatis Ongkir Selama PPKM!</Text>
                    <Text className="text-white">Periode Mei - Agustus 2021</Text>
                  </View>
                </View>
              );
            case 'categories':
              const theCategories = item.data as Array<Category>;
              return (
                <View
                  className='px-6 pb-6'
                  >
                  <Text className="text-lg font-semibold mb-2">Categories</Text>
                  <FlatList
                    showsHorizontalScrollIndicator={false} 
                    horizontal
                    data={theCategories}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity className="flex items-center mr-6" onPress={()=>router.push(`/(others)/category?name=${item.name}`)}>
                        <View className={`${item.color} p-4 rounded-xl w-14 h-14 flex items-center justify-center mb-2`}>
                          <item.Icon color={item.iconColor} />
                        </View>
                        <Text className="text-sm text-center">{item.name}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              );
            case 'featured':
            case 'forYou':
              const theProducts = item.data as Array<Product>;
              return (
                <View className='px-6 bg-offGrey rounded-t-xl'>
                  <Text className="text-lg font-semibold mb-2">
                    {item.type === 'featured' ? 'Top Rated Products' : 'Products for You'}
                  </Text>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={theProducts}
                    keyExtractor={(product) => product.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between", gap: 16 , marginBottom: 16}}
                    renderItem={({ item }) => (
                      <ProductCard item={item} width={(screenWidth.current - 56) / 2} />
                    )}
                    contentContainerStyle={{ gap: 16}}
                  />
                </View>
              );
            default:
              return null;
          }
        }}
        // ListFooterComponent={() => <View className="pb-8" />} // Optional for padding at the bottom
        // contentContainerStyle={{ paddingBottom: 16 }}
      />
    </SafeAreaProvider>
  )
}

export default Home