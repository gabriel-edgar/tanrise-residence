import AsyncStorage from "@react-native-async-storage/async-storage";

const storeStorage = async (key, value) => {
  await AsyncStorage.setItem(key, value)
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log("5store functionAS error: ", e);
      return false;
    });
};

const getStorage = async (key) => {
  const value = await AsyncStorage.getItem(key).catch((e) => {
    console.log("8get functionAS error: ", e);
  });
  if (value !== null) {
    console.log(value); // Output: 'Some value'
    return value;
  }
  return; // null maybe
};

export { storeStorage, getStorage };
