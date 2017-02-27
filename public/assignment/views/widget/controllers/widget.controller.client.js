(function() {
  angular
    .module("WebAppMaker")
    .controller("WidgetListController", WidgetListController)
    .controller("NewWidgetController", NewWidgetController)
    .controller("EditWidgetController", EditWidgetController);

  function WidgetListController($routeParams, WidgetService, $sce) {
    var vm = this;
    vm.pid = $routeParams["pid"];
    vm.uid = $routeParams["uid"];
    vm.wid = $routeParams["wid"];

    vm.getYoutubeEmbedUrl = getYoutubeEmbedUrl;
    vm.getTrustedHtml = getTrustedHtml;

    function init() {
      vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
    }

    init();

    function getYoutubeEmbedUrl(widgetUrl) {
      var urlParts = widgetUrl.split('/');
      var id = urlParts[urlParts.length - 1];

      var url = "https://www.youtube.com/embed/" + id;
      console.log('URL');
      console.log(url);
      return $sce.trustAsResourceUrl(url);
    }

    function getTrustedHtml(url) {
      return $sce.trustAsHtml(url);
    }
  }

  function NewWidgetController($routeParams, $location) {
    var vm = this;
    vm.pid = $routeParams["pid"];
    vm.uid = $routeParams["uid"];
    vm.wid = $routeParams["wid"];

    vm.createWidget = createWidget;

    function createWidget(type) {
      var wgid = 'nl_' + type;
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + wgid);
    }
  }

  function EditWidgetController($routeParams, WidgetService, $location) {
    var vm = this;
    vm.pid = $routeParams["pid"];
    vm.uid = $routeParams["uid"];
    vm.wid = $routeParams["wid"];
    vm.wgid = $routeParams["wgid"];

    vm.updateWidget = updateWidget;
    vm.deleteWidget = deleteWidget;

    vm.update = false;
    function init() {
      vm.widget = {};
      if (vm.wgid === 'nl_HEADER') {
        vm.widget.widgetType = 'HEADER';
      } else if (vm.wgid === 'nl_IMAGE') {
        vm.widget.widgetType = 'IMAGE';
      } else if (vm.wgid === 'nl_YOUTUBE') {
        vm.widget.widgetType = 'YOUTUBE';
      } else {
        vm.widget = WidgetService.findWidgetById(vm.wgid);
        vm.update = true;
      }
    }

    init();

    function updateWidget() {
      if (vm.update) {
        WidgetService.updateWidget(vm.wgid, vm.widget);
      } else {
        vm.widget.type = vm.type;
        vm.widget._id = 'test';
        WidgetService.createWidget(vm.pid, vm.widget);
      }
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
    }

    function deleteWidget() {
      WidgetService.deleteWidget(vm.wgid);
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
    }
  }
})();