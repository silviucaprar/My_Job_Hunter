// Generated from: tests\features\jobhunter.feature
import { test } from "../../../setup/fixtures.ts";

test.describe('My LinkedIn Job Hunter', () => {

  test.describe('Apply for QA Automation Jobs', () => {

    test('Example #1', { tag: ['@mytest'] }, async ({ Given, homePage, When, And, loginPage, Then, jobsPage }) => { 
      await Given('HomePage: Navigate to LinkedIn website', null, { homePage }); 
      await When('HomePage: Click on "Reject" cookies button', null, { homePage }); 
      await And('HomePage: Click on "Sign in" button to enter Loginpage', null, { homePage }); 
      await And('LoginPage: Login with valid "MYEMAIL" and "MYPASSWORD"', null, { loginPage }); 
      await Then('HomePage: Verify user is logged in', null, { homePage }); 
      await When('HomePage: Click on "Jobs" tab', null, { homePage }); 
      await And('JobsPage: Search for "qa automation engineer"', null, { jobsPage }); 
      await And('JobsPage: Click on the "Easy Apply" and "Remote" filters', null, { jobsPage }); 
      await And('JobsPage: Click the "Easy Apply" button on every job listing that matches qa automation role', null, { jobsPage }); 
    });

  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('tests\\features\\jobhunter.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":17,"tags":["@mytest"],"steps":[{"pwStepLine":9,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given HomePage: Navigate to LinkedIn website","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When HomePage: Click on \"Reject\" cookies button","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"And HomePage: Click on \"Sign in\" button to enter Loginpage","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"And LoginPage: Login with valid \"MYEMAIL\" and \"MYPASSWORD\"","stepMatchArguments":[{"group":{"start":28,"value":"\"MYEMAIL\"","children":[{"start":29,"value":"MYEMAIL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":42,"value":"\"MYPASSWORD\"","children":[{"start":43,"value":"MYPASSWORD","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then HomePage: Verify user is logged in","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When HomePage: Click on \"Jobs\" tab","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"And JobsPage: Search for \"qa automation engineer\"","stepMatchArguments":[{"group":{"start":21,"value":"\"qa automation engineer\"","children":[{"start":22,"value":"qa automation engineer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"And JobsPage: Click on the \"Easy Apply\" and \"Remote\" filters","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"And JobsPage: Click the \"Easy Apply\" button on every job listing that matches qa automation role","stepMatchArguments":[]}]},
]; // bdd-data-end