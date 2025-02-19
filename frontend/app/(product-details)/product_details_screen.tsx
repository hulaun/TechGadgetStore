import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Avatar, Button, Divider } from "react-native-paper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
interface Review {
  id: number;
  name: string;
  rating: number;
  time: string;
  review: string;
  avatar: any;
}

interface FeaturedProduct {
  id: number;
  name: string;
  price: string;
  image: any;
  rating: number;
  reviewCount: number;
  tersedia: number;
  description: string;
}

// Mock data
const reviews: Review[] = [
  {
    id: 1,
    name: "Yelena Belova",
    rating: 4,
    time: "2 Minggu yang lalu",
    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: require("../../assets/images/reviewers.jpeg"),
  },
  {
    id: 2,
    name: "Stephen Strange",
    rating: 3,
    time: "1 Bulan yang lalu",
    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: require("../../assets/images/reviewers.jpeg"),
  },
  {
    id: 3,
    name: "Peter Parker",
    rating: 5,
    time: "2 Bulan yang lalu",
    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: require("../../assets/images/reviewers.jpeg"),
  },
];

const featuredProducts: FeaturedProduct[] = [
  {
    id: 1,
    name: "TMA-2HD Wireless",
    price: "Rp 1.500.000",
    image: require("../../assets/images/headset.png"),
    description: "",
    rating: 4.6,
    reviewCount: 86,
    tersedia: 250,
  },
  {
    id: 2,
    name: "Power Drill",
    price: "Rp 1.500.000",
    description: "",
    image: require("../../assets/images/drill.png"),
    rating: 4.6,
    reviewCount: 86,
    tersedia: 250,
  },
];

const currentProduct: FeaturedProduct = {
  id: 1,
  name: "TMA-2HD Wireless",
  price: "Rp 1.500.000",
  description:
    "The speaker unit contains a diaphragm that is precision-grown from NAC Audio bio-cellulose, making it stiffer, lighter and stronger than regular PET speaker units, and allowing the sound-producing diaphragm to vibrate without the levels of distortion found in other speakers. ",
  image: require("../../assets/images/headset.png"),
  rating: 4.6,
  reviewCount: 86,
  tersedia: 250,
};

const ProductDetailScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <ScrollView className="flex-1 bg-white px-4 my-3">
      <View className="flex-row justify-between items-center my-3">
        <TouchableOpacity >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        <Text className="text-lg font-bold">Detail Product</Text>

        <View className="flex-row items-center">
          <TouchableOpacity>
            <MaterialIcons name="ios-share" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity className="ml-2">
            <MaterialIcons name="shopping-cart" size={24} color="black" />
            <View className="absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="rounded-lg overflow-hidden">
        <Image
          source={require("../../assets/images/headset.png")}
          className="w-full h-52"
          resizeMode="contain"
        />
      </View>

      <View className="mt-4">
        <View>
          <Text className="text-xl font-bold">{currentProduct.name}</Text>
          <Text className="text-lg text-red-500 font-bold">
            {currentProduct.price}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center mt-1">
            <MaterialIcons name="star" size={18} color="gold" />
            <Text className="text-base font-semibold ml-1">
              {currentProduct.rating}
            </Text>
            <Text className="text-base text-gray-500 ml-2">
              {currentProduct.reviewCount} Reviews
            </Text>
          </View>
          <View className="bg-green-100 px-3 py-1 rounded-full self-center">
            <Text className="text-green-600 font-semibold">
              Tersedia : {currentProduct.tersedia}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row items-center my-4">
        <Avatar.Image
          size={40}
          source={require("../../assets/images/shop.png")}
        />
        <View className="ml-3">
          <Text className="text-base font-bold">Shop Larson Electronic</Text>
          <Text className="text-sm text-gray-500">Official Store ✅</Text>
        </View>
      </View>

      <Divider />

      <View className="my-4">
        <Text className="text-lg font-bold">Description Product</Text>
        <Text className="text-gray-500 mt-1">{currentProduct.description}</Text>
      </View>

      <Divider />

      <View className="my-4">
        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-lg font-bold">
            Review ({currentProduct.reviewCount})
          </Text>
          <View className="flex-row mr-5">
            <MaterialIcons name="star" size={18} color="gold" />
            <Text className="text-base font-semibold ml-1">
              {currentProduct.rating}
            </Text>
          </View>
        </View>
        {reviews.map((item) => (
          <View key={item.id} className="flex-row mt-4">
            <Avatar.Image size={40} source={item.avatar} />
            <View className="ml-3 flex-1">
              <Text className="text-sm font-bold">{item.name}</Text>
              <Text className="text-xs text-gray-500">{item.time}</Text>
              <View className="flex-row mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <MaterialIcons
                    key={i}
                    name="star"
                    size={16}
                    color={i < item.rating ? "gold" : "lightgray"}
                  />
                ))}
              </View>
              <Text className="text-gray-500 mt-1">{item.review}</Text>
            </View>
          </View>
        ))}
      </View>

      <Button
        mode="outlined"
        onPress={() => alert("See all reviews")}
        className="mt-3"
      >
        See All Reviews
      </Button>

      <Divider />

      {/* Featured Products */}
      <View className="my-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-bold">Featured Product</Text>
          <TouchableOpacity>
            <Text className="text-blue-500 font-semibold">See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row"
        >
          {featuredProducts.map((product) => (
            <View
              key={product.id}
              className="w-40 bg-white rounded-lg p-3 mr-4 shadow-md relative"
            >
              <View className="w-[130px] h-[130px] mx-auto">
                <Image
                  source={product.image}
                  className="w-full h-full rounded-md"
                  resizeMode="contain"
                />
              </View>

              <Text className="text-sm font-bold mt-2">{product.name}</Text>

              <Text className="text-red-500 font-bold text-base">
                {product.price}
              </Text>

              <View className="flex-row items-center mt-1">
                <MaterialIcons name="star" size={16} color="gold" />
                <Text className="text-sm font-semibold ml-1">
                  {product.rating}
                </Text>
                <Text className="text-sm text-gray-500 ml-2">
                  {product.reviewCount} Reviews
                </Text>
                <TouchableOpacity>
                  <MaterialIcons name="more-vert" size={18} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View className="left-0 right-0 bg-white p-4 flex-row justify-between">
        <TouchableOpacity className="flex-1 bg-red-500 py-3 rounded-lg flex-row items-center justify-center mr-2">
          <Text className="text-white font-semibold">Added</Text>
          <MaterialIcons
            name="favorite"
            size={20}
            color="white"
            className="ml-2"
          />
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 bg-blue-600 py-3 rounded-lg flex-row items-center justify-center">
          <Text className="text-white font-semibold">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;
