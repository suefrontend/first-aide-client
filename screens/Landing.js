import {
  StyleSheet,
  View,
  Text,
  Button,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import HomeScreen from "./HomeScreen";
import Login from "./components/landing/Login";
import Register from "./components/landing/Register";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Landing() {
  const [loginPress, setLoginPress] = useState(false);
  const [registerPress, setRegisterPress] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    city: "",
  });

  const clearUser = () => {
    setUser({
      name: "",
      email: "",
      city: "",
    });
  };

  const [userAuthenticated, setUserAuthenticated] = useState(false);

  return (
    <>
      {userAuthenticated == false && (
        <View style={styles.container}>
          <LinearGradient
            colors={["#FE0944", "#FEAE96"]}
            style={styles.linearGradient}
          >
            <View style={styles.buttonContainer}>
              <Button
                title="Click me to quick start"
                onPress={() => setUserAuthenticated(true)}
              ></Button>
              <Pressable
                style={styles.button}
                onPress={() => {
                  setLoginPress(!loginPress);
                  clearUser();
                }}
              >
                <Text style={styles.text}>Login</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => {
                  setRegisterPress(!registerPress);
                  clearUser();
                }}
              >
                <Text style={styles.text}>Register</Text>
              </Pressable>
            </View>
            {loginPress && <Login />}
            {registerPress && <Register />}
          </LinearGradient>
        </View>
      )}
      {userAuthenticated && <HomeScreen />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    paddingVertical: 12,
    width: 200,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  formText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  formContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
