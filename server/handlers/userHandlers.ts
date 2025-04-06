import {
  createUser,
  getUserById,
  getUsers,
  loginUser,
} from "../services/userServices";
import { tryCatch } from "../util/try-catch";
import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { GetUsersRequest } from "../proto/user/GetUsersRequest";
import { GetUsersResponse } from "../proto/user/GetUsersResponse";
import { CreateUserRequest } from "../proto/user/CreateUserRequest";
import { CreateUserResponse } from "../proto/user/CreateUserResponse";
import { GetUserByIdRequest } from "../proto/user/GetUserByIdRequest";
import { GetUserByIdResponse } from "../proto/user/GetUserByIdResponse";
import { LoginUserRequest } from "../proto/user/LoginUserRequest";
import { LoginUserResponse } from "../proto/user/LoginUserResponse";

export const userHandlers = {
  GetUsers: async (
    call: ServerUnaryCall<GetUsersRequest, GetUsersResponse>,
    callback: sendUnaryData<GetUsersResponse>
  ) => {
    try {
      const { offset, limit } = call.request;

      if (!offset || isNaN(offset) || offset < 0) {
        callback(new Error("Invalid offset"));
        return;
      }

      if (
        !limit ||
        isNaN(limit) ||
        (limit !== 5 && limit !== 10 && limit !== 25)
      ) {
        callback(new Error("Invalid limit. Only 5, 10, and 25 are allowed"));
        return;
      }

      const { data: users, error: userError } = await tryCatch(
        getUsers(offset, limit)
      );

      if (userError) {
        callback(new Error(userError.message));
        return;
      }

      callback(null, { users });
    } catch (err: any) {
      callback(new Error(err.message));
    }
  },
  CreateUser: async (
    call: ServerUnaryCall<CreateUserRequest, CreateUserResponse>,
    callback: sendUnaryData<CreateUserResponse>
  ) => {
    try {
      const { firstName, lastName, password, email, company } = call.request;
      if (!firstName || !lastName || !password || !email || !company) {
        callback(new Error("Invalid request"));
        return;
      }

      const { data: id, error } = await tryCatch(
        createUser({ firstName, lastName, company, email, password })
      );
      if (error) {
        callback(new Error(error.message));
        return;
      }

      callback(null, { id });
    } catch (err: any) {
      callback(new Error(err.message));
    }
  },
  GetUserById: async (
    call: ServerUnaryCall<GetUserByIdRequest, GetUserByIdResponse>,
    callback: sendUnaryData<GetUserByIdResponse>
  ) => {
    try {
      const { id } = call.request;

      if (!id) {
        callback(new Error("Invalid id"));
        return;
      }

      const { data: user, error: userError } = await tryCatch(getUserById(id));

      if (userError) {
        callback(new Error("User not found"));
        return;
      }

      console.log(user);

      callback(null, { ...user });
    } catch (err: any) {
      callback(new Error(err.message));
    }
  },
  LoginUser: async (
    call: ServerUnaryCall<LoginUserRequest, LoginUserResponse>,
    callback: sendUnaryData<LoginUserResponse>
  ) => {
    try {
      const { email, password } = call.request;

      if (!email || !password) {
        callback(new Error("Invalid email or password"));
        return;
      }

      const { data: token, error: tokenError } = await tryCatch(
        loginUser(email, password)
      );

      if (tokenError) {
        callback(new Error(tokenError.message));
        return;
      }

      if (!token) {
        callback(new Error("Invalid email or password"));
        return;
      }
      callback(null, { token });
    } catch (err: any) {
      callback(new Error(err.message));
    }
  },
};
