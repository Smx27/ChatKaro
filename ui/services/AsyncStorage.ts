import AsyncStorage from '@react-native-async-storage/async-storage';

export const AsyncStorageService = {
    setItem: async (key: string, value: any) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error setting AsyncStorage item:', error);
        }
    },

    getItem: async <T>(key: string): Promise<T | null> => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value != null ? JSON.parse(value) as T : null;
        } catch (error) {
            console.error('Error getting AsyncStorage item:', error);
            return null;
        }
    }
};

export default AsyncStorageService;
