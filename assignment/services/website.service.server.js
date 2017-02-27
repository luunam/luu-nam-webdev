module.exports = function(app) {
  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findWebsitesByUser);
  app.get("/api/website/:wid", findWebsiteById);
  app.put("/api/website/:wid", updateWebsite);
  app.delete("/api/website/:wid", deleteWebsite);

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
    res.status(200).send(newWebsite);
  }

  function findWebsitesByUser(req, res) {
    var uid = req.params.userId;
    var rs = websites.filter(function(ws) {
      return ws.developerId === uid;
    });

    console.log(JSON.stringify(rs));
    res.send(rs);
  }

  function findWebsiteById(req, res) {
    var wid = req.params.wid;
    console.log("WID: " + wid);
    var websiteFound = websites.find(function(ws) {
      return ws._id === wid;
    });
    console.log(websiteFound);
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