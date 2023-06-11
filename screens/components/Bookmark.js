import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import BookmarkItem from "./BookmarkItem";

export default function Bookmarks() {
  const bookmarks = [
    { users_id: 1, keyword: "choking", instruction: "", bookmarked: true },
    { users_id: 1, keyword: "abrasions", instruction: "", bookmarked: true },
  ];

  return (
    <View>
      <LinearGradient
        colors={["#FE0944", "#FEAE96"]}
        style={styles.linearGradient}
      >
        <View style={styles.wrapper}>
          <Text
            className="py-6 text-2xl font-bold text-white"
            style={styles.headings}
          >
            Bookmarks
          </Text>

          <FlatList
            data={bookmarks}
            keyExtractor={(bookmarks) => bookmarks.id}
            numColumns={2}
            renderItem={({ item }) => <BookmarkItem {...item} />}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
          />
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
});
