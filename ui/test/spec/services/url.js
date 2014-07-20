'use strict';

describe('Service: url', function () {
    var url;
    beforeEach(module('application'));
    beforeEach(inject(function (_url_) {
        url = _url_;
    }));
    it('should exist', function () {
        expect(!!url).toBeTruthy();
    });
});
