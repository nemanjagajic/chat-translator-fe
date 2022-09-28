describe('Authentication', () => {
  it('should successfully log in', () => {
    cy.visit('http://localhost:3000/auth')
    cy.get('[data-cy="emailInput"]').type('test@cypress.com')
    cy.get('[data-cy="passwordInput"]').type('aaaaaaaa')
    cy.get('[data-cy="submitButton"]').click()
  })
})