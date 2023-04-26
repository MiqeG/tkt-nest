import data from './data';
import * as db from './db';

fillOptionsTable();
fillTable();

async function fillTable() {
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    for (let idx = 0; idx < element.results.length; idx++) {
      const result = element.results[idx];
      try {
        await db.put({
          name: element.name,
          sector: element.sector,
          siren: element.siren,
          ...result,
        });
        console.log('DONE FOR ENTRPRISE ITEM ' + element.siren);
      } catch (error) {
        console.error('ERROR FOR ENTREPRISE ITEM  : ' + element.siren, error);
      }
    }
  }
}
async function fillOptionsTable() {
  const sectors = {};
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (!sectors[element.sector]) {
      sectors[element.sector] = true;
      try {
        await db.putOption({
          sector: element.sector,
        });
        console.log('DONE FOR SECTOR ITEM ' + element.sector);
      } catch (error) {
        console.error('ERROR FOR OPTIONS ITEM  : ' + element.sector, error);
      }
    }
  }
}
