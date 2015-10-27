import $ from 'jquery';

export function initialize() {
  $("#loading-splash").remove();
}

export default {
  name: 'first',
  initialize: initialize
};
