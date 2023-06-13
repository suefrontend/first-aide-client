import { View, Text, FlatList, StyleSheet } from "react-native";
import MarqueeItem from "./MarqueeItem";

export default function Marquee() {
  const bookmarks = [
    { users_id: 1, keyword: "choking", instruction: "", bookmarked: true },
    { users_id: 1, keyword: "abrasions", instruction: "", bookmarked: true },
    { users_id: 1, keyword: "nodebleed", instruction: "", bookmarked: true },
  ];

  return (
    <FlatList
      data={bookmarks}
      keyExtractor={(bookmarks) => bookmarks.id}
      numColumns={3}
      renderItem={({ item }) => <MarqueeItem {...item} />}
    />
  );
}
