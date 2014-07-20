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
    it('should exist', function () {
        expect(!!EntriesListCtrl).toBeTruthy();
    });
    it('should be initialized', function () {
        expect(scope.limits).toEqual([10, 20, 30, 40, 50]);
        expect(scope.orderBy).toEqual({
            columns: ['date', 'distance', 'time'],
            column: 'date',
            directions: ['asc', 'desc'],
            direction: 'desc'
        });
        expect(scope.offset).toEqual(0);
        expect(scope.limit).toEqual(scope.limits[0]);
        expect(scope.filters).toEqual({
            dates: {
                from: '',
                to: ''
            }
        });
        expect(scope.entries).toEqual([]);
        expect(scope.meta).toEqual({});
    });
});
