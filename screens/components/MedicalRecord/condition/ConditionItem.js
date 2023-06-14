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
              <Text className="text-base pl-4" style={styles.color}>
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
  bg: {
    backgroundColor: "#FE0944",
  },
  color: {
    color: "#555",
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
    backgroundColor: "#FE0944",
  },
});
