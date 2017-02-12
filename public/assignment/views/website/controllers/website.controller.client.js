(function() {
  angular
    .module("WebAppMaker")
    .controller("WebsiteListController", WebsiteListController)
    .controller("NewWebsiteController", NewWebsiteController)
    .controller("EditWebsiteController", EditWebsiteController);

  function WebsiteListController($routeParams, WebsiteService) {
    var vm = this;
    vm.uid = $routeParams["uid"];
    function init() {
      vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
    }
    init();
  }

  function NewWebsiteController($routeParams, WebsiteService, $location) {
    var vm = this;
    vm.uid = $routeParams['uid'];
    vm.createWebsite = createWebsite;

    function init() {
      vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
    }
    init();

    function createWebsite() {
      if (vm.website) {
        vm.website._id = 'test';
        WebsiteService.createWebsite(vm.uid, vm.website);
        $location.url("/user/" + vm.uid + "/website");
      }
    }
  }

  function EditWebsiteController($routeParams, WebsiteService, $location) {
    var vm = this;
    vm.uid = $routeParams["uid"];
    vm.wid = $routeParams['wid'];
    vm.updateWebsite = updateWebsite;
    vm.deleteWebsite = deleteWebsite;

    function init() {
      vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
      vm.website = WebsiteService.findWebsiteById(vm.wid);
    }
    init();

    function updateWebsite(website) {
      WebsiteService.updateWebsite(vm.wid, website);
      $location.url("/user/" + vm.uid + "/website");
    }

    function deleteWebsite() {
      WebsiteService.deleteWebsite(vm.wid);
      $location.url("/user/" + vm.uid + "/website");
    }
  }

})();