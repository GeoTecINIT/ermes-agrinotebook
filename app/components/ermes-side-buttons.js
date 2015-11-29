import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ermes-side-buttons'],
  tagName: 'table',
  parcels: Ember.inject.service(),

  buttons: Ember.computed('editMode', function () {
    if (this.get('editMode')) {
      return this.get('editButtons');
    } else {
      return this.get('selectButtons');
    }
  }),
  selectButtons: [
    {title: 'Parcel info', icon: 'info', class: 'ermes-btn-med', action: 'openInfoPanel'},
    {title: 'Invert selected fields', icon: 'action', class: 'ermes-btn-med', action: 'invertSelection'},
    {title: 'Select all fields', icon: 'grid', class: 'ermes-btn-big', action: 'selectAll'}
  ],
  editButtons: [
    {title: 'Add fields', icon: 'check', class: 'ermes-btn-big', action: 'commitChanges'}
  ],
  actions: {
    openInfoPanel() {
      this.sendAction('openPanel', 'index.parcel-info');
    },
    commitChanges() {
      if (navigator.onLine){
        this.get('parcels.user').save().then(() => {
          this.set('editMode', false);
        }, (err) => {
          console.debug('No se ha podido guardar el usuario');
          this.set('editMode', false);
          console.debug(err);
        });
      } else {
        this.get('parcels.user').rollbackAttributes();
        this.set('editMode', false);
        this.sendAction('cannotEdit');
      }

    },
    selectAll() {
      var userParcels = this.get('parcels.user.parcels');
      var selectedParcels = this.get('parcels.selectedParcels');
      userParcels.forEach((parcel) => {
        if (!selectedParcels.contains(parcel)) {
          selectedParcels.pushObject(parcel);
        }
      });
    },
    invertSelection() {
      var userParcels = this.get('parcels.user.parcels');
      var selectedParcels = this.get('parcels.selectedParcels');
      var previouslySelected = [];
      previouslySelected.pushObjects(selectedParcels);
      selectedParcels.clear();
      userParcels.forEach((parcel) => {
        if (!previouslySelected.contains(parcel)) {
          selectedParcels.pushObject(parcel);
        }
      });
    }
  }
});
