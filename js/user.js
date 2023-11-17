import UserDisplay from "./classes/userDisplay.js";

function main() {
  for (var i = 0; i < UserDisplay.getUserListLength(); i++) {
    UserDisplay.createUserDisplay(i);
  }
}
main()