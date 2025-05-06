# Estrutura de Pastas: DDD + Clean Architecture

Este projeto segue os princípios do Domain-Driven Design (DDD) e Clean Architecture para organizar o código de forma escalável e sustentável.

## Estrutura Geral

- `modules/`: Cada módulo representa um subdomínio do sistema (ex: auth, users).
- `shared/`: Código compartilhado entre módulos (ex: componentes, hooks, utilitários).
- `styles/`: Estilos globais e temas.

## Exemplo de Módulo

```
modules/
  users/
    application/
    domain/
    infrastructure/
    presentation/
```

Cada camada tem uma responsabilidade clara:
- **domain**: regras de negócio, entidades, repositórios (interfaces)
- **application**: casos de uso, DTOs, serviços de aplicação
- **infrastructure**: implementações concretas (ex: API, banco de dados)
- **presentation**: componentes/UI, controllers, rotas 