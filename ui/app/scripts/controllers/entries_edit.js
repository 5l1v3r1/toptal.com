'use strict';

angular.module('application').controller(
    'EntriesEditCtrl',
    function ($http, $rootScope, $scope, $state, entry, url) {
        $rootScope.verify();

        $scope.id = entry.id;
        $scope.date = entry.date;
        $scope.distanceUnit = $rootScope.distanceUnits[1];
        $scope.distanceValue = entry.distance;
        $scope.timeUnit = $rootScope.timeUnits[2];
        $scope.timeValue = entry.time;

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
                method: 'PUT',
                url: url + '/entry/' + $scope.id
            }).then(
                function () {
                    $rootScope.notify({
                        text: 'The entry has been edit successfully.',
                        title: 'Entries - Edit',
                        type: 'success'
                    });
                    $state.go('entries_list');
                },
                function (data) {
                    $rootScope.notify({
                        text: 'The entry has not been edit successfully.',
                        title: 'Entries - Edit',
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
