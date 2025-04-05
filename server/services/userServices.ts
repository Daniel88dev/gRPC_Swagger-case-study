import axios, { AxiosResponse } from "axios";
import { User } from "../models/User";
import { userProto } from "../server";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const db = "http://localhost:8000/users";

// testing for getting all users (need to modify)
export const getAllUsers = async () => {
  const users: AxiosResponse<User[], any> = await axios(db);
  if (users.status !== 200) {
    throw new Error("Error fetching users");
  }

  const userEmails: (typeof userProto.GetUsersResponse)[] = users.data.map(
    (user) => {
      return { id: user.id, email: user.email };
    }
  );

  return userEmails;
};

// get users with offset and limit
export const getUsers = async (offset: number, limit: number) => {
  const users: AxiosResponse<User[], any> = await axios(
    `${db}?_sort=email&_start=${offset}&_limit=${limit}`
  );
  if (users.status !== 200) {
    throw new Error("Error fetching users");
  }

  const formatedUsers = users.data.map((user) => {
    return { id: user.id, email: user.email };
  });

  return formatedUsers;
};

// create user to db service/controller
export const createUser = async (data: Omit<User, "id">) => {
  const users: AxiosResponse<User[]> = await axios(db);
  if (users.status !== 200) {
    throw new Error("Error fetching users");
  }

  const findEmail = users.data.find((user) => user.email === data.email);
  if (findEmail) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser: User = {
    ...data,
    password: hashedPassword,
    id: uuidv4(),
  };

  const response = await axios.post(db, newUser);
  if (response.status !== 201) {
    throw new Error("Error creating user");
  }

  return newUser.id;
};

export const getUserById = async (id: string) => {
  const user: AxiosResponse<User> = await axios(`${db}/${id}`);
  if (user.status !== 200) {
    throw new Error("No user found for searched id");
  }

  const formatedUser = {
    id: user.data.id,
    firstName: user.data.firstName,
    lastName: user.data.lastName,
    email: user.data.email,
    company: user.data.company,
  };

  return formatedUser;
};
