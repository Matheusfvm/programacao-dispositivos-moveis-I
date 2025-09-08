import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";
import Constants from "expo-constants"

const OrientacaoScreen: React.FC = () => {
    const [ mode, setMode ] = useState("");

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
                orientationInfo.orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN ) {
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

    const getBackgroundColor = () => {
        return mode === "portrait" ? "#FFA500" : "#1E90FF";
    };

    return (
        <SafeAreaView style={[style.safeArea, { backgroundColor: getBackgroundColor() }]}>
            <Text>Tela em modo {mode}</Text>
        </SafeAreaView>
    );

};

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingTop: Constants.statusBarHeight,
    }
})
export default OrientacaoScreen;