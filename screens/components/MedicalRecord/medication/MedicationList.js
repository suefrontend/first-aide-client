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
import MedicationItem from "./MedicationItem";

export default function MedicationList(props) {
  const { medications } = props;
  return (
    <>
      <View style={styles.borderthick} />
      {/* <FlatList
        data={medications}
        keyExtractor={(medication) => medication.id}
        renderItem={({ item }) => <MedicationItem {...item} />}
      /> */}
      <View className="flex-row items-center justify-between px-3 py-3">
        <TextInput
          className="bg-gray-200 rounded p-2"
          placeholder="Allergy"
          placeholderTextColor="#a9a9a9"
          style={{ width: "88%" }}
        />
        <Pressable title="Add" className="rounded p-1" style={styles.button}>
          <Icon name="plus" size={20} color="#fff" />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
