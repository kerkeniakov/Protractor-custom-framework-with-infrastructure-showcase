/**
 * Page object for Webdriver.io page navigation. Includes header and side navigation.
**/

let pageNavigation = function () {
    this.headerNavOption = function (navOption) {
        return element(by.xpath('//a[contains(@class, "navbar__item")][contains(text(),"' + navOption + '")]'));
    }
    this.leftMenuOption = function (option) {
        return element(by.xpath('//a[contains(@class,"menu__link")][contains(text(),"' + option + '")]'));
    }

};
module.exports = new pageNavigation();
