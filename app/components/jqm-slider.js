import Ember from 'ember';

export default Ember.TextField.extend({
  attributeBindings: ['mini:data-mini', 'highlight:data-highlight', 'dataType:data-type'],
  type: "number",
  dataType: "range",
  didInsertElement() {
    $(this.$()).slider().textinput();
  }
});
