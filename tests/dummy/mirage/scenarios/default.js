export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // server.createList('article', 10);
  // server.createList('event', 10);
  server.loadFixtures();
}