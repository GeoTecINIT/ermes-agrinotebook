import $ from 'jquery';
import config from '../config/environment';

const SERVER_URL = config.APP.apiServer;

// Example ( '/login', { username: user, password: password } )
export function post(uri, parameters) {
  return $.post(SERVER_URL + uri, parameters);
}

export function get(uri, parameters) {
  return $.get(SERVER_URL + uri, parameters);
}
