import { launch } from "puppeteer";

describe("Note creation", () => {
  beforeAll(async () => {
    await launch({ headless: false });
    await page.goto("http://localhost:3001/");
  });

  it("should create note with provided data", async () => {
    await page.screenshot({ path: "./screenshots/notes-before.png" });
    await page.waitForSelector("#add_note");
    await page.click("#add_note");

    await page.waitForSelector("#note_form");
    await page.type("input[name=note_title]", "Tytuł notatki");
    await page.type(
      "textarea[name=note_content]",
      "To jest przykładowa notatka"
    );
    await page.$eval(
      "input[name=note_color]",
      (el) => (el.nodeValue = "rgb(0,255,0)")
    );
    await page.click("button[name=note_submit]");
    await page.screenshot({ path: "./screenshots/notes-after.png" });
  });
});
