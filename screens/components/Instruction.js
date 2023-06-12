import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";

export default function Instruction(props) {
  const { instructionKey, instructionDetail } = props;
  return (
    <View className="flex-1 items-center justify-center">
      <Text>{instructionKey}</Text>
      <Text>{instructionDetail}</Text>
    </View>
  );
}
