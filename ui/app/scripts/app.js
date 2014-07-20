'use strict';

angular.module('application', [
    'ngCookies', 'ngSanitize', 'restangular', 'ui.router'
]).config(function (
    $httpProvider, $stateProvider, $urlRouterProvider, RestangularProvider, url
) {
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    $httpProvider.defaults.headers.get.Pragma = 'no-cache';
    if (!$httpProvider.defaults.headers.post) {
        $httpProvider.defaults.headers.post = {};
    }
    $httpProvider.defaults.headers.post[
        'Content-Type'
    ] = 'application/x-www-form-urlencoded; charset=UTF-8';
    if (!$httpProvider.defaults.headers.put) {
        $httpProvider.defaults.headers.put = {};
    }
    $httpProvider.defaults.headers.put[
        'Content-Type'
    ] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $httpProvider.defaults.transformRequest = function (data) {
        if (data === undefined) {
            return data;
        }
        return window.jQuery.param(data);
    };
    $httpProvider.interceptors.push('interceptor');
    $stateProvider.state('dashboard', {
        controller: 'DashboardCtrl',
        templateUrl: 'views/dashboard.html',
        url: '/dashboard'
    }).state('entries_list', {
        controller: 'EntriesListCtrl',
        templateUrl: 'views/entries_list.html',
        url: '/entries/list'
    }).state('entries_add', {
        controller: 'EntriesAddCtrl',
        templateUrl: 'views/entries_add.html',
        url: '/entries/add'
    }).state('entries_edit', {
        controller: 'EntriesEditCtrl',
        resolve: {
            entry: function ($http, $rootScope, $state, $stateParams) {
                return $http({
                    method: 'GET',
                    url: url + '/entry/' + $stateParams.id
                }).then(
                    function (data) {
                        return data.data;
                    },
                    function () {
                        $rootScope.notify({
                            text: 'Unknown Error',
                            title: 'Entries - Edit',
                            type: 'error'
                        });
                        $state.go('entries_list');
                    }
                );
            }
        },
        templateUrl: 'views/entries_edit.html',
        url: '/entries/:id/edit'
    }).state('entries_delete', {
        controller: 'EntriesDeleteCtrl',
        resolve: {
            entry: function ($http, $rootScope, $state, $stateParams) {
                return $http({
                    method: 'GET',
                    url: url + '/entry/' + $stateParams.id
                }).then(
                    function (data) {
                        return data.data;
                    },
                    function () {
                        $rootScope.notify({
                            text: 'Unknown Error',
                            title: 'Entries - Delete',
                            type: 'error'
                        });
                        $state.go('entries_list');
                    }
                );
            }
        },
        templateUrl: 'views/entries_delete.html',
        url: '/entries/:id/delete'
    }).state('profile', {
        controller: 'ProfileCtrl',
        templateUrl: 'views/profile.html',
        url: '/profile'
    }).state('sign_out', {
        controller: 'SignOutCtrl',
        url: '/sign-out'
    }).state('sign_up', {
        controller: 'SignUpCtrl',
        templateUrl: 'views/sign_up.html',
        url: '/sign-up'
    }).state('sign_in', {
        controller: 'SignInCtrl',
        templateUrl: 'views/sign_in.html',
        url: '/sign-in'
    });
    $urlRouterProvider.otherwise('/dashboard');
    RestangularProvider.addRequestInterceptor(function (element, operation) {
        if (operation === 'remove') {
            return undefined;
        }
        return element;
    });
    RestangularProvider.addResponseInterceptor(
        function (response, operation) {
            if (operation === 'getList') {
                var data = response.items;
                data.meta = response.meta;
                return data;
            }
            return response;
        }
    );
    RestangularProvider.setBaseUrl(url + '/');
}).run(function ($cookies, $rootScope, $state) {
    $rootScope.spinner = false;
    $rootScope.user = null;
    try {
        $rootScope.user = JSON.parse($cookies.user);
    } catch (e) {
    }

    $rootScope.distanceUnits = ['kilometers', 'meters', 'feet'];
    $rootScope.timeUnits = ['hours', 'minutes', 'seconds'];

    var stack = {
        'dir1': 'up',
        'dir2': 'left',
        'firstpos1': 20,
        'firstpos2': 20,
        'push': 'top',
        'spacing1': 20,
        'spacing2': 20
    };

    var done = function () {
        $rootScope.spinner = false;
    };

    var persist = function () {
        $cookies.user = JSON.stringify($rootScope.user);
    };

    $rootScope.verify = function () {
        if ($rootScope.user === null) {
            $state.go('sign_in');
        }
    };

    $rootScope.signIn = function (user) {
        $rootScope.user = user;
        persist();
    };

    $rootScope.signOut = function () {
        $rootScope.user = null;
        $state.go('sign_in');
        persist();
    };

    $rootScope.notify = function (dictionary) {
        new window.PNotify(window.jQuery.extend({
            'addclass': 'stack-bottomright',
            'closer': true,
            'closer_hover': false,
            'delay': 5000,
            'hide': true,
            'history': false,
            'icon': true,
            'stack': stack,
            'sticker': false,
            'sticker_hover': false,
            'styling': 'bootstrap3'
        }, dictionary));
    };

    $rootScope.getDistance = function (value, unit) {
        if (unit === 'kilometers') {
            return value * 1000.00;
        }
        if (unit === 'meters') {
            return value;
        }
        if (unit === 'feet') {
            return value / 0.3048;
        }
        return value;
    };

    $rootScope.getHeaders = function () {
        if ($rootScope.user === null) {
            return null;
        }
        return {
            'Token': $rootScope.user.token
        };
    };

    $rootScope.getTime = function (value, unit) {
        if (unit === 'hours') {
            return value * 60.00 * 60.00;
        }
        if (unit === 'minutes') {
            return value * 60.00;
        }
        if (unit === 'seconds') {
            return value;
        }
        return value;
    };

    $rootScope.$on('$stateChangeStart', function () {
        $rootScope.spinner = true;
    });
    $rootScope.$on('$stateChangeError', done);
    $rootScope.$on('$stateChangeSuccess', done);
    $rootScope.$on('$statePermissionError', done);

    persist();
});
