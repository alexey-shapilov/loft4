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
}(angular);