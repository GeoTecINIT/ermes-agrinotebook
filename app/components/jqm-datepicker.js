import Ember from 'ember';

export default Ember.TextField.extend({
  readonly: 'readonly',
  didInsertElement() {
    var elem = $(this.$());
    elem.datepicker({
      dateFormat: 'dd/mm/yy'
    });
    elem.datepicker('setDate', new Date());
  }
});
