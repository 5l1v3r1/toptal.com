'use strict';

describe('Directive: a', function () {
    var scope;
    beforeEach(module('application'));
    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));
    it('should exist', inject(function () {
        expect(scope).toBeDefined();
    }));
});
