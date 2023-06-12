import { View, Text, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Instruction(props) {
  const { instructionKey, instructionDetail } = props;
  return (
    <View>
      <LinearGradient
        colors={["#FE0944", "#FEAE96"]}
        style={styles.linearGradient}
      >
        <View>
          <View style={styles.wrapper}>
            <Text
              className="py-6 text-2xl font-bold text-white"
              style={styles.headings}
            >
              Emergency Contact
            </Text>
          </View>
          <View style={styles.wrapper}>
            {/* <Text>{instructionKey}</Text>
          <Text>{instructionDetail}</Text> */}
            <View className="flex-row py-10 justify-between">
              <Text className="text-3xl" style={styles.headings}>
                Abrasions
              </Text>
              <Button title="bookmark" />
            </View>
            <Text
              style={[styles.headings, styles.text]}
              className="text-white text-lg"
            >
              Begin with washed hands. Gently clean the area with cool to
              lukewarm water and mild soap. Remove dirt or other particles from
              the wound using sterilized tweezers. For a mild scrape that’s not
              bleeding, leave the wound uncovered. If the wound is bleeding, use
              a clean cloth or bandage and apply gentle pressure to the area to
              stop any bleeding. Cover a wound that bled with a thin layer of
              topical antibiotic ointment, like Bacitracin, or a sterile
              moisture barrier ointment, like Aquaphor. Cover it with a clean
              bandage or gauze. Gently clean the wound and change the ointment
              and bandage once per day. Watch the area for signs of infection,
              like pain or redness and swelling. See your doctor if you suspect
              infection.
            </Text>
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
