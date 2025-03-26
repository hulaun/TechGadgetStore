import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, Alert } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import KeyboardDismissWrapper from "@/components/ui/KeyboardDismissWrapper";
import { Ionicons } from "@expo/vector-icons";
import useRegister from "@/hooks/useRegister";

export default function CreateAccount() {
    const theme = useTheme();
    const { control, handleSubmit, formState: { errors }, watch } = useForm();
    const router = useRouter();
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");
    const email = watch("email");
    const [newPasswordSecureTextEntry, setNewPasswordSecureTextEntry] = useState(true);
    const [confirmPasswordSecureTextEntry, setConfirmPasswordSecureTextEntry] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const registerMutation = useRegister();

    useEffect(() => {
        setDisabled(!password || password.length < 6 || password !== confirmPassword || !email);
    }, [password, confirmPassword, email]);

    const onSubmit = (data) => {
        registerMutation.mutate(data);
    };

    useEffect(() => {
        if (registerMutation.isSuccess) {
            Alert.alert('Success', 'User created successfully');
            router.replace("/(tabs)");
        }
        if (registerMutation.isError) {
            if (registerMutation.error.response?.status === 400) {
                Alert.alert('Error', 'User already exists');
            } else {
                Alert.alert('Error', 'Unexpected server error');
            }
        }
    }, [registerMutation.isSuccess, registerMutation.isError]);

    return (
        <KeyboardDismissWrapper className="flex-1 justify-between flex-col"
                                style={{ backgroundColor: theme.colors.background }}>

            <TouchableOpacity className="p-4" onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
            </TouchableOpacity>

            <View className="justify-center px-8">
                <Text className="text-3xl font-bold mb-2" style={{ color: theme.colors.text }}>Profile & Password</Text>
                <Text className="text-gray-500 mb-12">
                    Lengkapi data terakhir berikut untuk masuk ke aplikasi Mega Mall
                </Text>

                <View className="w-full mb-6">
                    <Text className="mb-4" style={{ color: theme.colors.text }}>Username</Text>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="w-full p-4 rounded-l mb-4"
                                style={{ backgroundColor: theme.colors.card, color: theme.colors.text }}
                                placeholder="Enter your username"
                                placeholderTextColor="#A1A1A1"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="email"
                    />
                    {errors.email && <Text style={{ color: 'red' }}>This is required.</Text>}

                    <Text className=" mb-4" style={{ color: theme.colors.text }}>Password</Text>
                    <View className="w-full flex-row items-center rounded-lg p-4"
                          style={{ backgroundColor: theme.colors.card }}>
                        <Controller
                            control={control}
                            rules={{ required: true, minLength: 6 }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="flex-1"
                                    style={{ color: theme.colors.text }}
                                    placeholder="Masukan Kata Sandi Akun"
                                    placeholderTextColor="#A1A1A1"
                                    secureTextEntry={newPasswordSecureTextEntry}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="password"
                        />
                        <TouchableOpacity onPress={() => setNewPasswordSecureTextEntry(!newPasswordSecureTextEntry)}>
                            <View>
                                <Feather name={newPasswordSecureTextEntry ? 'eye' : 'eye-off'} size={24}
                                         color={theme.colors.text} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {errors.password &&
                        <Text style={{ color: 'red' }}>Password must be at least 6 characters long.</Text>}
                </View>

                <View className="w-full mb-6">
                    <Text className=" mb-4" style={{ color: theme.colors.text }}>Confirm Password</Text>
                    <View className="w-full flex-row items-center rounded-lg p-4"
                          style={{ backgroundColor: theme.colors.card }}>
                        <Controller
                            control={control}
                            rules={{ required: true, minLength: 6 }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="flex-1"
                                    style={{ color: theme.colors.text }}
                                    placeholder="Masukan Kata Sandi Akun"
                                    placeholderTextColor="#A1A1A1"
                                    secureTextEntry={confirmPasswordSecureTextEntry}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="confirmPassword"
                        />
                        <TouchableOpacity
                            onPress={() => setConfirmPasswordSecureTextEntry(!confirmPasswordSecureTextEntry)}>
                            <View>
                                <Feather name={confirmPasswordSecureTextEntry ? 'eye' : 'eye-off'} size={24}
                                         color={theme.colors.text} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {errors.confirmPassword &&
                        <Text style={{ color: 'red' }}>Password must be at least 6 characters long.</Text>}
                </View>

                <TouchableOpacity
                    className={`w-full p-4 mt-8 rounded-lg ${!disabled ? 'bg-blue-500' : 'bg-gray-500'}`}
                    disabled={disabled}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text className="text-center font-semibold" style={{ color: theme.colors.background }}>Confirm</Text>
                </TouchableOpacity>

            </View>

            <View />

        </KeyboardDismissWrapper>
    );
}