import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";

export default function MedicalInfo() {
  return (
    <View>
      <LinearGradient
        colors={["#FE0944", "#FEAE96"]}
        style={styles.linearGradient}
      >
        <View style={styles.wrapper}>
          <Text
            className="py-6 text-2xl font-bold text-white"
            style={styles.headings}
          >
            Medical Record
          </Text>
        </View>
        <SafeAreaView>
          <View className="bg-white rounded-lg py-3" style={styles.wrapper}>
            <Text className="text-xl font-bold mb-2 pl-4" style={styles.color}>
              Allegies
            </Text>

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
            <View style={styles.borderthick} />

            <View className="flex-row py-2 justify-between">
              <View style={styles.leftrow}>
                <Text className="text-base pl-4" style={styles.color}>
                  Peanut
                </Text>
              </View>
              <View style={styles.rightrow}>
                <Text className="text-base" style={styles.color}>
                  Severe
                </Text>
              </View>
              <View>
                <Icon
                  name="close"
                  size={20}
                  color="#c2c2c2"
                  style={{ marginRight: 10 }}
                />
              </View>
            </View>
            <View style={styles.borderthin} />
            <View className="flex-row py-2 justify-between">
              <View style={styles.leftrow}>
                <Text className="text-base pl-4" style={styles.color}>
                  Grass
                </Text>
              </View>
              <View style={styles.rightrow}>
                <Text className="text-base" style={styles.color}>
                  Not Severe
                </Text>
              </View>

              <View>
                <Icon
                  name="close"
                  size={20}
                  color="#c2c2c2"
                  style={{ marginRight: 10 }}
                />
              </View>
            </View>
            <View style={styles.borderthin} />

            <View className="flex-row items-center justify-between px-3 py-3">
              <TextInput
                className="bg-gray-200 rounded p-2"
                style={styles.inputsmall}
                placeholder="Allergy"
                placeholderTextColor="#a9a9a9"
              />
              <TextInput
                className="bg-gray-200 rounded p-2"
                style={styles.inputsmall}
                placeholder="Severity"
                placeholderTextColor="#a9a9a9"
              />
              <Pressable
                title="Add"
                className="rounded p-1"
                style={styles.button}
              >
                <Icon name="plus" size={20} color="#fff" />
              </Pressable>
            </View>
            {/**/}
            <Text
              className="text-xl font-bold mb-2 mt-5 pl-4"
              style={styles.color}
            >
              Medications
            </Text>
            <View style={styles.borderthick} />

            <View className="flex-row py-2 justify-between">
              <View>
                <Text className="text-base pl-4" style={styles.color}>
                  Salbutimol Inhaler
                </Text>
              </View>

              <View>
                <Icon
                  name="close"
                  size={20}
                  color="#c2c2c2"
                  style={{ marginRight: 10 }}
                />
              </View>
            </View>
            <View style={styles.borderthin} />
            <View className="flex-row py-2 justify-between">
              <View>
                <Text className="text-base pl-4" style={styles.color}>
                  Clonazepam
                </Text>
              </View>

              <View>
                <Icon
                  name="close"
                  size={20}
                  color="#c2c2c2"
                  style={{ marginRight: 10 }}
                />
              </View>
            </View>
            <View style={styles.borderthin} />

            <View className="flex-row items-center justify-between px-3 py-3">
              <TextInput
                className="bg-gray-200 rounded p-2"
                placeholder="Allergy"
                placeholderTextColor="#a9a9a9"
                style={{ width: "88%" }}
              />

              <Pressable
                title="Add"
                className="rounded p-1"
                style={styles.button}
              >
                <Icon name="plus" size={20} color="#fff" />
              </Pressable>
            </View>

            {/** */}
            <Text
              className="text-xl font-bold mb-2 mt-5 pl-4"
              style={styles.color}
            >
              Conditions
            </Text>
            <View style={styles.borderthick} />

            <View className="flex-row py-2 justify-between">
              <View>
                <Text className="text-base pl-4" style={styles.color}>
                  Asthma
                </Text>
              </View>

              <View>
                <Icon
                  name="close"
                  size={20}
                  color="#c2c2c2"
                  style={{ marginRight: 10 }}
                />
              </View>
            </View>
            <View style={styles.borderthin} />
            <View className="flex-row py-2 justify-between">
              <View>
                <Text className="text-base pl-4" style={styles.color}>
                  Anxiety
                </Text>
              </View>

              <View>
                <Icon
                  name="close"
                  size={20}
                  color="#c2c2c2"
                  style={{ marginRight: 10 }}
                />
              </View>
            </View>
            <View style={styles.borderthin} />

            <View className="flex-row items-center justify-between px-3 py-3">
              <TextInput
                className="bg-gray-200 rounded p-2"
                placeholder="Condition"
                placeholderTextColor="#a9a9a9"
                style={{ width: "88%" }}
              />

              <Pressable
                title="Add"
                className="rounded p-1"
                style={styles.button}
              >
                <Icon name="plus" size={20} color="#fff" />
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
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
