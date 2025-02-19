import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Avatar, Divider } from "react-native-paper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

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

const products = [
  {
    id: 1,
    name: "TMA-2 HD Wireless",
    price: "Rp. 1.500.000",
    image: require("../../assets/images/headset.png"),
    rating: 4.6,
    reviewCount: 86,
  },
  {
    id: 2,
    name: "Power Drill",
    price: "Rp. 1.500.000",
    image: require("../../assets/images/drill.png"),
    rating: 4.6,
    reviewCount: 86,
  },
  {
    id: 3,
    name: "TMA-2 HD Wireless",
    price: "Rp. 1.500.000",
    image: require("../../assets/images/headset.png"),
    rating: 4.6,
    reviewCount: 86,
  },
  {
    id: 4,
    name: "Power Drill",
    price: "Rp. 1.500.000",
    image: require("../../assets/images/drill.png"),
    rating: 4.6,
    reviewCount: 86,
  },
  {
    id: 5,
    name: "TMA-2 HD Wireless",
    price: "Rp. 1.500.000",
    image: require("../../assets/images/headset.png"),
    rating: 4.6,
    reviewCount: 86,
  },
  {
    id: 6,
    name: "Power Drill",
    price: "Rp. 1.500.000",
    image: require("../../assets/images/drill.png"),
    rating: 4.6,
    reviewCount: 86,
  },
];

const SellerDetailsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <View className="w-[48%] bg-white rounded-lg p-3 mb-4 shadow-md relative">
            <View className="w-full h-36">
              <Image
                source={item.image}
                className="w-full h-full rounded-md"
                resizeMode="contain"
              />
            </View>

            <Text className="text-sm font-bold mt-2">{item.name}</Text>

            <Text className="text-red-500 font-bold text-base">
              {item.price}
            </Text>

            <View className="flex-row items-center mt-1">
              <MaterialIcons name="star" size={16} color="gold" />
              <Text className="text-sm font-semibold ml-1">{item.rating}</Text>
              <Text className="text-sm text-gray-500 ml-2">
                {item.reviewCount} Reviews
              </Text>
            </View>

            <TouchableOpacity className="absolute bottom-3 right-2">
              <MaterialIcons name="more-vert" size={18} color="gray" />
            </TouchableOpacity>
          </View>
        )}
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
