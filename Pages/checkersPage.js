var BasePage = require("./BasePage");
var webdriver = require("selenium-webdriver");
const { By, until } = require("selenium-webdriver");

const chai = require("chai");
const expect = chai.expect;

class CheckersPage extends BasePage {
  constructor() {
    super();
  }
  async openCheckerPage() {
    await this.go_to_url("https://www.gamesforthebrain.com/game/checkers/");
  }

  async verifyTitle() {
    await this.verifyPageTitle("Checkers - Games for the Brain");
  }

  async getHeaderText() {
    let elem = driver.findElement(By.xpath("//h1"));
    return await elem.getText();
  }

  async isYourFirstTurn() {
    let yourTurn = false;
    let firstTurnMessage = await driver
      .wait(until.elementLocated(By.css("p#message")), 10000)
      .getText();

    if (firstTurnMessage == "Select an orange piece to move.") {
      yourTurn = true;
    }
    return yourTurn;
  }

  async isYourNextTurn() {
    let yourTurn = false;
    let firstTurnMessage = await driver
      .wait(until.elementLocated(By.css("p#message")), 10000)
      .getText();

    if (firstTurnMessage == "Make a move.") {
      yourTurn = true;
    }
    return yourTurn;
  }

  async performFirstMoveByPosition(attrName, newPosition) {
    let selectedPawn = await driver.findElement(
      By.xpath(
        `//div[@id='board']//img[contains(@src, 'you1') and @name='${attrName}']`
      ),
      10000
    );
    expect(await this.isYourFirstTurn(), "Verifying initial player state").to.be
      .true;
    await selectedPawn.click();
    await driver.sleep(2000);
    let moveToPosition = await driver.findElement(
      By.xpath(
        `//div[@id='board']//img[contains(@src, 'gray.gif') and @name='${newPosition}']`,
        10000
      )
    );
    await moveToPosition.click();
    await driver.sleep(2000);
    expect(await this.isYourNextTurn(), "Verifying initial player state").to.be
      .true;
  }

  async performConsecutiveMoveByPosition(attrName, newPosition) {
    let selectedPawn = await driver.findElement(
      By.xpath(
        `//div[@id='board']//img[contains(@src, 'you1') and @name='${attrName}']`
      )
    );
    expect(await this.isYourNextTurn(), "Verifying initial player state").to.be
      .true;
    await selectedPawn.click();
    await driver.sleep(2000);
    let moveToPosition = await driver.findElement(
      By.xpath(
        `//div[@id='board']//img[contains(@src, 'gray.gif') and @name='${newPosition}']`
      )
    );
    await moveToPosition.click();
    await driver.sleep(2000);
    expect(await this.isYourNextTurn(), "Verifying initial player state").to.be
      .true;
  }

  async restartGame() {
    let restartLink = await driver.findElement(
        By.xpath("//a[text()='Restart...']"), 10000
      );
      await restartLink.click();
      await driver.sleep(2000);
      expect(await this.isYourFirstTurn(), "Verifying initial player state").to.be
      .true;
  }
}

module.exports = CheckersPage;
