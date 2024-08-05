import AsyncStorage from '@react-native-async-storage/async-storage';

export async function AuthStorage() {
  const token = await AsyncStorage.getItem('userToken');
  const user = await AsyncStorage.getItem('userData');
  return {
    token,
    user: JSON.parse(user),
  };
}

export async function setAuthStorage(response) {
  await AsyncStorage.setItem('userToken', response.data.token);
  await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
}

export async function resetAuthStorage() {
  await AsyncStorage.removeItem('userData');
  await AsyncStorage.removeItem('userToken');
}
