import $ from 'jquery';
import config from '../config/environment';

const SERVER_API_URL = config.APP.apiServer;
const SERVER_RESOURCES_URL = config.APP.resourcesServer;

// Example ( '/login', { username: user, password: password } )
export function post(uri, parameters) {
  return $.post(SERVER_API_URL + uri, parameters);
}

export function get(uri, parameters) {
  return $.get(SERVER_API_URL + uri, parameters);
}

export function getJSON(uri) {
  return $.getJSON(SERVER_RESOURCES_URL + uri);
}
