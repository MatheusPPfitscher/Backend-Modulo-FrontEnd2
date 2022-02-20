// const config = require("./jest.config");

// // defini que os testes unitários vão ser somente os arquivos que possuem o .spec
// config.testMatch = ["**/*.spec.ts"];

// module.exports = config;

import config from "./jest.config";

let config2: any = {
    ...config,
    testMatch: [
        "**/*.spec.ts",
        "**/*.test.ts"],
};

export default config2;
