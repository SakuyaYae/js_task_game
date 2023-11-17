export default class GenerateUserId {
  static #newUserId = 0;

  static getNewUserId() {
    this.#newUserId++;
    return this.#newUserId;
  }
}