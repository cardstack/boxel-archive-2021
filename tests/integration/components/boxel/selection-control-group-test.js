/**
 * Scaffolding tests for SelectionControlGroup component (https://cardstack.github.io/boxel/#/docs?s=Components&ss=%3CBoxel%3A%3ASelectionControlGroup%3E)
 * path from project root: addon/components/boxel/selection-control-group
 */

/**
 * ### Things I'm not sure about
 * Wondering why we don't toggleSelectAll on the Boxel::Button as well, if its text is select all
 * - because there's a nested component that wants to be clicked.
 * - should we still allow people to click it and "Select All" when there are no items selected?
 * We use ember-basic-dropdown in the DropdownButton component but don't list it in package.json.
 * It's a dependency of ember-power-select, so it's installed at the moment, I think we should probably specify it as a dependency explicitly so we don't accidentally break things.
 */

/**
 * TODO: test render + behavior for selecting all items
 * - isSelected = true
 * - selectedItemCount > 0
 *
 * test for:
 * - Text shows number of items selected
 * - checkbox state
 * - toggleSelectAll triggered when checkbox clicked
 * - dropdown menu opens when clicked
 */

/**
 * TODO: test render + behavior for selecting some, but not all items
 * - isSelected = false
 * - selectedItemCount > 0
 *
 * test for:
 * - Text shows number of items selected
 * - checkbox state
 * - toggleSelectAll triggered when checkbox clicked
 * - dropdown menu opens when clicked
 */

/**
 * TODO: test render + behavior for selecting no items
 * - isSelected = false
 * - selectedItemCount = 0
 *
 * test for:
 * - text shows "Select All"
 * - checkbox state
 * - toggleSelectAll
 * - no dropdown menu
 */

/**
 * TODO: accepts and renders custom menu components passed to the @menuComponent argument
 */
