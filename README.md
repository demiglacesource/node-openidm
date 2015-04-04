node-openidm
===============

OpenIDM REST API Client.


Install
---------

Install from npm:

    $ npm install openidm

Preparing to use
---------

```JavaScript
var OpenIdm = require('openidm');

var openidm = new OpenIdm({
    host : 'localhost',
    port : 8080,
    userName : 'openidm-admin',
    password : 'openidm-admin'
});
```

Create Managed Object (POST)
-----------------------

```JavaScript
var params = {
  '_id' : 'demiglacesource',
  'userName' : 'demiglacesource',
  'password' : 'P@ssw0rd',
  'mail' : 'demiglacesource@example.com',
  'givenName' : 'demiglace',
  'sn' : 'source',
  'phoneNumber' : '00000000000'
};

openidm.post('managed/user?_action=create', '', params, function(err, data) {
    if (err) {
        console.log("Error: " + err.message);
        console.log("Error: " + err.response.message);
        return ;
    }
    console.log(data);
});
```

Get Managed Object
--------------------

```JavaScript
openidm.get('managed/user/demiglacesource', function(err, data) {
    if (err) {
        console.log("Error: " + err.message);
        console.log("Error: " + err.response.message);
        return;
    }
    console.log(data);
});
```

Link
------

* http://forgerock.com/what-we-offer/open-identity-stack/openidm/
* http://openidm.forgerock.org/docs.html
