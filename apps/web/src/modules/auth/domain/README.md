# Camada `domain` (auth)

Contém entidades, regras de negócio e contratos (interfaces) relacionados à autenticação.

## Exemplo

```ts
// AuthUser.ts
export interface AuthUser {
  id: string;
  email: string;
}
``` 