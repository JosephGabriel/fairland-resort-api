import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { UserModel, RoomModel, BookingModel } from '../models/models';
import { ServerContext } from '../../globals';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
  EmailAddress: string;
  File: File;
  Latitude: number;
  Longitude: number;
  Password: string;
  PostalCode: string;
};

export type TAuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: TUser;
};

export type TBooking = {
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
  room: TRoom;
  /** Usuário que fez a reserva */
  user: TUser;
};

export type TCreateBookingInput = {
  dateIn: Scalars['String'];
  dateOut: Scalars['String'];
  price: Scalars['Float'];
  room: Scalars['ID'];
};

export type TCreateHotelInput = {
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

export type TCreateRoomInput = {
  description: Scalars['String'];
  hotel: Scalars['ID'];
  images?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  price: Scalars['Float'];
  summary: Scalars['String'];
  thumbnail: Scalars['String'];
};

export type TCreateUserInput = {
  avatar: Scalars['File'];
  email: Scalars['EmailAddress'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['Password'];
  passwordConfirm: Scalars['Password'];
  role: TUserRole;
  userName: Scalars['String'];
};

export type THotel = {
  __typename?: 'Hotel';
  /** Rua do hotel */
  address: Scalars['String'];
  /** Número residencial do hotel */
  addressNumber: Scalars['String'];
  /** Cidade do hotel */
  city: Scalars['String'];
  /** Data de criação do hotel */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** A descrição do hotel */
  description: Scalars['String'];
  /** Id do hotel */
  id: Scalars['ID'];
  /** Um array de url's de imagens de hoteis */
  images: Array<Scalars['String']>;
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
  rating: Scalars['Int'];
  /** Array com os quartos do hotel */
  rooms: Array<TRoom>;
  /** Slug do hotel baseado no nome */
  slug: Scalars['String'];
  /** Estado do hotel */
  state: Scalars['String'];
  /** Uma pequena descrição do hotel de 10 as 30 palavras */
  summary: Scalars['String'];
  /** Thumbnail a ser exibida do hotel */
  thumbnail: Scalars['String'];
  /** Data da ultima atualização do hotel */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** Cep do hotel */
  zipCode: Scalars['PostalCode'];
};

export type THotelsPayload = TQueryPayload & {
  __typename?: 'HotelsPayload';
  /** Quantidade total de hotéis criados */
  count: Scalars['Int'];
  /** Array com hotéis */
  nodes: Array<THotel>;
};

export type TLoginUserInput = {
  email: Scalars['EmailAddress'];
  password: Scalars['Password'];
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
  deactivateUser: Scalars['String'];
  /** Usada para cancelar uma reserva */
  deleteBooking: Scalars['String'];
  /** Usada para apagar um hotel */
  deleteHotel: THotel;
  /** Usada para deletar um quarto de hotel */
  deleteRoom: Scalars['String'];
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
  id: Scalars['ID'];
};


export type TMutationDeleteHotelArgs = {
  id: Scalars['ID'];
};


export type TMutationDeleteRoomArgs = {
  id: Scalars['ID'];
};


export type TMutationLoginUserArgs = {
  data: TLoginUserInput;
};


export type TMutationUpdateHotelArgs = {
  data: TUpdateHotelInput;
  id: Scalars['ID'];
};


export type TMutationUpdateRoomArgs = {
  data: TUpdateRoomInput;
  id: Scalars['ID'];
};


export type TMutationUpdateUserArgs = {
  data: TUpdateUserInput;
};


export type TMutationUpdateUserPasswordArgs = {
  data: TUpdateUserPasswordInput;
};

export type TOptions = {
  orderBy?: InputMaybe<TOrderBy>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
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
  id: Scalars['ID'];
};


export type TQueryHotelArgs = {
  id: Scalars['ID'];
  roomOptions?: InputMaybe<TOptions>;
};


export type TQueryHotelBySlugArgs = {
  slug: Scalars['String'];
};


export type TQueryHotelsArgs = {
  roomOptions?: InputMaybe<TOptions>;
};


export type TQueryHotelsByAdminArgs = {
  options?: InputMaybe<TOptions>;
};


export type TQueryRoomArgs = {
  id: Scalars['ID'];
};


export type TQueryRoomsArgs = {
  filter?: InputMaybe<TRoomFilter>;
};


export type TQueryRoomsByHotelArgs = {
  hotel: Scalars['ID'];
  options?: InputMaybe<TOptions>;
};

export type TQueryPayload = {
  count: Scalars['Int'];
};

export type TReview = {
  __typename?: 'Review';
  /** Id da review */
  id: Scalars['ID'];
  /** Classificação da review */
  rating: Scalars['Int'];
  /** Texto da review */
  review: Scalars['String'];
  /** Quarto que recebeu a review */
  room: TRoom;
  /** Usuário que fez a review */
  user: TUser;
};

export type TRoom = {
  __typename?: 'Room';
  /** Data em que foi criado */
  createdAt: Scalars['DateTime'];
  /** Uma descrição do quarto */
  description: Scalars['String'];
  /** Hotel a qual o quarto pertence */
  hotel: THotel;
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
  /** Data da ultima atualização */
  updatedAt: Scalars['DateTime'];
};

export type TRoomFilter = {
  maxPrice?: InputMaybe<Scalars['Float']>;
  maxRating?: InputMaybe<Scalars['Int']>;
  minPrice?: InputMaybe<Scalars['Float']>;
  minRating?: InputMaybe<Scalars['Int']>;
};

export type TRoomPayload = TQueryPayload & {
  __typename?: 'RoomPayload';
  /** Quantidade total de quartos criados */
  count: Scalars['Int'];
  /** Array com quartos */
  nodes: Array<TRoom>;
};

export type TUpdateHotelInput = {
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

export type TUpdateRoomInput = {
  images?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  summary?: InputMaybe<Scalars['String']>;
  thumbnail?: InputMaybe<Scalars['String']>;
};

export type TUpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['EmailAddress']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  userName?: InputMaybe<Scalars['String']>;
};

export type TUpdateUserPasswordInput = {
  password: Scalars['Password'];
  passwordConfirm: Scalars['Password'];
};

export type TUser = {
  __typename?: 'User';
  /** Mostra se o usuário esta ativo ou não */
  active: Scalars['Boolean'];
  /** Url da imagem de perfil de cada usuário */
  avatar: Scalars['String'];
  /** Reservas do usúario */
  bookings?: Maybe<Array<TBooking>>;
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
  reviews?: Maybe<Array<TReview>>;
  /** Enum do tipo de função (ADMIN | USER) */
  role: TUserRole;
  /** Nome de usuário único de cada usuário */
  userName: Scalars['String'];
  /** Mostra se o usuário verificou o email ou não */
  verified: Scalars['Boolean'];
};

export enum TUserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type TResolversTypes = ResolversObject<{
  AuthPayload: ResolverTypeWrapper<Omit<TAuthPayload, 'user'> & { user: TResolversTypes['User'] }>;
  Booking: ResolverTypeWrapper<BookingModel>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateBookingInput: TCreateBookingInput;
  CreateHotelInput: TCreateHotelInput;
  CreateRoomInput: TCreateRoomInput;
  CreateUserInput: TCreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  File: ResolverTypeWrapper<Scalars['File']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Hotel: ResolverTypeWrapper<Omit<THotel, 'rooms'> & { rooms: Array<TResolversTypes['Room']> }>;
  HotelsPayload: ResolverTypeWrapper<Omit<THotelsPayload, 'nodes'> & { nodes: Array<TResolversTypes['Hotel']> }>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Latitude: ResolverTypeWrapper<Scalars['Latitude']>;
  LoginUserInput: TLoginUserInput;
  Longitude: ResolverTypeWrapper<Scalars['Longitude']>;
  Mutation: ResolverTypeWrapper<{}>;
  Options: TOptions;
  OrderBy: TOrderBy;
  Password: ResolverTypeWrapper<Scalars['Password']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']>;
  Query: ResolverTypeWrapper<{}>;
  QueryPayload: TResolversTypes['HotelsPayload'] | TResolversTypes['RoomPayload'];
  Review: ResolverTypeWrapper<Omit<TReview, 'room' | 'user'> & { room: TResolversTypes['Room'], user: TResolversTypes['User'] }>;
  Room: ResolverTypeWrapper<RoomModel>;
  RoomFilter: TRoomFilter;
  RoomPayload: ResolverTypeWrapper<Omit<TRoomPayload, 'nodes'> & { nodes: Array<TResolversTypes['Room']> }>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateHotelInput: TUpdateHotelInput;
  UpdateRoomInput: TUpdateRoomInput;
  UpdateUserInput: TUpdateUserInput;
  UpdateUserPasswordInput: TUpdateUserPasswordInput;
  User: ResolverTypeWrapper<UserModel>;
  UserRole: TUserRole;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type TResolversParentTypes = ResolversObject<{
  AuthPayload: Omit<TAuthPayload, 'user'> & { user: TResolversParentTypes['User'] };
  Booking: BookingModel;
  Boolean: Scalars['Boolean'];
  CreateBookingInput: TCreateBookingInput;
  CreateHotelInput: TCreateHotelInput;
  CreateRoomInput: TCreateRoomInput;
  CreateUserInput: TCreateUserInput;
  DateTime: Scalars['DateTime'];
  EmailAddress: Scalars['EmailAddress'];
  File: Scalars['File'];
  Float: Scalars['Float'];
  Hotel: Omit<THotel, 'rooms'> & { rooms: Array<TResolversParentTypes['Room']> };
  HotelsPayload: Omit<THotelsPayload, 'nodes'> & { nodes: Array<TResolversParentTypes['Hotel']> };
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Latitude: Scalars['Latitude'];
  LoginUserInput: TLoginUserInput;
  Longitude: Scalars['Longitude'];
  Mutation: {};
  Options: TOptions;
  Password: Scalars['Password'];
  PostalCode: Scalars['PostalCode'];
  Query: {};
  QueryPayload: TResolversParentTypes['HotelsPayload'] | TResolversParentTypes['RoomPayload'];
  Review: Omit<TReview, 'room' | 'user'> & { room: TResolversParentTypes['Room'], user: TResolversParentTypes['User'] };
  Room: RoomModel;
  RoomFilter: TRoomFilter;
  RoomPayload: Omit<TRoomPayload, 'nodes'> & { nodes: Array<TResolversParentTypes['Room']> };
  String: Scalars['String'];
  UpdateHotelInput: TUpdateHotelInput;
  UpdateRoomInput: TUpdateRoomInput;
  UpdateUserInput: TUpdateUserInput;
  UpdateUserPasswordInput: TUpdateUserPasswordInput;
  User: UserModel;
}>;

export type TAuthPayloadResolvers<ContextType = ServerContext, ParentType extends TResolversParentTypes['AuthPayload'] = TResolversParentTypes['AuthPayload']> = ResolversObject<{
  token?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<TResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TBookingResolvers<ContextType = ServerContext, ParentType extends TResolversParentTypes['Booking'] = TResolversParentTypes['Booking']> = ResolversObject<{
  bookingDate?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  dateIn?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  dateOut?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<TResolversTypes['ID'], ParentType, ContextType>;
  paid?: Resolver<TResolversTypes['Boolean'], ParentType, ContextType>;
  price?: Resolver<TResolversTypes['Float'], ParentType, ContextType>;
  room?: Resolver<TResolversTypes['Room'], ParentType, ContextType>;
  user?: Resolver<TResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TDateTimeScalarConfig extends GraphQLScalarTypeConfig<TResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface TEmailAddressScalarConfig extends GraphQLScalarTypeConfig<TResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export interface TFileScalarConfig extends GraphQLScalarTypeConfig<TResolversTypes['File'], any> {
  name: 'File';
}

export type THotelResolvers<ContextType = ServerContext, ParentType extends TResolversParentTypes['Hotel'] = TResolversParentTypes['Hotel']> = ResolversObject<{
  address?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  addressNumber?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  city?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<TResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<TResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<TResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<TResolversTypes['Latitude'], ParentType, ContextType>;
  logo?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  longitude?: Resolver<TResolversTypes['Longitude'], ParentType, ContextType>;
  name?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  neighborhood?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  rating?: Resolver<TResolversTypes['Int'], ParentType, ContextType>;
  rooms?: Resolver<Array<TResolversTypes['Room']>, ParentType, ContextType>;
  slug?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  thumbnail?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<TResolversTypes['DateTime']>, ParentType, ContextType>;
  zipCode?: Resolver<TResolversTypes['PostalCode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type THotelsPayloadResolvers<ContextType = ServerContext, ParentType extends TResolversParentTypes['HotelsPayload'] = TResolversParentTypes['HotelsPayload']> = ResolversObject<{
  count?: Resolver<TResolversTypes['Int'], ParentType, ContextType>;
  nodes?: Resolver<Array<TResolversTypes['Hotel']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TLatitudeScalarConfig extends GraphQLScalarTypeConfig<TResolversTypes['Latitude'], any> {
  name: 'Latitude';
}

export interface TLongitudeScalarConfig extends GraphQLScalarTypeConfig<TResolversTypes['Longitude'], any> {
  name: 'Longitude';
}

export type TMutationResolvers<ContextType = ServerContext, ParentType extends TResolversParentTypes['Mutation'] = TResolversParentTypes['Mutation']> = ResolversObject<{
  createBooking?: Resolver<TResolversTypes['Booking'], ParentType, ContextType, RequireFields<TMutationCreateBookingArgs, 'data'>>;
  createHotel?: Resolver<TResolversTypes['Hotel'], ParentType, ContextType, RequireFields<TMutationCreateHotelArgs, 'data'>>;
  createRoom?: Resolver<TResolversTypes['Room'], ParentType, ContextType, RequireFields<TMutationCreateRoomArgs, 'data'>>;
  createUser?: Resolver<TResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<TMutationCreateUserArgs, 'data'>>;
  deactivateUser?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  deleteBooking?: Resolver<TResolversTypes['String'], ParentType, ContextType, RequireFields<TMutationDeleteBookingArgs, 'id'>>;
  deleteHotel?: Resolver<TResolversTypes['Hotel'], ParentType, ContextType, RequireFields<TMutationDeleteHotelArgs, 'id'>>;
  deleteRoom?: Resolver<TResolversTypes['String'], ParentType, ContextType, RequireFields<TMutationDeleteRoomArgs, 'id'>>;
  loginUser?: Resolver<TResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<TMutationLoginUserArgs, 'data'>>;
  updateHotel?: Resolver<TResolversTypes['Hotel'], ParentType, ContextType, RequireFields<TMutationUpdateHotelArgs, 'data' | 'id'>>;
  updateRoom?: Resolver<TResolversTypes['Room'], ParentType, ContextType, RequireFields<TMutationUpdateRoomArgs, 'data' | 'id'>>;
  updateUser?: Resolver<TResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<TMutationUpdateUserArgs, 'data'>>;
  updateUserPassword?: Resolver<TResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<TMutationUpdateUserPasswordArgs, 'data'>>;
  verifyUser?: Resolver<TResolversTypes['AuthPayload'], ParentType, ContextType>;
}>;

export interface TPasswordScalarConfig extends GraphQLScalarTypeConfig<TResolversTypes['Password'], any> {
  name: 'Password';
}

export interface TPostalCodeScalarConfig extends GraphQLScalarTypeConfig<TResolversTypes['PostalCode'], any> {
  name: 'PostalCode';
}

export type TQueryResolvers<ContextType = ServerContext, ParentType extends TResolversParentTypes['Query'] = TResolversParentTypes['Query']> = ResolversObject<{
  booking?: Resolver<TResolversTypes['Booking'], ParentType, ContextType, RequireFields<TQueryBookingArgs, 'id'>>;
  bookings?: Resolver<Array<TResolversTypes['Booking']>, ParentType, ContextType>;
  hotel?: Resolver<TResolversTypes['Hotel'], ParentType, ContextType, RequireFields<TQueryHotelArgs, 'id'>>;
  hotelBySlug?: Resolver<TResolversTypes['Hotel'], ParentType, ContextType, RequireFields<TQueryHotelBySlugArgs, 'slug'>>;
  hotels?: Resolver<Array<TResolversTypes['Hotel']>, ParentType, ContextType, Partial<TQueryHotelsArgs>>;
  hotelsByAdmin?: Resolver<TResolversTypes['HotelsPayload'], ParentType, ContextType, Partial<TQueryHotelsByAdminArgs>>;
  room?: Resolver<TResolversTypes['Room'], ParentType, ContextType, RequireFields<TQueryRoomArgs, 'id'>>;
  rooms?: Resolver<Array<TResolversTypes['Room']>, ParentType, ContextType, Partial<TQueryRoomsArgs>>;
  roomsByHotel?: Resolver<TResolversTypes['RoomPayload'], ParentType, ContextType, RequireFields<TQueryRoomsByHotelArgs, 'hotel'>>;
}>;

export type TQueryPayloadResolvers<ContextType = ServerContext, ParentType extends TResolversParentTypes['QueryPayload'] = TResolversParentTypes['QueryPayload']> = ResolversObject<{
  __resolveType: TypeResolveFn<'HotelsPayload' | 'RoomPayload', ParentType, ContextType>;
  count?: Resolver<TResolversTypes['Int'], ParentType, ContextType>;
}>;

export type TReviewResolvers<ContextType = ServerContext, ParentType extends TResolversParentTypes['Review'] = TResolversParentTypes['Review']> = ResolversObject<{
  id?: Resolver<TResolversTypes['ID'], ParentType, ContextType>;
  rating?: Resolver<TResolversTypes['Int'], ParentType, ContextType>;
  review?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  room?: Resolver<TResolversTypes['Room'], ParentType, ContextType>;
  user?: Resolver<TResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TRoomResolvers<ContextType = ServerContext, ParentType extends TResolversParentTypes['Room'] = TResolversParentTypes['Room']> = ResolversObject<{
  createdAt?: Resolver<TResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  hotel?: Resolver<TResolversTypes['Hotel'], ParentType, ContextType>;
  id?: Resolver<TResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Maybe<Array<TResolversTypes['String']>>, ParentType, ContextType>;
  name?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<TResolversTypes['Float'], ParentType, ContextType>;
  rating?: Resolver<Maybe<TResolversTypes['Int']>, ParentType, ContextType>;
  summary?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  thumbnail?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<TResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TRoomPayloadResolvers<ContextType = ServerContext, ParentType extends TResolversParentTypes['RoomPayload'] = TResolversParentTypes['RoomPayload']> = ResolversObject<{
  count?: Resolver<TResolversTypes['Int'], ParentType, ContextType>;
  nodes?: Resolver<Array<TResolversTypes['Room']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TUserResolvers<ContextType = ServerContext, ParentType extends TResolversParentTypes['User'] = TResolversParentTypes['User']> = ResolversObject<{
  active?: Resolver<TResolversTypes['Boolean'], ParentType, ContextType>;
  avatar?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  bookings?: Resolver<Maybe<Array<TResolversTypes['Booking']>>, ParentType, ContextType>;
  email?: Resolver<TResolversTypes['EmailAddress'], ParentType, ContextType>;
  firstName?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<TResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<TResolversTypes['Password'], ParentType, ContextType>;
  passwordChangedAt?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  reviews?: Resolver<Maybe<Array<TResolversTypes['Review']>>, ParentType, ContextType>;
  role?: Resolver<TResolversTypes['UserRole'], ParentType, ContextType>;
  userName?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  verified?: Resolver<TResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TResolvers<ContextType = ServerContext> = ResolversObject<{
  AuthPayload?: TAuthPayloadResolvers<ContextType>;
  Booking?: TBookingResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  File?: GraphQLScalarType;
  Hotel?: THotelResolvers<ContextType>;
  HotelsPayload?: THotelsPayloadResolvers<ContextType>;
  Latitude?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  Mutation?: TMutationResolvers<ContextType>;
  Password?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  Query?: TQueryResolvers<ContextType>;
  QueryPayload?: TQueryPayloadResolvers<ContextType>;
  Review?: TReviewResolvers<ContextType>;
  Room?: TRoomResolvers<ContextType>;
  RoomPayload?: TRoomPayloadResolvers<ContextType>;
  User?: TUserResolvers<ContextType>;
}>;

