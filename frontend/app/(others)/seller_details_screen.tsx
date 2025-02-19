import React, { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  ImageSourcePropType,
  Dimensions,
} from "react-native";
import { Avatar, Divider } from "react-native-paper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ProductCard from "@/components/ui/ProductCard";

// Mock Data
const sellerInfo = {
  name: "Shop Larson Electronic",
  location: "Jawa Barat, Bandung (Jam Buka 08:00-21:00)",
  followers: "23",
  products: 150,
  joinedDate: "20 Okt 2021",
  rating: 4.6,
  avatar: require("../../assets/images/shop.png"),
};

type Product = {
    id: string;
    name: string;
    price: string;
    image: ImageSourcePropType;
    rating: number;
    sold: number;
  };

const products: Array<Product> = [
    { id: "1", name: "TMA-2 HD Wireless", price: "Rp. 1,500,000", image: require("../../assets/images/headphones.png") , rating: 4.5, sold: 100 },
    { id: "2", name: "TMA-2 HD Wireless", price: "Rp. 1,500,000", image: require("../../assets/images/headphones.png"), rating: 4.5, sold: 100 },
    { id: "3", name: "Oppo A15", price: "Rp. 500,000", image: require("../../assets/images/headphones.png"), rating: 4.2, sold: 200 },
// { id: "4", name: "Oppo A15", price: "Rp. 500,000", image: "https://picsum.photos/20", rating: 4.2, sold: 200 },
];

const SellerDetailsScreen=()=>{
  const router = useRouter();
  const screenWidth = useRef<number>(Dimensions.get("screen").width);
  return (
    <View className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Info Seller</Text>
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity>
            <MaterialIcons name="search" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="relative">
            <MaterialIcons name="shopping-cart" size={24} color="black" />
            <View className="absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-4">
        <View className="flex-row items-center">
          <Avatar.Image size={50} source={sellerInfo.avatar} />
          <View className="ml-3">
            <Text className="text-lg font-bold">{sellerInfo.name}</Text>
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-500 mr-1">Official Store</Text>
              <Ionicons
                name="shield-checkmark-sharp"
                size={24}
                color="#3669C9"
              />
            </View>
          </View>
          <View className="flex-row items-center ml-auto">
            <MaterialIcons name="star" size={18} color="gold" />
            <Text className="text-base font-semibold ml-1">
              {sellerInfo.rating}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center mt-2">
          <MaterialIcons
            name="location-pin"
            className="mt-2"
            size={18}
            color="grey"
          />
          <Text className="text-gray-500 text-sm mt-2">
            {sellerInfo.location}
          </Text>
        </View>

        <View className="flex-row justify-between mt-3">
          <View className="items-center">
            <Text className="text-gray-500 text-sm">Pengikut</Text>
            <Text className="text-sm font-bold text-black">
              {sellerInfo.followers} Rb
            </Text>
          </View>

          <View className="items-center">
            <Text className="text-gray-500 text-sm">Produk</Text>
            <Text className="text-sm font-bold text-black">
              {sellerInfo.products} Item
            </Text>
          </View>

          <View className="items-center">
            <Text className="text-gray-500 text-sm">Bergabung</Text>
            <Text className="text-sm font-bold text-black">
              {sellerInfo.joinedDate}
            </Text>
          </View>
        </View>
      </View>

      <Divider className="my-3" />

      <TouchableOpacity className="flex-row justify-between items-center px-4 py-2">
        <Text className="text-lg font-bold">Dukungan Pengiriman</Text>
        <MaterialIcons name="chevron-right" size={24} color="gray" />
      </TouchableOpacity>

      <Divider className="my-3" />

      <FlatList
                showsVerticalScrollIndicator={false}
                data={products}
                keyExtractor={(product) => product.id.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between", gap: 16 , marginBottom: 16}}
                renderItem={({ item }) => (
                    <ProductCard item={item} width={(screenWidth.current - 56) / 2} />
                    )}
                    contentContainerStyle={{ gap: 16}}
            />

      <View className="absolute bottom-10 left-0 right-0 bg-white p-4 flex-row justify-between">
        <TouchableOpacity className="flex-1 bg-gray-200 py-3 rounded-lg flex-row items-center justify-center mr-2">
          <Text className="text-black font-semibold">Sorting</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 bg-blue-600 py-3 rounded-lg flex-row items-center justify-center">
          <Text className="text-white font-semibold">Follow</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SellerDetailsScreen;
