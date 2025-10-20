
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";
import Constants from "expo-constants";

export default function Dois() {
    const [mode, setMode] = useState("");
    const [name, setName] = useState("");
    const [names, setNames] = useState<string[]>([]);

    useEffect(() => {
        readOrientation();

        const subscription = ScreenOrientation.addOrientationChangeListener(
            ({ orientationInfo }) => {
                if (
                    orientationInfo.orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
                    orientationInfo.orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN) {
                    setMode("portrait");
                } else if (
                    orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
                    orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
                ) {
                    setMode("landscape");
                };
            }
        );

        return () => {
            ScreenOrientation.removeOrientationChangeListener(subscription);
        };
    }, []);

    const readOrientation = async () => {
        const orientation = await ScreenOrientation.getOrientationAsync();
        if (
            orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN ||
            orientation === ScreenOrientation.Orientation.PORTRAIT_UP
        ) {
            setMode("portrait");
        } else if (
            orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
            orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
        ) {
            setMode("landscape");
        }
    };

    const addName = () => {
        if (name.trim() !== "") {
            setNames([...names, name]);
            setName("");
        }
    };

    const renderItem = ({ item }: { item: string }) => (
        <View style={mode === "portrait" ? stylesPortrait.listItem : stylesLandscape.listItem}>
            <Text>{item}</Text>
        </View>
    );

    return (
        <SafeAreaView style={mode === "portrait" ? stylesPortrait.container : stylesLandscape.container}>
            <View style={mode === "portrait" ? stylesPortrait.top : stylesLandscape.top}>
                <Text>Exercício 5</Text>
            </View>
            <View style={mode === "portrait" ? stylesPortrait.base : stylesLandscape.base}>
                <View style={mode === "portrait" ? stylesPortrait.inputContainer : stylesLandscape.inputContainer}>
                    <Text>Nome</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setName}
                        value={name}
                        placeholder="Nome completo"
                        onSubmitEditing={addName}
                        returnKeyType="done"
                    />
                </View>
                <FlatList
                    style={mode === "portrait" ? stylesPortrait.list : stylesLandscape.list}
                    data={names}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
});

const stylesPortrait = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingTop: Constants.statusBarHeight,
    },
    top: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#FFA07A',
    },
    inputContainer: {
        flex: 0.1,
        padding: 10,
        backgroundColor: '#F08080',
        alignItems: 'center',
    },
    list: {
        flex: 0.9,
        backgroundColor: '#FF6347',
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    base: {
        flex: 1,
        flexDirection: "column"
    }
});

const stylesLandscape = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingTop: Constants.statusBarHeight,
    },
    top: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#F5F5DC',
    },
    inputContainer: {
        flex: 0.5,
        padding: 10,
        backgroundColor: '#F0E68C',
    },
    list: {
        flex: 0.5,
        backgroundColor: '#BDB76B',
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    base: {
        flex: 1,
        flexDirection: "row",
    },
});
