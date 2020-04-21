import Component from '@glimmer/component';

export default class CollectionTableComponent extends Component {
  constructor(...args) {
    super(...args);
    this.fields = this.args?.collection[0] || [];
  }
}
