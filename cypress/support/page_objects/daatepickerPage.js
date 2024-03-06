function selectDateFromCurrent(day) {

    function selectDate(futureDate) {
        cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
            if (!dateAttribute.includes(futureDate.month) || !dateAttribute.includes(futureDate.year)) {
                cy.get('[data-name="chevron-right"]').click();
                selectDate(futureDate);
            } else {
                cy.get('.day-cell').not('.bounding-month').contains(futureDate.day).click();
            }
        });
    }

    let date = new Date();
    date.setDate(date.getDate() + day);

    const futureDate = {
        day: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        year: date.getFullYear()
    };

    selectDate(futureDate);

    const dateToAssert = `${futureDate.month} ${futureDate.day}, ${futureDate.year}`;
    return dateToAssert;
}

class DatepickerPage {
    /**
     * 
     * @param {number} daysFromToday 
     */
    selectCommonDatepickerDateFromToday(daysFromToday) {
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click();
            const dateToAssert = selectDateFromCurrent(daysFromToday);
            cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert);
            cy.wrap(input).should('have.value', dateToAssert);
        })
    }

    /**
     * 
     * @param {number} startDay 
     * @param {number} endDay 
     */
    selectDatepickerWithRangeDateFromToday(startDay, endDay) {
        cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
            cy.wrap(input).click();
            const startDate = selectDateFromCurrent(startDay);
            const endDate = selectDateFromCurrent(endDay);
            const dateToAssert = `${startDate} - ${endDate}`;

            cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert);
            cy.wrap(input).should('have.value', dateToAssert);
        })
    }
}

export const onDatepickerPage = new DatepickerPage(); 