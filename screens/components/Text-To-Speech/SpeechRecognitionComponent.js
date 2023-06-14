import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Speech from "expo-speech";
export default function SpeechRecognitionComponent({
  onSpeechBoundary,
  instructions,
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [spokenText, setSpokenText] = useState("");

  const speak = async () => {
    setIsSpeaking(true);

    await Speech.speak(instructions, {
      rate: 0.8,
      onStart: handleSpeechStart,
      onDone: handleSpeechDone,
      onBoundary: handleSpeechBoundary,
    });
  };

  const handleSpeechStart = () => {
    setIsSpeaking(true);
    setSpokenText(instructions);
  };

  const handleSpeechDone = () => {
    setIsSpeaking(false);
    setSpokenText("");
  };

  const handleSpeechBoundary = (event) => {
    const { charIndex } = event;
    setSpokenText(instructions.slice(0, charIndex));
    onSpeechBoundary(event);
  };

  useEffect(() => {
    if (instructions) {
      speak();
    }
  }, [instructions]);

  return (
    <View style={styles.container}>
      <View style={styles.spokenTextContainer}>
        <Text style={styles.spokenText}>{spokenText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  spokenTextContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  spokenText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 24,
  },
});
