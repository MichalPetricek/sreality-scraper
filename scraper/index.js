const { scrapeFlatsList } = require('./scraper');
const { saveFlatsListToDB } = require('./db');

async function run() {
const flatsList = await scrapeFlatsList();
console.log(flatsList);
await saveFlatsListToDB(flatsList);
}

run();