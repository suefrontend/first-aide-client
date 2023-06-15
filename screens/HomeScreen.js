import {
  StyleSheet,
  View,
  Text,
  Button,
  Animated,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { useFonts } from "expo-font";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemeColors } from "../theme";

import Recorder from "./components/Recorder";
import MedicalRecordScreen from "./components/MedicalRecord/MedicalRecordScreen";
import HospitalInfo from "./components/HospitalInfo";
import Bookmark from "./components/Bookmarks/Bookmark";
import EmergencyContact from "./components/EmergContacts/EmergencyContact";
import Instruction from "./components/Instruction";

const Tab = createBottomTabNavigator();

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
        <Tab.Navigator
          initialRouteName="Recorder"
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              // backgroundColor: "white",
              // position: "absolute",
              // bottom: 25,
              // marginHorizontal: 20,
              // paddingHorizontal: 20,
              height: 80,
              // borderRadius: 8,
              // shadowColor: "#000",
              // shadowOpacity: 0.1,
              // shadowOffset: {
              //   width: 4,
              //   height: 4,
              // },
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
                    color={focused ? ThemeColors.red : ThemeColors.navicon}
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
                    color={focused ? ThemeColors.red : ThemeColors.navicon}
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
                    // backgroundColor: ThemeColors.navicon,
                    borderRadius: 25,
                    justifyContent: "center",
                    alignContent: "center",
                    // marginBottom: 30,
                  }}
                >
                  <Icon
                    name="microphone"
                    size={36}
                    color={focused ? ThemeColors.red : ThemeColors.navicon}
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
                    color={focused ? ThemeColors.red : ThemeColors.navicon}
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
                    color={focused ? ThemeColors.red : ThemeColors.navicon}
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
        <Animated.View
          style={{
            width: getWidth() - 20,
            height: 2,
            backgroundColor: ThemeColors.red,
            position: "absolute",
            bottom: 80,
            left: 17,
            borderRadius: 50,
            transform: [{ translateX: tabOffsetValue }],
          }}
        ></Animated.View>
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

        <Stack.Screen name="Instruction">
          {() => (
            <Instruction
              apiResponse={apiResponse}
              bookmark={bookmark}
              setBookmark={setBookmark}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
