(function() {
  angular
    .module("WebAppMaker")
    .service("FlickrService", FlickrService);

  // var secret = process.env.FLICKR_SECRET;
  function FlickrService($http) {
    var vm = this;

    $http.get('/api/env/flickrkey').success(function (res) {
      vm.key = res.result;
      console.log(vm.key);
    });
    // var secret = process.env.FLICKR_SECRET;
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    var api = {
      searchPhotos: searchPhotos
    };

    return api;

    function searchPhotos(searchTerm) {
      var url = urlBase.replace("API_KEY", vm.key).replace("TEXT", searchTerm);
      return $http.get(url);
    }
  }
})();