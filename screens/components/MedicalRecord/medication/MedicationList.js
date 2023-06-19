import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import MedicationItem from "./MedicationItem";
import { authPost } from "../../../helpers/authenticatedCalls";
import { FontFamily, ThemeColors } from "../../../../theme";

export default function MedicationList(props) {
  const { medications, setMedications } = props;
  const [newMedicationName, setMedicationName] = useState(null);

  const addMedication = async (name) => {
    try {
      const response = await authPost("/medicalRecords/medications", {
        name: name,
      });
      if (response.data.id) {
        alert("Medication added");
        setMedications((prev) => [
          ...prev,
          {
            id: response.data.id,
            name: name,
          },
        ]);
      } else {
        alert("Oops! Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.borderthick} />
      {medications &&
        medications.length > 0 &&
        medications.map((medication) => (
          <MedicationItem
            key={medication.id}
            {...medication}
            setMedications={setMedications}
          />
        ))}
      <View className="flex-row items-center justify-between px-3 pt-3">
        <TextInput
          className="bg-gray-200 rounded p-2"
          placeholder="Medication"
          value={newMedicationName}
          onChangeText={(text) => setMedicationName(text)}
          style={[{ width: "88%" }, styles.text]}
        />
        <Pressable
          title="Add"
          className="rounded p-1"
          style={styles.button}
          onPress={() => {
            if (!newMedicationName) {
              alert("Please provide medication name");
              return;
            }
            addMedication(newMedicationName);
            setMedicationName(null);
          }}
        >
          <Icon name="plus" size={20} color="#fff" />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  borderthick: {
    height: 2,
    borderTopWidth: 2,
    borderColor: ThemeColors.grayborder,
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
  text: {
    fontFamily: FontFamily.poppinsMedium,
    color: ThemeColors.text,
  },
});
