'use strict';

describe('Service: interceptor', function () {
    beforeEach(module('application'));
    var interceptor;
    beforeEach(inject(function (_interceptor_) {
        interceptor = _interceptor_;
    }));
    it('1', function () {
        expect(!!interceptor).toBe(true);
    });
});
