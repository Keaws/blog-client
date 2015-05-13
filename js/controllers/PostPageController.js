app.controller('PostPageController', function($scope, BlogService, $routeParams) {
	BlogService.getPost($routeParams.id).then(function(payload) {
		$scope.post = payload.data;
	});

	BlogService.getPostComments($routeParams.id).then(function(payload) {
		$scope.comments = payload.data;
	});
});