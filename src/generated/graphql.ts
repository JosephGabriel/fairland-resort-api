import { FileUpload } from 'graphql-upload';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { UserModel, RoomModel, BookingModel } from '../models/models';
import { ServerContext } from '../index';
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
  EmailAddress: string;
  Latitude: number;
  Longitude: number;
  Password: string;
  PostalCode: string;
  Upload: FileUpload;
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
  user: Scalars['ID'];
};

export type CreateHotelInput = {
  address: Scalars['String'];
  addressNumber: Scalars['String'];
  description: Scalars['String'];
  images?: InputMaybe<Array<Scalars['Upload']>>;
  latitude: Scalars['Latitude'];
  logo: Scalars['Upload'];
  longitude: Scalars['Longitude'];
  name: Scalars['String'];
  summary: Scalars['String'];
  thumbnail: Scalars['Upload'];
  zipCode: Scalars['PostalCode'];
};

export type CreateRoomInput = {
  description: Scalars['String'];
  hotel: Scalars['ID'];
  images?: InputMaybe<Array<Scalars['Upload']>>;
  name: Scalars['String'];
  price: Scalars['Float'];
  summary: Scalars['String'];
  thumbnail: Scalars['Upload'];
};

export type CreateUserInput = {
  avatar?: InputMaybe<Scalars['Upload']>;
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
  data?: InputMaybe<CreateBookingInput>;
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


export type QueryHotelArgs = {
  id: Scalars['ID'];
};


export type QueryHotelBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryHotelsByAdminArgs = {
  id: Scalars['ID'];
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
  images?: Maybe<Array<Scalars['Upload']>>;
  /** Nome do quarto */
  name: Scalars['String'];
  /** Preço por noite do quarto */
  price: Scalars['Float'];
  /** Classificação do quarto ex: 5 estrelas */
  rating?: Maybe<Scalars['Int']>;
  /** Uma pequena descrição do quarto */
  summary: Scalars['String'];
  /** Thumbnail a ser exibida do quarto */
  thumbnail: Scalars['Upload'];
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
  images?: InputMaybe<Array<InputMaybe<Scalars['Upload']>>>;
  latitude?: InputMaybe<Scalars['Latitude']>;
  logo?: InputMaybe<Scalars['Upload']>;
  longitude?: InputMaybe<Scalars['Longitude']>;
  name?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<Scalars['String']>;
  thumbnail?: InputMaybe<Scalars['Upload']>;
  zipCode?: InputMaybe<Scalars['PostalCode']>;
};

export type UpdateRoomInput = {
  images?: InputMaybe<Array<Scalars['Upload']>>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  summary?: InputMaybe<Scalars['String']>;
  thumbnail?: InputMaybe<Scalars['Upload']>;
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['Upload']>;
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
export type ResolversTypes = ResolversObject<{
  AuthPayload: ResolverTypeWrapper<Omit<AuthPayload, 'user'> & { user: ResolversTypes['User'] }>;
  Booking: ResolverTypeWrapper<BookingModel>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateBookingInput: CreateBookingInput;
  CreateHotelInput: CreateHotelInput;
  CreateRoomInput: CreateRoomInput;
  CreateUserInput: CreateUserInput;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Hotel: ResolverTypeWrapper<Omit<Hotel, 'rooms'> & { rooms?: Maybe<Array<ResolversTypes['Room']>> }>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Latitude: ResolverTypeWrapper<Scalars['Latitude']>;
  LoginUserInput: LoginUserInput;
  Longitude: ResolverTypeWrapper<Scalars['Longitude']>;
  Mutation: ResolverTypeWrapper<{}>;
  Password: ResolverTypeWrapper<Scalars['Password']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']>;
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<Omit<Review, 'room' | 'user'> & { room: ResolversTypes['Room'], user: ResolversTypes['User'] }>;
  Room: ResolverTypeWrapper<RoomModel>;
  RoomFilter: RoomFilter;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateHotelInput: UpdateHotelInput;
  UpdateRoomInput: UpdateRoomInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserPasswordInput: UpdateUserPasswordInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<UserModel>;
  userRole: UserRole;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthPayload: Omit<AuthPayload, 'user'> & { user: ResolversParentTypes['User'] };
  Booking: BookingModel;
  Boolean: Scalars['Boolean'];
  CreateBookingInput: CreateBookingInput;
  CreateHotelInput: CreateHotelInput;
  CreateRoomInput: CreateRoomInput;
  CreateUserInput: CreateUserInput;
  EmailAddress: Scalars['EmailAddress'];
  Float: Scalars['Float'];
  Hotel: Omit<Hotel, 'rooms'> & { rooms?: Maybe<Array<ResolversParentTypes['Room']>> };
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Latitude: Scalars['Latitude'];
  LoginUserInput: LoginUserInput;
  Longitude: Scalars['Longitude'];
  Mutation: {};
  Password: Scalars['Password'];
  PostalCode: Scalars['PostalCode'];
  Query: {};
  Review: Omit<Review, 'room' | 'user'> & { room: ResolversParentTypes['Room'], user: ResolversParentTypes['User'] };
  Room: RoomModel;
  RoomFilter: RoomFilter;
  String: Scalars['String'];
  UpdateHotelInput: UpdateHotelInput;
  UpdateRoomInput: UpdateRoomInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserPasswordInput: UpdateUserPasswordInput;
  Upload: Scalars['Upload'];
  User: UserModel;
}>;

export type AuthPayloadResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookingResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Booking'] = ResolversParentTypes['Booking']> = ResolversObject<{
  bookingDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dateIn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dateOut?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  paid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  room?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type HotelResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Hotel'] = ResolversParentTypes['Hotel']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  addressNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Latitude']>, ParentType, ContextType>;
  logo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Longitude']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rooms?: Resolver<Maybe<Array<ResolversTypes['Room']>>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zipCode?: Resolver<Maybe<ResolversTypes['PostalCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface LatitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Latitude'], any> {
  name: 'Latitude';
}

export interface LongitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Longitude'], any> {
  name: 'Longitude';
}

export type MutationResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createAdmin?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationCreateAdminArgs, 'data'>>;
  createBooking?: Resolver<ResolversTypes['Booking'], ParentType, ContextType, Partial<MutationCreateBookingArgs>>;
  createHotel?: Resolver<ResolversTypes['Hotel'], ParentType, ContextType, RequireFields<MutationCreateHotelArgs, 'data'>>;
  createRoom?: Resolver<ResolversTypes['Room'], ParentType, ContextType, RequireFields<MutationCreateRoomArgs, 'data'>>;
  createUser?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>;
  deactivateUser?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deleteHotel?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeleteHotelArgs, 'id'>>;
  deleteRoom?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeleteRoomArgs, 'id'>>;
  loginUser?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'data'>>;
  updateHotel?: Resolver<ResolversTypes['Hotel'], ParentType, ContextType, RequireFields<MutationUpdateHotelArgs, 'data' | 'id'>>;
  updateRoom?: Resolver<ResolversTypes['Room'], ParentType, ContextType, RequireFields<MutationUpdateRoomArgs, 'data' | 'id'>>;
  updateUser?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'data'>>;
  updateUserPassword?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationUpdateUserPasswordArgs, 'data'>>;
  verifyUser?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType>;
}>;

export interface PasswordScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Password'], any> {
  name: 'Password';
}

export interface PostalCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode';
}

export type QueryResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  hotel?: Resolver<ResolversTypes['Hotel'], ParentType, ContextType, RequireFields<QueryHotelArgs, 'id'>>;
  hotelBySlug?: Resolver<ResolversTypes['Hotel'], ParentType, ContextType, RequireFields<QueryHotelBySlugArgs, 'slug'>>;
  hotels?: Resolver<Maybe<Array<ResolversTypes['Hotel']>>, ParentType, ContextType>;
  hotelsByAdmin?: Resolver<Maybe<Array<ResolversTypes['Hotel']>>, ParentType, ContextType, RequireFields<QueryHotelsByAdminArgs, 'id'>>;
  room?: Resolver<ResolversTypes['Room'], ParentType, ContextType, RequireFields<QueryRoomArgs, 'id'>>;
  rooms?: Resolver<Maybe<Array<ResolversTypes['Room']>>, ParentType, ContextType, Partial<QueryRoomsArgs>>;
  roomsByHotel?: Resolver<Maybe<Array<ResolversTypes['Room']>>, ParentType, ContextType, RequireFields<QueryRoomsByHotelArgs, 'hotel'>>;
}>;

export type ReviewResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  review?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  room?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RoomResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hotel?: Resolver<ResolversTypes['Hotel'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Maybe<Array<ResolversTypes['Upload']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  summary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['Upload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bookings?: Resolver<Maybe<Array<ResolversTypes['Booking']>>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['Password'], ParentType, ContextType>;
  passwordChangedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['userRole'], ParentType, ContextType>;
  userName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ServerContext> = ResolversObject<{
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Booking?: BookingResolvers<ContextType>;
  EmailAddress?: GraphQLScalarType;
  Hotel?: HotelResolvers<ContextType>;
  Latitude?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Password?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  Room?: RoomResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
}>;

