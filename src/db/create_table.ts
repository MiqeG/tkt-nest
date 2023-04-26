import {
  CreateTableCommandInput,
  CreateTableCommandOutput,
} from '@aws-sdk/client-dynamodb';
import * as db from './db';
import entreprise_table_params from './table_params';
import option_table_params from './option_table_params';
start();
async function createTable(
  params: CreateTableCommandInput,
): Promise<CreateTableCommandOutput> {
  return await db.createTable(params);
}
async function start() {
  try {
    await createTable(entreprise_table_params);
    await createTable(option_table_params);
  } catch (error) {
    console.error(error);
  }
}
