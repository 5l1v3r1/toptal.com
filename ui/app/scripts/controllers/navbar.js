'use strict';

angular.module('application').controller(
    'NavbarCtrl', function ($rootScope, $scope, $state) {
        var getItems = function () {
            var items = [];
            if ($rootScope.user !== null) {
                items.push({
                    class: '',
                    icon: 'fa-home',
                    name: 'Dashboard',
                    state: 'dashboard',
                    states: ['dashboard']
                });
                items.push({
                    class: '',
                    icon: 'fa-clock-o',
                    name: 'Entries',
                    state: 'entries_list',
                    states: [
                        'entries_list',
                        'entries_add',
                        'entries_edit',
                        'entries_delete'
                    ]
                });
                items.push({
                    class: '',
                    icon: 'fa-user',
                    name: 'Profile',
                    state: 'profile',
                    states: ['profile']
                });
                items.push({
                    class: '',
                    icon: 'fa-sign-out',
                    name: 'Sign Out',
                    state: 'sign_out',
                    states: ['sign_out']
                });
            }
            if ($rootScope.user === null) {
                items.push({
                    class: '',
                    icon: 'fa-plus-square',
                    name: 'Sign Up',
                    state: 'sign_up',
                    states: ['sign_up']
                });
                items.push({
                    class: '',
                    icon: 'fa-sign-in',
                    name: 'Sign In',
                    state: 'sign_in',
                    states: ['sign_in']
                });
            }
            return items;
        };

        $scope.process = function () {
            $scope.items = getItems();
            window.jQuery.each($scope.items, function (key) {
                $scope.items[key].class = (
                    $scope.items[key].states.indexOf($state.current.name) !== -1
                )? 'active': '';
            });
        };

        $scope.$on('$stateChangeSuccess', function () {
            $scope.process();
        });

        $scope.items = getItems();
    }
);
