const fs = require("fs");

function getBodyData(req, res) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const { author, likes, content } = JSON.parse(body);
        resolve({ author, likes, content });
      });
    } catch (err) {
      console.log(err);
    }
  });
}

function writeDataToFile(content) {
  fs.writeFile("./data/posts.json", content, (err) => {
    if (err) throw err;
  });
}

module.exports = { writeDataToFile, getBodyData };
