import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SpokenTextComponent({ spokenText }) {
  return (
    <View style={styles.container}>
      <Text style={styles.spokenText}>{spokenText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  spokenText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});