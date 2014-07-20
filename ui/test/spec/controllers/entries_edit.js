'use strict';

describe('Controller: EntriesEditCtrl', function () {
    beforeEach(module('application'));
    var rootScope, EntriesEditCtrl, scope;
    beforeEach(inject(function ($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        EntriesEditCtrl = $controller('EntriesEditCtrl', {
            $scope: scope
        });
    }));
    it('1', function () {
        expect(!!EntriesEditCtrl).toBe(true);
    });
});
