import Route from '@ember/routing/route';
import { fetchCollection } from 'dummy/media';
import { formatId } from '@cardstack/boxel/utils/format-id';

export default class MediaRegistryProductsAlbumRoute extends Route {
  async model({ albumId }) {
    const tracks = await fetchCollection('all_tracks_combined');
    const albumTracks = tracks.filter(el => formatId(el.album) === albumId);
    let album = albumTracks[0];
    album.tracks = albumTracks;
    return album;
  }
}
