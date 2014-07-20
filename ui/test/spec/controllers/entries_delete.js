'use strict';

describe('Controller: EntriesDeleteCtrl', function () {
    beforeEach(module('application'));
    var rootScope, EntriesDeleteCtrl, scope;
    beforeEach(inject(function ($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        EntriesDeleteCtrl = $controller('EntriesDeleteCtrl', {
            $scope: scope
        });
    }));
    it('1', function () {
        expect(!!EntriesDeleteCtrl).toBe(true);
    });
});
