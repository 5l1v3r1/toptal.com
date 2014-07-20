'use strict';

angular.module('application').controller(
    'SignOutCtrl', function ($rootScope) {
        $rootScope.notify({
            text: 'You have been signed out successfully.',
            title: 'Sign Out',
            type: 'success'
        });
        $rootScope.signOut();
    }
);
