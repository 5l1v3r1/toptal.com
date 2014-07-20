'use strict';

angular.module('application').controller(
    'SignInCtrl', function ($http, $rootScope, $scope, $state, url) {
        $scope.email = '';
        $scope.password = '';

        $scope.exception = '';
        $scope.status = true;

        $scope.forgotPassword = function () {
            $rootScope.notify({
                text: 'This feature is yet to be implemented.',
                title: 'Forgot Password',
                type: 'warning'
            });
        };

        $scope.process = function () {
            $scope.exception = '';
            $scope.status = true;
            $http({
                data: {
                    'email': $scope.email,
                    'password': $scope.password
                },
                method: 'POST',
                url: url + '/sign-in'
            }).then(
                function (data) {
                    $rootScope.notify({
                        text: 'You have been signed in successfully.',
                        title: 'Sign In',
                        type: 'success'
                    });
                    $rootScope.signIn(data.data);
                    $state.go('dashboard');
                },
                function (data) {
                    $rootScope.notify({
                        text: 'You have not been signed in successfully.',
                        title: 'Sign In',
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
                    $rootScope.signOut();
                }
            );
        };
    }
);
