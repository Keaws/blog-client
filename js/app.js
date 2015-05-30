var app = angular.module('blog', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'MainController',
            templateUrl: 'views/post-list.html'
        })
        .when('/posts/:id', {
            controller: 'PostPageController',
            templateUrl: 'views/post-details.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});