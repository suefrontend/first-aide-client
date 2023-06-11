import {
  StyleSheet,
  View,
  Text,
  Button,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import HomeScreen from "./HomeScreen";
import Login from "./components/landing/Login";
import Register from "./components/landing/Register";
import { storeToken, getToken, removeToken } from "./helpers/tokenStorage";

export default function Landing() {
  const [loginPress, setLoginPress] = useState(true);
  const [registerPress, setRegisterPress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const value = await getToken();
        if (value !== null) {
          setUserAuthenticated(true);
          console.log(value);
        } else {
          setUserAuthenticated(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkToken();
  }, [userAuthenticated]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    city: "",
  });

  const nameTypeHandler = (text) => {
    setUser({ ...user, name: text });
  };

  const emailTypeHandler = (text) => {
    setUser({ ...user, email: text.toLowerCase() });
  };

  const cityTypeHandler = (text) => {
    setUser({ ...user, city: text });
  };

  const loginHandler = async () => {
    console.log("Login:", user);
    if (user.email === "") {
      alert("Please enter your email");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email: user.email,
      });
      console.log(response.data.accessToken);
      storeToken(response.data.accessToken);
      setUserAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const registerHandler = async () => {
    console.log("Register:", user);
    if (user.name === "" || user.email === "" || user.city === "") {
      alert("Please fill out all fields");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/register", {
        username: user.name,
        email: user.email,
        city: user.city,
      });
      console.log(response.data.accessToken);
      storeToken(response.data.accessToken);
      setUserAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    console.log("Logout:", user);
    setIsLoading(true);
    removeToken();
    setUserAuthenticated(false);
    setLoginPress(true);
    setRegisterPress(false);
    setIsLoading(false);
    console.log(userAuthenticated);
  };

  const switchHandler = () => {
    setLoginPress(!loginPress);
    setRegisterPress(!registerPress);
    clearUser();
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
            <View style={styles.formContainer}>
              <Text style={styles.text}>First Aid</Text>
              <Image
                source={require("./docs/first-aid-box2.png")}
                alt="First Aid Logo"
                style={{ width: 200, height: 200 }}
              />
              {loginPress && (
                <>
                  <Login
                    loginHandler={loginHandler}
                    emailTypeHandler={emailTypeHandler}
                  />
                  <Pressable style={styles.button} onPress={switchHandler}>
                    <Text style={styles.text}>Create Account</Text>
                  </Pressable>
                </>
              )}
              {registerPress && (
                <Register
                  switchHandler={switchHandler}
                  registerHandler={registerHandler}
                  nameTypeHandler={nameTypeHandler}
                  emailTypeHandler={emailTypeHandler}
                  cityTypeHandler={cityTypeHandler}
                />
              )}
            </View>
          </LinearGradient>
        </View>
      )}
      {userAuthenticated && <HomeScreen logoutHandler={logoutHandler} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
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
    justifyContent: "center",
    alignItems: "center",
  },
});
