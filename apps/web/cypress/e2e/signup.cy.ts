describe("Página de Cadastro", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("deve renderizar todos os campos do formulário de cadastro", () => {
    cy.contains("Crie sua conta").should("exist");
    cy.get('input[name="avatar"]').should("exist");
    cy.get('input[name="name"]').should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('input[name="confirmPassword"]').should("exist");
    cy.contains("Criar conta").should("exist");
    cy.contains("Voltar").should("exist");
  });

  it("deve validar campos obrigatórios", () => {
    // Tenta enviar o formulário vazio
    cy.contains("Criar conta").click();

    // Verifica se os erros de validação são exibidos
    cy.contains("Nome é obrigatório").should("exist");
    cy.contains("Email é obrigatório").should("exist");
    cy.contains("Senha é obrigatória").should("exist");
  });

  it("deve validar formato de email inválido", () => {
    cy.get('input[name="email"]').type("emailinvalido");
    cy.get('input[name="name"]').click(); // Clica em outro campo para ativar validação
    cy.contains("Email inválido").should("exist");
  });

  it("deve testar os requisitos de senha", () => {
    const testarRequisito = (
      senha: string,
      requisitoIndex: number,
      devePassar: boolean
    ) => {
      cy.get('input[name="password"]').clear().type(senha);
      cy.get("ul li")
        .eq(requisitoIndex)
        .should(devePassar ? "have.class" : "not.have.class", "text-green-600");
    };

    // Testa requisito de 8 caracteres
    testarRequisito("123", 0, false);
    testarRequisito("12345678", 0, true);

    // Testa requisito de letra maiúscula
    testarRequisito("abcdefgh", 1, false);
    testarRequisito("Abcdefgh", 1, true);

    // Testa requisito de número
    testarRequisito("Abcdefgh", 2, false);
    testarRequisito("Abcdefg1", 2, true);

    // Testa requisito de caractere especial
    testarRequisito("Abcdefg1", 3, false);
    testarRequisito("Abcdefg1@", 3, true);
  });

  it("deve validar se as senhas coincidem", () => {
    // Preencher outros campos necessários
    cy.get('input[name="name"]').type("Usuário Teste");
    cy.get('input[name="email"]').type("test@example.com");

    // Preencher senhas diferentes
    cy.get('input[name="password"]').type("Senha@123");
    cy.get('input[name="confirmPassword"]').type("Senha@diferente");

    // Clicar no botão para submeter
    cy.get('button[type="submit"]').click();

    // Verificar mensagem de erro - mudar seletor e texto
    cy.contains("As senhas não coincidem").should("exist");
  });

  it("deve redirecionar para a página de login ao clicar em Voltar", () => {
    cy.contains("Voltar").click();
    cy.location("pathname").should("eq", "/login");
  });

  it("deve permitir preencher corretamente e submeter o formulário de cadastro", () => {
    // Interceptar requisições para a API
    cy.intercept("POST", "**/signup").as("signupRequest");

    // Gerar email aleatório para evitar conflitos
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    const email = `teste.${timestamp}.${random}@example.com`;

    cy.get('input[name="avatar"]').type("https://exemplo.com/avatar.jpg");
    cy.get('input[name="name"]').type("Usuário Teste");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type("Senha@123");
    cy.get('input[name="confirmPassword"]').type("Senha@123");

    cy.contains("Criar conta").click();

    // Aguardar a requisição e verificar redirecionamento
    cy.wait("@signupRequest").then((interception) => {
      // Se não for 409, deveria ser sucesso e redirecionar
      if (interception.response?.statusCode !== 409) {
        cy.location("pathname", { timeout: 10000 }).should("eq", "/login");
      }
    });
  });

  it("deve lidar com erro 409 (usuário já existe) e tentar com email aleatório", () => {
    // Função para gerar um email aleatório
    const gerarEmailAleatorio = () => {
      const timestamp = new Date().getTime();
      const random = Math.floor(Math.random() * 10000);
      return `usuario.teste.${timestamp}.${random}@example.com`;
    };

    // Função para preencher o formulário com um email
    const preencherFormulario = (email: string) => {
      cy.get('input[name="avatar"]')
        .clear()
        .type("https://exemplo.com/avatar.jpg");
      cy.get('input[name="name"]').clear().type("Usuário Teste");
      cy.get('input[name="email"]').clear().type(email);
      cy.get('input[name="password"]').clear().type("Senha@123");
      cy.get('input[name="confirmPassword"]').clear().type("Senha@123");
      cy.contains("Criar conta").click();
    };

    // Interceptar requisições para a API
    cy.intercept("POST", "**/signup").as("signupRequest");

    // Tentar o primeiro cadastro
    let tentativas = 0;
    const maxTentativas = 5;
    const tentarCadastro = () => {
      if (tentativas >= maxTentativas) {
        throw new Error(`Falha após ${maxTentativas} tentativas`);
      }

      const email = gerarEmailAleatorio();
      preencherFormulario(email);

      cy.wait("@signupRequest").then((interception) => {
        tentativas++;
        // Se receber um 409, tentar novamente com outro email
        if (interception.response?.statusCode === 409) {
          cy.log(`Email ${email} já existe. Tentando novamente...`);
          // Verificar se a mensagem de erro aparece
          cy.get('[data-testid="login-error"]').should(
            "contain",
            "Usuário já existe"
          );
          tentarCadastro(); // Tentar novamente com um novo email
        } else {
          // Se não for 409, deveria ser sucesso
          cy.location("pathname", { timeout: 10000 }).should("eq", "/login");
        }
      });
    };

    tentarCadastro();
  });
});
