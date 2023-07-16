import {
  getClient,
  setupDatabase,
  userForTest,
  adminForTest,
  bookingForTest,
  roomForTest,
} from '../utils';

import {
  CreateBookingDocument,
  DeleteBookingDocument,
  GetBookingByIdDocument,
  GetBookingsByUserDocument,
} from '../generated/graphql';

beforeEach(setupDatabase);

describe('Bookings', () => {
  describe('Mutations', () => {
    it('should create a booking', async () => {
      const client = getClient(userForTest.token);

      const { data } = await client.mutate({
        mutation: CreateBookingDocument,
        variables: {
          data: {
            room: String(roomForTest.room?.id),
            dateIn: String(bookingForTest.booking?.dateIn),
            dateOut: String(bookingForTest.booking?.dateOut),
            price: Number(bookingForTest.booking?.price),
          },
        },
      });

      expect(data?.createBooking.room.id).toBe(roomForTest.room?.id);
    });

    it('should not create a booking when does not send token', async () => {
      const client = getClient();

      try {
        await client.mutate({
          mutation: CreateBookingDocument,
          variables: {
            data: {
              room: String(roomForTest.room?.id),
              dateIn: String(bookingForTest.booking?.dateIn),
              dateOut: String(bookingForTest.booking?.dateOut),
              price: Number(bookingForTest.booking?.price),
            },
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe('Você não esta logado');
      }
    });

    it('should not create a booking when send invalid room id', async () => {
      const client = getClient(userForTest.token);

      try {
        await client.mutate({
          mutation: CreateBookingDocument,
          variables: {
            data: {
              room: 'test',
              dateIn: String(bookingForTest.booking?.dateIn),
              dateOut: String(bookingForTest.booking?.dateOut),
              price: Number(bookingForTest.booking?.price),
            },
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe('Quarto inválido');
      }
    });

    it('should cancel a booking', async () => {
      const client = getClient(userForTest.token);

      const { data } = await client.mutate({
        mutation: DeleteBookingDocument,
        variables: {
          id: String(bookingForTest.booking?.id),
        },
      });

      expect(data?.deleteBooking).toBe('Reserva cancelada com sucesso');
    });

    it('should not cancel a booking when passing invalid booking id', async () => {
      const client = getClient(userForTest.token);

      try {
        await client.mutate({
          mutation: DeleteBookingDocument,
          variables: {
            id: 'test',
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe('Reserva não encontrada');
      }
    });

    it('should not cancel a booking when it does not belong to user', async () => {
      const client = getClient(adminForTest.token);

      try {
        await client.mutate({
          mutation: DeleteBookingDocument,
          variables: {
            id: String(bookingForTest.booking?.id),
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe('Reserva não encontrada');
      }
    });
  });
  describe('Queries', () => {
    it('should fetch a booking', async () => {
      const client = getClient(userForTest.token);

      const { data } = await client.mutate({
        mutation: GetBookingByIdDocument,
        variables: {
          id: String(bookingForTest.booking?.id),
        },
      });

      expect(data?.booking.id).toBe(bookingForTest.booking?.id);
    });

    it('should not fetch a booking when provided a invalid id', async () => {
      const client = getClient(userForTest.token);

      try {
        await client.mutate({
          mutation: GetBookingByIdDocument,
          variables: {
            id: 'cdcrcko',
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe('Reserva não encontrada');
      }
    });

    it('should not fetch a booking when the user is not logged in', async () => {
      const client = getClient();

      try {
        await client.mutate({
          mutation: GetBookingByIdDocument,
          variables: {
            id: String(bookingForTest.booking?.id),
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe('Você não esta logado');
      }
    });

    it('should not fetch a booking when it does not belong to the user provided', async () => {
      const client = getClient(adminForTest.token);

      try {
        await client.mutate({
          mutation: GetBookingByIdDocument,
          variables: {
            id: String(bookingForTest.booking?.id),
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe('Reserva não encontrada');
      }
    });

    it('should fetch bookings of an user', async () => {
      const client = getClient(userForTest.token);

      const { data } = await client.mutate({
        mutation: GetBookingsByUserDocument,
      });

      expect(data?.bookings.length).toBe(1);
    });

    it('should not fetch bookings of an user when is not logged in', async () => {
      const client = getClient();

      try {
        await client.mutate({
          mutation: GetBookingsByUserDocument,
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe('Você não esta logado');
      }
    });
  });
});
