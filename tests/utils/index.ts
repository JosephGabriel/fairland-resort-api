import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import { Booking, Hotel, Room, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import fetch from 'cross-fetch';

import { prisma } from '../../src/index';
import { signUpToken } from '../../src/utils/token';

interface userForTest {
  user: User | null;
  token: string;
  raw_password: string;
}

interface bookingForTest {
  booking: Booking | null;
}

interface hotelForTest {
  hotel: Hotel | null;
}

interface roomForTest {
  room: Room | null;
}

export const hotelInput = {
  name: 'Hotel Example2',
  summary: 'A luxurious hotel with excellent amenities',
  description:
    'This hotel offers spacious rooms, a swimming pool, a fitness center, and a restaurant.',
  thumbnail: 'https://example.com/thumbnail.jpg',
  images: [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
  ],
  logo: 'https://example.com/logo.jpg',
  latitude: -48.9443967,
  longitude: -22.346439,
  address: '123 Main Street',
  zipCode: '12345',
  addressNumber: 'Apt 101',
  neighborhood: 'Qualquer',
  state: 'Qualquer',
  city: 'Qualquer',
};

export const roomInput = {
  name: 'Standard Room',
  summary: 'A comfortable room with essential amenities',
  thumbnail: 'https://example.com/thumbnail.jpg',
  description:
    'This room includes a queen-size bed, a private bathroom, and complimentary Wi-Fi.',
  images: [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
  ],
  price: 100.0,
};

export const getClient = (authHeader?: string) =>
  authHeader
    ? new ApolloClient({
        link: new HttpLink({
          headers: {
            authorization: `Bearer ${authHeader}`,
          },
          uri: `http://localhost:${process.env.PORT}/graphql`,
          fetch,
        }),
        cache: new InMemoryCache(),
      })
    : new ApolloClient({
        link: new HttpLink({
          uri: `http://localhost:${process.env.PORT}/graphql`,
          fetch,
        }),
        cache: new InMemoryCache(),
      });

export const userForTest: userForTest = {
  user: null,
  token: '',
  raw_password: 'Aknckri44!',
};

export const adminForTest: userForTest = {
  user: null,
  token: '',
  raw_password: 'Aknckri44!',
};

export const hotelForTest: hotelForTest = {
  hotel: null,
};

export const roomForTest: roomForTest = {
  room: null,
};

export const bookingForTest: bookingForTest = {
  booking: null,
};

export const setupDatabase = async () => {
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.room.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.user.deleteMany();

  const passwordHashed = await bcrypt.hash(userForTest.raw_password, 10);

  const user = await prisma.user.create({
    data: {
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'Test',
      userName: 'Test',
      active: true,
      verified: false,
      role: 'USER',
      password: passwordHashed,
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'test3@test.com',
      firstName: 'Test3',
      lastName: 'Test3',
      userName: 'Test3',
      active: true,
      verified: true,
      role: 'ADMIN',
      password: passwordHashed,
    },
  });

  const hotel = await prisma.hotel.create({
    data: {
      name: 'Hotel Example',
      rating: 4,
      summary: 'A luxurious hotel with excellent amenities',
      description:
        'This hotel offers spacious rooms, a swimming pool, a fitness center, and a restaurant.',
      thumbnail: 'https://example.com/thumbnail.jpg',
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg',
      ],
      logo: 'https://example.com/logo.jpg',
      slug: 'hotel-example',
      latitude: 123.456789,
      longitude: -98.7654321,
      address: '123 Main Street',
      zipCode: '12345',
      addressNumber: 'Apt 101',
      city: 'Main city',
      neighborhood: 'Main city',
      state: 'Main city',
      admin: {
        connect: {
          id: admin.id,
        },
      },
    },
  });

  const room = await prisma.room.create({
    data: {
      ...roomInput,
      rating: 4.0,
      hotel: {
        connect: {
          id: hotel.id,
        },
      },
    },
  });

  const booking = await prisma.booking.create({
    data: {
      price: 100.0,
      paid: true,
      bookingDate: new Date(Date.now()),
      dateIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      dateOut: new Date(Date.now() + 2000 * 60 * 60 * 24 * 7),
      user: {
        connect: {
          id: user.id,
        },
      },
      room: {
        connect: {
          id: room.id,
        },
      },
    },
  });

  userForTest.user = user;
  userForTest.token = await signUpToken(user.id);

  adminForTest.user = admin;
  adminForTest.token = await signUpToken(admin.id);

  hotelForTest.hotel = hotel;
  roomForTest.room = room;
  bookingForTest.booking = booking;
};
