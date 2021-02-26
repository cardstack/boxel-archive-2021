import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const SELECT_BUTTON_SELECTOR = '.select-button';

module('Integration | Component | SelectButton', function (hooks) {
  setupRenderingTest(hooks);

  test('It renders', async function (assert) {
    await render(hbs`<Boxel::SelectButton/>`);
    assert.dom(SELECT_BUTTON_SELECTOR).exists();
  });

  test('It can be clicked and calls callback when clicked', async function (assert) {
    let clicked = false;
    this.set('onclick', () => (clicked = true));
    await render(hbs`<Boxel::SelectButton {{on 'click' (fn this.onclick) }}/>`);
    await click(SELECT_BUTTON_SELECTOR);
    assert.equal(clicked, true);
  });

  test('It can be disabled via html attribute', async function (assert) {
    await render(hbs`<Boxel::SelectButton disabled/>`);
    assert.dom(SELECT_BUTTON_SELECTOR).isDisabled();
  });

  test('It is assigned the correct css classes for mode', async function (assert) {
    this.set('mode', 'edit');
    await render(hbs`<Boxel::SelectButton @mode={{this.mode}}/>`);
    assert.dom(`${SELECT_BUTTON_SELECTOR}--edit`).exists();
    this.set('mode', 'view');
    assert.dom(`${SELECT_BUTTON_SELECTOR}--view`).exists();
  });

  test('It is assigned the correct class and aria for no selection', async function (assert) {
    this.setProperties({
      isPartial: false,
      isSelected: false,
      mode: 'edit',
    });

    await render(
      hbs`<Boxel::SelectButton @isPartial={{this.isPartial}} @isSelected={{this.isSelected}} @mode={{this.mode}}/>`
    );

    assert.dom(SELECT_BUTTON_SELECTOR).exists();
    assert.dom(`${SELECT_BUTTON_SELECTOR}--partial`).doesNotExist();
    assert.dom(`${SELECT_BUTTON_SELECTOR}--selected`).doesNotExist();
    assert.dom(SELECT_BUTTON_SELECTOR).hasAria('label', 'select');
  });

  test('It is assigned the correct class and aria for partial selection', async function (assert) {
    this.setProperties({
      isPartial: true,
      isSelected: false,
      mode: 'edit',
    });

    await render(
      hbs`<Boxel::SelectButton @isPartial={{this.isPartial}} @isSelected={{this.isSelected}} @mode={{this.mode}}/>`
    );

    assert.dom(`${SELECT_BUTTON_SELECTOR}--partial`).exists();
    assert.dom(`${SELECT_BUTTON_SELECTOR}--selected`).doesNotExist();
    assert.dom(SELECT_BUTTON_SELECTOR).hasAria('label', 'select');
  });

  test('It is assigned the correct class and aria for full selection', async function (assert) {
    this.setProperties({
      isPartial: true,
      isSelected: true,
      mode: 'edit',
    });
    await render(
      hbs`<Boxel::SelectButton @isPartial={{this.isPartial}} @isSelected={{this.isSelected}} @mode={{this.mode}}/>`
    );

    assert.dom(`${SELECT_BUTTON_SELECTOR}--partial`).doesNotExist();
    assert.dom(`${SELECT_BUTTON_SELECTOR}--selected`).exists();
    assert.dom(SELECT_BUTTON_SELECTOR).hasAria('label', 'selected');
  });

  test('Its default aria-label attribute can be overwritten', async function (assert) {
    this.setProperties({
      isPartial: true,
      isSelected: true,
      mode: 'edit',
    });
    await render(
      hbs`<Boxel::SelectButton @isPartial={{this.isPartial}} @isSelected={{this.isSelected}} @mode={{this.mode}} aria-label="testing"/>`
    );
    assert.dom(SELECT_BUTTON_SELECTOR).hasAria('label', 'testing');
  });
});
