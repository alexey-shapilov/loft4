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
                    if (data.$id !== undefined) {
                        dataAsArray.$add(data).then(function (ref) {
                            var id = ref.key();
                            console.log("added record with id " + id);
                            dataAsArray.$indexFor(id); // returns location in the array
                        });
                    } else {
                        data.$save();
                    }
                },
                getObject: function (id) {
                    var sync = $firebase(new Firebase(fbUrl + '/' + id));
                    return sync.$asObject();
                }
            }
        }
    ])
}(angular);
