import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/schemas/*.graphql',
  documents: 'tests/**/*.graphql',
  watch: true,
  config: {
    typesPrefix: 'T',
    strictScalars: true,
    scalars: {
      EmailAddress: 'string',
      Password: 'string',
      PostalCode: 'string',
      Latitude: 'number',
      Longitude: 'number',
      DateTime: 'Date',
      File: 'File',
    },
  },
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        contextType: '../../globals#ServerContext',
        mappers: {
          User: '../models/models#UserModel',
          Room: '../models/models#RoomModel',
          Booking: '../models/models#BookingModel',
        },
      },
    },
    'tests/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
    },
  },
};

export default config;
