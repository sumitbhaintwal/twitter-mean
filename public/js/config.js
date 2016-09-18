app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
	
	$locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise('/');
	
	$stateProvider
		.state('home', {
			url : '/',
			templateUrl : 'templates/home.html',
			controller : 'ctrl'
		});	
});