(function () {
  angular
    .module("WebAppMaker")
    .factory("WidgetService", WidgetService);

  function WidgetService() {
    var widgets = [
      { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
      { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
      { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
      { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
      { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
      { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
      { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    var api = {
      "createWidget": createWidget,
      "findWidgetsByPageId": findWidgetsByPageId,
      "findWidgetById": findWidgetById,
      "updateWidget": updateWidget,
      "deleteWidget": deleteWidget
    };
    return api;

    function createWidget(pageId, widget) {
      var newWidget = angular.copy(widget);
      newWidget.pageId = pageId;
      widgets.push(newWidget);
    }

    function findWidgetsByPageId(pageId) {
      return widgets.filter(function(wg) {
        return ws.pageId === pageId;
      })
    }

    function findWidgetById(widgetId) {
      return widgets.filter(function(wg) {
        return wg._id === widgetId;
      })[0];
    }

    function updateWidget(widgetId, widget) {
      var res = null;
      widgets.map(function(ws) {
        if (ws._id === widgetId) {
          res = angular.copy(widget);
          return res;
        }
      });
      return res;
    }

    function deleteWidget(widgetId) {
      for (var w in widgets) {
        var wg = widgets[w];
        if (wg._id === widgetId) {
          widgets.splice(w, 1);
        }
      }
    }
  }
})
();