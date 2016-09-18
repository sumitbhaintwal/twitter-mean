app.controller('ctrl', function($scope, $http, $state){

	$http.get('/api/tweets').then(function(response){
		$scope.tweets = response.data.data;

		$scope.name = $scope.tweets[0].user.name;
	
		$scope.tweetData = [];
		for(var i=0;i<10;i++){
			
			tweets = {
				tweet : $scope.tweets[i].text,
				created_at : $scope.tweets[i].created_at
			}
			$scope.tweetData.push(tweets);
		}
		data = {
			name: $scope.tweets[0].user.name,
			screen_name : $scope.tweets[0].user.screen_name,
			tweets : $scope.tweetData
		}

		$scope.refresh = function(){
			$state.reload();
		}

		$http.post('/api/save', data).then(function(response){
		if(response.data.status === 1){
				console.log("Added");
			}
			else{
				console.log("Failed");
			}
		});
	})

	$scope.changeUser = function(){
		userData = {
			username : $scope.username
		}
		$http.post('/api/newUser', userData).then(function(response){
			console.log(response);
		});
	}

	$('.username').dblclick(function(){

	});

});	