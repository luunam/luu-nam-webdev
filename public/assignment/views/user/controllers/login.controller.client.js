(function () {
  angular
    .module("WebAppMaker")
    .controller("LoginController", LoginController)
    .controller("RegisterController", RegisterController)
    .controller("ProfileController", ProfileController);

  function LoginController(UserService, $location) {
    var vm = this;
    vm.login = login;
    vm.register = register;
    vm.user = {};

    function login() {
      var promise = UserService.findUserByCredentials(vm.user.username, vm.user.password);
      promise
        .success(function (user) {
          var loginUser = user;
          if(loginUser != null) {
            $location.url('/user/' + loginUser._id);
          } else {
            vm.error = 'user not found';
          }
        })
        .error(function(err) {
          vm.error = 'user not found';
        });
    }

    function register() {
      $location.url("/register");
    }
  }

  function RegisterController(UserService, $location) {
    var vm = this;
    vm.createUser = createUser;

    function createUser(user) {
      UserService
        .findUserByUsername(user.username)
        .success(function (user) {
          vm.error = "sorry that username is taken"
        })
        .error(function(){
          UserService
            .createUser(user)
            .success(function(user){
              console.log('create user successfully');
              $location.url('/user/' + user._id);
            })
            .error(function () {
              vm.error = 'sorry could not register';
            });
        });
    }
  }

  function ProfileController($routeParams, UserService) {
    var vm = this;
    var userId = $routeParams['uid'];
    vm.unregisterUser = unregisterUser;

    function init() {
      UserService
        .findUserById(userId)
        .success(renderUser);
    }
    init();

    function unregisterUser(user) {
      var answer = confirm("Are you sure?");
      console.log(answer);
      if(answer) {
        UserService
          .deleteUser(user._id)
          .success(function () {
            $location.url("/login");
          })
          .error(function () {
            vm.error = 'unable to remove user';
          });
      }
    }

    function renderUser(user) {
      vm.user = user;
      console.log(user);
    }

    vm.updateUser = updateUser;

    function updateUser() {
      UserService
        .updateUser(userId, vm.user)
        .success(function (response) {
          vm.message = "user successfully updated";
          console.log("successful");
        })
        .error(function () {
          vm.error = "unable to update user";
        });
    }
  }

})();