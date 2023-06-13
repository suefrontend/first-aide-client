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
        <Pressable
          style={{
            alignSelf: "flex-end",
            marginTop: 50,
            marginRight: 20,
          }}
          onPress={saveInstruction}
        >
          <Icon
            name={buttonClick ? "bookmark" : "bookmark-o"}
            size={30}
            color="#fff"
            style={styles.headings}
          />
        </Pressable>
        <View>
          <View style={styles.wrapper}>
            <View className="flex-row py-10 justify-between items-center">
              <Text
                className="text-4xl text-white font-bold"
                style={styles.headings}
              >
                {apiResponse.title}
              </Text>
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
