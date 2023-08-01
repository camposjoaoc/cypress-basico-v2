/// <reference types="Cypress" />

/// basic structure of a test suite
describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    //Action here is on verify/access page
    cy.visit("./src/index.html");
  });

  it("Verifica o título da aplicação", function () {
    // Fetch the title + verify this title (should be equal)
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("Preenche os campos obrigatórios e envia o formulário", function () {
    //Exercise 1
    const longText =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ";

    // The # means the ID of the field (according to programming)
    //FirstName box
    cy.get("#firstName").type("João");

    //LastName box
    cy.get("#lastName").type("Campos");

    //Email box
    cy.get("#email").type("joaocampos963@icloud.com");

    //Text Box
    cy.get("#open-text-area").type(longText, { delay: 0 });

    //Button Send
    //Before cy.get('button[type="submit"]').click();
    cy.contains(".button", "Env").click();
    
    //Validation - success message
    cy.get(".success").should("be.visible");
  });

  it("Exibe mensagem de erro ao submeter o formulário com um email, com formatacão inválida", function () {
    //Exercise 2
    //Email box
    cy.get("#email").type("joaocampos963icloud.com");

    //Button Send
    //Before cy.get('button[type="submit"]').click();
    cy.contains(".button", "Env").click();

    //Validation - error message
    cy.get(".error").should("be.visible");
  });

  it("Exibe mensagem de erro ao submeter o formulário com um telefone, com formatacão inválida", function () {
    //Exercise 3
    //Phone Box
    cy.get("#phone").type("abcdefgh").should("have.value", "");
  });

  it("Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    //Exercise 4
    // The # means the ID of the field (according to programming)
    //FirstName box
    cy.get("#firstName").type("João");

    //LastName box
    cy.get("#lastName").type("Campos");

    //Email box
    cy.get("#email").type("joaocampos963@icloud.com");

    //Text Box
    cy.get("#open-text-area").type("Text");

    //Phone checkbox
    cy.get("#phone-checkbox").click();

    //Button Send
    //Before cy.get('button[type="submit"]').click();
    cy.contains(".button", "Env").click();

    //Validation - error message
    cy.get(".error").should("be.visible");
  });

  it("Preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    //Exercise 5
    const longText =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ";

    // The # means the ID of the field (according to programming)
    //FirstName box
    cy.get("#firstName")
      .type("João")
      .should("have.value", "João")
      .clear()
      .should("have.value", "");

    //LastName box
    cy.get("#lastName")
      .type("Campos")
      .should("have.value", "Campos")
      .clear()
      .should("have.value", "");
    //Email box
    cy.get("#email")
      .type("joaocampos963@icloud.com")
      .should("have.value", "joaocampos963@icloud.com")
      .clear()
      .should("have.value", "");

    //Phone box
    cy.get("#phone")
      .type("46762728973")
      .should("have.value", "46762728973")
      .clear()
      .should("have.value", "");

    //Text Box
    cy.get("#open-text-area")
      .type(longText, { delay: 1 })
      .should("have.value", longText)
      .clear()
      .should("have.value", "");
  });

  it("Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    //Exercise 6

    //Button Send
    //Before cy.get('button[type="submit"]').click();
    cy.contains(".button", "Env").click();

    //Validation - error message
    cy.get(".error").should("be.visible");
  });

  it("Envia o formuário com sucesso usando um comando customizado", function () {
    //Automatic command
    cy.fillMandatoryFieldsAndSubmit();

    //Validation - success message
    cy.get(".success").should("be.visible");
  });

  it("Identifica elementos no botão", function () {
    //Exercise 6

    //Automatic command
    cy.fillMandatoryFieldsAndSubmit();

    //Validation - success message
    cy.get(".success").should("be.visible");
  });
});
