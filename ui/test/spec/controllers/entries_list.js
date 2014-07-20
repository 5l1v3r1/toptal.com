'use strict';

describe('Controller: EntriesListCtrl', function () {
    var rootScope, EntriesListCtrl, scope;
    beforeEach(module('application'));
    beforeEach(inject(function ($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        EntriesListCtrl = $controller('EntriesListCtrl', {
            $scope: scope
        });
    }));
    it('1', function () {
        expect(!!EntriesListCtrl).toBe(true);
    });
});
