import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

const Login = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace("/(auth)/LoginScreen");
  },[router])

  return null
}

export default Login