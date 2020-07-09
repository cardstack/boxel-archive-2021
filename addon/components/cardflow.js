import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, get, set } from '@ember/object';
import { compare, isBlank } from '@ember/utils';

export default class CardflowComponent extends Component {
  @tracked project = this.args.model?.user?.queueCards[0];
  @tracked actionSteps = this.args.actionSteps;
  @tracked progressPct = this.args.progressPct;
  @tracked lastUpdated = this.args.lastUpdated;
  @tracked isolatedCatalog = this.args.isolatedCatalog;
  @tracked catalogId = null;

  removed = [];

  get progress() {
    switch(this.progressPct) {
      case (20):
        return {
          pct: this.progressPct,
          iconLg: '/media-registry/progress-pie/progress-20pct-lg.svg',
          desc: 'Proposal Submitted'
        }
      case (40):
        return {
          pct: this.progressPct,
          iconLg: '/media-registry/progress-pie/progress-40pct-lg.svg',
          desc: 'Reviewing Proposal'
        }
      case (60):
        return {
          pct: this.progressPct,
          iconLg: '/media-registry/progress-pie/progress-60pct-lg.svg',
          desc: 'Transfer Accepted',
          timestamp: this.actionSteps[0].timestamp
        }
      case (80):
        return {
          pct: this.progressPct,
          iconLg: '/media-registry/progress-pie/progress-80pct-lg.svg',
          desc: 'Metadata Amended',
          timestamp: this.actionSteps[2].timestamp
        }
        case (100):
          return {
            pct: this.progressPct,
            iconLg: '/media-registry/progress-pie/progress-100pct-lg.svg',
            desc: 'Transfer Completed'
          }
      default:
        return {
          pct: 0,
          iconLg: '/assets/images/icons/progress-circle-lg.svg',
          desc: 'Not Started'
        }
    }
  }

  set progress(val) {
    return val;
  }

  @action
  setProgress(val) {
    this.progressPct = val;
    if (val === 60) {
      this.args.updateTimestamp(this.actionSteps[0].timestamp);
    }
    if (val === 100) {
      this.args.updateTimestamp('2020-09-01T09:51');
    }
    this.args.updateProgress(val);
    set(this, 'progress', val);
  }

  @action
  setTimestamp(val) {
    this.args.updateTimestamp(val);
  }

  @action
  displayCatalog(id) {
    this.catalogId = id;
  }

  @action
  closeItem() {
    this.args.setItemId();
  }

  @action
  closeModal() {
    this.catalogId = null;
    this.closeItem();
  }

  @action
  async search(query) {
    let { collection, columns } = this.isolatedCatalog;
    if (isBlank(query)) {
      return collection;
    } else {
      let lowerQuery = query.toLowerCase();
      return collection.filter(i =>
        columns.some(c =>
            c.isSearchable !== false &&
            c.valuePath &&
            !isBlank(i[c.valuePath]) &&
            String(i[c.valuePath]).toLowerCase().includes(lowerQuery)
        )
      );
    }
  }

  @action
  async sort(column, direction) {
    let multiplier = (direction === 'asc') ? 1 : -1;
    return this.isolatedCatalog.collection.sort((a, b) => multiplier * compare(get(a, column.valuePath), get(b, column.valuePath)))
  }

  @action
  removeItem(item) {
    this.removed.push(item);
    return this.isolatedCatalog.collection.filter(i => !this.removed.includes(i));
  }
}
