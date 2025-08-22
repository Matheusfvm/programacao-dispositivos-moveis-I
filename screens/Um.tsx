import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";

export default function Um() {
  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <View style={styles.caixaLime} />
        <View style={styles.caixaAquamarine} />
      </View>
      <View style={styles.base} />
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "aquamarine",
  },
  base: {
    flex: 0.5,
    backgroundColor: "salmon",
  },
});