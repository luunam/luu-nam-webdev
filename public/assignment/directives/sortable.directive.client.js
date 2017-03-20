(function () {
  angular
    .module('WebAppMaker')
    .directive('wbdvSortable', sortableDir);

  function sortableDir(WidgetService) {
    function linkFunc(scope, element, attributes) {
      element.sortable({
        axis: 'y',
        start: function (event, ui) {
          startIndex = ui.item.index();
        },
        stop: function (event, ui) {
          endIndex = ui.item.index();
          WidgetService.sortWidget(attributes.wbdvSortable, startIndex, endIndex)
            .success(function(res) {
              console.log("success");
            })
            .error(function() {
              console.log("cannot sort widget");
            })
        }
      });
    }

    return {
      link: linkFunc
    };
  }
})();