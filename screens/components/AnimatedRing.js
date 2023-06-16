import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";

export default function AnimatedRing({ delay, scale }) {
  const ring = useSharedValue(0);

  const ringStyle = useAnimatedStyle(() => {
    return {
      opacity: 0.3 - ring.value,
      transform: [
        {
          // scale: interpolate(ring.value, [0, 1], [scale, scale * 12]),
          scale: interpolate(ring.value, [0, 1], [1, 10]),
        },
      ],
    };
  });

  useEffect(() => {
    ring.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 2000,
        }),
        -1,
        false
      )
    );
  }, [delay]);
  return <Animated.View style={[styles.ring, ringStyle]} />;
}

const styles = StyleSheet.create({
  ring: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
});
