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
    if (user.email === "") {
      alert("Please enter your email");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email: user.email,
      });
      storeToken(response.data.accessToken);
      setUserAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const registerHandler = async () => {
    if (user.name === "" || user.email === "" || user.city === "") {
      alert("Please fill out all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/register", {
        username: user.name,
        email: user.email,
        city: user.city,
      });
      storeToken(response.data.accessToken);
      setUserAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    removeToken();
    setUserAuthenticated(false);
    setLoginPress(true);
    setRegisterPress(false);
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
              <View style={{ width: "100%", height: "50%" }}>
                <Image
                  source={require("./docs/logo4.png")}
                  alt="First Aid Logo"
                  resizeMode="contain"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
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
