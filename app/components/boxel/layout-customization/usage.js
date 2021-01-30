/* eslint-disable ember/no-empty-glimmer-component-classes */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const COLOR_OPTIONS = [
  { title: 'Navy', value: '#281e78', theme: 'dark' },
  { title: 'Blue', value: '#0069f9', theme: 'dark' },
  { title: 'Purple', value: '#6638ff', theme: 'dark' },
  { title: 'Fuschia', value: '#ac00ff', theme: 'dark' },
  { title: 'Lilac', value: '#a66dfa' },
  { title: 'Cyan', value: '#00ebe5' },
  { title: 'Teal', value: '#03c4bf' },
  { title: 'Green', value: '#37eb77' },
  { title: 'Neon lime', value: '#c3fc33' },
  // --boxel-yellow: #ffd800;
  // --boxel-orange: #ff7f00;
  // --boxel-red: #ff5050;
  // --boxel-pink: #ff009d;
];

const PATTERN_OPTIONS = [{ title: 'None', value: '' }];

export default class extends Component {
  @tracked mode = 'view';
  @tracked issuerName = 'Gary Walker';
  @tracked headerColor = { title: 'Neon lime', value: '#c3fc33' };
  @tracked headerPattern = { title: 'None', value: '' };
  colorOptions = COLOR_OPTIONS;
  patternOptions = PATTERN_OPTIONS;

  @action
  updateHeaderColor(val) {
    return (this.headerColor = val);
  }
}
