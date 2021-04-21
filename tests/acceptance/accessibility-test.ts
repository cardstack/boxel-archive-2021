import { module, skip } from 'qunit';
import { visit } from '@ember/test-helpers';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | accessibility', function (hooks) {
  setupApplicationTest(hooks);

  /* Docs related a11y errors (tables, inputs) are bogging down the audit.
    Add a11yAudit tests at the component-level. */
  skip('accessibility check', async function (assert) {
    // TODO: ignore ember-freestyle errors
    await visit('/docs');
    await a11yAudit();
    assert.ok(true, 'no a11y errors found!');
  });
});
