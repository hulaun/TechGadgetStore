import {useEffect, useState} from "react";
import {Alert, Text, TouchableOpacity, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {OtpInput} from "react-native-otp-entry";
import {useRouter} from "expo-router";
import {Controller, useForm} from "react-hook-form";
import KeyboardDismissWrapper from "@/components/ui/KeyboardDismissWrapper";
import {Ionicons} from "@expo/vector-icons";

export default function VerifyCode() {
    const OTP_LENGTH = 4;
    const OTP_EXPIRATION_TTL = 600
    const theme = useTheme();
    const {control, handleSubmit, formState: {errors}, watch} = useForm();
    const otp = watch("otp");
    const [disabled, setDisabled] = useState(true);
    const [countdown, setCountdown] = useState(OTP_EXPIRATION_TTL);
    const router = useRouter();

    function handleContinuePress() {
        // Business Logic

        router.replace("/(auth)/sign-up/CreatePassword");
    }

    useEffect(() => {
        setDisabled(!otp || otp.length < OTP_LENGTH);
    }, [otp]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <KeyboardDismissWrapper className="flex-1 justify-between flex-col"
                                style={{backgroundColor: theme.colors.background}}>
            <TouchableOpacity className="p-4" onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
            </TouchableOpacity>

            <View className="justify-center px-8">
                <Text className="text-3xl font-bold mb-2" style={{color: theme.colors.text}}>Verify Code</Text>
                <Text className="text-gray-500 mb-12">
                    Kami telah mengirimkan kode verifikasi ke +628*******716{' '}
                    {/*<Pressable style={{alignSelf: 'baseline'}}>*/}
                    <Text
                        style={{color: theme.colors.primary}}
                        onPress={() => {
                            Alert.alert('Change Number Here.')
                        }}>
                        Wrong number?
                    </Text>
                    {/*</Pressable>*/}
                </Text>

                <View className="w-full mb-6 mt-8">
                    <View className="flex-row justify-between">
                        <Text className="mb-4" style={{color: theme.colors.text}}>Verification Code</Text>
                        <Text
                            className="mb-4"
                            style={{color: theme.colors.primary}}
                            onPress={() => {
                                Alert.alert('Trigger Resend')
                            }}>
                            Resend Code
                        </Text>
                    </View>
                    <Controller
                        control={control}
                        rules={{required: true, minLength: OTP_LENGTH, maxLength: OTP_LENGTH}}
                        render={({field: {onChange, value}}) => (
                            <OtpInput
                                numberOfDigits={OTP_LENGTH}
                                hideStick
                                onTextChange={onChange}
                                type={"numeric"}
                                theme={{
                                    containerStyle: {display: "flex"},
                                    pinCodeContainerStyle: {
                                        backgroundColor: theme.colors.card,
                                        borderColor: theme.colors.border,
                                        width: "20%"
                                    },
                                    pinCodeTextStyle: {color: theme.colors.text},
                                }}
                            />
                        )}
                        name="otp"
                    />
                    {errors.otp && <Text style={{color: 'red'}}>This is required.</Text>}
                    {/*// TODO: Change colour to secondary (gray)*/}
                    <View className="flex-row justify-between">
                        <Text className="mt-4" style={{color: theme.colors.text}}>Kirim kode ulang dalam</Text>
                        <Text className="mt-4" style={{color: theme.colors.text}}>{formatTime(countdown)}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    className={`w-full p-4 mt-8 rounded-lg ${!disabled ? 'bg-blue-500' : 'bg-gray-500'}`}
                    disabled={disabled}
                    onPress={handleContinuePress}
                >
                    <Text className="text-center font-semibold"
                          style={{color: theme.colors.background}}>Continue to Sign Up</Text>
                </TouchableOpacity>

            </View>

            <View/>

        </KeyboardDismissWrapper>
    );
}
