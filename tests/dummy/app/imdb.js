export default {
  movies: [
    {
      id: "star-trek-picard",
      title: { value: "Star Trek: Picard" },
      type: { value: "TV Series" },
      year: { value: 2020 },
      poster: { type: "image", value: "star-trek-picard@2x.png" },
    },
    {
      id: "star-trek-tng",
      title: { value: "Star Trek: TNG" },
      type: { value: "TV Series" },
      year: { value: 1987 },
      poster: { type: "image", value: "star-trek@2x.png" },
    },
    {
      id: "star-wars-the-clone-wars",
      title: { value: "Star Wars: The Clone Wars" },
      type: { value: "TV Series" },
      year: { value: 2008 },
      poster: { type: "image", value: "star-wars-clone@2x.png" },
    },
    {
      id: "star-wars-the-rise-of-skywalker",
      title: { value: "Star Wars: The Rise of Skywalker" },
      year: { type: "numeric", value: 2019 },
      poster: {
        type: "image",
        value: "star-wars-poster-main@2x.png",
        width: 230,
        height: 340,
        altText: "Star Wars: The Rise of Skywalker poster",
        title: "US Poster",
        created: "May 5, 2019",
      },
      avgUserRating: { type: "numeric", value: 6.8 },
      mpaaRating: {
        type: "dropdown",
        value: "PG-13",
        options: [
          { value: "G" },
          { value: "PG" },
          { value: "PG-13" },
          { value: "R" },
          { value: "NC-17" },
        ],
      },
      runTime: { type: "time", hours: 2, minutes: 22 },
      releaseDate: { type: "date", value: 20191220 },
      genres: {
        isCollection: true,
        type: "genres",
        relationshipIds: ["action", "adventure", "fantasy"],
      },
      description: {
        type: "textarea",
        value:
          "The surviving members of the resistance face the First Order once again, and the legendary conflict between the Jedi and the Sith reaches its peak bringing the Skywalker saga to its end.",
      },
      cast: {
        isCollection: true,
        type: "actors",
        relationshipIds: [
          "carrie-fisher",
          "mark-hamill",
          "daisy-ridley",
          "adam-driver",
        ],
      },
      photos: {
        isCollection: true,
        type: "photos",
        relationshipIds: ["sw1", "sw2", "sw3", "sw4"],
      },
    },
    {
      id: "stargate",
      title: { value: "Stargate" },
      year: { value: 1994 },
      poster: { type: "image", value: "stargate@2x.png" },
    },
    {
      id: "starship-troopers",
      title: { value: "Starship Troopers" },
      year: { value: 1997 },
      poster: { type: "image", value: "starship-troopers@2x.png" },
    },
    {
      id: "starman",
      title: { value: "Starman" },
      year: { value: 1984 },
      poster: { type: "image", value: "starman@2x.png" },
    },
    {
      id: "dark-star",
      title: { value: "Dark Star" },
      year: { value: 1974 },
      poster: { type: "image", value: "dark-star@2x.png" },
    },
  ],
  genres: [
    { id: "action", title: "Action" },
    { id: "adventure", title: "Adventure" },
    { id: "fantasy", title: "Fantasy" },
  ],
  actors: [
    {
      id: "carrie-fisher",
      firstName: "Carrie",
      lastName: "Fisher",
      role: "Leia Organa",
      profile: "leia.png",
    },
    {
      id: "mark-hamill",
      firstName: "Mark",
      lastName: "Hamill",
      role: "Luke Skywalker",
      profile: "luke.png",
    },
    {
      id: "daisy-ridley",
      firstName: "Daisy",
      lastName: "Ridley",
      role: "Rey",
      profile: "rey.png",
    },
    {
      id: "adam-driver",
      firstName: "Adam",
      lastName: "Driver",
      role: "Kylo Ren",
      profile: "kylo-ren.png",
    },
  ],
  photos: [
    { type: "image", id: "sw1", src: "sw1.png" },
    { type: "image", id: "sw2", src: "sw2.png" },
    { type: "image", id: "sw3", src: "sw3.png" },
    { type: "image", id: "sw4", src: "sw4.png" },
  ],
};
