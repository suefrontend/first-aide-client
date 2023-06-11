import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import BookmarkItem from "./BookmarkItem";

export default function Bookmarks() {
  const bookmarks = [
    { users_id: 1, keyword: "abrasions", instruction: "", bookmarked: true },
    { users_id: 1, keyword: "rash", instruction: "", bookmarked: true },
  ];

  return (
    <View>
      <LinearGradient
        colors={["#FE0944", "#FEAE96"]}
        style={styles.linearGradient}
      ></LinearGradient>
      <BookmarkItem />
    </View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    width: "100%",
    height: "100%",
  },
});
