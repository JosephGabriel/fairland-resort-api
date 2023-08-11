import {
  adminForTest,
  getClient,
  hotelForTest,
  hotelInput,
  setupDatabase,
  userForTest,
} from '../utils/index';

import {
  CreateHotelDocument,
  DeleteHotelDocument,
  GetHotelByIdDocument,
  GetHotelBySlugDocument,
  GetHotelsByAdminDocument,
  UpdateHotelDocument,
} from '../generated/graphql';

beforeEach(setupDatabase);

describe('Hotel', () => {
  describe('Mutations', () => {
    it('should create an hotel', async () => {
      const client = getClient(adminForTest.token);

      const { data } = await client.mutate({
        mutation: CreateHotelDocument,
        variables: {
          data: hotelInput,
        },
      });

      expect(data?.createHotel.name).toBe(hotelInput.name);
    });

    it('should update an hotel', async () => {
      const client = getClient(adminForTest.token);

      const { data } = await client.mutate({
        mutation: UpdateHotelDocument,
        variables: {
          id: String(hotelForTest.hotel?.id),
          data: {
            name: 'Hotel 2',
          },
        },
      });

      expect(data?.updateHotel.name).toBe('Hotel 2');
    });

    it('should delete an hotel', async () => {
      const client = getClient(adminForTest.token);

      const { data } = await client.mutate({
        mutation: DeleteHotelDocument,
        variables: {
          id: String(hotelForTest.hotel?.id),
        },
      });

      expect(data?.deleteHotel).toBe('Hotel apagado com sucesso');
    });
  });

  describe('Queries', () => {
    it('should fetch a hotel by id', async () => {
      const client = getClient();

      const { data } = await client.query({
        query: GetHotelByIdDocument,
        variables: {
          id: String(hotelForTest.hotel?.id),
        },
      });

      expect(data.hotel.id).toBe(hotelForTest.hotel?.id);
    });

    it('should not fetch a hotel when provided with invalid id', async () => {
      const client = getClient();

      try {
        await client.query({
          query: GetHotelByIdDocument,
          variables: {
            id: String(hotelForTest.hotel?.id),
          },
        });
      } catch (error) {
        expect(error.graphQLError[0].message).toBe('Hotel inválido');
      }
    });

    it('should fetch an hotel by an slug', async () => {
      const client = getClient();

      const { data } = await client.query({
        query: GetHotelBySlugDocument,
        variables: {
          slug: String(hotelForTest.hotel?.slug),
        },
      });

      expect(data.hotelBySlug.slug).toBe(hotelForTest.hotel?.slug);
    });

    it('should not fetch an hotel when provided with invalid an slug', async () => {
      const client = getClient();

      try {
        await client.query({
          query: GetHotelBySlugDocument,
          variables: {
            slug: String(hotelForTest.hotel?.slug),
          },
        });
      } catch (error) {
        expect(error.graphQLError[0].message).toBe('Hotel inválido');
      }
    });

    it('should fetch all hotels of an admin', async () => {
      const client = getClient(adminForTest.token);

      const { data } = await client.query({
        query: GetHotelsByAdminDocument,
      });

      expect(data.hotelsByAdmin?.hotels.length).toBe(1);
    });

    it('should not fetch hotels of an admin when it is not logged in', async () => {
      const client = getClient();

      try {
        await client.query({
          query: GetHotelsByAdminDocument,
        });
      } catch (error) {
        expect(error.message).toBe('Você não esta logado');
      }
    });

    it('should not fetch hotels of an admin when it is not an admin', async () => {
      const client = getClient(userForTest.token);

      try {
        await client.query({
          query: GetHotelsByAdminDocument,
        });
      } catch (error) {
        expect(error.message).toBe(
          'É necessário um administrador para continuar'
        );
      }
    });
  });
});
