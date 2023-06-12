import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export default function EmergContactForm(props) {
  return (
    <View className="rounded-lg bg-white py-4 px-4 mt-5" style={styles.card}>
      {/* <Text className="mb-4 text-lg font-bold" style={styles.color}>
Add New Contact
</Text> */}
      <TextInput
        className="bg-gray-200 py-3 px-3 rounded-md"
        placeholder="Name"
        placeholderTextColor="#a9a9a9"
      />
      <View className="flex-row mt-3 justify-between">
        <TextInput
          className="bg-gray-200 rounded p-3"
          style={styles.inputsmall}
          placeholder="Phone number"
          placeholderTextColor="#a9a9a9"
        />
        <TextInput
          className="bg-gray-200 rounded p-3"
          style={styles.inputsmall}
          placeholder="Relationship"
          placeholderTextColor="#a9a9a9"
        />
      </View>
      <Pressable
        title="Add"
        className="mt-4 rounded py-2"
        style={styles.button}
      >
        <Text>
          <Icon name="plus" size={20} color="#fff" />
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    elevation: 3,
  },
});
