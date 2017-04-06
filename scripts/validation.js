(function(window) {
    'use strict';
    var App = window.App || {};

    var Validation = {
        isCompanyEmail: function(email) {
            return /.+@bignerdranch\.com$/.test(email);
        },

        isDecafOverTwenty: function(coffee, strength) {
            var str = /decaf/;
            return !(str.test(coffee) && (strength > 20));
        }
    };

    App.Validation = Validation;
    window.App = App;
})(window);
