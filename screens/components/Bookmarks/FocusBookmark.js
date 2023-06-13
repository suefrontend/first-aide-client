import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "react-native-vector-icons/Feather";

export default function FocusBookmark(props) {
  const { cancelFocusBookmark, focusBookmark } = props;
  return (
    <View>
      <LinearGradient
        colors={["#FE0944", "#FEAE96"]}
        style={styles.linearGradient}
      >
        <View style={styles.wrapper}>
          <View style={styles.contentBox}>
            <Text
              className="py-6 text-2xl font-bold text-white"
              style={styles.headings}
            >
              Bookmark
            </Text>
          </View>
        </View>
        <View style={styles.bookmarkInfo}>
          <Pressable style={{ marginLeft: 10, marginTop: 10 }}>
            <Feather name="arrow-left-circle" size={30} color="gray" />
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  contentBox: {
    marginTop: 90,
    width: "100%",
    justifyContent: "center",
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  bookmarkInfo: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
  },
});
