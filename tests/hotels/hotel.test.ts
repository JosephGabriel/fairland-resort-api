import {
  getClient,
  setupDatabase,
  hotelForTest,
  adminForTest,
  userForTest,
  hotelInput,
} from "../utils/index";

import {
  GetHotelByIdDocument,
  GetHotelByIdQuery,
  GetHotelByIdQueryVariables,
  GetHotelBySlugDocument,
  GetHotelBySlugQuery,
  GetHotelBySlugQueryVariables,
  GetHotelsByAdminDocument,
  GetHotelsByAdminQuery,
  GetHotelsByAdminQueryVariables,
  CreateHotelDocument,
  CreateHotelMutation,
  CreateHotelMutationVariables,
  UpdateHotelDocument,
  UpdateHotelMutation,
  UpdateHotelMutationVariables,
  DeleteHotelDocument,
  DeleteHotelMutation,
  DeleteHotelMutationVariables,
} from "../generated/graphql";

beforeEach(setupDatabase);

describe("Hotel", () => {
  describe("Mutations", () => {
    it.skip("should create an hotel", async () => {
      const client = getClient(adminForTest.token);

      const { data } = await client.mutate<
        CreateHotelMutation,
        CreateHotelMutationVariables
      >({
        mutation: CreateHotelDocument,
        variables: {
          data: hotelInput,
        },
      });

      expect(data!.createHotel.name).toBe(hotelInput.name);
    });

    it("should update an hotel", async () => {
      const client = getClient(adminForTest.token);

      const { data } = await client.mutate<
        UpdateHotelMutation,
        UpdateHotelMutationVariables
      >({
        mutation: UpdateHotelDocument,
        variables: {
          id: hotelForTest.hotel!.id,
          data: {
            name: "Hotel 2",
          },
        },
      });

      expect(data!.updateHotel.name).toBe("Hotel 2");
    });

    it("should delete an hotel", async () => {
      const client = getClient(adminForTest.token);

      const { data } = await client.mutate<
        DeleteHotelMutation,
        DeleteHotelMutationVariables
      >({
        mutation: DeleteHotelDocument,
        variables: {
          id: hotelForTest.hotel!.id,
        },
      });

      expect(data!.deleteHotel).toBe("Hotel apagado com sucesso");
    });
  });

  describe("Queries", () => {
    it("should fetch a hotel by id", async () => {
      const client = getClient();

      const { data } = await client.query<
        GetHotelByIdQuery,
        GetHotelByIdQueryVariables
      >({
        query: GetHotelByIdDocument,
        variables: {
          id: hotelForTest.hotel!.id,
        },
      });

      expect(data.hotel.id).toBe(hotelForTest.hotel!.id);
    });

    it("should not fetch a hotel when provided with invalid id", async () => {
      const client = getClient();

      try {
        await client.query<GetHotelByIdQuery, GetHotelByIdQueryVariables>({
          query: GetHotelByIdDocument,
          variables: {
            id: hotelForTest.hotel!.id,
          },
        });
      } catch (error) {
        expect(error.graphQLError[0].message).toBe("Hotel inválido");
      }
    });

    it("should fetch an hotel by an slug", async () => {
      const client = getClient();

      const { data } = await client.query<
        GetHotelBySlugQuery,
        GetHotelBySlugQueryVariables
      >({
        query: GetHotelBySlugDocument,
        variables: {
          slug: hotelForTest.hotel!.slug,
        },
      });

      expect(data.hotelBySlug.slug).toBe(hotelForTest.hotel!.slug);
    });

    it("should not fetch an hotel when provided with invalid an slug", async () => {
      const client = getClient();

      try {
        await client.query<GetHotelBySlugQuery, GetHotelBySlugQueryVariables>({
          query: GetHotelBySlugDocument,
          variables: {
            slug: hotelForTest.hotel!.slug,
          },
        });
      } catch (error) {
        expect(error.graphQLError[0].message).toBe("Hotel inválido");
      }
    });

    it("should fetch all hotels of an admin", async () => {
      const client = getClient(adminForTest.token);

      const { data } = await client.query<
        GetHotelsByAdminQuery,
        GetHotelsByAdminQueryVariables
      >({
        query: GetHotelsByAdminDocument,
      });

      expect(data.hotelsByAdmin!.length).toBe(1);
    });

    it("should not fetch hotels of an admin when it is not logged in", async () => {
      const client = getClient();

      try {
        await client.query<
          GetHotelsByAdminQuery,
          GetHotelsByAdminQueryVariables
        >({
          query: GetHotelsByAdminDocument,
        });
      } catch (error) {
        expect(error.message).toBe("Você não esta logado");
      }
    });

    it("should not fetch hotels of an admin when it is not an admin", async () => {
      const client = getClient(userForTest.token);

      try {
        await client.query<
          GetHotelsByAdminQuery,
          GetHotelsByAdminQueryVariables
        >({
          query: GetHotelsByAdminDocument,
        });
      } catch (error) {
        expect(error.message).toBe(
          "É necessário um administrador para continuar"
        );
      }
    });
  });
});
