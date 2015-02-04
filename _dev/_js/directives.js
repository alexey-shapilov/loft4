!function (angular) {
    var contactsDirectives = angular.module('contactsDirectives', []);

    contactsDirectives.directive('listContacts', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="contacts clearfix" ng-include="contentUrl">',
            link: function (scope, element, attrs) {
                scope.contentUrl = 'dTemplates/contacts-' + attrs.listType + '.html';
                attrs.$observe("listType", function (v) {
                    scope.contentUrl = 'dTemplates/contacts-' + v + '.html';
                });
            }
        }
    });

    contactsDirectives.directive('alert', function () {
        return {
            restrict: 'A',
            scope: {
                iAlert: '=alert'
            },
            link: function (scope, element, attrs) {
                console.log(scope);
                element.hide();
                scope.$watch('iAlert', function (newVal, oldVal) {
                    if (newVal) {
                        element.show();
                        element.fadeOut(3000, function () {
                            scope.iAlert = false;
                            scope.$apply();
                            console.log(scope);
                        });
                    }
                })
            }
        }
    });
}(angular);