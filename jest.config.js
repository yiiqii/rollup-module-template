const { defaults } = require('jest-config');

module.exports = {
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts'],
  globals: {
    'ts-jest': {
      tsconfig: {
        "noImplicitThis": false,
        "noImplicitAny": false,
      },
    },
  },
}
