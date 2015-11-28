import Ember from 'ember';
import Graphic from "esri/graphic";

export default Ember.Mixin.create({
  store: Ember.inject.service(),
  selectedParcelsGraphics: new Map(),

  selectParcelEvent(evt) {
    if (evt.graphic) {
      var selectedParcels = this.get('parcels.selectedParcels');
      var userParcelsLayer = this.get('layersMap').get('userParcelsLayer');

      var selectedParcelId = evt.graphic.attributes.PARCEL_ID;

      if (selectedParcels.contains(selectedParcelId)) {
        selectedParcels.removeObject(selectedParcelId);
        Ember.debug('UNSELECTED PARCEL_ID: ' + selectedParcelId);
      } else {
        selectedParcels.pushObject(selectedParcelId);
        Ember.debug('SELECTED PARCEL_ID: ' + selectedParcelId);
      }

      userParcelsLayer.refresh();
      Ember.debug('SELECTED PARCELS: ' + selectedParcels);
    }
  },
  editParcelEvent(evt) {
    if (evt.graphic) {

      var userParcelsLayer = this.get('layersMap').get('userParcelsLayer');
      var parcelsLayer = this.get('layersMap').get('parcelsLayer');
      var userParcels = this.get('parcels.user.parcels');

      var userParcelsGraphics = this.get('parcelsGraphics');
      var symbol = this.get('userParcelSymbol');

      var graphicAttr = evt.graphic.attributes;
      if (graphicAttr === undefined) {
        userParcelsLayer.remove(evt.graphic);
      }

      var parcelNum = graphicAttr.PARCEL_ID;
      var featureGeometry = evt.graphic.geometry;

      if (userParcels.contains(parcelNum)) {
        userParcels.removeObject(parcelNum);
        parcelsLayer.remove(userParcelsGraphics[parcelNum]);
        userParcelsLayer.remove(userParcelsGraphics[parcelNum]);
        delete(userParcelsGraphics[parcelNum]);
        Ember.debug("DELETED PARCEL_ID: " + parcelNum);
      }
      else {
        userParcels.pushObject(parcelNum);
        var attr = {"PARCEL_ID": parcelNum};
        userParcelsGraphics[parcelNum] = new Graphic(featureGeometry, symbol, attr);
        parcelsLayer.add(userParcelsGraphics[parcelNum]);
        Ember.debug("ADDED PARCEL_ID: " + parcelNum);
      }

      parcelsLayer.refresh();
    }
  }
});
