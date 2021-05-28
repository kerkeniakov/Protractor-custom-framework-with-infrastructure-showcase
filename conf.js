/**
 * Created by Gencho on 05.20.2021 ..
 */
let AllureReporter = require('jasmine-allure-reporter');
const shell = require('shelljs');
require('dotenv').config({ path: './.env' });
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
let DisplayProcessor = require('jasmine-spec-reporter').DisplayProcessor;



function time(flag) {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).substr(-2);
    var day = ("0" + date.getDate()).substr(-2);
    var hour = ("0" + date.getHours()).substr(-2);
    var minutes = ("0" + date.getMinutes()).substr(-2);
    var seconds = ("0" + date.getSeconds()).substr(-2);
    if (flag === false) {
        return year + "-" + month + "-" + day + "--" + hour + "h" + minutes + "m" + seconds + "s";
    }
    return '     ' + "\x1b[33m" + year + "-" + month + "-" + day + "--" + hour + "h" + minutes + "m" + seconds + "s" + "\x1b[0m";
}
function getTime() {
    return "\x1b[35m" + time(flag = false) + "\x1b[0m";
}

function TimeProcessor(configuration) {
}
TimeProcessor.prototype = new DisplayProcessor();

TimeProcessor.prototype.displaySuite = function (suite, log) {
    return getTime() + ' - ' + log;
};

TimeProcessor.prototype.displaySuccessfulSpec = function (spec, log) {
    return getTime() + ' - ' + log;
};

TimeProcessor.prototype.displayFailedSpec = function (spec, log) {
    return getTime() + ' - ' + log;
};

TimeProcessor.prototype.displayPendingSpec = function (spec, log) {
    return getTime() + ' - ' + log;
};
var init = function (config) {
    var specs;
    for (var i = 3; i < process.argv.length; i++) {
        var match = process.argv[i].match(/^--params\.([^=]+)=(.*)$/);
        if (match)
            switch (match[1]) {
                case 'specs':
                    specs = match[2];
                    break;
                case 'browser':
                    config.capabilities.browserName = match[2];
                    if (match[2].toLowerCase() === 'firefox') {
                        config.capabilities.shardTestFiles = true;
                        config.capabilities.maxInstances = 1;
                        config.capabilities.browserName = 'firefox';
                        config.capabilities.name = "Quickbase Tests";
                        config.capabilities.trustAllSSLCertificates = true;
                        config.capabilities.acceptInsecureCerts = true;
                        config.capabilities.ACCEPT_SSL_CERTS = true;
                        config.capabilities.marionette = true;
                        config.capabilities.enableVideo = true;
                        config.capabilities.enableVNC = true;
                    }
                    if (match[2].toLowerCase() === 'chrome') {
                        config.capabilities.browserName = 'chrome';
                        config.capabilities.enableVideo = true;
                        config.capabilities.enableVNC = true;
                        config.capabilities.name = "Quickbase Tests";
                        config.capabilities.enableLog = true;
                        config.capabilities.shardTestFiles = true;
                        config.capabilities.maxInstances = 1;
                        config.capabilities.chromeOptions = {};
                    }
                    if (match[2].toLowerCase() === 'ie') {
                        config.capabilities.browserName = 'internet explorer';
                        config.capabilities.shardTestFiles = true;
                        config.capabilities.maxInstances = 1;
                        config.capabilities.version = 11;
                        config.capabilities.acceptSslCerts = true;
                    }
            }

    }
    return config;
};
exports.config = (function () {
    return init({
        framework: 'jasmine2',
        seleniumAddress: process.env.seleniumAddress,
        getPageTimeout: 10000,
        params: {},
        capabilities: {},
        suites: {
            'clickAndProtocols': './testCases/clickAndProtocols.js',
            'searchWidget': './testCases/searchWidget.js',
            all: [
                './testCases/searchWidget.js',
                './testCases/clickAndProtocols.js',
            ],

        },
        jasmineNodeOpts: {
            print: function () {
            },
            showColors: true,
            includeStackTrace: true,
            defaultTimeoutInterval: 1244000

        },
        onPrepare: function () {
            jasmine.getEnv().addReporter(new SpecReporter({
                customProcessors: [TimeProcessor],
                spec: {
                    displayFailuresSummary: true,
                    displayFailuredSpec: true,
                    displaySuiteNumber: true,
                    displaySpecDuration: true
                }

            }));
            jasmine.getEnv().addReporter(new AllureReporter({
                resultsDir: './allure-results'
            }));
            jasmine.getEnv().afterEach(function (done) {
                browser.takeScreenshot().then(function (png) {
                    allure.createAttachment('Screenshot', function () {
                        return new Buffer.from(png, 'base64')
                    }, 'image/png')();
                    browser.getSession().then(sessionData => {
                        let sessionID = sessionData.id_;
                        allure.createAttachment('Video MP4', () => new Buffer.from("<html lang='en'><body><video width='100%' height='100%' controls autoplay><source src='"
                            + process.env.selenoidVideoUrl + sessionID + ".mp4"
                            + "' type='video/mp4'></video></body></html>", 'utf-8'), 'text/html')
                            ()
                    });
                    done();
                })
            });
            browser.ignoreSynchronization = true;
            if (typeof protractor != 'undefined') {
                global.EC = protractor.ExpectedConditions;
            }
            let cliBrowser;
            browser.getCapabilities().then((c) => {     
                cliBrowser = c.get('browserName')
            });
            function getCLIBrowser() {
                if (cliBrowser == undefined)
                    setTimeout(1, 100);

                else {
                    return cliBrowser;
                }
            }
            global.siteurl = process.env.siteurl;
            return global.browser.getProcessedConfig().then(function (config) {
                if (getCLIBrowser() == 'firefox') {
                    browser.params.browserNameCli = 'firefox';
                }
                if (getCLIBrowser() == 'internet explorer') {
                    browser.params.browserNameCli = 'internet explorer';
                }
                if (getCLIBrowser() == 'chrome') {
                    browser.params.browserNameCli = 'chrome';
                }
                browser.driver.manage().window().maximize();
            });
        },
        onComplete: (success) => {
            if (process.env.pushToAllure === 'true') {
                console.log('Pushing results to Allure server...');
                shell.exec('node ./scripts/send_results.js');
                console.log('Test results are available at : ' + process.env.allure_server + '/allure-docker-service/projects/' + process.env.allure_project_id + '/reports/latest/index.html');
            }
            if (!success) {
                console.log('ERROR - exit by custom code - refer to conf.js @ line 196 ');
                process.exit(5);
            }
            if (success) {
                console.log('Test suite executed successfully.')
            }
        },
    });
})();



