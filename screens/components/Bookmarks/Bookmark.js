import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import BookmarkItem from "./BookmarkItem";
import { authGet } from "../../helpers/authenticatedCalls";

export default function Bookmarks() {
  const [allBookmarks, setAllBookmarks] = useState([]);

  useEffect(() => {
    const getBookmarks = async () => {
      try {
        const response = await authGet("/bookmarks/");
        setAllBookmarks(response.data);
        console.log(allBookmarks);
      } catch (error) {
        console.log(error);
      }
    };
    getBookmarks();
  }, []);

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
              Bookmarks
            </Text>

            <FlatList
              data={allBookmarks}
              keyExtractor={(allBookmarks) => allBookmarks.id}
              numColumns={2}
              renderItem={({ item }) => <BookmarkItem {...item} />}
              columnWrapperStyle={{
                justifyContent: "space-between",
              }}
            />
          </View>
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
