(function () {
  angular
    .module("WebAppMaker")
    .factory("PageService", PageService);

  function PageService() {
    var pages = [
      { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
      { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
      { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    var api = {
      "createPage": createPage,
      "findPageByWebsiteId": findPageByWebsiteId,
      "findPageById": findPageById,
      "updatePage": updatePage,
      "deletePage": deletePage
    };
    return api;

    function createPage(websiteId, page) {
      var newPage = angular.copy(page);
      newPage.websiteId = websiteId;
      pages.push(newPage);
    }

    function findPageByWebsiteId(websiteId) {
      return pages.filter(function(pg) {
        return pg.websiteId === websiteId;
      })
    }

    function findPageById(pageId) {
      var pageFound = pages.filter(function(pg) {
        return pg._id === pageId;
      })[0];

      return angular.copy(pageFound);
    }

    function updatePage(pageId, page) {
      var res = null;
      pages.map(function(pg) {
        if (pg._id === pageId) {
          for (var k in page) {
            pg[k] = page[k];
          }
          res = k;
        }
      });

      return res;
    }

    function deletePage(pageId) {
      for (var p in pages) {
        var pg = pages[p];
        if (pg._id === pageId) {
          pages.splice(p, 1);
        }
      }
    }
  }
})
();