import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setToken(athleteId) {
  try {
    await AsyncStorage.setItem('@pete:token', athleteId.toString());
  } catch (error) {
    console.error(error);
  }
}

export async function getToken(athleteId) {
  try {
    const token = await AsyncStorage.getItem('@pete:token');
    if (token) {
      return parseInt(token, 10);
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}
