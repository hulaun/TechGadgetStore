import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, Dimensions, ImageSourcePropType } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CartIcon, ChevronLeftIcon } from "@/constants/Icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "@/components/ui/ProductCard";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@react-navigation/native";
import { Product } from "@/types/ProductType";
import { useAuth } from "@/context/AuthProvider";

const CategoryScreen = () => {
  const [search, setSearch] = useState("");
  const { id, name } = useLocalSearchParams();
  const router = useRouter();
  const screenWidth = useRef(Dimensions.get("window").width);
  const theme = useTheme();
  const { api } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await api.get(`/product/category/${id}`);
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProductsByCategory();
  },[]);

  return (
    <SafeAreaView className="flex-1 bg-white h-full">
      <StatusBar backgroundColor={theme.colors.background}/>
      
      <View className="flex-row items-center justify-between p-4">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeftIcon color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Category</Text>
        <TouchableOpacity>
          <CartIcon />
          <View className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full" />
        </TouchableOpacity>
      </View>
      <Text className="text-2xl font-bold mt-6 px-4">{name}</Text>
      {/* Search Bar */}
      <View className="m-4 bg-gray-100 rounded-xl flex-row items-center px-4 py-3 mx-4">
        <TextInput
          placeholder="Search Product Name"
          value={search}
          onChangeText={setSearch}
          className="ml-2 flex-1 text-base"
        />
      </View>
      {/* Product Grid */}
      <View className='p-4 bg-offGrey rounded-t-xl flex-1'>
        <FlatList
            showsVerticalScrollIndicator={false}
            data={products}
            keyExtractor={(product) => product._id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between", gap: 16 , marginBottom: 16}}
            renderItem={({ item }) => (
                <ProductCard item={item} width={(screenWidth.current - 56) / 2} />
                )}
                contentContainerStyle={{ gap: 16}}
        />
        {/* <TouchableOpacity className="border border-black rounded-xl py-3 items-center my-2 mx-4">
            <Text className="text-base font-semibold">Filter & Sorting</Text>
        </TouchableOpacity> */}
    </View>
      {/* Filter & Sorting Button */}
    </SafeAreaView>
  );
};

export default CategoryScreen;