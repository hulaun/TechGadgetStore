import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { useTheme } from "@react-navigation/native";
import { Link } from "expo-router";

export default function LoginScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <View className="flex-1 justify-between flex-col" style={{ backgroundColor: theme.colors.background }}>

      <View />

      <View className="justify-center px-8">
        <Text className="text-3xl font-bold mb-2" style={{ color: theme.colors.text }}>Welcome back to</Text>
        <Text className="text-3xl font-bold mb-8" style={{ color: theme.colors.text }}>Mega Mall</Text>
        <Text className="text-gray-500 mb-12">Silahkan masukan data untuk login</Text>

        <View className="w-full mb-6 mt-8">
          <Text className="mb-4" style={{ color: theme.colors.text }}>Email or Phone</Text>
          <TextInput
            className="w-full p-4 rounded-lg"
            style={{ backgroundColor: theme.colors.card, color: theme.colors.text }}
            placeholder="Masukan Alamat Email/ No Telepon Anda"
            placeholderTextColor="#A1A1A1"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View className="w-full mb-6">
          <Text className=" mb-4" style={{ color: theme.colors.text }}>Password</Text>
          <View className="w-full flex-row items-center rounded-lg p-4" style={{ backgroundColor: theme.colors.card }}>
            <TextInput
              className="flex-1"
              style={{ color: theme.colors.text }}
              placeholder="Masukan Kata Sandi Akun"
              placeholderTextColor="#A1A1A1"
              secureTextEntry={secureTextEntry}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
              <View>
                <Feather name={secureTextEntry ? 'eye' : 'eye-off'} size={24} color={theme.colors.text} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          className={`w-full p-4 mt-8 rounded-lg`}
          style={{ backgroundColor: (email && password ? theme.colors.primary : theme.colors.card) }}
          disabled={!email || !password}
        >
          <Text className="text-center font-semibold" style={{ color: theme.colors.background }}>Sign In</Text>
        </TouchableOpacity>

      </View>

      {!isKeyboardVisible ? (
        <View className="mb-10 w-full flex-row px-8 justify-between">
          <TouchableOpacity>
            <Link href={'/reset-password/ResetPassword'} style={{ color: theme.colors.text }}>Forgot Password</Link>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ color: theme.colors.primary }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      ) : <View />}

    </View>
  );
}
