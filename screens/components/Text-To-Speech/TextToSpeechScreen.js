import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SpeechRecognitionComponent from "./SpeechRecognitionComponent";
import SpokenTextComponent from "./SpokenTextComponent";

export default function TextToSpeechScreen({ instructions }) {
  const [spokenText, setSpokenText] = useState("");

  const handleSpeechBoundary = (event) => {
    const spokenWords = event.characters;

    // Update the spoken text
    setSpokenText(spokenWords);
  };

  return (
    <>
      <SpeechRecognitionComponent
        onSpeechBoundary={handleSpeechBoundary}
        instructions={instructions}
      />
      {/* <SpokenTextComponent spokenText={spokenText} /> */}
    </>
  );
}
