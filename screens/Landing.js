import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Landing() {
  const [loginPress, setLoginPress] = useState(false);
  const [registerPress, setRegisterPress] = useState(false);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FE0944", "#FEAE96"]}
        style={styles.linearGradient}
      >
        <Pressable style={styles.button} onPress={() => alert("Pressed!")}>
          <Text style={styles.text}>Login</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => alert("Pressed!")}>
          <Text style={styles.text}>Register</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    paddingVertical: 12,
    width: 200,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
