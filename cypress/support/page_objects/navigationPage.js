function expandMenu(groupName) {
    cy.contains('a', groupName).then(menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr => {
            if (attr.includes('left')) {
                cy.wrap(menu).click();
            }
        })
    })
}

class NavigationPage {

    formLayoutPage() {
        expandMenu('Forms');
        cy.contains('Form Layouts').click();
    }

    datepickerPage() {
        expandMenu('Forms');
        cy.contains('Datepicker').click();
    }

    toastrPage() {
        expandMenu('Modal & Overlays');
        cy.contains('Toastr').click();
    }

    tooltipPage() {
        expandMenu('Modal & Overlays');
        cy.contains('Tooltip').click();
    }

    smartTablePage() {
        expandMenu('Tables & Data');
        cy.contains('Smart Table').click();
    }
}

export const navigateTo = new NavigationPage();