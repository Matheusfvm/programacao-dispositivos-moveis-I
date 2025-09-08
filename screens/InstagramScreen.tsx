import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from "react-native";

export default function InstagramScreen() {
  const AbrirInstagram = async () => {
    const instagramURL = "https://www.instagram.com/fatec_jacarei/";

    try {
      await Linking.openURL(instagramURL);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível abrir o Instagram.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={AbrirInstagram}>
        <Text style={styles.buttonText}>Abrir Instagram</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
  button: {
    backgroundColor: "#C13584", // cor tradicional do Instagram
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});