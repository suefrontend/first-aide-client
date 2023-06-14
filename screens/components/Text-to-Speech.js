import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Speech from 'expo-speech';

export default function SpeechRecognitionComponent({ onSpeechBoundary }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [instruction, setInstruction] = useState('');

  useEffect(() => {
    const fetchInstructions = async () => {
      try {
        const response = await fetch('http://localhost:8000/instructions', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: { input: 'instruction'}
        });

        const data = await response.json();

        if (response.ok) {
          const { instruction } = data;
          setInstruction(instruction);
        } else {
          console.error('An error occurred:', data.error);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchInstructions();
  }, []);

  const speak = async () => {
    setIsSpeaking(true);

    await Speech.speak(instruction, {
      rate: 0.8,
      onStart: handleSpeechStart,
      onDone: handleSpeechDone,
      onBoundary: handleSpeechBoundary,
    });
  };

  const handleSpeechStart = () => {
    setIsSpeaking(true);
    setSpokenText(instruction);
  };

  const handleSpeechDone = () => {
    setIsSpeaking(false);
    setSpokenText('');
  };

  const handleSpeechBoundary = (event) => {
    const { charIndex } = event;
    setSpokenText(instruction.slice(0, charIndex));
    onSpeechBoundary(event);
  };

  return (
    <View style={styles.container}>
      <Button title="Press to hear some words" onPress={speak} disabled={isSpeaking} />
      <View style={styles.spokenTextContainer}>
        <Text style={styles.spokenText}>{spokenText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  spokenTextContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  spokenText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
  },
});