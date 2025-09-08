import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "react-native";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";

import logo from "./../assets/adaptive-icon.png";

export default function Quatro() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.topo}>
                    <View style={styles.caixaLime}>
                        <Image source={logo} style={styles.logo} resizeMode="contain" />
                    </View>
                    <View style={styles.caixaAquamarine}>
                        <View style={styles.caixaTeal}>
                            <Image source={logo} style={styles.logo} resizeMode="contain" />
                        </View>
                        <View style={styles.caixaSkyblue}>
                            <Image source={logo} style={styles.logo} resizeMode="contain" />
                        </View>
                    </View>
                </View>
                <View style={styles.base}>
                    <Image source={logo} style={styles.logo} resizeMode="contain" />
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
        flexDirection: "row",
    },
    caixaLime: {
        flex: 0.5,
        backgroundColor: "lime",
    },
    caixaAquamarine: {
        flex: 0.5,
        flexDirection: "column",
    },
    caixaTeal: {
        flex: 0.5,
        backgroundColor: "teal"
    },
    caixaSkyblue: {
        flex: 0.5,
        backgroundColor: "skyblue"
    },
    base: {
        flex: 0.5,
        backgroundColor: "salmon",
    },
    logo: {
        flex: 1,
        alignSelf: "center",
    },
});