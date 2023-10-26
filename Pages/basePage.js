var webdriver = require("selenium-webdriver");
const { By } = require("selenium-webdriver");

const chai = require("chai");
const expect = chai.expect;

var driver = new webdriver.Builder().forBrowser("chrome").build();


class BasePage {
  constructor() {
    global.driver = driver;
    
    driver.manage().setTimeouts({ implicit: 10000 });   
  }

  async go_to_url(theURL) {
    await driver.get(theURL);
  }

  async verifyPageTitle(expectedText) {
    let actualHeader = await driver.getTitle();
    expect(actualHeader).to.equal(expectedText);
  }

  async clickElement(elem) {
    await elem.click();
  }

  async closeBrowser() {
    await driver.quit();
  }
}

module.exports = BasePage;
