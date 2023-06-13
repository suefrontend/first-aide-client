import { StyleSheet, View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { themeColors } from "../theme";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Recorder from "./components/Recorder";
import MedicalInfo from "./components/MedicalInfo";
import HospitalInfo from "./components/HospitalInfo";
import Bookmark from "./components/Bookmark";
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

  function HomeTabs() {
    const navigation = useNavigation();
    return (
      <Tab.Navigator>
        <Tab.Screen name="Recorder" options={{ headerShown: false }}>
          {() => (
            <Recorder
              logoutHandler={logoutHandler}
              navigation={navigation}
              setApiResponse={setApiResponse}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Bookmark"
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
          name="Emergency Contacts"
          component={EmergencyContact}
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
