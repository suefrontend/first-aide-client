import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import EmergencyContactItem from "./EmergencyContactItem";
import { authGet, authPost } from "../helpers/authenticatedCalls";

export default function EmergencyContact() {
  const [contacts, setContacts] = useState([]);
  const [person, setPerson] = useState({
    name: "",
    phone: "",
    relationship: "",
  });

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await authGet("/emergencyContacts/");
        const data = response.data;
        setContacts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const nameTypeHandler = (text) => {
    setPerson({ ...person, name: text });
  };

  const phoneTypeHandler = (text) => {
    setPerson({ ...person, phone: text });
  };

  const relationshipTypeHandler = (text) => {
    setPerson({ ...person, relationship: text });
  };

  const addContactHandler = async () => {
    try {
      if (person.name && person.phone && person.relationship) {
        const response = await authPost("/emergencyContacts/", person);
        const data = response.data;
        setContacts([...contacts, data]);
        setPerson({ name: "", phone: "", relationship: "" });
      } else {
        alert("Please complete all the fields");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <LinearGradient
        colors={["#FE0944", "#FEAE96"]}
        style={styles.linearGradient}
      >
        <View>
          <View style={styles.wrapper}>
            <View style={styles.contentBox}>
              <Text
                className="py-6 text-2xl font-bold text-white"
                style={styles.headings}
              >
                Emergency Contacts
              </Text>
            </View>
            <FlatList
              data={contacts}
              keyExtractor={(contact) => contact.id}
              renderItem={({ item }) => <EmergencyContactItem {...item} />}
            />
            <View
              className="rounded-lg bg-white py-4 px-4 mt-5"
              style={styles.card}
            >
              {/* <Text className="mb-4 text-lg font-bold" style={styles.color}>
            Add New Contact
          </Text> */}
              <TextInput
                className="bg-gray-200 py-3 px-3 rounded-md"
                placeholder="Name"
                placeholderTextColor="#a9a9a9"
              />
              <View className="flex-row mt-3 justify-between">
                <TextInput
                  className="bg-gray-200 rounded p-3"
                  style={styles.inputsmall}
                  placeholder="Phone number"
                  placeholderTextColor="#a9a9a9"
                />
                <TextInput
                  className="bg-gray-200 rounded p-3"
                  style={styles.inputsmall}
                  placeholder="Relationship"
                  placeholderTextColor="#a9a9a9"
                />
              </View>
              <Pressable
                title="Add"
                className="mt-4 rounded py-2"
                style={styles.button}
              >
                <Text>
                  <Icon name="plus" size={20} color="#fff" />
                </Text>
              </Pressable>
            </View>
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
  linearGradient: {
    width: "100%",
    height: "100%",
  },
  contentBox: {
    marginTop: 90,
    width: "100%",
    justifyContent: "center",
  },
  headings: {
    textShadowColor: "rgba(0, 0, 0, 0.15)",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 2,
  },
  color: {
    color: "#555",
  },
  inputsmall: {
    width: "48%",
  },
  card: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    elevation: 3,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    backgroundColor: "#FE0944",
  },
});
