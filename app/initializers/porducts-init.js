export function initialize(application) {
  application.inject('route', 'products', 'service:products');
}

export default {
  name: 'porducts-init',
  initialize: initialize
};
