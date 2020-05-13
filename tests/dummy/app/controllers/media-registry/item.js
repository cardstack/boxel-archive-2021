import Controller from '@ember/controller';

export default class MediaRegistryItemController extends Controller {
  recordingFieldNames = [
    "song_title",
    "artist",
    "album",
    "type_of_album",
    "genre",
    "length",
    "owner",
  ];

  get recordingFields() {
    return this.recordingFieldNames.map(field => {
      return {
        title: field,
        value: this.model[field] || 'n/a'
      }
    });
  }
}
