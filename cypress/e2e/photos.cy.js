describe("searching items on albums", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/");
      cy.get(".MuiButtonBase-root").click();
      cy.get("#emailAddress").click().type("denis@gmail.com");
      cy.get("#passWord").click().type("12345678");
      cy.get("#logIn").click();
      cy.get("#hamburgerMenu").click();
    });
    it("searches a photo by name successfully", () => {
      cy.contains("Photos")
        .click()
        .should("exist")
        .and("be.visible")
        .and("have.text", "Photos");
  
      cy.get("#searchBar")
        .type("natus doloribus necessitatibus ipsa{enter}")
        .should("exist")
        .and("be.visible");
  
        cy.get('[style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 20px;"] > div')
        .should("exist")
        .and("be.visible")
        .and("have.text", "natus doloribus necessitatibus ipsa");
    });
  });
  