import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductDetailScreen from "../(product-details)/product_details_screen"
import SellerDetailsScreen from "../(seller-details)/seller_details_screen";

const Login = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
        <ProductDetailScreen></ProductDetailScreen>
        {/* <SellerDetailsScreen></SellerDetailsScreen> */}
    </SafeAreaView>
  )
}

export default Login