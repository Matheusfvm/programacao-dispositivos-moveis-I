# 📚 Scholar – Gestão de Boletins Acadêmicos

Aplicativo mobile (React Native + Expo) com backend em Node.js/Express e banco PostgreSQL para gestão de:

- Usuários (alunos, professores, administradores)
- Disciplinas
- Matrículas (aluno x disciplina)
- Boletins (notas P1, P2, P3, média final e faltas)

O projeto é dividido em duas partes:

- `backend/` – API REST (Node.js + Express + TypeORM + PostgreSQL)
- `frontend/` – Aplicativo mobile (Expo + React Native + TypeScript)

---

## 🧰 Requisitos

Antes de rodar o projeto, instale:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Docker](https://www.docker.com/) e Docker Compose
- Git
- Celular com **Expo Go** instalado **ou** emulador Android/iOS

---

## 📁 Estrutura do Repositório

```bash
.
├── backend/
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── docker-compose.yml
├── frontend/
    ├── src/
    ├── app.json
    ├── package.json
    └── ...

```
---

# 🐘 Banco de Dados (PostgreSQL via Docker)

O banco roda usando o `docker-compose.yml` na raiz do Back-end.

## ▶️ Subir o banco

1️⃣ Entrar na pasta do Back-end

```bash
cd back-end
```
Inicializar o container do bd no docker

2️⃣ Inicializar o container responsável pelo BD

```bash
docker-compose up -d
```

O container iniciará um PostgreSQL com:

| Configuração | Valor     |
| ------------ | --------- |
| Host         | localhost |
| Porta        | 5432      |
| Banco        | boletimdb |
| Usuário      | postgres  |
| Senha        | postgres  |

---

# 🧱 Backend (API – Node.js + Express + TypeORM)
1️⃣ Na pasta "backend" instalar dependências
```bash
npm install
```

2️⃣ Configurar variáveis de ambiente
```bash
cp .env.example .env
```

3️⃣ Edite o arquivo .env conforme necessário. Exemplo:
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=boletimdb
PORT=3000
JWT_SECRET=super_senha_secreta_aqui
```

4️⃣ Scripts disponíveis
```bash
"scripts": {
  "dev": "ts-node-dev --transpile-only --respawn src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

5️⃣ Rodar o backend
```bash
npm run dev
```


Se tudo estiver certo, aparecerá:
```bash
📦 Conectado ao PostgreSQL!
🚀 Servidor rodando na porta 3000
```


A API estará disponível em:
```bash
http://localhost:3000
```

# 📱 Frontend (Expo + React Native + TypeScript)
Em um novo terminal, na pasta raíz do projeto

1️⃣ Entrar na pasta do frontend
```bash
cd frontend
```

2️⃣ Instalar dependências
```bash
npm install
```

3️⃣ Configurar comunicação com a API

Edite o arquivo para alterar a API do serviço BackEnd:

```bash
frontend/src/services/api.ts
```

Exemplo:
```bash
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://SEU_IP_LOCAL:3000/api",
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("@token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

4️⃣ Rodar o aplicativo
```bash
npx expo start --tunnel
```

# 📚 Documentação do Projeto

Para consultar toda a documentação mais detalhada do projeto acesse este [link](https://docs.google.com/document/d/1-WEEBvzLjzXrcOsJv6Izwc8dr50MFjDVkpkH3rCBjaE/edit?usp=sharing)