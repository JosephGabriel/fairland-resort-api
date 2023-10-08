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
      EmailAddress: String,
      Password: String,
      PostalCode: String,
      Latitude: Number,
      Longitude: Number,
      DateTime: Date,
    },
  },
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        noExport: true,
        useIndexSignature: true,
        contextType: '../index#ServerContext',
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
