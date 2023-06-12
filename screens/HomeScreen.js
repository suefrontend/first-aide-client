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
import EmergencyContact from "./components/EmergencyContact";

const Tab = createBottomTabNavigator();

export default function HomeScreen(props) {
  const { logoutHandler } = props;
  const [user, setUser] = useState(null);
  const [instructionKey, setInstructionKey] = useState(null);
  const [instructionDetail, setInstructionDetail] = useState(null);
  const Stack = createNativeStackNavigator();

  function HomeTabs() {
    const navigation = useNavigation();
    return (
      <Tab.Navigator>
        <Tab.Screen name="Recorder" options={{ headerShown: false }}>
          {() => (
            <Recorder
              logoutHandler={logoutHandler}
              navigation={navigation}
              setInstructionKey={setInstructionKey}
              setInstructionDetail={setInstructionDetail}
            />
          )}
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
          name="Emergency Contacts"
          component={Settings}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Recorder">
          {() => <Recorder logoutHandler={logoutHandler} />}
        </Tab.Screen>
        <Tab.Screen name="Medical Info" component={MedicalInfo} />
        <Tab.Screen name="Bookmark" component={Bookmark} />
        <Tab.Screen name="EmergencyContact" component={EmergencyContact} />
        <Tab.Screen name="Hospital Info" component={HospitalInfo} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
