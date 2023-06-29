import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  EmailAddress: string;
  Latitude: number;
  Longitude: number;
  Password: string;
  PostalCode: string;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type Booking = {
  __typename?: 'Booking';
  /** Data em qua a reserva foi feita */
  bookingDate: Scalars['String'];
  /** Data de entrada da reserva */
  dateIn: Scalars['String'];
  /** Data de saida da reserva */
  dateOut: Scalars['String'];
  /** Id da reserva */
  id: Scalars['ID'];
  /** Booleano que mostra se foi pago ou não */
  paid: Scalars['Boolean'];
  /** Preço da reserva */
  price: Scalars['Float'];
  /** Quarto reservado */
  room: Room;
  /** Usuário que fez a reserva */
  user: User;
};

export type CreateBookingInput = {
  dateIn: Scalars['String'];
  dateOut: Scalars['String'];
  price: Scalars['Float'];
  room: Scalars['ID'];
};

export type CreateHotelInput = {
  address: Scalars['String'];
  addressNumber: Scalars['String'];
  description: Scalars['String'];
  images?: InputMaybe<Array<Scalars['String']>>;
  latitude: Scalars['Latitude'];
  logo: Scalars['String'];
  longitude: Scalars['Longitude'];
  name: Scalars['String'];
  summary: Scalars['String'];
  thumbnail: Scalars['String'];
  zipCode: Scalars['PostalCode'];
};

export type CreateRoomInput = {
  description: Scalars['String'];
  hotel: Scalars['ID'];
  images?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  price: Scalars['Float'];
  summary: Scalars['String'];
  thumbnail: Scalars['String'];
};

export type CreateUserInput = {
  avatar?: InputMaybe<Scalars['String']>;
  email: Scalars['EmailAddress'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['Password'];
  passwordConfirm: Scalars['Password'];
  userName: Scalars['String'];
};

export type Hotel = {
  __typename?: 'Hotel';
  /** Endereço do hotel */
  address?: Maybe<Scalars['String']>;
  /** Número residencial do hotel */
  addressNumber?: Maybe<Scalars['String']>;
  /** A descrição do hotel */
  description: Scalars['String'];
  /** Id do hotel */
  id: Scalars['ID'];
  /** Um array de url's de imagens de hoteis */
  images?: Maybe<Array<Scalars['String']>>;
  /** Latitude do hotel */
  latitude?: Maybe<Scalars['Latitude']>;
  /** Url da logo do hotel */
  logo: Scalars['String'];
  /** Longitude do hotel */
  longitude?: Maybe<Scalars['Longitude']>;
  /** Nome do hotel */
  name: Scalars['String'];
  /** Classificação do hotel ex: 5 estrelas */
  rating?: Maybe<Scalars['Int']>;
  /** Array com os quartos do hotel */
  rooms?: Maybe<Array<Room>>;
  /** Slug do hotel baseado no nome */
  slug: Scalars['String'];
  /** Uma pequena descrição do hotel de 10 as 30 palavras */
  summary: Scalars['String'];
  /** Thumbnail a ser exibida do hotel */
  thumbnail: Scalars['String'];
  /** Cep do hotel */
  zipCode?: Maybe<Scalars['PostalCode']>;
};

export type LoginUserInput = {
  email: Scalars['EmailAddress'];
  password: Scalars['Password'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Usada para criar um admin */
  createAdmin: AuthPayload;
  /** Usada para fazer uma reserva */
  createBooking: Booking;
  /** Usada para criar um hotel */
  createHotel: Hotel;
  /** Usada para criar um quarto de hotel */
  createRoom: Room;
  /** Usada para criar um usuário */
  createUser: AuthPayload;
  /** Usada para que o próprio usuário possa desativar a conta, mas não apagá-la */
  deactivateUser: Scalars['String'];
  /** Usada para cancelar uma reserva */
  deleteBooking: Scalars['String'];
  /** Usada para apagar um hotel */
  deleteHotel: Scalars['String'];
  /** Usada para deletar um quarto de hotel */
  deleteRoom: Scalars['String'];
  /** Usada para fazer login */
  loginUser: AuthPayload;
  /** Usada para atualizar um hotel */
  updateHotel: Hotel;
  /** Usada para atualizar um quarto de hotel */
  updateRoom: Room;
  /** Usada para atualizar informações não sensiveis (ex: senhas) */
  updateUser: AuthPayload;
  /** Usada para alterar a senha do usuário */
  updateUserPassword: AuthPayload;
  /** Usada para verificar um usuário */
  verifyUser: AuthPayload;
};


export type MutationCreateAdminArgs = {
  data: CreateUserInput;
};


export type MutationCreateBookingArgs = {
  data: CreateBookingInput;
};


export type MutationCreateHotelArgs = {
  data: CreateHotelInput;
};


export type MutationCreateRoomArgs = {
  data: CreateRoomInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteBookingArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteHotelArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteRoomArgs = {
  id: Scalars['ID'];
};


export type MutationLoginUserArgs = {
  data: LoginUserInput;
};


export type MutationUpdateHotelArgs = {
  data: UpdateHotelInput;
  id: Scalars['ID'];
};


export type MutationUpdateRoomArgs = {
  data: UpdateRoomInput;
  id: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};


export type MutationUpdateUserPasswordArgs = {
  data: UpdateUserPasswordInput;
};

export type Query = {
  __typename?: 'Query';
  /** Usada para buscar uma reserva pelo id */
  booking: Booking;
  /** Usada para buscar reservas de um usuário */
  bookings: Array<Booking>;
  /** Usada para buscar um hotel pelo id */
  hotel: Hotel;
  /** Usada para buscar um hotel pelo slug */
  hotelBySlug: Hotel;
  /** Usada para buscar hotéis */
  hotels?: Maybe<Array<Hotel>>;
  /** Usada para buscar um hotel pelo slug */
  hotelsByAdmin?: Maybe<Array<Hotel>>;
  /** Usada para buscar um quarto pelo id */
  room: Room;
  /** Usada para buscar um hotel pelo slug */
  rooms?: Maybe<Array<Room>>;
  /** Usada para buscar um hotel pelo id do hotel */
  roomsByHotel?: Maybe<Array<Room>>;
};


export type QueryBookingArgs = {
  id: Scalars['ID'];
};


export type QueryHotelArgs = {
  id: Scalars['ID'];
};


export type QueryHotelBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryRoomArgs = {
  id: Scalars['ID'];
};


export type QueryRoomsArgs = {
  filter?: InputMaybe<RoomFilter>;
};


export type QueryRoomsByHotelArgs = {
  hotel: Scalars['ID'];
};

export type Review = {
  __typename?: 'Review';
  /** Id da review */
  id: Scalars['ID'];
  /** Classificação da review */
  rating: Scalars['Int'];
  /** Texto da review */
  review: Scalars['String'];
  /** Quarto que recebeu a review */
  room: Room;
  /** Usuário que fez a review */
  user: User;
};

export type Room = {
  __typename?: 'Room';
  /** Uma descrição do quarto */
  description: Scalars['String'];
  /** Hotel a qual o quarto pertence */
  hotel: Hotel;
  /** Id do quarto */
  id: Scalars['ID'];
  /** Um array de url's de imagens do quarto */
  images?: Maybe<Array<Scalars['String']>>;
  /** Nome do quarto */
  name: Scalars['String'];
  /** Preço por noite do quarto */
  price: Scalars['Float'];
  /** Classificação do quarto ex: 5 estrelas */
  rating?: Maybe<Scalars['Int']>;
  /** Uma pequena descrição do quarto */
  summary: Scalars['String'];
  /** Thumbnail a ser exibida do quarto */
  thumbnail: Scalars['String'];
};

export type RoomFilter = {
  maxPrice?: InputMaybe<Scalars['Float']>;
  maxRating?: InputMaybe<Scalars['Int']>;
  minPrice?: InputMaybe<Scalars['Float']>;
  minRating?: InputMaybe<Scalars['Int']>;
};

export type UpdateHotelInput = {
  address?: InputMaybe<Scalars['String']>;
  addressNumber?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  latitude?: InputMaybe<Scalars['Latitude']>;
  logo?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['Longitude']>;
  name?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<Scalars['String']>;
  thumbnail?: InputMaybe<Scalars['String']>;
  zipCode?: InputMaybe<Scalars['PostalCode']>;
};

export type UpdateRoomInput = {
  images?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  summary?: InputMaybe<Scalars['String']>;
  thumbnail?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['EmailAddress']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  userName?: InputMaybe<Scalars['String']>;
};

export type UpdateUserPasswordInput = {
  password: Scalars['Password'];
  passwordConfirm: Scalars['Password'];
};

export type User = {
  __typename?: 'User';
  /** Mostra se o usuário esta ativo ou não */
  active: Scalars['Boolean'];
  /** Url da imagem de perfil de cada usuário */
  avatar?: Maybe<Scalars['String']>;
  /** Reservas do usúario */
  bookings?: Maybe<Array<Booking>>;
  /** Email único de cada usuário */
  email: Scalars['EmailAddress'];
  /** Primeiro nome do usuário */
  firstName: Scalars['String'];
  /** Id único de cada usuário */
  id: Scalars['ID'];
  /** Sobrenome nome do usuário */
  lastName: Scalars['String'];
  /** Senha criptografada de cada usuário */
  password: Scalars['Password'];
  /** Timestamp do momento em que o usuário mudou a senha */
  passwordChangedAt?: Maybe<Scalars['String']>;
  /** Review feitas pelo usuário */
  reviews?: Maybe<Array<Review>>;
  /** Enum do tipo de função (ADMIN | USER) */
  role: UserRole;
  /** Nome de usuário único de cada usuário */
  userName: Scalars['String'];
  /** Mostra se o usuário verificou o email ou não */
  verified: Scalars['Boolean'];
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type BookingByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type BookingByIdQuery = { __typename?: 'Query', booking: { __typename?: 'Booking', id: string } };

export type BookingsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type BookingsByUserQuery = { __typename?: 'Query', bookings: Array<{ __typename?: 'Booking', id: string }> };

export type CreateBookingMutationVariables = Exact<{
  data: CreateBookingInput;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'Booking', id: string, user: { __typename?: 'User', id: string }, room: { __typename?: 'Room', id: string } } };

export type DeleteBookingMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteBookingMutation = { __typename?: 'Mutation', deleteBooking: string };

export type CreateHotelMutationVariables = Exact<{
  data: CreateHotelInput;
}>;


export type CreateHotelMutation = { __typename?: 'Mutation', createHotel: { __typename?: 'Hotel', id: string, name: string } };

export type DeleteHotelMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteHotelMutation = { __typename?: 'Mutation', deleteHotel: string };

export type GetHotelByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetHotelByIdQuery = { __typename?: 'Query', hotel: { __typename?: 'Hotel', id: string } };

export type GetHotelBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetHotelBySlugQuery = { __typename?: 'Query', hotelBySlug: { __typename?: 'Hotel', slug: string } };

export type GetHotelsByAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHotelsByAdminQuery = { __typename?: 'Query', hotelsByAdmin?: Array<{ __typename?: 'Hotel', id: string }> | null };

export type UpdateHotelMutationVariables = Exact<{
  id: Scalars['ID'];
  data: UpdateHotelInput;
}>;


export type UpdateHotelMutation = { __typename?: 'Mutation', updateHotel: { __typename?: 'Hotel', id: string, name: string } };

export type CreateAdminMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateAdminMutation = { __typename?: 'Mutation', createAdmin: { __typename?: 'AuthPayload', user: { __typename?: 'User', userName: string } } };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'AuthPayload', user: { __typename?: 'User', userName: string } } };

export type DeactivateUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeactivateUserMutation = { __typename?: 'Mutation', deactivateUser: string };

export type LoginUserMutationVariables = Exact<{
  data: LoginUserInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'AuthPayload', user: { __typename?: 'User', userName: string } } };

export type UpdateUserPasswordMutationVariables = Exact<{
  data: UpdateUserPasswordInput;
}>;


export type UpdateUserPasswordMutation = { __typename?: 'Mutation', updateUserPassword: { __typename?: 'AuthPayload', user: { __typename?: 'User', password: string } } };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'AuthPayload', user: { __typename?: 'User', firstName: string, lastName: string, userName: string } } };

export type VerifyUserMutationVariables = Exact<{ [key: string]: never; }>;


export type VerifyUserMutation = { __typename?: 'Mutation', verifyUser: { __typename?: 'AuthPayload', user: { __typename?: 'User', verified: boolean } } };


export const BookingByIdDocument = gql`
    query BookingById($id: ID!) {
  booking(id: $id) {
    id
  }
}
    `;
export const BookingsByUserDocument = gql`
    query BookingsByUser {
  bookings {
    id
  }
}
    `;
export const CreateBookingDocument = gql`
    mutation CreateBooking($data: CreateBookingInput!) {
  createBooking(data: $data) {
    id
    user {
      id
    }
    room {
      id
    }
  }
}
    `;
export const DeleteBookingDocument = gql`
    mutation DeleteBooking($id: ID!) {
  deleteBooking(id: $id)
}
    `;
export const CreateHotelDocument = gql`
    mutation CreateHotel($data: CreateHotelInput!) {
  createHotel(data: $data) {
    id
    name
  }
}
    `;
export const DeleteHotelDocument = gql`
    mutation DeleteHotel($id: ID!) {
  deleteHotel(id: $id)
}
    `;
export const GetHotelByIdDocument = gql`
    query GetHotelById($id: ID!) {
  hotel(id: $id) {
    id
  }
}
    `;
export const GetHotelBySlugDocument = gql`
    query GetHotelBySlug($slug: String!) {
  hotelBySlug(slug: $slug) {
    slug
  }
}
    `;
export const GetHotelsByAdminDocument = gql`
    query GetHotelsByAdmin {
  hotelsByAdmin {
    id
  }
}
    `;
export const UpdateHotelDocument = gql`
    mutation UpdateHotel($id: ID!, $data: UpdateHotelInput!) {
  updateHotel(id: $id, data: $data) {
    id
    name
  }
}
    `;
export const CreateAdminDocument = gql`
    mutation CreateAdmin($data: CreateUserInput!) {
  createAdmin(data: $data) {
    user {
      userName
    }
  }
}
    `;
export const CreateUserDocument = gql`
    mutation CreateUser($data: CreateUserInput!) {
  createUser(data: $data) {
    user {
      userName
    }
  }
}
    `;
export const DeactivateUserDocument = gql`
    mutation DeactivateUser {
  deactivateUser
}
    `;
export const LoginUserDocument = gql`
    mutation LoginUser($data: LoginUserInput!) {
  loginUser(data: $data) {
    user {
      userName
    }
  }
}
    `;
export const UpdateUserPasswordDocument = gql`
    mutation UpdateUserPassword($data: UpdateUserPasswordInput!) {
  updateUserPassword(data: $data) {
    user {
      password
    }
  }
}
    `;
export const UpdateUserDocument = gql`
    mutation UpdateUser($data: UpdateUserInput!) {
  updateUser(data: $data) {
    user {
      firstName
      lastName
      userName
    }
  }
}
    `;
export const VerifyUserDocument = gql`
    mutation VerifyUser {
  verifyUser {
    user {
      verified
    }
  }
}
    `;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    BookingById(variables: BookingByIdQueryVariables, options?: C): Promise<BookingByIdQuery> {
      return requester<BookingByIdQuery, BookingByIdQueryVariables>(BookingByIdDocument, variables, options);
    },
    BookingsByUser(variables?: BookingsByUserQueryVariables, options?: C): Promise<BookingsByUserQuery> {
      return requester<BookingsByUserQuery, BookingsByUserQueryVariables>(BookingsByUserDocument, variables, options);
    },
    CreateBooking(variables: CreateBookingMutationVariables, options?: C): Promise<CreateBookingMutation> {
      return requester<CreateBookingMutation, CreateBookingMutationVariables>(CreateBookingDocument, variables, options);
    },
    DeleteBooking(variables: DeleteBookingMutationVariables, options?: C): Promise<DeleteBookingMutation> {
      return requester<DeleteBookingMutation, DeleteBookingMutationVariables>(DeleteBookingDocument, variables, options);
    },
    CreateHotel(variables: CreateHotelMutationVariables, options?: C): Promise<CreateHotelMutation> {
      return requester<CreateHotelMutation, CreateHotelMutationVariables>(CreateHotelDocument, variables, options);
    },
    DeleteHotel(variables: DeleteHotelMutationVariables, options?: C): Promise<DeleteHotelMutation> {
      return requester<DeleteHotelMutation, DeleteHotelMutationVariables>(DeleteHotelDocument, variables, options);
    },
    GetHotelById(variables: GetHotelByIdQueryVariables, options?: C): Promise<GetHotelByIdQuery> {
      return requester<GetHotelByIdQuery, GetHotelByIdQueryVariables>(GetHotelByIdDocument, variables, options);
    },
    GetHotelBySlug(variables: GetHotelBySlugQueryVariables, options?: C): Promise<GetHotelBySlugQuery> {
      return requester<GetHotelBySlugQuery, GetHotelBySlugQueryVariables>(GetHotelBySlugDocument, variables, options);
    },
    GetHotelsByAdmin(variables?: GetHotelsByAdminQueryVariables, options?: C): Promise<GetHotelsByAdminQuery> {
      return requester<GetHotelsByAdminQuery, GetHotelsByAdminQueryVariables>(GetHotelsByAdminDocument, variables, options);
    },
    UpdateHotel(variables: UpdateHotelMutationVariables, options?: C): Promise<UpdateHotelMutation> {
      return requester<UpdateHotelMutation, UpdateHotelMutationVariables>(UpdateHotelDocument, variables, options);
    },
    CreateAdmin(variables: CreateAdminMutationVariables, options?: C): Promise<CreateAdminMutation> {
      return requester<CreateAdminMutation, CreateAdminMutationVariables>(CreateAdminDocument, variables, options);
    },
    CreateUser(variables: CreateUserMutationVariables, options?: C): Promise<CreateUserMutation> {
      return requester<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, variables, options);
    },
    DeactivateUser(variables?: DeactivateUserMutationVariables, options?: C): Promise<DeactivateUserMutation> {
      return requester<DeactivateUserMutation, DeactivateUserMutationVariables>(DeactivateUserDocument, variables, options);
    },
    LoginUser(variables: LoginUserMutationVariables, options?: C): Promise<LoginUserMutation> {
      return requester<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, variables, options);
    },
    UpdateUserPassword(variables: UpdateUserPasswordMutationVariables, options?: C): Promise<UpdateUserPasswordMutation> {
      return requester<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>(UpdateUserPasswordDocument, variables, options);
    },
    UpdateUser(variables: UpdateUserMutationVariables, options?: C): Promise<UpdateUserMutation> {
      return requester<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, variables, options);
    },
    VerifyUser(variables?: VerifyUserMutationVariables, options?: C): Promise<VerifyUserMutation> {
      return requester<VerifyUserMutation, VerifyUserMutationVariables>(VerifyUserDocument, variables, options);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;