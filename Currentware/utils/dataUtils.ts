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

  static randomName(id="id") {
    return `a-${faker.string.alphanumeric(5)}`; 
  }

  static randomAlphaNumericName(name="") {
    return `e2e${name}${faker.string.alphanumeric(10)}`; 
  }
}
