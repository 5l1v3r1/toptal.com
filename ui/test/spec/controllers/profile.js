'use strict';

describe('Controller: ProfileCtrl', function () {
    var rootScope, ProfileCtrl, scope;
    beforeEach(module('application'));
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
