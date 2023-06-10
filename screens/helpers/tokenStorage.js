import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem("token", token);
    console.log("Token saved!");
  } catch (error) {
    console.log("Error storing token: ", error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log("Token retrieved!", token);
    return token;
  } catch (error) {
    console.log("Error getting token: ", error);
  }
};
