# Example of a Protractor based framework that is integrated with remote selenoid server and Allure multi-language test report tool.  
# Supports video recordings aswell as custom scripts to push results to a remote allure server.
The framework is mostly configured to be used in conjuction with a selenoid/hub with docker images of chrome/firefox, aerokube video recorder docker image and a remote allure server. 

You should use your own selenium/selenoid/allure servers (local or remote) by specifying the IP's,port's and project names(for allure) in the .env file.  

After a test/suite runs, on completion we trigger a send_results.js script which uploads all the local allure test result files to a remote allure server.  

We embed a link of the video from the test session in the allure reports directly from the selenoid URL/server.  

You should have a "Test results are available at : http://..." message after running the tests.  
You can access this URL to view video/screenshots/step statistics and all other fun report stuff that protractor has generated.  

Alternatively you can also use the "allure serve" command in the project root to run a local instance of allure report.It should also contain an external link to the test execution videos.  

You will also find a skeleton bashscript for generating an .env file for use in CI/CD, as well as a custom exit code(the reason for this being that npm run's default exit code is 0, thus even if tests fail, CI will mark the build as "pass" - and we do not want that.).

There are 2 examples test cases for the webdriver.io website.
The test cases/suites demonstrate:  
-how to use Page Object Model design pattern for element locators and helper functions 
-setup methods in conf.js as well as CLI parameterization 
-data providers using jasmine-data-provider


## Installation
1. Rename .env-example to .env file in project root 
 * You can see the .env-example for all the key-values that are required
2. npm install  
3. npm run tests:chrome -> runs the whole test suite on chrome
 * npm run tests:firefox -> runs the whole test suite on firefox
 * for specific test cases you can use the manual command instead of the scripted one. For example:
>  node node_modules/protractor/bin/protractor ./conf.js --suite clickAndProtocols --params.browser=firefox  
>  node node_modules/protractor/bin/protractor ./conf.js --suite searchWidget --params.browser=chrome

## Infrastructure
All you need is the docker-compose file and the browsers.json on your server.  
Refer to docker-compose.yml and pull the necessary images.  
Configure them.  
Populate the .env file the selenoid and allure IPs.
