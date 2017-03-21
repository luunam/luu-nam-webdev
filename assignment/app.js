module.exports = function(app) {
  app.get("/api/env/flickrkey", getFlickrKey);

  require("./model/models.server")();

  var userModel = require('./model/user/user.model.server')();
  var websiteModel = require('./model/website/website.model.server')();
  var pageModel = require('./model/page/page.model.server')();
  var widgetModel = require('./model/widget/widget.model.server')();

  var model = {
    userModel: userModel,
    websiteModel: websiteModel,
    pageModel: pageModel,
    widgetModel: widgetModel
  };


  require("./services/user.service.server.js")(app, model);
  require("./services/website.service.server.js")(app, model);
  require("./services/page.service.server.js")(app, model);
  require("./services/widget.service.server.js")(app, model);

  function getFlickrKey(req, res) {
    var key = process.env.FLICKR_KEY;
    res.json({result: key});
  }
};