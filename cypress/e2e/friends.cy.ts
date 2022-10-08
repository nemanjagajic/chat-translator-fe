describe('Friends', () => {
  it('searches friends', () => {
    cy.logIn()
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy="navbarFriends"]').click()
    cy.contains('Add new friend').click()
    cy.get('[data-cy="addFriendSearchInput"]').type('cypress')
    cy.get('[data-cy="friendItem"]')
  })
})

export {}