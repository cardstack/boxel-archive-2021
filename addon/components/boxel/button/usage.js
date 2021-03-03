/* eslint-disable no-console */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
export default class extends Component {
  boxelFontSizes = ['xs', 'sm', '', 'lg', 'xl'].map((v) =>
    v ? `var(--boxel-font-size-${v})` : 'var(--boxel-font-size)'
  );
  boxelSpacingSizes = [
    'xxxs',
    'xxs',
    'xs',
    'sm',
    '',
    'lg',
    'xl',
    'xxl',
    'xxxl',
  ].map((v) => (v ? `var(--boxel-sp-${v})` : 'var(--boxel-sp)'));
  sizeVariants = ['small', 'base', 'large'];
  kindVariants = {
    light: ['primary', 'secondary-light'],
    dark: ['primary', 'secondary-dark'],
  };
  iconVariants = [
    {
      text: 'left',
      iconLeft: 'gear',
      iconRight: null,
    },
    {
      text: 'right',
      iconLeft: null,
      iconRight: 'close',
    },
    {
      text: 'both',
      iconLeft: 'gear',
      iconRight: 'close',
    },
  ];

  @tracked size = 'base';
  @tracked kind = 'primary';
  @tracked disabled = false;
  @tracked iconLeft = '';
  @tracked iconRight = '';
  @tracked iconSpacing = 'var(--boxel-sp-xs)';
  @tracked iconSize = 'var(--boxel-font-size-sm)';

  @action
  alert() {
    alert('Hey! You clicked the button.');
  }
}
