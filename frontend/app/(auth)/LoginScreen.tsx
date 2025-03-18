import {useEffect, useState} from "react";
import {
    Keyboard,
    KeyboardAvoidingView, Platform,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import Feather from '@expo/vector-icons/Feather';
import {useTheme} from "@react-navigation/native";
import {Link, router} from "expo-router";
import {Controller, useForm} from "react-hook-form";
import KeyboardDismissWrapper from "@/components/ui/KeyboardDismissWrapper";
import {Ionicons} from "@expo/vector-icons";

export default function LoginScreen() {
    const theme = useTheme();
    const {control, handleSubmit, formState: {errors}, watch} = useForm();
    const email = watch("email");
    const password = watch("password");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
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

    return (
        <KeyboardDismissWrapper className="flex-1 justify-between flex-col"
                                style={{backgroundColor: theme.colors.background}}>

            <TouchableOpacity className="p-4" onPress={() => router.push("/(tabs)")}>
                <Ionicons name="chevron-back" size={24} color={theme.colors.text}/>
            </TouchableOpacity>

            <View className="mb-4 justify-center px-8">
                <Text className="text-3xl font-bold mb-2" style={{color: theme.colors.text}}>Welcome back
                    to</Text>
                <Text className="text-3xl font-bold mb-8" style={{color: theme.colors.text}}>Mega Mall</Text>
                <Text className="text-gray-500 mb-12">Silahkan masukan data untuk login</Text>

                {/* Text input for Email*/}
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

                {/* Text input for Password*/}
                <View className="w-full mb-6">
                    <Text className=" mb-4" style={{color: theme.colors.text}}>Password</Text>
                    <View className="w-full flex-row items-center rounded-lg p-4"
                          style={{backgroundColor: theme.colors.card}}>
                        <Controller
                            control={control}
                            rules={{required: true}}
                            render={({field: {onChange, onBlur, value}}) => (
                                <TextInput
                                    className="flex-1"
                                    style={{color: theme.colors.text}}
                                    placeholder="Masukan Kata Sandi Akun"
                                    placeholderTextColor="#A1A1A1"
                                    secureTextEntry={secureTextEntry}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="password"
                        />
                        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                            <View>
                                <Feather name={secureTextEntry ? 'eye' : 'eye-off'} size={24}
                                         color={theme.colors.text}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {errors.password && <Text style={{color: 'red'}}>This is required.</Text>}
                </View>


                <TouchableOpacity
                    className={`w-full p-4 mt-8 rounded-lg`}
                    style={{backgroundColor: (!errors.email && !errors.password && email && password ? theme.colors.primary : theme.colors.card)}}
                    // onPress={handleSubmit(onSubmit)}
                    disabled={!!errors.email || !!errors.password || !email || !password}
                >
                    <Text className="text-center font-semibold" style={{color: theme.colors.background}}>Sign
                        In</Text>
                </TouchableOpacity>

            </View>

            {!isKeyboardVisible ? (
                <View className="mb-10 w-full flex-row px-8 justify-between">
                    <TouchableOpacity>
                        <Link href={'/reset-password/ResetPassword'} style={{color: theme.colors.text}}>Forgot
                            Password</Link>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{color: theme.colors.primary}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            ) : <View/>}


        </KeyboardDismissWrapper>
    );
}
