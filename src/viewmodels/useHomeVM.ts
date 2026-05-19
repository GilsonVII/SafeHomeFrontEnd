import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as userService from '@services/userService';
import type { UserStatus } from '@services/userService';
import { useAppStore } from '@store/useAppStore';
import type { RootStackParamList } from '@navigation/AppNavigator';

type Navigation = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function useHomeVM() {
    const navigation = useNavigation<Navigation>();

    // Dados globais do usuário logado
    const user = useAppStore((s) => s.user);
    const logoutStore = useAppStore((s) => s.logout);

    // Estados locais da tela
    const [status, setStatus] = useState<UserStatus | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [atualizando, setAtualizando] = useState(false); 

    // Busca o status do usuário na API.
    const carregarStatus = useCallback(async (modoAtualizacao = false) => {
        if (modoAtualizacao) {
            setAtualizando(true);
        } else {
            setCarregando(true);
        }

        try {
            const data = await userService.getStatus();
            setStatus(data);
        } catch (error: any) {
            console.warn('[useHomeVM] Falha ao carregar status:', error?.message);
            // Não trava a tela — só não mostra o status
            setStatus(null);
        } finally {
            setCarregando(false);
            setAtualizando(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarStatus();
        }, [carregarStatus])
    );

    // Saudação baseada na hora do dia.
    const getSaudacao = (): string => {
        const hora = new Date().getHours();
        if (hora < 12) return 'Bom dia';
        if (hora < 18) return 'Boa tarde';
        return 'Boa noite';
    };

}