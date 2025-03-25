import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, ImageSourcePropType, Dimensions } from "react-native";
import { Avatar, Button, Divider } from "react-native-paper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ProductCard from "@/components/ui/ProductCard";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthProvider";
import { Product } from "@/types/ProductType";
import { Review } from "@/types/ReviewType";

const ProductDetailScreen: React.FC<{ navigation: any }> = () => {
  const sections = [
    { id: "header" },
    { id: "image" },
    { id: "info" },
    { id: "shop" },
    { id: "description" },
    { id: "reviews" },
    { id: "featured" },
    { id: "buttons" }
  ];
  const router = useRouter();
  const screenWidth = Dimensions.get("screen").width;
  
  const { id } = useLocalSearchParams();
  const { api } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product>({} as Product);
  const [shop, setShop] = useState<any>({});
  const [reviews, setReviews] = useState<Review[]>([])
  
  
  useEffect(()=>{
    const fetchCurrentProduct = async () => {
      try {
        const response = await api.get(`/product/${id}`);
        setCurrentProduct(response.data.data.product);
        setShop(response.data.data.product.shop);
        setReviews(response.data.data.comments);
      } catch (error) {
        console.log(error);
      }
    }
    const fetchProducts = async () => {
      try {
        const response = await api.get("/product");
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCurrentProduct();
    fetchProducts();
  },[])

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    const formatted = `${day}/${month}/${year}`;
    return formatted;
}


const renderItem = ({ item }: {item: any}) => {
  switch (item.id) {
    case "header":
      return (
        <View className="flex-row justify-between items-center my-3">
          <TouchableOpacity onPress={() => router.back()}>
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
      );
    case "image":
      return (
        <View className="rounded-lg flex justify-center items-center">
          <Image source={require("../../assets/images/headphones.png")} className="w-full aspect-1" resizeMode="contain" />
        </View>
      );
    case "info":
      return (
        <View className="mt-4">
          <Text className="text-xl font-bold">{currentProduct.name}</Text>
          <Text className="text-lg text-red-500 font-bold">{currentProduct.price}</Text>
          <View className="flex-row items-center mt-1">
            <MaterialIcons name="star" size={18} color="gold" />
            <Text className="text-base font-semibold ml-1">{currentProduct.averageRating}</Text>
          </View>
        </View>
      );
    case "shop":
      return (
        <TouchableOpacity className="flex-row items-center my-4" onPress={() => router.push("/(others)/seller_details_screen")}> 
          <Avatar.Image size={40} source={require("../../assets/images/shop.png")} />
          <View className="ml-3">
            <Text className="text-base font-bold">{shop.name}</Text>
            <Text className="text-sm text-gray-500">{shop.isOfficial?"Official Store ✅":""}</Text>
          </View>
        </TouchableOpacity>
      );
    case "description":
      return (
        <View className="my-4">
          <Text className="text-lg font-bold">Description Product</Text>
          <Text className="text-gray-500 mt-1">{currentProduct.description}</Text>
        </View>
      );
    case "reviews":
      return (
        <View className="my-4">
          <Text className="text-lg font-bold">Review 20</Text>
          {reviews.map((item) => (
            <View key={item._id} className="flex-row mt-4">
              <Avatar.Image size={40} source={require("../../assets/images/reviewers.jpeg")} />
              <View className="ml-3 flex-1">
                <Text className="text-sm font-bold">Peter Parker</Text>
                <Text className="text-xs text-gray-500">{formatDate(item.createdAt)}</Text>
                <Text className="text-gray-500 mt-1">{item.comment}</Text>
              </View>
            </View>
          ))}
          <Button mode="outlined" onPress={() => alert("See all reviews")} className="mt-3">See All Reviews</Button>
        </View>
      );
    case "featured":
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={products}
          keyExtractor={(product) => product._id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", gap: 16, marginBottom: 16 }}
          renderItem={({ item }) => <ProductCard item={item} width={(screenWidth - 56) / 2} />}
          contentContainerStyle={{ gap: 16 }}
        />
      );
    case "buttons":
      return (
        <View className="left-0 right-0 bg-white p-4 flex-row justify-between">
          <TouchableOpacity className="flex-1 bg-red-500 py-3 rounded-lg flex-row items-center justify-center mr-2">
            <Text className="text-white font-semibold">Added</Text>
            <MaterialIcons name="favorite" size={20} color="white" className="ml-2" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-blue-600 py-3 rounded-lg flex-row items-center justify-center">
            <Text className="text-white font-semibold">Add to Cart</Text>
          </TouchableOpacity>
        </View>
      );
    default:
      return null;
  }
};

return (
  <SafeAreaView className="flex-1 bg-white px-4">
    <FlatList
      data={sections}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  </SafeAreaView>
);
};

export default ProductDetailScreen;
