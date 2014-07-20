'use strict';

angular.module('application').controller(
    'ProfileCtrl', function ($http, $rootScope, $scope, url) {
        $rootScope.verify();

        $scope.email = $rootScope.user !== null? $rootScope.user.email: '';
        $scope.password = '';
        $scope.name = $rootScope.user !== null? $rootScope.user.name: '';

        $scope.exception = '';
        $scope.status = true;

        $scope.process = function () {
            $scope.exception = '';
            $scope.status = true;
            $http({
                data: {
                    'name': $scope.name,
                    'password': $scope.password
                },
                method: 'POST',
                url: url + '/profile'
            }).then(
                function (data) {
                    $rootScope.notify({
                        text: 'Your profile has been updated successfully.',
                        title: 'Profile',
                        type: 'success'
                    });
                    $rootScope.signIn(data.data);
                },
                function (data) {
                    $rootScope.notify({
                        text:
                        'Your profile has not been updated successfully.',
                        title: 'Profile',
                        type: 'error'
                    });
                    $scope.exception = 'Unknown Error';
                    if (
                        typeof(data.data) === 'object' &&
                        'exception' in data.data
                    ) {
                        $scope.exception = data.data.exception;
                    }
                    $scope.status = false;
                }
            );
        };
    }
);
