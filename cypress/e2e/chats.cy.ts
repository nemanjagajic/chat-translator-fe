describe('Chats', () => {
  it('changes selected language and sends translated messages', () => {
    cy.logIn()
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy="chatItem"]').first().click()
    cy.get('[data-cy="settingsIcon"]').click()
    cy.get('[data-cy="selectLanguageDropdown"]').select('sr-Latn')
    cy.get('[data-cy="applySettingsButton"]').click()
    cy.get('body').click(0,0)
    cy.get('[data-cy="messageTextarea"]').type('Ovo je poruka')
    cy.get('[data-cy="sendMessageButton"]').click()
    cy.wait(2000)
    cy.get('[data-cy="originalMessageText"]').first().contains('Ovo je poruka', { matchCase: false })
    cy.get('[data-cy="translatedMessageText"]').first().contains('This is a message', { matchCase: false })

    cy.get('[data-cy="settingsIcon"]').click()
    cy.get('[data-cy="selectLanguageDropdown"]').select('es')
    cy.get('[data-cy="applySettingsButton"]').click()
    cy.get('body').click(0,0)
    cy.get('[data-cy="messageTextarea"]').type('este es un mensaje')
    cy.get('[data-cy="sendMessageButton"]').click()
    cy.wait(2000)
    cy.get('[data-cy="originalMessageText"]').first().contains('Este es un mensaje', { matchCase: false })
    cy.get('[data-cy="translatedMessageText"]').first().contains('This is a message', { matchCase: false })
  })
})

export {}