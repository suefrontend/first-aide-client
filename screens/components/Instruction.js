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
import { FontFamily } from "../../theme";

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
                Abrasions Abrasionsabrasionsabrasions
              </Text>
              <TouchableHighlight onPress={() => {}}>
                <View>
                  <Icon
                    name="bookmark"
                    size={30}
                    color="#fff"
                    style={[styles.shadow, styles.icon]}
                  />
                </View>
              </TouchableHighlight>
            </View>
            <SafeAreaView>
              <ScrollView>
                {/* Font size too small? text-lg better? */}
                <Text style={[styles.text]} className="text-white text-base">
                  Begin with washed hands. Gently clean the area with cool to
                  lukewarm water and mild soap. Remove dirt or other particles
                  from the wound using sterilized tweezers. For a mild scrape
                  that’s not bleeding, leave the wound uncovered. If the wound
                  egin with washed hands. Gently clean the area with cool to
                  lukewarm water and mild soap. Remove dirt or other particles
                  from the wound using sterilized tweezers. For a mild scrape
                  that’s not bleeding, leave the wound uncovered. If the
                  woundegin with washed hands. Gently clean the area with cool
                  to lukewarm water and mild soap. Remove dirt or other
                  particles from the wound using sterilized tweezers. For a mild
                  scrape that’s not bleeding, leave the wound uncovered. If the
                  wound egin with washed hands. Gently clean the area with cool
                  to lukewarm water and mild soap. Remove dirt or other
                  particles from the wound using sterilized tweezers. For a mild
                  scrape that’s not bleeding, leave the wound uncovered. If the
                  woundegin with washed hands. Gently clean the area with cool
                  to lukewarm water and mild soap. Remove dirt or other
                  particles from the wound using sterilized tweezers. For a mild
                  scrape that’s not bleeding, leave the wound uncovered. If the
                  wound
                </Text>
              </ScrollView>
            </SafeAreaView>
            <Pressable className="bg-white rounded py-3" style={styles.button}>
              <Text className="text-center">Back</Text>
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
  shadow: {
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 2,
  },
  icon: {},
  color: {
    color: "#555",
  },
  text: {
    fontFamily: FontFamily.poppinsSemibold,
    lineHeight: 28,
  },
  button: {
    // position: "absolute",
    // bottom: 40,
    // left: '50%'
  },
});
