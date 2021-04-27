import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Integration | Component | ActionContainer', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Boxel::ActionContainer>
        <div data-test-action-container-test-content>Card</div>
      </Boxel::ActionContainer>
    `);
    assert.dom('[data-test-boxel-action-container]').exists();
    assert
      .dom('[data-test-boxel-action-container]')
      .doesNotHaveClass('boxel-action-container--is-complete');
    assert.dom('[data-test-boxel-action-header]').doesNotExist();
    assert.dom('[data-test-boxel-action-prompt]').doesNotExist();
    assert.dom('[data-test-action-container-test-content]').hasText('Card');
  });

  test('it can render with header and prompt', async function (assert) {
    await render(hbs`
      <Boxel::ActionContainer
        @header="Action Card"
        @prompt="Please enter name"
      >
        <div>Card</div>
      </Boxel::ActionContainer>
    `);

    assert.dom('[data-test-boxel-action-header]').exists();
    assert.dom('[data-test-boxel-action-header]').hasText('Action Card');
    assert.dom('[data-test-boxel-action-container]').exists();
    assert.dom('[data-test-boxel-action-prompt]').hasText('Please enter name');

    await a11yAudit();
    assert.ok(true, 'no a11y errors found!');
  });

  test('it can render in memorialized mode', async function (assert) {
    await render(hbs`
      <Boxel::ActionContainer
        @isComplete={{true}}
        @header="Action Card"
      >
        <div>Card</div>
      </Boxel::ActionContainer>
    `);

    assert.dom('[data-test-boxel-action-container]').exists();
    assert
      .dom('[data-test-boxel-action-container]')
      .hasClass('boxel-action-container--is-complete');

    await a11yAudit();
    assert.ok(true, 'no a11y errors found!');
  });
});
