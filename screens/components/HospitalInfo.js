import { View, Text, FlatList, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import HospitalInfoItem from "./HospitalInfoItem";
import JustLoader from "./loading/JustLoader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../helpers/tokenStorage";
import { authGet } from "../helpers/authenticatedCalls";

export default function HospitalInfo() {
  // const hospitals = [
  //   {
  //     city_id: 1,
  //     name: "Vancouver General Hospital",
  //     address: "899 West 12th Avenue",
  //     phone: "(604)-875-4111",
  //     hours: "24 hours a day, 7 days a week",
  //     er_exists: true,
  //   },
  //   {
  //     city_id: 1,
  //     name: "Vancouver General Hospital",
  //     address: "899 West 12th Avenue",
  //     phone: "(604)-875-4111",
  //     hours: "24 hours a day, 7 days a week",
  //     er_exists: true,
  //   },
  // ];

  const [hospitals, setHospitals] = useState(null);

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const response = await authGet("/hospitals");
        console.log("Hospitals", response.data);
        setHospitals(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHospitalData();
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <LinearGradient
        colors={["#FE0944", "#FEAE96"]}
        style={styles.linearGradient}
      >
        <View style={[styles.wrapper, { borderWidth: 1 }]}>
          <View style={styles.contentBox}>
            <Text
              className="text-2xl font-bold text-white"
              style={styles.headings}
            >
              Hospitals
            </Text>
            {hospitals === null && <JustLoader />}
            {hospitals && hospitals.length > 0 && (
              <>
                <FlatList
                  data={hospitals}
                  keyExtractor={(hospital) => hospital.id}
                  renderItem={({ item }) => <HospitalInfoItem {...item} />}
                />
              </>
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 50, // Margin from screen top
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  contentBox: {
    width: "100%",
    height: "100%",
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
