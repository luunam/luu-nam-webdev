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
      var lastPart = urlParts[urlParts.length-1];
      var urlParts2 = lastPart.split('=');
      var id = urlParts2[urlParts2.length - 1];

      var url = "https://www.youtube.com/embed/" + id;
      return $sce.trustAsResourceUrl(url);
    }

    function getTrustedHtml(url) {
      return $sce.trustAsHtml(url);
    }
  }

  function NewWidgetController($routeParams, $location, WidgetService) {
    var vm = this;
    vm.pid = $routeParams["pid"];
    vm.uid = $routeParams["uid"];
    vm.wid = $routeParams["wid"];

    vm.createWidget = createWidget;

    function createWidget(type) {
      widget = { widgetType: type };
      WidgetService.createWidget(vm.pid, widget)
        .success(function(res) {
          console.log('RES ', res);
          $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + res._id);
        })
        .error(function() {
          console.log("cannot create widget");
        });
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
    vm.uploadImage = uploadImage;

    vm.update = false;

    function init() {
      vm.widget = {};
      console.log(vm.wgid);
      WidgetService.findWidgetById(vm.wgid)
        .success(function(res) {
          vm.widget = res;
          console.log(vm.widget);
          if (vm.widget.widgetType === 'IMAGE') {
            var pt = WidgetService.getPhoto();
            console.log('pt ', pt);
            if (pt !== null) {
              vm.widget.url = pt;
            }
          }
        })
        .error(function() {
          console.log("find widget by id");
        });
    }

    init();

    function updateWidget() {
      WidgetService.updateWidget(vm.wgid, vm.widget)
        .success(function(res) {
          $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        })
        .error(function() {
          console.log("cannot update widget");
        });
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

    function uploadImage() {
      WidgetService.uploadImage()
    }
  }
})();