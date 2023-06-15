import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { authGet } from "../../helpers/authenticatedCalls";
import { FontFamily, ThemeColors } from "../../../theme";

export default function FocusMarquee(props) {
  const { cancelFocusMarquee, focusMarqueeTitle, focusMarqueeInstruction } =
    props;
  return (
    <>
      <View className="rounded-lg bg-white py-4 px-4 mt-5" style={styles.card}>
        <Pressable style={styles.cross} onPress={cancelFocusMarquee}>
          <Icon name="close" size={20} color="#c2c2c2" />
        </Pressable>
        <View className="flex-row justify-between items-center">
          <View>
            <Text>{focusMarqueeTitle}</Text>
            <Text>{focusMarqueeInstruction}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    elevation: 3,
  },
  inputsmall: {
    width: "48%",
  },
  button: {
    elevation: 3,
    backgroundColor: ThemeColors.red,
  },
  cross: {
    alignSelf: "flex-end",
  },
  labelbg: {
    backgroundColor: ThemeColors.pinkbg,
  },
  labeltext: {
    color: ThemeColors.pinklabeltext,
    fontFamily: FontFamily.poppinsMedium,
  },
  red: {
    color: ThemeColors.red,
    fontFamily: FontFamily.poppinsMedium,
  },
  text: {
    color: ThemeColors.text,
    fontFamily: FontFamily.poppinsMedium,
  },
  font: {
    fontFamily: FontFamily.poppinsSemibold,
  },
  buttonlarge: {
    width: "100%",
  },
});
