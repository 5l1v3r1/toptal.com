'use strict';

angular.module('application').service(
    'interceptor', function ($q, $rootScope) {
        return {
            'request': function (config) {
                $rootScope.spinner = true;
                /*
                 * The following code automatically injects the token into
                 * authorized requests.
                 */
                if ($rootScope.user !== null) {
                    config.headers.Token = $rootScope.user.token;
                }
                return config || $q.when(config);

            },
            'requestError': function (config) {
                $rootScope.spinner = false;
                return $q.reject(config);
            },
            'response': function (response) {
                $rootScope.spinner = false;
                return response || $q.when(response);
            },
            'responseError': function (response) {
                /*
                 * As a safety/security measure, any and all requests returning
                 * a 401 status code result in forced session expiration.
                 */
                if (response.status === 401) {
                    $rootScope.notify({
                        text: 'Your session has expired.',
                        title: 'Sign Out',
                        type: 'success'
                    });
                    $rootScope.signOut();
                }
                $rootScope.spinner = false;
                return $q.reject(response);
            }
        };
    }
);
