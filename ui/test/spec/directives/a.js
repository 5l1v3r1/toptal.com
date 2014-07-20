'use strict';

describe('Directive: a', function () {
    var element, scope;
    beforeEach(module('application'));
    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));
    it('1', inject(function ($compile) {
        element = angular.element('<a></a>');
        element = $compile(element)(scope);
        expect(element.text()).toBe('');
    }));
});
