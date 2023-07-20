import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  city: Scalars['String'];
  description: Scalars['String'];
  images?: InputMaybe<Array<Scalars['String']>>;
  latitude: Scalars['Latitude'];
  logo: Scalars['String'];
  longitude: Scalars['Longitude'];
  name: Scalars['String'];
  neighborhood: Scalars['String'];
  state: Scalars['String'];
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
  /** Rua do hotel */
  address: Scalars['String'];
  /** Número residencial do hotel */
  addressNumber: Scalars['String'];
  /** Cidade do hotel */
  city: Scalars['String'];
  /** A descrição do hotel */
  description: Scalars['String'];
  /** Id do hotel */
  id: Scalars['ID'];
  /** Um array de url's de imagens de hoteis */
  images?: Maybe<Array<Scalars['String']>>;
  /** Latitude do hotel */
  latitude: Scalars['Latitude'];
  /** Url da logo do hotel */
  logo: Scalars['String'];
  /** Longitude do hotel */
  longitude: Scalars['Longitude'];
  /** Nome do hotel */
  name: Scalars['String'];
  /** Bairro do hotel */
  neighborhood: Scalars['String'];
  /** Classificação do hotel ex: 5 estrelas */
  rating?: Maybe<Scalars['Int']>;
  /** Array com os quartos do hotel */
  rooms?: Maybe<Array<Room>>;
  /** Slug do hotel baseado no nome */
  slug: Scalars['String'];
  /** Estado do hotel */
  state: Scalars['String'];
  /** Uma pequena descrição do hotel de 10 as 30 palavras */
  summary: Scalars['String'];
  /** Thumbnail a ser exibida do hotel */
  thumbnail: Scalars['String'];
  /** Cep do hotel */
  zipCode: Scalars['PostalCode'];
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
  hotels: Array<Hotel>;
  /** Usada para buscar um hotel pelo slug */
  hotelsByAdmin: Array<Hotel>;
  /** Usada para buscar um quarto pelo id */
  room: Room;
  /** Usada para buscar um hotel pelo slug */
  rooms: Array<Room>;
  /** Usada para buscar um hotel pelo id do hotel */
  roomsByHotel: Array<Room>;
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
  city?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  latitude?: InputMaybe<Scalars['Latitude']>;
  logo?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['Longitude']>;
  name?: InputMaybe<Scalars['String']>;
  neighborhood?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
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

export type CreateBookingMutationVariables = Exact<{
  data: CreateBookingInput;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'Booking', id: string, user: { __typename?: 'User', id: string }, room: { __typename?: 'Room', id: string } } };

export type DeleteBookingMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteBookingMutation = { __typename?: 'Mutation', deleteBooking: string };

export type GetBookingByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetBookingByIdQuery = { __typename?: 'Query', booking: { __typename?: 'Booking', id: string } };

export type GetBookingsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBookingsByUserQuery = { __typename?: 'Query', bookings: Array<{ __typename?: 'Booking', id: string }> };

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


export type GetHotelsByAdminQuery = { __typename?: 'Query', hotelsByAdmin: Array<{ __typename?: 'Hotel', id: string }> };

export type UpdateHotelMutationVariables = Exact<{
  id: Scalars['ID'];
  data: UpdateHotelInput;
}>;


export type UpdateHotelMutation = { __typename?: 'Mutation', updateHotel: { __typename?: 'Hotel', id: string, name: string } };

export type CreateRoomMutationVariables = Exact<{
  data: CreateRoomInput;
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom: { __typename?: 'Room', name: string } };

export type DeleteRoomMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteRoomMutation = { __typename?: 'Mutation', deleteRoom: string };

export type UpdateRoomMutationVariables = Exact<{
  id: Scalars['ID'];
  data: UpdateRoomInput;
}>;


export type UpdateRoomMutation = { __typename?: 'Mutation', updateRoom: { __typename?: 'Room', name: string } };

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


export const CreateBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBookingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateBookingMutation, CreateBookingMutationVariables>;
export const DeleteBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteBookingMutation, DeleteBookingMutationVariables>;
export const GetBookingByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookingById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"booking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetBookingByIdQuery, GetBookingByIdQueryVariables>;
export const GetBookingsByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookingsByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetBookingsByUserQuery, GetBookingsByUserQueryVariables>;
export const CreateHotelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateHotel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateHotelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createHotel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateHotelMutation, CreateHotelMutationVariables>;
export const DeleteHotelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteHotel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteHotel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteHotelMutation, DeleteHotelMutationVariables>;
export const GetHotelByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHotelById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hotel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetHotelByIdQuery, GetHotelByIdQueryVariables>;
export const GetHotelBySlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHotelBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hotelBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<GetHotelBySlugQuery, GetHotelBySlugQueryVariables>;
export const GetHotelsByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHotelsByAdmin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hotelsByAdmin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetHotelsByAdminQuery, GetHotelsByAdminQueryVariables>;
export const UpdateHotelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateHotel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateHotelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateHotel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateHotelMutation, UpdateHotelMutationVariables>;
export const CreateRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRoomInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateRoomMutation, CreateRoomMutationVariables>;
export const DeleteRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteRoomMutation, DeleteRoomMutationVariables>;
export const UpdateRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRoomInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateRoomMutation, UpdateRoomMutationVariables>;
export const CreateAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}}]}}]} as unknown as DocumentNode<CreateAdminMutation, CreateAdminMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const DeactivateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeactivateUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deactivateUser"}}]}}]} as unknown as DocumentNode<DeactivateUserMutation, DeactivateUserMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const UpdateUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"password"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const VerifyUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}}]}}]}}]} as unknown as DocumentNode<VerifyUserMutation, VerifyUserMutationVariables>;