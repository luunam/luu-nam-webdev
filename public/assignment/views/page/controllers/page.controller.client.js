(function() {
  angular
    .module("WebAppMaker")
    .controller("PageListController", PageListController)
    .controller("NewPageController", NewPageController)
    .controller("EditPageController", EditPageController);

  function PageListController($routeParams, PageService) {
    var vm = this;
    vm.wid = $routeParams["wid"];
    vm.uid = $routeParams['uid'];

    function init() {
      PageService.findPageByWebsiteId(vm.wid)
        .success(function (res) {
          vm.pages = res;
        })
        .error(function () {
          console.log("can't find page by website id");
        });
    }
    init();
  }

  function NewPageController($routeParams, $location, PageService) {
    var vm = this;
    vm.wid = $routeParams["wid"];
    vm.uid = $routeParams['uid'];

    vm.page = {};
    vm.createPage = createPage;

    function init() {
      PageService.findPageByWebsiteId(vm.wid)
        .success(function(res) {
          vm.pages = res;
        })
        .error(function() {
          console.log("can't find page by website id");
        })
    }
    init();

    function createPage() {
      PageService.createPage(vm.wid, vm.page)
        .success(function(res) {
          $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
        })
        .error(function() {
          console.log("can't create page");
        })
    }
  }

  function EditPageController($routeParams, PageService, $location) {
    var vm = this;
    vm.pid = $routeParams["pid"];
    vm.wid = $routeParams["wid"];
    vm.uid = $routeParams['uid'];

    vm.updatePage = updatePage;
    vm.deletePage = deletePage;

    function init() {
      PageService.findPageById(vm.pid)
        .success(function(res) {
          vm.page = res;
        })
        .error(function() {
          console.log("can't find page by id");
        });

      PageService.findPageByWebsiteId(vm.wid)
        .success(function (res) {
          vm.pages = res;
        })
        .error(function () {
          console.log("can't find page by website id");
        });
    }
    init();

    function updatePage() {
      PageService.updatePage(vm.pid, vm.page)
        .success(function(res) {
          $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
        })
        .error(function() {
          console.log("cannot update page");
        });
    }

    function deletePage() {
      PageService.deletePage(vm.pid)
        .success(function(res) {
          $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
        })
        .error(function() {
          console.log("cannot delete page");
        });
    }
  }

})();