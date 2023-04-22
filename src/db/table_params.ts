export default {
  AttributeDefinitions: [
    {
      AttributeName: 'siren',
      AttributeType: 'N',
    },
    {
      AttributeName: 'name',
      AttributeType: 'S',
    },
    {
      AttributeName: 'year',
      AttributeType: 'N',
    },
    {
      AttributeName: 'sector',
      AttributeType: 'S',
    },
    {
      AttributeName: 'ca',
      AttributeType: 'N',
    },
    {
      AttributeName: 'ebitda',
      AttributeType: 'N',
    },
    {
      AttributeName: 'loss',
      AttributeType: 'N',
    },
    {
      AttributeName: 'margin',
      AttributeType: 'N',
    },
  ],
  KeySchema: [
    {
      AttributeName: 'year',
      KeyType: 'HASH',
    },
    {
      AttributeName: 'siren',
      KeyType: 'RANGE',
    },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'name-index',
      KeySchema: [
        {
          AttributeName: 'name',
          KeyType: 'HASH',
        },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
    },
    {
      IndexName: 'year-index',
      KeySchema: [
        {
          AttributeName: 'year',
          KeyType: 'HASH',
        },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
    },
    {
      IndexName: 'sector-index',
      KeySchema: [
        {
          AttributeName: 'sector',
          KeyType: 'HASH',
        },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
    },
    {
      IndexName: 'year-ca-index',
      KeySchema: [
        {
          AttributeName: 'year',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'ca',
          KeyType: 'RANGE',
        },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
    },
    {
      IndexName: 'year-margin-index',
      KeySchema: [
        {
          AttributeName: 'year',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'margin',
          KeyType: 'RANGE',
        },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
    },
    {
      IndexName: 'year-ebitda-index',
      KeySchema: [
        {
          AttributeName: 'year',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'ebitda',
          KeyType: 'RANGE',
        },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
    },
    {
      IndexName: 'year-loss-index',
      KeySchema: [
        {
          AttributeName: 'year',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'loss',
          KeyType: 'RANGE',
        },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
    },
  ],
  BillingMode: 'PAY_PER_REQUEST',
  TableName: 'tkt_entreprises',
};
