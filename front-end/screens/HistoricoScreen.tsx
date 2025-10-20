import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useCep } from "../hooks/useCep";

export default function HistoricoScreen() {
  const { historico } = useCep();

  return (
    <View style={styles.container}>
      <ScrollView>
        {historico.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text>Logradouro: {item.logradouro}</Text>
            <Text>Localidade: {item.localidade}</Text>
            <Text>UF: {item.uf}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
});