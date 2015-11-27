import Ember from 'ember';
import Graphic from "esri/graphic";

export default Ember.Mixin.create({
  store: Ember.inject.service(),
  selectParcelEvent(evt) {
    console.debug('Select:', evt.graphic);
  },
  editParcelEvent(evt, _this) {
    if (evt.graphic) {

      var userParcelsLayer = _this.get('layersMap').get('userParcelsLayer');
      var parcelsLayer = _this.get('layersMap').get('parcelsLayer');
      var userParcels = _this.get('parcels.user.parcels');
      var selectedParcels = _this.get('parcels.selectedParcels');

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
