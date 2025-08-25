import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Um() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [resultado, setResultado] = useState("");

    const handleSalvar = () => {
        if (email && senha) {
            setResultado(`${email} - ${senha}`);
        } else {
            setResultado("Por favor, preencha todos os campos.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
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
            <View style={styles.containerBotao}>
                <TouchableOpacity onPress={handleSalvar} style={styles.botao}>
                    <Text style={styles.textoBotao}>Logar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botao}>
                    <Text style={styles.textoBotao}>Cadastrar-se</Text>
                </TouchableOpacity>
            </View>


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