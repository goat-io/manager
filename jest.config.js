module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  setupFiles: ["<rootDir>/setupTests.js"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "jsdom",
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testPathIgnorePatterns: ["\\\\node_modules\\\\"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"]
};
