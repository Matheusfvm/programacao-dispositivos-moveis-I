import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

type User = {
  id: number;
  nome: string;
  email: string;
  tipo: "admin" | "professor" | "aluno";
};

type AuthContextData = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, senha: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Carrega token/usuário salvos ao abrir app
  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const [[, token], [, userJson]] = await AsyncStorage.multiGet([
          "@token",
          "@user",
        ]);

        if (token && userJson) {
          setUser(JSON.parse(userJson));
        }
      } catch (e) {
        console.log("Erro ao carregar storage", e);
      } finally {
        setLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const signIn = async (email: string, senha: string) => {
    const response = await api.post("/auth/login", { email, senha });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ["@token", token],
      ["@user", JSON.stringify(user)],
    ]);

    setUser(user);
  };

  const signOut = async () => {
    await AsyncStorage.multiRemove(["@token", "@user"]);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
