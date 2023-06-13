import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Instruction(props) {
  const { apiResponse } = props;
  return (
    <View>
      <LinearGradient
        colors={["#FE0944", "#FEAE96"]}
        style={styles.linearGradient}
      >
        <View className="pt-20">
          <View style={styles.wrapper}>
            <View className="flex-row py-10 justify-between items-center">
              <Text
                className="text-4xl text-white font-bold"
                style={styles.headings}
              >
                {apiResponse.title}
              </Text>
              <TouchableHighlight onPress={() => {}}>
                <View>
                  <Icon
                    name="bookmark"
                    size={20}
                    color="#fff"
                    style={styles.headings}
                  />
                </View>
              </TouchableHighlight>
            </View>
            <SafeAreaView>
              <ScrollView>
                <Text
                  style={[styles.headings, styles.text]}
                  className="text-white text-lg"
                >
                  {apiResponse.instruction}
                </Text>
              </ScrollView>
            </SafeAreaView>
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
  color: {
    color: "#555",
  },
});
