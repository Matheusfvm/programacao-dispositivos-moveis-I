import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useCep } from "../hooks/useCep";

export default function CepScreen() {
  const { cep, setCep, data, buscarCep } = useCep();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>CEP</Text>
      <TextInput
        style={styles.input}
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
        placeholder="Digite o CEP"
      />

      <TouchableOpacity style={styles.button} onPress={buscarCep}>
        <Text style={styles.buttonText}>Obter</Text>
      </TouchableOpacity>

      {data && (
        <View>
          <Text style={styles.label}>Logradouro: {data.logradouro}</Text>
          <Text style={styles.label}>Localidade: {data.localidade}</Text>
          <Text style={styles.label}>UF: {data.uf}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    justifyContent: "center",
    padding: 16,
  },
  label: {
    color: "#fff",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "yellow",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontWeight: "bold",
  },
});
