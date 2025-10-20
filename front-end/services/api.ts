import axios from "axios";

const api = axios.create({
  baseURL: "https://sandier-corrina-superplausibly.ngrok-free.dev/api/", // troque pelo IP da sua máquina
  /* timeout: 1000, // opcional: 5 segundos */
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;