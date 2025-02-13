import { OptionsIcon, StarIcon } from '@/constants/Icons'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function ProductCard({item}: { item:{ id: string, name: string, price: string, image: string, rating: number, sold: number }}) {
  return (
    <TouchableOpacity className="bg-white p-4 rounded-lg shadow-sm">
        <Image source={{ uri: item.image }} className="w-full aspect-1 mb-2" />
        <Text className="font-semibold">{item.name}</Text>
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
