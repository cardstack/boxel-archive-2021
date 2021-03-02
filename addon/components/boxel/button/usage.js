/* eslint-disable no-console */
import Component from '@glimmer/component';

export default class extends Component {
  appearanceVariants = {
    light: ['primary', 'secondary-light'],
    dark: ['primary', 'secondary-dark'],
  };
  sizeVariants = ['small', 'base', 'large'];
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
}
