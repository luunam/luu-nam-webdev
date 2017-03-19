module.exports = function(app) {

  var connectionString = 'mongodb://127.0.0.1:27017/webdev';

  if(process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
      process.env.MLAB_PASSWORD + "@" +
      process.env.MLAB_HOST + ':' +
      process.env.MLAB_PORT + '/' +
      process.env.MLAB_APP_NAME;
  }

  var mongoose = require("mongoose");
  mongoose.connect(connectionString);

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
};