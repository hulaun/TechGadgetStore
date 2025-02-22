import { OptionsIcon, StarIcon } from '@/constants/Icons'
import { useTheme } from '@react-navigation/native';
import { router, useRouter } from 'expo-router'
import React from 'react'
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native'

export default function ProductCard({item, width}: {width: number ,item:{ id: string, name: string, price: string, image: ImageSourcePropType, rating: number, sold: number }}) {
  const router = useRouter();
  const theme = useTheme();
  return (
    <TouchableOpacity 
      className={`bg-white p-4 rounded-lg shadow-sm`} 
      onPress={()=>{router.push("/(others)/product_details_screen")}}
      style = {{
        width: Math.round(width),
        backgroundColor: theme.colors.background,}}>
        <View className="rounded-lg flex justify-center items-center">
          <Image 
            source={typeof item.image === "string" ? { uri: item.image } : item.image} 
            className=" w-3/4 rounded-lg"
            resizeMode="contain"
          />
        </View>
        <Text className="font-semibold" style={{color: theme.colors.text}}>{item.name}</Text>
        <Text className="text-red-500 font-semibold">{item.price}</Text>
        <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-1">
                <StarIcon/>
                <Text className="text-xs text-gray-500 font-bold">{item.rating}</Text>
            </View>
            <Text className="text-xs text-gray-500 font-bold">{item.sold} Sold</Text>
            <OptionsIcon/>
        </View>
    </TouchableOpacity>
  )
}
