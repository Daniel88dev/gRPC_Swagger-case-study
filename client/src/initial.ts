import fs from "fs";
import path from "path";
import { userClient } from "./grpcClient";

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
}

runSequence();
