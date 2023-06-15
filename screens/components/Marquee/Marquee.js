import { View, Text, FlatList, StyleSheet } from "react-native";
import MarqueeItem from "./MarqueeItem";

export default function Marquee(props) {
  const { marqueeItems, clickMarqueeHandler } = props;

  return (
    <FlatList
      horizontal={true}
      data={marqueeItems}
      keyExtractor={(marqueeItem) => marqueeItem.id}
      renderItem={({ item }) => (
        <MarqueeItem {...item} clickMarqueeHandler={clickMarqueeHandler} />
      )}
    />
  );
}
