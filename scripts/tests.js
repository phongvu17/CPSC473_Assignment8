QUnit.test('Qunit test for DataStore', function(assert) {
    var ds = new window.App.DataStore();
    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');
    var getAllValue = ds.getAll();
    var expectValue = {
        'james@bond.com': 'eshpressho',
        'm@bond.com': 'tea'
    };
    assert.deepEqual(getAllValue, expectValue, 'We expect value to be {"james@bond.com": "eshpressho", "m@bond.com": "tea"}');

    ds.remove('james@bond.com');
    getAllValue = ds.getAll();
    expectValue = {
        'm@bond.com': 'tea'
    };
    assert.deepEqual(getAllValue, expectValue, 'We expect value to be {"m@bond.com": "tea"}');

    var getValue = ds.get('m@bond.com');
    assert.equal(getValue, 'tea', 'We expect value to be "tea"');
});

// The problem to convert the code into QUnit test for Truck is the result of Truck is undefined. We can not compare the undefined value with the expected value.
// We need define an additional return value from the printOrders function in Truck.js
QUnit.test('Qunit test for Truck', function(assert) {
    var myTruck = new window.App.Truck('007', new window.App.DataStore());

    myTruck.createOrder({
        emailAddress: 'me@goldfinger.com',
        coffee: 'double mocha'
    });

    myTruck.createOrder({
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    });

    myTruck.createOrder({
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    });

    var printValue = myTruck.printOrders();
    var expectValue = [{
        'coffee': 'double mocha',
        'emailAddress': 'me@goldfinger.com'
    }, {
        'coffee': 'decaf',
        'emailAddress': 'dr@no.com'
    }, {
        'coffee': 'earl grey',
        'emailAddress': 'm@bond.com'
    }];
    assert.deepEqual(printValue, expectValue, 'We expect value to be [{"coffee": "double mocha", "emailAddress": "me@goldfinger.com"}, ...]');

    myTruck.deliverOrder('dr@no.com');
    myTruck.deliverOrder('m@bond.com');
    expectValue = [{
        'coffee': 'double mocha',
        'emailAddress': 'me@goldfinger.com'
    }];
    assert.deepEqual(myTruck.printOrders(), expectValue, 'We expect value to be [{"coffee": "double mocha", "emailAddress": "me@goldfinger.com"}]');
});
