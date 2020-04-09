export default function() {
  this.namespace = 'api';
  this.resource('movies');
  this.resource('genres');
  this.resource('cast');
  this.resource('photos');
  this.resource('articles');
  this.resource('events');
  this.resource('people');
  this.resource('field-types');
}
