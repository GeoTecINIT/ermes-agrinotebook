import $ from 'jquery';

const SERVER_URL = 'http://ermes.dlsi.uji.es:6585';


// Example ( '/login', { username: user, password: password } )
export function post(uri, parameters) {
  return $.post(SERVER_URL + uri, parameters);
}

export function get(uri, parameters) {
  return $.get(SERVER_URL + uri, parameters);
}
