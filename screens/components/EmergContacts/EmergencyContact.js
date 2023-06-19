import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily } from "../../../theme";
import EmergencyContactItem from "./EmergencyContactItem";
import EmergContactForm from "./EmergContactForm";
import {
  authGet,
  authPost,
  authDelete,
} from "../../helpers/authenticatedCalls";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Entypo";
import FocusContact from "./FocusContact";

export default function EmergencyContact({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [person, setPerson] = useState({
    id: "",
    name: "",
    phone: "",
    relationship: "",
    user_id: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [focusContact, setFocusContact] = useState(null);

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
        alert("Contact added successfully");
        setShowForm(false);
      } else {
        alert("Please complete all the fields");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const popUpContact = (id) => {
    setShowContact(true);
    setFocusContact(id);
  };

  const cancelFocus = () => {
    setShowContact(false);
    setFocusContact(null);
  };

  const deleteContactHandler = async (id) => {
    try {
      const response = await authDelete(`/emergencyContacts`, id);
      const data = response.data;
      setContacts(contacts.filter((contact) => contact.id !== id));
      setShowContact(false);
      alert("Contact deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

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
              Emergency Contacts
            </Text>

            <FlatList
              data={contacts}
              keyExtractor={(contact) => contact.id}
              renderItem={({ item }) => (
                <EmergencyContactItem
                  {...item}
                  setShowContact={setShowContact}
                  popUpContact={popUpContact}
                  deleteContactHandler={deleteContactHandler}
                />
              )}
              contentContainerStyle={{ paddingBottom: 200 }}
            />
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.touchableOpacityStyle}
          onPress={() => setShowForm(!showForm)}
        >
          <View style={styles.floatingButton}>
            <Ionicons name="person-add" size={32} color="white" />
          </View>
        </TouchableOpacity>
        {showForm && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showForm}
            onRequestClose={() => setShowForm(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.formContainer}>
                <EmergContactForm
                  addContactHandler={addContactHandler}
                  nameTypeHandler={nameTypeHandler}
                  phoneTypeHandler={phoneTypeHandler}
                  relationshipTypeHandler={relationshipTypeHandler}
                  setShowForm={setShowForm}
                />
              </View>
            </View>
          </Modal>
        )}
        {showContact && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showContact}
            onRequestClose={() => setShowContact(false)}
          >
            <View style={styles.modalContainer}>
              <FocusContact
                focusContact={focusContact}
                cancelFocus={cancelFocus}
                deleteContactHandler={deleteContactHandler}
              />
            </View>
          </Modal>
        )}
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
  card: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    elevation: 3,
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: "#FE0944",
    borderRadius: 50,
    opacity: 0.7,
  },
  floatingButton: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
