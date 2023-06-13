import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import AllergyItem from "./AllergyItem";

export default function AllergyList(props) {
  const { allergies } = props;

  return (
    <>
      <View style={styles.borderthick} />
      <View className="flex-row py-1 justify-between">
        <View style={styles.leftrow}>
          <Text className="pl-4">Allergy</Text>
        </View>
        <View style={styles.rightrow}>
          <Text className="ml-1">Severity</Text>
        </View>
        <View className="pr-4">
          <Icon
            name="close"
            size={20}
            color="#ffffff"
            // style={{ marginRight: 6 }}
          />
        </View>
      </View>
      <View style={styles.borderthin} />
      {allergies.map((allergy) => (
        <AllergyItem key={allergy.id} {...allergy} />
      ))}
      <View className="flex-row items-center justify-between px-3 py-3">
        <TextInput
          className="bg-gray-200 rounded p-2"
          style={styles.inputsmall}
          placeholder="Allergy"
          placeholderTextColor="#a9a9a9"
        />
        <TextInput
          className="bg-gray-200 rounded p-2"
          style={styles.inputsmall}
          placeholder="Severity"
          placeholderTextColor="#a9a9a9"
        />
        <Pressable title="Add" className="rounded p-1" style={styles.button}>
          <Icon name="plus" size={20} color="#fff" />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  titleBox: {
    marginTop: 90,
    width: "100%",
    justifyContent: "center",
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
