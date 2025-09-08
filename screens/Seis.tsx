import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Seis() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [resultado, setResultado] = useState("");

  const handleSalvar = () => {
    if (nome && idade) {
      setResultado(`Nome: ${nome} - Idade: ${idade}`);
    } else {
      setResultado("Por favor, preencha todos os campos.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        />

        <Text style={styles.label}>Idade</Text>
        <TextInput
        style={styles.input}
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
        />

        <Button title="Salvar" onPress={handleSalvar} />

        {resultado ? <Text style={styles.resultado}>{resultado}</Text> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: "#202020ff"
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    color: "#fff",
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    color: "#fff",
  },
});