import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function BookmarkItem(props) {
  const { id, instruction, title, users_id, popUpBookmark } = props;
  const [icon, setIcon] = useState(title);

  const getIcon = () => {
    switch (icon) {
      case "cut":
        return require("../../docs/icons/choking.png");
        break;
      case "abrasions":
        return require("../../docs/icons/abrasions.png");
      case "stings":
        break;
        return require("../../docs/icons/stings.png");
        break;
      case "splinter":
        return require("../../docs/icons/splinter.png");
        break;
      case "sprains":
        return require("../../docs/icons/sprains.png");
        break;
      case "burns":
        return require("../../docs/icons/burns.png");
        break;
      case "fever":
        return require("../../docs/icons/fever.png");
        break;
      case "headache":
        return require("../../docs/icons/headache.png");
        break;
      case "allergies":
        return require("../../docs/icons/allergies.png");
        break;
      case "cough":
        return require("../../docs/icons/cough.png");
        break;
      case "stomachache":
        return require("../../docs/icons/stomachache.png");
        break;
      case "rash":
        return require("../../docs/icons/rash.png");
        break;
      case "eye injuries":
        return require("../../docs/icons/eyeinjuries.png");
        break;
      case "cpr":
        return require("../../docs/icons/cpr.png");
        break;
      case "choking":
        return require("../../docs/icons/choking.png");
        break;
      case "nosebleed":
        return require("../../docs/icons/nosebleed.png");
        break;
      case "seizures":
        return require("../../docs/icons/seizures.png");
        break;
      case "allergic reactions":
        return require("../../docs/icons/allergies.png");
        break;
      case "heat exhaustion":
        return require("../../docs/icons/heatexhaustion.png");
        break;
      case "fractures":
        return require("../../docs/icons/fractures.png");
        break;
      default:
        return require("../../docs/icons/seizures.png");
    }
  };

  return (
    <Pressable
      style={styles.card}
      className="bg-white flex items-center justify-center rounded-lg"
      onPress={() => popUpBookmark([id, instruction, title, users_id])}
    >
      <View
        className="flex items-center justify-center"
        style={styles.innerborder}
      >
        <View className="flex items-center ">
          <Image
            style={{ width: 68, height: 64, marginBottom: 24 }}
            contentFit="cover"
            source={getIcon()}
          />
          <Text className="uppercase text-sm" style={styles.color}>
            {title}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.3,
    elevation: 3,
  },
  bg: {
    backgroundColor: "#FE0944",
  },
  card: {
    width: 160,
    height: 160,
  },
  color: {
    color: "#555",
  },
  innerborder: {
    width: 152,
    height: 152,
    borderWidth: 1,
    borderColor: "#ff8aa6",
    borderStyle: "solid",
    borderRadius: 8,
  },
});
