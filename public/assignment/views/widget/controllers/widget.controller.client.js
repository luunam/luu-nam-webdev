(function() {
  angular
    .module("WebAppMaker")
    .controller("WidgetListController", WidgetListController)
    .controller("NewWidgetController", NewWidgetController)
    .controller("EditWidgetController", EditWidgetController);

  function WidgetListController($routeParams, WidgetService) {
    var vm = this;
    vm.pid = $routeParams["pid"];
    function init() {
      vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
    }

    init();
  }

  function NewWidgetController() {
    var vm = this;
  }

  function EditWidgetController($routeParams, WidgetService) {
    var vm = this;
    vm.wgid = $routeParams["wgid"];

    function init() {
      vm.widget = WidgetService.findUserById(vm.wgid);
    }

    init();
  }

})();