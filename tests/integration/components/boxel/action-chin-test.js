import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

const CTA_BLOCK_SELECTOR = '[data-test-boxel-cta-block]';
const MAIN_ACTION_BUTTON_SELECTOR =
  '[data-test-boxel-cta-block] [data-test-boxel-button]:nth-of-type(1)';
const CANCEL_CTA =
  '[data-test-boxel-cta-block] [data-test-boxel-button]:nth-of-type(2)';
const MAIN_ACTION_AREA_SELECTOR =
  '[data-test-boxel-cta-block-action-status-area]';
const MAIN_ACTION_AREA_ICON_SELECTOR =
  '[data-test-boxel-cta-block-action-status-area] .boxel-cta-block__action-status-area-icon';
const INFO_AREA_SELECTOR = '[data-test-boxel-cta-block-area]';
const DEFAULT_PRIVATE_NOTICE_SELECTOR =
  '[data-test-boxel-cta-block-private-notice]';

const STEP_DATA_TEST_ATTRIBUTE = 'data-test-boxel-cta-block-step';

module('Integration | Component | ActionChin', function (hooks) {
  setupRenderingTest(hooks);

  const mainActionButtonText = 'mainActionButtonText';
  const cancelActionButtonText = 'cancelActionButtonText';
  const infoAreaText = 'infoAreaText';
  const mainActionAreaText = 'mainActionAreaText';

  test('it accepts and renders the default block with the ActionButton and InfoArea components', async function (assert) {
    this.setProperties({
      state: 'default',
      mainActionButtonText,
      infoAreaText,
    });
    await render(hbs`
      <Boxel::ActionChin
        @state={{this.state}}
        as |a|
      >
        <a.ActionButton>
          {{this.mainActionButtonText}}
        </a.ActionButton>
        <a.InfoArea>
          {{this.infoAreaText}}
        </a.InfoArea>
      </Boxel::ActionChin>
    `);
    assert.dom(MAIN_ACTION_BUTTON_SELECTOR).containsText(mainActionButtonText);
    assert.dom(INFO_AREA_SELECTOR).containsText(infoAreaText);

    await a11yAudit();
    assert.ok(true, 'no a11y errors found!');
  });

  test('it accepts and renders the default block with disabled ActionButton component', async function (assert) {
    this.setProperties({
      state: 'disabled',
      stepNumber: null,
      mainActionButtonText,
    });
    await render(hbs`
      <Boxel::ActionChin
        @state={{this.state}}
        @stepNumber={{this.stepNumber}}
      as |d|>
        <d.ActionButton @disabled={{true}}>
          {{this.mainActionButtonText}}
        </d.ActionButton>
      </Boxel::ActionChin>
    `);
    assert.dom(MAIN_ACTION_BUTTON_SELECTOR).containsText(mainActionButtonText);
    assert.dom(MAIN_ACTION_BUTTON_SELECTOR).isDisabled();
    assert.dom(DEFAULT_PRIVATE_NOTICE_SELECTOR).isVisible();

    this.set('stepNumber', 1);
    assert.dom(DEFAULT_PRIVATE_NOTICE_SELECTOR).isNotVisible();

    await a11yAudit();
    assert.ok(true, 'no a11y errors found!');
  });

  test('it accepts and renders the in-progress named block with the ActionButton, CancelButton, and InfoArea components', async function (assert) {
    this.setProperties({
      state: 'in-progress',
      mainActionButtonText,
      cancelActionButtonText,
      infoAreaText,
    });
    await render(hbs`
      <Boxel::ActionChin
        @state={{this.state}}
      >
      <:in-progress as |i|>
        <i.ActionButton>
          {{this.mainActionButtonText}}
        </i.ActionButton>

        <i.CancelButton>
          {{this.cancelActionButtonText}}
        </i.CancelButton>

        <i.InfoArea>
          {{this.infoAreaText}}
        </i.InfoArea>
      </:in-progress>
      </Boxel::ActionChin>
    `);
    assert.dom(MAIN_ACTION_BUTTON_SELECTOR).containsText(mainActionButtonText);
    assert.dom(CANCEL_CTA).containsText(cancelActionButtonText);
    assert.dom(INFO_AREA_SELECTOR).containsText(infoAreaText);

    await a11yAudit();
    assert.ok(true, 'no a11y errors found!');
  });

  test('it accepts and renders the memorialized named block with the ActionButton, ActionStatusArea, and InfoArea components', async function (assert) {
    this.setProperties({
      state: 'memorialized',
      mainActionButtonText,
      mainActionAreaText,
      infoAreaText,
    });
    await render(hbs`
      <Boxel::ActionChin
        @state={{this.state}}
      >
      <:memorialized as |m|>
      <m.ActionButton>
          {{this.mainActionButtonText}}
        </m.ActionButton>

        <m.ActionStatusArea>
          {{this.mainActionAreaText}}
        </m.ActionStatusArea>

        <m.InfoArea>
          {{this.infoAreaText}}
        </m.InfoArea>
      </:memorialized>
      </Boxel::ActionChin>
    `);
    assert.dom(MAIN_ACTION_BUTTON_SELECTOR).containsText(mainActionButtonText);
    assert.dom(INFO_AREA_SELECTOR).containsText(infoAreaText);

    await a11yAudit();
    assert.ok(true, 'no a11y errors found!');

    await render(hbs`
      <Boxel::ActionChin
        @state={{this.state}}
      >
      <:memorialized as |m|>
        <m.ActionStatusArea>
          {{this.mainActionAreaText}}
        </m.ActionStatusArea>
      </:memorialized>
      </Boxel::ActionChin>
    `);
    assert.dom(MAIN_ACTION_AREA_SELECTOR).containsText(mainActionAreaText);
  });

  test('it changes rendered contents when @state argument changes', async function (assert) {
    const stateText = {
      default: 'Default state here',
      'in-progress': 'In progress state here',
      memorialized: 'Memorialized state here',
    };
    this.setProperties({
      state: 'default',
      stateText,
    });
    await render(hbs`
      <Boxel::ActionChin
        @state={{this.state}}
      >
      <:default>
        {{get this.stateText "default"}}
      </:default>
      <:in-progress>
        {{get this.stateText "in-progress"}}
      </:in-progress>
      <:memorialized>
        {{get this.stateText "memorialized"}}
      </:memorialized>
      </Boxel::ActionChin>
    `);
    const states = ['default', 'in-progress', 'memorialized'];
    for (const state of states) {
      this.set('state', state);
      assert.dom(CTA_BLOCK_SELECTOR).containsText(stateText[state]);
      for (const state2 of states) {
        if (state2 !== state)
          assert.dom(CTA_BLOCK_SELECTOR).doesNotContainText(stateText[state2]);
      }
    }
  });

  test('It renders a step number if @stepNumber is provided', async function (assert) {
    this.setProperties({
      state: 'default',
      stepNumber: 1,
    });
    await render(hbs`
      <Boxel::ActionChin
        @state={{this.state}}
        @stepNumber={{this.stepNumber}}
      >
      </Boxel::ActionChin>
    `);

    assert.dom(`[${STEP_DATA_TEST_ATTRIBUTE}="1"]`).containsText('Step 1');
    this.set('stepNumber', 2);
    assert.dom(`[${STEP_DATA_TEST_ATTRIBUTE}="2"]`).containsText('Step 2');

    await a11yAudit();
    assert.ok(true, 'no a11y errors found!');
  });

  test('In the memorialized state, the ActionStatusArea icon can be configured', async function (assert) {
    this.set('state', 'memorialized');
    await render(hbs`
      <Boxel::ActionChin
        @state={{this.state}}
      >
      <:memorialized as |m|>
        <m.ActionStatusArea>
          {{this.mainActionAreaText}}
        </m.ActionStatusArea>
      </:memorialized>
      </Boxel::ActionChin>
    `);
    assert.dom(MAIN_ACTION_AREA_ICON_SELECTOR).exists();
    await render(hbs`
      <Boxel::ActionChin
        @state={{this.state}}
      >
      <:memorialized as |m|>
        <m.ActionStatusArea @icon={{null}}>
          {{this.mainActionAreaText}}
        </m.ActionStatusArea>
      </:memorialized>
      </Boxel::ActionChin>
    `);
    assert.dom(MAIN_ACTION_AREA_ICON_SELECTOR).doesNotExist();
  });

  test('It renders the private notice regardless of InfoArea component use for the default, in-progress, and memorialized states', async function (assert) {
    this.set('state', 'default');
    await render(hbs`
      <Boxel::ActionChin
        @state={{this.state}}
      >
      <:default as |a|>
        <a.InfoArea>
          Info area that visually replaces the private notice
        </a.InfoArea>
      </:default>
      <:in-progress as |i|>
        <i.InfoArea>
          Info area that visually replaces the private notice
        </i.InfoArea>
      </:in-progress>
      <:memorialized as |m|>
        <m.InfoArea>
          Info area that visually replaces the private notice
        </m.InfoArea>
      </:memorialized>
      </Boxel::ActionChin>
    `);
    assert.dom(DEFAULT_PRIVATE_NOTICE_SELECTOR).exists();
    this.set('state', 'in-progress');
    assert.dom(DEFAULT_PRIVATE_NOTICE_SELECTOR).exists();
    this.set('state', 'memorialized');
    assert.dom(DEFAULT_PRIVATE_NOTICE_SELECTOR).exists();
  });
});
