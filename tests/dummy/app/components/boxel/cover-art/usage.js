import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';

import LovetheLoveThumb from 'dummy/images/media-registry/covers/thumb/Love-the-Love.jpg';
import HomeIsntSweetThumb from 'dummy/images/media-registry/covers/thumb/Home-Isnt-Sweet.jpg';
import NeverLonelyThumb from 'dummy/images/media-registry/covers/thumb/Never-Lonely.jpg';
import OntheBrinkofHappinessThumb from 'dummy/images/media-registry/covers/thumb/On-the-Brink-of-Happiness.jpg';
import ZigandZagThumb from 'dummy/images/media-registry/covers/thumb/Zig-and-Zag.jpg';
import AllAbouttheQualityofLifeThumb from 'dummy/images/media-registry/covers/thumb/All-About-the-Quality-of-Life.jpg';
import LoveConquersAllThumb from 'dummy/images/media-registry/covers/thumb/Love-Conquers-All.jpg';
import MakeMagicThumb from 'dummy/images/media-registry/covers/thumb/Make-Magic.jpg';
import GoodTimesThumb from 'dummy/images/media-registry/covers/thumb/Good-Times.jpg';
import MoreThanWeKnowThumb from 'dummy/images/media-registry/covers/thumb/More-Than-We-Know.jpg';
export default class extends Component {
  @tracked size = 80;
  @tracked maxWidth = 190;
  @tracked coverThumbs = A([
    LovetheLoveThumb,
    HomeIsntSweetThumb,
    NeverLonelyThumb,
    OntheBrinkofHappinessThumb,
    ZigandZagThumb,
    AllAbouttheQualityofLifeThumb,
    LoveConquersAllThumb,
    MakeMagicThumb,
    GoodTimesThumb,
    MoreThanWeKnowThumb,
  ]);

  @action updateCoverThumbs(covers) {
    this.coverThumbs = covers;
  }
}
