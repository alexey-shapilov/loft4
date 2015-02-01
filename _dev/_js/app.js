!function (angular) {
    var contactsApp = angular.module('contactsApp',
        ['ngRoute',
            'ngAnimate',
            'firebase',
            'contactsControllers',
            'contactsServices'
        ]);

    contactsApp.value(
        {
            fbUrl: 'https://loft4.firebaseio.com/'
        }
    );

    contactsApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/',
            {
                templateUrl: 'views/contacts.html',
                controller: 'ContactsController'
            })
            .when('/contact/add',
            {
                templateUrl: 'views/contact-edit.html',
                controller: 'ContactController'
            })
            .when('/contact/edit/:id',
            {
                templateUrl: 'views/contact-edit.html',
                controller: 'ContactController'
            })
    }]);
}(angular);