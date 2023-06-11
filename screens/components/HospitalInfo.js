import { View, Text, FlatList, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";

export default function HospitalInfo() {
  const hospitals = [
    {
      city_id: 1,
      name: "Vancouver General Hospital",
      address: "899 West 12th Avenue",
      phone: "(604)-875-4111",
      hours: "24 hours a day, 7 days a week",
      er_exists: true,
    },
    {
      city_id: 1,
      name: "Vancouver General Hospital",
      address: "899 West 12th Avenue",
      phone: "(604)-875-4111",
      hours: "24 hours a day, 7 days a week",
      er_exists: true,
    },
  ];

  return (
    <View>
      <LinearGradient
        colors={["#FE0944", "#FEAE96"]}
        style={styles.linearGradient}
      >
        <View style={styles.wrapper}>
          <Text
            className="py-6 text-2xl font-bold text-white"
            style={styles.headings}
          >
            Hospitals
          </Text>
          <FlatList
            data={hospitals}
            keyExtractor={(hospital) => hospital.id}
            renderItem={({ item }) => <HospitalListItem {...item} />}
          />
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
});
