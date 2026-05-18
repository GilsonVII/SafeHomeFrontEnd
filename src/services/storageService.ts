import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@constants/storage';

// AUTH (SecureStore — criptografado) 

export const saveAuthToken = async (token: string): Promise<void> => {

    await SecureStore.setItemAsync(STORAGE_KEYS.SECURE.AUTH_TOKEN, token);
};

export const getAuthToken = async (): Promise<string | null> => {

    return SecureStore.getItemAsync(STORAGE_KEYS.SECURE.AUTH_TOKEN);
};

export const saveUserId = async (userId: number): Promise<void> => {

    await SecureStore.setItemAsync(STORAGE_KEYS.SECURE.USER_ID, String(userId));
};

export const getUserId = async (): Promise<number | null> => {

    const id = await SecureStore.getItemAsync(STORAGE_KEYS.SECURE.USER_ID);

    return id ? parseInt(id, 10) : null;
};

export const clearAuth = async (): Promise<void> => {

    await SecureStore.deleteItemAsync(STORAGE_KEYS.SECURE.AUTH_TOKEN);
    
    await SecureStore.deleteItemAsync(STORAGE_KEYS.SECURE.USER_ID);
};

// PREFERÊNCIAS (AsyncStorage) 

export const setPreference = async (key: string, value: string): Promise<void> => {

    await AsyncStorage.setItem(key, value);
};

export const getPreference = async (key: string): Promise<string | null> => {

    return AsyncStorage.getItem(key);
};

export const setBoolPreference = async (key: string, value: boolean): Promise<void> => {

    await AsyncStorage.setItem(key, value ? 'true' : 'false');
};

export const getBoolPreference = async (key: string, defaultValue: boolean = false): Promise<boolean> => {

    const v = await AsyncStorage.getItem(key);

    if (v === null) return defaultValue;
    
    return v === 'true';
};
