import {
  StyleSheet,
  View,
  Text,
  Button,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Login(props) {
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.text}
        placeholder="enter your email"
        placeholderTextColor="white"
        onChangeText={(text) => setUser({ ...user, email: text })}
      />
      <Pressable
        style={styles.button}
        onPress={() => console.log("Login:", user)}
      >
        <Text style={styles.text}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
  formContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
