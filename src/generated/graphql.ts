import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { UserModel, RoomModel, BookingModel } from '../models/models';
import { ServerContext } from '../../globals';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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


/** Mapping of interface types */
export type TResolversInterfaceTypes<RefType extends Record<string, unknown>> = ResolversObject<{
  QueryPayload: ( Omit<THotelsPayload, 'nodes'> & { nodes: Array<RefType['Hotel']> } ) | ( Omit<TRoomPayload, 'nodes'> & { nodes: Array<RefType['Room']> } );
}>;

/** Mapping between all available schema types and the resolvers types */
export type TResolversTypes = ResolversObject<{
  AuthPayload: ResolverTypeWrapper<Omit<TAuthPayload, 'user'> & { user: TResolversTypes['User'] }>;
  Booking: ResolverTypeWrapper<BookingModel>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateBookingInput: TCreateBookingInput;
  CreateHotelInput: TCreateHotelInput;
  CreateRoomInput: TCreateRoomInput;
  CreateUserInput: TCreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  File: ResolverTypeWrapper<Scalars['File']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Hotel: ResolverTypeWrapper<Omit<THotel, 'rooms'> & { rooms: Array<TResolversTypes['Room']> }>;
  HotelsPayload: ResolverTypeWrapper<Omit<THotelsPayload, 'nodes'> & { nodes: Array<TResolversTypes['Hotel']> }>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Latitude: ResolverTypeWrapper<Scalars['Latitude']['output']>;
  LoginUserInput: TLoginUserInput;
  Longitude: ResolverTypeWrapper<Scalars['Longitude']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Options: TOptions;
  OrderBy: TOrderBy;
  Password: ResolverTypeWrapper<Scalars['Password']['output']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']['output']>;
  Query: ResolverTypeWrapper<{}>;
  QueryPayload: ResolverTypeWrapper<TResolversInterfaceTypes<TResolversTypes>['QueryPayload']>;
  Review: ResolverTypeWrapper<Omit<TReview, 'room' | 'user'> & { room: TResolversTypes['Room'], user: TResolversTypes['User'] }>;
  Room: ResolverTypeWrapper<RoomModel>;
  RoomFilter: TRoomFilter;
  RoomPayload: ResolverTypeWrapper<Omit<TRoomPayload, 'nodes'> & { nodes: Array<TResolversTypes['Room']> }>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
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
  Boolean: Scalars['Boolean']['output'];
  CreateBookingInput: TCreateBookingInput;
  CreateHotelInput: TCreateHotelInput;
  CreateRoomInput: TCreateRoomInput;
  CreateUserInput: TCreateUserInput;
  DateTime: Scalars['DateTime']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  File: Scalars['File']['output'];
  Float: Scalars['Float']['output'];
  Hotel: Omit<THotel, 'rooms'> & { rooms: Array<TResolversParentTypes['Room']> };
  HotelsPayload: Omit<THotelsPayload, 'nodes'> & { nodes: Array<TResolversParentTypes['Hotel']> };
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Latitude: Scalars['Latitude']['output'];
  LoginUserInput: TLoginUserInput;
  Longitude: Scalars['Longitude']['output'];
  Mutation: {};
  Options: TOptions;
  Password: Scalars['Password']['output'];
  PostalCode: Scalars['PostalCode']['output'];
  Query: {};
  QueryPayload: TResolversInterfaceTypes<TResolversParentTypes>['QueryPayload'];
  Review: Omit<TReview, 'room' | 'user'> & { room: TResolversParentTypes['Room'], user: TResolversParentTypes['User'] };
  Room: RoomModel;
  RoomFilter: TRoomFilter;
  RoomPayload: Omit<TRoomPayload, 'nodes'> & { nodes: Array<TResolversParentTypes['Room']> };
  String: Scalars['String']['output'];
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

