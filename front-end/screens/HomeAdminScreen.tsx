import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useAuth } from "../hooks/useAuth";

type NavProp = NativeStackNavigationProp<RootStackParamList, "AdminHome">;

type Props = {
  navigation: NavProp;
};

export default function HomeAdminScreen({ navigation }: Props) {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área do Administrador</Text>
      <Text style={styles.subtitle}>Bem-vindo, {user?.nome}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateUser")}
      >
        <Text style={styles.buttonText}>Cadastrar Usuário</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateClass")}
      >
        <Text style={styles.buttonText}>Cadastrar Disciplina</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EnrollStudent")}
      >
        <Text style={styles.buttonText}>Matricular Aluno</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ClassReport")}
      >
        <Text style={styles.buttonText}>Boletim por Disciplina</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.buttonLogout]} onPress={signOut}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  buttonLogout: {
    backgroundColor: "#FF4444",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
