import React, { useEffect, useState } from "react";
import Voice from "@react-native-voice/voice";

export default function SpeechVoice(props) {
  const { setVoiceResult, setIsRecording } = props;

  useEffect(() => {
    let isUnmounted = false;

    const onSpeechStart = (e) => {
      if (!isUnmounted) {
        console.log("onSpeechStart: ", e);
      }
    };

    const onSpeechEnd = (e) => {
      if (!isUnmounted) {
        console.log("onSpeechEnd: ", e);
      }
    };

    const onSpeechError = (e) => {
      if (!isUnmounted) {
        console.log("onSpeechError: ", e);
      }
    };

    const onSpeechResults = (e) => {
      if (!isUnmounted) {
        console.log("onSpeechResults: ", e);
        const result = e.value[0];
        setVoiceResult(result);
      }
    };

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    const startRecording = async () => {
      console.log("Recording...");
      try {
        await Voice.start("en-US");
      } catch (e) {
        console.error("error:", e);
      }
    };

    const stopRecording = async () => {
      try {
        await Voice.stop();
      } catch (e) {
        console.error("error:", e);
      }
    };

    if (!isUnmounted) {
      setIsRecording(true);
      startRecording();
    }

    return () => {
      isUnmounted = true;
      setIsRecording(false);
      stopRecording();
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return null;
}
