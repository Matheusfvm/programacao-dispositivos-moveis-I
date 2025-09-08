import React from "react";
import { View, StyleSheet, Image, Alert, TouchableOpacity} from "react-native";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";

import logo from "./../assets/adaptive-icon.png";

export default function Cinco() {

    const handlePress = () => {
        Alert.alert("Boa noite!");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handlePress}>

                </TouchableOpacity>
                <View style={styles.topo}>
                    <View style={styles.caixaLime}>
                        <TouchableOpacity onPress={handlePress}>
                            <Image source={logo} style={styles.logo} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.caixaAquamarine}>
                        <View style={styles.caixaTeal}>
                            <TouchableOpacity onPress={handlePress}>
                                <Image source={logo} style={styles.logo} resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.caixaSkyblue}>
                            <TouchableOpacity onPress={handlePress}>
                                <Image source={logo} style={styles.logo} resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.base}>
                    <TouchableOpacity onPress={handlePress}>
                        <Image source={logo} style={styles.logo} resizeMode="contain" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    topo: {
        flex: 0.5,
        flexDirection: "row"
    },
    base: {
        flex: 0.5,
        backgroundColor: "salmon",
        justifyContent: "center",
        alignItems: "center"
    },
    caixaLime: {
        flex: 0.5,
        backgroundColor: "lime",
        justifyContent: "center",
        alignItems: "center"
    },
    caixaAquamarine: {
        flex: 0.5,
        flexDirection: "column",
    },
    caixaTeal: {
        flex: 0.5,
        backgroundColor: "teal",
        justifyContent: "center",
        alignItems: "center"
    },
    caixaSkyblue: {
        flex: 0.5,
        backgroundColor: "skyblue",
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 64,
        height: 64,
    },
});