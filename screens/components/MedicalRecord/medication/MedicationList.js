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

export default function MedicationList() {
  return (
    <>
      <View style={styles.borderthick} />
      <FlatList
        data={medications}
        keyExtractor={(medication) => medication.id}
        renderItem={({ item }) => <MedicalInfoTable {...item} />}
      />
      <View className="flex-row items-center justify-between px-3 py-3">
        <TextInput
          className="bg-gray-200 rounded p-2"
          placeholder="Allergy"
          placeholderTextColor="#a9a9a9"
          style={{ width: "88%" }}
        />
        <Pressable title="Add" className="rounded p-1" style={styles.button}>
          <Icon name="plus" size={20} color="#fff" />
        </Pressable>
      </View>
    </>
  );
}
