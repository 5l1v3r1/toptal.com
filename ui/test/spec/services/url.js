'use strict';

describe('Service: url', function () {
    var url;
    beforeEach(module('application'));
    beforeEach(inject(function (_url_) {
        url = _url_;
    }));
    it('1', function () {
        expect(!!url).toBe(true);
    });
});
