import Ember from 'ember';
import Graphic from "esri/graphic";
import PictureMarkerSymbol from 'esri/symbols/PictureMarkerSymbol';


export default Ember.Mixin.create({
  store: Ember.inject.service(),

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
      var user = this.get('parcels.user');

      var userParcelsGraphics = this.get('parcelsGraphics');
      var symbol = this.get('userParcelSymbol');

      var graphicAttr = evt.graphic.attributes;
      if (graphicAttr === undefined) {
        userParcelsLayer.remove(evt.graphic);
      }

      var parcelNum = graphicAttr.PARCEL_ID;
      var featureGeometry = evt.graphic.geometry;

      this.get('parcels.user.parcels').then((userParcels) => {
        var parcel;
        if (userParcels.mapBy('parcelId').contains(parcelNum)) {
          parcel = userParcels.findBy('parcelId', parcelNum);
          userParcels.removeObject(parcel);
          parcel.deleteRecord();
          parcel.save();
          parcelsLayer.remove(userParcelsGraphics[parcelNum]);
          userParcelsLayer.remove(userParcelsGraphics[parcelNum]);
          delete(userParcelsGraphics[parcelNum]);
          Ember.debug("DELETED PARCEL_ID: " + parcelNum);
        }
        else {
          parcel = this.get('store').createRecord('parcel', {parcelId: parcelNum});
          userParcels.pushObject(parcel);
          var attr = {"PARCEL_ID": parcelNum};
          userParcelsGraphics[parcelNum] = new Graphic(featureGeometry, symbol, attr);
          parcelsLayer.add(userParcelsGraphics[parcelNum]);
          Ember.debug("ADDED PARCEL_ID: " + parcelNum);
        }
      });
    }
  },
  putOrDisplaceAMarker(evt) {
    var map = this.get('map');
    var alertMarker = this.get('alertMarker');
    var alertPos = evt.mapPoint;

    if (!alertMarker) {

      var alertMarkerSymbol = new PictureMarkerSymbol({
        "yoffset": 8,
        "url": "assets/ermes-images/alertMarker.png",
        "contentType": "image/png",
        "width": 20,
        "height": 24
      });

      alertMarker = new Graphic(alertPos, alertMarkerSymbol);
      this.set('alertMarker', alertMarker);

    } else {

      alertMarker.setGeometry(alertPos);

    }
    map.graphics.add(alertMarker);
    this.set('parcels.alertPosition', alertPos);
    Ember.debug('Map clicked');
  }
});
