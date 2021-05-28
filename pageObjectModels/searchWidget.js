/**
 * Page object for Webdriver.io search widget.
**/

let searchWidget = function () {
    this.searchModal = element(by.xpath('//input[contains(@class, "DocSearch-Input")]'));
    this.expectSearchModalVisible = function (boolean) {
        if (boolean === false) {
            expect(this.searchModal.isPresent()).toBe(boolean);
        } else {
            expect(this.searchModal.isDisplayed()).toBe(boolean);
        }
    }
    /**
     * This function opens the search modal, clears any input(clear also focuses element) in the input field and then sends keys.
     * The loop is to slow down typing speed.
     * The reason behind it is that sometimes the test would get 'flaky'. Search results returned would be incorrect 1 out of 10 executions if the input was entered too fast.
    **/
    this.searchFor = function (string) {
        element(by.xpath('//button[contains(@class, "DocSearch-Button")]')).click().then(function () {
            browser.wait(EC.visibilityOf(element(by.xpath('//input[contains(@class, "DocSearch-Input")]'))), 5000).then(function () {
                element(by.xpath('//input[contains(@class, "DocSearch-Input")]')).clear().then(function () {
                    element(by.xpath('//input[contains(@class, "DocSearch-Input")]')).click().then(function () {
                        for (i = 0; i < string.length; i++) {
                            element(by.xpath('//input[contains(@class, "DocSearch-Input")]')).sendKeys(string[i]);
                            browser.sleep(100);
                        }
                    });
                })
            })
        })
    };
    this.selectSearchResult = function (string, searchResultHref) {
        return element(by.xpath('(//mark)[contains(text(),"' + string + '")]//ancestor::a[contains(@href,"' + searchResultHref + '")]'));
    };
    this.waitForSearchResult = function (href) {
        browser.wait(EC.visibilityOf(element(by.xpath('//a[@href="' + href + '"]'))), 5000);
    };
    this.addSearchToFavourites = function (href) {
        element(by.xpath('//a[@href="' + href + '"]//button[@title="Save this search"]')).click();
    };
    this.expectSearchInFavouritesIsDisplayed = function (string, boolean) {
        var itemInFavourites = element(by.xpath('//div[contains(text(), "Favorites")]//following::span[contains(@class, "DocSearch-Hit-title") and text() = "' + string + '"]'));
        if (boolean === false) {
            expect(itemInFavourites.isPresent()).toBe(boolean);
        } else {
            expect(itemInFavourites.isDisplayed()).toBe(boolean);
        }
    }
    this.searchResultSource = function (source) {
        return element(by.xpath('//div[@class="DocSearch-Hit-source" and contains(text(),"' + source + '")]'));
    };

};
module.exports = new searchWidget();
