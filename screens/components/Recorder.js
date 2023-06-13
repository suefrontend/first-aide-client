import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Voice from "@react-native-voice/voice";
import { getToken, removeToken } from "../helpers/tokenStorage";
import jwt_decode from "jwt-decode";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { authPost } from "../helpers/authenticatedCalls";
import Loader from "./loading/Loader";
import { FontFamily, ThemeColors } from "../../theme";
import Marquee from "./Marquee";
import AnimatedRing from "./AnimatedRing";

export default function Recorder(props) {
  const { logoutHandler, navigation, setApiResponse } = props;
  const [voiceResult, setVoiceResult] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [name, setName] = useState("");
  const [isFetching, setIsFetching] = useState(false); // for loading animation
  const scaleRef = useRef(1);

  let recordingMessage = isRecording ? "Recording..." : "Tell me your symptoms";

  const setRecording = (value) => {
    setIsRecording(value);
  };

  // "Hello, name"
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
    clear();
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
      clear();
      return;
    } else {
      const fetchInstruction = async () => {
        try {
          const response = await authPost(`/instructions/`, {
            input: voiceResult,
          });
          const title = response.data.title;
          const instruction = response.data.instructions;
          if (instruction === "") {
            setIsFetching(false);
            clear();
            return;
          }
          setApiResponse({ title, instruction });
        } catch (error) {
          console.log(error);
        }
      };
      setIsFetching(true);
      fetchInstruction().then(() => {
        navigation.navigate("Instruction");
        setIsFetching(false);
      });
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
          <Text
            className="text-xl font-bold text-white py-3 mt-6"
            style={[styles.subtitle, styles.textshadow]}
          >
            Hello, {name}
          </Text>
          <View style={styles.voicebox}>
            <Text
              className="text-4xl font-bold text-white"
              style={[styles.title, styles.textshadow]}
            >
              {recordingMessage}
            </Text>
            {voiceResult !== "" && (
              <Text
                className="text-2xl font-bold text-white text-center"
                style={[styles.result, styles.textshadow]}
              >
                {voiceResult}...
              </Text>
            )}
          </View>
          <View>
            <View
              className="flex-column items-center justify-center py-14"
              style={styles.mic}
            >
              <Pressable
                ref={pressableRef}
                style={styles.microphoneButton}
                onPressIn={() => {
                  setRecording(true);
                  handlePressIn();
                }}
                onPressOut={() => {
                  handlePressOut();
                  setRecording(false);
                }}
              >
                {/* Default two rings */}
                {!isRecording && (
                  <>
                    <View style={styles.ring2} />
                    <View style={styles.ring1} />
                  </>
                )}
                {isRecording && (
                  <>
                    <AnimatedRing
                      delay={0}
                      scale={0.5}
                      isRecording={isRecording}
                    />
                    <AnimatedRing
                      delay={1000}
                      scale={1}
                      isRecording={isRecording}
                    />
                    <AnimatedRing
                      delay={2000}
                      scale={1}
                      isRecording={isRecording}
                    />
                    <AnimatedRing
                      delay={3000}
                      scale={1}
                      isRecording={isRecording}
                    />
                  </>
                )}
                <FontAwesome name="microphone" size={60} style={styles.red} />
              </Pressable>
            </View>
          </View>
          <View style={styles.temp}>
            {isFetching && <Loader />}
            <Pressable onPress={logoutHandler} style={{ borderWidth: 1 }}>
              <Text>Logout</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Instruction")}
              style={{ borderWidth: 1 }}
            >
              <Text>Instructions</Text>
            </Pressable>
          </View>
        </View>
        {/* More Instructions Section */}
        {/* <View className="mt-11" style={styles.instructions}> */}
          {/* <Text
            className="text-white text-lg py-1"
            style={[styles.text, styles.textshadow]}
          >
            More Instructions
          </Text> */}
          {/* <Marquee /> */}
        {/* </View> */}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
    textAlign: "center",
    lineHeight: 50,
    textTransform: "capitalize",
  },
  subtitle: {
    textAlign: "center",
    fontFamily: FontFamily.poppinsSemibold,
  },
  text: {
    fontFamily: FontFamily.poppinsSemibold,
  },
  textshadow: {
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 2,
  },
  red: {
    color: ThemeColors.red,
  },
  contentBox: {
    marginTop: 30,
  },
  voicebox: {
    height: 100,
  },
  temp: {
    position: "absolute",
    top: 400,
    right: 0,
  },
  microphoneButton: {
    width: 140,
    height: 140,
    borderRadius: 120,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    zIndex: 3,
    position: "absolute",
    top: 60,
  },
  instructions: {
    position: "absolute",
    bottom: 10,
  },
  ring1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  ring2: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 140,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
});
