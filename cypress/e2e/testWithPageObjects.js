/// <reference types="cypress" />

import { navigateTo } from '../support/page_objects/navigationPage'
import { onFormLayoutPage } from '../support/page_objects/formLayoytPage';
import { onDatepickerPage } from '../support/page_objects/daatepickerPage';
import { onSmartTablePage } from '../support/page_objects/smartTablePage';

describe('Tests with Page Objects', () => {

    beforeEach('open application', () => {
        cy.openHomePage();
    })

    it('verify navigation accross the pages', () => {
        navigateTo.formLayoutPage();
        navigateTo.datepickerPage();
        navigateTo.toastrPage();
        navigateTo.tooltipPage();
        navigateTo.smartTablePage();
    })

    it.only('submit Inline and Basic form and select tomorrow date in the callendar', () => {
        navigateTo.formLayoutPage();
        onFormLayoutPage.submitInlineForm('Andrew', 'test@test.com');
        onFormLayoutPage.submitBasicForm('test@test.com', 'password');

        navigateTo.datepickerPage();
        onDatepickerPage.selectCommonDatepickerDateFromToday(1);
        onDatepickerPage.selectDatepickerWithRangeDateFromToday(7, 14);

        navigateTo.smartTablePage();
        onSmartTablePage.addNewRecord({firstName: 'Harry', lastName: "Potter"});
        onSmartTablePage.updateAgeByFirstName('Harry', 11);
        onSmartTablePage.deleteRoeByIndex(1);
    })
})