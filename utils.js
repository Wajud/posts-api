const fs = require("fs");

function writeDataToFile(content) {
  fs.writeFile("./data/posts.json", content, (err) => {
    if (err) throw err;
  });
}

module.exports = { writeDataToFile };
