import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export default function EmergencyContactItem({ name, phone, relationship }) {
  return (
    <View className="rounded-lg bg-white py-3 px-4 mb-2" style={styles.card}>
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
              source={require("../docs/icons/avatar.png")}
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
          <Text className="text-xl mb-1" style={styles.primarycolor}>
            {name}
          </Text>
          <View className="flex-row">
            <Icon name="phone" size={20} color="#c2c2c2" />
            <Text className="ml-1" style={styles.color}>
              {phone}
            </Text>
          </View>
        </View>
        <View></View>
        <View className="rounded px-2 py-1" style={styles.labelbg}>
          <Text style={styles.labeltext}>{relationship}</Text>
        </View>
      </View>
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
  labelbg: {
    backgroundColor: "#FFECF0",
  },
  labeltext: {
    color: "#ff8aa6",
  },
  primarycolor: {
    color: "#FE0944",
  },
  color: {
    color: "#555",
  },
  bg: {
    backgroundColor: "#FE0944",
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
    backgroundColor: "#FE0944",
  },
});
