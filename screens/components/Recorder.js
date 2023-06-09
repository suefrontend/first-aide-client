import { StyleSheet, View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Voice from "@react-native-voice/voice";

export default function Recorder() {
  const [voiceResult, setVoiceResult] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const onSpeechStart = (e) => {
    console.log("onSpeechStart: ", e);
  };

  const onSpeechEnd = (e) => {
    console.log("onSpeechEnd: ", e);
  };

  const onSpeechError = (e) => {
    console.log("onSpeechError: ", e);
  };

  const onSpeechResults = (e) => {
    console.log("onSpeechResults: ", e);
    const result = e.value[0];
    setVoiceResult(result);
  };

  const clear = () => {
    setVoiceResult("");
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const recordHandler = async () => {
    console.log("Recording...");
    setIsRecording(true);
    try {
      await Voice.start("en-US");
    } catch (e) {
      console.error("error:", e);
    }
  };

  const stopRecordingHandler = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (e) {
      console.error("error:", e);
    }
  };

  return (
    <View
      style={styles.container}
      className="flex-1 items-center justify-center"
    >
      <LinearGradient
        colors={["#FE0944", "#FEAE96"]}
        style={styles.linearGradient}
      >
        <Text>Tell me your symptoms</Text>
        <Button title="START RECORDING" onPress={recordHandler} />
        {isRecording && <Text>Recording...</Text>}
        {voiceResult !== "" && <Text>{voiceResult}</Text>}
        <Button title="STOP RECORDING" onPress={stopRecordingHandler} />
        <Button title="CLEAR" onPress={clear} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    width: "100%",
    height: "100%",
  },
});
