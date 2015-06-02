app.controller('MainController', function ($scope, BlogService) {
    BlogService.getPosts().then(function (payload) {
        $scope.posts = payload.data;
    });

    $scope.addPost = function () {
        var post = {
            "text": $scope.post.text,
            "title": $scope.post.title,
            "author": $scope.post.author,
            "timestamp": Date.now()
        };

        BlogService.addPost(post).then(function () {
            $scope.posts.push(post);
            $scope.clearPostForm();
            $scope.showAddPostBtn = true;

            BlogService.getPosts().then(function (payload) {
                $scope.posts = payload.data;
            });
        });
    };

    $scope.clearPostForm = function () {
        var clearedForm = {
            "title": "",
            "text": ""
        };

        $scope.postForm.$setPristine();
        $scope.post = clearedForm;
    };

    $scope.deletePost = function (index) {
        BlogService.deletePost($scope.posts[index].id).then(function () {
            BlogService.getPosts().then(function (payload) {
                $scope.posts = payload.data;
            });
        });
    };

    $scope.prepopulatePostForm = function (index) {
        $scope.showUpdateBtn = true;
        $scope.showAddPostBtn = false;
        $scope.postIndexToUpdate = index;

        $scope.post = {
            "title": $scope.posts[index].title,
            "text": $scope.posts[index].text,
            "author": $scope.posts[index].author
        };
    };

    $scope.editPost = function () {
        var postId = $scope.posts[$scope.postIndexToUpdate].id;
        BlogService.editPost({
            "postId": postId,
            "postText": $scope.post.text,
            "postTitle": $scope.post.title,
            "postAuthor": $scope.post.author
        }).then(function () {
            $scope.clearPostForm();
            $scope.showAddPostBtn = true;
            BlogService.getPosts().then(function (payload) {
                $scope.posts = payload.data;
            });
        })
    }
});