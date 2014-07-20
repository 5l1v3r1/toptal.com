'use strict';

describe('Directive: a', function () {
    beforeEach(module('application'));
    var element, scope;
    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));
    it('1', inject(function ($compile) {
        element = angular.element('<a></a>');
        element = $compile(element)(scope);
        expect(element.text()).toBe('');
    }));
});
