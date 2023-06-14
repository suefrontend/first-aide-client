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
import AllergyItem from "./AllergyItem";
import { authPost } from "../../../helpers/authenticatedCalls";

export default function AllergyList(props) {
  const { allergies, setAllergies } = props;
  const [newAllergyName, setNewAllergyName] = useState(null);
  const [newAllergySeverity, setNewAllergySeverity] = useState(null);

  const addAllergy = async (name, severity) => {
    try {
      const response = await authPost("/medicalRecords/allergies", {
        name: name,
        severity: severity,
      });
      if (response.status === 200) {
        alert("Allergy added");
        setAllergies((prev) => [
          ...prev,
          {
            id: response.data.id,
            name: name,
            severity: severity,
          },
        ]);
        console.log(allergies);
      } else {
        alert("Oops! Something went wrong. Please try again later.");
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.borderthick} />
      <View className="flex-row py-1 justify-between">
        <View style={styles.leftrow}>
          <Text className="pl-4">Allergy</Text>
        </View>
        <View style={styles.rightrow}>
          <Text className="ml-1">Severity</Text>
        </View>
        <View className="pr-4">
          <Icon
            name="close"
            size={20}
            color="#ffffff"
            // style={{ marginRight: 6 }}
          />
        </View>
      </View>
      <View style={styles.borderthin} />
      {allergies &&
        allergies.length > 0 &&
        allergies.map((allergy) => (
          <AllergyItem
            key={allergy.id}
            {...allergy}
            setAllergies={setAllergies}
          />
        ))}
      <View className="flex-row items-center justify-between px-3 py-3">
        <TextInput
          className="bg-gray-200 rounded p-2"
          style={styles.inputsmall}
          placeholder="Allergy"
          placeholderTextColor="#a9a9a9"
          value={newAllergyName}
          onChangeText={(e) => setNewAllergyName(e)}
        />
        <TextInput
          className="bg-gray-200 rounded p-2"
          style={styles.inputsmall}
          placeholder="Severity"
          placeholderTextColor="#a9a9a9"
          value={newAllergySeverity}
          onChangeText={(e) => setNewAllergySeverity(e)}
        />
        <Pressable
          title="Add"
          className="rounded p-1"
          style={styles.button}
          onPress={() => {
            if (!newAllergyName || !newAllergySeverity) {
              alert("Please fill in all fields");
              return;
            }
            addAllergy(newAllergyName, newAllergySeverity);
            setNewAllergyName(null);
            setNewAllergySeverity(null);
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
