import React, { useState, useEffect } from "react";
import { Modal, View, Text, Button, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily } from "../../../theme";

const images = [
  require("../../docs/first-aid-box1.png"),
  require("../../docs/first-aid-box2.png"),
  require("../../docs/first-aid-box3.png"),
  require("../../docs/first-aid-box4.png"),
  require("../../docs/first-aid-box5.png"),
];

export default function Loader(props) {
  const { toggleLoading } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const imageAnimate = setTimeout(() => {
      if (currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 200);
    return () => clearTimeout(imageAnimate);
  }, [currentIndex]);

  return (
    <Modal style={styles.modal}>
      <View style={styles.centeredContainer}>
        <LinearGradient
          colors={["#FE0944", "#FEAE96"]}
          style={styles.linearGradient}
        >
          <View style={styles.animationContainer}>
            <Image
              style={{ width: 300, height: 300 }}
              source={images[currentIndex]}
              alt="Loading..."
            />
          </View>
          <Text style={styles.loadingText}>Processing...</Text>
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  centeredContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 26,
    textAlign: "center",
    fontFamily: FontFamily.poppinsSemibold,
    color: "#fff",
  },
  animationContainer: {
    width: 300,
    height: 300,
    overflow: "hidden",
  },
});
