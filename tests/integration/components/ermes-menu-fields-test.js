import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ermes-menu-fields', 'Integration | Component | ermes menu fields', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ermes-menu-fields}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ermes-menu-fields}}
      template block text
    {{/ermes-menu-fields}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
