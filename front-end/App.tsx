// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth";

import LoginScreen from "./screens/LoginScreen";
import HomeAdminScreen from "./screens/HomeAdminScreen";
import HomeTeacherScreen from "./screens/HomeTeacherScreen";
import CreateUserScreen from "./screens/CreateUserScreen";
import HomeStudentScreen from "./screens/HomeStudentScreen";
import CreateClassScreen from "./screens/CreateClassScreen";
import EnrollStudentScreen from "./screens/EnrollStudentScreen";

import { View, ActivityIndicator } from "react-native";

export type RootStackParamList = {
  Login: undefined;
  AdminHome: undefined;
  TeacherHome: undefined;
  StudentHome: undefined;
  CreateUser: undefined;
  CreateClass: undefined;
  EnrollStudent: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        // Usuário não logado → mostra Login
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : user.tipo === "admin" ? (
        <>
          <Stack.Screen name="AdminHome" component={HomeAdminScreen} />
          <Stack.Screen name="CreateUser" component={CreateUserScreen} />
          <Stack.Screen name="CreateClass" component={CreateClassScreen} />
          <Stack.Screen name="EnrollStudent" component={EnrollStudentScreen} />
        </>
      ) : user.tipo === "professor" ? (
        <>
          <Stack.Screen name="TeacherHome" component={HomeTeacherScreen} />
          <Stack.Screen name="CreateClass" component={CreateClassScreen} />
          <Stack.Screen name="EnrollStudent" component={EnrollStudentScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="StudentHome" component={HomeStudentScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </AuthProvider>
  );
}
