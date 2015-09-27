//angular.module('jpSite', function () {
//	.controller
//});

var app = angular.module('jpSite', ['ngRoute']);

// Main Controller
app.controller('MainCtrl', ['$scope', '$route', '$routeParams', '$location',
  function($scope, $route, $routeParams, $location) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;

    $scope.$on('$viewContentLoaded', function(event){
		$scope.$broadcast('viewLoaded');
	});
}]);

// View Controllers
app.controller('musicPostCtrl', function ($scope, $sce, $http) {
	$scope.posts = {};

	$http.get('data/musicPosts.json').
	    success(function(data, status, headers, config) {
	      $scope.posts.musicPosts = data;
	    }).
	    error(function(data, status, headers, config) {
	      alert("Error: Could not retrieve data.")
	    });
})
.controller('socialCtrl', function ($scope) {
	$scope.$on('viewLoaded', function(event){
		new Juicer.Views.Feed({el: '.juicer-feed' }).render();
	});
})
.controller('videoPostCtrl', function ($scope, $sce, $http) {
	$scope.posts = {};

	$http.get('data/videoPosts.json').
	    success(function(data, status, headers, config) {
	      $scope.posts.videoPosts = data;
	    }).
	    error(function(data, status, headers, config) {
	      alert("Error: Could not retrieve data.")
	    });
})
.controller('contactCtrl', function ($scope, $sce, $http, $document) {
	$scope.$on('viewLoaded', function(event){
		/*t = 'contactForm';
	   var g = $document.createElement('t'),
	       s = $document.getElementsByTagName(t)[0];
	   g.src = "http://www.foxyform.com/js.php?id=701586&sec_hash=b97f1fa8968&width=350px";
	   s.parentNode.insertBefore(g, s);
		*/
	});
});

// Routing
app.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function ($routeProvider, $locationProvider, $sceDelegateProvider) {
$routeProvider
// Home / News
.when("/", {templateUrl: "html/news.html"})
// Music
.when("/music", {templateUrl: "html/music.html"})
// Videos
.when("/videos", {templateUrl: "html/videos.html"})
// Social
.when("/social", {templateUrl: "html/social.html"})
// Blog
.when("/blog", {templateUrl: "html/blog.html"})
//About
.when("/about", {templateUrl: "html/about.html"})
// Contact
.when("/contact", {templateUrl: "html/contact.html"})

$sceDelegateProvider.resourceUrlWhitelist(
	[
     'self',
     '*://www.youtube.com/**',
     '*://w.soundcloud.com/**',
     '*.juicer.io/**',
     '*://wwww.foxyform.com/**'
     /*,
     '*.facebook.com/**',
     '*scontent.cdninstagram.com/**'*/
	]
);

}]);



