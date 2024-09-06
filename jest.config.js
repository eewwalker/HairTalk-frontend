
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
})

 const customJestConfig= {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/src/(.*)$': '<rootDir>/src/$1',
  },
  globals:{
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.jest.json'
    },
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
  }
}

module.exports = createJestConfig(customJestConfig)