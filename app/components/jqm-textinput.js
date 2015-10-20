import Ember from 'ember';

export default Ember.TextField.extend({
  attributeBindings: ['clearBtn:data-clear-btn', 'mini:data-mini']
});
