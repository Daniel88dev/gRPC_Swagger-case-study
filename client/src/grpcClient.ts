import path from "path";
import { credentials, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/user";

const PROTO_PATH = path.join(__dirname, "./proto/user.proto");

const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;
const userPackage = protoDescriptor.user;

export const userClient = new userPackage.UserService(
  "localhost:8081",
  credentials.createInsecure()
);
