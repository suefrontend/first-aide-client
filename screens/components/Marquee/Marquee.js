import React, { useRef, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Animated } from "react-native";
import MarqueeItem from "./MarqueeItem";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function Marquee(props) {
  const { marqueeItems, clickMarqueeHandler } = props;
  // const ref = useRef(null);

  const offset = new Animated.Value(0);
  const carouselRef = React.useRef();

  useEffect(() => {
    const timer = setInterval(() => {
      const newIndex = Math.floor(offset._value) + 1;
      carouselRef.current.scrollToIndex({ index: newIndex, animated: true });
      console.log("new index", newIndex);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatedFlatList
      ref={carouselRef}
      horizontal={true}
      data={marqueeItems}
      keyExtractor={(marqueeItem) => marqueeItem.id}
      renderItem={({ item }) => (
        <MarqueeItem {...item} clickMarqueeHandler={clickMarqueeHandler} />
      )}
    />
  );
}
