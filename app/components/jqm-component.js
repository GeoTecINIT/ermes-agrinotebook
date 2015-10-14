import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['role:data-role', 'theme:data-theme'],
  didInsertElement() {
    $(this.$()).enhanceWithin();
  }
});
