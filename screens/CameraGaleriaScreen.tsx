import React, { useState } from "react";
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraGaleriaScreen() {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const abrirGaleria = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const abrirCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            alert("Permissão para usar a câmera foi negada.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView>

            <View style={styles.container}>
                <View style={styles.topRightButtons}>
                    <TouchableOpacity onPress={abrirGaleria} style={styles.iconButton}>
                        <MaterialIcons name="photo" size={30} color="deepskyblue" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={abrirCamera} style={styles.iconButton}>
                        <MaterialIcons name="photo-camera" size={30} color="deepskyblue" />
                    </TouchableOpacity>
                </View>

                {/* Imagem selecionada ou capturada */}
                {imageUri && (
                    <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        padding: 16,
    },
    topRightButtons: {
        position: "absolute",
        top: StatusBar.currentHeight || 0,
        right: 10,
        flexDirection: "row",
        margin: 8,
    },
    iconButton: {
        marginLeft: 12,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 50,
    },
});