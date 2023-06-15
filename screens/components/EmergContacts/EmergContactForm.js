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
import { FontFamily, ThemeColors } from "../../../theme";

export default function EmergContactForm(props) {
  const {
    addContactHandler,
    nameTypeHandler,
    phoneTypeHandler,
    relationshipTypeHandler,
    setShowForm,
  } = props;
  return (
    <View className="rounded-lg bg-white py-4 px-4 mt-5" style={styles.card}>
      <Pressable style={styles.cross} onPress={() => setShowForm(false)}>
        <Icon name="close" size={20} color="#c2c2c2" />
      </Pressable>
      <Text className="mb-4 text-lg" style={styles.heading}>
        Add New Contact
      </Text>
      <TextInput
        className="bg-gray-200 py-3 px-3 rounded-md"
        placeholder="Name"
        style={styles.text}
        onChangeText={nameTypeHandler}
      />
      <View className="flex-row mt-3 justify-between">
        <TextInput
          className="bg-gray-200 rounded p-3"
          style={[styles.inputsmall, styles.text]}
          placeholder="Phone number"
          onChangeText={phoneTypeHandler}
        />
        <TextInput
          className="bg-gray-200 rounded p-3"
          style={[styles.inputsmall, styles.text]}
          placeholder="Relationship"
          onChangeText={relationshipTypeHandler}
        />
      </View>
      <Pressable
        title="Add"
        className="mt-4 rounded py-2"
        style={styles.button}
        onPress={addContactHandler}
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
  inputsmall: {
    width: "48%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    backgroundColor: ThemeColors.red,
  },
  cross: {
    alignSelf: "flex-end",
  },
  heading: {
    fontFamily: FontFamily.poppinsSemibold,
    color: ThemeColors.text,
  },
  text: {
    color: ThemeColors.text,
    fontFamily: FontFamily.poppinsMedium,
  },
});
