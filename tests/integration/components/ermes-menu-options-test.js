import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ermes-menu-options', 'Integration | Component | ermes menu options', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ermes-menu-options}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ermes-menu-options}}
      template block text
    {{/ermes-menu-options}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
