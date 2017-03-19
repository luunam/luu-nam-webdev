module.exports = function () {

  var mongoose = require('mongoose');
  var q = require('q');
  var userSchema = require('./user.schema.server.js')();
  var userModel = mongoose.model('User', userSchema);

  var api = {
    createUser: createUser,
    findUserById: findUserById,
    findUserByUsername: findUserByUsername,
    findUserByCredentials: findUserByCredentials,
    updateUser: updateUser,
    deleteUser: deleteUser
  };

  return api;

  function findUserById(userId) {
    var deferred = q.defer();
    userModel
      .findById(userId, function (err, actor) {
        if (err) {
          deferred.abort(err);
        } else {
          deferred.resolve(actor);
        }
      });
    return deferred.promise;
  }

  function findUserByUsername(username) {
    var deferred = q.defer();
    userModel
      .findOne({username: username})
      .exec(function(err, user) {
        if (err) {
          deferred.abort(err);
        } else {
          deferred.resolve(user);
        }
      });
    return deferred.promise;
  }

  function findUserByCredentials(username, password) {
    var deferred = q.defer();
    userModel
      .findOne({username: username, password: password})
      .exec(function(err, user) {
        if (err) {
          deferred.abort(err);
        } else {
          deferred.resolve(user);
        }
      });
    return deferred.promise;
  }

  function updateUser(userId, user) {
    var deferred = q.defer();
    userModel
      .findOneAndUpdate({_id: userId}, user, function(err, doc) {
        if (err) {
          deferred.abort(err);
        } else {
          deferred.resolve(doc);
        }
      });
    return deferred.promise;
  }

  function deleteUser(userId) {
    var deferred = q.defer();
    userModel.remove({_id: userId}, function (err, status) {
      if(err) {
        deferred.abort(err);
      } else {
        deferred.resolve(status);
      }
    });
    return deferred.promise;
  }


  function createUser(user) {
    var deferred = q.defer();
    userModel.create(user, function(err, doc) {
      if (err) {
        deferred.abort();
      } else {
        deferred.resolve();
      }
    });
    return deferred.promise;
  }
};