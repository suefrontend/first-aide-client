import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { authDelete } from "../../../helpers/authenticatedCalls";
import { FontFamily, ThemeColors } from "../../../../theme";

export default function AllergyItem({ id, name, severity, setAllergies }) {
  const deleteAllergy = async (id) => {
    try {
      const response = await authDelete(`/medicalRecords/allergies`, id);
      if (response.status === 200) {
        alert("Allergy deleted");
        setAllergies((prev) => prev.filter((allergy) => allergy.id !== id));
      } else {
        alert("Oops! Something went wrong. Please try again later.");
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View className="flex-row py-2 justify-between">
        <View style={styles.leftrow}>
          <Text className="text-base pl-4" style={styles.text}>
            {name}
          </Text>
        </View>
        <View style={styles.rightrow}>
          <Text className="text-base" style={styles.text}>
            {severity}
          </Text>
        </View>
        <Pressable onPress={() => deleteAllergy(id)}>
          <Icon
            name="close"
            size={20}
            color="#c2c2c2"
            style={{ marginRight: 10 }}
          />
        </Pressable>
      </View>
      <View style={styles.borderthin} />
    </>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  linearGradient: {
    width: "100%",
    height: "100%",
  },
  headings: {
    textShadowColor: "rgba(0, 0, 0, 0.15)",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 2,
  },
  text: {
    color: ThemeColors.text,
    fontFamily: FontFamily.poppinsMedium,
  },
  borderthick: {
    height: 2,
    borderTopWidth: 2,
    borderColor: "#e6e6e6",
    borderStyle: "solid",
    width: "100%",
  },
  borderthin: {
    height: 1,
    borderTopWidth: 1,
    borderColor: "#e6e6e6",
    borderStyle: "solid",
    width: "100%",
  },
  leftrow: {
    width: 80,
  },
  rightrow: { width: 90 },
  inputsmall: {
    width: "43%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    backgroundColor: ThemeColors.red,
  },
});
