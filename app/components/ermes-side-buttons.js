import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ermes-side-buttons'],
  editMode: false,
  buttons: Ember.computed('editMode', function () {
    if (this.get('editMode')) {
      return this.get('editButtons');
    } else {
      return this.get('selectButtons');
    }
  }),
  selectButtons: [
    {title: 'Parcel info', icon: 'info', class: 'ermes-btn-med'},
    {title: 'Invert selected fields', icon: 'action', class: 'ermes-btn-med'},
    {title: 'Select all fields', icon: 'grid', class: 'ermes-btn-big'}
  ],
  editButtons: [
    {title: 'Add fields', icon: 'check', class: 'ermes-btn-big'}
  ]
});
