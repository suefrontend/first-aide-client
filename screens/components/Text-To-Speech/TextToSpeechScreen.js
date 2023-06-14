import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import SpeechRecognitionComponent from "./components/SpeechRecognition";
import SpokenTextComponent from "./components/SpokenText";
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
      <SpeechRecognitionComponent onSpeechBoundary={handleSpeechBoundary} instructions={instruction}/>
      <SpokenTextComponent spokenText={spokenText} />
    </View>
  );
}
