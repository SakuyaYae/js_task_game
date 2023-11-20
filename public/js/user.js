import UserDisplay from "./classes/userDisplay.js";

async function main() {
  const userArr = await UserDisplay.getUserList();
  for (var i = 0; i < userArr.length; i++) {
    UserDisplay.createUserDisplay(i, userArr);
  }
}
main()