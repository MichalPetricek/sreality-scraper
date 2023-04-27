const express = require('express');
const { Client } = require('pg');

const app = express();

const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'srealityDb',
  password: 'Michal33',
  port: 5432,
};

app.get('/', async (req, res) => {
    const client = new Client(dbConfig);
    await client.connect();
    const result = await client.query('SELECT * FROM flats');
    const rows = result.rows;
    res.send(`
      <ul>
        ${rows.map((row) => `
          <li>
            <h3>${row.title}</h3>
            <img src="${row.img}" alt="${row.title}">
          </li>
        `).join('')}
      </ul>
    `);
    await client.end();
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
