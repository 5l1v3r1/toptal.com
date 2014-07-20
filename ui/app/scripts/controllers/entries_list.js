'use strict';

angular.module('application').controller(
    'EntriesListCtrl', function ($rootScope, $scope, Restangular) {
        $rootScope.verify();

        $scope.orderBy = {
            columns: ['date', 'distance', 'time'],
            column: 'date',
            directions: ['asc', 'desc'],
            direction: 'desc'
        };
        $scope.offset = 0;
        $scope.limits = [10, 20, 30, 40, 50];
        $scope.limit = $scope.limits[0];
        $scope.filters = {
            dates: {
                from: '',
                to: ''
            }
        };
        $scope.items = [];
        $scope.meta = {};

        var refresh = function () {
            /*jshint camelcase: false */
            $scope.items = [];
            $scope.pages = 0;
            return Restangular.all(
                'entry'
            ).getList({
                dates_from: $scope.filters.dates.from,
                dates_to: $scope.filters.dates.to,
                limit: $scope.limit,
                offset: $scope.offset,
                order_by_column: $scope.orderBy.column,
                order_by_direction: $scope.orderBy.direction
            }, $rootScope.getHeaders()).then(
                function (response) {
                    $scope.items = response;
                    $scope.meta = response.meta;
                },
                function () {}
            );
        };

        $scope.setFilters = function () {
            $scope.offset = 0;
            refresh();
        };

        $scope.setLimit = function (limit) {
            $scope.offset = 0;
            $scope.limit = limit;
            if ($scope.limits.indexOf($scope.limit) === -1) {
                $scope.limit = $scope.limits[0];
            }
            refresh();
        };

        $scope.setOffset = function (offset) {
            $scope.offset = offset;
            if ($scope.offset < 0) {
                $scope.offset = 0;
            }
            refresh();
        };

        $scope.setOrderBy = function (column) {
            $scope.offset = 0;
            var direction = $scope.direction;
            if ($scope.orderBy.column === column) {
                direction = $scope.orderBy.direction !== 'asc'? 'asc': 'desc';
            }
            if ($scope.orderBy.columns.indexOf(column) !== -1) {
                $scope.orderBy.column = column;
            }
            if ($scope.orderBy.directions.indexOf(direction) !== -1) {
                $scope.orderBy.direction = direction;
            }
            refresh();
        };

        refresh();

        window.jQuery('.datetimepicker').datetimepicker({
            closeOnDateSelect: true,
            format: 'Y-m-d',
            timepicker: false,
            weeks: true
        });
    }
);
