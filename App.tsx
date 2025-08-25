// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";

import Um from "./screens/Um";
import Dois from "./screens/Dois";
import Tres from "./screens/Tres";
import Quatro from "./screens/Quatro";
import Cinco from "./screens/Cinco";
import Seis from "./screens/Seis";
import Sete from "./screens/Sete";
import Oito from "./screens/Oito";
import Nove from "./screens/Nove";
import Dez from "./screens/Dez";
import { RootStackParamList } from "./types";

const Drawer = createDrawerNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Um"
        screenOptions={({ route }) => ({
          drawerIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "square-outline";

            switch (route.name) {
              case "Um":
                iconName = "grid"; // Exercício 1
                break;
              case "Dois":
                iconName = "book"; // Exercício 2
                break;
              case "Tres":
                iconName = "apps"; // Exercício 3
                break;
              case "Quatro":
                iconName = "trending-up"; // Exercício 4
                break;
              case "Cinco":
                iconName = "business"; // Exercício 5
                break;
              case "Seis":
                iconName = "clipboard"; // Exercício 6
                break;
              case "Sete":
                iconName = "calculator"; // Exercício 7
                break;
              case "Oito":
                iconName = "finger-print"; // Exercício 8
                break;
              case "Nove":
                iconName = "key"; // Exercício 9
                break;
              case "Dez":
                iconName = "mail"; // Exercício 10
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Drawer.Screen name="Um" component={Um} options={{ title: "Exercício 1" }} />
        <Drawer.Screen name="Dois" component={Dois} options={{ title: "Exercício 2" }} />
        <Drawer.Screen name="Tres" component={Tres} options={{ title: "Exercício 3" }} />
        <Drawer.Screen name="Quatro" component={Quatro} options={{ title: "Exercício 4" }} />
        <Drawer.Screen name="Cinco" component={Cinco} options={{ title: "Exercício 5" }} />
        <Drawer.Screen name="Seis" component={Seis} options={{ title: "Exercício 6" }} />
        <Drawer.Screen name="Sete" component={Sete} options={{ title: "Exercício 7" }} />
        <Drawer.Screen name="Oito" component={Oito} options={{ title: "Exercício 8" }} />
        <Drawer.Screen name="Nove" component={Nove} options={{ title: "Exercício 9" }} />
        <Drawer.Screen name="Dez" component={Dez} options={{ title: "Exercício 10" }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
