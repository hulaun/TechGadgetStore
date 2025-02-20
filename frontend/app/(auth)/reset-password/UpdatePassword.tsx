import {useEffect, useState} from "react";
import {View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert} from "react-native";
import Feather from '@expo/vector-icons/Feather';
import {useTheme} from "@react-navigation/native";
import {useRouter} from "expo-router";
import {Controller, useForm} from "react-hook-form";

export default function UpdatePassword() {
    const theme = useTheme();
    const {control, handleSubmit, formState: {errors}, watch} = useForm();
    const router = useRouter();
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        setDisabled(!password || password.length < 6 || password !== confirmPassword);
    }, [password, confirmPassword]);

    function handleUpdatePress() {
        // Business Logic
        Alert.alert('Success', 'Imaginary password updated successfully');
        router.back();
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 justify-between flex-col" style={{backgroundColor: theme.colors.background}}>

                <View/>

                <View className="justify-center px-8">
                    <Text className="text-3xl font-bold mb-2" style={{color: theme.colors.text}}>Update Password</Text>
                    <Text className="text-gray-500 mb-12">
                        Lengkapi data terakhir berikut untuk masuk ke aplikasi Mega Mall
                    </Text>

                    <View className="w-full mb-6">
                        <Text className=" mb-4" style={{color: theme.colors.text}}>Password</Text>
                        <View className="w-full flex-row items-center rounded-lg p-4"
                              style={{backgroundColor: theme.colors.card}}>
                            <Controller
                                control={control}
                                rules={{required: true, minLength: 6}}
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
                        {errors.password &&
                            <Text style={{color: 'red'}}>Password must be at least 6 characters long.</Text>}
                    </View>

                    <View className="w-full mb-6">
                        <Text className=" mb-4" style={{color: theme.colors.text}}>Confirm Password</Text>
                        <View className="w-full flex-row items-center rounded-lg p-4"
                              style={{backgroundColor: theme.colors.card}}>
                            <Controller
                                control={control}
                                rules={{required: true, minLength: 6}}
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
                                name="confirmPassword"
                            />
                            <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                                <View>
                                    <Feather name={secureTextEntry ? 'eye' : 'eye-off'} size={24}
                                             color={theme.colors.text}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {errors.confirmPassword &&
                            <Text style={{color: 'red'}}>Password must be at least 6 characters long.</Text>}
                    </View>

                    <TouchableOpacity
                        className={`w-full p-4 mt-8 rounded-lg`}
                        style={{backgroundColor: (!disabled ? theme.colors.primary : theme.colors.card)}}
                        disabled={disabled}
                        onPress={handleSubmit(handleUpdatePress)}
                    >
                        <Text className="text-center font-semibold" style={{color: theme.colors.background}}>Update
                            Password</Text>
                    </TouchableOpacity>

                </View>

                <View/>

            </View>
        </TouchableWithoutFeedback>
    );
}