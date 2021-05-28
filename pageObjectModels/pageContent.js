/**
 * Page object for Webdriver.io page content. Excludes header/footer/side navigation.
**/
const helperFuncs = require('../helpers/helperFuncs.js')

let pageContent = function () {
    this.pageBody = element(by.xpath('//body'));
    this.expectHeadingIsDisplayed = function (heading, string, boolean) {
        if (boolean === false) {
            expect(element(by.cssContainingText(heading, string)).isPresent()).toBe(boolean);
        } else {
            expect(element(by.cssContainingText(heading, string)).isDisplayed()).toBe(boolean);
        }
    };
    /**
     * Most pages in the documentation template have a table that lists reference materials relevant to the selected command.
     * This function checks whether table is displayed or not present.
    **/
    this.expectTableHeaderIsDisplayed = function (boolean) {
        if (boolean === false) {
            expect(element(by.cssContainingText('th', 'Name')).isPresent()).toBe(boolean);
            expect(element(by.cssContainingText('th', 'Type')).isPresent()).toBe(boolean);
            expect(element(by.cssContainingText('th', 'Details')).isPresent()).toBe(boolean);
        } else {
            expect(element(by.cssContainingText('th', 'Name')).isDisplayed()).toBe(boolean);
            expect(element(by.cssContainingText('th', 'Type')).isDisplayed()).toBe(boolean);
            expect(element(by.cssContainingText('th', 'Details')).isDisplayed()).toBe(boolean);
        }
    }
    /**
     * Most pages in the documentation section follow a template that has a table which lists reference materials relevant to the selected command.
     * This function verifies that a whole row of table data is either displayed or not present.
    **/
    this.parametersRowEntryIsDisplayed = function (name, type, details, boolean) {
        if (boolean === false) {
            expect(element(by.xpath('//var[text()="' + name + '"]')).isPresent()).toBe(boolean);
            expect(element(by.xpath('//var[text()="' + name + '"]//following::code[1]')).isPresent()).toBe(boolean);
            expect(element(by.xpath('//var[text()="' + name + '"]//following::td[2]')).isPresent()).toBe(boolean);
        } else {
            expect(element(by.xpath('//var[text()="' + name + '"]')).isDisplayed()).toBe(boolean);
            element(by.xpath('//var[text()="' + name + '"]//following::code[1]')).getText().then(function (typeInnerText) {
                expect(typeInnerText).toBe(type);
            });
            element(by.xpath('//var[text()="' + name + '"]//following::td[2]')).getText().then(function (detailsInnerText) {
                expect(detailsInnerText).toBe(details);
            });
        }
    }
};
module.exports = new pageContent();
