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
import { FontFamily, ThemeColors } from "../../../theme";

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
      <Text
        className="text-white text-center mt-10 mb-2 text-base"
        style={styles.shadowtext}
      >
        Please enter your name, email and city
      </Text>
      <TextInput
        className="p-2 mb-3 rounded-md border-2 border-white text-lg"
        style={[styles.input, styles.text]}
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        placeholder="Name"
        onChangeText={(text) => nameTypeHandler(text)}
      />
      <TextInput
        className="p-2 mb-3 rounded-md border-2 border-white text-lg"
        style={[styles.input, styles.text]}
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        placeholder="Email"
        onChangeText={(text) => emailTypeHandler(text)}
      />
      <TextInput
        className="p-2 mb-3 rounded-md border-2 border-white text-lg"
        style={[styles.input]}
        placeholder="City"
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        onChangeText={(text) => cityTypeHandler(text)}
      />
      <Pressable
        onPress={registerHandler}
        className="bg-white p-3 rounded mb-4"
      >
        <Text className="text-center font-bold text-lg" style={styles.red}>
          Sign Up
        </Text>
      </Pressable>

      <Pressable onPress={switchHandler}>
        <Text
          className="text-center text-white underline"
          style={styles.shadowtext}
        >
          Login
        </Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  red: {
    color: ThemeColors.red,
    fontFamily: FontFamily.poppinsSemibold,
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.15)",
    textAlign: "center",
    fontFamily: FontFamily.poppinsRegular,
  },
  shadowtext: {
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 2,
    fontFamily: FontFamily.poppinsMedium,
  },
  text: {
    color: "#fff",
    fontFamily: FontFamily.poppinsRegular,
  },
});
