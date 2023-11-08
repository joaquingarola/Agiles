import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("Inicio un nuevo juego y la palabra es {string}", (palabra) => {
  const staticResponse = {
    "letras": [
      "a", "b", "c", "d", "e", "f", "g", "h", "i",
      "j", "k", "l", "m", "n", "ñ", "o", "p", "q",
      "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ],
    "palabras": [ palabra ]
  }

  cy.intercept('GET', '/assets/data/data.json', staticResponse).as('todos');
  cy.visit("http://localhost:4200/");
  cy.wait('@todos');
});

When("Selecciono las letras {string},{string},{string},{string},{string},{string},{string}", (letra1,letra2,letra3,letra4,letra5,letra6,letra7) => {
  cy.get(`[id=letter-${letra1}]`).click();
  cy.get(`[id=letter-${letra2}]`).click();
  cy.get(`[id=letter-${letra3}]`).click();
  cy.get(`[id=letter-${letra4}]`).click();
  cy.get(`[id=letter-${letra5}]`).click();
  cy.get(`[id=letter-${letra6}]`).click();
  cy.get(`[id=letter-${letra7}]`).click();
});

Then("El estado del juego debe ser Victoria", () => {
  cy.contains('Felicidades! Ganaste!');
  cy.contains("Vidas: 3 / 5");
  cy.get('[id="btn-nuevo-juego-victoria"]').should('be.visible');
});