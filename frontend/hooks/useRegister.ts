import axios from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

interface RegisterParams {
    email: string;
    password: string;
}

interface RegisterResponse {
    message: string;
    user: {
        email: string;
        role: string;
    };
}

const registerMutationFn = async ({ email, password }: RegisterParams): Promise<RegisterResponse> => {
    const response = await axios.post<RegisterResponse>(`${apiUrl}/auth/register`, { email, password });
    return response.data;
};

const useRegister = () => {
    const mutationOptions: UseMutationOptions<RegisterResponse, Error, RegisterParams> = {
        mutationFn: registerMutationFn,
        onSuccess: (data: RegisterResponse) => {
            console.log('User created successfully:', data.user);
            alert('User created successfully');
        },
        onError: (error) => {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                alert('User already exists');
            } else {
                alert('Unexpected server error');
            }
        },
    };

    return useMutation<RegisterResponse, Error, RegisterParams>(mutationOptions);
};

export default useRegister;