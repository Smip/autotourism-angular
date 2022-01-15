import {environment} from './src/environments/environment';
import {ROUTES} from './static.paths';

const request = require('request');
const fs = require('fs');

request(environment.apiURL + 'trips', {json: true}, function (error, response, body) {
  if (!error) {
    const trips = body['trips']
      .map(trip => trip.id)
      .map(id => '/trips/' + id);

    const reports = body['trips']
      .filter(trip => trip.trip_report)
      .map(trip => trip.id)
      .map(id => '/trips/' + id + '/report');

    const prerenderRoutes = [...ROUTES, ...trips, ...reports];

    fs.writeFile('prerender-routes.txt', prerenderRoutes.join('\n'), () => {});
  } else {
    console.error('error:', error); // Print the error if one occurred
  }
});

