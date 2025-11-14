import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type NavProp = NativeStackNavigationProp<RootStackParamList, "StudentReport">;

type BoletimItem = {
  disciplinaId: number;
  disciplina: string;
  professor: string | null;
  p1: number | null;
  p2: number | null;
  p3: number | null;
  mediaFinal: number | null;
  faltas: number;
};

export default function ReportStudentScreen() {
  const navigation = useNavigation<NavProp>();
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState<BoletimItem[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  const carregarBoletim = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<BoletimItem[]>("/boletim/me");
      setDados(data);
      setErro(null);
    } catch (error: any) {
      console.log(error?.response?.data || error);
      setErro(
        error?.response?.data?.message ||
          "Erro ao carregar boletim do aluno."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarBoletim();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Meu Boletim</Text>

      {erro && <Text style={styles.error}>{erro}</Text>}

      {dados.length === 0 && !erro ? (
        <Text style={styles.info}>Você ainda não possui matrículas.</Text>
      ) : (
        <FlatList
          data={dados}
          keyExtractor={(item) => String(item.disciplinaId)}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.disciplina}>{item.disciplina}</Text>
              <Text style={styles.professor}>
                Professor: {item.professor || "—"}
              </Text>
              <Text style={styles.linhaNota}>
                P1: {item.p1 ?? "—"} | P2: {item.p2 ?? "—"} | P3:{" "}
                {item.p3 ?? "—"}
              </Text>
              <Text style={styles.linhaNota}>
                Média Final: {item.mediaFinal ?? "—"}
              </Text>
              <Text style={styles.linhaNota}>Faltas: {item.faltas}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.buttonVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: "#242424",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#242424",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  error: {
    color: "#ff7777",
    textAlign: "center",
    marginBottom: 10,
  },
  info: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  disciplina: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  professor: {
    color: "#ccc",
    marginBottom: 4,
  },
  linhaNota: {
    color: "#fff",
    fontSize: 14,
  },
  buttonVoltar: {
    height: 50,
    backgroundColor: "#555",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
