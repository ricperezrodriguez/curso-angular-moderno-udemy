const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  transform: {
    '^.+\\.(ts|js|html|svg)$': 'ts-jest',
  }
};
