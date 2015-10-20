import JqmComponent from './jqm-component';

export default JqmComponent.extend({
  tagName: 'select',
  attributeBindings: ['mini:data-mini', 'iconPos:data-iconpos']
});
