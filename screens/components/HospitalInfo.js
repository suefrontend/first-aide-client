import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";

export default function HospitalInfo() {
  const hospitals = [
    {
      city_id: 1,
      name: "Vancouver General Hospital",
      address: "899 West 12th Avenue",
      phone: "(604)-875-4111",
      hours: "24 hours a day, 7 days a week",
      er_exists: true,
    },
    {
      city_id: 1,
      name: "Vancouver General Hospital",
      address: "899 West 12th Avenue",
      phone: "(604)-875-4111",
      hours: "24 hours a day, 7 days a week",
      er_exists: true,
    },
  ];

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Hospital Information Screen</Text>
    </View>
  );
}
