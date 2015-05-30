app.controller('MainController', function ($scope, BlogService) {
    BlogService.getPosts().then(function (payload) {
        $scope.posts = payload.data;
    });

    $scope.addPost = function () {
        BlogService.addPost({
            "text": $scope.text,
            "title": $scope.title,
            "author": $scope.author,
            "timestamp": Date.now()
        }).then(function () {
            var post = {
                "title": $scope.title,
                "text": $scope.text,
                "timestamp": Date.now(),
                "author": $scope.author
            };

            $scope.posts.push(post);
            $scope.postForm.$setPristine();
            $scope.text = '';
            $scope.title = '';
            $scope.author = '';
            $scope.showAddPostBtn = true;

            BlogService.getPosts().then(function (payload) {
                $scope.posts = payload.data;
            });
        });
    };

    $scope.deletePost = function (index) {
        BlogService.deletePost($scope.posts[index].id).then(function () {
            BlogService.getPosts().then(function (payload) {
                $scope.posts = payload.data;
            });
        });
    };
});