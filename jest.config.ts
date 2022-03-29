import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePaths: ['.'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/api/**/*.(t|j)s'],
  coveragePathIgnorePatterns: ['src/api/console'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
};

export default config;
