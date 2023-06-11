import React, { useState, useEffect } from "react";
import { Modal, View, Text, Button, StyleSheet, Image } from "react-native";

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
    <Modal>
      <View style={styles.centeredContainer}>
        <View style={styles.animationContainer}>
          <Image
            style={{ width: 300, height: 300 }}
            source={images[currentIndex]}
            alt="Loading..."
          />
        </View>
        <Text style={styles.loadingText}>LOADING SCREEN</Text>
        <Button title="Close" onPress={toggleLoading} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  loadingText: {
    fontSize: 24,
    textAlign: "center",
  },
  animationContainer: {
    width: 300,
    height: 300,
    overflow: "hidden",
  },
});
