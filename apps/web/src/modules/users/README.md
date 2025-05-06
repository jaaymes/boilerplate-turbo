# Módulo `users`

Responsável pela gestão de usuários do sistema.

## Estrutura

- `domain/`: entidades e regras de negócio de usuários
- `application/`: casos de uso (ex: criar, editar, listar usuários)
- `infrastructure/`: integração com banco de dados ou APIs
- `presentation/`: componentes e rotas de usuários

## Exemplo

```
domain/
  User.ts
application/
  createUser.ts
infrastructure/
  UserRepository.ts
presentation/
  UserList.tsx
``` 