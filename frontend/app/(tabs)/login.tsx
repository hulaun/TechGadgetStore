import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { useAuth } from '@/context/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileScreen from '../(others)/user_profile';

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
    <ProfileScreen />
  );
};

export default Login;