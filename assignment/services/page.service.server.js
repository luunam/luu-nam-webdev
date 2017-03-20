module.exports = function(app, model) {
  app.post("/api/website/:wid/page", createPage);
  app.get("/api/website/:wid/page", findPagesByWebsiteId);
  app.get("/api/page/:pid", findPageById);
  app.put("/api/page/:pid", updatePage);
  app.delete("/api/page/:pid", deletePage);

  function createPage(req, res) {
    model.pageModel
      .createPage(req.params.wid, req.body)
      .then(function (page) {
        res.status(200).send(page);
      }, function (err) {
        res.status(404).send(err);
      });
  }

  function findPagesByWebsiteId(req, res) {
    model.pageModel
      .findAllPagesForWebsite(req.params.wid)
      .then(function (pages) {
        res.status(200).send(pages);
      }, function (err) {
        res.status(404).send(err);
      });
  }

  function findPageById(req, res) {
    model.pageModel
      .findPageById(req.params.pid)
      .then(function (page) {
        res.status(200).send(page);
      }, function (err) {
        res.status(404).send(err);
      });
  }

  function updatePage(req, res) {
    model.pageModel
      .updatePage(req.params.pid, req.body)
      .then(function () {
        res.sendStatus(200);
      }, function (err) {
        res.status(404).send(err);
      });
  }

  function deletePage(req, res) {
    model.pageModel
      .deletePage(req.params.pid)
      .then(function () {
        res.sendStatus(200);
      }, function (err) {
        res.status(404).send(err);
      });
  }
};