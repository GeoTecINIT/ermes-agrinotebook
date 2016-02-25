import $ from 'jquery';
import config from '../config/environment';

const SERVER_API_URL = config.APP.apiServer;
const SERVER_RESOURCES_URL = config.APP.resourcesServer;

export function post(uri, parameters) {
  var options = {
    url: SERVER_API_URL + uri,
    type: 'post',
    data: parameters.data
  };
  if(parameters.headers) {
    options.headers = parameters.headers;
  }

  if (!parameters.form) {
    options.dataType = 'json';
  }

  return $.ajax(options);
}

export function get(uri, parameters) {
  return $.get(SERVER_API_URL + uri, parameters);
}

export function getJSON(uri) {
  return $.getJSON(SERVER_RESOURCES_URL + uri);
}
