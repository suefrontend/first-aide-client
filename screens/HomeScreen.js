import {
  StyleSheet,
  View,
  Text,
  Button,
  Animated,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import { useFonts } from "expo-font";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemeColors } from "../theme";
import { LinearGradient } from "expo-linear-gradient";

import Recorder from "./components/Recorder";
import MedicalRecordScreen from "./components/MedicalRecord/MedicalRecordScreen";
import HospitalInfo from "./components/HospitalInfo";
import Bookmark from "./components/Bookmarks/Bookmark";
import EmergencyContact from "./components/EmergContacts/EmergencyContact";
import Instruction from "./components/Instruction";
import Disclaimer from "./components/Disclaimer";
import EditProfile from "./components/EditProfile";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function HomeScreen(props) {
  const { logoutHandler } = props;
  const [user, setUser] = useState(null);
  const [apiResponse, setApiResponse] = useState({
    title: "",
    instruction: "",
  });
  const Stack = createNativeStackNavigator();

  const [bookmark, setBookmark] = useState(null);

  const [fontsLoaded, error] = useFonts({
    Poppins_regular: require("../assets/fonts/Poppins_regular.ttf"),
    Poppins_medium: require("../assets/fonts/Poppins_medium.ttf"),
    Poppins_semibold: require("../assets/fonts/Poppins_semibold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  const DrawerContent = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <LinearGradient
            colors={["#ff0f0f", "#ff8dbe", "#FFFFFF"]}
            style={styles.background}
          >
            <View
              style={{
                marginTop: 100,
                marginHorizontal: 20,
              }}
            >
              <Image
                source={require("./docs/logo.png")}
                alt="logo"
                resizeMode="contain"
                style={{ width: "100%" }}
              />
            </View>
          </LinearGradient>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Disclaimer")}
        >
          <Text style={styles.buttonText}>Disclaimer</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={logoutHandler}>
          <Text style={styles.buttonText}>Log Out</Text>
        </Pressable>
      </View>
    );
  };

  function HomeTabs() {
    const navigation = useNavigation();
    const tabOffsetValue = useRef(new Animated.Value(0)).current;

    function getWidth() {
      let width = Dimensions.get("window").width;

      width = width - 50;

      return width / 5;
    }

    return (
      <>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              backgroundColor: "transparent",
              width: "80%",
            },
            drawerActiveBackgroundColor: "transparent",
            drawerInactiveBackgroundColor: "transparent",
            drawerActiveTintColor: "transparent",
            drawerInactiveTintColor: "transparent",
          }}
        >
          <Drawer.Screen name="Main">
            {() => (
              <Tab.Navigator
                initialRouteName="Recorder"
                screenOptions={{
                  tabBarShowLabel: false,
                  tabBarStyle: {
                    height: 75,
                    shadowColor: "#000",
                    shadowOpacity: 0.1,
                    shadowOffset: {
                      width: 4,
                      height: -4,
                    },
                  },
                }}
              >
                <Tab.Screen
                  name="Bookmark"
                  component={Bookmark}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                      <View style={{ position: "absolute", top: "30%" }}>
                        <Entypo
                          name="bookmark"
                          size={26}
                          color={
                            focused ? ThemeColors.red : ThemeColors.navicon
                          }
                        />
                      </View>
                    ),
                  }}
                  listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                      Animated.spring(tabOffsetValue, {
                        toValue: 0,
                        useNativeDriver: true,
                      }).start();
                    },
                  })}
                ></Tab.Screen>
                <Tab.Screen
                  name="Medical Info"
                  component={MedicalRecordScreen}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                      <View style={{ position: "absolute", top: "30%" }}>
                        <Icon
                          name="stethoscope"
                          size={26}
                          color={
                            focused ? ThemeColors.red : ThemeColors.navicon
                          }
                        />
                      </View>
                    ),
                  }}
                  listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                      Animated.spring(tabOffsetValue, {
                        toValue: getWidth() + 6,
                        useNativeDriver: true,
                      }).start();
                    },
                  })}
                ></Tab.Screen>
                <Tab.Screen
                  name="Recorder"
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                      <View
                        style={{
                          position: "absolute",
                          top: "10%",
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      >
                        <Icon
                          name="microphone"
                          size={36}
                          color={
                            focused ? ThemeColors.red : ThemeColors.navicon
                          }
                          style={{ marginLeft: "auto", marginRight: "auto" }}
                        />
                      </View>
                    ),
                  }}
                  listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                      Animated.spring(tabOffsetValue, {
                        toValue: getWidth() * 2 + 18,
                        useNativeDriver: true,
                      }).start();
                    },
                  })}
                >
                  {() => (
                    <Recorder
                      logoutHandler={logoutHandler}
                      navigation={navigation}
                      setApiResponse={setApiResponse}
                    />
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="Hospital Info"
                  component={HospitalInfo}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                      <View style={{ position: "absolute", top: "30%" }}>
                        <Icon
                          name="medkit"
                          size={26}
                          color={
                            focused ? ThemeColors.red : ThemeColors.navicon
                          }
                        />
                      </View>
                    ),
                  }}
                  listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                      Animated.spring(tabOffsetValue, {
                        toValue: getWidth() * 3 + 26,
                        useNativeDriver: true,
                      }).start();
                    },
                  })}
                ></Tab.Screen>
                <Tab.Screen
                  name="Emergency Contacts"
                  component={EmergencyContact}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                      <View style={{ position: "absolute", top: "30%" }}>
                        <Icon
                          name="phone"
                          size={26}
                          color={
                            focused ? ThemeColors.red : ThemeColors.navicon
                          }
                        />
                      </View>
                    ),
                  }}
                  listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                      Animated.spring(tabOffsetValue, {
                        toValue: getWidth() * 4 + 36,
                        useNativeDriver: true,
                      }).start();
                    },
                  })}
                ></Tab.Screen>
              </Tab.Navigator>
            )}
          </Drawer.Screen>
        </Drawer.Navigator>
      </>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Instruction" options={{ headerShown: false }}>
          {() => (
            <Instruction
              apiResponse={apiResponse}
              bookmark={bookmark}
              setBookmark={setBookmark}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Disclaimer"
          component={Disclaimer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  box: {
    width: "100%",
    height: "60%",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: ThemeColors.red,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins_semibold",
    fontSize: 16,
  },
});
