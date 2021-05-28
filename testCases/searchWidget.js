var pageContent = require('../pageObjectModels/pageContent.js');
var searchWidget = require('../pageObjectModels/searchWidget.js');

describe('Excercise 2 - search widget hotkeys', function () {
    it('1. Navigate to the WebdriverIO website at ' + siteurl, function () {
        browser.get(siteurl);
    });
    it('2. Press CTRL+K to bring up the search widget modal', function () {
        pageContent.pageBody.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'k'));
    });
    it('3. Validate that the search widget modal is visible', function () {
        searchWidget.expectSearchModalVisible(true);
    });
    it('5. Press escape to close the search widget modal', function () {
        searchWidget.searchModal.sendKeys(protractor.Key.ESCAPE);
    });
    it('6. Validate that the search widget modal is NOT visible', function () {
        searchWidget.expectSearchModalVisible(false);
    });
    it('7. Search for addValue keyword', function () {
        searchWidget.searchFor('addValue');
        searchWidget.searchModal.sendKeys(protractor.Key.ENTER);
    });
    it('8. Press CTRL+K to bring up the search widget modal', function () {
        pageContent.pageBody.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'k'));
    });
    it('9. Validate that addValue is in recent search history', function () {
        searchWidget.waitForSearchResult('/docs/api/element/addValue/');
        expect(searchWidget.searchResultSource('Recent').isDisplayed()).toBe(true);
    });
    it('10. Add addValue to favourites', function () {
        searchWidget.addSearchToFavourites('/docs/api/element/addValue/');
    });
    it('10. Validate that addValue is saved in favourites', function () {
        searchWidget.expectSearchInFavouritesIsDisplayed('addValue',true);
    });
});
