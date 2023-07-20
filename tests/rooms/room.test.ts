import {
  adminForTest,
  getClient,
  hotelForTest,
  roomForTest,
  roomInput,
  setupDatabase,
} from '../utils';

import {
  CreateRoomDocument,
  UpdateRoomDocument,
  DeleteRoomDocument,
} from '../generated/graphql';

beforeEach(setupDatabase);

describe('Rooms', () => {
  describe('Mutations', () => {
    test('should create a room', async () => {
      const client = getClient(adminForTest.token);

      const { data } = await client.mutate({
        mutation: CreateRoomDocument,
        variables: {
          data: {
            ...roomInput,
            hotel: String(hotelForTest.hotel?.id),
          },
        },
      });

      expect(data?.createRoom.name).toBe(roomInput.name);
    });

    test('should not create a room when hotel does not exist', async () => {
      const client = getClient(adminForTest.token);

      try {
        await client.mutate({
          mutation: CreateRoomDocument,
          variables: {
            data: {
              ...roomInput,
              hotel: 'invalid-hotel-id',
            },
          },
        });
      } catch (error) {
        expect(error.message).toBe('Hotel inválido');
      }

      throw new Error('Should not reach this point');
    });

    test('should update a room', async () => {
      const client = getClient(adminForTest.token);

      const { data } = await client.mutate({
        mutation: UpdateRoomDocument,
        variables: {
          id: String(roomForTest.room?.id),
          data: {
            name: 'Teste',
          },
        },
      });

      expect(data?.updateRoom.name).toBe('Teste');
    });

    test('should not update a room when room does not exist', async () => {
      const client = getClient(adminForTest.token);

      try {
        await client.mutate({
          mutation: UpdateRoomDocument,
          variables: {
            id: 'invalid-room-id',
            data: {
              name: 'Teste',
            },
          },
        });
      } catch (error) {
        expect(error.message).toBe('Quarto inválido');
      }

      throw new Error('Should not reach this point');
    });

    test('should delete a room', async () => {
      const client = getClient(adminForTest.token);

      const { data } = await client.mutate({
        mutation: DeleteRoomDocument,
        variables: {
          id: String(roomForTest.room?.id),
        },
      });

      expect(data?.deleteRoom).toBe('Quarto deletado com sucesso');
    });

    test('should not delete a room when room does not exist', async () => {
      const client = getClient(adminForTest.token);

      try {
        await client.mutate({
          mutation: DeleteRoomDocument,
          variables: {
            id: 'invalid-room-id',
          },
        });
      } catch (error) {
        expect(error.message).toBe('Quarto inválido');
      }

      throw new Error('Should not reach this point');
    });
  });
});
