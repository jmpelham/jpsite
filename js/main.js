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

	$scope.$on('viewLoaded', function() {
		$('#player').width('100%');
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
		var sa_params='';
		function sa_contactform(){
		var sa_frm=document.sa_htmlform;
		for(i=0; i<sa_frm.elements.length; i++){
		var sa_el=sa_frm.elements[i];if(sa_frm.elements[i].name){sa_params+='&'+sa_frm.elements[i].name+'='+encodeURIComponent(sa_frm.elements[i].value);}
		if(!sa_el.value && sa_el.getAttribute('required')=='true'){alert('Please complete all required fields');sa_el.focus();return false;}
		}
		var s = document.createElement('script');
		s.setAttribute('type','text/javascript');
		s.setAttribute('src','http://www.smartaddon.com/js/postform.js');
		document.body.appendChild(s);
		return false;
		}
		function sa_contactsent(){
		if(typeof sa_sent_text=='undefined'){sa_sent_text='Thank you for contacting us. We will get back to you soon.';}
		document.getElementById('sa_contactdiv').innerHTML=sa_sent_text+'<br><br>Contact Form provided by SmartAddon.com';
		}

		sa_params += '<input type=hidden name=emailid value="'+sa_email_id+'">';
		sa_params += '<input type=hidden name=session value="4dc50dca6f441117e9fdc0ebee5e631a">';
		sa_params += '<input type=hidden name=screensize value="'+screen.width+' x '+screen.height+'">';
		sa_params += '<input type=hidden name=useragent value="'+sa_htmlent(navigator.userAgent)+'">';
		sa_params += '<input type=hidden name=submittedfrom value="'+sa_htmlent(document.location.href)+'">';
		var sa_iframe = document.createElement("iframe");document.body.appendChild(sa_iframe);
		sa_iframe.setAttribute('style', 'width:1px;height:1px;display:none');
		var sa_frmcode = '<html><body><form method=post action="http://www.smartaddon.com/js/postform.php" name=pgfrm>'+sa_params+'</form><'+'script language="javascript">document.pgfrm.submit()<'+'/script></body></html>';
		sa_iframe.contentWindow.document.write(sa_frmcode);
		sa_contactsent();
	});
});

// Routing
app.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function ($routeProvider, $locationProvider, $sceDelegateProvider) {
$routeProvider
// Home / News
.when("/", {templateUrl: "html/about.html"})
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
     '*://wwww.foxyform.com/**',
     '*.smartaddon.com/**',
     '*.embedly.com/**',
     '*.tumblr.com/**',
     '*://bandcamp.com/**'
	]
);

}]);



