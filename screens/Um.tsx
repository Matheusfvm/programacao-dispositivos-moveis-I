import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Switch
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

export default function Um() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [funcao, setFuncao] = useState("");
    const [logado, setLogado] = useState(false);
    const [resultado, setResultado] = useState("");

    const handleCadastrar = () => {
        if (!email || !senha || !confirmarSenha || !funcao) {
            setResultado("Preencha todos os campos.");
            return;
        }
        if (senha !== confirmarSenha) {
            setResultado("As senhas não coincidem.");
            return;
        }
        setResultado(`${email} - ${senha} - ${confirmarSenha} - ${funcao} - ${logado ? "sim" : "não"}`);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.borda}>
                    <Text style={styles.titulo}>CADASTRO</Text>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect={false}
                        keyboardType="email-address"
                    />

                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry={true}
                        maxLength={8}
                    />
                    <Text style={styles.label}>Confirmação da senha</Text>
                    <TextInput
                        style={styles.input}
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                        secureTextEntry={true}
                        maxLength={8}
                    />
                    <Text style={styles.label}>Confirmação da função</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={funcao}
                            onValueChange={(itemValue) => setFuncao(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Administrador" value="admin" />
                            <Picker.Item label="Gestor" value="manager" />
                            <Picker.Item label="Usuário" value="user" />
                        </Picker>
                    </View>
                    <View style={styles.switchRow}>
                        <Text style={styles.label}>Manter-se conectado</Text>
                        <Switch
                            value={logado}
                            onValueChange={setLogado}
                            trackColor={{ false: "#e77878", true: "#94df83" }}
                            thumbColor={logado ? "#47eb22" : "#ed1111"}
                        />
                    </View>
                    <View style={styles.containerBotao}>
                        <TouchableOpacity onPress={handleCadastrar} style={styles.botao}>
                            <Text style={styles.textoBotao}>Cadastrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botao}>
                            <Text style={styles.textoBotao}>Logar</Text>
                        </TouchableOpacity>
                    </View>


                    {resultado ? <Text style={styles.resultado}>{resultado}</Text> : null}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#2c2c2c",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    borda: {
        width: "90%",
        maxWidth: 270,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 16,
        backgroundColor: "#2c2c2c",
    },
    titulo: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#b4d330",
        textAlign: "center",
        marginBottom: 16,
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
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        marginBottom: 12,
        backgroundColor: "#fff",
    },
    picker: {
        height: 50,
        width: "100%",
    },
    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    containerBotao: {
        flexDirection: "row",
        justifyContent: "center"
    },
    botao: {
        backgroundColor: "#f9a825",
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginHorizontal: 10,
        borderRadius: 6,
        alignItems: "center",
    },
    textoBotao: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 16,
    },
    resultado: {
        marginTop: 20,
        fontSize: 18,
        color: "#fff",
    },
});