module.exports = function(app) {
  app.post("/api/website/:wid/page", createPage);
  app.get("/api/website/:wid/page", findPagesByWebsiteId);
  app.get("/api/page/:pid", findPageById);
  app.put("/api/page/:pid", updatePage);
  app.delete("/api/page/:pid", deletePage);

  var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
  ];

  function createPage(req, res) {
    var newPage = req.body;
    newPage._id = (new Date()).getTime() + "";
    newPage.websiteId = req.params.wid;
    pages.push(newPage);
    res.sendStatus(200);
  }

  function findPagesByWebsiteId(req, res) {
    var wid = req.params.wid;
    var rs = pages.filter(function(pg) {
      return pg.websiteId === wid;
    });
    res.send(rs);
  }

  function findPageById(req, res) {
    var pageId = req.params.pid;
    var pageFound = pages.find(function(pg) {
      return pg._id === pageId;
    });

    if (pageFound) {
      res.send(pageFound);
    } else {
      res.sendStatus(404);
    }
  }

  function updatePage(req, res) {
    var pageId = req.params.pid;
    for (p in pages) {
      var pg = pages[p];
      if (pg._id === pageId) {
        var page = req.body;
        for (var k in page) {
          pg[k] = page[k];
        }
        res.sendStatus(200);
        return;
      }
    }
    res.sendStatus(404);
  }

  function deletePage(req, res) {
    var pageId = req.params.pid;
    for (var p in pages) {
      var pg = pages[p];
      if (pg._id === pageId) {
        pages.splice(p, 1);
        res.sendStatus(200);
        return;
      }
    }
    res.sendStatus(404);
  }
};