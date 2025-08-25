import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

import fatecLogo from "../assets/fatec-logo.png";

type Props = NativeStackScreenProps<RootStackParamList, "Onze">;

export default function Onze({ navigation }: Props) {
  const botoes = [
    { label: "Um", rota: "Um" },
    { label: "Dois", rota: "Dois" },
    { label: "Três", rota: "Tres" },
    { label: "Quatro", rota: "Quatro" },
    { label: "Cinco", rota: "Cinco" },
    { label: "Seis", rota: "Seis" },
    { label: "Sete", rota: "Sete" },
    { label: "Oito", rota: "Oito" },
    { label: "Nove", rota: "Nove" },
    { label: "Dez", rota: "Dez" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Image source={fatecLogo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>HOME</Text>

          <View style={styles.grid}>
            {botoes.map((btn, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => navigation.navigate(btn.rota as any)}
              >
                <Text style={styles.buttonText}>{btn.label}</Text>
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
    backgroundColor: "#e0e0e0",
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
    backgroundColor: "#f9a825",
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