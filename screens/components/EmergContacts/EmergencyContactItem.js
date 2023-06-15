import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontFamily, ThemeColors } from "../../../theme";

export default function EmergencyContactItem({
  id,
  name,
  phone,
  relationship,
  user_id,
  setShowContact,
  popUpContact,
  deleteContactHandler,
}) {
  return (
    <Pressable
      className="rounded-lg bg-white py-3 px-4 mb-2"
      style={styles.card}
      onPress={() => popUpContact(id)}
    >
      <View className="flex-row justify-between items-center">
        <View>
          <View
            className="h-100 w-100 bg-black round-full"
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: "#e3e3e3",
              position: "relative",
            }}
          >
            <Image
              contentFit="cover"
              source={require("../../docs/icons/avatar.png")}
              style={{
                width: 35,
                height: 35,
                position: "absolute",
                top: 8,
                left: 8,
              }}
            />
          </View>
        </View>
        <View>
          <Text className="text-lg mb-1" style={[styles.red]}>
            {name}
          </Text>
          <View className="flex-row">
            <Icon name="phone" size={20} color="#c2c2c2" />
            <Text className="ml-1" style={[styles.text]}>
              {phone}
            </Text>
          </View>
        </View>
        <View></View>
        <View className="rounded px-2 py-1" style={styles.labelbg}>
          <Text style={styles.labeltext}>{relationship}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
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
  inputsmall: {
    width: "48%",
  },
  buttonlarge: {
    width: "100%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    backgroundColor: ThemeColors.red,
  },
});
