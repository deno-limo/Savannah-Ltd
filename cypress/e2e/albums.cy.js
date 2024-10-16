describe("searching items on albums", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(".MuiButtonBase-root").click();
    cy.get("#emailAddress").click().type("denis@gmail.com");
    cy.get("#passWord").click().type("12345678");
    cy.get("#logIn").click();
    cy.get("#hamburgerMenu").click();
  });
  it("searches an album by name successfully", () => {
    cy.contains("Albums")
      .click()
      .should("exist")
      .and("be.visible")
      .and("have.text", "Albums");

    cy.get("#searchBar")
      .type("omnis laborum odio{enter}")
      .should("exist")
      .and("be.visible");

    cy.get(
      '[style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;"] > :nth-child(3)'
    )
      .should("exist")
      .and("be.visible")
      .and("have.text", "omnis laborum odio");
  });
});
