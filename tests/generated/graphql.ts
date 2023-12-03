import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
  EmailAddress: { input: string; output: string; }
  File: { input: File; output: File; }
  Latitude: { input: number; output: number; }
  Longitude: { input: number; output: number; }
  Password: { input: string; output: string; }
  PostalCode: { input: string; output: string; }
};

export type TAuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: TUser;
};

export type TBooking = {
  __typename?: 'Booking';
  /** Data em qua a reserva foi feita */
  bookingDate: Scalars['String']['output'];
  /** Data de entrada da reserva */
  dateIn: Scalars['String']['output'];
  /** Data de saida da reserva */
  dateOut: Scalars['String']['output'];
  /** Id da reserva */
  id: Scalars['ID']['output'];
  /** Booleano que mostra se foi pago ou não */
  paid: Scalars['Boolean']['output'];
  /** Preço da reserva */
  price: Scalars['Float']['output'];
  /** Quarto reservado */
  room: TRoom;
  /** Usuário que fez a reserva */
  user: TUser;
};

export type TCreateBookingInput = {
  dateIn: Scalars['String']['input'];
  dateOut: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  room: Scalars['ID']['input'];
};

export type TCreateHotelInput = {
  address: Scalars['String']['input'];
  addressNumber: Scalars['String']['input'];
  city: Scalars['String']['input'];
  description: Scalars['String']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  latitude: Scalars['Latitude']['input'];
  logo: Scalars['String']['input'];
  longitude: Scalars['Longitude']['input'];
  name: Scalars['String']['input'];
  neighborhood: Scalars['String']['input'];
  state: Scalars['String']['input'];
  summary: Scalars['String']['input'];
  thumbnail: Scalars['String']['input'];
  zipCode: Scalars['PostalCode']['input'];
};

export type TCreateRoomInput = {
  description: Scalars['String']['input'];
  hotel: Scalars['ID']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  summary: Scalars['String']['input'];
  thumbnail: Scalars['String']['input'];
};

export type TCreateUserInput = {
  avatar: Scalars['File']['input'];
  email: Scalars['EmailAddress']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['Password']['input'];
  passwordConfirm: Scalars['Password']['input'];
  role: TUserRole;
  userName: Scalars['String']['input'];
};

export type THotel = {
  __typename?: 'Hotel';
  /** Rua do hotel */
  address: Scalars['String']['output'];
  /** Número residencial do hotel */
  addressNumber: Scalars['String']['output'];
  /** Cidade do hotel */
  city: Scalars['String']['output'];
  /** Data de criação do hotel */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** A descrição do hotel */
  description: Scalars['String']['output'];
  /** Id do hotel */
  id: Scalars['ID']['output'];
  /** Um array de url's de imagens de hoteis */
  images: Array<Scalars['String']['output']>;
  /** Latitude do hotel */
  latitude: Scalars['Latitude']['output'];
  /** Url da logo do hotel */
  logo: Scalars['String']['output'];
  /** Longitude do hotel */
  longitude: Scalars['Longitude']['output'];
  /** Nome do hotel */
  name: Scalars['String']['output'];
  /** Bairro do hotel */
  neighborhood: Scalars['String']['output'];
  /** Classificação do hotel ex: 5 estrelas */
  rating: Scalars['Int']['output'];
  /** Array com os quartos do hotel */
  rooms: Array<TRoom>;
  /** Slug do hotel baseado no nome */
  slug: Scalars['String']['output'];
  /** Estado do hotel */
  state: Scalars['String']['output'];
  /** Uma pequena descrição do hotel de 10 as 30 palavras */
  summary: Scalars['String']['output'];
  /** Thumbnail a ser exibida do hotel */
  thumbnail: Scalars['String']['output'];
  /** Data da ultima atualização do hotel */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Cep do hotel */
  zipCode: Scalars['PostalCode']['output'];
};

export type THotelsPayload = TQueryPayload & {
  __typename?: 'HotelsPayload';
  /** Quantidade total de hotéis criados */
  count: Scalars['Int']['output'];
  /** Array com hotéis */
  nodes: Array<THotel>;
};

export type TLoginUserInput = {
  email: Scalars['EmailAddress']['input'];
  password: Scalars['Password']['input'];
};

export type TMutation = {
  __typename?: 'Mutation';
  /** Usada para fazer uma reserva */
  createBooking: TBooking;
  /** Usada para criar um hotel */
  createHotel: THotel;
  /** Usada para criar um quarto de hotel */
  createRoom: TRoom;
  /** Usada para criar um usuário */
  createUser: TAuthPayload;
  /** Usada para que o próprio usuário possa desativar a conta, mas não apagá-la */
  deactivateUser: Scalars['String']['output'];
  /** Usada para cancelar uma reserva */
  deleteBooking: Scalars['String']['output'];
  /** Usada para apagar um hotel */
  deleteHotel: THotel;
  /** Usada para deletar um quarto de hotel */
  deleteRoom: Scalars['String']['output'];
  /** Usada para fazer login */
  loginUser: TAuthPayload;
  /** Usada para atualizar um hotel */
  updateHotel: THotel;
  /** Usada para atualizar um quarto de hotel */
  updateRoom: TRoom;
  /** Usada para atualizar informações não sensiveis (ex: senhas) */
  updateUser: TAuthPayload;
  /** Usada para alterar a senha do usuário */
  updateUserPassword: TAuthPayload;
  /** Usada para verificar um usuário */
  verifyUser: TAuthPayload;
};


export type TMutationCreateBookingArgs = {
  data: TCreateBookingInput;
};


export type TMutationCreateHotelArgs = {
  data: TCreateHotelInput;
};


export type TMutationCreateRoomArgs = {
  data: TCreateRoomInput;
};


export type TMutationCreateUserArgs = {
  data: TCreateUserInput;
};


export type TMutationDeleteBookingArgs = {
  id: Scalars['ID']['input'];
};


export type TMutationDeleteHotelArgs = {
  id: Scalars['ID']['input'];
};


export type TMutationDeleteRoomArgs = {
  id: Scalars['ID']['input'];
};


export type TMutationLoginUserArgs = {
  data: TLoginUserInput;
};


export type TMutationUpdateHotelArgs = {
  data: TUpdateHotelInput;
  id: Scalars['ID']['input'];
};


export type TMutationUpdateRoomArgs = {
  data: TUpdateRoomInput;
  id: Scalars['ID']['input'];
};


export type TMutationUpdateUserArgs = {
  data: TUpdateUserInput;
};


export type TMutationUpdateUserPasswordArgs = {
  data: TUpdateUserPasswordInput;
};

export type TOptions = {
  orderBy?: InputMaybe<TOrderBy>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export enum TOrderBy {
  Asc = 'asc',
  Desc = 'desc'
}

export type TQuery = {
  __typename?: 'Query';
  /** Usada para buscar uma reserva pelo id */
  booking: TBooking;
  /** Usada para buscar reservas de um usuário */
  bookings: Array<TBooking>;
  /** Usada para buscar um hotel pelo id */
  hotel: THotel;
  /** Usada para buscar um hotel pelo slug */
  hotelBySlug: THotel;
  /** Usada para buscar hotéis */
  hotels: Array<THotel>;
  /** Usada para buscar um hotel pelo id do admin */
  hotelsByAdmin: THotelsPayload;
  /** Usada para buscar um quarto pelo id */
  room: TRoom;
  /** Usada para buscar um quartos */
  rooms: Array<TRoom>;
  /** Usada para buscar quartos pelo id do hotel */
  roomsByHotel: TRoomPayload;
};


export type TQueryBookingArgs = {
  id: Scalars['ID']['input'];
};


export type TQueryHotelArgs = {
  id: Scalars['ID']['input'];
  roomOptions?: InputMaybe<TOptions>;
};


export type TQueryHotelBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type TQueryHotelsArgs = {
  roomOptions?: InputMaybe<TOptions>;
};


export type TQueryHotelsByAdminArgs = {
  options?: InputMaybe<TOptions>;
};


export type TQueryRoomArgs = {
  id: Scalars['ID']['input'];
};


export type TQueryRoomsArgs = {
  filter?: InputMaybe<TRoomFilter>;
};


export type TQueryRoomsByHotelArgs = {
  hotel: Scalars['ID']['input'];
  options?: InputMaybe<TOptions>;
};

export type TQueryPayload = {
  count: Scalars['Int']['output'];
};

export type TReview = {
  __typename?: 'Review';
  /** Id da review */
  id: Scalars['ID']['output'];
  /** Classificação da review */
  rating: Scalars['Int']['output'];
  /** Texto da review */
  review: Scalars['String']['output'];
  /** Quarto que recebeu a review */
  room: TRoom;
  /** Usuário que fez a review */
  user: TUser;
};

export type TRoom = {
  __typename?: 'Room';
  /** Data em que foi criado */
  createdAt: Scalars['DateTime']['output'];
  /** Uma descrição do quarto */
  description: Scalars['String']['output'];
  /** Hotel a qual o quarto pertence */
  hotel: THotel;
  /** Id do quarto */
  id: Scalars['ID']['output'];
  /** Um array de url's de imagens do quarto */
  images?: Maybe<Array<Scalars['String']['output']>>;
  /** Nome do quarto */
  name: Scalars['String']['output'];
  /** Preço por noite do quarto */
  price: Scalars['Float']['output'];
  /** Classificação do quarto ex: 5 estrelas */
  rating?: Maybe<Scalars['Int']['output']>;
  /** Uma pequena descrição do quarto */
  summary: Scalars['String']['output'];
  /** Thumbnail a ser exibida do quarto */
  thumbnail: Scalars['String']['output'];
  /** Data da ultima atualização */
  updatedAt: Scalars['DateTime']['output'];
};

export type TRoomFilter = {
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  maxRating?: InputMaybe<Scalars['Int']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  minRating?: InputMaybe<Scalars['Int']['input']>;
};

export type TRoomPayload = TQueryPayload & {
  __typename?: 'RoomPayload';
  /** Quantidade total de quartos criados */
  count: Scalars['Int']['output'];
  /** Array com quartos */
  nodes: Array<TRoom>;
};

export type TUpdateHotelInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  addressNumber?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  latitude?: InputMaybe<Scalars['Latitude']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['Longitude']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  neighborhood?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  zipCode?: InputMaybe<Scalars['PostalCode']['input']>;
};

export type TUpdateRoomInput = {
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type TUpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['EmailAddress']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type TUpdateUserPasswordInput = {
  password: Scalars['Password']['input'];
  passwordConfirm: Scalars['Password']['input'];
};

export type TUser = {
  __typename?: 'User';
  /** Mostra se o usuário esta ativo ou não */
  active: Scalars['Boolean']['output'];
  /** Url da imagem de perfil de cada usuário */
  avatar: Scalars['String']['output'];
  /** Reservas do usúario */
  bookings?: Maybe<Array<TBooking>>;
  /** Email único de cada usuário */
  email: Scalars['EmailAddress']['output'];
  /** Primeiro nome do usuário */
  firstName: Scalars['String']['output'];
  /** Id único de cada usuário */
  id: Scalars['ID']['output'];
  /** Sobrenome nome do usuário */
  lastName: Scalars['String']['output'];
  /** Senha criptografada de cada usuário */
  password: Scalars['Password']['output'];
  /** Timestamp do momento em que o usuário mudou a senha */
  passwordChangedAt?: Maybe<Scalars['String']['output']>;
  /** Review feitas pelo usuário */
  reviews?: Maybe<Array<TReview>>;
  /** Enum do tipo de função (ADMIN | USER) */
  role: TUserRole;
  /** Nome de usuário único de cada usuário */
  userName: Scalars['String']['output'];
  /** Mostra se o usuário verificou o email ou não */
  verified: Scalars['Boolean']['output'];
};

export enum TUserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type TCreateBookingMutationVariables = Exact<{
  data: TCreateBookingInput;
}>;


export type TCreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'Booking', id: string, user: { __typename?: 'User', id: string }, room: { __typename?: 'Room', id: string } } };

export type TDeleteBookingMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TDeleteBookingMutation = { __typename?: 'Mutation', deleteBooking: string };

export type TGetBookingByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TGetBookingByIdQuery = { __typename?: 'Query', booking: { __typename?: 'Booking', id: string } };

export type TGetBookingsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type TGetBookingsByUserQuery = { __typename?: 'Query', bookings: Array<{ __typename?: 'Booking', id: string }> };

export type TCreateHotelMutationVariables = Exact<{
  data: TCreateHotelInput;
}>;


export type TCreateHotelMutation = { __typename?: 'Mutation', createHotel: { __typename?: 'Hotel', id: string, name: string } };

export type TDeleteHotelMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TDeleteHotelMutation = { __typename?: 'Mutation', deleteHotel: { __typename?: 'Hotel', id: string } };

export type TGetHotelByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TGetHotelByIdQuery = { __typename?: 'Query', hotel: { __typename?: 'Hotel', id: string } };

export type TGetHotelBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type TGetHotelBySlugQuery = { __typename?: 'Query', hotelBySlug: { __typename?: 'Hotel', slug: string } };

export type TGetHotelsByAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type TGetHotelsByAdminQuery = { __typename?: 'Query', hotelsByAdmin: { __typename?: 'HotelsPayload', nodes: Array<{ __typename?: 'Hotel', id: string }> } };

export type TUpdateHotelMutationVariables = Exact<{
  id: Scalars['ID'];
  data: TUpdateHotelInput;
}>;


export type TUpdateHotelMutation = { __typename?: 'Mutation', updateHotel: { __typename?: 'Hotel', id: string, name: string } };

export type TCreateRoomMutationVariables = Exact<{
  data: TCreateRoomInput;
}>;


export type TCreateRoomMutation = { __typename?: 'Mutation', createRoom: { __typename?: 'Room', name: string } };

export type TDeleteRoomMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TDeleteRoomMutation = { __typename?: 'Mutation', deleteRoom: string };

export type TUpdateRoomMutationVariables = Exact<{
  id: Scalars['ID'];
  data: TUpdateRoomInput;
}>;


export type TUpdateRoomMutation = { __typename?: 'Mutation', updateRoom: { __typename?: 'Room', name: string } };

export type TCreateAdminMutationVariables = Exact<{
  data: TCreateUserInput;
}>;


export type TCreateAdminMutation = { __typename?: 'Mutation', createUser: { __typename?: 'AuthPayload', user: { __typename?: 'User', userName: string } } };

export type TCreateUserMutationVariables = Exact<{
  data: TCreateUserInput;
}>;


export type TCreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'AuthPayload', user: { __typename?: 'User', userName: string } } };

export type TDeactivateUserMutationVariables = Exact<{ [key: string]: never; }>;


export type TDeactivateUserMutation = { __typename?: 'Mutation', deactivateUser: string };

export type TLoginUserMutationVariables = Exact<{
  data: TLoginUserInput;
}>;


export type TLoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'AuthPayload', user: { __typename?: 'User', userName: string } } };

export type TUpdateUserPasswordMutationVariables = Exact<{
  data: TUpdateUserPasswordInput;
}>;


export type TUpdateUserPasswordMutation = { __typename?: 'Mutation', updateUserPassword: { __typename?: 'AuthPayload', user: { __typename?: 'User', password: string } } };

export type TUpdateUserMutationVariables = Exact<{
  data: TUpdateUserInput;
}>;


export type TUpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'AuthPayload', user: { __typename?: 'User', firstName: string, lastName: string, userName: string } } };

export type TVerifyUserMutationVariables = Exact<{ [key: string]: never; }>;


export type TVerifyUserMutation = { __typename?: 'Mutation', verifyUser: { __typename?: 'AuthPayload', user: { __typename?: 'User', verified: boolean } } };


export const CreateBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBookingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<TCreateBookingMutation, TCreateBookingMutationVariables>;
export const DeleteBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<TDeleteBookingMutation, TDeleteBookingMutationVariables>;
export const GetBookingByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookingById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"booking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<TGetBookingByIdQuery, TGetBookingByIdQueryVariables>;
export const GetBookingsByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookingsByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<TGetBookingsByUserQuery, TGetBookingsByUserQueryVariables>;
export const CreateHotelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateHotel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateHotelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createHotel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<TCreateHotelMutation, TCreateHotelMutationVariables>;
export const DeleteHotelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteHotel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteHotel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<TDeleteHotelMutation, TDeleteHotelMutationVariables>;
export const GetHotelByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHotelById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hotel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<TGetHotelByIdQuery, TGetHotelByIdQueryVariables>;
export const GetHotelBySlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHotelBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hotelBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<TGetHotelBySlugQuery, TGetHotelBySlugQueryVariables>;
export const GetHotelsByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHotelsByAdmin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hotelsByAdmin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<TGetHotelsByAdminQuery, TGetHotelsByAdminQueryVariables>;
export const UpdateHotelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateHotel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateHotelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateHotel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<TUpdateHotelMutation, TUpdateHotelMutationVariables>;
export const CreateRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRoomInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<TCreateRoomMutation, TCreateRoomMutationVariables>;
export const DeleteRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<TDeleteRoomMutation, TDeleteRoomMutationVariables>;
export const UpdateRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRoomInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<TUpdateRoomMutation, TUpdateRoomMutationVariables>;
export const CreateAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}}]}}]} as unknown as DocumentNode<TCreateAdminMutation, TCreateAdminMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}}]}}]} as unknown as DocumentNode<TCreateUserMutation, TCreateUserMutationVariables>;
export const DeactivateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeactivateUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deactivateUser"}}]}}]} as unknown as DocumentNode<TDeactivateUserMutation, TDeactivateUserMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}}]}}]} as unknown as DocumentNode<TLoginUserMutation, TLoginUserMutationVariables>;
export const UpdateUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"password"}}]}}]}}]}}]} as unknown as DocumentNode<TUpdateUserPasswordMutation, TUpdateUserPasswordMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}}]}}]} as unknown as DocumentNode<TUpdateUserMutation, TUpdateUserMutationVariables>;
export const VerifyUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}}]}}]}}]} as unknown as DocumentNode<TVerifyUserMutation, TVerifyUserMutationVariables>;