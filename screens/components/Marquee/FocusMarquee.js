import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ScrollView,
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
      <View className="rounded-lg bg-white mt-5" style={styles.card}>
        {/* <View className="flex-row justify-between items-center"> */}
        {/* <View style={styles.wrapperSecond}> */}
        <View style={[styles.innerborder, { height: "100%" }]}>
          <Pressable style={styles.cross} onPress={cancelFocusMarquee}>
            <Icon
              name="close"
              size={20}
              color="#c2c2c2"
              style={{ marginRight: 10, marginTop: 10 }}
            />
          </Pressable>
          <ScrollView>
            <View className="px-4 pt-4 pb-5">
              <Text
                className="text-3xl pb-6 capitalize"
                style={[styles.heading]}
              >
                {focusMarqueeTitle}
              </Text>
              <View style={[styles.textBox]}>
                <Text
                  className="text-lg text-center leading-8"
                  style={styles.text}
                >
                  {focusMarqueeInstruction}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
        {/* </View> */}
        {/* </View> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    height: "80%",
  },
  cross: {
    alignSelf: "flex-end",
  },
  red: {
    color: ThemeColors.red,
    fontFamily: FontFamily.poppinsMedium,
  },
  text: {
    color: ThemeColors.text,
    fontFamily: FontFamily.poppinsMedium,
  },
  heading: {
    fontFamily: FontFamily.poppinsSemibold,
    textAlign: "center",
    color: ThemeColors.text,
    lineHeight: 36,
  },
  innerborder: {
    alignSelf: "center",
    marginVertical: 5,
    width: "97%",
    maxHeight: "98.5%",
    borderWidth: 1,
    borderColor: "#ff8aa6",
    borderStyle: "solid",
    borderRadius: 8,
  },
  buttonlarge: {
    width: "100%",
  },
  textBox: {
    height: "98%",
    width: "100%",
  },
});
