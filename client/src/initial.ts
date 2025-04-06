import fs from "fs";
import path from "path";
import { userClient } from "./grpcClient";
import { response } from "express";

type UserInput = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  password: string;
};

const usersInput: UserInput[] = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../user-init.json"), "utf-8")
);

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function runSequence() {
  const usersIds: string[] = [];

  console.log("Creating users...");
  for (const user of usersInput) {
    await new Promise<void>((resolve) => {
      userClient.CreateUser(user, (err, response) => {
        if (err) {
          console.error("Create user error: " + err.message);
        } else {
          usersIds.push(response?.id!);
        }
        resolve();
      });
    });
  }
  console.log("Users created with following id's: ", usersIds.join(", "));

  console.log("--------------\n");

  await delay(1000);

  console.log("Loading first 5 users...");

  await new Promise<void>((resolve) => {
    userClient.GetUsers({ offset: 1, limit: 5 }, (err, response) => {
      if (err) {
        console.error("Get users error: " + err.message);
      } else {
        console.log(
          "Users: ",
          response?.users?.map((user) => user.email).join(", ")
        );
      }
      resolve();
    });
  });
  console.log("--------------\n");

  await delay(1000);

  console.log("Loading next 10 users...");

  await new Promise<void>((resolve) => {
    userClient.GetUsers({ offset: 6, limit: 10 }, (err, response) => {
      if (err) {
        console.error("Get users error: " + err.message);
      } else {
        console.log(
          "Users: ",
          response?.users?.map((user) => user.email).join(", ")
        );
      }
      resolve();
    });
  });
  console.log("--------------\n");

  await delay(1000);

  console.log(
    `Register again same user: { firstName: ${usersInput[0].firstName}, lastName: ${usersInput[0].lastName}, company: ${usersInput[0].company}, email: ${usersInput[0].email}`
  );

  await new Promise<void>((resolve) => {
    userClient.CreateUser(usersInput[0], (err, response) => {
      if (err) {
        console.error("Create user error: " + err.message);
      } else {
        console.log("User created with id: ", response?.id);
      }
      resolve();
    });
  });
  console.log("--------------\n");

  await delay(1000);

  console.log(
    `Attempt to login with user: ${usersInput[0].firstName} ${usersInput[0].lastName}`
  );

  await new Promise<void>((resolve) => {
    userClient.LoginUser(
      { email: usersInput[0].email, password: usersInput[0].password },
      (err, response) => {
        if (err) {
          console.error("Login user error: " + err.message);
        } else {
          console.log(
            "User authenticated. Generated jwt token: ",
            response?.token
          );
        }
        resolve();
      }
    );
  });
  console.log("--------------\n");

  console.log("All initialization tasks completed.");
}
