import { StyleSheet, View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { themeColors } from "../theme";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Recorder from "./components/Recorder";
import MedicalInfo from "./components/MedicalInfo";
import HospitalInfo from "./components/HospitalInfo";
import Bookmark from "./components/Bookmark";
import Settings from "./components/Settings";
import InstuctionScreen from "./components/Instruction";

const Tab = createBottomTabNavigator();

export default function HomeScreen(props) {
  const { logoutHandler } = props;
  const [user, setUser] = useState(null);
  const Stack = createNativeStackNavigator();

  function HomeTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Recorder" options={{ headerShown: false }}>
          {() => <Recorder logoutHandler={logoutHandler} />}
        </Tab.Screen>
        <Tab.Screen
          name="Bookmarks"
          component={Bookmark}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Medical Info"
          component={MedicalInfo}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Hospital Info"
          component={HospitalInfo}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
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
        <Stack.Screen name="Instruction" component={InstuctionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
