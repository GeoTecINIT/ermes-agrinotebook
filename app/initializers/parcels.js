export function initialize(application) {
  application.inject('controller', 'parcels', 'service:parcels');
}
export default {
  name: 'parcels',
  initialize: initialize
};
