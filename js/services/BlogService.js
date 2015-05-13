app.service('BlogService', function($http) {

	this.getPosts = function() {
		return $http({
			url: 'http://localhost:3003/api/posts?begin=0&length=10',
			method: 'GET'
		});
	}

	this.getPost = function(postId) {
		return $http({
			url: 'http://localhost:3003/api/posts/' + postId,
			method: 'GET'
		});
	}

	this.getComments = function(postId) {
		return $http({
			url: 'http://localhost:3003/api/posts/' + postId + '/comments',
			method: 'GET'
		});
	}

	this.postComment = function(params) {
		return $http({
			url: 'http://localhost:3003/api/posts/' + params.postId + '/comments',
			method: 'POST',
			data: '{"text":"'+ params.commentText +'","summary":"'+ params.commentSummary +'"}',
    		headers: {
    			'Content-Type': 'application/json'
    		}
		});
	}

});