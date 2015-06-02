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
            "commentSummary": $scope.comment.summary.replace(/["']/g, ""),
            "commentText": $scope.comment.text.replace(/\r?\n/g, '<br />').replace(/["']/g, "")
        }).then(function () {
            var comment = {
                "summary": $scope.comment.summary,
                "text": $scope.comment.text,
                "timestamp": Date.now()
            };

            $scope.comments.push(comment);
            $scope.commentForm.$setPristine();
            $scope.comment.summary = '';
            $scope.comment.text = '';

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

    $scope.prepopulateCommentForm = function (index) {
        $scope.updateCommentBtns = true;
        $scope.commentIdToUpdate = $scope.comments[index].id;

        $scope.comment = {
            "summary": $scope.comments[index].summary,
            "text": $scope.comments[index].text
        };
    };

    $scope.clearCommentForm = function () {
        var clearedForm = {
            "summary": "",
            "text": ""
        };

        $scope.commentForm.$setPristine();
        $scope.comment = clearedForm;
    };

    $scope.editComment = function () {
        BlogService.editComment({
            "postId": $routeParams.id,
            "commentId": $scope.commentIdToUpdate,
            "commentText": $scope.comment.text.replace(/\r?\n/g, '<br />').replace(/["']/g, ""),
            "commentSummary": $scope.comment.summary.replace(/["']/g, "")
        }).then(function () {
            $scope.clearCommentForm();
            $scope.updateCommentBtns = false;
            BlogService.getComments($routeParams.id).then(function (payload) {
                $scope.comments = payload.data;
            });
        });
    }

});