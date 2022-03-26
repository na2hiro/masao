describe("smoke tests", () => {
  it("should show top page with links", () => {
    cy.visit("/");
    cy.findByRole("heading", {name: "スーパー正男"})
    cy.findAllByRole("link", { name: "01" }).first().click();
    cy.findByRole("heading", {name: "その1"})
  });
});
