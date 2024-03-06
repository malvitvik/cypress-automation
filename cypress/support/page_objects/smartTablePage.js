class SmartTablePage {

    /**
     * 
     * @param {string} firstName 
     * @param {number} age 
     */
    updateAgeByFirstName(firstName, age) {
        cy.get('tbody').contains('tr', firstName).then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click();
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age);
            cy.wrap(tableRow).find('.nb-checkmark').click();
            cy.wrap(tableRow).find('td').eq(6).should('have.text', age);
        });
    }

    /**
     * 
     * @param {{firstName, lastName}} user 
     */
    addNewRecord(user) {
        cy.get('thead').find('.nb-plus').click();
        cy.get('thead').find('tr').eq(2).then(tablRow => {
            cy.wrap(tablRow).find('[placeholder="First Name"]').type(user.firstName);
            cy.wrap(tablRow).find('[placeholder="Last Name"]').type(user.lastName);
            cy.wrap(tablRow).find('.nb-checkmark').click();
        });

    }

    /**
     * 
     * @param {number} index 
     */
    deleteRoeByIndex(index) {
        const stub = cy.stub();
        cy.on('window:confirm', stub);
        cy.get('tbody tr').eq(index).find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?');
        })

    }
}

export const onSmartTablePage = new SmartTablePage();