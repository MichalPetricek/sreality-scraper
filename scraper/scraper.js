const puppeteer = require('puppeteer');

const url = "https://www.sreality.cz/hledani/prodej/byty";

async function scrapeFlatsList() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp"
  });
  let page = await browser.newPage();
  await page.goto(url);
  let flatsList = [];
  let flatTitle;
  let flatImg;
  while(flatsList.length < 500){
    let flats = await page.$$('.property.ng-scope');
    for(const flat of flats){
        try {
            flatTitle = await page.evaluate(
                el => el.querySelector(" div > div > span > h2 > a > span").textContent, flat) 
        } catch (error) {}
        try {
            flatImg = await page.evaluate(
                el => el.querySelector("preact > div > div > a:nth-child(1) > img").getAttribute("src"), flat)
        } catch (error) {}
        if(flatTitle != null){
            flatsList.push({flatTitle,flatImg});
        }
    }
    await page.waitForSelector(".paging-next");
    await page.click(".paging-next");
    await page.waitForSelector('.property.ng-scope');
  }
  await browser.close();
  return(flatsList);
}

module.exports = {
  scrapeFlatsList,
};