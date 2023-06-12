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
        const response = await authGet("http://localhost:8000/hospitals");
        console.log("Hospitals", response.data);
        setHospitals(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHospitalData();
  }, []);

  return (
    <View>
      <LinearGradient
        colors={["#FE0944", "#FEAE96"]}
        style={styles.linearGradient}
      >
        <View style={styles.wrapper}>
          <View style={styles.contentBox}>
            <Text
              className="py-6 text-2xl font-bold text-white"
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
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  contentBox: {
    marginTop: 90,
    width: "100%",
    justifyContent: "center",
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
