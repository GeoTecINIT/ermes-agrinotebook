import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ermes-side-buttons'],

  buttons: Ember.computed('editMode', function () {
    if (this.get('editMode')) {
      return this.get('editButtons');
    } else {
      return this.get('selectButtons');
    }
  }),
  selectButtons: [
    {title: 'Parcel info', icon: 'info', class: 'ermes-btn-med', action: 'openInfoPanel'},
    {title: 'Invert selected fields', icon: 'action', class: 'ermes-btn-med', action: 'foo'},
    {title: 'Select all fields', icon: 'grid', class: 'ermes-btn-big', action: 'foo'}
  ],
  editButtons: [
    {title: 'Add fields', icon: 'check', class: 'ermes-btn-big', action: 'commitChanges'}
  ],
  actions: {
    openInfoPanel() {
      this.sendAction('openPanel', 'index.parcel-info');
    },
    commitChanges() {
      this.set('editMode', false);
    },
    foo() {
      console.debug('Hey there!')
    }
  }
});
