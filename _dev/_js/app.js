!function (angular) {
    var contactsApp = angular.module('contactsApp',
        ['ngRoute',
            'ngAnimate',
            'firebase',
            'contactsControllers',
            'contactsServices',
            'contactsDirectives',
            'blueimp.fileupload'
        ]);

    contactsApp.value(
        {
            fbUrl: 'https://loft4.firebaseio.com/'
        }
    );

    contactsApp.config(['$routeProvider', 'fileUploadProvider', function ($routeProvider, fileUploadProvider) {
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
            });

        fileUploadProvider.defaults.url = '/uploader.ajax';
        angular.extend(fileUploadProvider.defaults, {
            disableImageResize: /Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),
            maxFileSize: 5000000,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            autoUpload: true
        })
    }]);
}(angular);