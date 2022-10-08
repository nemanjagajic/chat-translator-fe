describe('Authentication', () => {
  it('logs in', () => {
    cy.visit('http://localhost:3000/auth')
    cy.get('[data-cy="emailInput"]').type('test@cypress.com')
    cy.get('[data-cy="passwordInput"]').type('aaaaaaaa')
    cy.get('[data-cy="submitButton"]').click()
    cy.get('[data-cy="homeScreen"]')
  })

  it('logs out',() => {
    cy.logIn()
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy="homeScreen"]')
    cy.get('[data-cy="logOutButton"]').click()
    cy.get('[data-cy="homeScreen"]').should('not.exist')
    cy.get('[data-cy="authScreen"]')
  })
})

export {}