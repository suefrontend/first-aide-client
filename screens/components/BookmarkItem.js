import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function BookmarkItem() {
  return (
    <View className="flex-row" style={styles.container}>
      <View className="flex-row" style={{ columnGap: 15 }}>
        {/* card */}
        <View
          style={styles.card}
          className="bg-white flex items-center justify-center rounded-lg"
        >
          <View
            className="flex items-center justify-center"
            style={styles.innerborder}
          >
            <View className="flex items-center ">
              <Image
                style={{ width: 68, height: 64, marginBottom: 24 }}
                contentFit="cover"
                source={require("../docs/icons/choking.png")}
              />
              <Text className="uppercase text-sm" style={styles.color}>
                Choking
              </Text>
            </View>
          </View>
        </View>
        {/* card */}
        {/* <View
          style={styles.card}
          className="bg-white flex items-center justify-center rounded-lg"
        >
          <View
            className="flex items-center justify-center"
            style={styles.innerborder}
          >
            <View className="flex items-center ">
              <Image
                style={{ width: 68, height: 64, marginBottom: 24 }}
                contentFit="cover"
                source={require("../assets/icons/choking.png")}
              />
              <Text className="uppercase text-sm" style={styles.color}>
                Choking
              </Text>
            </View>
          </View>
        </View> */}
        {/* card */}
      </View>
    </View>
  );
}
