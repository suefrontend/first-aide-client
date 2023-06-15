import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { FontFamily, ThemeColors } from "../../../theme";

export default function MarqueeItem({
  id,
  instruction,
  title,
  users_id,
  clickMarqueeHandler,
}) {
  const [icon, setIcon] = useState(title);
  const getIcon = () => {
    switch (icon) {
      case "abrasions":
        return require("../../docs/icons/abrasions.png");
      case "stings":
        break;
      case "choking":
        return require("../../docs/icons/choking.png");
        break;
      case "nosebleed":
        return require("../../docs/icons/nosebleed.png");
        break;
      default:
        return require("../../docs/icons/seizures.png");
    }
  };

  return (
    <Pressable
      style={styles.card}
      className="bg-white flex items-center justify-center rounded-lg mr-3 mb-2"
      onPress={() => clickMarqueeHandler(title, instruction)}
    >
      <View style={styles.innerborder} className="flex-row items-center">
        <Image
          style={{ width: 30, height: 30, marginLeft: 5, marginRight: 5 }}
          contentFit="cover"
          source={getIcon()}
        />
        <Text
          className="capitalize text-sm"
          style={[styles.text, { width: "71%", lineHeight: 19 }]}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 130,
    height: 77,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.15,
    elevation: 3,
  },
  text: {
    color: ThemeColors.text,
    fontFamily: FontFamily.poppinsMedium,
  },
  innerborder: {
    width: 124,
    height: 72,
    borderWidth: 1,
    borderColor: ThemeColors.pinklabeltext,
    borderStyle: "solid",
    borderRadius: 6,
  },
});
