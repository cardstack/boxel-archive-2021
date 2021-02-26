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
    this.set('lastClicked', null);
    this.set('closedMenuTimes', 0);
    this.set('record', (v) => {
      this.set('lastClicked', v);
    });
    this.set('closeMenu', () => {
      this.set('closedMenuTimes', this.closedMenuTimes + 1);
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
    assert.equal(this.lastClicked, 'One');
    assert.equal(this.closedMenuTimes, 1);
    await click(`[${TEST_MENU_ITEM_TEXT_ATTRIBUTE}='Two']`);
    assert.equal(this.lastClicked, 'Two');
    assert.equal(this.closedMenuTimes, 2);
    await click(`[${TEST_MENU_ITEM_TEXT_ATTRIBUTE}='Three']`);
    assert.equal(this.lastClicked, 'Three');
    assert.equal(this.closedMenuTimes, 3);
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
    assert
      .dom(`${MENU_ITEM_SELECTOR}:nth-child(1)`)
      .matchesSelector(`${MENU_ITEM_SELECTOR}--dangerous`);
    assert
      .dom(`${MENU_ITEM_SELECTOR}:nth-child(2)`)
      .matchesSelector(`${MENU_ITEM_SELECTOR}--has-icon`);
    assert.dom(`${MENU_ITEM_SELECTOR}:nth-child(2) svg`).exists();
    assert
      .dom(`${MENU_ITEM_SELECTOR}:nth-child(3)`)
      .matchesSelector(
        `${MENU_ITEM_SELECTOR}--has-icon${MENU_ITEM_SELECTOR}--dangerous`
      );
    assert.dom(`${MENU_ITEM_SELECTOR}:nth-child(3) svg`).exists();
  });
});
