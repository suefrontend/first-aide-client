import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { themeColors } from "../theme";
import Voice from "@react-native-voice/voice";

export default function HomeScreen() {
  const [voiceResult, setVoiceResult] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  recordHandler = () => {
    Voice.start("en-US");
    console.log("Recording...");
    setIsRecording(true);
  };

  Voice.onSpeechResults = (e) => {
    console.log(e);
    setVoiceResult(e.values[0]);
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text>First Aide</Text>
      <Button title="START RECORDING" onPress={recordHandler} />
      {isRecording && <Text>Recording...</Text>}

      <Button
        title="STOP RECORDING"
        onPress={() => {
          Voice.stop();
          console.log("Stopped Recording");
          setIsRecording(false);
        }}
      />
    </View>
  );
}
