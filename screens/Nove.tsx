import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

export default function Um() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [funcao, setFuncao] = useState("");
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
        setResultado(`${email} - ${senha} - ${confirmarSenha} - ${funcao}`);
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
                    <Text style={styles.label}>Confirmação da senha</Text>
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
        maxWidth: 270, // largura máxima de 270px
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 16,
        backgroundColor: "#2c2c2c",
    },
    titulo: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#b4d330", // verde do título (igual na imagem)
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
    containerBotao: {
        flexDirection: "row",
        justifyContent: "center"
    },
    botao: {
        backgroundColor: "#f9a825", // amarelo (como na imagem)
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