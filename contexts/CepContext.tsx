import React, { createContext, useState } from "react";
import api from "../services/api";
import { CepResponse } from "../types/cep";

interface CepContextData {
  cep: string;
  setCep: (cep: string) => void;
  data: CepResponse | null;
  buscarCep: () => Promise<void>;
}

export const CepContext = createContext<CepContextData>({} as CepContextData);

export const CepProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cep, setCep] = useState("");
  const [data, setData] = useState<CepResponse | null>(null);

  const buscarCep = async () => {
    try {
      if (!cep) return;
      const response = await api.get<CepResponse>(`${cep}/json/`);
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setData(null);
    }
  };

  return (
    <CepContext.Provider value={{ cep, setCep, data, buscarCep }}>
      {children}
    </CepContext.Provider>
  );
};
