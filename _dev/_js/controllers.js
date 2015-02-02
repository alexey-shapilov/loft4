!function (angular) {
    var contactsControllers = angular.module('contactsControllers', []);

    contactsControllers.controller('MainController', ['$scope',
        function ($scope) {
            $scope.nav = {
                contactsList: true,
                btnAdd: true,
                clickList: function () {
                    this.contactsList = true;
                },
                clickGrid: function () {
                    this.contactsList = false;
                }
                //clickBack: function () {
                //    this.btnAdd = true;
                //},
                //clickAdd: function () {
                //    this.btnAdd = false;
                //}
            };
        }
    ]);

    contactsControllers.controller('ContactsController', ['$scope', 'contactsDb', '$location', '$filter',
        function ($scope, contactsDb, $location, $filter) {
            $scope.nav.btnAdd = true;
            $scope.contacts = contactsDb.contacts;
            $scope.editContact = function (id) {
                $location.path('/contact/edit/' + id)
            };
            $scope.order = function (field, reverse) {
                $scope.contacts = $filter('orderBy')($scope.contacts, field, reverse)
            }
        }
    ]);

    contactsControllers.controller('ContactController', ['$scope', 'contactsDb', '$routeParams', 'fileUpload',
        function ($scope, contactsDb, $routeParams, fileUpload) {
            console.log('fileUpload: ', fileUpload);
            $scope.nav.btnAdd = false;

            $scope.btnName = 'Добавить';

            $scope.contact = {
                data: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    phone: ''
                },
                save: function () {
                    contactsDb.save($scope.contact.data);
                }
            };

            if ($routeParams.id !== undefined) {
                $scope.btnName = 'Сохранить';
                $scope.contact.data = contactsDb.getObject($routeParams.id);
            }
        }
    ])
}(angular);
