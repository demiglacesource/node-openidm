var OpenIdm = require('../lib/openidm');

var openidm = new OpenIdm({
    host : 'localhost',
    port : 8080,
    userName : 'openidm-admin',
    password : 'openidm-admin'
});

// Read managed object
var readed = openidm.get('repo/internal/user/openidm-admin', function(err, data) {
    if (err) {
        console.log("Error: " + err.message);
        console.log("Error: " + err.response.message);
        return;
    }

    console.log(data);
});

