export function initialize(application) {
  application.inject('route', 'auth', 'service:auth');
}

export default {
  name: 'auth-init',
  initialize: initialize
};
