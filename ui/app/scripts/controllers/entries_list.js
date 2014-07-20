'use strict';

angular.module('application').controller(
    'EntriesListCtrl', function ($cookies, $rootScope, $scope, Restangular) {
        $rootScope.verify();

        $scope.limits = [10, 20, 30, 40, 50];

        $scope.orderBy = {
            columns: ['date', 'distance', 'time'],
            column: 'date',
            directions: ['asc', 'desc'],
            direction: 'desc'
        };
        try {
            $scope.orderBy = JSON.parse($cookies.orderBy);
        } catch (e) {
        }
        $scope.offset = 0;
        try {
            $scope.offset = JSON.parse($cookies.offset);
        } catch (e) {
        }
        $scope.limit = $scope.limits[0];
        try {
            $scope.limit = JSON.parse($cookies.limit);
        } catch (e) {
        }
        $scope.filters = {
            dates: {
                from: '',
                to: ''
            }
        };
        try {
            $scope.filters = JSON.parse($cookies.filters);
        } catch (e) {
        }
        $scope.entries = [];
        $scope.meta = {};

        var refresh = function () {
            /*jshint camelcase: false */
            $cookies.orderBy = JSON.stringify($scope.orderBy);
            $cookies.offset = JSON.stringify($scope.filters);
            $cookies.limit = JSON.stringify($scope.limit);
            $cookies.filters = JSON.stringify($scope.filters);
            $scope.entries = [];
            $scope.meta = {};
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
                    $scope.entries = response;
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
            if ($scope.offset >= $scope.meta.count) {
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
