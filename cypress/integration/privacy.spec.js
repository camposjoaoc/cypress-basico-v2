//New page
//Create a test called test the privacy policy page independently
//Use your creativity and the features you've learned so far to perform this test (the solution is simpler than you might think)
//Finally, run the new test in Test Runner and move forward only when the test is passing
//Exercise extra 02 - Class 07
Cypress._.times(5, () => {
  //function to repeat the test 5 times
  it('Independently test the privacy policy page', () => {
    cy.visit('./src/privacy.html');
    cy.contains('Talking About Testing').should('be.visible');
  });
});
