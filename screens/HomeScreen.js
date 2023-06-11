import { StyleSheet, View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { themeColors } from "../theme";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Recorder from "./components/Recorder";
import MedicalInfo from "./components/MedicalInfo";
import HospitalInfo from "./components/HospitalInfo";
import Bookmark from "./components/Bookmark";

const Tab = createBottomTabNavigator();

export default function HomeScreen(props) {
  const { logoutHandler } = props;
  const [user, setUser] = useState(null);
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Recorder">
          {() => <Recorder logoutHandler={logoutHandler} />}
        </Tab.Screen>
        <Tab.Screen name="Medical Info" component={MedicalInfo} />
        <Tab.Screen name="Bookmark" component={Bookmark} />
        <Tab.Screen name="Hospital Info" component={HospitalInfo} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
