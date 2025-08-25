import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";


import fatecLogo from "../assets/fatec-logo.png";

export default function Home() {
  const botoes = [
    "Um", "Dois",
    "Três", "Quatro",
    "Cinco", "Seis",
    "Sete", "Oito",
    "Nove", "Dez",
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.box}>
          {/* Logo */}
          <Image source={fatecLogo} style={styles.logo} resizeMode="contain" />

          {/* Texto HOME */}
          <Text style={styles.title}>HOME</Text>

          {/* Grid de botões */}
          <View style={styles.grid}>
            {botoes.map((btn, index) => (
              <TouchableOpacity key={index} style={styles.button}>
                <Text style={styles.buttonText}>{btn}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e0e0e0", // fundo cinza claro
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  box: {
    width: "90%",
    maxWidth: 320,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    width: "48%",
    backgroundColor: "#f9a825", // amarelo
    paddingVertical: 12,
    marginBottom: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});