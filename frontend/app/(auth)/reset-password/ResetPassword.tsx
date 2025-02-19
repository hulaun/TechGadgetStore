import {useEffect, useState} from "react";
import {View, Text, TextInput, TouchableOpacity, Keyboard} from "react-native";
import Feather from '@expo/vector-icons/Feather';
import {useTheme} from "@react-navigation/native";
import {Link, useRouter} from "expo-router";


export default function ResetPassword() {
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const router = useRouter();

    function handleResetPress() {
        // Business Logic

        router.push("/(auth)/reset-password/VerifyCode");
    }

    return (
        <View className="flex-1 justify-between flex-col" style={{backgroundColor: theme.colors.background}}>
            <View/>

            <View className="justify-center px-8">
                <Text className="text-3xl font-bold mb-2" style={{color: theme.colors.text}}>Reset Password</Text>
                <Text className="text-gray-500 mb-12">Masukan Email/ No. Hp akun untuk mereset kata sandi Anda</Text>


                <View className="w-full mb-6 mt-8">
                    <Text className="mb-4" style={{color: theme.colors.text}}>Email or Phone</Text>
                    <TextInput
                        className="w-full p-4 rounded-lg"
                        style={{backgroundColor: theme.colors.card, color: theme.colors.text}}
                        placeholder="Masukan Alamat Email/ No Telepon Anda"
                        placeholderTextColor="#A1A1A1"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <TouchableOpacity
                    className={`w-full p-4 mt-8 rounded-lg`}
                    style={{backgroundColor: (email ? theme.colors.primary : theme.colors.card)}}
                    disabled={!email}
                    onPress={handleResetPress}
                >
                    <Text className="text-center font-semibold"
                          style={{color: theme.colors.background}}>Reset</Text>
                </TouchableOpacity>

            </View>

            <View/>

        </View>
    );
}
