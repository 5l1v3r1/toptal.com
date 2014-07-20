'use strict';

angular.module('application').controller(
    'SignUpCtrl', function ($http, $rootScope, $scope, $state, url) {
        $scope.email = '';
        $scope.password = '';
        $scope.name = '';

        $scope.exception = '';
        $scope.status = true;

        $scope.process = function () {
            $scope.exception = '';
            $scope.status = true;
            $http({
                data: {
                    'email': $scope.email,
                    'name': $scope.name,
                    'password': $scope.password
                },
                method: 'POST',
                url: url + '/sign-up'
            }).then(
                function (data) {
                    $rootScope.notify({
                        text: 'You have been signed up successfully.',
                        title: 'Sign Up',
                        type: 'success'
                    });
                    $rootScope.signIn(data.data);
                    $state.go('dashboard');
                },
                function (data) {
                    $rootScope.notify({
                        text: 'You have not been signed up successfully.',
                        title: 'Sign Up',
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
