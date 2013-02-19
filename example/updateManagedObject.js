var OpenIdm = require('../lib/openidm');

var openidm = new OpenIdm({
    host : 'localhost',
    port : 8080,
    userName : 'openidm-admin',
    password : 'openidm-admin'
});

// Read managed object
var readed = openidm.get('managed/user/user001', function(err, data) {
    if (err) {
        console.log("Error: " + err.message);
        console.log("Error: " + err.response.message);
        return;
    }

    // Update managed object
    var params = [{'replace' : '/email', 'value' : 'user001@example.com'}, {'replace' : '/phoneNumber', 'value' : '11111111111'}];
    var updated = openidm.post('managed/user/user001?_action=patch', data._rev, params, function(err, data) {
        if (err) {
            console.log("Error: " + err.message);
            console.log("Error: " + err.response.message);
            return ;
        }
        console.log(data);
    });

});

