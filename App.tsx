import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CepScreen from "./screens/CepScreen";
import { CepProvider } from "./contexts/CepContext";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <CepProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="ViaCEP">
          <Drawer.Screen
            name="ViaCEP"
            component={CepScreen}
            options={{ headerTitle: "ViaCEP" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </CepProvider>
  );
}
