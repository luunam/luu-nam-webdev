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
      vm.pages = PageService.findPageByWebsiteId(vm.wid);
      console.log(vm.pages);
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
      vm.pages = PageService.findPageByWebsiteId(vm.wid);
    }
    init();

    function createPage() {
      vm.page._id = 'test';
      PageService.createPage(vm.wid, vm.page);
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
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
      vm.page = PageService.findPageById(vm.pid);
      vm.pages = PageService.findPageByWebsiteId(vm.wid);
      console.log(vm.page);
    }
    init();

    function updatePage() {
      PageService.updatePage(vm.pid, vm.page);
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
    }

    function deletePage() {
      PageService.deletePage(vm.pid);
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
    }

  }

})();