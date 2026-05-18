import api from '@services/api';
import type { GeneroValue } from '@services/authService';

export interface UserProfile {
    id_usuario: number;
    nome: string;
    email: string;
    genero: GeneroValue | null;
    bio?: string | null;
    is_patient: boolean;
    data_criacao: string;
}

export interface UserStatus {
    status: 'Estável' | 'Atenção' | 'Crítico';
    consistencia_rotina: number;
    dias_estabilidade: number;
}

export interface UpdateProfilePayload {
    nome?: string;
    genero?: GeneroValue;
    bio?: string;
}

// Busca o perfil completo do usuário logado
export const getProfile = async (): Promise<UserProfile> => {
    const { data } = await api.get<UserProfile>('/v1/users/me');
    return data;
};

// Atualiza dados do perfil (nome, gênero, bio)
export const updateProfile = async (payload: UpdateProfilePayload): Promise<{ message: string }> => {
    const { data } = await api.patch<{ message: string }>('/v1/users/me', payload);
    return data;
};

// Busca o "status atual" do usuário (Estável / Atenção / Crítico)
export const getStatus = async (): Promise<UserStatus> => {
    const { data } = await api.get<UserStatus>('/v1/users/me/status');
    return data;
};

// Salva o FCM token (push notifications) no usuário logado
export const updateFcmToken = async (fcm_token: string): Promise<{ message: string }> => {
    const { data } = await api.patch<{ message: string }>('/v1/users/fcm-token', { fcm_token });
    return data;
};

// Busca um usuário por email (usado pra adicionar contato)
export const searchUser = async (email: string): Promise<UserProfile | null> => {
    try {
        const { data } = await api.get<UserProfile>('/v1/users/search', { params: { email } });
        return data;
    } catch (error: any) {
        if (error.response?.status === 404) return null;
        throw error;
    }
};