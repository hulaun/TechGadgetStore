import React from 'react'
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context'
import LoginScreen from "@/app/(auth)/LoginScreen";

const Login = () => {
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView className="flex-1" style={{paddingBottom: insets.bottom}}>
            <LoginScreen/>
        </SafeAreaView>
    )
}

export default Login