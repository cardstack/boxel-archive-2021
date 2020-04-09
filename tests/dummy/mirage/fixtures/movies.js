export default [
  {
    id: 'star-trek-picard',
    title: { value: 'Star Trek: Picard' },
    type: { value: 'TV Series' },
    year: { value: 2020 },
    poster: { type: 'image', value: 'star-trek-picard@2x.png' },
  },
  {
    id: 'star-trek-tng',
    title: { value: 'Star Trek: TNG'},
    type: { value: 'TV Series' },
    year: { value: 1987 },
    poster: { type: 'image', value: 'star-trek@2x.png' },
  },
  {
    id: 'star-wars-the-clone-wars',
    title: { value: 'Star Wars: The Clone Wars' },
    type: { value: 'TV Series' },
    year: { value: 2008 },
    poster: { type: 'image', value: 'star-wars-clone@2x.png' },
  },
  {
    id: 'star-wars-the-rise-of-skywalker',
    title: { value: 'Star Wars: The Rise of Skywalker' },
    poster: { type: 'image', value: 'star-wars-poster-main@2x.png', width: 230, height: 340, altText: 'Star Wars: The Rise of Skywalker poster' },
    avgUserRating: { type: 'numeric', value: 6.8 },
    mpaaRating: { type: 'dropdown', value: 'PG-13', options: [ { value: 'G' }, { value: 'PG' }, { value: 'PG-13' }, { value: 'R' }, { value: 'NC-17' } ] },
    runTime: { type: 'time', hours: 2, minutes: 22 },
    releaseDate: { type: 'date', value: 20191220 },
    year: { type: 'numeric', value: 2019 },
    description: { type: 'textarea', value: 'The surviving members of the resistance face the First Order once again, and the legendary conflict between the Jedi and the Sith reaches its peak bringing the Skywalker saga to its end.'},
    genres: { type: 'collection', collectionType: 'list', value: [ 'Action', 'Adventure', 'Fantasy' ]},
  },
  {
    id: 'stargate',
    title: { value: 'Stargate' },
    year: { value: 1994 },
    poster: { type: 'image', value: 'stargate@2x.png' },
  },
  {
    id: 'starship-troopers',
    title: { value: 'Starship Troopers' },
    year: { value: 1997 },
    poster: { type: 'image', value: 'starship-troopers@2x.png' },
  },
  {
    id: 'starman',
    title: { value: 'Starman' },
    year: { value: 1984 },
    poster: { type: 'image', value: 'starman@2x.png' },
  },
  {
    id: 'dark-star',
    title: { value: 'Dark Star' },
    year: { value: 1974 },
    poster: { type: 'image', value: 'dark-star@2x.png' },
  }
]
