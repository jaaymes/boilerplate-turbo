describe("Página de Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("deve renderizar os campos de email e senha e o botão de login", () => {
    cy.contains("Acesse sua conta").should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.contains("Entrar").should("exist");
  });

  it("deve exibir mensagem de erro ao tentar logar com senha incorreta", () => {
    cy.get('input[name="email"]').clear().type("jaaymes@gmail.com");
    cy.get('input[name="password"]').clear().type("senhaerrada");
    cy.contains("Entrar").click();
    cy.get('[data-testid="login-error"]', { timeout: 10000 })
      .should("be.visible")
      .and("contain", "Falha ao realizar login");
  });

  it("deve exibir mensagem de erro ao tentar logar com email incorreto", () => {
    cy.get('input[name="email"]').clear().type("emailerrado@gmail.com");
    cy.get('input[name="password"]').clear().type("@Mudar123");
    cy.contains("Entrar").click();
    cy.get('[data-testid="login-error"]', { timeout: 10000 })
      .should("be.visible")
      .and("contain", "Falha ao realizar login");
  });

  it("deve permitir preencher corretamente e submeter o formulário de login", () => {
    cy.get('input[name="email"]').clear().type("jaaymes@gmail.com");
    cy.get('input[name="password"]').clear().type("@Mudar123");
    cy.contains("Entrar").click();
    cy.location("pathname", { timeout: 10000 }).should("eq", "/home");
  });

  it("deve exibir link para cadastro e redirecionar para a página de cadastro", () => {
    cy.contains("Cadastre-se").click();
    cy.location("pathname", { timeout: 10000 }).should("eq", "/signup");
  });
});
