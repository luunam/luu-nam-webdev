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
    console.log('sort');
    model.widgetModel
      .reorderWidget(req.params.pid, req.query['initial'], req.query['final'])
      .then(function () {
        res.sendStatus(200);
      }, function (err) {
        res.status(404).send(err);
      });
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
      .updateWidget(req.params.wgid, req.body)
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