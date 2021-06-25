import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, waitUntil, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import CardBot from '@cardstack/boxel/usage-support/images/orgs/cardbot.svg';

module('Integration | Component | Thread', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(async function (assert) {
    await a11yAudit();
    assert.ok(true, 'no a11y errors found!');
  });

  test('it shows a footer when there are messages beneath the viewport', async function (assert) {
    this.set('messages', [1, 1, 1, 1]);
    this.set('cardBotIcon', CardBot);

    await render(hbs`
      <Boxel::Thread @autoscroll={{this.autoscroll}} class="boxel-thread-usage">
        <:header>
          <Boxel::ThreadHeader @title="Project Title" />
        </:header>

        <:content as |setWatchedElement|>
          <Boxel::DateDivider @date={{dayjs-format (now)}} />
          {{#each this.messages}}
            <Boxel::ThreadMessage
              {{did-insert setWatchedElement}}
              @name="Cardbot"
              @hideName={{true}}
              @imgURL={{this.cardBotIcon}}
            >
              Hello, it's nice to see you!
            </Boxel::ThreadMessage>
          {{/each}}
        </:content>
        <:footer>
          <span data-test-footer>Scroll more</span>
        </:footer>
      </Boxel::Thread>
    `);

    await waitFor('[data-test-footer]');

    assert.dom('[data-test-footer]').exists();

    find('[data-test-boxel-thread-message]:last-child').scrollIntoView();

    await waitUntil(() => find('[data-test-footer]') === null);

    assert.dom('[data-test-footer]').doesNotExist();

    this.set('messages', [1, 1, 1, 1, 1, 1, 1]);

    await waitUntil(() => find('[data-test-footer]'));

    assert.dom('[data-test-footer]').exists();

    if (window.location.href.includes('devmode')) {
      await this.pauseTest();
    }
  });
});
