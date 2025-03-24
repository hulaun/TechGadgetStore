import { MutationFunction, useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useAuth } from '@/context/AuthProvider';

const apiUrl = process.env.EXPO_PUBLIC_API_URL

export interface LoginParams {
    email: string;
    password: string;
}

interface LoginResponse {
    message: string;
    token: string;
    role: string;
}

const loginMutationFn = async ({ email, password }: LoginParams): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${apiUrl}/auth/login`, { email, password });
    return response.data;
};

const useLogin = () => {
    const queryClient = useQueryClient();
    const { setIsLogged, setUser, setLoading } = useAuth();

    const mutationOptions: UseMutationOptions<LoginResponse, Error, LoginParams> = {
        mutationFn: loginMutationFn,
        onSuccess: async (data: LoginResponse) => {
            await AsyncStorage.setItem('token', data.token);
            setIsLogged(true);
            setUser({ email: '', role: data.role });
            await queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: () => {
            setIsLogged(false);
            setUser(null);
        },
        onSettled: () => {
            setLoading(false);
        },
    };

    return useMutation<LoginResponse, Error, LoginParams>(mutationOptions);
};

export default useLogin;