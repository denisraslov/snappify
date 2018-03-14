const fs = require('fs');

function writeFile(fileName, content, callback) {
  fs.writeFile(fileName, content, (err) => {
      if (err) throw err;
      callback(data);
  });
}
