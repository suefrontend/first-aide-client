import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  disclaimerText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonLabel: {
    fontSize: 16,
    color: 'blue',
  },
});

export default function Disclaimer() {
  const [visible, setVisible] = useState(true);

  const hideModal = () => setVisible(false);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Text style={styles.disclaimerText}>
            Disclaimer:
            The information provided by this first aid instructional app is for general guidance and educational purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider or medical professional for any specific medical condition, injury, or emergency.
          </Text>
          <Text style={styles.disclaimerText}>
            The instructions and techniques provided in this app are based on general first aid guidelines and may not be suitable or effective for every situation. Different injuries and medical conditions may require specific treatment or interventions that are beyond the scope of this app.
          </Text>
          <Text style={styles.disclaimerText}>
            While we strive to provide accurate and up-to-date information, we cannot guarantee the completeness, accuracy, or reliability of the content. The app developers, content providers, and contributors are not liable for any errors or omissions in the information provided or for any actions taken based on the information contained in this app.
          </Text>
          <Text style={styles.disclaimerText}>
            It is important to remember that first aid techniques are not a substitute for professional medical care. If you or someone else is experiencing a medical emergency or severe injury, immediately call your local emergency services or go to the nearest emergency room.
          </Text>
          <Text style={styles.disclaimerText}>
            By using this first aid instructional app, you acknowledge and agree to the above disclaimer and understand the limitations of the information provided.
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={hideModal}>
            <Text style={styles.closeButtonLabel}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
