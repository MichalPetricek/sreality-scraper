const Client = require("pg").Client;

const client = new Client({
    user:"postgres",
    password:"Michal33",
    host:"localhost",
    port:5432,
    database:"srealityDb"
})


async function saveFlatsListToDB(flatsList) {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    const query = 'INSERT INTO flats (id, title, img) VALUES ($1, $2, $3)';

    for (let i = 0; i < flatsList.length; i++) {
      const { flatTitle, flatImg } = flatsList[i];
      const values = [i + 1, flatTitle, flatImg];
      await client.query(query, values);
    }

    console.log('Data saved successfully to the database');

  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
    console.log('Disconnected from PostgreSQL database');
  }
}

module.exports = {
  saveFlatsListToDB,
};