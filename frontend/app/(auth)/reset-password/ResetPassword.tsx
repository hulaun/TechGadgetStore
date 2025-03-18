import {useEffect, useState} from "react";
import {Keyboard, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {useRouter} from "expo-router";
import {Controller, useForm} from "react-hook-form";
import KeyboardDismissWrapper from "@/components/ui/KeyboardDismissWrapper";
import {Ionicons} from "@expo/vector-icons";


export default function ResetPassword() {
    const theme = useTheme();
    const {control, handleSubmit, formState: {errors}, watch} = useForm();
    const router = useRouter();
    const email = watch("email");
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    function handleResetPress() {
        // Business Logic

        router.replace("/(auth)/reset-password/VerifyCode");
    }

    return (
        <KeyboardDismissWrapper className="flex-1 justify-between flex-col" style={{backgroundColor: theme.colors.background}}>
            <TouchableOpacity className="p-4" onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
            </TouchableOpacity>

            <View className="mb-4 justify-center px-8">
                <Text className="text-3xl font-bold mb-2" style={{color: theme.colors.text}}>Reset Password</Text>
                <Text className="text-gray-500 mb-12">Masukan Email/ No. Hp akun untuk mereset kata sandi
                    Anda</Text>


                <View className="w-full mb-6 mt-8">
                    <Text className="mb-4" style={{color: theme.colors.text}}>Email or Phone</Text>
                    <Controller
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                className="w-full p-4 rounded-lg"
                                style={{backgroundColor: theme.colors.card, color: theme.colors.text}}
                                placeholder="Masukan Alamat Email/ No Telepon Anda"
                                placeholderTextColor="#A1A1A1"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="email"
                    />
                    {errors.email && <Text style={{color: 'red'}}>This is required.</Text>}
                </View>

                <TouchableOpacity
                    className={`w-full p-4 mt-8 rounded-lg`}
                    style={{backgroundColor: (!errors.email && email ? theme.colors.primary : theme.colors.card)}}
                    disabled={!!errors.email || !email}
                    onPress={handleSubmit(handleResetPress)}
                >
                    <Text className="text-center font-semibold"
                          style={{color: theme.colors.background}}>Reset</Text>
                </TouchableOpacity>

            </View>

            {
                isKeyboardVisible ? null : <View/>
            }

        </KeyboardDismissWrapper>
    );
}
