app.service('BlogService', function($http) {

	this.getPosts = function() {
		return $http({
			url: 'http://localhost:3003/api/posts?begin=0&length=10',
			method: 'GET'
		});
	}

});