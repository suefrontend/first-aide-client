import { View, Modal, Text, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

export default function Loader(props) {
  const { toggleLoading } = props;
  return (
    <Modal style={styles.centeredModal}>
      <View style={styles.centeredModal}>
        <Text>LOADING SCREEN</Text>
        <Button title="Close" onPress={() => toggleLoading()} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredModal: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
