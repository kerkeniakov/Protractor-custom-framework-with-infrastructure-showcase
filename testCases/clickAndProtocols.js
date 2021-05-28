const using = require('jasmine-data-provider');
const sectionListData = require('../dataProviders/sectionLists.js');
const pageNavigation = require('../pageObjectModels/pageNavigation.js');
const pageContent = require('../pageObjectModels/pageContent.js');
const searchWidget = require('../pageObjectModels/searchWidget.js');

describe('Excercise - QuickBase - click and protocols', function () {
    it('1. Navigate to the WebdriverIO website at ' + siteurl, function () {
        browser.get(siteurl);
    });
    it('2. Click on the \'API\' link in the top navigation bar ', function () {
        pageNavigation.headerNavOption('API').click();
    });
    it('3. Use the search functionality on this page to search their API documentation for the text "click"', function () {
        searchWidget.searchFor('click');
    });
    it('5. Validate search results -> that a with href of /docs/api/element/click/ is displayed', function () {
        searchWidget.waitForSearchResult('/docs/api/element/click/');
    });
    it('6. Validate search results -> match a source of type Element', function () {
        expect(searchWidget.searchResultSource('element').isDisplayed()).toBe(true);
    });
    it('7. Validate search results -> match a source of type Protocols', function () {
        expect(searchWidget.searchResultSource('Protocols').isDisplayed()).toBe(true);
    });
    it('8. Validate search results -> match a source of type API', function () {
        expect(searchWidget.searchResultSource('API').isDisplayed()).toBe(true);
    });
    it('9. Press enter to navigate to Click page from search results', function () {
        searchWidget.searchModal.sendKeys(protractor.Key.ENTER);
    });
    it('10. Validate that the current url is https://webdriver.io/docs/api/element/click/', function () {
        expect(browser.getCurrentUrl()).toEqual("https://webdriver.io/docs/api/element/click/");
    });
    it('11. Validate correct page headings text -> h1 "click" & h5 "examples"', function () {
        pageContent.expectHeadingIsDisplayed('h1', 'click', true);
        pageContent.expectHeadingIsDisplayed('h5', 'Examples', true);
    });
    it('12. Validate that Parameters table is rendereded / Name / Type / Details /', function () {
        pageContent.expectTableHeaderIsDisplayed(true);
    });
    it('13. Validate that row data in Parameters table with "options","ClickOptions","click options (optional)" is displayed', function () {
        pageContent.parametersRowEntryIsDisplayed('options', 'ClickOptions', 'click options (optional)', true);
    });
    it('14. Expand Protocols in the side navigation ', function () {
        pageNavigation.leftMenuOption('Protocols').click();
    });
    /**
     * Use data provider to verify that all sub-items/links of the Protocols tab have the correct name and href.
    **/
    using(sectionListData.ProtocolSectionList, function (data, sectionName) {
        it("15. Validate the subitems for Protocol -> looking for  " + sectionName + ' that has a href of ' + data.href, function () {
            expect(element(by.xpath('//a[contains(@class,"menu__link")][text()="' + sectionName + '"]')).isPresent()).toBeTruthy();
            element(by.xpath('//a[contains(@class,"menu__link")][text()="' + sectionName + '"]')).getAttribute('href').then(function (attribute) {
                expect(attribute).toEqual(data.href);
            });
        });
    });
});
