//angular.module('jpSite', function () {
//	.controller
//});

var app = angular.module('jpSite', ['ngRoute']);

app.controller('MainCtrl', ['$route', '$routeParams', '$location',
  function($route, $routeParams, $location) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
}]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
$routeProvider
// Home
.when("/", {templateUrl: "html/home.html"})
// Music
.when("/music", {templateUrl: "html/music.html"})
// Videos
.when("/videos", {templateUrl: "html/videos.html"})
// Social
.when("/social", {templateUrl: "html/social.html"})
// Blog
.when("/blog", {templateUrl: "html/blog.html"})
// Contact
.when("/contact", {templateUrl: "html/contact.html"})

}]);