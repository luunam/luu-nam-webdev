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
      WidgetService.findWidgetsByPageId(vm.pid)
        .success(function(res) {
          vm.widgets = res;
        })
        .error(function() {
          console.log("cannot find widgets by page id");
        });
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
    vm.deleteWidget = deleteWidget;

    vm.update = false;
    function init() {
      vm.widget = {};
      console.log('init');
      console.log(vm.wgid);
      if (vm.wgid === 'nl_HEADER') {
        vm.widget.widgetType = 'HEADER';
      } else if (vm.wgid === 'nl_IMAGE') {
        vm.widget.widgetType = 'IMAGE';
      } else if (vm.wgid === 'nl_YOUTUBE') {
        vm.widget.widgetType = 'YOUTUBE';
      } else {
        WidgetService.findWidgetById(vm.wgid)
          .success(function(res) {
            vm.widget = res;
            vm.update = true;
          })
          .error(function() {
            console.log("find widget by id");
          });
      }
    }

    init();

    function updateWidget() {
      if (vm.update) {
        WidgetService.updateWidget(vm.wgid, vm.widget)
          .success(function(res) {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
          })
          .error(function() {
            console.log("cannot update widget");
          });

      } else {
        console.log(vm.widget);
        vm.widget.type = vm.type;
        WidgetService.createWidget(vm.pid, vm.widget)
          .success(function(res) {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
          })
          .error(function() {
            console.log("cannot create widget");
          });
      }

    }

    function deleteWidget() {
      WidgetService.deleteWidget(vm.wgid)
        .success(function(res) {
          $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        })
        .error(function() {
          console.log("can't delete widget");
        });
    }
  }
})();