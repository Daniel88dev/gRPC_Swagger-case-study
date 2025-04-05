import { createUser, getAllUsers } from "../services/userServices";
import { tryCatch } from "../util/try-catch";

export const userHandlers = {
  GetUsers: async (call: any, callback: any) => {
    try {
      const { offset, limit } = call.request;
      console.log(offset, limit);
      const users = await getAllUsers();
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
