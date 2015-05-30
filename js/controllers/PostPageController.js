app.controller('PostPageController', function ($scope, BlogService, $routeParams) {
    BlogService.getPost($routeParams.id).then(function (payload) {
        $scope.post = payload.data;
    });

    BlogService.getComments($routeParams.id).then(function (payload) {
        $scope.comments = payload.data;
    });

    $scope.postComment = function () {
        BlogService.postComment({
            "postId": $routeParams.id,
            "commentSummary": $scope.summary,
            "commentText": $scope.text
        }).then(function () {
            var comment = {
                "summary": $scope.summary,
                "text": $scope.text,
                "timestamp": Date.now()
            };

            $scope.comments.push(comment);
            $scope.commentForm.$setPristine();
            $scope.summary = '';
            $scope.text = '';

            BlogService.getComments($routeParams.id).then(function (payload) {
                $scope.comments = payload.data;
            });
        });
    };

    $scope.deleteComment = function (index) {
        BlogService.deleteComment({
            "postId": $routeParams.id,
            "commentId": $scope.comments[index].id
        }).then(function () {
            BlogService.getComments($routeParams.id).then(function (payload) {
                $scope.comments = payload.data;
            });
        });
    };

});