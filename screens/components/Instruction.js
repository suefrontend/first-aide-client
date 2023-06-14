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
            {/* <Text>{instructionKey}</Text>
          <Text>{instructionDetail}</Text> */}
            <View className="flex-row py-14 justify-between items-start">
              <Text
                className="text-4xl text-white font-bold"
                style={styles.headings}
              >
                Abrasions
                {apiResponse.title}
              </Text>
              <Pressable
                // style={{
                //   alignSelf: "flex-end",
                //   marginTop: 50,
                //   marginRight: 20,
                // }}
                onPress={saveInstruction}
              >
                <Icon
                  name={buttonClick ? "bookmark" : "bookmark-o"}
                  size={32}
                  color="#fff"
                />
              </Pressable>
            </View>

            <ScrollView style={{ height: 500 }}>
              {/* Font size too small? text-lg better? */}
              <Text style={[styles.text]} className="text-white text-lg mb-2">
                {apiResponse.instruction}
                Begin with washed hands. Gently clean the area with cool to
                lukewarm water and mild soap. Remove dirt or other particles
                from the wound using sterilized tweezers. For a mild scrape
                that’s not bleeding, leave the wound uncovered. If the wound
                egin with washed hands. Gently clean the area with cool to
                lukewarm water and mild soap. Remove dirt or other particles
                from the wound using sterilized tweezers. For a mild scrape
                that’s not bleeding, leave the wound uncovered. If the woundegin
                with washed hands. Gently clean the area with cool to lukewarm
                water and mild soap. Remove dirt or other particles from the
                wound using sterilized tweezers. For a mild scrape that’s not
                bleeding, leave the wound uncovered. If the wound egin with
                washed hands. Gently clean the area with cool to lukewarm water
                and mild soap. Remove dirt or other particles from the wound
                using sterilized tweezers. For a mild scrape that’s not
                bleeding, leave the wound uncovered. If the woundegin with
                washed hands. Gently clean the area with cool to lukewarm water
                and mild soap. Remove dirt or other particles from the wound
                using sterilized tweezers. For a mild scrape that’s not
                bleeding, leave the wound uncovered. If the wound
              </Text>
            </ScrollView>

            <Pressable
              className="bg-white rounded-md py-2 mt-4"
              style={styles.objectshadow}
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
    // height: "100%",
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
  text: {
    fontFamily: FontFamily.poppinsMedium,
    lineHeight: 28,
  },
  button: {
    color: ThemeColors.red,
    fontFamily: FontFamily.poppinsSemibold,
  },
});
