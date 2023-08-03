/// <reference types="Cypress" />
///Class 01 and 02 (2023-07-31)
/// basic structure of a test suite
describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    //Action here is on verify/access page
    cy.visit('./src/index.html');
  });

  it('Check application title', () => {
    // Fetch the title + verify this title (should be equal)
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  //Exercise 1
  it('Fill in the mandatory fields and send the form', () => {
    const longText =
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ';

    // The # means the ID of the field (according to programming)
    //FirstName box
    cy.get('#firstName').type('João');

    //LastName box
    cy.get('#lastName').type('Campos');

    //Email box
    cy.get('#email').type('joaocampos963@icloud.com');

    //Text Box
    cy.get('#open-text-area').type(longText, { delay: 0 });

    //Button Send
    //Before cy.get('button[type="submit"]').click();
    cy.contains('.button', 'Env').click();

    //Validation - success message
    cy.get('.success').should('be.visible');
  });

  //Exercise 2
  it('Displays error message when submitting the form with an email, with invalid formatting', () => {
    //Email box
    cy.get('#email').type('joaocampos963icloud.com');

    //Button Send
    //Before cy.get('button[type="submit"]').click();
    cy.contains('.button', 'Env').click();

    //Validation - error message
    cy.get('.error').should('be.visible');
  });

  //Exercise 3
  it('Displays error message when submitting the form with a phone, with invalid formatting', () => {
    //Phone Box
    cy.get('#phone').type('abcdefgh').should('have.value', '');
  });

  //Exercise 4
  it('Displays error message when phone becomes mandatory but not filled in before form submission', () => {
    // The # means the ID of the field (according to programming)
    //FirstName box
    cy.get('#firstName').type('João');

    //LastName box
    cy.get('#lastName').type('Campos');

    //Email box
    cy.get('#email').type('joaocampos963@icloud.com');

    //Text Box
    cy.get('#open-text-area').type('Text');

    //Phone checkbox
    cy.get('#phone-checkbox').click();

    //Button Send
    //Before cy.get('button[type="submit"]').click();
    cy.contains('.button', 'Env').click();

    //Validation - error message
    cy.get('.error').should('be.visible');
  });

  //Exercise 5
  it('Fill in and clear the first name, last name, email and phone fields', () => {
    const longText =
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ';

    // The # means the ID of the field (according to programming)
    //FirstName box
    cy.get('#firstName')
      .type('João')
      .should('have.value', 'João')
      .clear()
      .should('have.value', '');

    //LastName box
    cy.get('#lastName')
      .type('Campos')
      .should('have.value', 'Campos')
      .clear()
      .should('have.value', '');
    //Email box
    cy.get('#email')
      .type('joaocampos963@icloud.com')
      .should('have.value', 'joaocampos963@icloud.com')
      .clear()
      .should('have.value', '');

    //Phone box
    cy.get('#phone')
      .type('46762728973')
      .should('have.value', '46762728973')
      .clear()
      .should('have.value', '');

    //Text Box
    cy.get('#open-text-area')
      .type(longText, { delay: 1 })
      .should('have.value', longText)
      .clear()
      .should('have.value', '');
  });

  //Exercise 6
  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    //Button Send
    //Before cy.get('button[type="submit"]').click();
    cy.contains('.button', 'Env').click();

    //Validation - error message
    cy.get('.error').should('be.visible');
  });

  //Exercise 7
  it('Displays error message when submitting the form without filling in the mandatory fields', () => {
    //Automatic command
    cy.fillMandatoryFieldsAndSubmit();

    //Validation - success message
    cy.get('.success').should('be.visible');
  });

  //Exercise 8
  it('Identifies elements on the button', () => {
    //Automatic command
    cy.fillMandatoryFieldsAndSubmit();

    //Validation - success message
    cy.get('.success').should('be.visible');
  });

  ///Class 03  (2023-08-03)
  ///Selectors

  //Exercise 0
  it('Select a product (Youtube) by its text', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube');
  });

  //Exercise 1
  it('Select a product (Mentoria) by its value', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria');
  });

  //Exercise 2
  it.only('Select a product (Blog) by its index', () => {
    cy.get('#product').select(1).should('have.value', 'blog');
  }); 
});
