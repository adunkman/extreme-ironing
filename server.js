if (process.env.NODE_ENV == "production") {
  require("newrelic");
}

var Hapi = require("hapi");
var requireDir = require("require-dir");

var server = new Hapi.Server({
  connections: {
    router: {
      isCaseSensitive: false,
      stripTrailingSlash: true
    }
  }
});

if (require.main === module) {
  server.connection({ port: parseInt(process.env.PORT) || 3000 });
  server.start();
}

var controllers = requireDir("./controllers");

for (var controller in controllers) {
  controllers[controller](server);
}

module.exports = server;
