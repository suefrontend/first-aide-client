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
import Loader from "./components/loading/Loader";
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
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email: user.email,
      });
      console.log(response.data.accessToken);
      storeToken(response.data.accessToken);
      setUserAuthenticated(true);
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

  toggleLoading = () => {
    setIsLoading(!isLoading);
  };

  return (
    <>
      {userAuthenticated == false && (
        <View style={styles.container}>
          <LinearGradient
            colors={["#FE0944", "#FEAE96"]}
            style={styles.linearGradient}
          >
            <View style={styles.formcontainer}>
              <Text
                className="text-center font-bold text-4xl text-white mb-4"
                style={styles.shadowtext}
              >
                First Aide
              </Text>
              <View
                className="bg-white items-center justify-center mb-2"
                style={styles.logo}
              >
                <Image
                  source={require("./docs/first-aid-box2.png")}
                  alt="First Aid Logo"
                  style={{
                    width: 200,
                    height: 200,
                  }}
                  className="ml-2 mt-2"
                />
              </View>
              {loginPress && (
                <>
                  <Login
                    loginHandler={loginHandler}
                    emailTypeHandler={emailTypeHandler}
                  />
                  <Pressable
                    className="border-white border-2 rounded p-2 mt-auto"
                    onPress={switchHandler}
                  >
                    <Text className="text-white font-bold text-lg text-center">
                      Create Account
                    </Text>
                  </Pressable>
                  {isLoading && <Loader toggleLoading={toggleLoading} />}
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
              <Button
                title="Click me to toggle loading screen"
                onPress={toggleLoading}
              />
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
    flex: 1,
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 60,
    shadowColor: "#171717",
    shadowOffset: { width: -3, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  formcontainer: {
    width: "85%",
    height: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 20,
  },
  shadowtext: {
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 2,
  },
});
