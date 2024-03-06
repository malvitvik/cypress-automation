class FormLayoutPage {
    /**
     * 
     * @param {string} name 
     * @param {string} email 
     */
    submitInlineForm(name, email) {
        cy.contains('nb-card', 'Inline form').find('form').then(form => {
            cy.wrap(form).find('[placeholder="Jane Doe"]').clear().type(name);
            cy.wrap(form).find('[placeholder="Email"]').clear().type(email);
            cy.wrap(form).find('[type="checkbox"]').check({ force: true });
            cy.wrap(form).submit();
        });
    }

    /**
     * 
     * @param {string} email 
     * @param {string} password 
     */
    submitBasicForm(email, password) {
        cy.contains('nb-card', 'Basic form').find('form').then(form => {
            cy.wrap(form).find('[placeholder="Email"]').clear().type(email);
            cy.wrap(form).find('[placeholder="Password"]').clear().type(password);
            cy.wrap(form).find('[type="checkbox"]').check({ force: true });
            cy.wrap(form).submit();
        });
    }
}

export const onFormLayoutPage = new FormLayoutPage();