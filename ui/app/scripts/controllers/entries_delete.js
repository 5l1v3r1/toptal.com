'use strict';

angular.module('application').controller(
    'EntriesDeleteCtrl',
    function ($http, $rootScope, $scope, $state, $stateParams, url) {
        $rootScope.verify();

        $scope.exception = '';
        $scope.status = true;

        $scope.process = function () {
            $scope.exception = '';
            $scope.status = true;
            $http({
                method: 'DELETE',
                url: url + '/entry/' + $stateParams.id
            }).then(
                function () {
                    $rootScope.notify({
                        text: 'The entry has been deleted successfully.',
                        title: 'Entries - Delete',
                        type: 'success'
                    });
                    $state.go('entries_list');
                },
                function (data) {
                    $rootScope.notify({
                        text: 'The entry has not been deleted successfully.',
                        title: 'Entries - Delete',
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

        $http({
            method: 'GET',
            url: url + '/entry/' + $scope.id
        }).then(
            function () {},
            function () {}
        );
    }
);
