import { createUser, getAllUsers, getUsers } from "../services/userServices";
import { tryCatch } from "../util/try-catch";

export const userHandlers = {
  GetUsers: async (call: any, callback: any) => {
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

      const users = await getUsers(offset, limit);
      callback(null, { users });
    } catch (err: any) {
      callback(new Error(err.message));
    }
  },
  CreateUser: async (call: any, callback: any) => {
    try {
      const { data: id, error } = await tryCatch(createUser(call.request));
      if (error) {
        callback(new Error(error.message));
      }

      callback(null, { id });
    } catch (err: any) {
      callback(new Error(err.message));
    }
  },
};
