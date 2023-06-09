//DataBase Access

import {
  DynamoDBClient,
  DynamoDB,
  CreateTableCommandOutput,
  BatchWriteItemCommand,
  BatchWriteItemCommandOutput,
  CreateTableCommandInput,
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
  UpdateCommandOutput,
  UpdateCommand,
  ScanCommandInput,
} from '@aws-sdk/lib-dynamodb';

import parse_dynamo_item from './parse_dynamo_item';
import entrepriseTableParams from './table_params';
import option_table_params from './option_table_params';

const ddbDocClient = new DynamoDBClient({ region: process.env.REGION });
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

const dynamoDb = new DynamoDB({ region: process.env.REGION });

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

export const get_entreprise = async (
  siren: number,
  year: number,
): Promise<GetCommandOutput> => {
  return await ddbDocClient.send(
    new GetCommand({
      TableName: entrepriseTableParams.TableName,
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
      new PutCommand({
        TableName: entrepriseTableParams.TableName,
        Item: item,
      }),
    );
};
export const putOption = async (
  item: sectorOption,
): Promise<PutCommandOutput> => {
  if (!verifyData(item, { sector: 'test' }))
    throw new Error('Bad Option Data Format');
  else
    return await ddbDocClient.send(
      new PutCommand({
        TableName: option_table_params.TableName,
        Item: item,
      }),
    );
};
export const deleteEntreprise = async (
  item: entrepriseYear,
): Promise<DeleteCommandOutput> => {
  const deleteParams = {
    TableName: entrepriseTableParams.TableName,
    Key: {
      siren: item.siren,
      year: item.year,
    },
  };
  return await ddbDocClient.send(new DeleteCommand(deleteParams));
};
export const scan = async (reqBody: object): Promise<ScanCommandOutput> => {
  const scanParams = {
    TableName: entrepriseTableParams.TableName,
    ...reqBody,
  };
  return scanner(scanParams);
};
export const scanOptions = async (): Promise<ScanCommandOutput> => {
  const scanParams = {
    TableName: option_table_params.TableName,
  };
  return scanner(scanParams);
};
async function scanner(
  scanParams: ScanCommandInput,
): Promise<ScanCommandOutput> {
  return await docClient.send(new ScanCommand(scanParams));
}
export const query = async (reqBody: object): Promise<QueryCommandOutput> => {
  const queryParams = {
    TableName: entrepriseTableParams.TableName,
    ...reqBody,
  };
  return await docClient.send(new QueryCommand(queryParams));
};
export const updateEntreprise = async (
  reqBody: entrepriseYear,
): Promise<UpdateCommandOutput> => {
  const updParams = {
    TableName: entrepriseTableParams.TableName,
    Key: {
      siren: reqBody.siren,
      year: reqBody.year,
    },
    UpdateExpression:
      'SET #ca = :ca , #margin = :margin , #loss = :loss , #ebitda = :ebitda , #sector = :sector , #name = :name  ',
    ExpressionAttributeNames: {
      '#ca': 'ca',
      '#margin': 'margin',
      '#loss': 'loss',
      '#ebitda': 'ebitda',
      '#sector': 'sector',
      '#name': 'name',
    },
    ExpressionAttributeValues: {
      ':ca': reqBody.ca,
      ':margin': reqBody.margin,
      ':loss': reqBody.loss,
      ':ebitda': reqBody.ebitda,
      ':sector': reqBody.sector,
      ':name': reqBody.name,
    },
  };
  return await docClient.send(new UpdateCommand(updParams));
};
export const batchWtrite = async (
  reqBody: batchRequest,
): Promise<BatchWriteItemCommandOutput> => {
  const input = {
    // BatchWriteItemInput
    RequestItems: {
      // BatchWriteItemRequestMap // required
      [entrepriseTableParams.TableName]: [
        // WriteRequests
      ],
    },
    ReturnConsumedCapacity: 'INDEXES' || 'TOTAL' || 'NONE',
    ReturnItemCollectionMetrics: 'SIZE' || 'NONE',
  };
  if (reqBody.Items.length > 25) throw { code: 'too_many_items' };
  if (!reqBody.Items.length) throw { code: 'no_items' };
  reqBody.Items.forEach((item: entrepriseYear) => {
    if (reqBody.put) {
      if (!verifyData(item, dataVerificationModel))
        throw { code: 'bat_item', item: item };
      const putRequest = {
        // WriteRequest
        PutRequest: {
          // PutRequest
          Item: parse_dynamo_item(item).M,
        },
      };
      input.RequestItems[entrepriseTableParams.TableName].push(putRequest);
    } else if (reqBody.delete) {
      const deleteRequest = {
        // WriteRequest
        DeleteRequest: {
          Key: parse_dynamo_item(item).M,
        },
      };
      input.RequestItems[entrepriseTableParams.TableName].push(deleteRequest);
    }
  });
  const command = new BatchWriteItemCommand(input);
  return await docClient.send(command);
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
export const createTable = async function (
  tableParams: CreateTableCommandInput,
): Promise<CreateTableCommandOutput> {
  try {
    return await dynamoDb.createTable(tableParams);
  } catch (error) {
    console.error('Table creation error : ', error);
  }
};
