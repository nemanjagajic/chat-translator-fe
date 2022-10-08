/// <reference types="cypress" />

Cypress.Commands.add('logIn', () => {
  const userJSON = {
    'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzM0N2Q2YWIzMWUxMDhhYzBhNTIyYjUiLCJpYXQiOjE2NjQzODQzNjJ9.Hgw6qSE1MUOX62iOTVDOoWN8GpkKw8jM1RLCEPUWNlE',
    '_id':'63347d6ab31e108ac0a522b5',
    'email':'test@cypress.com',
    'firstName':'Cypress',
    'lastName':'Test'
  }
  localStorage.setItem('user', JSON.stringify(userJSON))
})

declare global {
  namespace Cypress {
    interface Chainable {
      logIn(): Chainable<void>
    }
  }
}

export {}