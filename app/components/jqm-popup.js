import JqmComponent from './jqm-component';

export default JqmComponent.extend({
  attributeBindings: ['dismissible:data-dismissible', 'position:data-position'],
  classNameBindings: ['ui-popup'],
  role: 'popup',
  didInsertElement() {
    $(this.$()).enhanceWithin().popup();
  },
  actions: {
    closePopup() {
      $(this.$()).popup('close');
    }
  }
});
