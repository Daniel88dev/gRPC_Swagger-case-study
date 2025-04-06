import axios, { AxiosResponse } from "axios";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const db = "http://localhost:8000/users";

const generateShortId = (): string => {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
};

// testing for getting all users (need to modify)
export const getAllUsers = async () => {
  const users: AxiosResponse<User[], any> = await axios(db);
  if (users.status !== 200) {
    throw new Error("Error fetching users");
  }

  const userEmails: { id: string; email: string }[] = users.data.map((user) => {
    return { id: user.id, email: user.email };
  });

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
    id: generateShortId(),
  };

  const response = await axios.post(db, newUser);
  if (response.status !== 201) {
    throw new Error("Error creating user");
  }

  return newUser.id;
};
// get User data from entered User ID
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

// logic for authenticating a user
export const loginUser = async (email: string, password: string) => {
  const result: AxiosResponse<User[]> = await axios(`${db}/?email=${email}`);

  if (result.status !== 200) {
    throw new Error("No user found for searched email");
  }

  const user = result.data[0];

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  // Generate token in the required format
  const token = jwt.sign(
    {
      id: user.id,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    },
    "tajny_klic",
    { algorithm: "HS256" }
  );

  return token;
};
