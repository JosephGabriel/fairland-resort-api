import {
  getClient,
  setupDatabase,
  userForTest,
  adminForTest,
  bookingForTest,
  roomForTest,
} from '../utils';

import {
  CreateBookingMutation,
  CreateBookingDocument,
  CreateBookingMutationVariables,
  DeleteBookingDocument,
  DeleteBookingMutation,
  DeleteBookingMutationVariables,
  BookingByIdDocument,
  BookingByIdQuery,
  BookingByIdQueryVariables,
  BookingsByUserDocument,
  BookingsByUserQuery,
  BookingsByUserQueryVariables,
} from '../generated/graphql';

beforeEach(setupDatabase);

describe('Bookings', () => {
  describe('Mutations', () => {
    it('should create a booking', async () => {
      const client = getClient(userForTest.token);

      const { data } = await client.mutate<
        CreateBookingMutation,
        CreateBookingMutationVariables
      >({
        mutation: CreateBookingDocument,
        variables: {
          data: {
            room: roomForTest.room!.id,
            dateIn: bookingForTest.booking!.dateIn.toString(),
            dateOut: bookingForTest.booking!.dateOut.toString(),
            price: bookingForTest.booking!.price,
          },
        },
      });

      expect(data?.createBooking.room.id).toBe(roomForTest.room!.id);
    });

    it("should not create a booking when doesn't send token", async () => {
      const client = getClient();

      try {
        await client.mutate<
          CreateBookingMutation,
          CreateBookingMutationVariables
        >({
          mutation: CreateBookingDocument,
          variables: {
            data: {
              room: roomForTest.room!.id,
              dateIn: bookingForTest.booking!.dateIn.toString(),
              dateOut: bookingForTest.booking!.dateOut.toString(),
              price: bookingForTest.booking!.price,
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
        await client.mutate<
          CreateBookingMutation,
          CreateBookingMutationVariables
        >({
          mutation: CreateBookingDocument,
          variables: {
            data: {
              room: 'test',
              dateIn: bookingForTest.booking!.dateIn.toString(),
              dateOut: bookingForTest.booking!.dateOut.toString(),
              price: bookingForTest.booking!.price,
            },
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe('Quarto inválido');
      }
    });

    it('should cancel a booking', async () => {
      const client = getClient(userForTest.token);

      const { data } = await client.mutate<
        DeleteBookingMutation,
        DeleteBookingMutationVariables
      >({
        mutation: DeleteBookingDocument,
        variables: {
          id: bookingForTest.booking!.id,
        },
      });

      expect(data?.deleteBooking).toBe('Reserva cancelada com sucesso');
    });

    it('should not cancel a booking when passing invalid booking id', async () => {
      const client = getClient(userForTest.token);

      try {
        await client.mutate<
          DeleteBookingMutation,
          DeleteBookingMutationVariables
        >({
          mutation: DeleteBookingDocument,
          variables: {
            id: 'test',
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe('Reserva não encontrada');
      }
    });

    it("should not cancel a booking when it doesn't belong to user", async () => {
      const client = getClient(adminForTest.token);

      try {
        await client.mutate<
          DeleteBookingMutation,
          DeleteBookingMutationVariables
        >({
          mutation: DeleteBookingDocument,
          variables: {
            id: bookingForTest.booking!.id,
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

      const { data } = await client.mutate<
        BookingByIdQuery,
        BookingByIdQueryVariables
      >({
        mutation: BookingByIdDocument,
        variables: {
          id: bookingForTest.booking!.id,
        },
      });

      expect(data?.booking.id).toBe(bookingForTest.booking!.id);
    });

    it('should not fetch a booking when provided a invalid id', async () => {
      const client = getClient(userForTest.token);

      try {
        await client.mutate<BookingByIdQuery, BookingByIdQueryVariables>({
          mutation: BookingByIdDocument,
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
        await client.mutate<BookingByIdQuery, BookingByIdQueryVariables>({
          mutation: BookingByIdDocument,
          variables: {
            id: bookingForTest.booking!.id,
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe('Você não esta logado');
      }
    });

    it('should not fetch a booking when it does not belong to the user provided', async () => {
      const client = getClient(adminForTest.token);

      try {
        await client.mutate<BookingByIdQuery, BookingByIdQueryVariables>({
          mutation: BookingByIdDocument,
          variables: {
            id: bookingForTest.booking!.id,
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe('Reserva não encontrada');
      }
    });

    it('should fetch bookings of an user', async () => {
      const client = getClient(userForTest.token);

      const { data } = await client.mutate<
        BookingsByUserQuery,
        BookingsByUserQueryVariables
      >({
        mutation: BookingsByUserDocument,
      });

      expect(data?.bookings.length).toBe(1);
    });

    it('should not fetch bookings of an user when is not logged in', async () => {
      const client = getClient();

      try {
        await client.mutate<BookingsByUserQuery, BookingsByUserQueryVariables>({
          mutation: BookingsByUserDocument,
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe('Você não esta logado');
      }
    });
  });
});
