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

    vm.update = false;
    function init() {
      vm.widget = {};
      if (vm.wgid === 'nl_header') {
        vm.widget.widgetType = 'HEADER';
      } else if (vm.wgid === 'nl_image') {
        vm.widget.widgetType = 'IMAGE';
      } else if (vm.wgid === 'nl_youtube') {
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
        WidgetService.createWidget(vm.pid, vm.widget);
      }
      console.log(WidgetService.getWidget());
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
    }
  }

})();