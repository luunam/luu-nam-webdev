Array.prototype.move = function (old_index, new_index) {
  if (new_index >= this.length) {
    var k = new_index - this.length;
    while ((k--) + 1) {
      this.push(undefined);
    }
  }
  this.splice(new_index, 0, this.splice(old_index, 1)[0]);
};

module.exports = function(app) {
  require("./services/user.service.server.js")(app);
  require("./services/website.service.server.js")(app);
  require("./services/page.service.server.js")(app);
  require("./services/widget.service.server.js")(app);
};