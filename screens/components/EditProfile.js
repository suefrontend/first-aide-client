import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { FontFamily, ThemeColors } from "../../theme";
import { authGet, authPost } from "../helpers/authenticatedCalls";

export default function EditProfile({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const nameTypeHandler = (text) => {
    setName(text);
  };
  const emailTypeHandler = (text) => {
    setEmail(text);
  };
  const cityTypeHandler = (text) => {
    setCity(text);
  };

  useEffect(() => {
    const getCurrentProfile = async () => {
      try {
        const response = await authGet("/users");
        const data = response.data;
        setName(data.username);
        setEmail(data.email);
        setCity(data.city);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentProfile();
  }, []);

  const submitHandler = async () => {
    try {
      const response = await authPost("/users", {
        username: name,
        email: email,
        city: city,
      });
      const data = response.data;
      console.log("Edited profile:", data);
      alert("Profile edited successfully");
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <LinearGradient
        colors={["#FE0944", "#FEAE96"]}
        style={styles.linearGradient}
      >
        <View style={styles.wrapper}>
          <View style={styles.contentBox}>
            <Text
              className="text-3xl text-white mt-3 capitalize"
              style={styles.heading}
            >
              Edit Profile
            </Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.wrapperSecond}>
            <View style={styles.bookmarkInfo}>
              <View style={styles.innerborder}>
                <View style={[styles.textBox]}>
                  <Text
                    className="text-lg text-center leading-8"
                    style={styles.text}
                  >
                    Your Name
                  </Text>
                  <TextInput
                    className="p-2 mb-3 rounded-md border-2 border-white text-lg"
                    style={styles.input}
                    placeholder={name}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="white"
                    onChangeText={(text) => nameTypeHandler(text)}
                  />
                  <Text
                    className="text-lg text-center leading-8"
                    style={styles.text}
                  >
                    Your Email
                  </Text>
                  <TextInput
                    className="p-2 mb-3 rounded-md border-2 border-white text-lg"
                    style={styles.input}
                    placeholder={email}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="white"
                    onChangeText={(text) => emailTypeHandler(text)}
                  />
                  <Text
                    className="text-lg text-center leading-8"
                    style={styles.text}
                  >
                    Your City
                  </Text>
                  <TextInput
                    className="p-2 mb-3 rounded-md border-2 border-white text-lg"
                    style={styles.input}
                    placeholder={city}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="white"
                    onChangeText={(text) => cityTypeHandler(text)}
                  />
                </View>

                <Pressable
                  className="mt-4 rounded py-2"
                  style={styles.submitButton}
                  onPress={() => submitHandler()}
                >
                  <Text className="text-white text-lg" style={styles.font}>
                    Submit
                  </Text>
                </Pressable>
                <Pressable
                  className="mt-4 rounded py-2"
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <Text
                    className="text-red text-lg"
                    style={{
                      color: ThemeColors.red,
                      fontFamily: FontFamily.poppinsSemibold,
                    }}
                  >
                    Back
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 20,
  },
  wrapperSecond: {
    width: "90%",
    marginBottom: 200,
    alignSelf: "center",
  },
  contentBox: {
    marginTop: 90,
    width: "100%",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  linearGradient: {
    width: "100%",
    height: "100%",
  },
  heading: {
    fontFamily: FontFamily.poppinsSemibold,
  },
  text: {
    color: ThemeColors.text,
    fontFamily: FontFamily.poppinsMedium,
  },
  red: {
    color: ThemeColors.red,
  },
  font: {
    fontFamily: FontFamily.poppinsSemibold,
  },
  bookmarkInfo: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  textBox: {
    width: "90%",
    alignSelf: "center",
    paddingTop: 8,
    paddingBottom: 10,
  },
  innerborder: {
    alignSelf: "center",
    marginVertical: 5,
    width: "97%",
    // maxHeight: "98.5%",
    borderWidth: 1,
    borderColor: "#ff8aa6",
    borderStyle: "solid",
    borderRadius: 8,
  },
  backButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    backgroundColor: "white",
    borderColor: ThemeColors.red,
    borderWidth: 1,
    width: "90%",
    marginBottom: 15,
  },
  submitButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    backgroundColor: ThemeColors.red,

    width: "90%",
    marginBottom: 15,
  },
  editButton: {
    width: 50,
    height: 54,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.15)",
    textAlign: "center",
  },
});
