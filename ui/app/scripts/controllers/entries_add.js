'use strict';

angular.module('application').controller(
    'EntriesAddCtrl',
    function ($http, $rootScope, $scope, $state, url) {
        $rootScope.verify();

        $scope.date = '';
        $scope.distanceUnit = $rootScope.distanceUnits[0];
        $scope.distanceValue = '';
        $scope.timeUnit = $rootScope.timeUnits[0];
        $scope.timeValue = '';

        $scope.exception = '';
        $scope.status = true;

        $scope.process = function () {
            $scope.exception = '';
            $scope.status = true;
            $http({
                data: {
                    'date': $scope.date,
                    'distance': $rootScope.getDistance(
                        $scope.distanceValue, $scope.distanceUnit
                    ),
                    'time': $rootScope.getTime(
                        $scope.timeValue, $scope.timeUnit
                    )
                },
                method: 'POST',
                url: url + '/entry'
            }).then(
                function () {
                    $rootScope.notify({
                        text: 'The entry has been added successfully.',
                        title: 'Entries - Add',
                        type: 'success'
                    });
                    $state.go('entries_list');
                },
                function (data) {
                    $rootScope.notify({
                        text: 'The entry has not been added successfully.',
                        title: 'Entries - Add',
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

        window.jQuery('.datetimepicker').datetimepicker({
            closeOnDateSelect: true,
            format: 'Y-m-d',
            timepicker: false,
            weeks: true
        });
    }
);
