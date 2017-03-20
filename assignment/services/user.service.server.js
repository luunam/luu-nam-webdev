module.exports = function (app, model) {
  app.get("/api/user", findUser);
  app.get("/api/user/:userId", findUserByUserId);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);
  app.post("/api/user", createUser);

  function deleteUser(req, res) {
    model.userModel
      .deleteUser(req.params.userId)
      .then(function () {
        res.sendStatus(200);
      }, function (err) {
        res.sendStatus(404);
      });
  }

  function createUser(req, res) {
    var newUser = req.body;
    model.userModel
      .createUser(newUser)
      .then(function (user) {
        res.send(user);
      }, function (error) {
        res.status(500).send(error);
      });
  }

  function updateUser(req, res) {
    model.userModel
      .updateUser(req.params['userId'], req.body)
      .then(function (user) {
        res.json(user);
      }, function (error) {
        res.status(500).send(error);
      });
  }

  function findUserByUserId(req, res) {
    model.userModel
      .findUserById(req.params['userId'])
      .then(function (user) {
        res.send(user);
      }, function (error) {
        res.status(404).send(error);
      });
  }

  function findUser(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    if(username && password) {
      findUserByCredentials(req, res);
    } else if(username) {
      findUserByUsername(req, res);
    }
  }

  function findUserByUsername(req, res) {
    model.userModel
      .findUserByUsername(req.query['username'])
      .then(function (user) {
        res.send(user);
      }, function (error) {
        res.status(404).send(error);
      });
  }

  function findUserByCredentials(req, res) {
    model.userModel
      .findUserByCredentials(req.query['username'], req.query['password'])
      .then(function (user) {
        res.json(user);
      }, function (error) {
        res.status(404).send(error);
      });
  }
};