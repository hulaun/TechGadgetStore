import {Stack} from 'expo-router';

import {useColorScheme} from '@/hooks/useColorScheme';
import {StatusBar} from 'expo-status-bar';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <>
            <Stack>
                <Stack.Screen
                    name="LoginScreen"
                    options={{
                        title: "Login",
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="reset-password/ResetPassword"
                    options={{
                        title: "Forgot Password",
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="reset-password/VerifyCode"
                    options={{
                        title: "Verity Code",
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="reset-password/UpdatePassword"
                    options={{
                        title: "Update Password",
                        headerShown: false,
                    }}
                />
            </Stack>
            <StatusBar backgroundColor="#161622" style="light"/>
        </>
    );
}
