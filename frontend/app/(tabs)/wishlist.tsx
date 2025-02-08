import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

const Wishlist = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Wishlist</Text>
        <Link href="/order">Go to Order</Link>
        <Link href="/sign_in">Go to SignIn</Link>
      </View>
    </SafeAreaView>
  )
}

export default Wishlist