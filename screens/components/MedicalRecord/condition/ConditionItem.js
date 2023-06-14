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
import { authDelete } from "../../../helpers/authenticatedCalls";
import { FontFamily, ThemeColors } from "../../../../theme";

export default function ConditionItem({ id, name, setConditions }) {
  const deleteCondition = async (id) => {
    try {
      const response = await authDelete(`/medicalRecords/conditions`, id);
      if (response.status === 200) {
        alert("Condition deleted");
        setConditions((prev) =>
          prev.filter((condition) => condition.id !== id)
        );
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
      {"name" && (
        <>
          <View className="flex-row py-2 justify-between">
            <View>
              <Text className="text-base pl-4" style={styles.text}>
                {name}
              </Text>
            </View>
            <Pressable onPress={() => deleteCondition(id)}>
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
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: {
    color: ThemeColors.text,
    fontFamily: FontFamily.poppinsMedium,
  },
  borderthick: {
    height: 2,
    borderTopWidth: 2,
    borderColor: ThemeColors.lightgray,
    borderStyle: "solid",
    width: "100%",
  },
  borderthin: {
    height: 1,
    borderTopWidth: 1,
    borderColor: ThemeColors.lightgray,
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
