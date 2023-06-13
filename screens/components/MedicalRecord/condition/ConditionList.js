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

export default function ConditionList() {
  return (
    <>
      <Text className="text-xl font-bold mb-2 mt-5 pl-4" style={styles.color}>
        Conditions
      </Text>
      <FlatList
        data={conditions}
        keyExtractor={(condition) => condition.id}
        renderItem={({ item }) => <MedicalInfoTable {...item} />}
      />
    </>
  );
}
