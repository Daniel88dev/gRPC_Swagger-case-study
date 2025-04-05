import { getAllUsers } from "../services/userServices";

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
};
