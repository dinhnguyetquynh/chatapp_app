import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorageService {
  constructor() {}

  async getValue(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? value : null;
    } catch (error) {
      console.error('Error getting value from AsyncStorage', error);
      return null;
    }
  }

  async setValue(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error setting value in AsyncStorage', error);
    }
  }

  async deleteValue(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error deleting value from AsyncStorage', error);
    }
  }

  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing AsyncStorage', error);
    }
  }
}

const localStorageService = new LocalStorageService();
export default localStorageService;
