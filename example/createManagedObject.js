var OpenIdm = require('../lib/openidm');

var openidm = new OpenIdm({
    host : 'localhost',
    port : 8080,
    userName : 'openidm-admin',
    password : 'openidm-admin'
});

// Create managed object
var params = {'_id' : 'user001', 'userName' : 'user001', 'password' : 'P@ssw0rd', 'email' : 'user001@example.com', 'givenName' : 'user', 'familyName' : '001', 'phoneNumber' : '00000000000'};
var created = openidm.put('managed/user/user001', params, function(err, data) {
    if (err) {
        console.log("Error: " + err.message);
        console.log("Error: " + err.response.message);
        return ;
    }

    console.log(data);
});

