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

// File Reader
function readFile (filePath) {
	if (FileReader) {
		if (window.File && window.FileReader && window.FileList && window.Blob) {
		  var reader = new FileReader();
		  
		  reader.onload = function(e) {
		  	return reader.result;
		  }
		  
		  reader.readAsText(filePath);
		} else {
		  alert('Whoops. Your browser not supported.');
		}
	}
}

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
    //$scope.posts.musicPosts = readFile('data/musicPosts.txt');

    /*[
    	{
    		title: 'First Post',
    		date: 'Jan 1',
    		description: 'Fist music post.',
    		embedLink: $sce.trustAsResourceUrl('https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/220882008&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false')
    	},
    	{
    		title: 'Second Post',
    		date: 'Feb 2',
    		description: 'Second music post.',
    		embedLink: $sce.trustAsResourceUrl('https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/163063336&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false')
    	},
    	{
    		title: 'Third Post',
    		date: 'Oct 13',
    		description: 'Third music post.',
    		embedLink: $sce.trustAsResourceUrl('https://www.youtube.com/embed/GkXLLaBTGZI?rel=0')
    	}
    ]*/

});

