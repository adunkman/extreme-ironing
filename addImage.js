var path = require("path");
var url = require("url");
var fs = require("fs");

var imageUrl = process.argv[2];
var protocol = require(url.parse(imageUrl).protocol.slice(0, -1));
var directory = path.join(__dirname, "irons");
var filename = Math.floor((1 + Math.random()) * 0x10000000).toString(16);
var extension = path.extname(imageUrl);

var request = protocol.get(imageUrl, function(response) {
  var image = fs.createWriteStream(path.join(directory, filename + extension));

  response.pipe(image);

  image.on("finish", function () {
    image.close(function () {
      fs.writeFileSync(path.join(directory, filename + extension + ".json"), JSON.stringify({
        source: imageUrl
      }, null, 2) + "\n");
    });
  });
});
