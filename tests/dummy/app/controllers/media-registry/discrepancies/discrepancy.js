import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { typeOf } from '@ember/utils';

export default class MediaRegistryDiscrepanciesDiscrepancyController extends Controller {
  @tracked count;
  @tracked displayId; // TODO: clean up this field
  @tracked removed = [];
  @tracked mode = 'comparison';
  @tracked lastSelection;
  @tracked nestedView;
  @tracked nestedField;
  @tracked nestedCompField;
  @tracked fieldTrail = [];
  @tracked currentField = {};
  @tracked currentItem = {}; // for collection fields
  omittedFields = ['verifi_id'];
  fieldsNotRendered = ['id', 'type', 'status', 'new'];
  cardTypes = ['participant', 'file', 'registration', 'publishing-representation', 'territory' ];

  @action
  adjustCount() {
    if (this.model.count) {
      this.count = this.model.count;
    } else {
      this.count = 0;
      set(this.model, 'count', this.count);
    }

    if (this.model.displayId) {
      this.displayId = this.model.displayId;
    } else {
      this.displayId = [];
      set(this.model, 'displayId', []);
    }

    this.mode = 'comparison';
    this.lastSelection = null;
    this.nestedView = false;
    this.nestedField = [];
    this.nestedCompField = [];
    this.fieldTrail = [];
    this.currentField = {};
    this.currentItem = {};
  }

  @action
  selectView(val) {
    this.mode = val;
    this.lastSelection = val;
  }

  @action
  toggleView() {
    if (this.mode === 'comparison') {
      if (this.lastSelection) {
        this.mode = this.lastSelection;
      } else {
        this.mode = 'keep-current';
        this.lastSelection = 'keep-current';
      }
    } else {
      this.mode = 'comparison';
    }
  }

  @action
  compareFields(field, compField) {
    // assumption: cards have the same fields even if values might be null

    let [ json1, json2 ] = [ field, compField ].map(data => JSON.stringify(data));

    if (json1 === json2 || (!field.value && !compField.value && !field.id && !compField.id)) {
      return;
    }

    if (compField.type === 'collection' || field.type === 'collection') {
      this.collectionComparison(field, compField);
      return;
    }

    if (!field.value && compField.value) {
      set(compField, 'status', 'added');
      return;
    }

    if (field.value && !compField.value) {
      set(compField, 'status', 'removed');
      return;
    } // removed

    set(compField, 'status', 'modified');
    return;
  }

  @action
  collectionComparison(field, compField) {
    // clear previously set card status
    if (compField.value && compField.value.length) {
      compField.value.forEach(card => set(card, 'status', null));
    }
    if (field.value && field.value.length) {
      field.value.forEach(card => set(card, 'status', null));
    }

    if (!field.value && !compField.value) {
      return;
    }

    if (!field.value) {
      for (let card of compField.value) {
        set(card, 'status', 'added');
      }
      return;
    }

    if (!compField.value) {
      set (compField, 'compCollection', []);
      set (compField, 'type', field.type);
      set (compField, 'component', field.component);

      for (let card of field.value) {
        set(card, 'status', 'removed');
        set(compField, 'compCollection', [ ...compField.compCollection, card ]);
      }
      return;
    }

    if (field.value.length && compField.value.length) {
      set (compField, 'compCollection', [ ...compField.value ]);

      for (let card of compField.value) {
        let eqCard = field.value.find(el => el.id === card.id);
        if (eqCard) {
          this.compareFields(eqCard, card);
        } else {
          set(card, 'status', 'added');
        }
      }

      for (let card of field.value) {
        let eqCard = compField.value.find(el => el.id === card.id);
        if (!eqCard) {
          set(card, 'status', 'removed');
          set(compField, 'compCollection', [ ...compField.compCollection, card ]);
        }
      }
    }
  }

  @action
  reconciliateField(field, compField) {
    let tempField = Object.assign({}, compField);
    set(field, 'tempField', tempField);

    let currentField = this.model.baseCard.isolatedFields.find(el => el.title === this.currentField.title);

    if (currentField.type === 'collection' || typeOf(currentField.value) === 'array') {
      let value = currentField.tempCollection ? currentField.tempCollection : currentField.value;
      let currentItem = value.find(el => el.id === this.currentItem.id);
      if (currentItem) {
        if (!currentItem.new) {
          currentItem.new = true;
        }
        set(currentItem, field.title, tempField.value);
      } else {
        let tempCollection = Object.assign([], value);
        tempCollection.push({});
        currentItem = tempCollection[tempCollection.length - 1];

        for (let f in this.currentItem) {
          if (f === 'id' || f === 'title' || f === 'type' || f === 'component' || f === 'status') {
            currentItem[f] = this.currentItem[f];
          } else {
            currentItem[f] = null;
          }
        }

        set(currentItem, field.title, tempField.value);
        set(currentField, 'tempCollection', tempCollection);
      }

      this.displayId = [ ...this.displayId, currentItem.id];
      set(this.model, 'displayId', this.displayId);
    }

    if (!currentField.value && this.currentField.value) {
      let newField = {};

      for (let f in this.currentField) {
        if (f === 'id' || f === 'title' || f === 'type' || f === 'component' || f === 'status') {
          newField[f] = this.currentField[f];
        } else {
          newField[f] = null;
        }
      }

      if (newField.type === 'card') {
        set(newField, 'value', this.currentItem);
        set(currentField, 'tempField', newField);
      }

      if (newField.type === 'collection' || typeOf(this.currentField.value) === 'array') {
        newField.tempCollection = [{}];
        let currentItem = newField.tempCollection[0];

        for (let f in this.currentItem) {
          if (f === 'id' || f === 'title' || f === 'type' || f === 'component' || f === 'status') {
            currentItem[f] = this.currentItem[f];
          } else {
            currentItem[f] = null;
          }
        }

        set(currentItem, field.title, tempField.value);

        let index = this.model.baseCard.isolatedFields.indexOf(currentField);
        if (index > -1) {
          this.model.baseCard.isolatedFields[index] = newField;
        }
      }
    }

    // TODO: fix count
    this.count++;
    set(this.model, 'count', this.count);
  }

  @action
  revertField(field) {
    set(field, 'tempField', null);

    if (this.count > 0) {
      this.count--;
      set(this.model, 'count', this.count);
    }
  }

  @action selectChange(val, title, component) {
    let fields = this.nestedView ? this.nestedField : this.model.baseCard.isolatedFields;
    let collection = fields.find(el => el.title === title);

    // assumption: cards have the same fields even if values might be null
    if (!collection) { return; }

    if (collection.tempCollection || collection.value) {
      let tempVal = Object.assign({}, val);
      let tempCollection = Object.assign([], collection.tempCollection || collection.value);
      let item = tempCollection.find(el => el.id === val.id);

      if (item) {
        tempCollection.filter((el, i) => {
          if (el.id === tempVal.id) {
            tempCollection[i] = tempVal;
            tempCollection[i].new = true;
          }
        });
      } else {
        tempVal.new = true;
        tempCollection = [ ...tempCollection, tempVal ];
      }
      set(collection, 'tempCollection', tempCollection);
    } else {
      let tempVal = Object.assign({}, val);
      tempVal.new = true;

      set(collection, 'type', 'collection');
      set(collection, 'component', component);
      set(collection, 'tempCollection', [ tempVal ]);
    }

    if (this.nestedView) {
      let currentField = this.model.baseCard.isolatedFields.find(el => el.title === this.currentField.title);
      if (currentField.value) {
        let currentItem = currentField.value.find(el => el.id === this.currentItem.id);
        if (currentItem) {
          set(currentItem, collection.title, collection);
        } else {
          let tempCollection = Object.assign([], currentField.value);
          tempCollection.push({});
          currentItem = tempCollection[tempCollection.length - 1];

          for (let f in this.currentItem) {
            if (f === 'id' || f === 'title' || f === 'type' || f === 'component' || f === 'status') {
              currentItem[f] = this.currentItem[f];
            } else {
              currentItem[f] = null;
            }
          }

          set(currentItem, collection.title, collection);
          set(currentField, 'tempCollection', tempCollection);
        }
      } else {
        let newField = {};

        for (let f in this.currentField) {
          if (f === 'id' || f === 'title' || f === 'type' || f === 'component' || f === 'status') {
            newField[f] = this.currentField[f];
          } else {
            newField[f] = null;
          }
        }

        if (newField.type === 'collection' || typeOf(this.currentField.value) === 'array') {
          newField.tempCollection = [{}];
          let currentItem = newField.tempCollection[0];
          currentItem.new = true;

          for (let f in this.currentItem) {
            if (f === 'id' || f === 'title' || f === 'type' || f === 'component' || f === 'status') {
              currentItem[f] = this.currentItem[f];
            } else {
              currentItem[f] = null;
            }
          }

          set(currentItem, collection.title, collection.tempCollection);
        }


        let index = this.model.baseCard.isolatedFields.indexOf(currentField);
        if (index > -1) {
          this.model.baseCard.isolatedFields[index] = newField;
        }
      }

    }

    this.displayId = [ ...this.displayId, val.id];
    set(this.model, 'displayId', this.displayId);

    this.count++;
    set(this.model, 'count', this.count);
  }

  @action revertChange(val, title) {
    let collection = this.model.baseCard.isolatedFields.find(el => el.title === title);
    this.displayId = this.displayId.filter(el => el !== val.id);
    set(this.model, 'displayId', this.displayId);

    if (collection.tempCollection && collection.value) {
      let tempCollection = Object.assign([], collection.tempCollection);
      let tempVal = Object.assign({}, val);
      let item = collection.value.find(el => el.id === tempVal.id);
      if (item) {
        tempCollection.filter((el, i) => {
          if (el.id === tempVal.id) {
            tempCollection[i] = item;
          }
        });
        set(collection, 'tempCollection', tempCollection);
      } else {
        this.removed.push(val.id);
        let filteredColl = collection.tempCollection.filter(el => !this.removed.includes(el.id));
        set(collection, 'tempCollection', filteredColl);
        this.removed = [];
      }
    }

    else if (collection.tempCollection) {
      this.removed.push(val.id);
      let filteredColl = collection.tempCollection.filter(el => !this.removed.includes(el.id));
      set(collection, 'tempCollection', filteredColl);
      this.removed = [];
    }
    else {
      return;
    }

    if (this.count > 0) {
      this.count--;
      set(this.model, 'count', this.count);
    }
  }

  @action
  backToTopLevel() {
    this.nestedView = false;
    this.fieldTrail = [];
    this.currentField = {};
    this.currentItem = {};
  }

  @action
  drillDown(f, val, fieldData) {
    this.nestedView = true;
    this.nestedField = [];
    this.nestedCompField = [];

    this.fieldTrail = [...this.fieldTrail, fieldData];
    this.currentField = fieldData;
    this.currentItem = val;

    let field = f.tempField ? f.tempField : f;
    let value = field.tempCollection ? field.tempCollection : field.value;

    // field (base field)
    if (value) {
      if (field.type === 'collection') {
        let item = value.find(el => el.id === val.id);
        if (item) {
          for (let v in item) {
            if (!item[v] || typeof item[v] !== 'object') {
              this.nestedField.push({
                title: v,
                value: item[v]
              });
            } else {
              if (!item[v].value && !item[v].type && !item[v].length) {
                this.nestedField.push({
                  title: v,
                  value: null
                });
              }
              else if (item[v].type === 'collection') {
                this.nestedField.push({
                  title: v,
                  type: item[v].type,
                  value: item[v].tempCollection || item[v].value,
                  component: item[v].component
                });
              }
              else if (item[v].length) {
                let nestedCollection = [];
                this.nestedField.push({
                  title: v,
                  type: 'collection',
                  value: nestedCollection
                });
                for (let card of item[v]) {
                  nestedCollection.push(card);
                }
              } else {
                this.nestedField.push({
                  title: v,
                  type: 'card',
                  value: item[v],
                  component: item[v].type === 'participant' ? 'cards/composer' : null //TODO
                });
              }
            }
          }
        }
      } else if (typeof(field) === 'object') {
        let item = value || field;

        for (let v in item) {
          if (!item[v] || typeof item[v] !== 'object') {
            this.nestedField.push({
              title: v,
              value: item[v]
            });
          } else {
            if (!item[v].value && !item[v].type) {
              this.nestedField.push({
                title: v,
                value: null
              });
            }
            else if (item[v].length) {
              let nestedCollection = [];
              this.nestedField.push({
                title: v,
                type: 'collection',
                value: nestedCollection
              });
              for (let card of item[v]) {
                nestedCollection.push(card);
              }
            } else {
              this.nestedField.push({
                title: v,
                type: 'card',
                value: item[v],
                component: item[v].type === 'participant' ? 'cards/composer' : null //TODO
              });
            }
          }
        }
      }
    }

    // val (comp field)
    for (let v in val) {
      if (!value || (!value.length && !value[v])) {
        this.nestedField.push({
          title: v,
          value: null
        });
      }

      if (value && value.length) {
        let item = value.find(el => el.id === val.id);
        if (!item) {
          this.nestedField.push({
            title: v,
            value: null
          });
        }
      }

      if (val[v] && val[v].type === 'collection') {
        this.nestedCompField.push({
          title: v,
          type: val[v].type,
          value: val[v].tempCollection || val[v].value,
          component: val[v].component
        });
      }
      else if (val[v] && typeof(val[v]) === 'object') {
        if (val[v].length) {
          this.nestedField[this.nestedField.length - 1].type = 'collection';

          let nestedCollection = [];
          this.nestedCompField.push({
            title: v,
            type: 'collection',
            value: nestedCollection
          });
          for (let card of val[v]) {
            nestedCollection.push(card);
          }
        } else {
          this.nestedCompField.push({
            title: v,
            type: 'card',
            value: val[v],
            component: val[v].type === 'participant' ? 'cards/composer' : null //TODO
          });
        }
      } else {
        this.nestedCompField.push({
          title: v,
          value: val[v]
        });
      }
    }
  }
}
