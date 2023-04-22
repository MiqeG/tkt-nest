import data from './data';
import * as db from './db';

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
        console.log('DONE FOR ITEM ' + element.siren);
      } catch (error) {
        console.error('ERROR FOR ITEM SIREN : ' + element.siren, error);
      }
    }
  }
}
