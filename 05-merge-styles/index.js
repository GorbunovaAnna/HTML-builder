const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");
const folderPath = path.join(__dirname, "secret-folder");

console.log(path.resolve(__dirname));
fsPromises
  .readdir(path.join(__dirname, "styles"), {
    withFileTypes: true,
  })
  .then((dirs) => {
    dirs.forEach((el) => {
      const filePath = path.join(__dirname, "styles", el.name);
      const ext = path.extname(filePath);

      if (ext === ".css" && el.isFile()) {
        fsPromises.readFile(filePath).then((buff) => {
          fsPromises.appendFile(
            path.join(__dirname, "project-dist", "bundle.css"),
            buff
          );
        });
      }
    });
  });
