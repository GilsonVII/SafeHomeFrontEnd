import api from '@services/api';

export type GeneroValue = 'MASCULINO' | 'FEMININO' | 'OUTRO' | 'NAO_INFORMADO';

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    genero: GeneroValue;
    is_patient: boolean;
}

export interface RegisterResponse {
    message: string;
    userId: number;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    token: string;
    userId: number;
    name: string;
}

export interface ResetPasswordPayload {
    email: string;
    new_password: string;
}

// Cria uma nova conta na API
export const register = async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const { data } = await api.post<RegisterResponse>('/v1/auth/register', payload);
    return data;
};

// Faz login e retorna o token JWT que deve ser salvo no SecureStore
export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/v1/auth/login', payload);
    return data;
};

// Reseta a senha do usuário pelo email 
export const resetPassword = async (payload: ResetPasswordPayload): Promise<{ message: string }> => {
    const { data } = await api.patch<{ message: string }>('/v1/auth/password/reset', payload);
    return data;
};