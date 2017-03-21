(function () {
  angular
    .module("WebAppMaker")
    .factory("WidgetService", WidgetService);

  function WidgetService($http) {

    var api = {
      "createWidget": createWidget,
      "findWidgetsByPageId": findWidgetsByPageId,
      "findWidgetById": findWidgetById,
      "updateWidget": updateWidget,
      "deleteWidget": deleteWidget,
      "sortWidget": sortWidget,
      "setPhoto": setPhoto,
      "getPhoto": getPhoto
    };
    return api;

    function createWidget(pageId, widget) {
      return $http.post("/api/page/" + pageId + "/widget", widget);
    }

    function findWidgetsByPageId(pageId) {
      return $http.get("/api/page/" + pageId + "/widget");
    }

    function findWidgetById(widgetId) {
      return $http.get("/api/widget/" + widgetId);
    }

    function updateWidget(widgetId, widget) {
      return $http.put("/api/widget/" + widgetId, widget);
    }

    function deleteWidget(widgetId) {
      return $http.delete("/api/widget/" + widgetId);
    }

    function sortWidget(pid, idx1, idx2) {
      return $http.put("/api/page/" + pid + "/widget?initial=" + idx1 + "&final=" + idx2);
    }

    function setPhoto(photo) {
      this.photo = photo;
    }

    function getPhoto() {
      var ret = this.photo;
      this.photo = null;
      return ret;
    }
  }
})();