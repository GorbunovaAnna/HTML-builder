const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");
const folderPath = path.join(__dirname, "files");

console.log(path.resolve(__dirname));
fsPromises
  .readdir(path.join(__dirname), {
    withFileTypes: true,
  })
  .then((dirs) => {
    const isFound = dirs.find((dir) => {
      return dir.isDirectory() && dir.name === "copy-files";
    });
    if (!isFound) {
      fsPromises.mkdir(path.join(__dirname, "copy-files"));
    }
  })
  // join into files
  .then(() => {
    fsPromises
      .readdir(folderPath, {
        withFileTypes: true,
      })
      .then((res) => {
        res.forEach((el) => {
          const filePath = path.join(folderPath, el.name);
          fsPromises.readFile(filePath).then((file) => {
            fsPromises.writeFile(
              path.join(__dirname, "copy-files", el.name),
              file
            );
          });
        });
      });
  });
