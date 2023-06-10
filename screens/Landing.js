import {
  StyleSheet,
  View,
  Text,
  Button,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import HomeScreen from "./HomeScreen";
import Login from "./components/landing/Login";
import Register from "./components/landing/Register";
import { storeToken, getToken } from "./helpers/tokenStorage";

export default function Landing() {
  const [loginPress, setLoginPress] = useState(false);
  const [registerPress, setRegisterPress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const value = await getToken();
        if (value !== null) {
          setUserAuthenticated(true);
        } else {
          setUserAuthenticated(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkToken();
  }, []);

  const [user, setUser] = useState({
    name: "",
    email: "",
    city: "",
  });

  const emailTypeHandler = (text) => {
    setUser({ ...user, email: text.toLowerCase() });
  };

  const loginHandler = async () => {
    console.log("Login:", user);
    if (user.email === "") {
      alert("Please enter your email");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/login/", {
        email: user.email,
      });
      console.log(response.data.accessToken);
      storeToken(response.data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  const clearUser = () => {
    setUser({
      name: "",
      email: "",
      city: "",
    });
  };

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
            {loginPress && (
              <Login
                setUser={setUser}
                loginHandler={loginHandler}
                emailTypeHandler={emailTypeHandler}
              />
            )}
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
