//angular.module('jpSite', function () {
//	.controller
//});

var app = angular.module('jpSite', ['ngRoute']);

// Main Controller
app.controller('MainCtrl', ['$route', '$routeParams', '$location',
  function($route, $routeParams, $location) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
}]);

// Routing
app.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function ($routeProvider, $locationProvider, $sceDelegateProvider) {
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

$sceDelegateProvider.resourceUrlWhitelist(
	[
     'self',
     '*://www.youtube.com/**',
     '*://w.soundcloud.com/**'
	]
);

}]);

//Div Creation
app.controller('musicPostCtrl', function ($scope, $sce, $http) {
	$scope.posts = {};

	$http.get('data/musicPosts.json').
	    success(function(data, status, headers, config) {
	      $scope.posts.musicPosts = data;
	    }).
	    error(function(data, status, headers, config) {
	      alert("Error: Could not retrieve data.")
	    });
});

