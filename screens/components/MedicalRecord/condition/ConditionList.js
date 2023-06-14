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
import ConditionItem from "./ConditionItem";
import { authPost } from "../../../helpers/authenticatedCalls";

export default function ConditionList(props) {
  const { conditions, setConditions } = props;

  const [newConditionName, setNewConditionName] = useState(null);

  const addCondition = async (name) => {
    try {
      const response = await authPost("/medicalRecords/conditions", {
        name: name,
      });
      if (response.data.id) {
        alert("Condition added");
        setConditions((prev) => [
          ...prev,
          {
            id: response.data.id,
            name: name,
          },
        ]);
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
      {conditions &&
        conditions.length > 0 &&
        conditions.map((condition) => (
          <ConditionItem
            key={condition.id}
            {...condition}
            setConditions={setConditions}
          />
        ))}

      <View className="flex-row items-center justify-between px-3 py-3">
        <TextInput
          className="bg-gray-200 rounded p-2"
          placeholder="Allergy"
          placeholderTextColor="#a9a9a9"
          value={newConditionName}
          onChangeText={(text) => setNewConditionName(text)}
          style={{ width: "88%" }}
        />
        <Pressable
          title="Add"
          className="rounded p-1"
          style={styles.button}
          onPress={() => {
            if (!newConditionName) {
              alert("Please provide condition name");
              return;
            }
            addCondition(newConditionName);
            setNewConditionName(null);
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    backgroundColor: "#FE0944",
  },
});
