module.exports = function () {

  var mongoose = require('mongoose');
  var q = require('q');
  var websiteSchema = require('./website.schema.server.js')();
  var websiteModel = mongoose.model('Website', websiteSchema);

  var api = {
    createWebsiteForUser: createWebsiteForUser,
    findAllWebsitesForUser: findAllWebsitesForUser,
    findWebsiteById: findWebsiteById,
    updateWebsite: updateWebsite,
    deleteWebsite: deleteWebsite
  };

  return api;

  function createWebsiteForUser(userId, website) {
    var deferred = q.defer();
    website._user = userId;
    websiteModel
      .create(website, function(err, doc) {
        if (err) {
          deferred.abort(err);
        } else {
          deferred.resolve(doc);
        }
      });
    return deferred.promise;
  }

  function findAllWebsitesForUser(userId) {
    var deferred = q.defer();
    websiteModel
      .find({_user: userId}, function(err, websites) {
        if (err) {
          deferred.abort(err);
        } else {
          deferred.resolve(websites);
        }
      });
    return deferred.promise;
  }

  function findWebsiteById(wid) {
    var deferred = q.defer();
    websiteModel
      .findOne({_id: wid}, function (err, website) {
        if (err) {
          deferred.abort(err);
        } else {
          deferred.resolve(website);
        }
      });
    return deferred.promise;
  }

  function updateWebsite(wid, website) {
    var deferred = q.defer();
    websiteModel
      .findOneAndUpdate({_id: wid}, website, function(err, doc) {
        if (err) {
          deferred.abort(err);
        } else {
          deferred.resolve(doc);
        }
      });
    return deferred.promise;
  }

  function deleteWebsite(wid) {
    var deferred = q.defer();
    websiteModel.remove({_id: wid}, function (err, status) {
      if(err) {
        deferred.abort(err);
      } else {
        deferred.resolve(status);
      }
    });
    return deferred.promise;
  }
};