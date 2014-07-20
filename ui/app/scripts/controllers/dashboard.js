'use strict';

angular.module('application').controller(
    'DashboardCtrl', function ($http, $rootScope, $scope, url) {
        $rootScope.verify();

        $scope.spinner = false;
        $scope.data = {};

        $scope.process = function (date) {
            $scope.spinner = true;
            $http({
                method: 'GET',
                params: {
                    'date': date
                },
                url: url + '/dashboard'
            }).then(
                function (data) {
                    $scope.spinner = false;
                    $scope.data = data.data;
                },
                function () {
                    $scope.spinner = false;
                }
            );
        };

        $scope.process('');

        window.jQuery('#datetimepicker input').datetimepicker({
            format: 'Y-m-d',
            inline: true,
            onSelectDate: function (value) {
                $scope.process(value.dateFormat('Y-m-d'));
            },
            timepicker: false,
            weeks: true
        });
    }
);
