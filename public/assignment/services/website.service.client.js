(function () {
  angular
    .module("WebAppMaker")
    .factory("WebsiteService", WebsiteService);

  function WebsiteService() {
    var websites = [
      { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
      { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
      { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
      { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
      { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
      { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    var api = {
      "createWebsite": createWebsite,
      "findWebsitesByUser": findWebsitesByUser,
      "findWebsiteById": findWebsiteById,
      "updateWebsite": updateWebsite,
      "deleteWebsite": deleteWebsite
    };
    return api;

    function createWebsite(userId, website) {
      var newWebsite = angular.copy(website);
      newWebsite.developerId = userId;
      websites.push(newWebsite);
    }

    function findWebsitesByUser(userId) {
      return websites.filter(function(ws) {
        return ws.developerId === userId;
      })
    }

    function findWebsiteById(websiteId) {
      var websiteFound = websites.filter(function(ws) {
        return ws._id === websiteId;
      })[0];

      return angular.copy(websiteFound);
    }

    function updateWebsite(websiteId, website) {
      var res = null;
      websites.map(function(ws) {
        if (ws._id === websiteId) {
          for (var k in website) {
            ws[k] = website[k];
          }
          res = website;
        }
      });
      return res;
    }

    function deleteWebsite(websiteId) {
      for (var w in websites) {
        var ws = websites[w];
        if (ws._id === websiteId) {
          websites.splice(w, 1);
        }
      }
    }
  }
})
();