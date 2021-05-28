#!/bin/bash

#Selenium address
echo seleniumAddress=GITLAB_SECRET_VAR >> ../.env

# Application baseurl
echo siteurl=https://webdriver.io/ >> ../.env

#Selenoid video url, this is used to attach a video link to the allure report
echo selenoidVideoUrl=GITLAB_SECRET_VAR >> ../.env

#If set to false , it will not execute ./scripts/send_results.js after completing test execution
echo pushToAllure=true >>../.env

#Allure project id and base server ip
echo allure_project_id=test1 >> ../.env
echo allure_server=GITLAB_SECRET_VAR >> ../.env