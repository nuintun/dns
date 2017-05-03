'use strict'

var nslookup = require('nslookup');
var ping = require('ping');

function pad(value, length = 15, placeholder = ' ') {
  var diff = Math.max(0, length - value.length);

  return value + placeholder.repeat(diff);
}

var host = 'server01.pac.itzmx.com';
var dns = '180.76.76.76';

nslookup(host)
  .server(dns)
  .end(function(error, address) {
    if (error) throw error;

    var title = `HOSTNAME: ${ host }`;

    console.log(title);
    console.log('-'.repeat(title.length));

    address.forEach(function(ip) {
      ping
        .promise
        .probe(ip)
        .then(function(response) {
          var avg = response.time;

          avg = isNaN(avg) ? avg : avg + 'ms';

          console.log(`IP: ${ pad(ip) }  PING: ${ avg }`);
        });
    });
  });
