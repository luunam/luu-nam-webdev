module.exports = function(app) {
  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findWebsitesByUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
  ];

  function createWebsite(req, res) {
    var newWebsite = req.body;
    newWebsite._id = (new Date()).getTime() + "";
    newWebsite.developerId = req.params.userId;
    websites.push(newWebsite);
    res.sendStatus(200);
  }

  function findWebsitesByUser(req, res) {
    var uid = req.params.userId;
    var rs = websites.filter(function(ws) {
      return ws.developerId === uid;
    });

    res.send(rs);
  }

  function findWebsiteById(req, res) {
    var wid = req.params.wid;
    var websiteFound = websites.find(function(ws) {
      return ws._id === wid;
    });
    res.send(websiteFound);
  }

  function updateWebsite(req, res) {
    var wid = req.params.wid;
    for (wst in websites) {
      var ws = websites[wst];
      if (ws._id === wid) {
        var website = req.body;
        for (var k in website) {
          ws[k] = website[k];
        }
        res.sendStatus(200);
        return;
      }
    }
    res.sendStatus(404);
  }

  function deleteWebsite(req, res) {
    var wid = req.params.wid;
    for (var w in websites) {
      var ws = websites[w];
      if (ws._id === wid) {
        websites.splice(w, 1);
        res.sendStatus(200);
      }
    }
  }
};