const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv').config({ path: '../.env' });

const allure_results_directory = './allure-results'
const allure_server = process.env.allure_server
const allure_project_id = process.env.allure_project_id

let results = [];

var items = fs.readdirSync(allure_results_directory);
items.forEach((fileName) => {
    let result = {};
    var content = fs.readFileSync(`${allure_results_directory}/${fileName}`, 'base64');
    result['file_name'] = fileName;
    result['content_base64'] = Buffer.from(content, 'base64').toString('base64');
    results.push(result);
});

const headers = { 'Content-type': 'application/json' }
let request_body = {
    "results": results
}
let json_request_body = JSON.stringify(request_body);
fetch(allure_server + '/allure-docker-service/send-results?project_id=' + allure_project_id, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: `${json_request_body}`
}).then(response => {
    console.log('Response from allure server: '+ response.status + ' ' + response.statusText);
}).catch(err => console.error(err));