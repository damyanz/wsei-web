import Notes from "../src/Notes";
import { Provider } from "../src/storage";

describe("Notes", () => {
  const notes = new Notes(
    Provider.LocalStorage,
    "storage_key",
    document.createElement("div"),
    document.createElement("div")
  );

  test("should add note", () => {
    notes.add("title", "content", "#ff0000", "noteId");
    expect(Object.keys(notes.notes)).toHaveLength(1);
  });

  test("should remove note", () => {
    notes.remove("noteId");
    expect(Object.keys(notes.notes)).toHaveLength(0);
  });
});
