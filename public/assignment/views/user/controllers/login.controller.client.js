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
      user = UserService.findUserByCredentials(vm.user.username, vm.user.password);
      if(user) {
        $location.url("/user/" + user._id);
      } else {
        vm.error = "Unable to login";
      }
    }

    function register() {
      $location.url("/register");
    }
  }

  function RegisterController(UserService, $location) {
    var vm = this;
    vm.createUser = createUser;

    function createUser(user) {
      user._id = 'test';
      UserService.createUser(user);
      $location.url("/user/test");
    }
  }

  function ProfileController($routeParams, UserService) {
    var vm = this;
    vm.uid = $routeParams["uid"];
    console.log(UserService.getUsers());
    function init() {
      vm.user = UserService.findUserById(vm.uid);
    }

    init();
  }

})();