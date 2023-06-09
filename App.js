import Landing from "./screens/Landing";
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SpeechRecognitionComponent from './components/SpeechRecognition';
import SpokenTextComponent from './components/SpokenText';

export default function App() {
  const [spokenText, setSpokenText] = useState('');

  const handleSpeechBoundary = (event) => {
    const spokenWords = event.characters;

    // Update the spoken text
    setSpokenText(spokenWords);
  };

  return (
    <View style={styles.container}>
      <Landing />
      <SpeechRecognitionComponent onSpeechBoundary={handleSpeechBoundary} />
      <SpokenTextComponent spokenText={spokenText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
});

