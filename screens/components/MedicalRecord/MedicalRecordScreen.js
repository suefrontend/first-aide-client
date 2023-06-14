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
import MedicationList from "./medication/MedicationList";
import ConditionList from "./condition/ConditionList";
import { FontFamily, ThemeColors } from "../../../theme";

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
        <ScrollView>
          <View style={styles.wrapper}>
            <View style={styles.titleBox}>
              <Text
                className="py-4 text-2xl font-bold text-white"
                style={styles.headings}
              >
                Medical Record
              </Text>
            </View>
          </View>
          <View className="bg-white rounded-lg py-3" style={styles.infoCard}>
            <Text
              className="text-lg font-bold mb-2 pl-4"
              style={styles.text}
            >
              Allergies
            </Text>
            <AllergyList allergies={allergies} setAllergies={setAllergies} />
          </View>
          <View className="bg-white rounded-lg py-3" style={styles.infoCard}>
            <Text
              className="text-lg font-bold mb-2 pl-4"
              style={styles.text}
            >
              Medications
            </Text>
            <MedicationList
              medications={medications}
              setMedications={setMedications}
            />
          </View>
          <View className="bg-white rounded-lg py-3" style={styles.infoCard}>
            <Text
              className="text-lg font-bold mb-2 pl-4"
              style={styles.text}
            >
              Conditions
            </Text>
            <ConditionList
              conditions={conditions}
              setConditions={setConditions}
            />
          </View>
        </ScrollView>
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
    fontFamily: FontFamily.poppinsSemibold,
  },
  text: {
    fontFamily: FontFamily.poppinsMedium,
    color: ThemeColors.text,
  },
  borderthick: {
    height: 2,
    borderTopWidth: 2,
    borderColor: ThemeColors.lightgray,
    borderStyle: "solid",
    width: "100%",
  },
  borderthin: {
    height: 1,
    borderTopWidth: 1,
    borderColor: ThemeColors.lightgray,
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
    backgroundColor: ThemeColors.red,
  },
  infoCard: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
  },
});
