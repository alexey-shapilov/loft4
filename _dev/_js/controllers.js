!function (angular) {
    var contactsControllers = angular.module('contactsControllers', []);

    contactsControllers.controller('MainController', ['$scope',
        function ($scope) {
            $scope.search = {
                lastname: ''
            };
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
            $scope.header = {
                title: ''
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
            };
            $scope.header.title = 'Контакты';
        }
    ]);

    contactsControllers.controller('ContactController', ['$scope', 'contactsDb', '$routeParams', '$location',
        function ($scope, contactsDb, $routeParams, $location) {
            $scope.header.title = 'Контакт';
            $scope.nav.btnAdd = false;

            $scope.btnName = 'Добавить';

            $scope.contact = {
                data: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    phone: '',
                    img: 'http://lorempixel.com/400/200/'
                },
                save: function () {
                    contactsDb.save(this.data).then(function (ref) {
                        $scope.contact.data.$id = ref.key();
                    });
                },
                remove: function () {
                    if (this.data.$id) {
                        contactsDb.remove(this.data.$id).then(function (ref) {
                            console.log(ref.key());
                            $location.path('/');
                        })
                    }
                }
            };

            console.log($scope.contact.data.$id);

            if ($routeParams.id !== undefined) {
                $scope.btnName = 'Сохранить';
                $scope.contact.data = contactsDb.getObject($routeParams.id);
            }
        }
    ])
}(angular);
