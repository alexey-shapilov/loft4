!function (angular) {
    var contactsServices = angular.module('contactsServices', []);

    contactsServices.factory('contactsDb', ['$firebase', 'fbUrl',
        function ($firebase, fbUrl) {
            var ref = new Firebase(fbUrl),
                sync = $firebase(ref),
                dataAsArray = sync.$asArray();

            return {
                contacts: dataAsArray,
                save: function (data) {
                    if (data.$id === undefined) {
                        return {action: 'add', promise: dataAsArray.$add(data)};
                    } else {
                        return {action: 'save', promise: data.$save()};
                    }
                },
                remove: function (id) {
                    return sync.$remove(id)
                },
                getObject: function (id) {
                    var sync = $firebase(new Firebase(fbUrl + '/' + id));
                    return sync.$asObject();
                }
            }
        }
    ])
}(angular);
