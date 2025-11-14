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

type NavProp = NativeStackNavigationProp<RootStackParamList, "EnrollStudent">;

interface Props {
  navigation: NavProp;
}

export default function EnrollStudentScreen({ navigation }: Props) {
  const { user } = useAuth();
  const [classId, setClassId] = useState("");
  const [alunoId, setAlunoId] = useState("");

  const handleEnroll = async () => {
    if (!classId || !alunoId) {
      Alert.alert("Atenção", "Informe o ID da disciplina e o ID do aluno.");
      return;
    }

    const classIdNum = Number(classId);
    const alunoIdNum = Number(alunoId);

    if (isNaN(classIdNum) || isNaN(alunoIdNum)) {
      Alert.alert("Erro", "Os IDs devem ser numéricos.");
      return;
    }

    try {
      const payload = { classId: classIdNum, alunoId: alunoIdNum };

      const { data } = await api.post("/classes/matricular", payload);

      Alert.alert("Sucesso", data.message || "Aluno matriculado com sucesso!");
      setClassId("");
      setAlunoId("");

      navigation.goBack();
    } catch (error: any) {
      console.log(error?.response?.data || error);
      Alert.alert(
        "Erro",
        error?.response?.data?.message || "Erro ao matricular aluno."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Matricular Aluno</Text>

      <Text style={styles.subtitle}>
        Usuário logado: {user?.nome} ({user?.tipo})
      </Text>

      <TextInput
        style={styles.input}
        placeholder="ID da disciplina"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={classId}
        onChangeText={setClassId}
      />

      <TextInput
        style={styles.input}
        placeholder="ID do aluno"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={alunoId}
        onChangeText={setAlunoId}
      />

      <TouchableOpacity style={styles.button} onPress={handleEnroll}>
        <Text style={styles.buttonText}>Matricular</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonBack]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Voltar</Text>
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
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 12,
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
  buttonBack: {
    backgroundColor: "#555",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
