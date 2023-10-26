const { expect } = require("chai");
const CheckersPage = require("../Pages/CheckersPage");

describe("Play checkers", function () {
  this.timeout(50000);
  beforeEach(function () {});

  let checkersPage = new CheckersPage();

  it("Perform 5 defined steps", async function () {
    this.timeout(50000);
    await checkersPage.openCheckerPage();

    // Verify initial state verification
    await checkersPage.verifyTitle();
    expect(await checkersPage.getHeaderText(), "Verifying page header is displayed").to.equal("Checkers");
    expect(await checkersPage.isYourFirstTurn(), "Verifying initial player state").to.be.true;

    // Moves
    //First move
    await checkersPage.performFirstMoveByPosition("space62", "space53");
    //Consecutive moves
    await checkersPage.performConsecutiveMoveByPosition("space22", "space33");
    expect(await checkersPage.isYourNextTurn(), "Verifying initial player state").to.be.true;
    await checkersPage.performConsecutiveMoveByPosition("space11", "space22");
    expect(await checkersPage.isYourNextTurn(), "Verifying initial player state").to.be.true;
    await checkersPage.performConsecutiveMoveByPosition("space00", "space11");
    expect(await checkersPage.isYourNextTurn(), "Verifying initial player state").to.be.true;
    await checkersPage.performConsecutiveMoveByPosition("space22", "space04");
    expect(await checkersPage.isYourNextTurn(), "Verifying initial player state").to.be.true;

    //Restart the game and verify Initial state
    await checkersPage.restartGame();
  });

  afterEach(async function () {
    await checkersPage.closeBrowser();
  });
});
