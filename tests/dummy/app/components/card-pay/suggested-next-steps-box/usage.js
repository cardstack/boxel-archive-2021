import Component from '@glimmer/component';

export default class SuggestedNextStepsBoxUsage extends Component {
  nextSteps = [
    {
      href: '#',
      text: 'Transfer Prepaid Card',
    },
    {
      href: '#',
      text: 'Create new Prepaid Card',
    },
    {
      href: '#',
      text: 'Split Prepaid Card',
    },
    {
      href: '#',
      text: 'Use as template for new Prepaid Card',
    },
  ];
  toHome = {
    href: '#',
    text: 'Return to dashboard',
  };
}
