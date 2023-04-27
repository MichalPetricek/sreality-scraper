const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'srealityDb',
  password: 'Michal33',
  port: 5432,
});

client.connect();

(async () => {
  try {
    await client.query('DELETE FROM flats');
    console.log('All data deleted successfully from the flats table!');
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
})();