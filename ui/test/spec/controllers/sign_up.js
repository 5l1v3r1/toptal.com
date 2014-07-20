'use strict';

describe('Controller: SignUpCtrl', function () {
    var rootScope, SignUpCtrl, scope;
    beforeEach(module('application'));
    beforeEach(inject(function ($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        SignUpCtrl = $controller('SignUpCtrl', {
            $scope: scope
        });
    }));
    it('1', function () {
        expect(!!SignUpCtrl).toBe(true);
    });
});
