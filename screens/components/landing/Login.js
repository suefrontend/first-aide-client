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
      <Text
        className="text-white text-center mt-10 mb-3 text-base"
        style={styles.shadowtext}
      >
        Please enter your email
      </Text>
      <TextInput
        className="p-2 mb-3 rounded-md border-2 border-white text-lg"
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="white"
        clearTextOnFocus={true}
        onChangeText={(text) => emailTypeHandler(text)}
      />
      <Pressable
        className="bg-white p-3 rounded mb-14"
        onPress={loginHandler}
        style={styles.shadowbutton}
      >
        <Text
          className="text-center font-bold text-lg"
          style={styles.red}
        >
          Login
        </Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  red: {
    color: "#FE0944",
  },
  shadowbutton: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.15)",
    textAlign: "center",
  },
  shadowtext: {
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 2,
  },
});
