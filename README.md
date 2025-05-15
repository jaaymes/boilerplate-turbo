# 🚀 Turbo Boilerplate

<div align="center">
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Next.js-15.2.3-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TurboPack-2.4.2-EF4444?style=for-the-badge&logo=turbo&logoColor=white" alt="Turbo" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-Latest-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
</div>

## 📋 Visão Geral

Este é um boilerplate moderno, pronto para produção, construído com Next.js, React, TypeScript e shadcn/ui. Ele segue princípios de Clean Architecture e DDD para fornecer uma base escalável e de fácil manutenção para seus projetos.

## 🏗️ Estrutura do Projeto

```
├── apps/                 # Aplicações
│   └── web/              # Aplicação web Next.js
├── packages/             # Pacotes compartilhados
│   ├── ui/               # Biblioteca de componentes UI com shadcn/ui
│   ├── eslint-config/    # Configuração compartilhada do ESLint
│   └── typescript-config/# Configuração compartilhada do TypeScript
├── package.json          # package.json raiz
└── turbo.json            # Configuração do Turborepo
```

## 🛠️ Stack Tecnológica

- **Frontend:** React 19, Next.js 15
- **Estilização:** Tailwind CSS
- **Componentes:** shadcn/ui
- **Gerenciamento de Estado:** Zustand
- **Formulários:** React Hook Form com validação Zod
- **HTTP Client:** Axios
- **Autenticação:** JWT (jose)
- **DevOps:** Turborepo para monorepo
- **Gerenciador de Pacotes:** pnpm

## 🚀 Primeiros Passos

### Pré-requisitos

- Node.js (v20 ou superior)
- pnpm (v10.4.1 ou superior)

### Instalação

1. Clone o repositório:
   ```bash
   git clone git@github.com:jaaymes/boilerplate-turbo.git
   cd boilerplate-turbo
   ```

2. Instale as dependências:
   ```bash
   pnpm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env.local` no diretório `/apps/web`:
   ```
   NEXT_PUBLIC_API_URL=https://jctechsolution.zapto.org/api
   NEXT_JWT_SECRET=27a9d45312c3560e2e28e0ce79824688
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🚦 Teste de API

Para fins de teste, você pode usar o seguinte endpoint de API:
```
https://jctechsolution.zapto.org/api
```

## 🖥️ API Backend

A API de teste utilizada neste projeto está disponível em:

- [boilerplate-nest (GitHub)](https://github.com/jaaymes/boilerplate-nest)

Consulte o repositório para detalhes de configuração, endpoints e deploy da API.

## 🔐 Configuração do JWT

Este projeto utiliza JWT para autenticação. A chave secreta está definida no arquivo `.env.local`. Para gerar o hash MD5, utilize:
```
NEXT_JWT_SECRET=27a9d45312c3560e2e28e0ce79824688
```

## 🧩 Adicionando Novos Componentes

Para adicionar componentes do shadcn/ui ao seu projeto:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

Isso instalará o componente no diretório `packages/ui/src/components`.

## 📦 Scripts Disponíveis

- `pnpm dev`: Inicia o servidor de desenvolvimento
- `pnpm build`: Faz o build de todos os apps e pacotes
- `pnpm lint`: Executa o ESLint em todos os apps e pacotes
- `pnpm format`: Formata todos os arquivos com o Prettier
- `pnpm cypress`: Executa os testes Cypress para o app web

## 📊 Arquitetura do Projeto

Este projeto segue os princípios de Domain-Driven Design (DDD) e Clean Architecture:

```
src/
├── app/                # App router do Next.js
├── modules/            # Módulos de domínio (auth, users, etc.)
│   └── [module]/
│       ├── application/    # Casos de uso, serviços
│       ├── domain/         # Entidades, repositórios (interfaces)
│       ├── infrastructure/ # Implementações de repositório, APIs
│       └── presentation/   # Componentes de UI, páginas
├── shared/             # Utilitários e componentes compartilhados
└── styles/             # Estilos globais
```

## 🧪 Testes

Execute os testes do Cypress com:
```bash
pnpm cypress
```

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para enviar um Pull Request.


