import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
  SectionList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import AllergyList from "./allergy/AllergyList";
import { authGet } from "../../helpers/authenticatedCalls";

export default function MedicalRecordScreen() {
  const [allergies, setAllergies] = useState({});
  const [medications, setMedications] = useState([]);
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    const getMedicalInfo = async () => {
      try {
        const response = await authGet("/medicalRecords");
        setAllergies(response.data.allergies);
        setMedications(response.data.medications);
        setConditions(response.data.conditions);
      } catch (error) {
        console.log(error);
      }
    };
    getMedicalInfo();
  }, []);

  return (
    <View>
      <LinearGradient
        colors={["#FE0944", "#FEAE96"]}
        style={styles.linearGradient}
      >
        <View style={styles.wrapper}>
          <View style={styles.titleBox}>
            <Text
              className="py-6 text-2xl font-bold text-white"
              style={styles.headings}
            >
              Medical Record
            </Text>
          </View>
        </View>
        <View className="bg-white rounded-lg py-3" style={styles.wrapper}>
          <Text className="text-xl font-bold mb-2 pl-4" style={styles.color}>
            Allergies
          </Text>
          <AllergyList allergies={allergies} />
        </View>
        <View className="bg-white rounded-lg py-3" style={styles.wrapper}>
          <Text className="text-xl font-bold mb-2 pl-4" style={styles.color}>
            Medications
          </Text>
        </View>
        <View className="bg-white rounded-lg py-3" style={styles.wrapper}>
          <Text className="text-xl font-bold mb-2 pl-4" style={styles.color}>
            Conditions
          </Text>
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
  titleBox: {
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
  bg: {
    backgroundColor: "#FE0944",
  },
  color: {
    color: "#555",
  },
  borderthick: {
    height: 2,
    borderTopWidth: 2,
    borderColor: "#e6e6e6",
    borderStyle: "solid",
    width: "100%",
  },
  borderthin: {
    height: 1,
    borderTopWidth: 1,
    borderColor: "#e6e6e6",
    borderStyle: "solid",
    width: "100%",
  },
  leftrow: {
    width: 80,
  },
  rightrow: { width: 90 },
  inputsmall: {
    width: "43%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    backgroundColor: "#FE0944",
  },
});
