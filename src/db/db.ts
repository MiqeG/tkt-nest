//DataBase Access

import {
  DynamoDBClient,
  DynamoDB,
  CreateTableCommandOutput,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandOutput,
  ScanCommand,
  ScanCommandOutput,
  PutCommand,
  PutCommandOutput,
  QueryCommand,
  QueryCommandOutput,
  DeleteCommand,
  DeleteCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import env from '../env';

const ddbDocClient = new DynamoDBClient({ region: env.REGION });
const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: true, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};

// Create the DynamoDB document client.
const docClient = DynamoDBDocumentClient.from(ddbDocClient, {
  marshallOptions,
  unmarshallOptions,
});

const dynamoDb = new DynamoDB({ region: env.REGION });

const dataVerificationModel = {
  name: 'name',
  sector: 'sector',
  siren: 99999999,
  ca: 1111111,
  margin: 1111111,
  ebitda: 1111111,
  loss: 1111111,
  year: 2017,
};
import params from './table_params';

export const get_entreprise = async (
  siren: number,
  year: number,
): Promise<GetCommandOutput> => {
  return await ddbDocClient.send(
    new GetCommand({
      TableName: params.TableName,
      Key: {
        siren: siren,
        year: year,
      },
    }),
  );
};
//PUT EXPECTS item to be dataVerificationModel compliant
export const put = async (item: entrepriseYear): Promise<PutCommandOutput> => {
  if (!verifyData(item, dataVerificationModel))
    throw new Error('Bad Entreprise Data Format');
  else
    return await ddbDocClient.send(
      new PutCommand({ TableName: params.TableName, Item: item }),
    );
};
export const deleteEntreprise = async (
  item: entrepriseYear,
): Promise<DeleteCommandOutput> => {
  const deleteParams = {
    TableName: params.TableName,
    Key: {
      siren: item.siren,
      year: item.year,
    },
  };
  return await ddbDocClient.send(new DeleteCommand(deleteParams));
};
export const scan = async (reqBody: object): Promise<ScanCommandOutput> => {
  const scanParams = {
    TableName: params.TableName,
    ...reqBody,
  };
  return await docClient.send(new ScanCommand(scanParams));
};
export const query = async (reqBody: object): Promise<QueryCommandOutput> => {
  const queryParams = {
    TableName: params.TableName,
    ...reqBody,
  };
  return await docClient.send(new QueryCommand(queryParams));
};
function verifyData(item: object, model: object): boolean {
  for (const key in model) {
    const verif = model[key];
    const toVerif = item[key];
    if (typeof verif != typeof toVerif) return false;
    if (typeof verif == 'object') {
      return verifyData(toVerif, verif);
    }
  }
  return true;
}
//DynamoDb Table creation : be sure to have AWS Cretentials and IAM Authorizations
export const create = async function (): Promise<CreateTableCommandOutput> {
  try {
    return await dynamoDb.createTable(params);
  } catch (error) {
    console.error('Table creation error : ', error);
  }
};
