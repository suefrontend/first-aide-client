import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { themeColors } from "../theme";
import Voice from "@react-native-voice/voice";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>First Aide</Text>
      <Button title="PRESS ME" onPress={() => Voice.start("en-US")} />
    </View>
  );
}
