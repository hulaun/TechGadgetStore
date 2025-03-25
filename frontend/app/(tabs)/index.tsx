import { View, Text, TextInput, TouchableOpacity, Dimensions, ImageSourcePropType } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@react-navigation/native';
import { ComputerIcon, FashionIcon, FoodsIcon, GadgetIcon, GiftIcon, SearchIcon, StarIcon } from '@/constants/Icons';
import { Colors } from '@/constants/Colors';
import ProductCard from '@/components/ui/ProductCard';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthProvider';
import { Product } from '@/types/ProductType';
import { Category } from '@/types/CategoryType';

const initialCategories:Array<Category> = [
  {
    id: 1,
    name: "Foods",
    Icon: FoodsIcon,
    color: Colors.offGreen,
    iconColor: Colors.earthGreen
  },
  {
    id: 2,
    name: "Gift",
    Icon: GiftIcon,
    color: Colors.offRed,
    iconColor: Colors.redVelvet
  },
  {
    id: 3,
    name: "Fashion",
    Icon: FashionIcon,
    color: Colors.softOrange,
    iconColor: Colors.orangeFresh
  },
  {
    id: 4,
    name: "Gadget",
    Icon: GadgetIcon,
    color: Colors.softPurple,
    iconColor: "purple"
  },
  {
    id: 5,
    name: "Computers",
    Icon: ComputerIcon,
    color: Colors.offGreen,
    iconColor: Colors.earthGreen
  },
]

const Home = () => {
  const { api } = useAuth();
  const screenWidth = useRef<number>(Dimensions.get('screen').width);
  const router = useRouter();
  const theme = useTheme();
  useEffect(() => {
    console.log(theme)
  }, [theme])


  const [products, setProducts] = useState<Product[]>([]);
  const [productsForYou, setProductsForYou] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await api.get('product/category');
      const fetchedCategories = response.data.data;
      const len = initialCategories.length;

      const updatedCategories = fetchedCategories.map((category: any, index: number) => {
          return {
            id: index + 1,
            _id: category._id,
            name: category.name,
            Icon: initialCategories[index%len].Icon,
            color: initialCategories[index%len].color,
            iconColor: initialCategories[index%len].iconColor,
          };
      });

      setCategories(updatedCategories);
    };
    const fetchProducts = async () => {
      const data = await api.get('/product/top');
      setProducts(data.data.data);
    }
    const fetchProductsForYou = async () => {
      const data = await api.get('/product');
      setProductsForYou(data.data.data);
    }

    fetchCategories();
    fetchProducts();
    fetchProductsForYou();
  },[])


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
                  <View className="bg-blue-600 rounded-xl p-6 mb-4">
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
                  <Text className="text-lg font-semibold mb-2"style={{ color: theme.colors.text }}>Categories</Text>
                  <FlatList
                    showsHorizontalScrollIndicator={false} 
                    horizontal
                    data={theCategories}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity className="flex items-center mr-6" onPress={()=>router.push(`/(others)/category?id=${item._id}&name=${item.name}`)}>
                        <View style={{ backgroundColor: (theme.dark)?"":item.color, borderColor: theme.dark?item.iconColor:"", borderWidth:theme.dark?1:0 }} className={`p-4 rounded-xl w-14 h-14 flex items-center justify-center mb-2`}>
                          <item.Icon color={(theme.dark)?item.color:item.iconColor} />
                        </View>
                        <Text className="text-sm text-center" style={{ color: theme.colors.text }}>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              );
            case 'featured':
            case 'forYou':
              const theProducts = item.data as Array<Product>;
              return (
                <View className='px-6 rounded-t-xl' style={{ backgroundColor: theme.colors.primary }}>
                  <Text className="text-lg font-semibold mb-2" style={{ color: theme.colors.text }}>
                    {item.type === 'featured' ? 'Top Rated Products' : 'Products for You'}
                  </Text>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={theProducts}
                    keyExtractor={(product) => product._id.toString()}
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