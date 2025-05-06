# 🚀 Turbo Boilerplate

<div align="center">
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Next.js-15.2.3-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TurboPack-2.4.2-EF4444?style=for-the-badge&logo=turbo&logoColor=white" alt="Turbo" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-Latest-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
</div>

## 📋 Overview

This is a modern, production-ready monorepo boilerplate built with Next.js, React, TypeScript, and shadcn/ui. It follows clean architecture and DDD principles to provide a scalable and maintainable foundation for your projects.

## 🏗️ Project Structure

```
├── apps/                 # Application packages
│   └── web/              # Next.js web application
├── packages/             # Shared packages
│   ├── ui/               # UI component library with shadcn/ui
│   ├── eslint-config/    # Shared ESLint configuration
│   └── typescript-config/# Shared TypeScript configuration
├── package.json          # Root package.json
└── turbo.json            # Turborepo configuration
```

## 🛠️ Tech Stack

- **Frontend:** React 19, Next.js 15
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **State Management:** Zustand
- **Form Handling:** React Hook Form with Zod validation
- **HTTP Client:** Axios
- **Authentication:** JWT (jose)
- **DevOps:** Turborepo for monorepo management
- **Package Manager:** pnpm

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or later)
- pnpm (v10.4.1 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:jaaymes/boilerplate-turbo.git
   cd boilerplate-turbo
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the `/apps/web` directory:
   ```
   NEXT_PUBLIC_API_URL=https://jctechsolution.zapto.org/api
   NEXT_JWT_SECRET=27a9d45312c3560e2e28e0ce79824688
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚦 API Testing

For testing purposes, you can use the following API endpoint:
```
https://jctechsolution.zapto.org/api
```

## 🔐 JWT Configuration

This project uses JWT for authentication. The secret key is defined in the `.env.local` file. For MD5 hash generation, you can use:
```
NEXT_JWT_SECRET=27a9d45312c3560e2e28e0ce79824688
```

## 🧩 Adding New Components

To add shadcn/ui components to your project:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will install the component in the `packages/ui/src/components` directory.

## 📦 Available Scripts

- `pnpm dev`: Start the development server
- `pnpm build`: Build all apps and packages
- `pnpm lint`: Run ESLint on all apps and packages
- `pnpm format`: Format all files with Prettier
- `pnpm cypress`: Run Cypress tests for the web app

## 📊 Project Architecture

This project follows Domain-Driven Design (DDD) and Clean Architecture principles:

```
src/
├── app/                # Next.js app router
├── modules/            # Domain modules (auth, users, etc.)
│   └── [module]/
│       ├── application/    # Use cases, services
│       ├── domain/         # Entities, repositories (interfaces)
│       ├── infrastructure/ # Repository implementations, APIs
│       └── presentation/   # UI components, pages
├── shared/             # Shared utilities and components
└── styles/             # Global styles
```

## 🧪 Testing

Run Cypress tests with:
```bash
pnpm cypress
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
