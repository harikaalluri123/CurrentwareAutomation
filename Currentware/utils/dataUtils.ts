import { makeLogger } from "./logger";
import { faker } from "@faker-js/faker";

const log = makeLogger("DataUtils");

export class DataUtils {
  static generateName(prefix: string = ""): string {
    log.info("Generated name " + prefix);
    return `${prefix}-${faker.lorem.words(3)}`;
  }

  static generatePassword() {
    return `On!1${faker.internet.password({ length: 15 })}`; 
  }

  static randomName(length: number = 5): string {
    return `a-${faker.string.alpha(length)}`;
  }

  static randomEmail() {
    return `user@${faker.internet.domainWord()}.com`;
  }

  static randomPhoneNumber(digits: number) {
    return faker.string.numeric(digits);
  }

  static randomAlphaNumericName(name="") {
    return `e2e${name}${faker.string.alphanumeric(10)}`; 
  }
}
