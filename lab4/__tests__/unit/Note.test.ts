/**
 * @jest-environment jsdom
 */

import Note from "../../src/Note";

const note = new Note(
  "Tytuł notatki",
  "Treść notatki",
  "rgb(255, 255, 0)",
  () => {},
  () => {}
);

const noteHTML: HTMLDivElement = note.createNoteElement();

describe("Note", () => {
  test("should return html with provided data", () => {
    const title: HTMLHeadingElement = noteHTML.querySelector(".heading--note");
    const content: HTMLParagraphElement = noteHTML.querySelector(".content");

    expect(title.innerHTML).toContain("Tytuł notatki");
    expect(content.innerHTML).toContain("Treść notatki");
    expect(noteHTML.style.backgroundColor).toBe("rgb(255, 255, 0)");
  });

  test("should return properly formatted creation date", () => {
    const createdAt: HTMLSpanElement = noteHTML.querySelector(".info > span");
    expect(createdAt.innerHTML).toContain(
      `Data utworzenia: ${note.createdAt.toLocaleString()}`
    );
  });
});
