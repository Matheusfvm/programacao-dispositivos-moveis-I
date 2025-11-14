import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../services/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  "ClassReport"
>;

type AlunoMatricula = {
  matriculaId: number;
  alunoId: number;
  alunoNome: string;
  p1: number | null;
  p2: number | null;
  p3: number | null;
  mediaFinal: number | null;
  faltas: number;
};

type BoletimDisciplinaResponse = {
  disciplinaId: number;
  disciplina: string;
  professor: string | null;
  alunos: AlunoMatricula[];
};

export default function ReportClassScreen() {
  const navigation = useNavigation<NavProp>();
  const [disciplinaIdInput, setDisciplinaIdInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState<BoletimDisciplinaResponse | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const carregarDisciplina = async () => {
    if (!disciplinaIdInput) {
      Alert.alert("Atenção", "Informe o ID da disciplina.");
      return;
    }

    const idNum = Number(disciplinaIdInput);
    if (isNaN(idNum)) {
      Alert.alert("Erro", "O ID da disciplina deve ser numérico.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.get<BoletimDisciplinaResponse>(
        `/boletim/disciplina/${idNum}`
      );
      setDados(data);
      setErro(null);
    } catch (error: any) {
      console.log(error?.response?.data || error);
      setDados(null);
      setErro(
        error?.response?.data?.message ||
          "Erro ao carregar boletim da disciplina."
      );
    } finally {
      setLoading(false);
    }
  };

  const atualizarMatricula = async (aluno: AlunoMatricula) => {
    try {
      const payload: any = {
        p1: aluno.p1,
        p2: aluno.p2,
        p3: aluno.p3,
        mediaFinal: aluno.mediaFinal,
        faltas: aluno.faltas,
      };

      const { data } = await api.patch(
        `/boletim/matricula/${aluno.matriculaId}`,
        payload
      );

      Alert.alert("Sucesso", data.message || "Matrícula atualizada!");

      // Atualiza no estado local
      if (dados) {
        setDados({
          ...dados,
          alunos: dados.alunos.map((a) =>
            a.matriculaId === aluno.matriculaId ? aluno : a
          ),
        });
      }
    } catch (error: any) {
      console.log(error?.response?.data || error);
      Alert.alert(
        "Erro",
        error?.response?.data?.message ||
          "Erro ao atualizar notas/faltas da matrícula."
      );
    }
  };

  const handleChangeAlunoField = (
    matriculaId: number,
    field: keyof AlunoMatricula,
    value: string
  ) => {
    if (!dados) return;

    const isNumberField =
      field === "p1" ||
      field === "p2" ||
      field === "p3" ||
      field === "mediaFinal" ||
      field === "faltas";

    const parsed = isNumberField
      ? value === ""
        ? null
        : Number(value.replace(",", "."))
      : value;

    setDados({
      ...dados,
      alunos: dados.alunos.map((a) =>
        a.matriculaId === matriculaId
          ? ({
              ...a,
              [field]:
                field === "faltas" && parsed !== null
                  ? Number(parsed)
                  : parsed,
            } as AlunoMatricula)
          : a
      ),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Boletim por Disciplina</Text>

      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="ID da disciplina"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={disciplinaIdInput}
          onChangeText={setDisciplinaIdInput}
        />
        <TouchableOpacity style={styles.buttonBuscar} onPress={carregarDisciplina}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      {erro && !loading && <Text style={styles.error}>{erro}</Text>}

      {dados && !loading && (
        <ScrollView style={{ marginTop: 10 }} contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={styles.headerBox}>
            <Text style={styles.headerDisciplina}>{dados.disciplina}</Text>
            <Text style={styles.headerProfessor}>
              Professor: {dados.professor || "—"}
            </Text>
          </View>

          {dados.alunos.length === 0 ? (
            <Text style={styles.info}>
              Nenhum aluno matriculado nesta disciplina.
            </Text>
          ) : (
            dados.alunos.map((a) => (
              <View key={a.matriculaId} style={styles.card}>
                <Text style={styles.alunoNome}>
                  {a.alunoNome} (ID: {a.alunoId})
                </Text>

                <View style={styles.row}>
                  <TextInput
                    style={[styles.inputNota, styles.inputNotaMenor]}
                    placeholder="P1"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={a.p1 !== null && a.p1 !== undefined ? String(a.p1) : ""}
                    onChangeText={(v) =>
                      handleChangeAlunoField(a.matriculaId, "p1", v)
                    }
                  />
                  <TextInput
                    style={[styles.inputNota, styles.inputNotaMenor]}
                    placeholder="P2"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={a.p2 !== null && a.p2 !== undefined ? String(a.p2) : ""}
                    onChangeText={(v) =>
                      handleChangeAlunoField(a.matriculaId, "p2", v)
                    }
                  />
                  <TextInput
                    style={[styles.inputNota, styles.inputNotaMenor]}
                    placeholder="P3"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={a.p3 !== null && a.p3 !== undefined ? String(a.p3) : ""}
                    onChangeText={(v) =>
                      handleChangeAlunoField(a.matriculaId, "p3", v)
                    }
                  />
                </View>

                <View style={styles.row}>
                  <TextInput
                    style={[styles.inputNota, styles.inputNotaMaior]}
                    placeholder="Média"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={
                      a.mediaFinal !== null && a.mediaFinal !== undefined
                        ? String(a.mediaFinal)
                        : ""
                    }
                    onChangeText={(v) =>
                      handleChangeAlunoField(a.matriculaId, "mediaFinal", v)
                    }
                  />
                  <TextInput
                    style={[styles.inputNota, styles.inputNotaMenor]}
                    placeholder="Faltas"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={String(a.faltas ?? "")}
                    onChangeText={(v) =>
                      handleChangeAlunoField(a.matriculaId, "faltas", v)
                    }
                  />
                </View>

                <TouchableOpacity
                  style={styles.buttonSalvar}
                  onPress={() => atualizarMatricula(a)}
                >
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
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
  container: {
    flex: 1,
    backgroundColor: "#242424",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  input: {
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  buttonBuscar: {
    marginLeft: 8,
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    marginTop: 16,
  },
  error: {
    color: "#ff7777",
    marginTop: 10,
    textAlign: "center",
  },
  headerBox: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  headerDisciplina: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerProfessor: {
    color: "#ccc",
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
  alunoNome: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
  },
  inputNota: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
    marginRight: 6,
    marginTop: 4,
  },
  inputNotaMenor: {
    flex: 1,
  },
  inputNotaMaior: {
    flex: 1.2,
  },
  buttonSalvar: {
    marginTop: 8,
    height: 40,
    backgroundColor: "#28a745",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
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
