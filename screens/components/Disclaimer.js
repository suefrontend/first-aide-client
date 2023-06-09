import {
  ScrollView,
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
} from "react-native";
import { FontFamily, ThemeColors } from "../../theme";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Disclaimer({ navigation }) {
  return (
    <View>
      <LinearGradient
        colors={["#FE0944", "#FEAE96"]}
        style={styles.linearGradient}
      >
        <ScrollView>
          <View style={styles.wrapper}>
            <Text style={styles.title}>Disclaimer</Text>
            <Text style={styles.disclaimerText}>
              This is an app built for learning purposes only. It is not
              intended to replace professional medical advice, diagnosis, or
              treatment. Always seek the advice of a qualified healthcare
              provider or medical professional for any specific medical
              condition, injury, or emergency. If you are experiencing a medical
              emergency, please call 911.
            </Text>

            <Text style={styles.disclaimerText}>
              By using this first aid instructional app, you acknowledge and
              agree to the above disclaimer and understand the limitations of
              the information provided.
            </Text>
            <Pressable
              className="bg-white rounded-md py-2 mt-4"
              style={styles.objectshadow}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.button} className="text-center text-lg">
                Back
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 90,
    marginBottom: 90,
  },
  linearGradient: {
    width: "100%",
    height: "100%",
  },
  objectshadow: {
    elevation: 4,
    shadowRadius: 2,
    shadowOpacity: 1,
    color: ThemeColors.red,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowColor: "rgba(0, 0, 0, 0.2)",
  },
  text: {
    fontFamily: FontFamily.poppinsMedium,
    lineHeight: 28,
  },
  button: {
    color: ThemeColors.red,
    fontFamily: FontFamily.poppinsSemibold,
  },
  disclaimerText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  title: {
    fontSize: 24,
    fontFamily: FontFamily.poppinsSemibold,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
});
