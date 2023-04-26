export default {
  AttributeDefinitions: [
    {
      AttributeName: 'sector',
      AttributeType: 'S',
    },
  ],
  KeySchema: [
    {
      AttributeName: 'sector',
      KeyType: 'HASH',
    },
  ],
  BillingMode: 'PAY_PER_REQUEST',
  TableName: 'tkt_options',
};
