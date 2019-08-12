import Service from '@ember/service';
// import { A } from '@ember/array';

// const DEFAULT_PLANES = [
//   'ground',
//   'tools'
// ];

export default Service.extend({
  boxels: null,
  planes: null,

  init() {
    this._super(...arguments);
    this.set('boxels', {});
    this.set('planes', {});
  },

  getBoxelById(boxelId) {
    return this.boxels[boxelId];
  },

  moveBoxelToPlane(boxelId, planeId) {
    let boxel = this.getBoxelById(boxelId);

    boxel.sendAction('moveToPlane', planeId);
  },

  registerPlane(plane) {
    this.planes[plane.name] = plane;
  },

  registerBoxel(boxel) {
    this.boxels[boxel.elementId] = boxel;
  }
});