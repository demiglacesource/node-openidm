/**
 * OpenIDM (2.1.0+) REST API Client for Node.js.
 * License: MIT License
 */

var http = require('http');
var https = require('https');

/**
 * constructor
 */
function OpenIdm(config) {
    if (!config.host || !config.port || !config.userName || !config.password) {
        throw new Error("Error: host and port and userName and password must be configured.");
    }
    this.setHost(config.host);
    this.setPort(config.port);
    this.setUserName(config.userName);
    this.setPassword(config.password);
    this.setUseSsl(config.useSsl);
}

/**
 * JSON processor
 */

function escapeJSONString(key, value) {
    if (typeof value == 'string') {
        return value.replace(/[^ -~\b\t\n\f\r"\\]/g, function(a) {
            return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        });
    }
    return value;
}

function JSONStringify(data) {
    return JSON.stringify(data, escapeJSONString).replace(/\\\\u([\da-f]{4}?)/g, '\\u$1');
}

OpenIdm.JSONStringify = JSONStringify;

/**
 * accessors
 */

OpenIdm.prototype.setHost = function(key) {
    this.host = key;
};

OpenIdm.prototype.getHost = function() {
    return this.host;
};

OpenIdm.prototype.setPort = function(key) {
    this.port = key;
};

OpenIdm.prototype.getPort = function() {
    return this.port;
};

OpenIdm.prototype.setUserName = function(key) {
    this.userName = key;
};

OpenIdm.prototype.getUserName = function() {
    return this.userName;
};

OpenIdm.prototype.setPassword = function(key) {
    this.password = key;
};

OpenIdm.prototype.getPassword = function() {
    return this.password;
};

OpenIdm.prototype.setUseSsl = function(key) {
    this.useSsl = key;
};

OpenIdm.prototype.getUseSsl = function() {
    return this.useSsl;
};

OpenIdm.prototype.generateEndpoint = function(fullId, params) {
    if (fullId.slice(0, 1) != '/') {
        fullId = '/' + fullId;
    }
    return '/openidm' + fullId;
};

OpenIdm.prototype.generateHeaders = function(rev) {
    var headers = {
        'X-OpenIDM-Username' : this.getUserName(),
        'X-OpenIDM-Password' : this.getPassword()
    };

    if (rev !== undefined && rev !== '') {
        if (rev == '*') {
            headers['If-None-Match'] = rev;
        } else {
            headers['If-Match'] = '"' + rev + '"';
        }
    }
 
    return headers;
};

OpenIdm.prototype.request = function(method, fullId, rev, params, callback) {

    var options = {
        host: this.getHost(),
        port: this.getPort(),
        path: this.generateEndpoint(fullId, params),
        method: method,
        headers: this.generateHeaders(rev)
    };

    var response = function(res) {

        var body = "";
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function(e) {
            if (res.statusCode != 200 && res.statusCode != 201 && res.statusCode != 204) {
                callback({message: 'Server returns stats code: ' + res.statusCode, response: JSON.parse(body)}, null);
                callback = null;
                return ;
            }
            if (body != '') {
                callback(null, JSON.parse(body || 'null'));
            }
            callback = null;
        });

    }

    var req = null;
    if (this.getUseSsl() != undefined && this.getUseSsl() == true) {
        req = https.request(options, response);
    } else {
        req = http.request(options, response);
    }

    if (0 < Object.keys(params).length) {
        var body = JSONStringify(params);
        req.setHeader('Content-Length', body.length);
        req.setHeader('Content-Type', 'application/json');
        req.write(body);
    }

    req.end();
}

OpenIdm.prototype.put = function(fullId, params, callback) {
    this.request('PUT', fullId, '*', params, callback);
};

OpenIdm.prototype.get = function(fullId, callback) {
    this.request('GET', fullId, '', {}, callback);
};

OpenIdm.prototype.post = function(fullId, rev, params, callback) {
    this.request('POST', fullId, rev, params, callback);
};

OpenIdm.prototype.postNonParams = function(fullId, callback) {
    this.request('POST', fullId, '', {}, callback);
};

OpenIdm.prototype.patch = function(fullId, rev, params, callback) {
    this.request('PATCH', fullId, rev, params, callback);
};

OpenIdm.prototype.delete = function(fullId, rev, callback) {
    this.request('DELETE', fullId, rev, {}, callback);
};

OpenIdm.prototype.deleteNonParams = function(fullId, callback) {
    this.request('DELETE', fullId, '', {}, callback);
};

OpenIdm.prototype.head = function(fullId, callback) {
    this.request('HEAD', fullId, '', {}, callback);
};

module.exports = OpenIdm;

