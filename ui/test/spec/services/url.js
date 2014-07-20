'use strict';

describe('Service: url', function () {
    beforeEach(module('application'));
    var url;
    beforeEach(inject(function (_url_) {
        url = _url_;
    }));
    it('1', function () {
        expect(!!url).toBe(true);
    });
});
