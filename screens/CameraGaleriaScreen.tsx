import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraGaleriaScreen() {
  const [imageUris, setImageUris] = useState<string[]>([]);

  const removerImagem = (uriToRemove: any) => {
    // Filtra o array de URIs, mantendo apenas as imagens cujo URI não é o que queremos remover
    const newImageUris = imageUris.filter(uri => uri !== uriToRemove);
    setImageUris(newImageUris);
  };

  const abrirGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUris([...imageUris, result.assets[0].uri]);
    }
  };

  const abrirCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão para usar a câmera foi negada.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUris([...imageUris, result.assets[0].uri]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topRightButtons}>
          <TouchableOpacity onPress={abrirGaleria} style={styles.iconButton}>
            <MaterialIcons name="photo" size={30} color="deepskyblue" />
          </TouchableOpacity>
          <TouchableOpacity onPress={abrirCamera} style={styles.iconButton}>
            <MaterialIcons name="photo-camera" size={30} color="deepskyblue" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {imageUris.map((uri, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image
                source={{ uri }}
                style={styles.image}
                resizeMode="contain"
              />
              <TouchableOpacity
                onPress={() => removerImagem(uri)}
                style={styles.removeButton}
              >
                <MaterialIcons name="close" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
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
    zIndex: 1,
  },
  iconButton: {
    marginLeft: 12,
  },
  scrollContainer: {
    paddingTop: 50,
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  removeButton: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 15,
    padding: 2,
  },
});