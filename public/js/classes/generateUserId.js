import { getAllUsers, addUser, getOneUser, updateUser } from "./../function/server-request.js"

export default class GenerateUserId {
  static #newUserId;

  static async getNewUserId() {
    const users = await getAllUsers();
    this.#newUserId = (users.length);
    this.#newUserId++;
    return this.#newUserId;
  }
}