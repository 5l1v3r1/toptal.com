'use strict';

angular.module('application').directive('a', function () {
    return {
        link: function(scope, element, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                element.on('click', function (event) {
                    event.preventDefault();
                });
            }
        },
        restrict: 'E'
   };
});
