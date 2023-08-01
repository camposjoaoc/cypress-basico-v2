// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//For add new command on Cypress
Cypress.Commands.add("fillMandatoryFieldsAndSubmit", function () {
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
  cy.contains('.button', 'Env').click();
});
