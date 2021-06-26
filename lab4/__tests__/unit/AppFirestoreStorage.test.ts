/**
 * @jest-environment jsdom
 */

import firebase from "firebase";
import AppFirestoreStorage from "../../src/AppFirestoreStorage";
import Note from "../../src/Note";

const storage = new AppFirestoreStorage("storage_key");
const note = new Note(
  "Tytuł",
  "treść",
  "#ff0000",
  () => {},
  () => {}
);

describe("AppFirestoreStorage", () => {
  test("should return properly formatted note object", () => {
    const { id, title, content, color, pinned, createdAt } =
      storage.getPlainNote(note);
    expect(id).toBeTruthy();
    expect(title).toBe("Tytuł");
    expect(content).toBe("treść");
    expect(color).toBe("#ff0000");
    expect(pinned).toBe(false);
    expect(createdAt).toBeInstanceOf(firebase.firestore.Timestamp);
  });
});
