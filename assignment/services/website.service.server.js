module.exports = function(app, model) {
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
    model.websiteModel
      .createWebsiteForUser(req.params.userId, req.body)
      .then(function (website) {
        res.status(200).send(website);
      }, function (err) {
        res.status(404).send(err);
      });
  }

  function findWebsitesByUser(req, res) {
    model.websiteModel
      .findAllWebsitesForUser(req.params.userId)
      .then(function (websites) {
        res.status(200).send(websites);
      }, function (err) {
        res.status(404).send(err);
      });
  }

  function findWebsiteById(req, res) {
    model.websiteModel
      .findWebsiteById(req.params.wid)
      .then(function (website) {
        res.status(200).send(website);
      }, function (err) {
        res.status(404).send(err);
      });
  }

  function updateWebsite(req, res) {
    model.websiteModel
      .updateWebsite(req.params.wid, req.body)
      .then(function () {
        res.sendStatus(200);
      }, function (err) {
        res.status(404).send(err);
      });
  }

  function deleteWebsite(req, res) {
    model.websiteModel
      .deleteWebsite(req.params.wid)
      .then(function () {
        res.sendStatus(200);
      }, function (err) {
        res.status(404).send(err);
      });
  }
};