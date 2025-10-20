import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from "react-native";

export default function YouTubeScreen() {
  const AbrirYoutube = async () => {
    const youtubeURL = "https://www.youtube.com/watch?v=4hsA6Mt1cq4";
    try {
      const supported = await Linking.canOpenURL(youtubeURL);
      if (supported) {
        await Linking.openURL(youtubeURL);
      } else {
        Alert.alert("Erro", "Não foi possível abrir o YouTube.");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um problema ao tentar abrir o YouTube.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={AbrirYoutube}>
        <Text style={styles.buttonText}>Abrir YouTube</Text>
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
    backgroundColor: "red",
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