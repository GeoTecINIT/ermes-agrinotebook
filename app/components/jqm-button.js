import JqmComponent from './jqm-component';

export default JqmComponent.extend({
  tagName: 'button',
  classNameBindings: ['ui-btn'],
  click() {
    this.sendAction();
  }
});
