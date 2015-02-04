!function (angular) {
    var contactsControllers = angular.module('contactsControllers', []);

    contactsControllers.controller('MainController', ['$scope',
        function ($scope) {
            $scope.search = {
                lastname: ''
            };
            $scope.nav = {
                contactsList: 'list',
                btnAdd: true,
                clickList: function () {
                    this.contactsList = 'list';
                },
                clickGrid: function () {
                    this.contactsList = 'grid';
                }
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
            $scope.rev = {};
            $scope.editContact = function (id) {
                $location.path('/contact/edit/' + id)
            };
            $scope.order = function (field, reverse) {
                $scope.rev[field] = reverse;
                $scope.rev.active = field;
                $scope.contacts = $filter('orderBy')($scope.contacts, field, reverse)
            };
            $scope.header.title = 'Контакты';
        }
    ]);

    contactsControllers.controller('ContactController', ['$scope', 'contactsDb', '$routeParams', '$location',
        function ($scope, contactsDb, $routeParams, $location) {
            $scope.header.title = 'Контакт';
            $scope.nav.btnAdd = false;
            $scope.alert = {
                visible: false,
                text: true
            };

            $scope.btnName = 'Добавить';

            $scope.contact = {
                data: {
                    firstname: 'Проверка',
                    lastname: 'Добавления',
                    email: 'email@email.ru',
                    phone: '79112223344',
                    img: 'http://lorempixel.com/200/200/'
                },
                save: function () {
                    var result = contactsDb.save(this.data);
                    result.promise.then(function (ref) {
                        if (result.action == 'add') {
                            $scope.contact.data = contactsDb.getObject(ref.key());
                            $scope.btnName = 'Сохранить';
                            $scope.alert.text = 'Контактные данные успешно добавлены'
                        } else {
                            $scope.alert.text = 'Контактные данные успешно сохранены'
                        }
                        $scope.alert.visible = true;
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
