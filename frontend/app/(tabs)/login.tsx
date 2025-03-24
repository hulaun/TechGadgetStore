import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { useAuth } from '@/context/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
  const router = useRouter();
  const { isLogged, loading, handleLogout } = useAuth();

  useEffect(() => {
    if (!loading && !isLogged) {
      router.replace("/(auth)/LoginScreen");
    }
  }, [loading, isLogged, router]);

  if (loading) {
    return <Text>Loading</Text>; // Optionally, you can return a loading spinner here
  }

  if (!isLogged) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text>Account</Text>
      <TouchableOpacity onPress={handleLogout} className="mt-4 p-2 bg-red-500 rounded">
        <Text className="text-white">Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;