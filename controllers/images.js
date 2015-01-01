var path = require("path");
var irons = require("../irons");

var images = function (server) {
  server.route({
    method: "GET",
    path: "/",
    handler: images.random
  });

  server.route({
    method: "GET",
    path: "/images/{file}",
    handler: images.specific
  });
};

images.random = function (request, reply) {
  var iron = irons[Math.floor(Math.random() * irons.length)];
  images.serve(reply, iron);
};

images.specific = function (request, reply) {
  for (var i = irons.length - 1; i >= 0; i--) {
    if (irons[i].path === request.path) {
      return images.serve(reply, iron);
    }
  };
};

images.serve = function (reply, iron) {
  var response = reply.file(path.join(__dirname, "../irons/" + iron.filename));
  response.header("X-PermalinkPath", iron.path);
  response.header("X-SourceUrl", iron.source);
  response.header("X-Dimensions", iron.width + "x" + iron.height);
};

module.exports = images;
