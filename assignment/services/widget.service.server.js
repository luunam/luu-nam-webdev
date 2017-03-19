module.exports = function(app, model) {
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
    model.widgetModel
      .createWidget(req.params.pid, req.body)
      .then(function (widget) {
        res.status(200).send(widget);
      }, function (err) {
        res.status(404).send(err);
      });
  }

  function findWidgetsByPageId(req, res) {
    model.widgetModel
      .findAllWidgetsForPage(req.params.pid)
      .then(function (widgets) {
        res.status(200).send(widgets);
      }, function (err) {
        res.status(404).send(err);
      });
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
    model.widgetModel
      .findWidgetById(req.params.wgid)
      .then(function (widget) {
        res.status(200).send(widget);
      }, function (err) {
        res.status(404).send(err);
      });
  }

  function updateWidget(req, res) {
    model.widgetModel
      .udpateWidget(req.params.wgid, req.body)
      .then(function () {
        res.status(200).send();
      }, function (err) {
        res.status(404).send(err);
      });
  }

  function deleteWidget(req, res) {
    model.widgetModel
      .deleteWidget(req.params.wgid)
      .then(function () {
        res.status(200).send();
      }, function (err) {
        res.status(404).send(err);
      });
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