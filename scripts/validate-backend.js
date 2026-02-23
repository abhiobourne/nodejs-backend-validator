const fs = require("fs");
const path = require("path");

const standards = require("../backend-standards.json");

const SRC_PATH = path.join(__dirname, "..", "src");

// Utility: get only directories
function getDirectories(sourcePath) {
  return fs
    .readdirSync(sourcePath)
    .filter(name =>
      fs.statSync(path.join(sourcePath, name)).isDirectory()
    );
}

// Validate top-level folders
function validateSrcFolders() {
  const folders = getDirectories(SRC_PATH);

  const invalid = folders.filter(
    folder => !standards.srcFolders.includes(folder)
  );

  if (invalid.length) {
    console.error("❌ Invalid folders in src/:", invalid);
    process.exit(1);
  }
}

validateSrcFolders();

console.log("✅ Backend folder structure is valid");