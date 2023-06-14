import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import SpeechRecognitionComponent from "./SpeechRecognitionComponent";
import SpokenTextComponent from "./SpokenTextComponent";
import { instruction } from "./components/Instruction";
export default function TextToSpeechScreen() {
  const [spokenText, setSpokenText] = useState("");

  const handleSpeechBoundary = (event) => {
    const spokenWords = event.characters;

    // Update the spoken text
    setSpokenText(spokenWords);
  };

  return (
    <View style={styles.container}>
      <SpeechRecognitionComponent
        onSpeechBoundary={handleSpeechBoundary}
        instructions={instruction}
      />
      <SpokenTextComponent spokenText={spokenText} />
    </View>
  );
}
