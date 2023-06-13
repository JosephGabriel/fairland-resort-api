import {
  getClient,
  setupDatabase,
  userForTest,
  adminForTest,
  bookingForTest,
  roomForTest,
} from "../utils";

import {
  CreateBookingMutation,
  CreateBookingDocument,
  CreateBookingMutationVariables,
  DeleteBookingDocument,
  DeleteBookingMutation,
  DeleteBookingMutationVariables,
} from "../generated/graphql";

beforeEach(setupDatabase);

describe("Bookings", () => {
  describe("Mutations", () => {
    it("should create a booking", async () => {
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
        expect(error.graphQLErrors[0].message).toBe("Você não esta logado");
      }
    });

    it("should not create a booking when send invalid room id", async () => {
      const client = getClient(userForTest.token);

      try {
        await client.mutate<
          CreateBookingMutation,
          CreateBookingMutationVariables
        >({
          mutation: CreateBookingDocument,
          variables: {
            data: {
              room: "test",
              dateIn: bookingForTest.booking!.dateIn.toString(),
              dateOut: bookingForTest.booking!.dateOut.toString(),
              price: bookingForTest.booking!.price,
            },
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe("Quarto inválido");
      }
    });

    it("should cancel a booking", async () => {
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

      expect(data?.deleteBooking).toBe("Reserva cancelada com sucesso");
    });

    it("should not cancel a booking when passing invalid booking id", async () => {
      const client = getClient(userForTest.token);

      try {
        await client.mutate<
          DeleteBookingMutation,
          DeleteBookingMutationVariables
        >({
          mutation: DeleteBookingDocument,
          variables: {
            id: "test",
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe("Reserva não encontrada");
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
        expect(error.graphQLErrors[0].message).toBe("Reserva não encontrada");
      }
    });
  });
});
