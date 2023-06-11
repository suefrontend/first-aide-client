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

export default function Register(props) {
  const {
    switchHandler,
    registerHandler,
    nameTypeHandler,
    emailTypeHandler,
    cityTypeHandler,
  } = props;
  return (
    <>
      <Text>Please enter your name, email and city</Text>
      <TextInput
        style={styles.text}
        placeholder="name"
        placeholderTextColor="white"
        onChangeText={(text) => nameTypeHandler(text)}
      />
      <TextInput
        style={styles.text}
        placeholder="email"
        placeholderTextColor="white"
        onChangeText={(text) => emailTypeHandler(text)}
      />
      <TextInput
        style={styles.text}
        placeholder="city"
        placeholderTextColor="white"
        onChangeText={(text) => cityTypeHandler(text)}
      />
      <Pressable style={styles.button} onPress={registerHandler}>
        <Text style={styles.text}>Sign Up</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={switchHandler}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   width: "100%",
  //   height: "100%",
  // },
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
  // formContainer: {
  //   flex: 1,
  //   flexDirection: "column",
  // },
});
