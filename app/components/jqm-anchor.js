import JqmComponent from './jqm-component';

export default JqmComponent.extend({
  nameTag: "a",
  attributeBindings: ['rel:data-rel'],
  click() {
    this.sendAction();
  }
});
