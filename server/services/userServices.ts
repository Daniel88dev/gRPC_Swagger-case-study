import axios from "axios";

const db = "http://localhost:8000/users";

export const getAllUsers = async () => {
  const users = await axios(db);
  console.log(users);
  return users;
};
