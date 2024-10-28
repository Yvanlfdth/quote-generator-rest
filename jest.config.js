const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/**/*.test.ts"],
    verbose: true,
    forceExit: false,
    moduleNameMapper: {
        '^@src/(.*)$': '<rootDir>/src/$1',
        '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
        '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
        '^@models/(.*)$': '<rootDir>/src/models/$1',
        '^@routes/(.*)$': '<rootDir>/src/routes/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1'
    }
};