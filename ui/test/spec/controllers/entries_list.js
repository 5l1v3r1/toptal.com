'use strict';

describe('Controller: EntriesListCtrl', function () {
    beforeEach(module('application'));
    var rootScope, EntriesListCtrl, scope;
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
