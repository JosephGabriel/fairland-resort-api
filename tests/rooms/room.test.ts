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
    it('should create a room', async () => {
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

    it('should not create a room when hotel does not exist', async () => {
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
        return;
      }

      throw new Error('Should not reach this point');
    });

    it('should update a room', async () => {
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

    it('should not update a room when room does not exist', async () => {
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
        return;
      }

      throw new Error('Should not reach this point');
    });

    it('should delete a room', async () => {
      const client = getClient(adminForTest.token);

      const { data } = await client.mutate({
        mutation: DeleteRoomDocument,
        variables: {
          id: String(roomForTest.room?.id),
        },
      });

      expect(data?.deleteRoom).toBe('Quarto deletado com sucesso');
    });

    it('should not delete a room when room does not exist', async () => {
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
        return;
      }

      throw new Error('Should not reach this point');
    });
  });
});
