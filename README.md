````md
# 🧪 EyeHealth Frontend (Vue 2 + TypeScript)

> Projeto frontend do teste prático EyeCareHealth — usando Vue 2, TypeScript, Vite, Tailwind, Pinia, Cypress e Docker.

---

## 🚀 Tecnologias

- ✅ Vue 2.7 + Vite
- ✅ TypeScript
- ✅ Pinia (state management)
- ✅ TailwindCSS
- ✅ Vitest (unit test)
- ✅ Cypress (e2e test)
- ✅ Docker + GitHub Actions CI

---

## 📦 Instalação

```bash
# Clonar projeto
git clone https://github.com/eyecarehealth/eyehealth-front.git

# Instalar dependências
npm install
````

---

## 🔨 Scripts disponíveis

```bash
npm run dev         # inicia localmente em http://localhost:5173
npm run build       # build de produção
npm run lint        # ESLint
npm run test        # testes unitários (Vitest)
npm run test:e2e    # testes e2e (Cypress)
```

---

## 🧪 Testes

* Unitários: `tests/unit/**`
* E2E: `cypress/e2e/**`

Execute localmente:

```bash
# Unitários
npx vitest

# Cypress
npx cypress open
```

---

## 🐳 Docker

```bash
# Build & start
docker-compose up --build

# Dockerfile
.docker/node.Dockerfile
```

---

## 🗂️ Estrutura

```
src/
├── modules/
│   └── exams/
│       ├── pages/
│       ├── components/
│       ├── services/
│       ├── interfaces/
│       ├── store/
│       └── index.ts
├── components/         # genéricos: BaseButton, Modal, etc.
├── composables/
├── services/
├── stores/
├── styles/
├── router/
└── main.ts
```

---

## 📁 Estrutura de testes

```
tests/unit/modules/exams/examStore.spec.ts
cypress/e2e/modules/exams/flow.spec.ts
cypress/support/e2e.ts
```

---

## 📜 Ambiente `.env.example`

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_API_TOKEN=wQ8ehU2x4gj93CH9lMTnelQO3GcFvLzyqn8Fj3WA0ffQy57I60
```

---

## 🧼 Lint & Formatação

* ESLint + Prettier
* Rodado em CI e local via husky/lint-staged

 