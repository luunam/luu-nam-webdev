(function () {
  angular
    .module("WebAppMaker")
    .factory("UserService", UserService);

  function UserService() {
    var users = [
      {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
      {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
      {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
      {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    var api = {
      "createUser": createUser,
      "findUserById": findUserById,
      "findUserByUsername": findUserByUsername,
      "findUserByCredentials": findUserByCredentials,
      "updateUser": updateUser,
      "deleteUser": deleteUser
    };
    return api;
    function createUser(user) {
      users.push(user);
    }


    function findUserById(id) {
      for (var u in users) {
        var user = users[u];

        if (user._id == id) {
          return angular.copy(user);
        }
      }
    }

    function findUserByUsername(username) {
      for (var u in users) {
        var user = users[u];

        if (user.username == username) {
          return angular.copy(user);
        }
      }
    }

    function findUserByCredentials(username, password) {
      for (var u in users) {
        var user = users[u];

        if (user.username == username && user.password == password) {
          return angular.copy(user);
        }
      }
    }

    function updateUser(userId, user) {
      for (var u in users) {
        var usr = users[u];
        if(usr._id === userId) {
          users[u] = angular.copy(user);
          return user;
        }
      }
      return null;
    }

    function deleteUser(userId) {
      for (var u in users) {
        var usr = users[u];
        if (usr._id === userId) {
          users.splice(u, 1);
          return usr;
        }
      }
      return null;
    }

  }
})
();