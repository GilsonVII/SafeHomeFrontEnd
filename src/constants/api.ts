import { Platform } from 'react-native';

const getApiUrl = (): string => {
    if (!__DEV__) {
        
        return 'https://sua-api-em-producao.com';
    }

    if (Platform.OS === 'android') {
        return 'http://10.0.2.2:3000';
    }
    if (Platform.OS === 'ios') {
        return 'http://127.0.0.1:3000';
    }
    // Web
    return 'http://localhost:3000';
};

export const API_CONFIG = {
    BASE_URL: getApiUrl(),
    TIMEOUT: 15000,
} as const;