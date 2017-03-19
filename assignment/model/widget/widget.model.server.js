module.exports = function () {

  var mongoose = require('mongoose');
  var q = require('q');
  var widgetSchema = require('./widget.schema.server.js')();
  var widgetModel = mongoose.model('Widget', widgetSchema);

  var api = {
    createWidget: createWidget,
    findAllWidgetsForPage: findAllWidgetsForPage,
    findWidgetById: findWidgetById,
    updateWidget: updateWidget,
    deleteWidget: deleteWidget,
    reorderWidget: reorderWidget
  };

  return api;

  function createWidget(pid, widget) {
    var deferred = q.defer();
    widget._page = pid;
    widgetModel
      .create(widget, function (err, doc) {
        if (err) {
          console.log('ERROR WIDGET: ', err);
          deferred.reject(err);
        } else {
          deferred.resolve(doc);
        }
      });
    return deferred.promise;
  }

  function findAllWidgetsForPage(pid) {
    var deferred = q.defer();
    widgetModel
      .find({_page: pid}, function(err, widgets) {
        if (err) {
          deferred.abort(err);
        } else {
          deferred.resolve(widgets);
        }
      });
    return deferred.promise;
  }

  function findWidgetById(wgid) {
    var deferred = q.defer();
    widgetModel
      .findOne({_id: wgid}, function (err, widget) {
        if (err) {
          console.log(err);
          deferred.reject(err);
        } else {
          deferred.resolve(widget);
        }
      });
    return deferred.promise;
  }

  function updateWidget(wgid, widget) {
    var deferred = q.defer();
    widgetModel
      .findOneAndUpdate({_id: wgid}, widget, function(err, widget) {
        if (err) {
          deferred.abort(err);
        } else {
          deferred.resolve(widget);
        }
      });
    return deferred.promise;
  }

  function deleteWidget(wgid) {
    var deferred = q.defer();
    widgetModel
      .remove({_id: wgid}, function(err, doc) {
        if (err) {
          deferred.abort(err);
        } else {
          deferred.resolve(doc);
        }
      });
    return deferred.promise;
  }

  function reorderWidget(pid, start, end) {

  }
};