import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

type NavProp = NativeStackNavigationProp<RootStackParamList, "CreateClass">;

interface Props {
  navigation: NavProp;
}

export default function CreateClassScreen({ navigation }: Props) {
  const { user } = useAuth();
  const [nome, setNome] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [professorId, setProfessorId] = useState("");

  const handleCreateClass = async () => {
    if (!nome || !cargaHoraria || !professorId) {
      Alert.alert("Atenção", "Preencha nome e carga horária.");
      return;
    }

    let idProfessor: number | null = null;

    if (user?.tipo === "professor") {
      idProfessor = user.id; // professor logado será o responsável
    } else {
      if (!professorId) {
        Alert.alert("Atenção", "Informe o ID do professor.");
        return;
      }
      idProfessor = Number(professorId);
      if (isNaN(idProfessor)) {
        Alert.alert("Erro", "O ID do professor deve ser numérico.");
        return;
      }
    }

    try {
      const payload = {
        nome,
        cargaHoraria: Number(cargaHoraria),
        professorId: idProfessor,
      };

      const { data } = await api.post("/classes", payload);

      Alert.alert("Sucesso", data.message || "Disciplina cadastrada!");
      setNome("");
      setCargaHoraria("");
      setProfessorId("");

      navigation.goBack();
    } catch (error: any) {
      console.log(error?.response?.data || error);
      Alert.alert(
        "Erro",
        error?.response?.data?.message || "Erro ao cadastrar disciplina."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Disciplina</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da disciplina"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Carga horária (ex: 80)"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={cargaHoraria}
        onChangeText={setCargaHoraria}
      />

      {user?.tipo === "professor" ? (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Professor responsável: {user.nome} (ID: {user.id})
          </Text>
        </View>
      ) : (
        <TextInput
          style={styles.input}
          placeholder="ID do professor responsável"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={professorId}
          onChangeText={setProfessorId}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleCreateClass}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  infoBox: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoText: {
    color: "#fff",
    fontSize: 14,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#28a745",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
