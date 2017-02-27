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
      WebsiteService
        .findWebsitesByUser(vm.uid)
        .success(function(res) {
          vm.websites = res;
        })
        .error(function() {
          console.log("can't find websites by user");
        });

      console.log(vm.websites);
    }
    init();
  }

  function NewWebsiteController($routeParams, WebsiteService, $location) {
    var vm = this;
    vm.uid = $routeParams['uid'];
    vm.createWebsite = createWebsite;

    function init() {
      WebsiteService
        .findWebsitesByUser(vm.uid)
        .success(function(res) {
          vm.websites = res;
        })
        .error(function() {
          console.log("can't find websites by user");
        });
      console.log(vm.websites);
    }
    init();

    function createWebsite() {
      if (vm.website) {
        WebsiteService
          .createWebsite(vm.uid, vm.website)
          .success(function(res) {
            $location.url("/user/" + vm.uid + "/website");
          })
          .error(function() {
            console.log("fail to create website");
          });
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
      WebsiteService
        .findWebsitesByUser(vm.uid)
        .success(function(res) {
          vm.websites = res;
        })
        .error(function() {
          console.log("can't find websites by user");
        });

      WebsiteService.findWebsiteById(vm.wid)
        .success(function(res) {
          vm.website = res;
        })
        .error(function() {
          console.log("can't find website by id");
        })
    }
    init();

    function updateWebsite(website) {
      WebsiteService.updateWebsite(vm.wid, website)
        .success(function(res) {
          $location.url("/user/" + vm.uid + "/website");
        })
        .error(function() {
          console.log("can't update website");
        });
    }

    function deleteWebsite() {
      WebsiteService.deleteWebsite(vm.wid)
        .success(function(res) {
          $location.url("/user/" + vm.uid + "/website");
        })
        .error(function() {
          console.log("can't delete website");
        })
    }
  }

})();