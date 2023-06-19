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
import Icon from "react-native-vector-icons/FontAwesome";
import { authPost } from "../helpers/authenticatedCalls";
import { FontFamily, ThemeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";

export default function Instruction(props) {
  const navigation = useNavigation();
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
                {apiResponse.title ? apiResponse.title : "Untitled"}
              </Text>
              <Pressable onPress={saveInstruction}>
                <Icon
                  name={buttonClick ? "bookmark" : "bookmark-o"}
                  size={32}
                  color="#fff"
                />
              </Pressable>
            </View>

            <ScrollView style={{ height: 500 }}>
              <Text style={[styles.text]} className="text-white text-lg mb-2">
                {apiResponse.instruction}
              </Text>
            </ScrollView>

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
    marginTop: 90,
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
  text: {
    fontFamily: FontFamily.poppinsMedium,
    lineHeight: 32,
  },
  button: {
    color: ThemeColors.red,
    fontFamily: FontFamily.poppinsSemibold,
  },
});
