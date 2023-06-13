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
import ConditionItem from "./ConditionItem";

export default function ConditionList(props) {
  const { conditions } = props;
  return (
    <>
      <View style={styles.borderthick} />
      {conditions &&
        conditions.length > 0 &&
        conditions.map((condition) => (
          <ConditionItem key={condition.id} {...condition} />
        ))}

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
  button: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    backgroundColor: "#FE0944",
  },
});
