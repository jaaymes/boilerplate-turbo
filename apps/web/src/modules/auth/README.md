# Módulo `auth`

Responsável pela autenticação e autorização de usuários.

## Estrutura

- `domain/`: entidades e regras de negócio de autenticação
- `application/`: casos de uso (ex: login, logout)
- `infrastructure/`: integração com serviços externos (ex: API, storage)
- `presentation/`: componentes e rotas de autenticação

## Exemplo

```
domain/
  AuthUser.ts
application/
  loginUser.ts
infrastructure/
  AuthApi.ts
presentation/
  LoginForm.tsx
``` 