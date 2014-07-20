'use strict';

describe('Controller: SignUpCtrl', function () {
    beforeEach(module('application'));
    var rootScope, SignUpCtrl, scope;
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
