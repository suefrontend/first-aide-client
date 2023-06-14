import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { authGet } from "../../helpers/authenticatedCalls";

export default function FocusContact(props) {
  const { focusContact, cancelFocus, deleteContactHandler } = props;

  const [focusPerson, setFocusPerson] = useState({
    id: "",
    name: "",
    phone: "",
    relationship: "",
    user_id: "",
  });

  useEffect(() => {
    const getFocusPerson = async () => {
      try {
        const response = await authGet(`/emergencyContacts/${focusContact}`);
        const data = response.data;
        console.log("Focus contact:", data);
        setFocusPerson(data);
      } catch (error) {
        console.log(error);
      }
    };
    getFocusPerson();
  }, []);

  return (
    <View className="rounded-lg bg-white py-4 px-4 mt-5" style={styles.card}>
      <Pressable
        style={styles.cross}
        onPress={() => {
          cancelFocus();
          setFocusPerson({
            id: "",
            name: "",
            phone: "",
            relationship: "",
            user_id: "",
          });
        }}
      >
        <Icon name="close" size={20} color="#c2c2c2" />
      </Pressable>
      <View className="flex-row justify-between items-center">
        <View>
          <View
            className="h-100 w-100 bg-black round-full"
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: "#e3e3e3",
              position: "relative",
            }}
          >
            <Image
              contentFit="cover"
              source={require("../../docs/icons/avatar.png")}
              style={{
                width: 35,
                height: 35,
                position: "absolute",
                top: 8,
                left: 8,
              }}
            />
          </View>
        </View>
        <View>
          <Text className="text-xl mb-1" style={styles.primarycolor}>
            {focusPerson.name}
          </Text>
          <View className="flex-row">
            <Icon name="phone" size={20} color="#c2c2c2" />
            <Text className="ml-1" style={styles.color}>
              {focusPerson.phone}
            </Text>
          </View>
        </View>
        <View></View>
        <View className="rounded px-2 py-1" style={styles.labelbg}>
          <Text style={styles.labeltext}>{focusPerson.relationship}</Text>
        </View>
      </View>
      <Pressable
        title="Add"
        className="mt-4 rounded py-2"
        style={styles.button}
        onPress={() => deleteContactHandler(focusPerson.id)}
      >
        <Text style={{ color: "white" }}>Delete Contact</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    elevation: 3,
  },
  inputsmall: {
    width: "48%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    backgroundColor: "#FE0944",
  },
  cross: {
    alignSelf: "flex-end",
  },
  labelbg: {
    backgroundColor: "#FFECF0",
  },
  labeltext: {
    color: "#ff8aa6",
  },
  primarycolor: {
    color: "#FE0944",
  },
  color: {
    color: "#555",
  },
  bg: {
    backgroundColor: "#FE0944",
  },
  buttonlarge: {
    width: "100%",
  },
});
