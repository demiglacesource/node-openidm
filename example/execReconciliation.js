var OpenIdm = require('../lib/openidm');

var openidm = new OpenIdm({
    host : 'localhost',
    port : 8080,
    userName : 'openidm-admin',
    password : 'openidm-admin'
});

// Execute reconciliation
openidm.postNonParams('recon?_action=recon&mapping=systemADAccounts_managedUser', function(err, data) {
    if (err) {
        console.log("Error: " + err.message);
        console.log("Error: " + err.response.message);
        return ;
    }
    console.log(data);
});

