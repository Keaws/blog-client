app.service('BlogService', function($http) {

	this.getPosts = function() {
		return $http({
			url: 'http://localhost:3003/api/posts?begin=0&length=10',
			method: 'GET'
		});
	};

	this.getPost = function(postId) {
		return $http({
			url: 'http://localhost:3003/api/posts/' + postId,
			method: 'GET'
		});
	};

	this.getComments = function(postId) {
		return $http({
			url: 'http://localhost:3003/api/posts/' + postId + '/comments',
			method: 'GET'
		});
	};

	this.postComment = function(params) {
		return $http({
			url: 'http://localhost:3003/api/posts/' + params.postId + '/comments',
			method: 'POST',
			data: '{"text":"'+ params.commentText +'","summary":"'+ params.commentSummary +'", "timestamp":"' + Date.now() + '"}',
    		headers: {
    			'Content-Type': 'application/json'
    		}
		});
	};

	this.deleteComment = function(params) {
		return $http({
			url: 'http://localhost:3003/api/posts/' + params.postId + '/comments/' + params.commentId,
			method: 'DELETE'
		});
	};

	this.addPost = function(params){
		return $http({
			url: 'http://localhost:3003/api/posts',
			method: 'POST',
			data: '{"text":"' + params.text + '","title":"' + params.title + '", "author":"' + params.author + '","timestamp":"' + Date.now() + '"}',
			headers: {
    			'Content-Type': 'application/json'
    		}
		});
	};

	this.deletePost = function(postId){
		return $http({
			url: 'http://localhost:3003/api/posts/' + postId,
			method: 'DELETE'
		});
	};

	this.editPost = function(params){
		return $http({
			url: 'http://localhost:3003/api/posts/' + params.postId,
			method: 'PUT',
			data: '{"text":"' + params.postText + '","title":"' + params.postTitle + '","author":"' + params.postAuthor + '"}',
			headers: {
    			'Content-Type': 'application/json'
    		}
		});
	};

});