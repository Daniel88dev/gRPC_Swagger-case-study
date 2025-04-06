// Original file: server/proto/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateUserRequest as _user_CreateUserRequest, CreateUserRequest__Output as _user_CreateUserRequest__Output } from '../user/CreateUserRequest';
import type { CreateUserResponse as _user_CreateUserResponse, CreateUserResponse__Output as _user_CreateUserResponse__Output } from '../user/CreateUserResponse';
import type { GetUserByIdRequest as _user_GetUserByIdRequest, GetUserByIdRequest__Output as _user_GetUserByIdRequest__Output } from '../user/GetUserByIdRequest';
import type { GetUserByIdResponse as _user_GetUserByIdResponse, GetUserByIdResponse__Output as _user_GetUserByIdResponse__Output } from '../user/GetUserByIdResponse';
import type { GetUsersRequest as _user_GetUsersRequest, GetUsersRequest__Output as _user_GetUsersRequest__Output } from '../user/GetUsersRequest';
import type { GetUsersResponse as _user_GetUsersResponse, GetUsersResponse__Output as _user_GetUsersResponse__Output } from '../user/GetUsersResponse';
import type { LoginUserRequest as _user_LoginUserRequest, LoginUserRequest__Output as _user_LoginUserRequest__Output } from '../user/LoginUserRequest';
import type { LoginUserResponse as _user_LoginUserResponse, LoginUserResponse__Output as _user_LoginUserResponse__Output } from '../user/LoginUserResponse';

export interface UserServiceClient extends grpc.Client {
  CreateUser(argument: _user_CreateUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _user_CreateUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _user_CreateUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _user_CreateUserRequest, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _user_CreateUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _user_CreateUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _user_CreateUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _user_CreateUserRequest, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  
  GetUserById(argument: _user_GetUserByIdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  GetUserById(argument: _user_GetUserByIdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  GetUserById(argument: _user_GetUserByIdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  GetUserById(argument: _user_GetUserByIdRequest, callback: grpc.requestCallback<_user_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  getUserById(argument: _user_GetUserByIdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  getUserById(argument: _user_GetUserByIdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  getUserById(argument: _user_GetUserByIdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  getUserById(argument: _user_GetUserByIdRequest, callback: grpc.requestCallback<_user_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  
  GetUsers(argument: _user_GetUsersRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  GetUsers(argument: _user_GetUsersRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  GetUsers(argument: _user_GetUsersRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  GetUsers(argument: _user_GetUsersRequest, callback: grpc.requestCallback<_user_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  getUsers(argument: _user_GetUsersRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  getUsers(argument: _user_GetUsersRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  getUsers(argument: _user_GetUsersRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  getUsers(argument: _user_GetUsersRequest, callback: grpc.requestCallback<_user_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  
  LoginUser(argument: _user_LoginUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginUserResponse__Output>): grpc.ClientUnaryCall;
  LoginUser(argument: _user_LoginUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_LoginUserResponse__Output>): grpc.ClientUnaryCall;
  LoginUser(argument: _user_LoginUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginUserResponse__Output>): grpc.ClientUnaryCall;
  LoginUser(argument: _user_LoginUserRequest, callback: grpc.requestCallback<_user_LoginUserResponse__Output>): grpc.ClientUnaryCall;
  loginUser(argument: _user_LoginUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginUserResponse__Output>): grpc.ClientUnaryCall;
  loginUser(argument: _user_LoginUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_LoginUserResponse__Output>): grpc.ClientUnaryCall;
  loginUser(argument: _user_LoginUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginUserResponse__Output>): grpc.ClientUnaryCall;
  loginUser(argument: _user_LoginUserRequest, callback: grpc.requestCallback<_user_LoginUserResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateUser: grpc.handleUnaryCall<_user_CreateUserRequest__Output, _user_CreateUserResponse>;
  
  GetUserById: grpc.handleUnaryCall<_user_GetUserByIdRequest__Output, _user_GetUserByIdResponse>;
  
  GetUsers: grpc.handleUnaryCall<_user_GetUsersRequest__Output, _user_GetUsersResponse>;
  
  LoginUser: grpc.handleUnaryCall<_user_LoginUserRequest__Output, _user_LoginUserResponse>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  CreateUser: MethodDefinition<_user_CreateUserRequest, _user_CreateUserResponse, _user_CreateUserRequest__Output, _user_CreateUserResponse__Output>
  GetUserById: MethodDefinition<_user_GetUserByIdRequest, _user_GetUserByIdResponse, _user_GetUserByIdRequest__Output, _user_GetUserByIdResponse__Output>
  GetUsers: MethodDefinition<_user_GetUsersRequest, _user_GetUsersResponse, _user_GetUsersRequest__Output, _user_GetUsersResponse__Output>
  LoginUser: MethodDefinition<_user_LoginUserRequest, _user_LoginUserResponse, _user_LoginUserRequest__Output, _user_LoginUserResponse__Output>
}
