import {
  StyleSheet,
  View,
  Text,
  Button,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";

export default function Login(props) {
  const { loginHandler, emailTypeHandler } = props;

  return (
    <>
      <Text style={styles.text}>Please enter your email:</Text>
      <TextInput
        style={styles.text}
        placeholder="enter your email"
        placeholderTextColor="white"
        onChangeText={(text) => emailTypeHandler(text)}
      />
      <Pressable style={styles.button} onPress={loginHandler}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
    </>
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
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
