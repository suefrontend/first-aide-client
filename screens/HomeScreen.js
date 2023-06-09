import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { themeColors } from "../theme";
import Voice from "@react-native-voice/voice";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Recorder from "./components/Recorder";
import MedicalInfo from "./components/MedicalInfo";
import HospitalInfo from "./components/HospitalInfo";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Recorder" component={Recorder} />
        <Tab.Screen name="Medical Info" component={MedicalInfo} />
        <Tab.Screen name="Hospital Info" component={HospitalInfo} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
