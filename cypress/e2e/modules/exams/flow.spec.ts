describe('Fluxo completo de solicitação de exames', () => {
  it('acessa tela de seleção', () => {
    cy.visit('/exams/selection')
    cy.contains('Lista de Exames')
  })

  it('seleciona exames e avança para o resumo', () => {
    cy.get('input[type=checkbox]').first().check()
    cy.contains('Adicionar exames selecionados').click()
    cy.visit('/exams/summary')
    cy.contains('Resumo da Solicitação')
  })

  it('baixa o PDF gerado', () => {
    cy.contains('📄 Baixar PDF').click()
  })
})
