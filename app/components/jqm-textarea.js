import Ember from 'ember';

export default Ember.TextArea.extend({
  attributeBindings: ['clear-btn:data-clear-btn', 'mini:data-mini']
});
