import {
  StyleSheet,
  View,
  Text,
  Button,
  Pressable,
  Animated,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Voice from "@react-native-voice/voice";
import { getToken, removeToken } from "../helpers/tokenStorage";
import jwt_decode from "jwt-decode";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { authGet } from "../helpers/authenticatedCalls";
import Loader from "./loading/Loader";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function Recorder(props) {
  const keywords = [
    "cut",
    "abrasions",
    "stings",
    "splinter",
    "sprains",
    "burns",
    "fever",
    "headache",
    "allergies",
    "cough",
    "stomachache",
    "rash",
    "eye injuries",
    "cpr",
    "choking",
    "nosebleed",
    "seizures",
    "allergic reactions",
    "heat exhaustion",
    "fractures",
  ];
  const { logoutHandler, navigation, setInstructionKey, setInstructionDetail } =
    props;
  const [voiceResult, setVoiceResult] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [name, setName] = useState("");
  const [isFetching, setIsFetching] = useState(false); // for loading animation
  const scaleRef = useRef(1);

  const getDecodedName = async () => {
    try {
      const token = await getToken();
      const decoded = jwt_decode(token);
      setName(decoded.name);
    } catch (error) {
      console.log(error);
    }
  };

  const onSpeechStart = (e) => {
    console.log("onSpeechStart: ", e);
  };

  const onSpeechEnd = (e) => {
    console.log("onSpeechEnd: ", e);
  };

  const onSpeechError = (e) => {
    console.log("onSpeechError: ", e);
  };

  const onSpeechResults = (e) => {
    console.log("onSpeechResults: ", e);
    const result = e.value[0];
    setVoiceResult(result);
  };

  const clear = () => {
    setVoiceResult("");
  };

  useEffect(() => {
    getDecodedName();
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const recordHandler = async () => {
    console.log("Recording...");
    setIsRecording(true);
    try {
      await Voice.start("en-US");
    } catch (e) {
      console.error("error:", e);
    }
  };

  const stopRecordingHandler = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (e) {
      console.error("error:", e);
    }
  };

  // Microphone Button Handlers
  const handlePressIn = () => {
    scaleRef.current = 0.9;
    pressableRef.current.setNativeProps({
      style: { transform: [{ scale: scaleRef.current }] },
    });
    recordHandler();
  };
  const handlePressOut = () => {
    scaleRef.current = 1;
    pressableRef.current.setNativeProps({
      style: { transform: [{ scale: scaleRef.current }] },
    });
    stopRecordingHandler();
    setIsFetching(true);
    console.log("Voice Result", voiceResult);

    if (voiceResult === "" || voiceResult === undefined) {
      setIsFetching(false);
      return;
    }

    // split voiceResult into an array of words
    const voiceResultArray = voiceResult.toLowerCase().split(" ");
    console.log("voiceResultArray", voiceResultArray);

    // find the keywords that match the voiceResultArray
    const matchedKeywords = keywords.filter((keyword) =>
      voiceResultArray.includes(keyword)
    );
    console.log("matchedKeywords", matchedKeywords);

    if (matchedKeywords.length === 0) {
      setIsFetching(false);
      alert("Sorry, no match found. Please try again.");
      return;
    } else {
      const key = matchedKeywords[0];

      const fetchInstruction = async () => {
        try {
          const response = await authGet(
            `http://localhost:8000/instructions/${key}`
          );
          console.log("Instructions", response.data);
          setInstructionDetail(response.data.instruction);
        } catch (error) {
          console.log(error);
        }
      };

      fetchInstruction();
      setIsFetching(false);
      setInstructionKey(key);
      navigation.navigate("Instruction");
    }
  };
  const pressableRef = useRef(null);

  return (
    <View
      style={styles.container}
      className="flex-1 items-center justify-center"
    >
      <LinearGradient
        colors={["#FE0944", "#FEAE96"]}
        style={styles.linearGradient}
      >
        <View style={styles.contentBox}>
          <Text className="text-2xl font-bold text-white">Hello, {name}</Text>
          <Text className="text-2xl font-bold text-white">
            Tell me your symptoms
          </Text>
          <View style={styles.voiceBox}>
            {isRecording && (
              <Text className="text-2xl font-bold text-white">
                Recording...
              </Text>
            )}
            {voiceResult !== "" && (
              <Text className="text-2xl font-bold text-white">
                {voiceResult}...
              </Text>
            )}
          </View>
          <Pressable
            ref={pressableRef}
            style={styles.microphoneButton}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <FontAwesome name="microphone" size={50} color="red" />
          </Pressable>
        </View>
        {isFetching && <Loader />}
        <Button title="CLEAR" onPress={clear} />
        <Button title="logout" onPress={logoutHandler} />
        <Button
          title="Go to instructions"
          onPress={() => navigation.navigate("Instruction")}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    width: "100%",
    height: "100%",
  },
  contentBox: {
    marginTop: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  voiceBox: {
    height: 200,
    width: "80%",
  },
  microphoneButton: {
    width: 120,
    height: 120,
    borderRadius: 120,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    zIndex: 3,
  },
});
