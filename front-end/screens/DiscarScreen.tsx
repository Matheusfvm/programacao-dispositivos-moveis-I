import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from "react-native";

export default function DiscarScreen() {
    const AbrirDiscador = async () => {
        const phoneNumber = "tel:11999999999";

        try {
            await Linking.openURL(phoneNumber);
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um problema ao tentar abrir o discador.");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={AbrirDiscador}>
                <Text style={styles.buttonText}>Abrir Discador</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222",
    },
    button: {
        backgroundColor: "green",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});