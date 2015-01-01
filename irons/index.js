var fs = require("fs");
var path = require("path");
var sizeOf = require("image-size");
var images = fs.readdirSync(__dirname);

var irons = [];
var validExtensions = ["png", "jpg"];

for (var i = 0; i < images.length; i++) {
  var filename = images[i];

  if (validExtensions.indexOf(path.extname(filename).substr(1)) === -1) {
    continue;
  }

  var fullPath = path.join(__dirname, filename);
  var dimensions = sizeOf(fullPath);
  var meta = require(fullPath + ".json");

  irons.push({
    filename: filename,
    path: "/images/" + filename,
    source: meta.source,
    width: dimensions.width,
    height: dimensions.height
  });
};

module.exports = irons;
