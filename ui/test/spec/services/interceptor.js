'use strict';

describe('Service: interceptor', function () {
    var interceptor;
    beforeEach(module('application'));
    beforeEach(inject(function (_interceptor_) {
        interceptor = _interceptor_;
    }));
    it('should exist', function () {
        expect(!!interceptor).toBeTruthy();
    });
});
