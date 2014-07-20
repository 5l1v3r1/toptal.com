'use strict';

describe('Controller: EntriesAddCtrl', function () {
    beforeEach(module('application'));
    var rootScope, EntriesAddCtrl, scope;
    beforeEach(inject(function ($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        EntriesAddCtrl = $controller('EntriesAddCtrl', {
            $scope: scope
        });
    }));
    it('1', function () {
        expect(!!EntriesAddCtrl).toBe(true);
    });
});
