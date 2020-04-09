export default [
  {
    id: 'star-trek-picard',
    title: { value: 'Star Trek: Picard' },
    type: { value: 'TV Series' },
    year: { value: 2020 },
  },
  {
    id: 'star-trek-tng',
    title: { value: 'Star Trek: TNG'},
    type: { value: 'TV Series' },
    year: { value: 1987 },
  },
  {
    id: 'star-wars-the-clone-wars',
    title: { value: 'Star Wars: The Clone Wars' },
    type: { value: 'TV Series' },
    year: { value: 2008 },
  },
  {
    id: 'star-wars-the-rise-of-skywalker',
    title: { value: 'Star Wars: The Rise of Skywalker' },
    avgUserRating: { type: 'numeric', value: 6.8 },
    mpaaRating: { type: 'dropdown', value: 'PG-13' },
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
  },
  {
    id: 'starship-troopers',
    title: { value: 'Starship Troopers' },
    year: { value: 1997 },
  },
  {
    id: 'starman',
    title: { value: 'Starman' },
    year: { value: 1984 },
  },
  {
    id: 'dark-star',
    title: { value: 'Dark Star' },
    year: { value: 1974 },
  }
]
