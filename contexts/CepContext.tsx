import React, { createContext, useState } from "react";
import api from "../services/api";
import { CepResponse } from "../types/cep";

interface CepContextData {
  cep: string;
  setCep: (cep: string) => void;
  data: CepResponse | null;
  error: string | null;
  buscarCep: () => Promise<void>;
  historico: CepResponse[];
}

export const CepContext = createContext<CepContextData>({} as CepContextData);

export const CepProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cep, setCep] = useState("");
  const [data, setData] = useState<CepResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [historico, setHistorico] = useState<CepResponse[]>([]);

  const buscarCep = async () => {
    try {
      if (!cep) return;
      setError(null);
      setData(null);

      const response = await api.get<any>(`${cep}/json/`);

      if (response.data.erro) {
        setError("CEP inválido");
        return;
      }

      setData(response.data);
      setHistorico((prev) => [...prev, response.data]); // adiciona ao histórico
    } catch (error) {
      setError("Erro ao buscar CEP");
      setData(null);
    }
  };

  return (
    <CepContext.Provider value={{ cep, setCep, data, error, buscarCep, historico }}>
      {children}
    </CepContext.Provider>
  );
};