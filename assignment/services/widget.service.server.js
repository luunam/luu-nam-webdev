module.exports = function(app) {
  app.post("/api/page/:pid/widget", createWidget);
  app.put("/api/page/:pid/widget", sortWidget);
  app.get("/api/page/:pid/widget", findWidgetsByPageId);
  app.get("/api/widget/:wgid", findWidgetById);
  app.put("/api/widget/:wgid", updateWidget);
  app.delete("/api/widget/:wgid", deleteWidget);

  var multer = require('multer');
  var upload = multer({ dest: __dirname+'/../../public/uploads' });

  app.post ("/api/upload", upload.single('myFile'), uploadImage);

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
    newWidget._id = (new Date()).getTime() + "";
    widgets.push(newWidget);
    res.sendStatus(200);
  }

  function findWidgetsByPageId(req, res) {
    var pageId = req.params.pid;
    var rs = widgets.filter(function (wg) {
      return wg.pageId === pageId;
    });
    res.send(rs);
  }

  function sortWidget(req, res) {
    var initial = req.query['initial'];
    var final = req.query['final'];
    var pid = req.params.pid;

    var pageWidgets = widgets.filter(function(wg) {
      return wg.pageId == pid;
    });

    var remainingWidgets = widgets.filter(function(wg) {
      return wg.pageId != pid;
    });

    var item = pageWidgets.splice(initial, 1)[0];
    if (item != null) {
      pageWidgets.splice(final, 0, item);
    }

    widgets = remainingWidgets.concat(pageWidgets);
    res.sendStatus(200);
  }

  function findWidgetById(req, res) {
    var widgetId = req.params.wgid;
    var widgetFound = widgets.find(function (wg) {
      return wg._id === widgetId;
    });

    if (widgetFound) {
      res.send(widgetFound);
    } else {
      res.sendStatus(200);
    }
  }

  function updateWidget(req, res) {
    var widgetId = req.params.wgid;
    for (w in widgets) {
      wg = widgets[w];
      if (wg._id === widgetId) {
        for (var k in widget) {
          wg[k] = widget[k];
        }
        res.sendStatus(200);
        return;
      }
    }
    res.sendStatus(404);
  }

  function deleteWidget(req, res) {
    var widgetId = req.params.wgid;
    for (var w in widgets) {
      var wg = widgets[w];
      if (wg._id === widgetId) {
        widgets.splice(w, 1);
      }
    }
    res.sendStatus(200);
  }

  function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    res.status(200).send(myFile);
  }
};