(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};

            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data)
                .then(function() {
                    this.reset();
                    this.elements[0].focus();
                }.bind(this));
        });
    };

    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');

                var SERVER_URL = 'http://localhost:3002/coffeeorders';

                $.get(SERVER_URL, function(serverResponse) {
                    var serverEmails = [];
                    for (var i in serverResponse) {
                        serverEmails.push(serverResponse[i].emailAddress);
                    }

                    if (serverEmails.indexOf(emailAddress) != -1) {
                        message = 'Email address has already been used for an order';
                        event.target.setCustomValidity(message);
                    } else {
                        event.target.setCustomValidity('');
                    }
                });

            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        });
    };

    FormHandler.prototype.addCoffeeInputHandler = function(fn) {
        console.log('Setting coffee input handler for form');
        this.$formElement.on('input', '[name="coffee"], [name="strength"]', function() {
            var coffee = document.getElementById('coffeeOrder').value;
            var strength = document.getElementById('strengthLevel').value;
            if (fn(coffee, strength)) {
                document.getElementById('coffeeOrder').setCustomValidity('');
            } else {
                document.getElementById('coffeeOrder').setCustomValidity(coffee + ' cannot have caffeine rating over twenty.');
            }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
