import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const MENU_ITEM_SELECTOR = '.menu__item';
const MENU_SEPARATOR_SELECTOR = '.menu__separator';
const TEST_MENU_ITEM_TEXT_ATTRIBUTE = 'data-test-menu-item';

module('Integration | Component | Menu', function (hooks) {
  setupRenderingTest(hooks);

  test('It can render a list of menu items that trigger appropriate callbacks when clicked', async function (assert) {
    let lastClicked = null;
    let closedMenuTimes = 0;
    this.set('record', (v) => {
      lastClicked = v;
    });
    this.set('closeMenu', () => {
      closedMenuTimes += 1;
    });
    await render(hbs`
      <Boxel::Menu
        @closeMenu={{fn this.closeMenu}}
        @items={{array 
          (menu-item 'One' (fn this.record 'One'))
          (menu-item 'Two' (fn this.record 'Two') dangerous=true)
          (menu-item 'Three' (fn this.record 'Three') icon='gear')
        }}
      />
    `);
    await click(`[${TEST_MENU_ITEM_TEXT_ATTRIBUTE}='One']`);
    assert.equal(lastClicked, 'One');
    assert.equal(closedMenuTimes, 1);
    await click(`[${TEST_MENU_ITEM_TEXT_ATTRIBUTE}='Two']`);
    assert.equal(lastClicked, 'Two');
    assert.equal(closedMenuTimes, 2);
    await click(`[${TEST_MENU_ITEM_TEXT_ATTRIBUTE}='Three']`);
    assert.equal(lastClicked, 'Three');
    assert.equal(closedMenuTimes, 3);
  });

  test('It can render dividers', async function (assert) {
    await render(hbs`
      <Boxel::Menu
        @closeMenu={{noop}}
        @items={{array 
          (menu-item 'Top' (noop))
          (menu-item '---')
          (menu-item 'Three' (noop))
        }}
      />
    `);
    assert.dom(`${MENU_SEPARATOR_SELECTOR}:nth-child(2)`).exists();
  });

  test('It can render variants with appropriate classes', async function (assert) {
    await render(hbs`
      <Boxel::Menu
        @closeMenu={{noop}}
        @items={{array 
          (menu-item 'Dangerous' (noop) dangerous=true)
          (menu-item 'Icon' (noop) icon='gear')
          (menu-item 'Icon' (noop) icon='gear' dangerous=true)
        }}
      />
    `);
    assert.dom(`${MENU_ITEM_SELECTOR}:nth-child(1)`).hasClass(/--dangerous/);
    assert.dom(`${MENU_ITEM_SELECTOR}:nth-child(2)`).hasClass(/--has-icon/);
    assert.dom(`${MENU_ITEM_SELECTOR}:nth-child(2) svg`).exists();
    assert
      .dom(`${MENU_ITEM_SELECTOR}:nth-child(3)`)
      .hasClass(/--has-icon/)
      .hasClass(/--dangerous/);
    assert.dom(`${MENU_ITEM_SELECTOR}:nth-child(3) svg`).exists();
  });
});
