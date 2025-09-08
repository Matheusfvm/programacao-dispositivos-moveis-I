import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";
import Constants from "expo-constants";

export default function Dois() {
    const [mode, setMode] = useState("");

    useEffect(() => {
        readOrientation();

        return () => {
            ScreenOrientation.removeOrientationChangeListener(subscription);
        };
    }, []);

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

    const getFlexDirection = () => {
        return mode === "portrait" ? "column" : "row";
    };
    return (
        <SafeAreaView style={mode === "portrait" ? stylesPortrait.container : stylesLandscape.container}>
            <View style={mode === "portrait" ? stylesPortrait.top : stylesLandscape.top}>
                <Text>Top</Text>
            </View>
            <View style={mode === "portrait" ? stylesPortrait.middle : stylesLandscape.middle}>
                <Text>Middle</Text>
            </View>
            <View style={mode === "portrait" ? stylesPortrait.bottom : stylesLandscape.bottom}>
                <Text>Bottom</Text>
            </View>
        </SafeAreaView>
    );
}

const stylesPortrait = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingTop: Constants.statusBarHeight,
    },
    top: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#FFA07A',
    },
    middle: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#F08080',
    },
    bottom: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#FF6347',
    }
});

const stylesLandscape = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        paddingTop: Constants.statusBarHeight,
    },
    top: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#F5F5DC',
    },
    middle: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#F0E68C',
    },
    bottom: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#BDB76B',
    }
});
