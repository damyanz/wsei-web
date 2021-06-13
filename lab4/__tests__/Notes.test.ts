import Notes from "../src/Notes";
import { Provider } from "./storage";

describe("Notes", () => {
  const notes = new Notes(
    Provider.localStorage,
    "storage_key",
    document.createElement("div"),
    document.createElement("div")
  );
});
