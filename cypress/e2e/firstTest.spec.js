/// <reference types="cypress" />

describe('first test suite', () => {

    it('first test', () => {

        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //by Tag name
        cy.get('input');

        //by ID
        cy.get('#inputEmail1');

        //by class name
        cy.get('.input-full-width')

        //by attribute name
        cy.get('[nbinput]')

        //by attribute and value
        cy.get('[placeholder="Email"]')

        //by entire class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')


    })

    it('second test', () => {

        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        // .get()      - finds elements globally
        // .find()     - find child elements by locator
        // .contains() - find elements by HTML text and locator

        cy.contains('Sign in');
        cy.contains('[status="warning"]', 'Sign in');
        cy.contains('nb-card', 'Horizontal form').find('button');
        cy.contains('nb-card', 'Horizontal form').contains('Sign in');
        cy.contains('nb-card', 'Horizontal form').get('button');

        //cypress chains
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click();

    });

    it('save subjects of the command', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email');
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password');



        // YOU CANNOT DO THINGS LIKE THIS
        // const usingTheGrid = cy.contains('nb-card', 'Using the Grid');
        // usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email');
        // usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password');

        // 1. Using cypress alias
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email');
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password');


        // 2. Cypress then() method
        cy.contains('nb-card', 'Using the Grid').then(usingTheGrid => {
            cy.wrap(usingTheGrid).find('[for="inputEmail1"]').should('contain', 'Email');
            cy.wrap(usingTheGrid).find('[for="inputPassword2"]').should('contain', 'Password');
        });
    })

    it('extract test values', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //1 cypress
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address');

        //2 JQueary + chain
        cy.get('[for="exampleInputEmail1"]').then(label => {
            const labelText = label.text();
            expect(labelText).to.equal('Email address');
            cy.wrap(labelText).should('contain', 'Email address');
        });

        //3 invoke text
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address');
        });

        //4 invoke attribute
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
            expect(classValue).to.equal('label');
        })

        //5 invoke property
        const email = 'user@test.com'
        cy.get('#exampleInputEmail1').type(email);
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', email).then(propertyValue => {
            expect(propertyValue).to.equal(email);
        });

    })

    it('radio buttons', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //{force: true} - skip visibility check for element
        cy.contains('nb-card', 'Using the Grid').find('[type=radio]').then(radioButtons => {
            cy.wrap(radioButtons).eq(0).check({ force: true }).should('be.checked');
            cy.wrap(radioButtons).eq(1).check({ force: true });
            cy.wrap(radioButtons).eq(0).should('not.be.checked');
            cy.wrap(radioButtons).eq(2).should('be.disabled');
        })
    })

    it('checkboxes', () => {
        cy.visit('/');
        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click();

        // //uncheck all checkboxes on a page. 
        // //checkbox is checked - uncheck it
        // //checkbox is unchecked - no action
        // cy.get('[type=checkbox]').uncheck({force: true});


        // //check all checkboxes on a page. 
        // //checkbox is checked - no action it
        // //checkbox is unchecked - check it
        // cy.get('[type=checkbox]').uncheck({force: true});


        // ckick doesn't check initial checkbox state. just revert it
        cy.get('[type=checkbox]').eq(0).click({ force: true });
        cy.get('[type=checkbox]').eq(1).click({ force: true });
    })

    it('datepicker', () => {

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

        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();

        //Common Datepicker
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click();
            const dateToAssert = selectDateFromCurrent(5);
            cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert);
            cy.wrap(input).should('have.value', dateToAssert);
        })
    })

    it('web tables', () => {
        cy.visit('/');
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        //get row by text
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            const age = 35;

            cy.wrap(tableRow).find('.nb-edit').click();
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age);
            cy.wrap(tableRow).find('.nb-checkmark').click();
            cy.wrap(tableRow).find('td').eq(6).should('have.text', age);

        });

        //get row by index
        const user = { firstName: 'John', lastName: 'Smith' };

        cy.get('thead').find('.nb-plus').click();
        cy.get('thead').find('tr').eq(2).then(tablRow => {
            cy.wrap(tablRow).find('[placeholder="First Name"]').type(user.firstName);
            cy.wrap(tablRow).find('[placeholder="Last Name"]').type(user.lastName);
            cy.wrap(tablRow).find('.nb-checkmark').click();
        });

        cy.get('tbody tr').first().find('td').then(tableCoumns => {
            cy.wrap(tableCoumns).eq(2).should('contain', user.firstName);
            cy.wrap(tableCoumns).eq(3).should('contain', user.lastName);
        });

    })

    const ages = [20, 30, 40, 200];

    for (let age of ages) {
        it(`web table - get each row for ${age} age`, () => {
            cy.visit('/');
            cy.contains('Tables & Data').click();
            cy.contains('Smart Table').click();

            cy.get('thead [placeholder="Age"]').clear().type(age);
            cy.wait(500);

            cy.get('tbody tr').each(tableRow => {
                if (age === 200) {
                    cy.wrap(tableRow).should('contain.text', 'No data fount')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age);
                }
            })
        })
    }

    it('tooltip', () => {
        cy.visit('/');
        cy.contains('Modal & Overlays').click();
        cy.contains('Tooltip').click();

        cy.contains('nb-card', 'Colored Tooltips')
          .contains('Default')
          .click();

        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it('dialog box', () => {
        cy.visit('/');
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        //1 - not good. works only if 'window:confirm' is fired. otherwise skip
        cy.get('tbody tr').first().find('.nb-trash').click();
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?');
        })

        //2 with stub. If no confirm - stub contains empty message 
        const stub = cy.stub();
        cy.on('window:confirm', stub);
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?');
        })

        //3 decline confirm
        cy.get('tbody tr').first().find('.nb-trash').click();
        cy.on('window:confirm', () => false)
    })
})