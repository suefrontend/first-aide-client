import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import HospitalInfoItem from "./HospitalInfoItem";
import JustLoader from "./loading/JustLoader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../helpers/tokenStorage";
import { authGet } from "../helpers/authenticatedCalls";
import { FontFamily, ThemeColors } from "../../theme";
import Icon from "react-native-vector-icons/Entypo";

export default function HospitalInfo({ navigation }) {
  const [hospitals, setHospitals] = useState(null);

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const response = await authGet("/hospitals");
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
        <View style={styles.wrapper}>
          <View style={styles.contentBox}>
            <Pressable onPress={() => navigation.openDrawer()}>
              <Icon name="dots-two-horizontal" size={30} color="#fff" />
            </Pressable>
            <Text
              className="text-2xl font-bold text-white pt-6 pb-3"
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
    fontFamily: FontFamily.poppinsSemibold,
  },
  text: {
    color: ThemeColors.text,
    fontFamily: FontFamily.poppinsMedium,
  },
});
