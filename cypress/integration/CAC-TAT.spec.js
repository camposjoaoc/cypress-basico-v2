/// <reference types="Cypress" />
///Class 01 and 02 (2023-07-31)
/// basic structure of a test suite
describe('Central de Atendimento ao Cliente TAT', () => {
  const THREE_SECONDS_IN_MS = 3000;
  beforeEach(() => {
    //Action here is on verify/access page
    cy.visit('./src/index.html');
  });

  it('Check application title', () => {
    // Fetch the title + verify this title (should be equal)
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  //Exercise 1
  Cypress._.times(2, () => {
    //function to repeat the test 5 times
    it('Fill in the mandatory fields and send the form', () => {
      const longText =
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ';
      cy.clock(); // freeze browser time
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

      //Validation 1 - success message
      cy.get('.success').should('be.visible');

      cy.tick(THREE_SECONDS_IN_MS); //advance in time
      //Validation 2 - success message (not visible)
      cy.get('.success').should('not.be.visible');
    });
  });

  //Exercise 2
  it('Displays error message when submitting the form with an email, with invalid formatting', () => {
    cy.clock(); // freeze browser time
    //Email box
    cy.get('#email').type('joaocampos963icloud.com');

    //Button Send
    //Before cy.get('button[type="submit"]').click();
    cy.contains('.button', 'Env').click();

    //Validation 1 - error message
    cy.get('.error').should('be.visible');

    cy.tick(THREE_SECONDS_IN_MS); //advance in time
    //Validation 2 - error message
    cy.get('.error').should('not.be.visible');
  });

  //Exercise 3
  it('Displays error message when submitting the form with a phone, with invalid formatting', () => {
    //Phone Box
    cy.get('#phone').type('abcdefgh').should('have.value', '');
  });

  //Exercise 4
  it('Displays error message when phone becomes mandatory but not filled in before form submission', () => {
    cy.clock(); // freeze browser time
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

    //Validation 1 - error message
    cy.get('.error').should('be.visible');

    cy.tick(THREE_SECONDS_IN_MS); //advance in time
    //Validation 2 - error message
    cy.get('.error').should('not.be.visible');
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
      .type(longText, { delay: 0 })
      .should('have.value', longText)
      .clear()
      .should('have.value', '');
  });

  //Exercise 6
  it('Displays error message when submitting the form without filling in the required fields', () => {
    cy.clock(); // freeze browser time
    //Button Send
    //Before cy.get('button[type="submit"]').click();
    cy.contains('.button', 'Env').click();

    //Validation 1 - error message
    cy.get('.error').should('be.visible');

    cy.tick(THREE_SECONDS_IN_MS); //advance in time
    //Validation 2 - error message
    cy.get('.error').should('not.be.visible');
  });

  //Exercise 7
  it('Displays error message when submitting the form without filling in the mandatory fields', () => {
    cy.clock(); // freeze browser time
    //Automatic command
    cy.fillMandatoryFieldsAndSubmit();

    //Validation 1 - success message
    cy.get('.success').should('be.visible');

    cy.tick(THREE_SECONDS_IN_MS); //advance in time
    //Validation 2 - success message
    cy.get('.success').should('not.be.visible');
  });

  //Exercise 8
  it('Identifies elements on the button', () => {
    cy.clock(); // freeze browser time
    //Automatic command
    cy.fillMandatoryFieldsAndSubmit();

    //Validation - success message
    cy.get('.success').should('be.visible');

    cy.tick(THREE_SECONDS_IN_MS); //advance in time
    //Validation 2 - success message
    cy.get('.success').should('not.be.visible');
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
  it('Select a product (Blog) by its index', () => {
    cy.get('#product').select(1).should('have.value', 'blog');
  });

  ///Class 04 and 05  (2023-08-04)
  ///Radio inputs

  //Exercise 1
  it('Mark the service type "Feedback"', () => {
    cy.get('input[type="radio"][value = "feedback"]')
      .check()
      .should('have.value', 'feedback');
  });

  //Exercise extra
  it('Mark the service type "Atendimento"', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check();
        cy.wrap($radio).should('be.checked');
      });
  });

  ///CheckBox inputs

  //Exercise 1
  it('check both checkboxes, then uncheck the last one', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked');
  });

  //Exercise extra
  it('Displays error message when phone becomes mandatory but not filled in before form submission - Version 2', () => {
    cy.clock(); // freeze browser time
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
    cy.get('#phone-checkbox').check();

    //Button Send
    //Before cy.get('button[type="submit"]').click();
    cy.contains('.button', 'Env').click();

    //Validation 1 - error message
    cy.get('.error').should('be.visible');

    cy.tick(THREE_SECONDS_IN_MS); //advance in time
    //Validation 2 - error message
    cy.get('.error').should('not.be.visible');
  });

  ///Class 06  (2023-08-09)
  ///Select files
  //Exercise 0
  it('Selects a file from the fixtures folder', () => {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });

  //Exercise extra 1
  it('Selects a file simulating a drag-and-drop', () => {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });

  //Exercise extra 2
  it('Selects a file using a fixture that has been given an alias', () => {
    cy.fixture('example.json').as('SampleFile');
    cy.get('input[type="file"]#file-upload')
      .selectFile('@SampleFile')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });

  ///Class 07  (2023-08-29)
  ///External links
  //Exercise 01
  it('Verifies that the privacy policy opens in another tab without the need for a click', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank');
    //-> attr = atribute
  });
  //Exercise extra 01
  it('Access the privacy policy page by removing the target and then clicking on the link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target') //-> attr = atribute
      .click();
    //double check on new page
    cy.contains('Talking About Testing').should('be.visible');
  });

  ///Class 08_09_10  (2023-08-30)
  ///viewport mobile - on file "Package.json/scripts"
  //////////////////////////////////////////////////////////////////////
  ///Class 11 (2023-08-31)
  ///Lodash - INVOKE"
  it('Displays and hides success and error messages using the .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show') //Invoke a function on the previously yielded subject.
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide') //Invoke a function on the previously yielded subject.
      .should('not.be.visible');
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show') //Invoke a function on the previously yielded subject.
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide') //Invoke a function on the previously yielded subject.
      .should('not.be.visible');
  });

  //Exercise extra 3
  it('Fills the text area using the invoke command', () => {
    const longText = Cypress._.repeat('0123456789', 20);

    //Text Box
    cy.get('#open-text-area')
      .type('Text')
      .invoke('val', longText)
      .should('have.value', longText);
  });

  it('Make an HTTP request', () => {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    .should(function(response){
    const {status, statusText, body} = response
    expect(status).to.equal(200)
    expect(statusText).to.equal('OK')
    expect(body).to.include('CAC TAT')
    } )
  })

  //Class 12 - Challenge FIND THE CAT - end of the course
  it('Find the Cat on application', () => {
    cy.get('#cat')
    .should('not.be.visible')
    .invoke('show') //Invoke a function on the previously yielded subject.
    .should('be.visible')
    .and('contain', '🐈')
    cy.get('#title')
    .invoke('text', 'CAT TAT 🐈')
    cy.get('#subtitle')
    .invoke('text', 'I ♥️ cats 🐈')
  })
});
// End Describe
