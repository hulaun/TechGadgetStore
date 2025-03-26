import { OptionsIcon, StarIcon, BookmarkIcon } from '@/constants/Icons'
import { useTheme } from '@react-navigation/native';
import { router, useRouter } from 'expo-router'
import React from 'react'
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native'

export default function ProductCard({ item, width }: { width: number, item: { _id: string, name: string, price: string, image: ImageSourcePropType, averageRating: number } }) {
  const router = useRouter();
  const theme = useTheme();
  return (
    <TouchableOpacity
      className={`bg-white p-4 rounded-lg shadow-sm`}
      onPress={() => { router.push(`/(others)/product_details_screen?id=${item._id}`) }}
      style={{
        width: Math.round(width),
        backgroundColor: theme.colors.background,
      }}>
      <View className="rounded-lg flex justify-center items-center">
        <Image
          // source={typeof item.image === "string" ? { uri: item.image } : item.image} 
          source={require("../../assets/images/headphones.png")}
          className=" w-3/4 rounded-lg"
          resizeMode="contain"
        />
      </View>
      <Text className="font-semibold" style={{ color: theme.colors.text }}>{item.name}</Text>
      <Text className="text-red-500 font-semibold">${item.price}</Text>
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-1">
          <StarIcon />
          <BookmarkIcon />
          <Text className="text-xs text-gray-500 font-bold">{item.averageRating}</Text>
        </View>
        <OptionsIcon />
      </View>
    </TouchableOpacity>
  )
}
