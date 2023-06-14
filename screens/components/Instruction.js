import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { authPost } from "../helpers/authenticatedCalls";
import TextToSpeechScreen from "./Text-To-Speech/TextToSpeechScreen";
import { FontFamily, ThemeColors } from "../../theme";

export default function Instruction(props) {
  const { apiResponse, setBookmark } = props;
  const [buttonClick, setButtonClick] = useState(false);

  const saveInstruction = () => {
    if (!buttonClick) {
      setButtonClick(true);
      if (apiResponse.instruction === "" || apiResponse.instruction === null) {
        alert("No instruction to save");
        setButtonClick(false);
        return;
      }

      setBookmark(apiResponse);
      console.log(apiResponse);

      const addBookmark = async () => {
        try {
          const response = await authPost("/bookmarks/", apiResponse);
        } catch (error) {
          console.log(error);
        }
      };

      addBookmark().then(() => {
        alert("Saved to bookmarks");
      });

      return;
    } else {
      setButtonClick(false);
      return;
    }
  };

  return (
    <View>
      <LinearGradient
        colors={["#FE0944", "#FEAE96"]}
        style={styles.linearGradient}
      >
        <View className="">
          <View style={styles.wrapper}>
            <View className="flex-row py-14 justify-between items-start">
              <Text
                className="text-4xl text-white font-bold"
                style={styles.headings}
              >
                {apiResponse.title}
              </Text>

              <Pressable
                style={{
                  alignSelf: "flex-end",
                  marginTop: 50,
                  marginRight: 25,
                }}
                onPress={saveInstruction}
              >
                <Ionicons
                  name={buttonClick ? "bookmark" : "bookmark-outline"}
                  size={25}
                  color="#fff"
                  style={styles.headings}
                />
              </Pressable>
            </View>

            <ScrollView style={{ height: 500 }}>
              <Text style={[styles.text]} className="text-white text-base mb-2">
                {apiResponse.instruction}
              </Text>

              <Pressable
                className="bg-white rounded-md py-2 mt-4"
                style={styles.objectshadow}
                marginBottom={20}
              >
                <Text
                  style={styles.button}
                  className="text-center text-lg uppercase"
                >
                  Back
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
        <TextToSpeechScreen instructions={apiResponse.instruction} />
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
    fontFamily: FontFamily.poppinsSemibold,
    width: "90%",
  },
  textshadow: {
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 2,
  },
  objectshadow: {
    elevation: 4,
    shadowRadius: 2,
    shadowOpacity: 1,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowColor: "rgba(0, 0, 0, 0.2)",
  },
  color: {
    color: "#555",
  },
  text: {
    fontFamily: FontFamily.poppinsSemibold,
    lineHeight: 28,
  },
  button: {
    color: ThemeColors.red,
    fontFamily: FontFamily.poppinsSemibold,
  },
});
