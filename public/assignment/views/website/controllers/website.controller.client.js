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

  function NewWebsiteController() {
    var vm = this;
  }

  function EditWebsiteController($routeParams, WebsiteService) {
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
    }

    function deleteWebsite() {
      WebsiteService.deleteWebsite(vm.wid);
    }
  }

})();