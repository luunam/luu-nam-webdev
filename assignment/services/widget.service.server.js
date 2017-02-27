module.exports = function(app) {
  app.post("/api/page/:pid/widget", createWidget);
  app.get("/api/page/:pid/widget", findWidgetsByPageId);
  app.get("/api/widget/:wgid", findWidgetById);
  app.put("/api/widget/:wgid", updateWidget);
  app.delete("/api/widget/:wgid", deleteWidget);

  var widgets = [
    {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
    {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
      "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
      "url": "http://lorempixel.com/400/200/"
    },
    {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
      "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
      "url": "https://youtu.be/AM2Ivdi9c4E"
    },
    {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
  ];

  function createWidget(req, res) {
    var newWidget = req.body;
    newWidget.pageId = req.params.pid;
    widgets.push(newWidget);
    res.sendStatus(200);
  }

  function findWidgetsByPageId(pageId) {
    return widgets.filter(function (wg) {
      return wg.pageId === pageId;
    })
  }

  function findWidgetById(widgetId) {
    var widgetFound = widgets.filter(function (wg) {
      return wg._id === widgetId;
    })[0];

    return angular.copy(widgetFound);
  }

  function updateWidget(widgetId, widget) {
    var res = null;
    console.log("TEST");
    widgets.map(function (wg) {
      if (wg._id === widgetId) {
        for (var k in widget) {
          wg[k] = widget[k];
        }
        res = widget;
      }
    });
    return res;
  }

  function deleteWidget(widgetId) {
    console.log('DELETE');
    for (var w in widgets) {
      var wg = widgets[w];
      if (wg._id === widgetId) {
        widgets.splice(w, 1);
      }
    }
  }

  function getWidget() {
    return widgets;
  }
};