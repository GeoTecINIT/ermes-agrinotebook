import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ermes-side-buttons'],
  networkChecker: Ember.inject.service(),
  tagName: 'table',
  parcels: Ember.inject.service(),
  i18n: Ember.inject.service(),
  buttons: Ember.computed('editMode', 'i18n.locale', function () {
    if (this.get('editMode')) {
      return this.get('editButtons');
    } else {
      return this.get('selectButtons');
    }
  }),
  selectButtons: Ember.computed('i18n.locale', 'networkChecker.online', function() {
    var options = [
      {title: this.get('i18n').t('fields.map-tools.parcel-info'), icon: 'info', class: 'ermes-btn-med', action: 'openInfoPanel'},
      {title: this.get('i18n').t('fields.map-tools.invert-selection'), icon: 'action', class: 'ermes-btn-med', action: 'invertSelection'},
      {title: this.get('i18n').t('fields.map-tools.select-all'), icon: 'grid', class: 'ermes-btn-big', action: 'selectAll'}
    ];

    var region = this.get('parcels.user.region');
    if (region === 'spain' && this.get('networkChecker.online')) {
      var search = [{title: this.get('i18n').t('fields.options-m.search'), icon: 'search', class: 'ermes-btn-med', action: 'openSearchPanel'}];
      options = search.concat(options);
    }

    return options;
  }),
  editButtons: Ember.computed('i18n.locale', function() {
    return [
      {title: this.get('i18n').t('fields.map-tools.discard-changes'), icon: 'delete', class: 'ermes-btn-med', action: 'exitEditWithoutSaving'},
      {title: this.get('i18n').t('fields.map-tools.confirm-selection'), icon: 'check', class: 'ermes-btn-big', action: 'commitChanges'}
    ];
  }),
  actions: {
    openInfoPanel() {
      this.sendAction('openPanel', 'index.parcel-info');
    },
    openSearchPanel() {
      this.sendAction('openPanel', 'index.search');
    },
    commitChanges() {
      if (navigator.onLine){
        this.get('parcels.user.parcels').then((parcels) => {
          var wait = [];
          parcels.forEach((parcel) => {
            wait.push(parcel.save());
          });
          Ember.RSVP.Promise.all(wait).then(() => {
            return this.get('parcels.user').save();
          }).then(() => {
            this.set('editMode', false);
          }).catch((err) => {
            console.debug('No se ha podido guardar el usuario');
            this.set('editMode', false);
            console.debug(err);
          });
        });
      } else {
        this.get('parcels.user').rollbackAttributes();
        this.set('editMode', false);
        this.sendAction('cannotEdit');
      }

    },
    exitEditWithoutSaving() {
      this.get('parcels.user').rollbackAttributes();
      this.get('parcels.user.parcels').toArray().forEach(color => color.rollbackAttributes());
      this.set('editMode', false);
    },
    selectAll() {
      this.get('parcels.user.parcels').then((userParcels) => {
        var selectedParcels = this.get('parcels.selectedParcels');
        userParcels.forEach((parcel) => {
          var parcelId = parcel.get('parcelId');
          if (!selectedParcels.contains(parcelId)) {
            selectedParcels.pushObject(parcelId);
          }
        });
      });
    },
    invertSelection() {
      this.get('parcels.user.parcels').then((userParcels) => {
        var selectedParcels = this.get('parcels.selectedParcels');
        var previouslySelected = [];
        previouslySelected.pushObjects(selectedParcels);
        selectedParcels.clear();
        userParcels.forEach((parcel) => {
          var parcelId = parcel.get('parcelId');
          if (!previouslySelected.contains(parcelId)) {
            selectedParcels.pushObject(parcelId);
          }
        });
      });
    }
  }
});
