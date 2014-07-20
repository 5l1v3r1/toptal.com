'use strict';

describe('Controller: ProfileCtrl', function () {
    beforeEach(module('application'));
    var rootScope, ProfileCtrl, scope;
    beforeEach(inject(function ($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        ProfileCtrl = $controller('ProfileCtrl', {
            $scope: scope
        });
    }));
    it('1', function () {
        expect(!!ProfileCtrl).toBe(true);
    });
});
